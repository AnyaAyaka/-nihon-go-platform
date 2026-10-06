'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../../lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import '../../teach.css'

// 先生がレッスンで開く画面。公開しているReaderと同じ組版で、答えと解説つき。記録はしない。
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
  const [hide, setHide] = useState(false)
  const [showEn, setShowEn] = useState(true)
  const [furi, setFuri] = useState(true)

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

  if (loading) return <div className="tc"><div className="tc-wrap"><p style={{ padding: 24 }}>読み込み中…</p></div></div>
  if (err) return (
    <div className="tc"><div className="tc-wrap">
      <div className="err">{err}</div>
      <div style={{ maxWidth: '36em', margin: '0 auto' }}>
        <button className="btn" onClick={() => router.push('/classes')}>クラスへ</button>
      </div>
    </div></div>
  )

  const story = data.story
  const qs = data.questions || []
  const title = kind === 'grammar_drill' ? data.title : (story?.title || ref)

  const Options = ({ q }) => {
    const opts = q.t === 'judge' ? [true, false] : (q.o || [])
    return opts.map((o, m) => {
      const val = q.t === 'judge' ? o : m
      const right = !hide && val === q.a
      return (
        <div className={'opt' + (right ? ' right' : '')} key={m}>
          {q.t !== 'judge' && <span className="n">{m + 1}</span>}
          <span>{q.t === 'judge' ? (o ? '○　正しい' : '✕　正しくない') : R(o)}</span>
          {right && <span className="ans">答え</span>}
        </div>
      )
    })
  }

  return (
    <div className={'tc' + (furi ? '' : ' furi-off')} style={furi ? null : { ['--rt']: 'hidden' }}>
      <style>{furi ? '' : '.tc .story rt{visibility:hidden}'}</style>
      <div className="tc-wrap">

        <div className="tc-top">
          <div>
            <h1>{R(title)}</h1>
            <span className="meta">
              {kind === 'grammar_drill'
                ? `文法の練習 ${qs.length}問${data.lv ? '　' + String(data.lv).toUpperCase() : ''}`
                : `${(story?.lv || '').toUpperCase()}${story?.theme ? '　' + story.theme : ''}　力だめし ${qs.length}問`}
            </span>
          </div>
          <div className="tc-tools">
            <button className="btn" aria-pressed={hide} onClick={() => setHide(v => !v)}>
              {hide ? '答えを出す' : '答えを隠す'}
            </button>
            {story && (
              <>
                <button className="btn" aria-pressed={!showEn} onClick={() => setShowEn(v => !v)}>
                  {showEn ? '英訳を隠す' : '英訳を出す'}
                </button>
                <button className="btn" aria-pressed={!furi} onClick={() => setFuri(v => !v)}>
                  {furi ? 'ふりがなを消す' : 'ふりがなを出す'}
                </button>
              </>
            )}
            <button className="btn" onClick={() => window.print()}>印刷</button>
            <button className="btn" onClick={() => router.push('/classes')}>クラス</button>
          </div>
        </div>

        {story && (
          <div className="story">
            {story.paras.map((para, pi) => (
              <div className="para" key={pi}>
                {para.map((sen, si) => (
                  <p key={si}>
                    {sen.s.map((seg, gi) =>
                      typeof seg === 'string'
                        ? <span key={gi}>{R(seg)}</span>
                        : <span className="g" key={gi} title={data.titles?.[seg.g] || seg.g}>{R(seg.t)}</span>
                    )}
                    {showEn && <span className="en">{sen.en}</span>}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {kind === 'grammar_drill' && (
          <div className="note">
            {data.pattern && <p className="pattern">{data.pattern}</p>}
            <p>{R(data.note)}</p>
            {(data.ex || []).map((e, i) => (
              <p key={i} className="pattern">
                {R(e[0])}<span className="lab" style={{ display: 'block' }}>{e[1]}</span>
              </p>
            ))}
          </div>
        )}

        {story && (story.quiz || []).length > 0 && (
          <div className="quiz">
            <h2>読んだあとに</h2>
            <p className="sub">JLPT読解と同じ4択。{story.quiz.length}問。</p>
            {story.quiz.map((q, i) => (
              <div className="q" key={i}>
                <p>{i + 1}. {R(q.q)}</p>
                <Options q={q} />
                {!hide && q.why && <p className="why">{R(q.why)}</p>}
              </div>
            ))}
          </div>
        )}

        {qs.length > 0 && (
          <div className="quiz">
            <h2>{kind === 'grammar_drill' ? '練習' : '力だめし'}</h2>
            <p className="sub">
              {kind === 'grammar_drill'
                ? `四択・並べかえ・正誤で${qs.length}問。`
                : `この話の漢字・語彙・文法から${qs.length}問。`}
            </p>
            {qs.map((q, i) => (
              <div className="q" key={i}>
                <p className="lab">
                  {i + 1} / {qs.length}　{LABEL[q.t] || QT[q.t] || ''}
                  {q.g && data.titles?.[q.g] ? `　${data.titles[q.g]}` : ''}
                  {q.w ? `　${q.w}${q.wen ? '（' + q.wen + '）' : ''}` : ''}
                </p>
                <p>{R(q.q)}</p>
                {q.t === 'order' ? (
                  <>
                    <div className="tiles">
                      {(q.tiles || []).map((t, m) => <span className="tile" key={m}>{R(t)}</span>)}
                    </div>
                    {!hide && q.sent && (
                      <p className="why"><strong>答え　</strong>{R(q.sent)}</p>
                    )}
                  </>
                ) : <Options q={q} />}
                {!hide && q.why && <p className="why">{R(q.why)}</p>}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
