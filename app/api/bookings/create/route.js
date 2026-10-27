import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { google } from 'googleapis'
import { Resend } from 'resend'
import {
  TICKET_TO_BOOKING_LESSON_TYPE as TICKET_TO_LESSON_TYPE,
  IN_PERSON_LESSON_TYPES,
  TRAVEL_MINUTES,
  PAIR_TICKET_TYPES,
  LESSON_BUFFER_MINUTES,
  lessonMinutes,
  checkTicketForBooking
} from '../../../../lib/ticketRules'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)
const SITE_URL = 'https://app.nihongo-world.com'

// 講師のGoogleカレンダーにその時間の予定が入っているかをその場で確認する。
// カレンダー未接続、またはGoogle側のエラーのときは止めずに通す（予約自体は止めない）。
async function isTeacherBusyNow(teacher, startMs, endMs, inPerson = false) {
  if (!teacher?.google_refresh_token) return false

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )
    oauth2Client.setCredentials({ refresh_token: teacher.google_refresh_token })
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // 対面は移動時間として、開始の1時間前から空いている必要がある
    const checkFromMs = inPerson ? startMs - TRAVEL_MINUTES * 60 * 1000 : startMs

    const calendarId = teacher.google_calendar_id || 'primary'
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: new Date(checkFromMs).toISOString(),
        timeMax: new Date(endMs).toISOString(),
        items: [{ id: calendarId }]
      }
    })

    const busy = response.data.calendars?.[calendarId]?.busy || []
    if (busy.length === 0) return false

    // 移動時間の中に入っているのが、うちの対面レッスン（教室で連続）なら移動なしなので止めない
    let inPersonLessons = []
    if (inPerson) {
      const { data } = await supabase
        .from('bookings')
        .select('start_time, end_time, lesson_type')
        .eq('teacher_id', teacher.id)
        .neq('status', 'cancelled')
        .in('lesson_type', IN_PERSON_LESSON_TYPES)
        .lt('start_time', new Date(startMs).toISOString())
        .gte('end_time', new Date(checkFromMs - 3 * 60 * 60 * 1000).toISOString())
      inPersonLessons = data || []
    }

    return busy.some((b) => {
      const bStart = new Date(b.start).getTime()
      const bEnd = new Date(b.end).getTime()

      // レッスン本体と重なる予定は常にNG
      if (startMs < bEnd && endMs > bStart) return true

      // 移動時間（開始前1時間）と重なる予定
      if (inPerson && checkFromMs < bEnd && startMs > bStart) {
        const isOurInPersonLesson = inPersonLessons.some((l) => {
          const lStart = new Date(l.start_time).getTime()
          const lEnd = new Date(l.end_time).getTime() + LESSON_BUFFER_MINUTES * 60 * 1000
          return lStart <= bStart && lEnd >= bEnd
        })
        return !isOurInPersonLesson
      }
      return false
    })
  } catch (error) {
    console.error('Live calendar check failed, allowing booking:', error)
    return false
  }
}

async function addToGoogleCalendar(teacher, booking, studentName) {
  if (!teacher.google_refresh_token) {
    console.log('Teacher has no Google Calendar connected')
    return null
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )

    oauth2Client.setCredentials({
      refresh_token: teacher.google_refresh_token
    })

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    const event = {
      summary: `Nihon GO! Lesson - ${studentName}`,
      description: `Japanese lesson with ${studentName}\n\nZoom: ${booking.zoom_link || 'TBD'}`,
      start: {
        dateTime: booking.start_time,
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: booking.end_time,
        timeZone: 'Europe/London',
      },
    }

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    })

    console.log('Google Calendar event created:', response.data.id)
    return response.data.id
  } catch (error) {
    console.error('Failed to add to Google Calendar:', error)
    return null
  }
}

async function sendBookingEmails(booking, teacherData, studentProfile) {
  try {
    const { data: teacherProfile } = await supabase
      .from('profiles')
      .select('email')
      .eq('user_id', teacherData.user_id)
      .single()

    const lessonDate = new Date(booking.start_time).toLocaleString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London'
    })

    // 生徒にメール送信
    const studentEmail = await resend.emails.send({
      from: 'Nihon GO! World <noreply@nihongo-world.com>',
      to: studentProfile.email,
      subject: '✅ Lesson Booking Confirmed - Nihon GO! World',
      html: `
        <h2>Your lesson has been confirmed!</h2>
        <p>Dear ${studentProfile.full_name || 'Student'},</p>
        <p>Your Japanese lesson has been successfully booked.</p>
        
        <h3>Lesson Details:</h3>
        <ul>
          <li><strong>Teacher:</strong> ${teacherData.display_name}</li>
          <li><strong>Date & Time:</strong> ${lessonDate} (London time)</li>
          <li><strong>Lesson Type:</strong> ${booking.lesson_type.replace('_', ' ')}</li>
          ${booking.zoom_link ? `<li><strong>Zoom Link:</strong> <a href="${booking.zoom_link}">${booking.zoom_link}</a></li>` : ''}
        </ul>
        
        <p><strong>Important:</strong> You can cancel or reschedule this lesson up to 24 hours before the start time for a full ticket refund.</p>
        
        <p style="margin: 24px 0;">
          <a href="${SITE_URL}/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View My Dashboard</a>
        </p>
        
        <p>See you in class!<br>
        Nihon GO! World Team</p>
      `
    })

    console.log('✅ Student email sent:', studentEmail.data?.id)

    // 講師にメール送信
    const teacherEmail = await resend.emails.send({
      from: 'Nihon GO! World <noreply@nihongo-world.com>',
      to: teacherProfile.email,
      subject: '📅 New Lesson Booking - Nihon GO! World',
      html: `
        <h2>New lesson booking</h2>
        <p>Dear ${teacherData.display_name},</p>
        <p>You have a new lesson booking.</p>
        
        <h3>Lesson Details:</h3>
        <ul>
          <li><strong>Student:</strong> ${studentProfile.full_name || 'Student'} (${studentProfile.email})</li>
          <li><strong>Date & Time:</strong> ${lessonDate} (London time)</li>
          <li><strong>Lesson Type:</strong> ${booking.lesson_type.replace('_', ' ')}</li>
          ${booking.zoom_link ? `<li><strong>Zoom Link:</strong> <a href="${booking.zoom_link}">${booking.zoom_link}</a></li>` : ''}
        </ul>
        
        <p style="margin: 24px 0;">
          <a href="${SITE_URL}/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View My Dashboard</a>
        </p>
        
        <p>Best regards,<br>
        Nihon GO! World Team</p>
      `
    })

    console.log('✅ Teacher email sent:', teacherEmail.data?.id)

    return { success: true, studentEmailId: studentEmail.data?.id, teacherEmailId: teacherEmail.data?.id }
  } catch (error) {
    console.error('❌ Failed to send booking emails:', error)
    // エラーでも予約は成功させる
    return { success: false, error: error.message }
  }
}

// チケットまわりのルール（種別の対応、レッスン尺、有効期限）は
// lib/ticketRules.js に集約している。予約画面も同じファイルを見ている。

export async function POST(request) {
  try {
    const { slotId, teacherUserId, studentUserId, ticketType, startTime, endTime } = await request.json()

    if (!slotId || !teacherUserId || !studentUserId || !ticketType || !startTime || !endTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data: ticket, error: ticketError } = await supabase
      .from('user_current_tickets')
      .select('*')
      .eq('user_id', studentUserId)
      .eq('ticket_type', ticketType)
      .gt('remaining_tickets', 0)
      .single()

    if (ticketError || !ticket) {
      return NextResponse.json({ error: 'No valid tickets available' }, { status: 400 })
    }

    const ticketCheck = checkTicketForBooking(ticket, startTime)
    if (!ticketCheck.ok) {
      return NextResponse.json({ error: ticketCheck.error }, { status: 400 })
    }

    const { data: slotData } = await supabase
      .from('teacher_availability')
      .select('teacher_id')
      .eq('id', slotId)
      .single()

    if (!slotData) {
      return NextResponse.json({ error: 'Slot not found' }, { status: 404 })
    }

    // lesson_type と end_time をサーバ側で確定（クライアント送信の endTime は使わない）。
    // in_person_90 は start + 85分。占有(85+5=90分)で重複判定する。
    const lessonType = TICKET_TO_LESSON_TYPE[ticketType] || ticketType
    const startMs = new Date(startTime).getTime()
    const bufferMs = LESSON_BUFFER_MINUTES * 60 * 1000
    const actualEndMs = startMs + lessonMinutes(lessonType) * 60 * 1000
    const enforcedEndTime = new Date(actualEndMs).toISOString()
    const candFootStart = startMs
    const candFootEnd = actualEndMs + bufferMs

    // 同一講師の既存予約（キャンセル以外）とフットプリントが重なる場合は拒否（多重予約・レース防止）
    const { data: conflictCandidates } = await supabase
      .from('bookings')
      .select('start_time, end_time, status')
      .eq('teacher_id', slotData.teacher_id)
      .neq('status', 'cancelled')
      .gte('end_time', new Date(startMs - 3 * 60 * 60 * 1000).toISOString())

    const hasConflict = (conflictCandidates || []).some((b) => {
      const bStart = new Date(b.start_time).getTime()
      const bEnd = new Date(b.end_time).getTime() + bufferMs
      return candFootStart < bEnd && candFootEnd > bStart
    })

    if (hasConflict) {
      return NextResponse.json({ error: 'This time slot is no longer available' }, { status: 409 })
    }

    const { data: teacherData } = await supabase
      .from('teachers')
      .select('*, zoom_link, google_refresh_token')
      .eq('id', slotData.teacher_id)
      .single()

    // 予約の瞬間に講師のGoogleカレンダーを確認する。
    // 1日1回の同期の後に講師が入れた予定があれば、ここで弾く。
    if (await isTeacherBusyNow(teacherData, startMs, actualEndMs, IN_PERSON_LESSON_TYPES.includes(lessonType))) {
      return NextResponse.json({ error: 'This time slot is no longer available' }, { status: 409 })
    }

    const { data: studentProfile } = await supabase
      .from('profiles')
      .select('email, full_name, user_id')
      .eq('user_id', studentUserId)
      .single()

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        student_id: studentUserId,
        teacher_id: slotData.teacher_id,
        slot_id: slotId,
        lesson_type: lessonType,
        party_size: PAIR_TICKET_TYPES.includes(ticketType) ? 2 : (ticket.party_size || 1),
        start_time: startTime,
        end_time: enforcedEndTime,
        status: 'confirmed',
        zoom_link: teacherData?.zoom_link || null
      })
      .select()
      .single()

    if (bookingError) {
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }

    await supabase
      .from('user_current_tickets')
      .update({ remaining_tickets: ticket.remaining_tickets - 1 })
      .eq('id', ticket.id)

    // Googleカレンダーに追加
    const calendarEventId = await addToGoogleCalendar(
      teacherData, 
      booking, 
      studentProfile?.full_name || 'Student'
    )

    if (calendarEventId) {
      await supabase
        .from('bookings')
        .update({ google_event_id: calendarEventId })
        .eq('id', booking.id)
    }

    // メール送信（直接統合）
    const emailResult = await sendBookingEmails(booking, teacherData, studentProfile)

    return NextResponse.json({
      success: true,
      booking,
      calendarAdded: !!calendarEventId,
      emailsSent: emailResult.success,
      message: 'Booking confirmed successfully!'
    })

  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
