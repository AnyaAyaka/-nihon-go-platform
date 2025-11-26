import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

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
      // 現在のチケット数を取得
      const { data: currentTicket } = await supabase
        .from('user_current_tickets')
        .select('remaining_tickets')
        .eq('user_id', booking.student_id)
        .eq('ticket_type', booking.lesson_type)
        .single()

      if (currentTicket) {
        // チケット数を1増やす
        await supabase
          .from('user_current_tickets')
          .update({ 
            remaining_tickets: currentTicket.remaining_tickets + 1
          })
          .eq('user_id', booking.student_id)
          .eq('ticket_type', booking.lesson_type)
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
