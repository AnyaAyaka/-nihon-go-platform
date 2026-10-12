'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { isNativeApp } from '../../lib/native'
import '../ng-ui.css'

// Reader Pass の購入と管理。読むのは無料、練習とテストは Pass。
const FREE = [
  'All 199 stories on the website, with audio and translations',
  'N5 mini tests and grammar practice',
  'The first 5 mini tests at every level',
  'JLPT Mock 01 for every level',
]
const PAID = [
  'Every mini test from N5 to N1',
  'Grammar practice for every N4 to N1 grammar point',
  'Every JLPT mock test, with explanations and unlimited retakes',
]

export default function PassPage() {
  const [ready, setReady] = useState(false)
  const [session, setSession] = useState(null)
  const [status, setStatus] = useState(null)
  const [busy, setBusy] = useState('')
  const [msg, setMsg] = useState('')
  const [native, setNative] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setNative(isNativeApp())
    setDone(new URLSearchParams(window.location.search).get('done') === '1')
    load()
  }, [])

  async function load() {
    const { data: { session } } = await supabase.auth.getSession()
    setSession(session)
    if (session) {
      const r = await fetch('/api/pass/status', { headers: { Authorization: `Bearer ${session.access_token}` }, cache: 'no-store' })
      setStatus(await r.json().catch(() => null))
    }
    setReady(true)
  }

  async function buy(plan) {
    if (!session) { window.location.href = `/auth?mode=signup&next=${encodeURIComponent('/pass')}`; return }
    setBusy(plan); setMsg('')
    const r = await fetch('/api/pass/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ plan })
    })
    const out = await r.json().catch(() => ({}))
    setBusy('')
    if (out.url) { window.location.href = out.url; return }
    setMsg(out.error === 'already' ? 'You already have the Reader Pass.' : 'Something went wrong. Please try again.')
  }

  async function manage() {
    setBusy('portal'); setMsg('')
    const r = await fetch('/api/pass/portal', { method: 'POST', headers: { Authorization: `Bearer ${session.access_token}` } })
    const out = await r.json().catch(() => ({}))
    setBusy('')
    if (out.url) { window.location.href = out.url; return }
    setMsg('Your Pass was bought in the app store. Manage it in Google Play or the App Store.')
  }

  if (!ready) return <div className="ng"><div className="ng-wrap ng-app">Loading…</div></div>
  const active = status?.active

  return (
    <div className="ng">
      <div className="ng-wrap ng-app" style={{ maxWidth: 760 }}>
        <div className="ng-bar">
          <h1 className="ng-title">Reader Pass<span>Nihon GO!</span></h1>
          <div className="ng-cta"><a className="ng-btn ghost" href="/my">Today</a></div>
        </div>

        {(done || active) && (
          <div className="ng-msg" style={{ marginBottom: 18 }}>
            {active
              ? <>Your Reader Pass is active{status?.pass?.current_period_end ? ` until ${new Date(status.pass.current_period_end).toLocaleDateString('en-GB')}, and renews automatically` : ''}.</>
              : 'Thank you. Your Pass will be ready in a few seconds. Reload this page if it does not show yet.'}
          </div>
        )}

        <div className="ng-panel">
          <h2>Read for free. Practise with the Pass.</h2>
          <p className="hint" style={{ margin: '6px 0 16px' }}>
            The stories stay free for everyone. The Reader Pass adds the practice that makes them stick:
            a mini test after every story, grammar practice and full JLPT mock tests.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
            <div>
              <div className="ng-tag" style={{ marginBottom: 8 }}>Free</div>
              {FREE.map(t => <p key={t} style={{ margin: '0 0 6px' }}>✓ {t}</p>)}
            </div>
            <div>
              <div className="ng-tag" style={{ marginBottom: 8 }}>With the Reader Pass</div>
              {PAID.map(t => <p key={t} style={{ margin: '0 0 6px' }}>✓ {t}</p>)}
            </div>
          </div>
        </div>

        {active ? (
          <div className="ng-panel">
            <h2>Your Pass</h2>
            <p className="hint" style={{ margin: '6px 0 14px' }}>Cancel any time. You keep access until the end of the period you paid for.</p>
            <div className="ng-cta">
              <a className="ng-btn" href="/my/stories">Pick a story</a>
              <button className="ng-btn ghost" onClick={manage} disabled={busy === 'portal'}>Manage or cancel</button>
            </div>
          </div>
        ) : native ? (
          <div className="ng-panel">
            <h2>Get the Reader Pass</h2>
            <p className="hint" style={{ margin: '6px 0 0' }}>The Reader Pass is coming to the app soon.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div className="ng-panel">
              <div className="ng-tag">Monthly</div>
              <p style={{ fontFamily: 'var(--read)', fontSize: '2rem', margin: '8px 0 4px' }}>£4.99<span className="hint" style={{ fontSize: '1rem' }}> / month</span></p>
              <p className="hint" style={{ margin: '0 0 14px' }}>Cancel any time.</p>
              <button className="ng-btn" onClick={() => buy('month')} disabled={!!busy}>{busy === 'month' ? 'Opening…' : 'Start monthly'}</button>
            </div>
            <div className="ng-panel" style={{ borderColor: 'var(--shu)' }}>
              <div className="ng-tag">Yearly · save 50%</div>
              <p style={{ fontFamily: 'var(--read)', fontSize: '2rem', margin: '8px 0 4px' }}>£29.99<span className="hint" style={{ fontSize: '1rem' }}> / year</span></p>
              <p className="hint" style={{ margin: '0 0 14px' }}>£2.50 a month. Cancel any time.</p>
              <button className="ng-btn" onClick={() => buy('year')} disabled={!!busy}>{busy === 'year' ? 'Opening…' : 'Start yearly'}</button>
            </div>
          </div>
        )}
        {!session && !active && (
          <p className="hint" style={{ marginTop: 6 }}>You will be asked to create a free account first, so your Pass is linked to it.</p>
        )}
        {msg && <div className="ng-msg ng-err" style={{ marginTop: 14 }}>{msg}</div>}
        <p className="hint" style={{ marginTop: 18 }}>Prices include VAT. Payments are handled by Stripe.</p>
      </div>
    </div>
  )
}
