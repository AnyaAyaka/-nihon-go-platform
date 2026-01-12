import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
const resend = new Resend(process.env.RESEND_API_KEY)

const PRICE_TO_TICKET_TYPE = {
  'price_1SKoIUD1Jzw9CFosLC6YJDbE': { type: 'online_trial', tickets: 1, name: 'Online Trial', price: '£23' },
  'price_1SKoMdD1Jzw9CFossg3r23ni': { type: 'online', tickets: 4, name: 'Online 4 Tickets', price: '£120' },
  'price_1SKoNHD1Jzw9CFos5bXzv5br': { type: 'in_person', tickets: 4, name: 'In-Person 4 Tickets', price: '£180' },
  'price_1SKoNlD1Jzw9CFosNNFJmjI4': { type: 'premium', tickets: 4, name: 'Premium 4 Tickets', price: '£140' }
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

    // ユーザー情報取得
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('user_id', userId)
      .single()

    // チケット処理
    const { data: currentTickets } = await supabase
      .from('user_current_tickets')
      .select('remaining_tickets')
      .eq('user_id', userId)
      .eq('ticket_type', ticketInfo.type)
      .single()

    if (currentTickets) {
      await supabase
        .from('user_current_tickets')
        .update({
          remaining_tickets: currentTickets.remaining_tickets + ticketInfo.tickets,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('ticket_type', ticketInfo.type)
    } else {
      await supabase
        .from('user_current_tickets')
        .insert({
          user_id: userId,
          ticket_type: ticketInfo.type,
          remaining_tickets: ticketInfo.tickets,
          updated_at: new Date().toISOString()
        })
    }

    // 管理者に通知メール送信
    try {
      await resend.emails.send({
        from: 'Nihon GO! World <noreply@nihongo-world.com>',
        to: 'info@nihongo-world.com',
        subject: '💰 New Purchase - Nihon GO! World',
        html: `
          <h2>New Ticket Purchase!</h2>
          <h3>Customer Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${userProfile?.full_name || 'Unknown'}</li>
            <li><strong>Email:</strong> ${userProfile?.email || session.customer_email || 'Unknown'}</li>
          </ul>
          <h3>Purchase Details:</h3>
          <ul>
            <li><strong>Product:</strong> ${ticketInfo.name}</li>
            <li><strong>Price:</strong> ${ticketInfo.price}</li>
            <li><strong>Tickets:</strong> ${ticketInfo.tickets}</li>
          </ul>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
        `
      })
      console.log('Admin notification sent')
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError)
    }
  }

  return NextResponse.json({ received: true })
}
