'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function AuthPage() {
  const router = useRouter()
  const notifiedRef = useRef(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // SIGNED_UP は新規登録時のみ発火
        if (event === 'SIGNED_UP' && !notifiedRef.current) {
          notifiedRef.current = true
          
          // 新規登録通知を送信
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
            console.log('New user notification sent')
          } catch (error) {
            console.error('Failed to notify:', error)
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
