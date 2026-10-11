'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { isNativeApp } from '../../../lib/native'

const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'] as const
type JLPTLevel = typeof JLPT_LEVELS[number]

const PRICE_IDS: Record<JLPTLevel, string> = {
  N5: 'price_1TISm3D1Jzw9CFosuzy82ddE',
  N4: 'price_1TISmwD1Jzw9CFosxN3Xhlzh',
  N3: 'price_1TISoiD1Jzw9CFospZ3u7hsV',
  N2: 'price_1TISpPD1Jzw9CFosDTU3hv7e',
  N1: 'price_1TISqED1Jzw9CFosRqCK28J9',
}

function PurchaseContent() {
  const searchParams = useSearchParams()
  const defaultLevel = (searchParams.get('level') as JLPTLevel) || 'N3'
  const [selected, setSelected] = useState<JLPTLevel>(defaultLevel)
  const [loading, setLoading] = useState(false)

  // ストアのアプリの中では、Stripe ではなくアプリ内課金で買う（Apple / Google の決まり）
  const [native, setNative] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [storePrice, setStorePrice] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isNativeApp()) return
    setNative(true)
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        const next = `/jlpt/purchase?level=${selected}`
        window.location.href = `/auth?reason=jlpt&next=${encodeURIComponent(next)}`
        return
      }
      setUserId(user.id)
    })
  }, [])

  useEffect(() => {
    if (!native || !userId) return
    setStorePrice(null)
    import('../../../lib/iap').then(({ jlptStorePrice }) =>
      jlptStorePrice(selected, userId).then(setStorePrice))
  }, [native, userId, selected])

  // 購入の記録は RevenueCat 経由で数秒遅れて届くので、入るまで少し待つ
  const waitForAccess = async (uid: string, level: JLPTLevel) => {
    for (let i = 0; i < 15; i++) {
      const { data } = await supabase
        .from('jlpt_subscriptions')
        .select('id')
        .eq('user_id', uid)
        .eq('level', level)
        .gt('expires_at', new Date().toISOString())
        .limit(1)
      if (data && data.length) return true
      await new Promise((r) => setTimeout(r, 2000))
    }
    return false
  }

  const handleStorePurchase = async () => {
    if (!userId) return
    setLoading(true)
    setMessage('')
    try {
      const { buyJlptPack } = await import('../../../lib/iap')
      const result = await buyJlptPack(selected, userId)
      if (result.cancelled) return
      const ready = await waitForAccess(userId, selected)
      if (ready) setDone(true)
      else setMessage('Payment received. Your access may take a minute to appear. Please reopen the tests shortly.')
    } catch (error: any) {
      setMessage(error?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (native && done) {
    return (
      <div style={{ maxWidth: '480px', margin: '60px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Your {selected} pack is ready</h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>You have 60 days of unlimited access to every {selected} mock test.</p>
        <a href="https://nihongo-world.com/materials/jlpt/" style={{
          display: 'block', textAlign: 'center', padding: '14px', background: '#2563eb', color: '#fff',
          borderRadius: '8px', fontSize: '16px', fontWeight: 600, textDecoration: 'none',
        }}>Start the mock tests</a>
      </div>
    )
  }

  const handlePurchase = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: PRICE_IDS[selected],
          userId: null,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '480px', margin: '60px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>JLPT Mock Test Pack</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        60-day unlimited access to all mock tests. Select your level below.
      </p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {JLPT_LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => setSelected(level)}
            style={{
              padding: '10px 16px',
              border: selected === level ? '2px solid #2563eb' : '2px solid #e5e7eb',
              borderRadius: '8px',
              background: selected === level ? '#eff6ff' : '#fff',
              color: selected === level ? '#2563eb' : '#374151',
              fontWeight: selected === level ? '700' : '400',
              cursor: 'pointer',
            }}
          >
            {level}
          </button>
        ))}
      </div>
      <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <p style={{ margin: '0 0 8px', fontWeight: '600', fontSize: '18px' }}>{selected} Mock Test Pack</p>
        <p style={{ margin: '0 0 16px', color: '#666' }}>60-day access · Unlimited retakes · Full explanations</p>
        {native ? (
          <p style={{ margin: '0', fontSize: '28px', fontWeight: '700' }}>{storePrice || '…'}</p>
        ) : (
          <p style={{ margin: '0', fontSize: '28px', fontWeight: '700' }}>
            £9.99{' '}
            <span style={{ fontSize: '14px', color: '#ef4444', fontWeight: '400' }}>
              Beta price (usually £19.99)
            </span>
          </p>
        )}
      </div>
      {message && <p style={{ color: '#b91c1c', marginBottom: '16px' }}>{message}</p>}
      <button
        onClick={native ? handleStorePurchase : handlePurchase}
        disabled={loading || (native && (!userId || !storePrice))}
        style={{
          width: '100%',
          padding: '14px',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Processing...' : `Buy ${selected} Pack`}
      </button>
    </div>
  )
}

export default function JLPTPurchasePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseContent />
    </Suspense>
  )
}
