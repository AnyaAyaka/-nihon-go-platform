'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function SubscriptionPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState(false)
  const router = useRouter()

  const onlinePlans = [
    { id: 'trial', name: 'Online Trial', price: 23, tickets: 1, description: 'First-time students only - 55 min', priceId: 'price_1SKoIUD1Jzw9CFosLC6YJDbE' },
    { id: 'online_single', name: 'Online Single', price: 35, tickets: 1, description: 'Pay as you go - 55 min', priceId: 'price_1THK0jD1Jzw9CFosdvfDwLmB' },
    { id: 'online', name: 'Online 4-Pack', price: 120, tickets: 4, description: '£30/lesson - Save £20 - 55 min', priceId: 'price_1SKoMdD1Jzw9CFossg3r23ni', popular: true }
  ]

  const inPersonPlans = [
    { id: 'inperson_single', name: 'In-Person Single', price: 50, tickets: 1, description: 'Pay as you go - London or Manchester - 55 min', priceId: 'price_1THK10D1Jzw9CFosCXP59bx0' },
    { id: 'inperson', name: 'In-Person 4-Pack', price: 180, tickets: 4, description: '£45/lesson - Save £20 - London or Manchester - 55 min', priceId: 'price_1SKoNHD1Jzw9CFos5bXzv5br', popular: true }
  ]

  useEffect(() => {
    checkUser()
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

  const subscribeToPlan = async (plan) => {
    setSubscribing(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: plan.priceId, userId: user.id })
      })
      const data = await response.json()
      if (data.url) window.location.href = data.url
    } catch (error) {
      console.error('Error:', error)
      alert('Error processing purchase.')
      setSubscribing(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <div style={{ fontSize: '18px', color: '#1e293b', fontWeight: '600' }}>Loading...</div>
      </div>
    )
  }

  const PlanCard = ({ plan }) => (
    <div style={{
      border: plan.popular ? '3px solid #fb7185' : '2px solid #e1e5e9',
      borderRadius: '20px',
      padding: '30px',
      textAlign: 'center',
      position: 'relative',
      background: plan.popular ? '#fff5f7' : 'white',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {plan.popular && (
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #fb7185 0%, #f472b6 100%)',
          color: 'white',
          padding: '5px 20px',
          borderRadius: '15px',
          fontSize: '12px',
          fontWeight: '600'
        }}>BEST VALUE</div>
      )}
      <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: '#1e293b' }}>{plan.name}</h3>
      <div style={{ margin: '20px 0' }}>
        <span style={{ fontSize: '48px', fontWeight: '700', color: plan.popular ? '#fb7185' : '#1e293b' }}>£{plan.price}</span>
      </div>
      <div style={{ margin: '20px 0' }}>
        <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '5px' }}>
          {plan.tickets} Ticket{plan.tickets > 1 ? 's' : ''}
        </div>
        {plan.tickets > 1 && (
          <div style={{ fontSize: '14px', color: '#666' }}>£{(plan.price / plan.tickets).toFixed(0)} per lesson</div>
        )}
      </div>
      <p style={{ color: '#666', fontSize: '14px', margin: '20px 0', lineHeight: '1.5', flexGrow: 1 }}>{plan.description}</p>
      <button
        onClick={() => subscribeToPlan(plan)}
        disabled={subscribing}
        style={{
          width: '100%',
          padding: '15px',
          background: plan.popular
            ? 'linear-gradient(135deg, #fb7185 0%, #f472b6 100%)'
            : '#1e293b',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: subscribing ? 'not-allowed' : 'pointer',
          opacity: subscribing ? 0.7 : 1,
          transition: 'all 0.3s ease'
        }}
      >
        {subscribing ? 'Processing...' : 'Buy Now'}
      </button>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #fb7185 0%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 10px 0'
            }}>Buy Lesson Tickets</h1>
            <p style={{ margin: 0, color: '#666' }}>Choose your lesson package</p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              padding: '12px 24px',
              background: '#1e293b',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Dashboard
          </button>
        </div>

        {/* Online Lessons */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '30px', color: '#1e293b', fontSize: '24px', fontWeight: '600' }}>Online Lessons</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {onlinePlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>

        {/* In-Person Lessons */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '30px', color: '#1e293b', fontSize: '24px', fontWeight: '600' }}>In-Person Lessons (London &amp; Manchester)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {inPersonPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
