'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import '../ng-ui.css'

// アカウント画面。ログアウトとアカウント削除。
// Google Play には「削除の申請ページ」の URL としてここ（/account）を登録する。
export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { setUser(data?.user || null); setReady(true) })
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  async function del() {
    setBusy(true); setMsg('')
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('/api/account/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
      body: JSON.stringify({ confirm: 'DELETE' })
    })
    const out = await res.json().catch(() => ({}))
    setBusy(false)
    if (!res.ok) { setMsg(out.message || 'Something went wrong. Please email info@nihongolondon.com.'); return }
    await supabase.auth.signOut().catch(() => {})
    setDone(true)
  }

  if (!ready) return <div className="ng"><div className="ng-wrap ng-app">Loading…</div></div>

  return (
    <div className="ng">
      <div className="ng-wrap ng-app" style={{ maxWidth: 640 }}>
        <div className="ng-bar">
          <h1 className="ng-title">Account<span>Nihon GO!</span></h1>
          {user && !done && (
            <div className="ng-cta">
              <a className="ng-btn ghost" href="/my">Back</a>
            </div>
          )}
        </div>

        {done ? (
          <div className="ng-panel">
            <h2>Your account has been deleted</h2>
            <p className="hint" style={{ margin: '6px 0 14px' }}>
              Your account, your study record and your review list have been removed. Thank you for studying with us.
            </p>
            <a className="ng-btn" href="/auth">Done</a>
          </div>
        ) : !user ? (
          <div className="ng-panel">
            <h2>Delete your Nihon GO! account</h2>
            <p className="hint" style={{ margin: '6px 0 14px' }}>
              Sign in, then come back to this page and press Delete my account. If you cannot sign in,
              email info@nihongolondon.com from the address you signed up with and we will delete it for you within 30 days.
            </p>
            <p className="hint" style={{ margin: '0 0 14px' }}>
              We delete your account, study record, review list and class membership. Payment records are kept by
              Stripe, Apple or Google for tax purposes.
            </p>
            <a className="ng-btn" href="/auth?next=/account">Sign in</a>
          </div>
        ) : (
          <>
            <div className="ng-panel">
              <h2>Signed in</h2>
              <p className="hint" style={{ margin: '6px 0 14px' }}>{user.email}</p>
              <button className="ng-btn ghost" onClick={signOut}>Sign out</button>
            </div>

            <div className="ng-panel">
              <h2>Delete your account</h2>
              <p className="hint" style={{ margin: '6px 0 14px' }}>
                This deletes your account, your study record, your review list and any JLPT mock test access.
                Unused lesson tickets are lost. It cannot be undone.
              </p>
              {!open ? (
                <button className="ng-btn ghost" onClick={() => setOpen(true)}>Delete my account</button>
              ) : (
                <>
                  <p style={{ margin: '0 0 8px' }}>Type DELETE to confirm.</p>
                  <input className="ng-input" value={typed} onChange={e => setTyped(e.target.value)}
                    autoCapitalize="characters" autoComplete="off" style={{ maxWidth: 240, marginBottom: 12 }} />
                  <div className="ng-cta">
                    <button className="ng-btn" disabled={typed.trim() !== 'DELETE' || busy} onClick={del}>
                      {busy ? 'Deleting…' : 'Delete for good'}
                    </button>
                    <button className="ng-btn ghost" onClick={() => { setOpen(false); setTyped(''); setMsg('') }}>Cancel</button>
                  </div>
                </>
              )}
              {msg && <div className="ng-msg ng-err" style={{ marginTop: 14, marginBottom: 0 }}>{msg}</div>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
