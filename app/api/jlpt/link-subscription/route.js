import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const { userId, paymentIntent } = await request.json()

    if (!userId || !paymentIntent) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    const { error } = await supabase
      .from('jlpt_subscriptions')
      .update({ user_id: userId })
      .eq('stripe_payment_id', paymentIntent)
      .is('user_id', null)

    if (error) {
      console.error('Failed to link subscription:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Link subscription error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
