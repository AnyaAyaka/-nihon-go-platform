'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

/* 模試のページは中身が素のHTMLなので、点数が出る要素を見張って、
   出た瞬間に progress に記録する。ページ本体には手を入れない。 */

const TARGETS = ['#score-num', '#resultsScore', '#score-total']
const SECTION_JA = { vocabulary: '文字・語彙', grammar: '文法', reading: '読解', listening: '聴解' }

export default function MockRecorder({ level = 'N3', mockNum, section }) {
  const [state, setState] = useState(null)   // null | 'saved' | 'guest'

  useEffect(() => {
    let stop = false
    let seen = ''

    const refId = `${String(level).toLowerCase()}-mock${String(mockNum).padStart(2, '0')}-${section}`
    const title = `JLPT ${String(level).toUpperCase()} 模試${String(mockNum).padStart(2, '0')}　${SECTION_JA[section] || section}`

    async function save(score, max) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { if (!stop) setState('guest'); return }
      const { error } = await supabase.from('progress').upsert({
        user_id: user.id,
        kind: 'mock',
        ref_id: refId,
        score,
        max_score: max,
        detail: { level: String(level).toUpperCase(), mock: Number(mockNum), section, title },
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,kind,ref_id' })
      if (!stop) setState(error ? null : 'saved')
    }

    function look() {
      for (const sel of TARGETS) {
        const el = document.querySelector(sel)
        if (!el) continue
        const txt = (el.textContent || '').trim()
        const m = txt.match(/(\d+)\s*\/\s*(\d+)/)
        if (m && txt !== seen) {
          seen = txt
          save(Number(m[1]), Number(m[2]))
          return
        }
      }
    }

    look()
    const mo = new MutationObserver(look)
    mo.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => { stop = true; mo.disconnect() }
  }, [level, mockNum, section])

  if (!state) return null

  return (
    <div style={{
      position: 'fixed', bottom: 16, left: 16, right: 16, zIndex: 9999, margin: '0 auto', maxWidth: 420,
      background: state === 'saved' ? '#E7EFE9' : '#FBFAF6',
      border: '1px solid ' + (state === 'saved' ? '#C3D8C9' : '#D8D3C6'),
      borderLeft: '3px solid ' + (state === 'saved' ? '#2E6B4F' : '#C5372C'),
      padding: '12px 16px', fontSize: '.9rem', lineHeight: 1.7,
      fontFamily: '"Zen Kaku Gothic New", "Hiragino Sans", system-ui, sans-serif'
    }}>
      {state === 'saved'
        ? <>点数を記録しました。<a href="/my" style={{ color: '#2C4A6E' }}>今日やること</a> から見られます。</>
        : <>点数は記録されていません。<a href="/auth" style={{ color: '#2C4A6E' }}>サインイン</a> すると、先生に提出されます。</>}
    </div>
  )
}
