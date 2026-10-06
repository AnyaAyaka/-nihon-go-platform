'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../../lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import '../../../ng-ui.css'

// 先生がレッスンで開く画面。答えと解説が最初から出ている。記録はしない。
const LABEL = { kanji: '漢字の読み', hyoki: '表記', bunmyaku: '語彙（文脈）', youhou: '語彙（用法）', grammar: '文法' }
const QT = { mc: '四択', order: '並べかえ', judge: '正誤' }

function ruby(s) {
  return (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
    .replace(/\{([^|{}]+)\|([^{}]+)\}/g, '<ruby>$1<rt>$2</rt></ruby>')
    .replace(/&lt;u&gt;/g, '<u>').replace(/&lt;\/u&gt;/g, '</u>')
}
const R = s => <span dangerouslySetInnerHTML={{ __html: ruby(s) }} />

export default function TeachPage() {
  const router = useRouter()
  const { kind, ref } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')
  const [hide, setHide] = useState(false)   // 生徒に見せるとき用に答えを隠す

  useEffect(() => { load() }, [kind, ref])

  async function load() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) { router.push('/auth'); return }
    const res = await fetch(`/api/content/preview?kind=${encodeURIComponent(kind)}&ref=${encodeURIComponent(ref)}`, {
      headers: { Authorization: `Bearer ${session.access_token}` }, cache: 'no-store'
    })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      setErr(j.error === 'teachers only'
        ? 'この画面は先生用です。クラスを作ると見られるようになります。'
        : '見つかりませんでした。')
      setLoading(false); return
    }
    setData(await res.json())
    setLoading(false)
  }

  if (loading) return <div className="ng"><div className="ng-wrap ng-app">Loading…</div></div>
  if (err) return (
    <div className="ng"><div className="ng-wrap ng-app">
      <div className="ng-msg ng-err">{err}</div>
      <button className="ng-btn ghost" onClick={() => router.push('/classes')}>クラスへ</button>
    </div></div>
  )

  const qs = data.questions || []
  const title = kind === 'grammar_drill' ? data.title : ref

  return (
    <div className="ng">
      <div className="ng-wrap ng-app" style={{ maxWidth: 820 }}>
        <div className="ng-bar">
          <h1 className="ng-title">
            {R(title)}
            <span>{kind === 'grammar_drill' ? `文法の練習 ${qs.length}問` : `力だめし ${qs.length}問`}</span>
          </h1>
          <div className="ng-cta">
            <button className="ng-btn ghost" onClick={() => setHide(v => !v)}>
              {hide ? '答えを出す' : '答えを隠す'}
            </button>
            <button className="ng-btn ghost" onClick={() => window.print()}>印刷</button>
            <button className="ng-btn ghost" onClick={() => router.push('/classes')}>クラスへ</button>
          </div>
        </div>

        {kind === 'grammar_drill' && (
          <div className="ng-panel">
            {data.pattern && <p style={{ fontFamily: 'var(--read)', margin: '0 0 8px' }}>{data.pattern}</p>}
            <p style={{ margin: 0, lineHeight: 1.9 }}>{R(data.note)}</p>
            {(data.ex || []).map((e, i) => (
              <p key={i} style={{ margin: '10px 0 0', fontFamily: 'var(--read)' }}>
                {R(e[0])}<span className="ng-tag" style={{ display: 'block', fontFamily: 'var(--ui)' }}>{e[1]}</span>
              </p>
            ))}
          </div>
        )}

        {qs.map((q, i) => {
          const opts = q.t === 'judge' ? [true, false] : q.o
          return (
            <div className="ng-panel" key={i}>
              <div className="ng-tag">
                {i + 1} / {qs.length}　{LABEL[q.t] || QT[q.t] || ''}
                {q.g && data.titles?.[q.g] ? `　${data.titles[q.g]}` : ''}
                {q.w ? `　${q.w}${q.wen ? '（' + q.wen + '）' : ''}` : ''}
              </div>
              <p style={{ fontFamily: 'var(--read)', fontSize: '1.15rem', lineHeight: 2.2, margin: '6px 0 12px' }}>{R(q.q)}</p>

              {q.t === 'order' ? (
                <>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(q.tiles || []).map((t, m) => (
                      <span key={m} style={{ fontFamily: 'var(--read)', padding: '8px 12px',
                        border: '1px solid var(--line)', background: '#fff' }}>{R(t)}</span>
                    ))}
                  </div>
                  {!hide && q.sent && (
                    <p style={{ fontFamily: 'var(--read)', marginTop: 10 }}>
                      <strong style={{ color: '#2E6B4F' }}>答え　</strong>{R(q.sent)}
                    </p>
                  )}
                </>
              ) : (
                (opts || []).map((o, m) => {
                  const val = q.t === 'judge' ? o : m
                  const right = !hide && val === q.a
                  return (
                    <div key={m} style={{
                      fontFamily: 'var(--read)', fontSize: '1.02rem', padding: '9px 12px', marginBottom: 5,
                      background: '#fff', border: '1px solid ' + (right ? '#2E6B4F' : 'var(--line)')
                    }}>
                      {q.t !== 'judge' && <span className="ng-tag" style={{ marginRight: 10 }}>{m + 1}</span>}
                      {q.t === 'judge' ? (o ? '○　正しい' : '✕　正しくない') : R(o)}
                      {right && <strong style={{ color: '#2E6B4F', marginLeft: 10 }}>答え</strong>}
                    </div>
                  )
                })
              )}

              {!hide && q.why && (
                <p style={{ fontSize: '.92rem', lineHeight: 1.9, background: 'var(--paper)',
                  border: '1px solid var(--line)', padding: '10px 12px', margin: '10px 0 0' }}>{R(q.why)}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
