import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)
const SITE_URL = 'https://app.nihongo-world.com'

// Vercel Cronからのリクエストを検証
function verifyCronRequest(request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return false
  }
  return true
}

// ティアを判定
function determineTier(lessonCount) {
  if (lessonCount >= 100) return 'gold'
  if (lessonCount >= 50) return 'silver'
  if (lessonCount >= 25) return 'bronze'
  return 'none'
}

// ティア昇格メールを送信
async function sendTierUpgradeEmail(profile, newTier) {
  const tierInfo = {
    bronze: { name: 'Bronze', benefit: '10% OFF on your next purchase', color: '#CD7F32' },
    silver: { name: 'Silver', benefit: '5% OFF on all purchases', color: '#C0C0C0' },
    gold: { name: 'Gold', benefit: '10% OFF on all purchases', color: '#FFD700' }
  }

  const info = tierInfo[newTier]
  if (!info) return

  try {
    await resend.emails.send({
      from: 'Nihon GO! World <noreply@nihongo-world.com>',
      to: profile.email,
      subject: `🎉 Congratulations! You've reached ${info.name} tier!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: ${info.color};">🏆 ${info.name} Member!</h1>
          <p>Dear ${profile.full_name || 'Valued Student'},</p>
          <p>Congratulations! You've completed <strong>${profile.total_lessons_completed} lessons</strong> and reached <strong>${info.name}</strong> tier!</p>
          
          <div style="background: linear-gradient(135deg, ${info.color}22 0%, ${info.color}44 100%); padding: 20px; border-radius: 12px; margin: 24px 0;">
            <h3 style="margin: 0 0 8px 0;">Your Benefit:</h3>
            <p style="margin: 0; font-size: 18px; font-weight: bold;">${info.benefit}</p>
          </div>
          
          <p>Thank you for being a loyal student. Keep up the great work!</p>
          
          <p style="margin: 24px 0;">
            <a href="${SITE_URL}/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View My Dashboard</a>
          </p>
          
          <p>Best regards,<br>
          Nihon GO! World Team</p>
        </div>
      `
    })
    console.log(`✅ Tier upgrade email sent to ${profile.email} (${newTier})`)
  } catch (error) {
    console.error(`❌ Failed to send tier upgrade email:`, error)
  }
}

// ティア更新処理
async function updateTiers() {
  console.log('🏆 Updating lesson counts and tiers...')

  // 全ユーザーのレッスン完了数を再計算
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('user_id, email, full_name, total_lessons_completed, tier')

  if (profilesError) {
    console.error('Error fetching profiles:', profilesError)
    return { updated: 0 }
  }

  let updatedCount = 0

  for (const profile of profiles || []) {
    // 完了したレッスン数をカウント
    const { count, error: countError } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('student_id', profile.user_id)
      .or('status.eq.completed,and(status.eq.confirmed,start_time.lt.now())')

    if (countError) {
      console.error(`Error counting lessons for ${profile.email}:`, countError)
      continue
    }

    const lessonCount = count || 0
    const newTier = determineTier(lessonCount)

    // 変更があれば更新
    if (lessonCount !== profile.total_lessons_completed || newTier !== profile.tier) {
      const tierChanged = newTier !== profile.tier && newTier !== 'none'

      await supabase
        .from('profiles')
        .update({
          total_lessons_completed: lessonCount,
          tier: newTier
        })
        .eq('user_id', profile.user_id)

      console.log(`📊 Updated ${profile.email}: ${lessonCount} lessons, tier: ${newTier}`)
      updatedCount++

      // ティアが昇格した場合はお祝いメール送信
      if (tierChanged) {
        await sendTierUpgradeEmail({ ...profile, total_lessons_completed: lessonCount }, newTier)
      }
    }
  }

  return { updated: updatedCount }
}

// リマインダー送信処理
async function sendReminderEmail(booking, teacher, studentProfile, reminderType) {
  const lessonDate = new Date(booking.start_time).toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London'
  })

  const timeUntil = reminderType === '24h' ? '24 hours' : '1 hour'
  const emoji = reminderType === '24h' ? '📅' : '⏰'

  // 生徒にリマインダー送信
  try {
    await resend.emails.send({
      from: 'Nihon GO! World <noreply@nihongo-world.com>',
      to: studentProfile.email,
      subject: `${emoji} Lesson Reminder - ${timeUntil} to go!`,
      html: `
        <h2>Your lesson is coming up!</h2>
        <p>Dear ${studentProfile.full_name || 'Student'},</p>
        <p>This is a friendly reminder that your Japanese lesson is in <strong>${timeUntil}</strong>.</p>
        
        <h3>Lesson Details:</h3>
        <ul>
          <li><strong>Teacher:</strong> ${teacher.display_name}</li>
          <li><strong>Date & Time:</strong> ${lessonDate} (London time)</li>
          <li><strong>Lesson Type:</strong> ${booking.lesson_type.replace('_', ' ')}</li>
          ${booking.zoom_link ? `<li><strong>Zoom Link:</strong> <a href="${booking.zoom_link}">${booking.zoom_link}</a></li>` : ''}
        </ul>
        
        ${booking.zoom_link ? `
        <p style="margin: 24px 0;">
          <a href="${booking.zoom_link}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Join Zoom Meeting</a>
        </p>
        ` : ''}
        
        <p>See you soon!<br>
        Nihon GO! World Team</p>
      `
    })
    console.log(`✅ Student reminder (${reminderType}) sent to ${studentProfile.email}`)
  } catch (error) {
    console.error(`❌ Failed to send student reminder (${reminderType}):`, error)
  }

  // 講師にリマインダー送信
  try {
    const { data: teacherProfile } = await supabase
      .from('profiles')
      .select('email')
      .eq('user_id', teacher.user_id)
      .single()

    if (teacherProfile) {
      await resend.emails.send({
        from: 'Nihon GO! World <noreply@nihongo-world.com>',
        to: teacherProfile.email,
        subject: `${emoji} Lesson Reminder - ${timeUntil} to go!`,
        html: `
          <h2>Your lesson is coming up!</h2>
          <p>Dear ${teacher.display_name},</p>
          <p>This is a reminder that you have a lesson in <strong>${timeUntil}</strong>.</p>
          
          <h3>Lesson Details:</h3>
          <ul>
            <li><strong>Student:</strong> ${studentProfile.full_name || 'Student'} (${studentProfile.email})</li>
            <li><strong>Date & Time:</strong> ${lessonDate} (London time)</li>
            <li><strong>Lesson Type:</strong> ${booking.lesson_type.replace('_', ' ')}</li>
            ${booking.zoom_link ? `<li><strong>Zoom Link:</strong> <a href="${booking.zoom_link}">${booking.zoom_link}</a></li>` : ''}
          </ul>
          
          ${booking.zoom_link ? `
          <p style="margin: 24px 0;">
            <a href="${booking.zoom_link}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Join Zoom Meeting</a>
          </p>
          ` : ''}
          
          <p>Best regards,<br>
          Nihon GO! World Team</p>
        `
      })
      console.log(`✅ Teacher reminder (${reminderType}) sent to ${teacherProfile.email}`)
    }
  } catch (error) {
    console.error(`❌ Failed to send teacher reminder (${reminderType}):`, error)
  }
}

export async function GET(request) {
  // Cron認証チェック（本番環境のみ）
  if (process.env.NODE_ENV === 'production' && !verifyCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log('🔔 Running daily cron job...')

  const now = new Date()
  
  // ===== ティア更新処理 =====
  const tierResult = await updateTiers()

  // ===== リマインダー送信処理 =====
  // 24時間後の時間帯（±30分の余裕）
  const in24hStart = new Date(now.getTime() + 23.5 * 60 * 60 * 1000)
  const in24hEnd = new Date(now.getTime() + 24.5 * 60 * 60 * 1000)

  // 24時間前リマインダー対象の予約を取得
  const { data: bookings24h, error: error24h } = await supabase
    .from('bookings')
    .select(`
      *,
      teachers:teacher_id (id, user_id, display_name),
      profiles:student_id (email, full_name)
    `)
    .eq('status', 'confirmed')
    .gte('start_time', in24hStart.toISOString())
    .lt('start_time', in24hEnd.toISOString())

  if (error24h) {
    console.error('Error fetching 24h bookings:', error24h)
  } else {
    console.log(`📧 Found ${bookings24h?.length || 0} lessons starting in ~24 hours`)
    for (const booking of bookings24h || []) {
      await sendReminderEmail(booking, booking.teachers, booking.profiles, '24h')
    }
  }

  return NextResponse.json({
    success: true,
    tiers: tierResult,
    reminders: {
      '24h': bookings24h?.length || 0
    },
    timestamp: now.toISOString()
  })
}
