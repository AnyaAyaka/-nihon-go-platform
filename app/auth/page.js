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
        // 新規登録の場合のみ通知（SIGNED_INイベントで、まだ通知していない場合）
        if (event === 'SIGNED_IN' && !notifiedRef.current) {
          notifiedRef.current = true
          
          // プロフィールを確認して新規ユーザーかチェック
          const { data: profile } = await supabase
            .from('profiles')
            .select('created_at')
            .eq('user_id', session.user.id)
            .single()

          // 作成から1分以内なら新規ユーザー
          if (profile) {
            const createdAt = new Date(profile.created_at)
            const now = new Date()
            const diffMinutes = (now - createdAt) / 1000 / 60

            if (diffMinutes < 1) {
              // 新規登録通知を送信
              try {
                await fetch('/api/notify-new-user', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: session.user.email,
                    full_name: profile.full_name,
                    role: profile.role
                  })
                })
              } catch (error) {
                console.error('Failed to notify:', error)
              }
            }
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
