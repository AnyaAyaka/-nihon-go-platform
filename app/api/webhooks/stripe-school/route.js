import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Separate endpoint so the lesson / JLPT webhook keeps working untouched.
// In Stripe, add a second endpoint pointing at /api/webhooks/stripe-school
// and put its signing secret in STRIPE_WEBHOOK_SECRET_SCHOOL.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function activate(meta, extra = {}) {
  if (!meta?.orgId) return
  await supabase
    .from('organizations')
    .update({
      status: 'active',
      seats: meta.seats ? Number(meta.seats) : undefined,
      ...extra
    })
    .eq('id', meta.orgId)
}

export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET_SCHOOL)
  } catch (err) {
    console.error('school webhook signature failed:', err.message)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  const obj = event.data.object
  const meta = obj.metadata || {}
  if (meta.kind !== 'school_licence') return NextResponse.json({ received: true })

  switch (event.type) {
    case 'checkout.session.completed':
      await activate(meta, { stripe_customer_id: obj.customer })
      break
    case 'invoice.paid':
      await activate(meta)
      break
    case 'invoice.payment_failed':
      if (meta.orgId) {
        await supabase.from('organizations').update({ status: 'past_due' }).eq('id', meta.orgId)
      }
      break
    case 'customer.subscription.deleted':
      if (meta.orgId) {
        await supabase.from('organizations').update({ status: 'cancelled' }).eq('id', meta.orgId)
      }
      break
    default:
      break
  }

  return NextResponse.json({ received: true })
}
