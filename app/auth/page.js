'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import '../ng-ui.css'

export default function AuthPage() {
  const router = useRouter()
  const linkedRef = useRef(false)
  const routedRef = useRef(false)
  const [view, setView] = useState('sign_in')
  const [back, setBack] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paymentIntent = params.get('payment')
    // ログイン後に戻る先（同じサイト内のパスだけ受け付ける）
    const nextParam = params.get('next') || ''
    const nextPath = nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/dashboard'
    if (params.get('mode') === 'signup') setView('sign_up')
    // アプリ（/my 以下）から来た人には「アカウントなしで続ける」を出す
    if (nextPath.startsWith('/my')) setBack(params.get('back') || '/my')

    // --- 流入元の記録（UTM / referrer）---------------------------------
    // 登録完了後に /welcome で profiles に書き込む。
    // すでに保存済みなら上書きしない（最初に来たときの情報を残す）。
    try {
      if (!window.localStorage.getItem('ng_signup_source')) {
        const ref = document.referrer || ''
        const sameSite = ref && ref.indexOf(window.location.origin) === 0
        window.localStorage.setItem('ng_signup_source', JSON.stringify({
          referrer: sameSite ? null : (ref || null),
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
          landed_at: new Date().toISOString()
        }))
      }
    } catch (e) {
      // localStorage が使えない環境は無視
    }
    // -------------------------------------------------------------------

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') { router.push('/reset-password'); return }
      if (session) {
        if (routedRef.current) return

        if (paymentIntent && !linkedRef.current) {
          linkedRef.current = true
          try {
            await fetch('/api/jlpt/link-subscription', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: session.user.id, paymentIntent: paymentIntent })
            })
          } catch (error) { console.error('Failed to link JLPT subscription:', error) }
        }

        // オンボーディング未完了の生徒は /welcome へ。
        // （auth イベント名に依存せず profiles を見るので、メール確認フロー経由でも必ず通る）
        let destination = nextPath
        try {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role, onboarded_at')
            .eq('user_id', session.user.id)
            .single()

          if (profileData && profileData.role !== 'teacher' && !profileData.onboarded_at) {
            destination = '/welcome?next=' + encodeURIComponent(nextPath)
          }
        } catch (error) {
          console.error('Failed to check onboarding status:', error)
        }

        routedRef.current = true
        router.push(destination)
      }
    })
    return () => subscription.unsubscribe()
  }, [router])

  return (
    <div className="ng">
      <div className="ng-wrap ng-app" style={{ maxWidth: 440, paddingTop: 40, paddingBottom: 40 }}>
        <h1 className="ng-title" style={{ marginBottom: 6 }}>
          {view === 'sign_up' ? 'Create a free account' : 'Sign in'}<span>Nihon GO!</span>
        </h1>
        {back && (
          <p className="hint" style={{ margin: '0 0 18px' }}>
            {view === 'sign_up'
              ? 'Free. Save your mini test scores, keep a review list of what you got wrong, and pick up on any device.'
              : 'Sign in to see your scores and your review list.'}
          </p>
        )}
        <div className="ng-panel">
          <Auth
            key={view}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa, variables: { default: { colors: { brand: '#141A1F', brandAccent: '#C5372C' } } } }}
            view={view}
            providers={[]}
            onlyThirdPartyProviders={false}
            redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined}
          />
        </div>
        {back && (
          <p style={{ textAlign: 'center', margin: '18px 0 0' }}>
            <a href={back}>Not now, keep reading without an account</a>
          </p>
        )}
      </div>
    </div>
  )
}
