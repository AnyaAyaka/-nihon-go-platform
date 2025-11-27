import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const { bookingId } = await request.json()

    // 予約情報を取得
    const { data: booking } = await supabase
      .from('bookings')
      .select(`
        *,
        teachers:teacher_id (display_name, user_id),
        students:student_id (email, full_name)
      `)
      .eq('id', bookingId)
      .single()

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // 講師のメールアドレスを取得
    const { data: teacherProfile } = await supabase
      .from('profiles')
      .select('email')
      .eq('user_id', booking.teachers.user_id)
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
      to: booking.students.email,
      subject: '✅ Lesson Booking Confirmed - Nihon GO! World',
      html: `
        <h2>Your lesson has been confirmed!</h2>
        <p>Dear ${booking.students.full_name},</p>
        <p>Your Japanese lesson has been successfully booked.</p>
        
        <h3>Lesson Details:</h3>
        <ul>
          <li><strong>Teacher:</strong> ${booking.teachers.display_name}</li>
          <li><strong>Date & Time:</strong> ${lessonDate} (London time)</li>
          <li><strong>Lesson Type:</strong> ${booking.lesson_type.replace('_', ' ')}</li>
          ${booking.zoom_link ? `<li><strong>Zoom Link:</strong> <a href="${booking.zoom_link}">${booking.zoom_link}</a></li>` : ''}
        </ul>
        
        <p><strong>Important:</strong> You can cancel or reschedule this lesson up to 24 hours before the start time for a full ticket refund.</p>
        
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
        <p>Dear ${booking.teachers.display_name},</p>
        <p>You have a new lesson booking.</p>
        
        <h3>Lesson Details:</h3>
        <ul>
          <li><strong>Student:</strong> ${booking.students.full_name} (${booking.students.email})</li>
          <li><strong>Date & Time:</strong> ${lessonDate} (London time)</li>
          <li><strong>Lesson Type:</strong> ${booking.lesson_type.replace('_', ' ')}</li>
          ${booking.zoom_link ? `<li><strong>Zoom Link:</strong> <a href="${booking.zoom_link}">${booking.zoom_link}</a></li>` : ''}
        </ul>
        
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
