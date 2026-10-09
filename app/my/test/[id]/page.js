'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../../lib/supabase'
import { addToReview } from '../../../../lib/review'
import { useRouter, useParams } from 'next/navigation'
import '../../../ng-ui.css'

const LABEL = { kanji: 'Kanji reading', hyoki: 'Spelling', bunmyaku: 'Vocabulary in context', youhou: 'Vocabulary in use', grammar: 'Grammar' }

function ruby(s) {
  // {漢字|かんじ} -> <ruby>
  return (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
    .replace(/\{([^|{}]+)\|([^{}]+)\}/g, '<ruby>$1<rt>$2</rt></ruby>')
    .replace(/&lt;u&gt;/g, '<u>').replace(/&lt;\/u&gt;/g, '</u>')
}

export default function StoryTestPage() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [story, setStory] = useState(null)
  const [titles, setTitles] = useState({})
  const [picked, setPicked] = useState({})
  const [saved, setSaved] = useState(false)

  useEffect(() => { load() }, [id])

  async function load() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) { router.push('/auth'); return }

    // 問題はログイン必須のAPIからしか取れない（公開ファイルには置いていない）
    const [test, cat] = await Promise.all([
      fetch(`/api/content/story-test?id=${encodeURIComponent(id)}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
        cache: 'no-store'
      }).then(r => r.ok ? r.json() : { questions: [] }).catch(() => ({ questions: [] })),
      fetch('/data/stories-catalog.json').then(r => r.json()).catch(() => [])
    ])
    setQuestions(test.questions || [])
    setTitles(test.titles || {})
    setStory(cat.find(s => s.id === id) || null)
    setLoading(false)
  }

  function byType() {
    const out = {}
    questions.forEach((q, i) => {
      const k = q.t
      out[k] = out[k] || { ok: 0, n: 0 }
      out[k].n += 1
      if (picked[i] === q.a) out[k].ok += 1
    })
    return out
  }

  const answered = Object.keys(picked).length
  const score = questions.reduce((n, q, i) => n + (picked[i] === q.a ? 1 : 0), 0)

  async function finish() {
    const { data: { user } } = await supabase.auth.getUser()
    // 何を落としたかまで残す。先生の画面で文法・語彙ごとに集計する。
    const wrong = questions
      .map((q, i) => (picked[i] !== q.a ? {
        t: q.t,
        ...(q.g ? { g: q.g, gt: titles[q.g] || q.g } : {}),
        ...(q.w ? { w: q.w, wen: q.wen || '' } : {})
      } : null))
      .filter(Boolean)

    await supabase.from('progress').upsert({
      user_id: user.id,
      kind: 'story_test',
      ref_id: id,
      score,
      max_score: questions.length,
      detail: { answers: picked, wrong, byType: byType() },
      completed_at: new Date().toISOString()
    }, { onConflict: 'user_id,kind,ref_id' })

    await addToReview(user.id, wrong.map(x => x.g
      ? { kind: 'grammar', ref: x.g, label: x.gt }
      : { kind: 'vocab', ref: x.w, label: x.w, en: x.wen }))

    setSaved(true)
  }

  if (loading) return <div className="ng"><div className="ng-wrap ng-app">Loading…</div></div>
  if (!questions.length) return (
    <div className="ng"><div className="ng-wrap ng-app">
      <p className="ng-empty">There is no mini test for this story yet.</p>
    </div></div>
  )

  return (
    <div className="ng">
      <div className="ng-wrap ng-app" style={{ maxWidth: 740 }}>
        <div className="ng-bar">
          <h1 className="ng-title">Mini test<span>{story?.title}</span></h1>
          <div className="ng-cta">
            {story && (
              <a className="ng-btn ghost"
                href={`https://nihongo-world.com/materials/stories/${story.lv}/${story.slug}/`}
                target="_blank" rel="noopener">Read the story</a>
            )}
            <button className="ng-btn ghost" onClick={() => router.push('/my')}>Today</button>
          </div>
        </div>

        {questions.map((q, i) => {
          const done = picked[i] !== undefined
          return (
            <div className="ng-panel" key={i}>
              <div className="ng-tag">{i + 1} / {questions.length}　{LABEL[q.t] || ''}</div>
              <p style={{ fontFamily: 'var(--read)', fontSize: '1.15rem', lineHeight: 2.2, margin: '6px 0 14px' }}
                dangerouslySetInnerHTML={{ __html: ruby(q.q) }} />
              {q.o.map((o, m) => {
                const right = done && m === q.a
                const wrong = done && m === picked[i] && m !== q.a
                return (
                  <button key={m} disabled={done}
                    onClick={() => setPicked(p => ({ ...p, [i]: m }))}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left', font: 'inherit',
                      fontFamily: 'var(--read)', fontSize: '1.02rem', cursor: done ? 'default' : 'pointer',
                      padding: '10px 12px', marginBottom: 6, borderRadius: 6,
                      border: '1px solid ' + (right ? '#2e7d4f' : wrong ? '#b3412f' : 'var(--line)'),
                      background: right ? 'var(--teal-soft)' : wrong ? '#f8e1dc' : 'var(--surface)'
                    }}>
                    <span className="ng-tag" style={{ marginRight: 10 }}>{m + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: ruby(o) }} />
                  </button>
                )
              })}
              {done && (
                <p style={{ fontSize: '.92rem', lineHeight: 1.9, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 6, padding: '10px 12px', margin: '8px 0 0' }}
                  dangerouslySetInnerHTML={{ __html: ruby(q.why) }} />
              )}
            </div>
          )
        })}

        <div className="ng-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: 'var(--read)', fontSize: '1.3rem' }}>
            {score} / {questions.length}
            <span className="ng-tag" style={{ marginLeft: 10 }}>{answered} answered</span>
          </div>
          <button className="ng-btn" onClick={finish} disabled={answered < questions.length || saved}>
            {saved ? 'Sent to your teacher' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
