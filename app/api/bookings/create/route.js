import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { google } from 'googleapis'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)
const SITE_URL = 'https://app.nihongo-world.com'

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

    // 管理者に通知メール送信
    const adminEmail = await resend.emails.send({
      from: 'Nihon GO! World <noreply@nihongo-world.com>',
      to: 'info@nihongolondon.com',
      subject: '📚 New Booking - Nihon GO! World',
      html: `
        <h2>New Lesson Booking</h2>
        
        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Student:</strong> ${studentProfile.full_name || 'Unknown'} (${studentProfile.email})</li>
          <li><strong>Teacher:</strong> ${teacherData.display_name}</li>
          <li><strong>Date & Time:</strong> ${lessonDate} (London time)</li>
          <li><strong>Lesson Type:</strong> ${booking.lesson_type.replace('_', ' ')}</li>
          ${booking.zoom_link ? `<li><strong>Zoom Link:</strong> <a href="${booking.zoom_link}">${booking.zoom_link}</a></li>` : ''}
        </ul>
        
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
      `
    })

    console.log('✅ Admin email sent:', adminEmail.data?.id)

    return { 
      success: true, 
      studentEmailId: studentEmail.data?.id, 
      teacherEmailId: teacherEmail.data?.id,
      adminEmailId: adminEmail.data?.id
    }
  } catch (error) {
    console.error('❌ Failed to send booking emails:', error)
    // エラーでも予約は成功させる
    return { success: false, error: error.message }
  }
}

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

    const { data: slotData } = await supabase
      .from('teacher_availability')
      .select('teacher_id')
      .eq('id', slotId)
      .single()

    if (!slotData) {
      return NextResponse.json({ error: 'Slot not found' }, { status: 404 })
    }

    const { data: teacherData } = await supabase
      .from('teachers')
      .select('*, zoom_link, google_refresh_token')
      .eq('id', slotData.teacher_id)
      .single()

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
        lesson_type: ticketType,
        start_time: startTime,
        end_time: endTime,
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
