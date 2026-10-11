// アプリ内課金（App Store / Google Play）。RevenueCat 経由で買う。
// サイトのブラウザ版では読み込まれない（使う時だけ import する）。
//
// 商品ID はストアと RevenueCat の両方で、この名前で登録する:
//   jlpt_n5_60d, jlpt_n4_60d, jlpt_n3_60d, jlpt_n2_60d, jlpt_n1_60d
// 買われた記録は RevenueCat から /api/webhooks/revenuecat に届き、
// サイトで買った時と同じ jlpt_subscriptions に入る。

import { nativePlatform } from './native'

export function jlptProductId(level) {
  return `jlpt_${String(level).toLowerCase()}_60d`
}

let configuredFor = null

async function purchases(userId) {
  const mod = await import('@revenuecat/purchases-capacitor')
  const { Purchases } = mod
  if (configuredFor !== userId) {
    const platform = nativePlatform()
    const apiKey = platform === 'ios'
      ? process.env.NEXT_PUBLIC_REVENUECAT_IOS_KEY
      : process.env.NEXT_PUBLIC_REVENUECAT_ANDROID_KEY
    if (!apiKey) throw new Error('In-app purchases are not set up yet.')
    // appUserID を Supabase のユーザーID にしておくと、Webhook でそのまま誰の購入か分かる
    await Purchases.configure({ apiKey, appUserID: userId })
    configuredFor = userId
  }
  return mod
}

async function findProduct(level, userId) {
  const { Purchases, PRODUCT_CATEGORY } = await purchases(userId)
  const { products } = await Purchases.getProducts({
    productIdentifiers: [jlptProductId(level)],
    type: PRODUCT_CATEGORY.NON_SUBSCRIPTION,
  })
  return products && products[0] ? products[0] : null
}

// ストアに表示する値段（例 "£11.99"）。取れなければ null。
export async function jlptStorePrice(level, userId) {
  try {
    const product = await findProduct(level, userId)
    return product ? product.priceString : null
  } catch (e) {
    return null
  }
}

// 買う。キャンセルなら { cancelled: true }、成功なら { ok: true }。
export async function buyJlptPack(level, userId) {
  const product = await findProduct(level, userId)
  if (!product) throw new Error('This pack is not available in the store yet.')
  const { Purchases } = await purchases(userId)
  try {
    await Purchases.purchaseStoreProduct({ product })
    return { ok: true }
  } catch (e) {
    if (e && (e.userCancelled || e.code === '1' || e.code === 1)) return { cancelled: true }
    throw e
  }
}
