import Stripe from 'stripe'
import { admin, send, userFrom } from '../_auth'

// 解約やカードの変更は Stripe の画面でしてもらう
export const dynamic = 'force-dynamic'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.nihongo-world.com'

export async function POST(req) {
  const user = await userFrom(req)
  if (!user) return send({ error: 'sign in required' }, 401)
  const { data } = await admin.from('reader_pass').select('stripe_customer_id, source').eq('user_id', user.id).maybeSingle()
  if (!data?.stripe_customer_id) return send({ error: 'no stripe customer', source: data?.source || null }, 404)
  const s = await stripe.billingPortal.sessions.create({ customer: data.stripe_customer_id, return_url: `${BASE}/pass` })
  return send({ url: s.url }, 200)
}
