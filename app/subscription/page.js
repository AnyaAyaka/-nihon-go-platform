'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function SubscriptionPage() {
  const [user, setUser] = useState(null)
  const [subscriptionPlans, setSubscriptionPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    fetchSubscriptionPlans()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth')
      return
    }
    setUser(user)
    setLoading(false)
  }

  const fetchSubscriptionPlans = async () => {
    const plans = [
      { id: 'trial', name: 'Online Trial Lesson', price: 23, tickets: 1, description: 'For first-time use only - 55 min', priceId: 'price_1SFTbDD1Jzw9CFoslgOlWedF' },
      { id: 'online', name: 'Online Tutoring 4 tickets', price: 120, tickets: 4, description: '55 min lessons - Expiration: 4 weeks', priceId: 'price_1SFTbjD1Jzw9CFosWXNqEkTo' },
      { id: 'inperson', name: 'In-person in the UK 4 tickets', price: 180, tickets: 4, description: '55 min lessons - Expiration: 4 weeks', priceId: 'price_1SFTcKD1Jzw9CFosBY5pShNO' },
      { id: 'premium', name: 'Premium lesson w/ Ayaka 4 tickets', price: 140, tickets: 4, description: '55 min premium lessons - Expiration: 4 weeks', priceId: 'price_1SFTctD1Jzw9CFos7z3HspPP' }
    ]
    setSubscriptionPlans(plans)
  }

  const subscribeToPlan = async (plan) => {
    setSubscribing(true)
    try {
      const response = await fetch('/api/create-checkout-session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priceId: plan.priceId, userId: user.id }) })
      const data = await response.json()
      if (data.url) window.location.href = data.url
    } catch (error) {
      console.error('Error:', error)
      alert('Error subscribing to plan.')
      setSubscribing(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '30px', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><h1 style={{ fontSize: '32px', fontWeight: '700', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 10px 0' }}>🎫 Buy Lesson Tickets</h1><p style={{ margin: 0, color: '#666' }}>Choose your lesson package</p></div>
          <button onClick={() => router.push('/dashboard')} style={{ padding: '12px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '25px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Back to Dashboard</button>
        </div>
        <div style={{ background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '30px', color: '#333' }}>Choose Your Package</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {subscriptionPlans.map((plan, index) => (
              <div key={plan.id} style={{ border: index === 1 ? '3px solid #667eea' : '2px solid #e1e5e9', borderRadius: '20px', padding: '30px', textAlign: 'center', position: 'relative', background: index === 1 ? '#f8f9ff' : 'white' }}>
                {index === 1 && <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '5px 20px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>MOST POPULAR</div>}
                <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: '#333' }}>{plan.name}</h3>
                <div style={{ margin: '20px 0' }}><span style={{ fontSize: '48px', fontWeight: '700', color: index === 1 ? '#667eea' : '#333' }}>£{plan.price}</span></div>
                <div style={{ margin: '20px 0' }}><div style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '5px' }}>{plan.tickets} Ticket{plan.tickets > 1 ? 's' : ''}</div>{plan.tickets > 1 && <div style={{ fontSize: '14px', color: '#666' }}>£{(plan.price / plan.tickets).toFixed(2)} per lesson</div>}</div>
                <p style={{ color: '#666', fontSize: '14px', margin: '20px 0', lineHeight: '1.5', minHeight: '60px' }}>{plan.description}</p>
                <button onClick={() => subscribeToPlan(plan)} disabled={subscribing} style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)', color: 'white', border: 'none', borderRadius: '25px', fontSize: '16px', fontWeight: '600', cursor: subscribing ? 'not-allowed' : 'pointer', opacity: subscribing ? 0.7 : 1 }}>{subscribing ? 'Processing...' : 'Buy Now'}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
