import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Annual licences for schools, universities and companies.
// Prices are created inline so nothing has to be set up in the Stripe dashboard first.
export const PLANS = {
  school:     { name: 'School licence',      seats: 30,  amount: 39000 },
  school_plus:{ name: 'School licence plus', seats: 60,  amount: 69000 },
  institution:{ name: 'Institution licence', seats: 100, amount: 120000 }
}

export async function POST(request) {
  try {
    const { plan, orgId, email, invoice } = await request.json()
    const p = PLANS[plan]
    if (!p) return NextResponse.json({ error: 'Unknown plan' }, { status: 400 })

    const { data: org } = await supabase
      .from('organizations')
      .select('id, name, billing_email, stripe_customer_id')
      .eq('id', orgId)
      .single()
    if (!org) return NextResponse.json({ error: 'Unknown organisation' }, { status: 400 })

    let customerId = org.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({
        name: org.name,
        email: email || org.billing_email,
        metadata: { orgId: org.id }
      })
      customerId = customer.id
      await supabase.from('organizations').update({ stripe_customer_id: customerId }).eq('id', org.id)
    }

    // Invoice route: the finance team gets an emailed invoice, payable by card or bank transfer.
    if (invoice) {
      const item = await stripe.invoiceItems.create({
        customer: customerId,
        currency: 'gbp',
        amount: p.amount,
        description: `${p.name} — up to ${p.seats} learners, 12 months`
      })
      const inv = await stripe.invoices.create({
        customer: customerId,
        collection_method: 'send_invoice',
        days_until_due: 30,
        metadata: { kind: 'school_licence', orgId: org.id, plan, seats: String(p.seats) }
      })
      await stripe.invoices.finalizeInvoice(inv.id)
      await stripe.invoices.sendInvoice(inv.id)
      return NextResponse.json({ invoiceSent: true, invoiceId: inv.id, itemId: item.id })
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'gbp',
          unit_amount: p.amount,
          recurring: { interval: 'year' },
          product_data: { name: `${p.name} — up to ${p.seats} learners` }
        }
      }],
      allow_promotion_codes: true,
      subscription_data: {
        metadata: { kind: 'school_licence', orgId: org.id, plan, seats: String(p.seats) }
      },
      metadata: { kind: 'school_licence', orgId: org.id, plan, seats: String(p.seats) },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/classes?licence=active`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/for-schools?canceled=true`
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('school-checkout error', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
