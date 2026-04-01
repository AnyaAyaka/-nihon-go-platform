import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// ティアに応じたクーポンコードを取得
function getTierCoupon(tier) {
  switch (tier) {
    case 'platinum':
      return 'PLATINUM20OFF'
    case 'gold':
      return 'GOLD15OFF'
    case 'silver':
      return 'SILVER10OFF'
    case 'bronze':
      return 'BRONZE5OFF'
    default:
      return null
  }
}

export async function POST(request) {
  try {
    const { priceId, userId } = await request.json()
    
    // ユーザーのティアを取得
    let tierCoupon = null
    if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('tier')
        .eq('user_id', userId)
        .single()
      
      if (profile?.tier) {
        tierCoupon = getTierCoupon(profile.tier)
        console.log(`User tier: ${profile.tier}, applying coupon: ${tierCoupon}`)
      }
    }

    // チェックアウトセッションのオプション
    const sessionOptions = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/subscription?canceled=true`,
      metadata: {
        userId: userId,
      },
    }

    // ティアクーポンがある場合は適用、なければプロモーションコード入力を許可
    if (tierCoupon) {
      // Stripeでクーポンを取得してdiscountに設定
      try {
        const promotionCodes = await stripe.promotionCodes.list({
          code: tierCoupon,
          active: true,
          limit: 1
        })
        
        if (promotionCodes.data.length > 0) {
          sessionOptions.discounts = [{ promotion_code: promotionCodes.data[0].id }]
          console.log(`Applied tier discount: ${tierCoupon}`)
        } else {
          // クーポンが見つからない場合はプロモーションコード入力を許可
          sessionOptions.allow_promotion_codes = true
        }
      } catch (couponError) {
        console.error('Error applying tier coupon:', couponError)
        sessionOptions.allow_promotion_codes = true
      }
    } else {
      // ティアがない場合はプロモーションコード入力を許可
      sessionOptions.allow_promotion_codes = true
    }

    const session = await stripe.checkout.sessions.create(sessionOptions)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
