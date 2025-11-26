import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const { slotId, teacherUserId, studentUserId, ticketType } = await request.json()

    if (!slotId || !teacherUserId || !studentUserId || !ticketType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. チケットを確認・減算
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

    // 2. スロットを予約済みにする
    const { error: slotError } = await supabase
      .from('teacher_availability')
      .update({ is_available: false })
      .eq('id', slotId)
      .eq('is_available', true) // 二重予約防止

    if (slotError) {
      return NextResponse.json({ error: 'Failed to book slot' }, { status: 500 })
    }

    // 3. 予約レコードを作成
    const { data: slotData } = await supabase
      .from('teacher_availability')
      .select('start_time_utc, end_time_utc, teacher_id')
      .eq('id', slotId)
      .single()

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        student_id: studentUserId,
        teacher_id: slotData.teacher_id,
        slot_id: slotId,
        lesson_type: ticketType,
        start_time: slotData.start_time_utc,
        end_time: slotData.end_time_utc,
        status: 'confirmed'
      })
      .select()
      .single()

    if (bookingError) {
      // ロールバック: スロットを再び利用可能にする
      await supabase
        .from('teacher_availability')
        .update({ is_available: true })
        .eq('id', slotId)
      
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }

    // 4. チケットを減算
    await supabase
      .from('user_current_tickets')
      .update({ remaining_tickets: ticket.remaining_tickets - 1 })
      .eq('id', ticket.id)

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
