'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { dueCount } from '../../lib/review'
import { useRouter } from 'next/navigation'
import '../ng-ui.css'

const STORIES_BASE = 'https://nihongo-world.com/materials/stories'

export default function MyWorkPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])
  const [catalog, setCatalog] = useState({})
  const [due, setDue] = useState(0)
  const [mocks, setMocks] = useState({})
  const [history, setHistory] = useState([])

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }

    // pick up any invitation sent to this address
    await supabase.from('class_students')
      .update({ user_id: user.id, status: 'active', joined_at: new Date().toISOString() })
      .eq('email', (user.email || '').toLowerCase())
      .is('user_id', null)

    const { data: mine } = await supabase
      .from('class_students')
      .select('class_id, classes(name, level)')
      .eq('user_id', user.id)
      .eq('status', 'active')

    const classIds = (mine || []).map(m => m.class_id)
    let asg = []
    if (classIds.length) {
      const { data } = await supabase.from('assignments').select('*')
        .in('class_id', classIds).order('due_on', { nullsFirst: false })
      asg = data || []
    }
    const { data: prog } = await supabase.from('progress').select('*').eq('user_id', user.id)
    setDue(await dueCount(user.id))
    setHistory((prog || []).slice().sort((a, b) =>
      String(b.completed_at || '').localeCompare(String(a.completed_at || ''))))

    const cat = {}
    for (const s of await (await fetch('/data/stories-catalog.json')).json()) cat[s.id] = s
    setCatalog(cat)

    const mk = {}
    for (const m of await (await fetch('/data/mocks.json')).json().catch(() => [])) mk[m.id] = m
    setMocks(mk)

    setRows(asg.map(a => ({
      ...a,
      className: ((mine || []).find(m => m.class_id === a.class_id)?.classes || {}).name,
      done: (prog || []).find(p => p.kind === a.kind && p.ref_id === a.ref_id)
    })))
    setLoading(false)
  }

  async function markRead(refId) {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('progress').upsert({
      user_id: user.id, kind: 'story', ref_id: refId, completed_at: new Date().toISOString()
    }, { onConflict: 'user_id,kind,ref_id' })
    load()
  }

  if (loading) return <div className="ng"><div className="ng-wrap ng-app">読み込み中…</div></div>

  return (
    <div className="ng">
      <div className="ng-wrap ng-app">
        <div className="ng-bar">
          <h1 className="ng-title">今日やること<span>あなたの学習</span></h1>
          <div className="ng-cta">
            <button className="ng-btn" onClick={() => router.push('/my/stories')}>物語をえらぶ</button>
            <button className="ng-btn ghost" onClick={() => router.push('/my/review')}>
              復習{due > 0 ? ` ${due}` : ''}
            </button>
            <a className="ng-btn ghost" href="/dashboard">ダッシュボード</a>
          </div>
        </div>

        {due > 0 && (
          <div className="ng-msg" style={{ marginBottom: 18 }}>
            まちがえたところが{due}件たまっています。復習は数分で終わります。
          </div>
        )}

        {rows.length === 0 && (
          <div className="ng-panel">
            <h2>課題はまだありません</h2>
            <p className="hint" style={{ margin: '6px 0 14px' }}>
              先生が課題を出すと、ここに並びます。それを待たずに、自分で物語を選んで進められます。
              力だめしで間違えたところは、復習に自動でたまります。
            </p>
            <div className="ng-cta">
              <button className="ng-btn" onClick={() => router.push('/my/stories')}>物語をえらぶ</button>
              {due > 0 && (
                <button className="ng-btn ghost" onClick={() => router.push('/my/review')}>復習 {due}</button>
              )}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="ng-panel">
            <h2>解いた記録</h2>
            <p className="hint" style={{ margin: '4px 0 12px' }}>新しい順。{history.length}件。</p>
            {history.slice(0, 12).map(h => (
              <div key={h.kind + h.ref_id} style={{ display: 'flex', justifyContent: 'space-between',
                gap: 12, flexWrap: 'wrap', padding: '8px 0', borderTop: '1px solid var(--line)' }}>
                <span style={{ fontFamily: 'var(--read)', minWidth: 200 }}>
                  {catalog[h.ref_id]?.title || mocks[h.ref_id]?.title || h.ref_id}
                </span>
                <span className="ng-tag">
                  {h.kind === 'story_test' ? '力だめし' : h.kind === 'grammar_drill' ? '文法の練習' : h.kind === 'mock' ? '模試' : '読んだ'}
                </span>
                <span className={h.max_score && h.score / h.max_score >= .8 ? 'ng-ok' : ''}>
                  {h.max_score ? `${h.score} / ${h.max_score}` : '済み'}
                </span>
              </div>
            ))}
          </div>
        )}

        {rows.map(r => {
          const s = catalog[r.ref_id]
          const mk = mocks[r.ref_id]
          const href = s ? `${STORIES_BASE}/${s.lv}/${s.slug}/` : `${STORIES_BASE}/`
          return (
            <div className="ng-panel" key={r.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--read)', fontSize: '1.25rem', margin: 0 }}>{s ? s.title : (mk ? mk.title : (r.title || r.ref_id))}</h2>
                  <p className="hint" style={{ margin: '4px 0 0' }}>
                    {s?.en}
                    {r.kind === 'story_test' ? '　力だめし8問'
                      : r.kind === 'grammar_drill' ? '　文法の練習5問'
                      : r.kind === 'mock' ? `　模試　${(mocks[r.ref_id]?.questions) || ''}問`
                      : '　読む'}
                    {r.className ? `　${r.className}` : ''}
                    {r.due_on ? `　${r.due_on}まで` : ''}
                  </p>
                </div>
                <div className="ng-cta">
                  {r.done && (
                    <span className="ng-ok">
                      {r.done.max_score ? `${r.done.score} / ${r.done.max_score}` : '済み'}
                    </span>
                  )}
                  {r.kind === 'mock' ? (
                    <a className="ng-btn" href={mocks[r.ref_id]?.path || '/jlpt/n3/'}>
                      {r.done ? 'もう一度' : 'はじめる'}
                    </a>
                  ) : r.kind === 'story_test' ? (
                    <button className="ng-btn" onClick={() => router.push(`/my/test/${r.ref_id}`)}>
                      {r.done ? 'もう一度' : 'はじめる'}
                    </button>
                  ) : r.kind === 'grammar_drill' ? (
                    <button className="ng-btn" onClick={() => router.push(`/my/drill/${r.ref_id}`)}>
                      {r.done ? 'もう一度' : 'はじめる'}
                    </button>
                  ) : (
                    <>
                      <a className="ng-btn" href={href} target="_blank" rel="noopener">読む</a>
                      {!r.done && (
                        <button className="ng-btn ghost" onClick={() => markRead(r.ref_id)}>読んだ</button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
