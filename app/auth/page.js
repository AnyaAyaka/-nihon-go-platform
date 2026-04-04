'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function AuthPage() {
  const router = useRouter()
  const notifiedRef = useRef(false)
  const linkedRef = useRef(false)

  useEffect(() => {
    const paymentIntent = new URLSearchParams(window.location.search).get('payment')

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {

        // 新規登録通知
        if (event === 'SIGNED_UP' && !notifiedRef.current) {
          notifiedRef.current = true
          try {
            await fetch('/api/notify-new-user', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: session.user.email,
                full_name: session.user.user_metadata?.full_name || '',
                role: 'student'
              })
            })
          } catch (error) {
            console.error('Failed to notify:', error)
          }
        }

        // JLPT購入の紐付け（新規・既存ユーザー両方）
        if (paymentIntent && !linkedRef.current) {
          linkedRef.current = true
          try {
            await fetch('/api/jlpt/link-subscription', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: session.user.id,
                paymentIntent: paymentIntent,
              })
            })
          } catch (error) {
            console.error('Failed to link JLPT subscription:', error)
          }
        }

        router.push('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Nihon GO! Login</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        onlyThirdPartyProviders={false}
      />
    </div>
  )
}
