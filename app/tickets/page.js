'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function SubscriptionPage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [currentTickets, setCurrentTickets] = useState(null)
  const [currentSubscription, setCurrentSubscription] = useState(null)
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

    // プロフィール取得
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setProfile(profileData)

    // 現在のサブスクリプション取得
    await fetchCurrentSubscription(user.id)
    
    // 現在のチケット残高取得
    await fetchCurrentTickets(user.id)
    
    setLoading(false)
  }

  const fetchCurrentSubscription = async (userId) => {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select(`
        *,
        subscription_plans (name, monthly_tickets, monthly_price)
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching subscription:', error)
    } else if (data) {
      setCurrentSubscription(data)
    }
  }

  const fetchCurrentTickets = async (userId) => {
    const { data, error } = await supabase
      .from('user_current_tickets')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching current tickets:', error)
    } else if (data) {
      setCurrentTickets(data)
    }
  }

  const fetchSubscriptionPlans = async () => {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('active', true)
      .order('monthly_tickets', { ascending: true })

    if (error) {
      console.error('Error fetching plans:', error)
    } else {
      setSubscriptionPlans(data || [])
    }
  }

  const subscribeToPlan = async (plan) => {
    setSubscribing(true)

    try {
      // 現在の日付を取得
      const today = new Date()
      const currentPeriodStart = today.toISOString().split('T')[0]
      
      // 次月の同日を計算
      const nextMonth = new Date(today)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      nextMonth.setDate(nextMonth.getDate() - 1) // 前日まで
      const currentPeriodEnd = nextMonth.toISOString().split('T')[0]

      // 既存のサブスクリプションがあればキャンセル
      if (currentSubscription) {
        await supabase
          .from('user_subscriptions')
          .update({ status: 'cancelled', updated_at: new Date().toISOString() })
          .eq('id', currentSubscription.id)
      }

      // 新しいサブスクリプションを作成
      const { data: newSub, error: subError } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: user.id,
          plan_id: plan.id,
          status: 'active',
          current_period_start: currentPeriodStart,
          current_period_end: currentPeriodEnd,
          stripe_subscription_id: null // TODO: Stripe integration
        })
        .select()
        .single()

      if (subError) throw subError

      // 今月のチケット付与記録
      const { error: grantError } = await supabase
        .from('monthly_ticket_grants')
        .insert({
          user_id: user.id,
          subscription_id: newSub.id,
          tickets_granted: plan.monthly_tickets,
          grant_period_start: currentPeriodStart,
          grant_period_end: currentPeriodEnd
        })

      if (grantError) throw grantError

      // ユーザーの現在チケットを更新
      const { error: ticketsError } = await supabase
        .from('user_current_tickets')
        .upsert({
          user_id: user.id,
          remaining_tickets: plan.monthly_tickets,
          current_period_start: currentPeriodStart,
          current_period_end: currentPeriodEnd,
          updated_at: new Date().toISOString()
        })

      if (ticketsError) throw ticketsError

      alert(`Successfully subscribed to ${plan.name}! You now have ${plan.monthly_tickets} tickets for this month.`)
      
      // データを再取得
      await fetchCurrentSubscription(user.id)
      await fetchCurrentTickets(user.id)

    } catch (error) {
      console.error('Error subscribing:', error)
      alert('Error subscribing to plan. Please try again.')
    } finally {
      setSubscribing(false)
    }
  }

  const cancelSubscription = async () => {
    if (!currentSubscription) return

    if (!confirm('Are you sure you want to cancel your subscription? You can continue using your remaining tickets until the end of the current period.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('user_subscriptions')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', currentSubscription.id)

      if (error) throw error

      alert('Subscription cancelled successfully. You can continue using your tickets until the end of the current period.')
      await fetchCurrentSubscription(user.id)

    } catch (error) {
      console.error('Error cancelling subscription:', error)
      alert('Error cancelling subscription. Please try again.')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isCurrentPeriodActive = (endDate) => {
    return new Date(endDate) >= new Date()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
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
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 10px 0'
            }}>
              🎫 My Subscription
            </h1>
            <p style={{ margin: 0, color: '#666' }}>
              Manage your monthly lesson subscription
            </p>
          </div>
          
          <button 
            onClick={() => router.push('/dashboard')}
            style={{ 
              padding: '12px 20px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white', 
              border: 'none', 
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Dashboard
          </button>
        </div>

        {/* Current Subscription Status */}
        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Current Status</h2>
          
          {currentSubscription ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '25px',
              background: currentSubscription.status === 'active' ? 
                'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 
                'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              borderRadius: '15px',
              color: 'white',
              marginBottom: '20px'
            }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
                  {currentSubscription.subscription_plans?.name}
                </h3>
                <p style={{ margin: '0 0 5px 0', opacity: '0.9' }}>
                  ${currentSubscription.subscription_plans?.monthly_price}/month
                </p>
                <p style={{ margin: 0, opacity: '0.9', fontSize: '14px' }}>
                  {currentSubscription.status === 'active' ? 
                    `Renews on ${formatDate(currentSubscription.current_period_end)}` :
                    `Cancelled - Active until ${formatDate(currentSubscription.current_period_end)}`
                  }
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: '5px' }}>
                  {currentTickets?.remaining_tickets || 0}
                </div>
                <div style={{ fontSize: '14px', opacity: '0.9' }}>
                  tickets left
                </div>
              </div>
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              background: '#f8f9fa',
              borderRadius: '15px',
              color: '#666',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: '0 0 10px 0' }}>No Active Subscription</h3>
              <p style={{ margin: 0 }}>Choose a plan below to start your monthly lessons</p>
            </div>
          )}

          {currentTickets && isCurrentPeriodActive(currentTickets.current_period_end) && (
            <div style={{ 
              padding: '20px',
              background: '#e3f2fd',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>This Month's Tickets</h4>
              <p style={{ margin: '0', color: '#666' }}>
                You have <strong>{currentTickets.remaining_tickets} tickets</strong> remaining until {formatDate(currentTickets.current_period_end)}
              </p>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
                Unused tickets will expire at the end of the month
              </p>
            </div>
          )}

          {currentSubscription && currentSubscription.status === 'active' && (
            <button 
              onClick={cancelSubscription}
              style={{ 
                padding: '10px 20px',
                background: 'transparent',
                color: '#dc3545',
                border: '2px solid #dc3545',
                borderRadius: '20px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancel Subscription
            </button>
          )}
        </div>

        {/* Subscription Plans */}
        {(!currentSubscription || currentSubscription.status === 'cancelled') && (
          <div style={{ 
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '30px', color: '#333' }}>Choose Your Monthly Plan</h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '25px' 
            }}>
              {subscriptionPlans.map((plan, index) => (
                <div key={plan.id} style={{ 
                  border: index === 2 ? '3px solid #667eea' : '2px solid #e1e5e9',
                  borderRadius: '20px',
                  padding: '30px',
                  textAlign: 'center',
                  position: 'relative',
                  background: index === 2 ? '#f8f9ff' : 'white',
                  transition: 'transform 0.3s ease'
                }}>
                  {index === 2 && (
                    <div style={{ 
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '5px 20px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      MOST POPULAR
                    </div>
                  )}
                  
                  <h3 style={{ 
                    margin: '0 0 10px 0', 
                    fontSize: '24px', 
                    color: '#333' 
                  }}>
                    {plan.name}
                  </h3>
                  
                  <div style={{ margin: '20px 0' }}>
                    <span style={{ 
                      fontSize: '48px', 
                      fontWeight: '700',
                      color: index === 2 ? '#667eea' : '#333'
                    }}>
                      ${plan.monthly_price}
                    </span>
                    <span style={{ color: '#666', fontSize: '16px' }}>/month</span>
                  </div>
                  
                  <div style={{ margin: '20px 0' }}>
                    <div style={{ 
                      fontSize: '20px', 
                      fontWeight: '600', 
                      color: '#333',
                      marginBottom: '5px'
                    }}>
                      {plan.monthly_tickets} Lessons/Month
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      ${(plan.monthly_price / plan.monthly_tickets).toFixed(2)} per lesson
                    </div>
                  </div>
                  
                  <p style={{ 
                    color: '#666', 
                    fontSize: '14px',
                    margin: '20px 0',
                    lineHeight: '1.5'
                  }}>
                    {plan.description}
                  </p>
                  
                  <button 
                    onClick={() => subscribeToPlan(plan)}
                    disabled={subscribing}
                    style={{ 
                      width: '100%',
                      padding: '15px',
                      background: index === 2 ? 
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                        'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: subscribing ? 'not-allowed' : 'pointer',
                      opacity: subscribing ? 0.7 : 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {subscribing ? 'Processing...' : 'Subscribe Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
