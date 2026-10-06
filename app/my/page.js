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

  if (loading) return <div className="ng"><div className="ng-wrap ng-app">Loading…</div></div>

  return (
    <div className="ng">
      <div className="ng-wrap ng-app">
        <div className="ng-bar">
          <h1 className="ng-title">今日やること<span>Your work</span></h1>
          <div className="ng-cta">
            <button className="ng-btn" onClick={() => router.push('/my/review')}>
              復習{due > 0 ? ` ${due}` : ''}
            </button>
            <a className="ng-btn ghost" href="/dashboard">Dashboard</a>
          </div>
        </div>

        {due > 0 && (
          <div className="ng-msg" style={{ marginBottom: 18 }}>
            まちがえたところが{due}件たまっています。復習は数分で終わります。
          </div>
        )}

        {rows.length === 0 && (
          <p className="ng-empty">
            Nothing set yet. When your teacher assigns a story, it appears here with the audio and the questions.
          </p>
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
                    {r.due_on ? `　due ${r.due_on}` : ''}
                  </p>
                </div>
                <div className="ng-cta">
                  {r.done && (
                    <span className="ng-ok">
                      {r.done.max_score ? `${r.done.score} / ${r.done.max_score}` : 'done'}
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
                      <a className="ng-btn" href={href} target="_blank" rel="noopener">Read</a>
                      {!r.done && (
                        <button className="ng-btn ghost" onClick={() => markRead(r.ref_id)}>Mark as read</button>
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
