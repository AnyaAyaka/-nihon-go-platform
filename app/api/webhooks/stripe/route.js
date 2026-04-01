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
  // Online
  'price_1SKoIUD1Jzw9CFosLC6YJDbE': { type: 'online_trial', tickets: 1, name: 'Online Trial', price: '£23' },
  'price_1THK0jD1Jzw9CFosdvfDwLmB': { type: 'online', tickets: 1, name: 'Online Single', price: '£35' },
  'price_1SKoMdD1Jzw9CFossg3r23ni': { type: 'online', tickets: 4, name: 'Online 4-Pack', price: '£120' },
  // In-Person
  'price_1THK10D1Jzw9CFosCXP59bx0': { type: 'in_person', tickets: 1, name: 'In-Person Single', price: '£50' },
  'price_1SKoNHD1Jzw9CFos5bXzv5br': { type: 'in_person', tickets: 4, name: 'In-Person 4-Pack', price: '£180' },
  // Legacy (keep for existing purchases)
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
      .select('remaining_tickets, expires_at')
      .eq('user_id', userId)
      .eq('ticket_type', ticketInfo.type)
      .single()

    // 有効期限を計算（4週間後）
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 28)

    if (currentTickets) {
      // 既存チケットがある場合は追加
      // 有効期限は、現在の期限がまだ有効なら延長、期限切れなら新規設定
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
      // 新規作成
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

    // 管理者に通知メール送信
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
