import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Price ID → Ticket Type マッピング
const PRICE_TO_TICKET_TYPE = {
  'price_1SKoIUD1Jzw9CFosLC6YJDbE': { type: 'online_trial', tickets: 1 },  // Online Trial £23
  'price_1SKoMdD1Jzw9CFossg3r23ni': { type: 'online', tickets: 4 },         // Online 4 £120
  'price_1SKoNHD1Jzw9CFos5bXzv5br': { type: 'in_person', tickets: 4 },      // In-person 4 £180
  'price_1SKoNlD1Jzw9CFosNNFJmjI4': { type: 'premium', tickets: 4 }         // Premium 4 £140
}

export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.metadata.userId
    
    console.log('Processing checkout for user:', userId)
    
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
    const priceId = lineItems.data[0].price.id
    
    const ticketInfo = PRICE_TO_TICKET_TYPE[priceId]
    
    if (!ticketInfo) {
      console.error('Unknown price ID:', priceId)
      return NextResponse.json({ error: 'Unknown price' }, { status: 400 })
    }

    console.log('Ticket info:', ticketInfo)

    // この ticket_type の既存チケットをチェック
    const { data: currentTickets, error: fetchError } = await supabase
      .from('user_current_tickets')
      .select('remaining_tickets')
      .eq('user_id', userId)
      .eq('ticket_type', ticketInfo.type)
      .single()

    console.log('Current tickets for type:', currentTickets)

    if (currentTickets) {
      // 既存のチケットに追加
      const { error: updateError } = await supabase
        .from('user_current_tickets')
        .update({
          remaining_tickets: currentTickets.remaining_tickets + ticketInfo.tickets,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('ticket_type', ticketInfo.type)
      
      if (updateError) {
        console.error('Update error:', updateError)
      } else {
        console.log(`Added ${ticketInfo.tickets} ${ticketInfo.type} tickets to user ${userId}`)
      }
    } else {
      // 新規チケット作成
      const { error: insertError } = await supabase
        .from('user_current_tickets')
        .insert({
          user_id: userId,
          ticket_type: ticketInfo.type,
          remaining_tickets: ticketInfo.tickets,
          updated_at: new Date().toISOString()
        })
      
      if (insertError) {
        console.error('Insert error:', insertError)
      } else {
        console.log(`Created ${ticketInfo.tickets} ${ticketInfo.type} tickets for user ${userId}`)
      }
    }
  }

  return NextResponse.json({ received: true })
}
