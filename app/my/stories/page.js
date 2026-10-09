'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
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

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }

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
            <button className="ng-btn ghost" onClick={() => router.push('/my/review')}>Review</button>
          </div>
        </div>

        <div className="ng-panel">
          <div className="ng-field" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {LEVELS.map(l => (
                <button key={l} className={'ng-btn ' + (l === lv ? '' : 'ghost')}
                  style={{ padding: '8px 16px' }} onClick={() => setLv(l)}>{l.toUpperCase()}</button>
              ))}
            </div>
            <input className="ng-input" value={qtext} onChange={e => setQtext(e.target.value)}
              placeholder="Search by title or theme" style={{ minWidth: 220 }} />
          </div>
          <p className="hint" style={{ margin: '12px 0 0' }}>
            {lv.toUpperCase()} · mini test done on {doneCount} of {all.filter(s => s.lv === lv).length}
          </p>
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
                  <a className="ng-btn ghost" href={`${STORIES_BASE}/${s.lv}/${s.slug}/`} target="_blank" rel="noopener">Read</a>
                  <button className="ng-btn" onClick={() => router.push(`/my/test/${s.id}`)}>
                    {d?.max != null ? 'Again' : 'Mini test, 8 questions'}
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
