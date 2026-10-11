import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// App Store / Google Play で JLPT 模試パックが買われた時に、RevenueCat から届く。
// サイト（Stripe）で買った時と同じく jlpt_subscriptions に 60日分のアクセスを入れる。
//
// RevenueCat の Webhook 設定で Authorization ヘッダーに REVENUECAT_WEBHOOK_AUTH と同じ値を入れておく。
// テスト購入（SANDBOX）は REVENUECAT_ALLOW_SANDBOX=1 の時だけ受け付ける。

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const PRODUCT_RE = /^jlpt_(n[1-5])_60d$/
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const ACCESS_DAYS = 60

// 既存の一意キー（stripe_payment_id）を使い回すので、ストア購入には接頭辞を付けて区別する
function purchaseKey(event) {
  return `iap_${String(event.store || 'store').toLowerCase()}_${event.transaction_id || event.id}`
}

export async function POST(request) {
  const expected = process.env.REVENUECAT_WEBHOOK_AUTH
  const got = request.headers.get('authorization') || ''
  if (!expected || (got !== expected && got !== `Bearer ${expected}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body
  try {
    body = await request.json()
  } catch (e) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  const event = body && body.event
  if (!event) return NextResponse.json({ received: true })

  if (event.environment === 'SANDBOX' && process.env.REVENUECAT_ALLOW_SANDBOX !== '1') {
    return NextResponse.json({ received: true, skipped: 'sandbox' })
  }

  const match = PRODUCT_RE.exec(String(event.product_id || ''))
  if (!match) return NextResponse.json({ received: true, skipped: 'not a JLPT pack' })
  const level = match[1].toUpperCase()

  const userId = String(event.app_user_id || '')
  if (!UUID_RE.test(userId)) {
    // ログイン前の匿名購入は紐付け先がないので記録だけ残す
    console.error('RevenueCat purchase without a Supabase user id:', event.id)
    return NextResponse.json({ received: true, skipped: 'anonymous' })
  }

  const key = purchaseKey(event)

  if (event.type === 'NON_RENEWING_PURCHASE' || event.type === 'INITIAL_PURCHASE') {
    const purchasedAt = event.purchased_at_ms ? new Date(event.purchased_at_ms) : new Date()
    const expiresAt = new Date(purchasedAt)
    expiresAt.setDate(expiresAt.getDate() + ACCESS_DAYS)

    let email = null
    try {
      const { data } = await supabase.auth.admin.getUserById(userId)
      email = data && data.user ? data.user.email : null
    } catch (e) {}

    const { error } = await supabase
      .from('jlpt_subscriptions')
      .upsert({
        user_id: userId,
        level,
        purchased_at: purchasedAt.toISOString(),
        expires_at: expiresAt.toISOString(),
        stripe_payment_id: key,
        customer_email: email,
      }, { onConflict: 'stripe_payment_id' })

    if (error) {
      console.error('Failed to save store purchase:', error)
      return NextResponse.json({ error: 'Save failed' }, { status: 500 })
    }
    return NextResponse.json({ received: true })
  }

  // 返金（ストア側で取り消された）時はアクセスを止める
  if (event.type === 'CANCELLATION' && event.cancel_reason === 'CUSTOMER_SUPPORT') {
    await supabase
      .from('jlpt_subscriptions')
      .update({ expires_at: new Date().toISOString() })
      .eq('stripe_payment_id', key)
    return NextResponse.json({ received: true })
  }

  return NextResponse.json({ received: true })
}
