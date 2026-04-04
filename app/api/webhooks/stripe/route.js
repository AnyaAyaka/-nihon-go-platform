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

const JLPT_PRICE_TO_LEVEL = {
  'price_1TISm3D1Jzw9CFosuzy82ddE': 'N5',
  'price_1TISmwD1Jzw9CFosxN3Xhlzh': 'N4',
  'price_1TISoiD1Jzw9CFospZ3u7hsV': 'N3',
  'price_1TISpPD1Jzw9CFosDTU3hv7e': 'N2',
  'price_1TISqED1Jzw9CFosRqCK28J9': 'N1',
}

const PRICE_TO_TICKET_TYPE = {
  'price_1SKoIUD1Jzw9CFosLC6YJDbE': { type: 'online_trial', tickets: 1, name: 'Online Trial', price: '£23' },
  'price_1THK0jD1Jzw9CFosdvfDwLmB': { type: 'online', tickets: 1, name: 'Online Single', price: '£35' },
  'price_1SKoMdD1Jzw9CFossg3r23ni': { type: 'online', tickets: 4, name: 'Online 4-Pack', price: '£120' },
  'price_1THK10D1Jzw9CFosCXP59bx0': { type: 'in_person', tickets: 1, name: 'In-Person Single', price: '£50' },
  'price_1SKoNHD1Jzw9CFos5bXzv5br': { type: 'in_person', tickets: 4, name: 'In-Person 4-Pack', price: '£180' },
  'price_1SKoNlD1Jzw9CFosNNFJmjI4': { type: 'premium', tickets: 4, name: 'Premium 4 Tickets (Legacy)', price: '£140' }
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

    // JLPTの購入チェック
    const jlptLevel = JLPT_PRICE_TO_LEVEL[priceId]

    if (jlptLevel) {
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 60)

      await supabase
        .from('jlpt_subscriptions')
        .upsert({
          user_id: userId,
          level: jlptLevel,
          purchased_at: new Date().toISOString(),
          expires_at: expiresAt.toISOString(),
          stripe_payment_id: session.payment_intent
        }, { onConflict: 'user_id,level' })

      console.log(`JLPT ${jlptLevel} subscription created for user ${userId}`)
      return NextResponse.json({ received: true })
    }

    // 通常のチケット処理
    const ticketInfo = PRICE_TO_TICKET_TYPE[priceId]

    if (!ticketInfo) {
      console.error('Unknown price ID:', priceId)
      return NextResponse.json({ error: 'Unknown price' }, { status: 400 })
    }

    console.log('Ticket info:', ticketInfo)

    const { data: userProfile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('user_id', userId)
      .single()

    const { data: currentTickets } = await supabase
      .from('user_current_tickets')
      .select('remaining_tickets, expires_at')
      .eq('user_id', userId)
      .eq('ticket_type', ticketInfo.type)
      .single()

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 28)

    if (currentTickets) {
      const currentExpiry = new Date(currentTickets.expires_at)
      const newExpiry = currentExpiry > new Date()
        ? new Date(currentExpiry.setDate(currentExpiry.getDate() + 28))
        : expiresAt

      await supabase
        .from('user_current_tickets')
        .update({
          remaining_tickets: currentTickets.remaining_tickets + ticketInfo.tickets,
          expires_at: newExpiry.toISOString(),
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
          expires_at: expiresAt.toISOString(),
          updated_at: new Date().toISOString()
        })
    }

    try {
      await resend.emails.send({
        from: 'Nihon GO! World <noreply@nihongo-world.com>',
        to: 'info@nihongolondon.com',
        subject: 'New Purchase - Nihon GO! World',
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
