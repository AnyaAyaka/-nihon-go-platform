import Stripe from 'stripe'
import { admin, send, userFrom } from '../_auth'
import { PASS_PRICES, hasPass } from '../../../../lib/pass'

// Reader Pass の購入。Stripe の定期支払い（毎月か毎年）。
// 価格は Stripe の管理画面に作らず、ここで決めている（lib/pass.js）。
export const dynamic = 'force-dynamic'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.nihongo-world.com'

export async function POST(req) {
  const user = await userFrom(req)
  if (!user) return send({ error: 'sign in required' }, 401)
  let body = {}
  try { body = await req.json() } catch (e) {}
  const plan = PASS_PRICES[body.plan] ? body.plan : 'month'
  if (await hasPass(admin, user.id)) return send({ error: 'already' }, 409)

  const p = PASS_PRICES[plan]
  const { data: prev } = await admin.from('reader_pass').select('stripe_customer_id').eq('user_id', user.id).maybeSingle()
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'gbp',
        unit_amount: p.amount,
        recurring: { interval: p.interval },
        product_data: { name: 'Nihon GO! Reader Pass', description: 'Mini tests, grammar practice and every JLPT mock test, N5 to N1' },
      },
    }],
    ...(prev?.stripe_customer_id ? { customer: prev.stripe_customer_id } : { customer_email: user.email }),
    allow_promotion_codes: true,
    metadata: { kind: 'reader_pass', userId: user.id, plan },
    subscription_data: { metadata: { kind: 'reader_pass', userId: user.id, plan } },
    success_url: `${BASE}/pass?done=1`,
    cancel_url: `${BASE}/pass`,
  })
  return send({ url: session.url }, 200)
}
