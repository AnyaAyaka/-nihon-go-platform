'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { COPY, MAIL } from './copy'
import '../ng-ui.css'

// 金額とプランIDはStripeとつながっているので copy.js ではなくここ
const PLANS = [
  { id: 'school', price: '\u00a3390' },
  { id: 'school_plus', price: '\u00a3690' },
  { id: 'institution', price: '\u00a31,200' }
]

// [[ ]] -> 朱色のマーカー
function mark(s) {
  return String(s).split(/\[\[(.+?)\]\]/g).map((part, i) =>
    i % 2 ? <em key={i}>{part}</em> : part
  )
}

// {mail} -> メールのリンク
function withMail(s) {
  return String(s).split('{mail}').flatMap((part, i) =>
    i === 0 ? [part] : [<a key={i} href={`mailto:${MAIL}`}>{MAIL}</a>, part]
  )
}

function plainMail(s) {
  return String(s).replace('{mail}', MAIL)
}

export default function ForSchoolsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [org, setOrg] = useState(null)
  const [busy, setBusy] = useState('')
  const [msg, setMsg] = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user || null)
    if (!user) return
    const { data } = await supabase.from('org_members').select('organizations(id, name, status)').limit(1)
    setOrg(data?.[0]?.organizations || null)
  }

  async function buy(plan, invoice) {
    if (!user) { router.push('/auth?next=/for-schools'); return }
    if (!org) { router.push('/classes'); return }
    setBusy(plan + (invoice ? '-inv' : ''))
    setMsg(null)
    const res = await fetch('/api/school-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan, orgId: org.id, email: user.email, invoice })
    })
    const json = await res.json()
    setBusy('')
    if (json.url) { window.location.href = json.url; return }
    if (json.invoiceSent) { setMsg({ ok: true, text: COPY.msg.invoiceSent }); return }
    setMsg({ ok: false, text: json.error || plainMail(COPY.msg.failed) })
  }

  const C = COPY

  return (
    <div className="ng">
      <section className="ng-hero">
        <div className="ng-wrap ng-hero-grid">
          <div>
            <p className="ng-mark">{C.hero.eyebrow}</p>
            <h1 className="ng-h1">{mark(C.hero.h1)}</h1>
            <p className="ng-lede">{C.hero.lede}</p>
            <div className="ng-cta">
              <a className="ng-btn" href="/classes">{C.hero.btnMain}</a>
              <a className="ng-btn ghost" href="https://nihongo-world.com/materials/stories/" target="_blank" rel="noopener">
                {C.hero.btnSub}
              </a>
            </div>
            <p className="ng-note">{C.hero.note}</p>
          </div>

          <div className="ng-tate" aria-label="学習者が見る画面の例">
            <div className="ng-tate-text" lang="ja">
              <ruby className="hl">洗濯機<rt>せんたくき</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>に、
              <ruby className="hl">青<rt>あお</rt></ruby>いマフラーが<ruby>置<rt>お</rt></ruby>いてあった。
              <ruby>持<rt>も</rt></ruby>ち<ruby>主<rt>ぬし</rt></ruby>が<ruby>忘<rt>わす</rt></ruby>れた
              <span className="wav">わけではない</span>のかもしれない。
            </div>
            <p className="ng-tate-foot">{C.sample.foot}</p>
          </div>
        </div>
      </section>

      <div className="ng-figs">
        <div className="ng-wrap">
          {C.figures.map(f => (
            <div key={f.label}><b>{f.n}</b><span>{f.label}</span></div>
          ))}
        </div>
      </div>

      <section className="ng-sec">
        <div className="ng-wrap">
          <h2 className="ng-h2"><span className="jp">{C.how.jp}</span>{C.how.en}</h2>
          <p className="ng-sub">{C.how.sub}</p>
          <div className="ng-steps">
            {C.how.steps.map(s => (
              <div className="ng-step" key={s.title}>
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ng-sec">
        <div className="ng-wrap">
          <h2 className="ng-h2"><span className="jp">{C.result.jp}</span>{C.result.en}</h2>
          <p className="ng-sub">{C.result.sub}</p>
          <table className="ng-table">
            <thead>
              <tr>{C.result.head.map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              <tr><td>anna@…</td><td className="ng-maru">○</td><td>7 / 8</td><td>2 / 3</td><td>3 / 3</td><td className="ng-ok">2 / 2</td></tr>
              <tr><td>ben@…</td><td className="ng-maru">○</td><td>4 / 8</td><td className="ng-miss">0 / 3</td><td>3 / 3</td><td>1 / 2</td></tr>
              <tr><td>chika@…</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="ng-sec">
        <div className="ng-wrap">
          <h2 className="ng-h2"><span className="jp">{C.price.jp}</span>{C.price.en}</h2>
          <p className="ng-sub">{C.price.sub}</p>

          {msg && <div className={msg.ok ? 'ng-msg' : 'ng-msg ng-err'}>{msg.text}</div>}

          {PLANS.map(p => {
            const t = C.price.plans[p.id] || {}
            return (
              <div className="ng-plan" key={p.id}>
                <div>
                  <div className="ng-plan-head">
                    <h3>{t.name}</h3>
                    {p.id === 'school_plus' && (
                      <span className="ng-hanko">
                        {C.price.stamp.split('\n').map((l, i) => <span key={i}>{l}</span>)}
                      </span>
                    )}
                  </div>
                  <p>{t.blurb}</p>
                </div>
                <div className="ng-price">{p.price}<small>{C.price.perYear}・{t.seats}</small></div>
                <div className="ng-plan-actions">
                  <button className="ng-btn" disabled={busy === p.id} onClick={() => buy(p.id, false)}>
                    {busy === p.id ? '…' : C.price.btnCard}
                  </button>
                  <button className="ng-btn ghost" disabled={busy === p.id + '-inv'} onClick={() => buy(p.id, true)}>
                    {busy === p.id + '-inv' ? '…' : C.price.btnInvoice}
                  </button>
                </div>
              </div>
            )
          })}

          <p className="ng-note">{withMail(C.price.note)}</p>
        </div>
      </section>

      <section className="ng-sec" style={{ borderBottom: 'none' }}>
        <div className="ng-wrap">
          <h2 className="ng-h2"><span className="jp">{C.faq.jp}</span>{C.faq.en}</h2>
          <div className="ng-faq" style={{ marginTop: 22 }}>
            {C.faq.items.map(it => (
              <details key={it.q}>
                <summary>{it.q}</summary>
                <p>{it.a}</p>
              </details>
            ))}
          </div>
          <div className="ng-cta" style={{ marginTop: 30 }}>
            <a className="ng-btn" href="/classes">{C.faq.btnMain}</a>
            <a className="ng-btn ghost" href={`mailto:${MAIL}`}>{C.faq.btnSub}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
