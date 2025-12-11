import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const SITE_URL = 'https://app.nihongo-world.com'

export async function POST(request) {
  try {
    const { bookingId } = await request.json()

    console.log('📧 Sending confirmation email for booking:', bookingId)

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single()

    if (bookingError || !booking) {
      console.error('Booking not found:', bookingError)
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const { data: teacher } = await supabase
      .from('teachers')
      .select('display_name, user_id')
      .eq('id', booking.teacher_id)
      .single()

    const { data: teacherProfile } = await supabase
      .from('profiles')
      .select('email')
      .eq('user_id', teacher.user_id)
      .single()

    const { data: studentProfile } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('user_id', booking.student_id)
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
    await resend.emails.send({
      from: 'Nihon GO! World <noreply@nihongo-world.com>',
      to: studentProfile.email,
      subject: '✅ Lesson Booking Confirmed - Nihon GO! World',
      html: `
        <h2>Your lesson has been confirmed!</h2>
        <p>Dear ${studentProfile.full_name || 'Student'},</p>
        <p>Your Japanese lesson has been successfully booked.</p>
        
        <h3>Lesson Details:</h3>
        <ul>
          <li><strong>Teacher:</strong> ${teacher.display_name}</li>
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

    // 講師にメール送信
    await resend.emails.send({
      from: 'Nihon GO! World <noreply@nihongo-world.com>',
      to: teacherProfile.email,
      subject: '📅 New Lesson Booking - Nihon GO! World',
      html: `
        <h2>New lesson booking</h2>
        <p>Dear ${teacher.display_name},</p>
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

    return NextResponse.json({ success: true, message: 'Emails sent successfully' })

  } catch (error) {
    console.error('Error sending emails:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
