import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { bookingId, refundTicket } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 })
    }

    // 予約情報を取得
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // 講師情報を取得
    const { data: teacher } = await supabase
      .from('teachers')
      .select('display_name, user_id')
      .eq('id', booking.teacher_id)
      .single()

    // 講師のメールアドレスを取得
    const { data: teacherProfile } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('user_id', teacher?.user_id)
      .single()

    // 生徒情報を取得
    const { data: studentProfile } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('user_id', booking.student_id)
      .single()

    // 予約をキャンセル
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 })
    }

    // スロットを再び利用可能にする
    if (booking.slot_id) {
      await supabase
        .from('teacher_availability')
        .update({ is_available: true })
        .eq('id', booking.slot_id)
    }

    // チケット返却（24時間前までの場合のみ）
    if (refundTicket) {
      const { data: currentTicket } = await supabase
        .from('user_current_tickets')
        .select('remaining_tickets')
        .eq('user_id', booking.student_id)
        .eq('ticket_type', booking.lesson_type)
        .single()

      if (currentTicket) {
        await supabase
          .from('user_current_tickets')
          .update({ 
            remaining_tickets: currentTicket.remaining_tickets + 1
          })
          .eq('user_id', booking.student_id)
          .eq('ticket_type', booking.lesson_type)
      }
    }

    // レッスン日時をフォーマット
    const lessonDate = new Date(booking.start_time).toLocaleString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London'
    })

    // 生徒にキャンセル通知メール送信
    if (studentProfile?.email) {
      try {
        await resend.emails.send({
          from: 'Nihon GO! World <noreply@nihongo-world.com>',
          to: studentProfile.email,
          subject: 'Lesson Cancelled - Nihon GO! World',
          html: '<h2>Your lesson has been cancelled</h2>' +
            '<p>Dear ' + (studentProfile.full_name || 'Student') + ',</p>' +
            '<p>Your Japanese lesson has been cancelled.</p>' +
            '<h3>Cancelled Lesson Details:</h3>' +
            '<ul>' +
            '<li><strong>Teacher:</strong> ' + (teacher?.display_name || 'Teacher') + '</li>' +
            '<li><strong>Date and Time:</strong> ' + lessonDate + ' (London time)</li>' +
            '<li><strong>Lesson Type:</strong> ' + (booking.lesson_type?.replace('_', ' ') || '') + '</li>' +
            '</ul>' +
            (refundTicket ? '<p><strong>Your ticket has been refunded.</strong></p>' : '<p><strong>No ticket refund (cancelled within 24 hours of lesson).</strong></p>') +
            '<p>You can book a new lesson anytime from your dashboard.</p>' +
            '<p>Best regards,<br>Nihon GO! World Team</p>'
        })
      } catch (emailError) {
        console.error('Error sending student cancellation email:', emailError)
      }
    }

    // 講師にキャンセル通知メール送信
    if (teacherProfile?.email) {
      try {
        await resend.emails.send({
          from: 'Nihon GO! World <noreply@nihongo-world.com>',
          to: teacherProfile.email,
          subject: 'Lesson Cancelled - Nihon GO! World',
          html: '<h2>A lesson has been cancelled</h2>' +
            '<p>Dear ' + (teacher?.display_name || 'Teacher') + ',</p>' +
            '<p>A student has cancelled their lesson with you.</p>' +
            '<h3>Cancelled Lesson Details:</h3>' +
            '<ul>' +
            '<li><strong>Student:</strong> ' + (studentProfile?.full_name || 'Student') + ' (' + (studentProfile?.email || '') + ')</li>' +
            '<li><strong>Date and Time:</strong> ' + lessonDate + ' (London time)</li>' +
            '<li><strong>Lesson Type:</strong> ' + (booking.lesson_type?.replace('_', ' ') || '') + '</li>' +
            '</ul>' +
            '<p>This time slot is now available for other bookings.</p>' +
            '<p>Best regards,<br>Nihon GO! World Team</p>'
        })
      } catch (emailError) {
        console.error('Error sending teacher cancellation email:', emailError)
      }
    }

    return NextResponse.json({
      success: true,
      refunded: refundTicket,
      message: refundTicket 
        ? 'Booking cancelled and ticket refunded' 
        : 'Booking cancelled (no refund - within 24 hours)'
    })

  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
