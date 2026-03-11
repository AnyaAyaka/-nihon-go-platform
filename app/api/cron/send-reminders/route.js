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

  console.log('🔔 Running lesson reminder cron job...')

  const now = new Date()
  
  // 24時間後の時間帯（±30分の余裕）
  const in24hStart = new Date(now.getTime() + 23.5 * 60 * 60 * 1000)
  const in24hEnd = new Date(now.getTime() + 24.5 * 60 * 60 * 1000)
  
  // 1時間後の時間帯（±30分の余裕）
  const in1hStart = new Date(now.getTime() + 0.5 * 60 * 60 * 1000)
  const in1hEnd = new Date(now.getTime() + 1.5 * 60 * 60 * 1000)

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

  // 1時間前リマインダー対象の予約を取得
  const { data: bookings1h, error: error1h } = await supabase
    .from('bookings')
    .select(`
      *,
      teachers:teacher_id (id, user_id, display_name),
      profiles:student_id (email, full_name)
    `)
    .eq('status', 'confirmed')
    .gte('start_time', in1hStart.toISOString())
    .lt('start_time', in1hEnd.toISOString())

  if (error1h) {
    console.error('Error fetching 1h bookings:', error1h)
  } else {
    console.log(`📧 Found ${bookings1h?.length || 0} lessons starting in ~1 hour`)
    for (const booking of bookings1h || []) {
      await sendReminderEmail(booking, booking.teachers, booking.profiles, '1h')
    }
  }

  return NextResponse.json({
    success: true,
    processed: {
      '24h': bookings24h?.length || 0,
      '1h': bookings1h?.length || 0
    },
    timestamp: now.toISOString()
  })
}
