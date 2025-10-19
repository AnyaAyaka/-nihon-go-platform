import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

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
    
    let ticketsToAdd = 0
    if (priceId === 'price_1SFTbDD1Jzw9CFoslgOlWedF') ticketsToAdd = 1
    if (priceId === 'price_1SFTbjD1Jzw9CFosWXNqEkTo') ticketsToAdd = 4
    if (priceId === 'price_1SFTcKD1Jzw9CFosBY5pShNO') ticketsToAdd = 4
    if (priceId === 'price_1SFTctD1Jzw9CFos7z3HspPP') ticketsToAdd = 4

    console.log('Tickets to add:', ticketsToAdd)

    const { data: currentTickets, error: fetchError } = await supabase
      .from('user_current_tickets')
      .select('remaining_tickets')
      .eq('user_id', userId)
      .single()

    console.log('Current tickets:', currentTickets)
    console.log('Fetch error:', fetchError)

    if (currentTickets) {
      const { data: updateResult, error: updateError } = await supabase
        .from('user_current_tickets')
        .update({
          remaining_tickets: currentTickets.remaining_tickets + ticketsToAdd,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
      
      console.log('Update result:', updateResult)
      console.log('Update error:', updateError)
    } else {
      const { data: insertResult, error: insertError } = await supabase
        .from('user_current_tickets')
        .insert({
          user_id: userId,
          remaining_tickets: ticketsToAdd,
          updated_at: new Date().toISOString()
        })
      
      console.log('Insert result:', insertResult)
      console.log('Insert error:', insertError)
    }

    console.log(`Added ${ticketsToAdd} tickets to user ${userId}`)
  }

  return NextResponse.json({ received: true })
}
