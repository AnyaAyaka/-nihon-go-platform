import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const SITE_URL = 'https://app.nihongo-world.com'

export async function GET(request) {
  try {
    const now = new Date()
    const in23Hours = new Date(now.getTime() + 23 * 60 * 60 * 1000)
    const in25Hours = new Date(now.getTime() + 25 * 60 * 60 * 1000)

    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*')
      .eq('status', 'confirmed')
      .gte('start_time', in23Hours.toISOString())
      .lte('start_time', in25Hours.toISOString())
      .is('reminder_sent', null)

    if (bookingsError) {
      return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({ success: true, message: 'No reminders to send', count: 0 })
    }

    let sentCount = 0

    for (const booking of bookings) {
      try {
        const { data: teacher } = await supabase
          .from('teachers')
          .select('display_name, user_id, zoom_link')
          .eq('id', booking.teacher_id)
          .single()

        const { data: teacherProfile } = await supabase
          .from('profiles')
          .select('email, full_name')
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

        const zoomLink = booking.zoom_link || teacher?.zoom_link

        if (studentProfile?.email) {
          await resend.emails.send({
            from: 'Nihon GO! World <noreply@nihongo-world.com>',
            to: studentProfile.email,
            subject: 'Lesson Reminder - Tomorrow! - Nihon GO! World',
            html: '<h2>Your Japanese lesson is tomorrow!</h2><p>Dear ' + (studentProfile.full_name || 'Student') + ',</p><p>This is a friendly reminder that you have a Japanese lesson scheduled for tomorrow.</p><h3>Lesson Details:</h3><ul><li><strong>Teacher:</strong> ' + teacher?.display_name + '</li><li><strong>Date and Time:</strong> ' + lessonDate + ' (London time)</li><li><strong>Lesson Type:</strong> ' + (booking.lesson_type?.replace('_', ' ') || '') + '</li>' + (zoomLink ? '<li><strong>Zoom Link:</strong> <a href="' + zoomLink + '">' + zoomLink + '</a></li>' : '') + '</ul><p>See you in class!<br>Nihon GO! World Team</p>'
          })
        }

        if (teacherProfile?.email) {
          await resend.emails.send({
            from: 'Nihon GO! World <noreply@nihongo-world.com>',
            to: teacherProfile.email,
            subject: 'Lesson Reminder - Tomorrow! - Nihon GO! World',
            html: '<h2>You have a lesson tomorrow!</h2><p>Dear ' + teacher?.display_name + ',</p><p>This is a reminder that you have a lesson scheduled for tomorrow.</p><h3>Lesson Details:</h3><ul><li><strong>Student:</strong> ' + (studentProfile.full_name || 'Student') + ' (' + studentProfile.email + ')</li><li><strong>Date and Time:</strong> ' + lessonDate + ' (London time)</li><li><strong>Lesson Type:</strong> ' + (booking.lesson_type?.replace('_', ' ') || '') + '</li>' + (zoomLink ? '<li><strong>Zoom Link:</strong> <a href="' + zoomLink + '">' + zoomLink + '</a></li>' : '') + '</ul><p>Best regards,<br>Nihon GO! World Team</p>'
          })
        }

        await supabase
          .from('bookings')
          .update({ reminder_sent: new Date().toISOString() })
          .eq('id', booking.id)

        sentCount++
      } catch (error) {
        console.error('Error sending reminder:', error)
      }
    }

    return NextResponse.json({ success: true, message: 'Sent ' + sentCount + ' reminders', count: sentCount })
  } catch (error) {
    console.error('Reminder error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
