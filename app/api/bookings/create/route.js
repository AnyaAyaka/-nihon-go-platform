import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { google } from 'googleapis'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

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
      .select('full_name')
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

    // メール送信
    try {
      const emailResponse = await fetch('https://app.nihongo-world.com/api/send-booking-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: booking.id })
      })
      
      if (!emailResponse.ok) {
        console.error('Email sending failed')
      }
    } catch (emailError) {
      console.error('Failed to send confirmation emails:', emailError)
    }

    return NextResponse.json({
      success: true,
      booking,
      calendarAdded: !!calendarEventId,
      message: 'Booking confirmed successfully!'
    })

  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
