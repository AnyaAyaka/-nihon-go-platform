import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

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
      .select('zoom_link')
      .eq('id', slotData.teacher_id)
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
      message: 'Booking confirmed successfully!'
    })

  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
