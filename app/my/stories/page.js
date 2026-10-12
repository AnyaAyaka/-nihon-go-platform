'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import { isNativeApp } from '../../../lib/native'
import '../../ng-ui.css'

const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1']
const STORIES_BASE = 'https://nihongo-world.com/materials/stories'

export default function ChooseStoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [all, setAll] = useState([])
  const [lv, setLv] = useState('n3')
  const [qtext, setQtext] = useState('')
  const [done, setDone] = useState({})
  const [guest, setGuest] = useState(false)
  const [pass, setPass] = useState(false)

  // ストアのアプリだけ: 端末に保存して電波なしでも読めるようにする
  const [native, setNative] = useState(false)
  const [saved, setSaved] = useState({})
  const [saving, setSaving] = useState(null) // { done, total }

  useEffect(() => { load() }, [])

  // 最後に選んだレベルを覚えておく
  useEffect(() => {
    try { const v = localStorage.getItem('ng-level'); if (LEVELS.includes(v)) setLv(v) } catch (e) {}
  }, [])
  function pickLevel(l) {
    setLv(l)
    try { localStorage.setItem('ng-level', l) } catch (e) {}
  }

  useEffect(() => {
    if (!isNativeApp()) return
    setNative(true)
    import('../../../lib/offline').then(({ readOfflineIndex }) => readOfflineIndex().then(setSaved))
  }, [])

  async function saveLevel() {
    const { saveLevelOffline } = await import('../../../lib/offline')
    const stories = all.filter(s => s.lv === lv)
    setSaving({ done: 0, total: stories.length })
    const index = await saveLevelOffline(stories, (d, t) => setSaving({ done: d, total: t }))
    setSaved(index)
    setSaving(null)
  }

  async function removeLevel() {
    const { removeLevelOffline } = await import('../../../lib/offline')
    setSaved(await removeLevelOffline(lv))
  }

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      // ログインなしでも一覧と本文は見られる
      setGuest(true)
      setAll(await fetch('/data/stories-catalog.json').then(r => r.json()).catch(() => []))
      setLoading(false)
      return
    }

    const { data: { session } } = await supabase.auth.getSession()
    fetch('/api/pass/status', { headers: { Authorization: `Bearer ${session?.access_token || ''}` }, cache: 'no-store' })
      .then(r => r.json()).then(j => setPass(!!j.access)).catch(() => {})

    const [cat, { data: prog }] = await Promise.all([
      fetch('/data/stories-catalog.json').then(r => r.json()).catch(() => []),
      supabase.from('progress').select('kind, ref_id, score, max_score').eq('user_id', user.id)
    ])
    setAll(cat)
    const d = {}
    for (const p of prog || []) {
      if (p.kind === 'story_test') d[p.ref_id] = { score: p.score, max: p.max_score }
      else if (p.kind === 'story') d[p.ref_id] = d[p.ref_id] || { read: true }
    }
    setDone(d)
    setLoading(false)
  }

  if (loading) return <div className="ng"><div className="ng-wrap ng-app">Loading…</div></div>

  const q = qtext.trim().toLowerCase()
  const list = all
    .filter(s => s.lv === lv)
    .filter(s => !q || (s.title + s.en + (s.theme || '')).toLowerCase().includes(q))

  const doneCount = all.filter(s => s.lv === lv && done[s.id]?.max).length

  return (
    <div className="ng">
      <div className="ng-wrap ng-app">
        <div className="ng-bar">
          <h1 className="ng-title">Pick a story<span>199 stories, N5 to N1</span></h1>
          <div className="ng-cta">
            <button className="ng-btn ghost" onClick={() => router.push('/my')}>Today</button>
            {guest
              ? <a className="ng-btn ghost" href="/auth?next=/my/stories&back=/my/stories">Sign in</a>
              : <button className="ng-btn ghost" onClick={() => router.push('/my/review')}>Review</button>}
          </div>
        </div>

        <div className="ng-panel">
          <div className="ng-field" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {LEVELS.map(l => (
                <button key={l} className={'ng-btn ' + (l === lv ? '' : 'ghost')}
                  style={{ padding: '8px 16px' }} onClick={() => pickLevel(l)}>{l.toUpperCase()}</button>
              ))}
            </div>
            <input className="ng-input" value={qtext} onChange={e => setQtext(e.target.value)}
              placeholder="Search by title or theme" style={{ minWidth: 220 }} />
          </div>
          <p className="hint" style={{ margin: '12px 0 0' }}>
            {guest
              ? <>{all.filter(s => s.lv === lv).length} stories at {lv.toUpperCase()}. <a href="/auth?mode=signup&next=/my/stories&back=/my/stories">Create a free account</a> to take the mini tests and keep your scores.</>
              : <>{lv.toUpperCase()} · mini test done on {doneCount} of {all.filter(s => s.lv === lv).length}</>}
          </p>
          {native && (() => {
            const levelCount = all.filter(s => s.lv === lv).length
            const savedCount = Object.values(saved).filter(s => s.lv === lv).length
            return (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginTop: 12 }}>
                {saving ? (
                  <span className="hint">Saving {saving.done} of {saving.total}…</span>
                ) : savedCount >= levelCount && levelCount > 0 ? (
                  <>
                    <span className="ng-ok">{lv.toUpperCase()} saved for offline, with audio</span>
                    <button className="ng-btn ghost" style={{ padding: '6px 14px' }} onClick={removeLevel}>Remove</button>
                  </>
                ) : (
                  <>
                    <button className="ng-btn ghost" style={{ padding: '8px 16px' }} onClick={saveLevel}>
                      Save {lv.toUpperCase()} for offline
                    </button>
                    <span className="hint">
                      {savedCount > 0 ? `${savedCount} of ${levelCount} saved. ` : ''}Read and listen without a connection.
                    </span>
                  </>
                )}
              </div>
            )
          })()}
        </div>

        {list.map(s => {
          const d = done[s.id]
          return (
            <div className="ng-panel" key={s.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ minWidth: 240, flex: 1 }}>
                  <h2 style={{ fontFamily: 'var(--read)', fontSize: '1.2rem', margin: 0 }}>
                    {s.title}
                    {d?.max != null && (
                      <span className="ng-ok" style={{ marginLeft: 12, fontSize: '.85rem' }}>{d.score} / {d.max}</span>
                    )}
                  </h2>
                  <p className="hint" style={{ margin: '4px 0 0' }}>
                    {s.en}
                    {s.theme ? `　${s.theme}` : ''}
                    {s.chars ? ` · ${s.chars} characters` : ''}
                  </p>
                </div>
                <div className="ng-cta">
                  {native
                    ? <a className="ng-btn ghost" href={`${STORIES_BASE}/${s.lv}/${s.slug}/`}>Read</a>
                    : <a className="ng-btn ghost" href={`${STORIES_BASE}/${s.lv}/${s.slug}/`} target="_blank" rel="noopener">Read</a>}
                  <button className="ng-btn" onClick={() => router.push(guest
                    ? `/auth?mode=signup&next=${encodeURIComponent('/my/test/' + s.id)}&back=/my/stories`
                    : `/my/test/${s.id}`)}>
                    {d?.max != null ? 'Again' : (!pass && s.lv !== 'n5' && Number(String(s.id).split('-')[1]) > 5) ? 'Mini test · Pass' : 'Mini test, 8 questions'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {list.length === 0 && <p className="ng-empty">Nothing found.</p>}
      </div>
    </div>
  )
}
