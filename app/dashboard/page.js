'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1']

const PRICE_IDS: Record<string, string> = {
  N5: 'price_1TISm3D1Jzw9CFosuzy82ddE',
  N4: 'price_1TISmwD1Jzw9CFosxN3Xhlzh',
  N3: 'price_1TISoiD1Jzw9CFospZ3u7hsV',
  N2: 'price_1TISpPD1Jzw9CFosDTU3hv7e',
  N1: 'price_1TISqED1Jzw9CFosRqCK28J9',
}

export default function JLPTPurchasePage() {
  const [selected, setSelected] = useState('N3')
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const level = params.get('level')
    if (level && JLPT_LEVELS.includes(level)) {
      setSelected(level)
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id)
    })
  }, [])

  const handlePurchase = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: PRICE_IDS[selected],
          userId: userId,
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
        <p style={{ margin: '0', fontSize: '28px', fontWeight: '700' }}>
          £9.99{' '}
          <span style={{ fontSize: '14px', color: '#ef4444', fontWeight: '400' }}>
            Beta price (usually £19.99)
          </span>
        </p>
      </div>

      <button
        onClick={handlePurchase}
        disabled={loading}
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
