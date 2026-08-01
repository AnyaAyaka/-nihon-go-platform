'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function SubscriptionPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState(false)
  // 対面（in-person）を一度でも買った/予約したことがあるか。あればTrialカードを隠す
  const [hasInPersonHistory, setHasInPersonHistory] = useState(false)
  // 受講人数トグル。1 = 通常、2 = ペア
  const [onlineLearners, setOnlineLearners] = useState(1)
  const [inPersonLearners, setInPersonLearners] = useState(1)
  const router = useRouter()

  const onlinePlans = [
    { id: 'trial', name: 'Online Trial', price: 23, tickets: 1, description: 'First-time students only - 55 min', priceId: 'price_1SKoIUD1Jzw9CFosLC6YJDbE' },
    { id: 'online_single', name: 'Online Single', price: 35, tickets: 1, description: 'Pay as you go - 55 min', priceId: 'price_1THK0jD1Jzw9CFosdvfDwLmB' },
    { id: 'online', name: 'Online 4-Pack', price: 120, tickets: 4, description: '£30/lesson - Save £20 - 55 min', priceId: 'price_1SKoMdD1Jzw9CFossg3r23ni', popular: true }
  ]

  // ペア（2名同時受講）。1枚のチケットで2名分のレッスンを消化する
  const onlinePairPlans = [
    { id: 'online_trial_pair', name: 'Online Trial (2 learners)', price: 32, tickets: 1, learners: 2, description: 'First-time students only - £16 each - 55 min', priceId: 'price_1TzfwUD1Jzw9CFosbMzoijj6', newOnly: true },
    { id: 'online_pair_single', name: 'Online Single (2 learners)', price: 49, tickets: 1, learners: 2, description: 'Pay as you go - £24.50 each - 55 min', priceId: 'price_1TzfxKD1Jzw9CFos2aN50tfv' },
    { id: 'online_pair', name: 'Online 4-Pack (2 learners)', price: 168, tickets: 4, learners: 2, description: '£21 each per lesson - 55 min', priceId: 'price_1TzfyPD1Jzw9CFos3GjCTV28', popular: true }
  ]

  // newOnly: true のカードは「対面が完全に初めての人」だけに表示する
  const inPersonPlans = [
    { id: 'inperson_trial', name: 'In-Person Trial', price: 40, tickets: 1, description: 'First-time in-person students only - London or Manchester - 55 min', priceId: 'price_1Tg5GnD1Jzw9CFosPU2Jach9', newOnly: true },
    { id: 'inperson_single', name: 'In-Person Single', price: 50, tickets: 1, description: 'Pay as you go - London or Manchester - 55 min', priceId: 'price_1THK10D1Jzw9CFosCXP59bx0' },
    { id: 'inperson', name: 'In-Person 4-Pack', price: 180, tickets: 4, description: '£45/lesson - Save £20 - London or Manchester - 55 min', priceId: 'price_1SKoNHD1Jzw9CFos5bXzv5br', popular: true }
  ]

  const inPersonPairPlans = [
    { id: 'inperson_trial_pair', name: 'In-Person Trial (2 learners)', price: 60, tickets: 1, learners: 2, description: 'First-time in-person students only - £30 each - London or Manchester - 55 min', priceId: 'price_1TzfeGD1Jzw9CFos3Jp96S8A', newOnly: true },
    { id: 'inperson_pair_single', name: 'In-Person Single (2 learners)', price: 70, tickets: 1, learners: 2, description: 'Pay as you go - £35 each - London or Manchester - 55 min', priceId: 'price_1TzfgLD1Jzw9CFosW5qXrqMn' },
    { id: 'inperson_pair', name: 'In-Person 4-Pack (2 learners)', price: 260, tickets: 4, learners: 2, description: '£32.50 each per lesson - London or Manchester - 55 min', priceId: 'price_1TzfhND1Jzw9CFospXLOaebd', popular: true }
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
    await checkInPersonHistory(user.id)
    setLoading(false)
  }

  // 対面系チケットを過去に持った/予約したことがあるか調べる。あればTrial非表示
  const checkInPersonHistory = async (userId) => {
    const inPersonTicketTypes = ['inperson_trial', 'in_person', 'inperson_trial_pair', 'in_person_pair']
    const inPersonLessonTypes = ['in_person']

    const { data: tickets } = await supabase
      .from('user_current_tickets')
      .select('ticket_type')
      .eq('user_id', userId)
      .in('ticket_type', inPersonTicketTypes)

    const { data: bookings } = await supabase
      .from('bookings')
      .select('lesson_type')
      .eq('student_id', userId)
      .in('lesson_type', inPersonLessonTypes)

    const had = (tickets && tickets.length > 0) || (bookings && bookings.length > 0)
    setHasInPersonHistory(!!had)
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

  // 対面履歴がある人にはTrial（newOnly）カードを見せない
  const visibleInPersonPlans = inPersonPlans.filter(
    (plan) => !plan.newOnly || !hasInPersonHistory
  )
  const visibleInPersonPairPlans = inPersonPairPlans.filter(
    (plan) => !plan.newOnly || !hasInPersonHistory
  )

  const LearnerToggle = ({ value, onChange }) => (
    <div style={{
      display: 'inline-flex',
      background: '#f1f5f9',
      borderRadius: '12px',
      padding: '4px',
      gap: '4px'
    }}>
      {[1, 2].map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          style={{
            padding: '8px 18px',
            border: 'none',
            borderRadius: '9px',
            background: value === n ? 'white' : 'transparent',
            color: value === n ? '#1e293b' : '#64748b',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: value === n ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          {n === 1 ? '1 learner' : '2 learners'}
        </button>
      ))}
    </div>
  )

  const SectionHeader = ({ title, value, onChange }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px',
      marginBottom: '10px'
    }}>
      <h2 style={{ margin: 0, color: '#1e293b', fontSize: '24px', fontWeight: '600' }}>{title}</h2>
      <LearnerToggle value={value} onChange={onChange} />
    </div>
  )

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
      {plan.learners > 1 && (
        <div style={{
          display: 'inline-block',
          alignSelf: 'center',
          background: '#fff1f2',
          color: '#fb7185',
          border: '1px solid #fecdd3',
          borderRadius: '999px',
          padding: '4px 12px',
          fontSize: '12px',
          fontWeight: '600'
        }}>{plan.learners} learners - one session</div>
      )}
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
          <SectionHeader title="Online Lessons" value={onlineLearners} onChange={setOnlineLearners} />
          <p style={{ margin: '0 0 25px 0', color: '#666', fontSize: '14px', minHeight: '20px' }}>
            {onlineLearners === 2
              ? 'For two learners at a similar level. Both join the same 55-minute session, and one ticket covers both.'
              : 'One-to-one lessons with a certified teacher, 55 minutes each.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {(onlineLearners === 2 ? onlinePairPlans : onlinePlans).map((plan) => (
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
          <SectionHeader title="In-Person Lessons (London & Manchester)" value={inPersonLearners} onChange={setInPersonLearners} />
          <p style={{ margin: '0 0 25px 0', color: '#666', fontSize: '14px', minHeight: '20px' }}>
            {inPersonLearners === 2
              ? 'Two learners in the same session at our London or Manchester location. Corporate and group training is quoted separately - please contact us.'
              : 'Face-to-face lessons at our London or Manchester location, 55 minutes each.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {(inPersonLearners === 2 ? visibleInPersonPairPlans : visibleInPersonPlans).map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
