'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import '../../ng-ui.css'

// 箱が上がるほど、次に出るまでの間隔が長くなる
const GAP = [1, 3, 7, 21, 60, 150]
const today = () => new Date().toISOString().slice(0, 10)
const plus = d => { const t = new Date(); t.setDate(t.getDate() + d); return t.toISOString().slice(0, 10) }

function ruby(s) {
  return (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
    .replace(/\{([^|{}]+)\|([^{}]+)\}/g, '<ruby>$1<rt>$2</rt></ruby>')
    .replace(/&lt;u&gt;/g, '<u>').replace(/&lt;\/u&gt;/g, '</u>')
}
const R = s => <span dangerouslySetInnerHTML={{ __html: ruby(s) }} />

export default function ReviewPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([])
  const [later, setLater] = useState([])
  const [at, setAt] = useState(0)
  const [picked, setPicked] = useState(null)
  const [tally, setTally] = useState({ ok: 0, no: 0 })

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) { router.push('/auth'); return }

    const { data: rows } = await supabase.from('review_items')
      .select('*').eq('user_id', session.user.id).order('due_on')

    const due = (rows || []).filter(r => r.due_on <= today()).slice(0, 20)
    setLater((rows || []).filter(r => r.due_on > today()))

    if (!due.length) { setCards([]); setLoading(false); return }

    const res = await fetch('/api/content/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ items: due.map(r => ({ kind: r.kind, ref: r.ref, box: r.box })) })
    })
    const json = res.ok ? await res.json() : { items: [] }
    // 問題が引けたものだけ、DBの行と組にする
    setCards(json.items.map(x => ({ ...x, row: due.find(r => r.kind === x.kind && r.ref === x.ref) })).filter(x => x.row))
    setLoading(false)
  }

  const card = cards[at]

  function correct() {
    if (!card || picked === null) return false
    const q = card.question
    if (q.t === 'judge') return picked === q.a
    return picked === q.a
  }

  async function answer(choice) {
    setPicked(choice)
    const q = card.question
    const right = choice === q.a
    const row = card.row
    const box = right ? Math.min(row.box + 1, GAP.length - 1) : 0
    setTally(t => ({ ok: t.ok + (right ? 1 : 0), no: t.no + (right ? 0 : 1) }))

    if (right && box >= GAP.length - 1 && row.right_streak + 1 >= 3) {
      // 3回続けて正解したら、復習から外す
      await supabase.from('review_items').delete().eq('id', row.id)
      return
    }
    await supabase.from('review_items').update({
      box,
      due_on: right ? plus(GAP[box]) : plus(1),   // まちがえたものは明日もう一度
      right_streak: right ? row.right_streak + 1 : 0,
      wrong_count: right ? row.wrong_count : row.wrong_count + 1,
      last_seen: new Date().toISOString()
    }).eq('id', row.id)
  }

  function next() { setPicked(null); setAt(i => i + 1) }

  if (loading) return <div className="ng"><div className="ng-wrap ng-app">Loading…</div></div>

  if (!cards.length) return (
    <div className="ng"><div className="ng-wrap ng-app" style={{ maxWidth: 680 }}>
      <div className="ng-bar">
        <h1 className="ng-title">復習<span>Review</span></h1>
        <button className="ng-btn ghost" onClick={() => router.push('/my')}>今日やること</button>
      </div>
      <div className="ng-panel">
        <p style={{ margin: 0 }}>いま出すものはありません。</p>
        <p className="hint" style={{ margin: '8px 0 0' }}>
          {later.length
            ? `${later.length}件が待っています。いちばん早いものは ${later[0].due_on} に出ます。`
            : '力だめしや文法の練習で間違えたところが、ここに自動でたまります。'}
        </p>
      </div>
    </div></div>
  )

  if (!card) return (
    <div className="ng"><div className="ng-wrap ng-app" style={{ maxWidth: 680 }}>
      <div className="ng-bar"><h1 className="ng-title">復習<span>おわり</span></h1></div>
      <div className="ng-panel">
        <p style={{ fontFamily: 'var(--read)', fontSize: '1.4rem', margin: 0 }}>{tally.ok} / {tally.ok + tally.no}</p>
        <p className="hint" style={{ margin: '8px 0 16px' }}>
          正解したものは間隔をあけて、また出ます。間違えたものは明日もう一度。
        </p>
        <button className="ng-btn" onClick={() => router.push('/my')}>今日やること</button>
      </div>
    </div></div>
  )

  const q = card.question
  const opts = q.t === 'judge' ? [true, false] : (q.tiles ? null : q.o)

  return (
    <div className="ng">
      <div className="ng-wrap ng-app" style={{ maxWidth: 680 }}>
        <div className="ng-bar">
          <h1 className="ng-title">復習<span>{at + 1} / {cards.length}</span></h1>
          <button className="ng-btn ghost" onClick={() => router.push('/my')}>やめる</button>
        </div>

        <div className="ng-panel">
          <div className="ng-tag">
            {card.kind === 'grammar' ? '文法' : '語彙・漢字'}　{R(card.label)}
            {card.en ? `　${card.en}` : ''}
            {card.row.wrong_count > 1 ? `　これまで${card.row.wrong_count}回まちがえています` : ''}
          </div>
          <p style={{ fontFamily: 'var(--read)', fontSize: '1.15rem', lineHeight: 2.2, margin: '8px 0 16px' }}>{R(q.q)}</p>

          {!opts && (
            <p className="hint">この問題は復習では出せません。<button className="ng-mini" onClick={next}>次へ</button></p>
          )}

          {opts && opts.map((o, m) => {
            const val = q.t === 'judge' ? o : m
            const shown = picked !== null
            const right = shown && val === q.a
            const wrong = shown && val === picked && val !== q.a
            return (
              <button key={String(val)} disabled={shown} onClick={() => answer(val)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', font: 'inherit', fontFamily: 'var(--read)',
                  fontSize: '1.02rem', padding: '11px 13px', marginBottom: 6, background: '#fff',
                  cursor: shown ? 'default' : 'pointer',
                  border: '1px solid ' + (right ? '#2E6B4F' : wrong ? 'var(--shu)' : 'var(--line)')
                }}>
                {q.t !== 'judge' && <span className="ng-tag" style={{ marginRight: 10 }}>{m + 1}</span>}
                {q.t === 'judge' ? (o ? '○　正しい' : '✕　正しくない') : R(o)}
              </button>
            )
          })}

          {picked !== null && (
            <>
              <p style={{ fontSize: '.92rem', lineHeight: 1.9, margin: '12px 0 0', padding: '10px 12px',
                background: correct() ? '#E7EFE9' : 'var(--shu-soft)',
                border: '1px solid ' + (correct() ? '#C3D8C9' : '#EBC9C4') }}>
                <strong style={{ color: correct() ? '#2E6B4F' : 'var(--shu)' }}>{correct() ? '○　' : '✕　'}</strong>
                {R(q.why)}
              </p>
              <div style={{ marginTop: 14 }}>
                <button className="ng-btn" onClick={next}>{at + 1 === cards.length ? '終わる' : '次へ'}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
