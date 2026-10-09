'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../../lib/supabase'
import { addToReview } from '../../../../lib/review'
import { useRouter, useParams } from 'next/navigation'
import '../../../ng-ui.css'

function ruby(s) {
  return (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
    .replace(/\{([^|{}]+)\|([^{}]+)\}/g, '<ruby>$1<rt>$2</rt></ruby>')
}
const R = s => <span dangerouslySetInnerHTML={{ __html: ruby(s) }} />

export default function GrammarDrillPage() {
  const router = useRouter()
  const { g } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [picked, setPicked] = useState({})
  const [order, setOrder] = useState({})
  const [saved, setSaved] = useState(false)
  const [openNote, setOpenNote] = useState(false)

  useEffect(() => { load() }, [g])

  async function load() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) { router.push('/auth'); return }
    const res = await fetch(`/api/content/drill?g=${encodeURIComponent(g)}`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
      cache: 'no-store'
    })
    setData(res.ok ? await res.json() : null)
    setLoading(false)
  }

  const qs = data?.questions || []

  function isDone(i) {
    const q = qs[i]
    if (!q) return false
    if (q.t === 'order') return (order[i] || []).length === (q.tiles || []).length
    return picked[i] !== undefined
  }
  function isRight(i) {
    const q = qs[i]
    if (q.t === 'order') return JSON.stringify(order[i] || []) === JSON.stringify(q.a)
    return picked[i] === q.a
  }

  const answered = qs.filter((_, i) => isDone(i)).length
  const score = qs.reduce((n, _, i) => n + (isDone(i) && isRight(i) ? 1 : 0), 0)

  async function finish() {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('progress').upsert({
      user_id: user.id,
      kind: 'grammar_drill',
      ref_id: g,
      score,
      max_score: qs.length,
      detail: { wrong: qs.map((_, i) => (isDone(i) && !isRight(i) ? i : null)).filter(x => x !== null) },
      completed_at: new Date().toISOString()
    }, { onConflict: 'user_id,kind,ref_id' })

    if (score < qs.length) {
      await addToReview(user.id, [{ kind: 'grammar', ref: g, label: data.title }])
    }

    setSaved(true)
  }

  if (loading) return <div className="ng"><div className="ng-wrap ng-app">Loading…</div></div>
  if (!data) return (
    <div className="ng"><div className="ng-wrap ng-app">
      <p className="ng-empty">There is no practice for this grammar point yet.</p>
      <button className="ng-btn ghost" onClick={() => router.push('/my')}>Back</button>
    </div></div>
  )

  const box = (right, wrong) => ({
    display: 'block', width: '100%', textAlign: 'left', font: 'inherit', fontFamily: 'var(--read)',
    fontSize: '1.02rem', padding: '10px 12px', marginBottom: 6, borderRadius: 2, background: '#fff',
    border: '1px solid ' + (right ? '#2E6B4F' : wrong ? 'var(--shu)' : 'var(--line)')
  })

  return (
    <div className="ng">
      <div className="ng-wrap ng-app" style={{ maxWidth: 740 }}>
        <div className="ng-bar">
          <h1 className="ng-title">{R(data.title)}<span>{(data.lv || '').toUpperCase()}　Practice, {qs.length} questions</span></h1>
          <button className="ng-btn ghost" onClick={() => router.push('/my')}>Today</button>
        </div>

        <div className="ng-panel">
          <button className="ng-mini" style={{ fontSize: '.9rem', padding: 0 }} onClick={() => setOpenNote(v => !v)}>
            {openNote ? '− Hide the explanation' : '+ Show the explanation'}
          </button>
          {openNote && (
            <div style={{ marginTop: 12 }}>
              {data.pattern && <p className="hint" style={{ fontFamily: 'var(--read)', margin: '0 0 8px' }}>{data.pattern}</p>}
              <p style={{ margin: '0 0 10px', lineHeight: 1.9 }}>{R(data.note)}</p>
              {(data.ex || []).map((e, i) => (
                <p key={i} style={{ margin: '0 0 6px', fontFamily: 'var(--read)' }}>
                  {R(e[0])}<span className="ng-tag" style={{ display: 'block', fontFamily: 'var(--ui)' }}>{e[1]}</span>
                </p>
              ))}
            </div>
          )}
        </div>

        {qs.map((q, i) => {
          const done = isDone(i)
          const right = done && isRight(i)
          return (
            <div className="ng-panel" key={i}>
              <div className="ng-tag">{i + 1} / {qs.length}</div>
              <p style={{ fontFamily: 'var(--read)', fontSize: '1.15rem', lineHeight: 2.2, margin: '6px 0 14px' }}>{R(q.q)}</p>

              {q.t === 'mc' && q.o.map((o, m) => (
                <button key={m} disabled={done} onClick={() => setPicked(p => ({ ...p, [i]: m }))}
                  style={{ ...box(done && m === q.a, done && m === picked[i] && m !== q.a), cursor: done ? 'default' : 'pointer' }}>
                  <span className="ng-tag" style={{ marginRight: 10 }}>{m + 1}</span>{R(o)}
                </button>
              ))}

              {q.t === 'judge' && [true, false].map(v => (
                <button key={String(v)} disabled={done} onClick={() => setPicked(p => ({ ...p, [i]: v }))}
                  style={{ ...box(done && v === q.a, done && v === picked[i] && v !== q.a), cursor: done ? 'default' : 'pointer' }}>
                  {v ? '○ Correct' : '✕ Not correct'}
                </button>
              ))}

              {q.t === 'order' && (
                <>
                  <p style={{ fontFamily: 'var(--read)', fontSize: '1.1rem', minHeight: '2.4em', background: '#fff',
                    border: '1px solid var(--line)', padding: '10px 12px', margin: '0 0 10px' }}>
                    {(order[i] || []).map(t => <span key={t} style={{ marginRight: 6 }}>{R(q.tiles[t])}</span>)}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {q.tiles.map((t, m) => {
                      const used = (order[i] || []).includes(m)
                      return (
                        <button key={m} disabled={used || done}
                          onClick={() => setOrder(o => ({ ...o, [i]: [...(o[i] || []), m] }))}
                          style={{ font: 'inherit', fontFamily: 'var(--read)', padding: '8px 12px', borderRadius: 2,
                            border: '1px solid var(--line)', background: used ? 'transparent' : '#fff',
                            color: used ? 'var(--line)' : 'inherit', cursor: used || done ? 'default' : 'pointer' }}>
                          {R(t)}
                        </button>
                      )
                    })}
                  </div>
                  {!done && (order[i] || []).length > 0 && (
                    <button className="ng-mini" onClick={() => setOrder(o => ({ ...o, [i]: [] }))}>Start over</button>
                  )}
                  {done && !right && (
                    <p style={{ fontFamily: 'var(--read)', marginTop: 10 }}>Correct sentence: {R(q.sent)}</p>
                  )}
                </>
              )}

              {done && (
                <p style={{ fontSize: '.92rem', lineHeight: 1.9, background: right ? '#E7EFE9' : 'var(--shu-soft)',
                  border: '1px solid ' + (right ? '#C3D8C9' : '#EBC9C4'), padding: '10px 12px', margin: '10px 0 0' }}>
                  <strong style={{ color: right ? '#2E6B4F' : 'var(--shu)' }}>{right ? '○　' : '✕　'}</strong>{R(q.why)}
                </p>
              )}
            </div>
          )
        })}

        <div className="ng-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: 'var(--read)', fontSize: '1.3rem' }}>
            {score} / {qs.length}
            <span className="ng-tag" style={{ marginLeft: 10 }}>{answered} answered</span>
          </div>
          <button className="ng-btn" onClick={finish} disabled={answered < qs.length || saved}>
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
