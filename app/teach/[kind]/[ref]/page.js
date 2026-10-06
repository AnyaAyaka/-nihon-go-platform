'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../../lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import '../../reader.css'

// 先生がレッスンで開く画面。公開しているReaderと同じ見た目。
// ちがいは、答えと解説を出せること、記録を取らないこと。
const LABEL = { kanji: '漢字の読み', hyoki: '表記', bunmyaku: '語彙（文脈）', youhou: '語彙（用法）', grammar: '文法' }
const QT = { mc: '四択', order: '並べかえ', judge: '正誤' }

function ruby(s) {
  return (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
    .replace(/\{([^|{}]+)\|([^{}]+)\}/g, '<ruby>$1<rt>$2</rt></ruby>')
    .replace(/&lt;u&gt;/g, '<u>').replace(/&lt;\/u&gt;/g, '</u>')
}
const R = s => <span dangerouslySetInnerHTML={{ __html: ruby(s) }} />
const plain = s => (s || '').replace(/\{([^|{}]+)\|[^{}]+\}/g, '$1')

export default function TeachPage() {
  const router = useRouter()
  const { kind, ref } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')
  const [showAns, setShowAns] = useState(false)   // 授業で開くので最初は出さない
  const [showEn, setShowEn] = useState(false)
  const [furi, setFuri] = useState('all')
  const [size, setSize] = useState(1.3)
  const [sel, setSel] = useState(null)

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
    const d = await res.json()
    setData(d)
    if (d.story?.grammar?.length) setSel({ kind: 'g', id: d.story.grammar[0] })
    setLoading(false)
  }

  if (loading) return <div className="tc"><p style={{ padding: 24 }}>読み込み中…</p></div>
  if (err) return (
    <div className="tc"><div className="wrap" style={{ padding: 24 }}>
      <p>{err}</p>
      <button className="btn" onClick={() => router.push('/classes')}>クラスへ</button>
    </div></div>
  )

  const story = data.story
  const qs = data.questions || []
  const G = data.grammar || {}
  const title = kind === 'grammar_drill' ? data.title : (story?.title || ref)

  const rootClass = ['tc', 'furi-' + furi, showEn ? 'show-en' : ''].filter(Boolean).join(' ')

  // 右のパネル
  function Detail() {
    if (!sel) return <p className="empty">本文の単語か、波線の文法をタップ。</p>
    if (sel.kind === 'w') {
      const w = sel.w
      return (
        <>
          <div className="big" style={{ fontSize: '1.7rem' }}>{plain(w.t)}</div>
          <div className="tags">
            {w.lv && <span className="tag j">JLPT {w.lv}</span>}
          </div>
          {w.r && <div className="lemma">よみ：{w.r}</div>}
          {w.l && plain(w.t) !== w.l && <div className="lemma">もとの形：{w.l}</div>}
          {w.e && <div className="mean" lang="en">{w.e}</div>}
        </>
      )
    }
    const g = G[sel.id]
    if (!g) return <p className="empty">—</p>
    const role = story && story.grammar[0] === sel.id ? 'メイン' : 'サブ'
    return (
      <>
        <h3>文法　{role}</h3>
        <div className="big" style={{ fontSize: '1.7rem' }}>{g.title}</div>
        <div className="tags"><span className="tag j">JLPT {(g.lv || '').toUpperCase()}</span></div>
        <div className="mean" lang="en">{g.en}</div>
        <div className="pattern">{g.pattern}</div>
        <div className="sec"><h4>ポイント</h4><div className="note">{R(g.note)}</div></div>
        {(g.ex || []).length > 0 && (
          <div className="sec"><h4>ほかの例</h4>
            {g.ex.map((e, i) => (
              <div key={i}>
                <p className="ex">{R(e[0])}</p>
                <p className="exen" lang="en">{e[1]}</p>
              </div>
            ))}
          </div>
        )}
        <div className="sec">
          <a className="btn" href={`/teach/grammar_drill/${encodeURIComponent(sel.id)}`}>練習5問を見る</a>
        </div>
      </>
    )
  }

  const Options = ({ q }) => {
    const opts = q.t === 'judge' ? [true, false] : (q.o || [])
    return opts.map((o, m) => {
      const val = q.t === 'judge' ? o : m
      const right = showAns && val === q.a
      return (
        <label className={'opt' + (right ? ' right' : '')} key={m}>
          <span className="num">{q.t === 'judge' ? '' : m + 1}</span>
          <span>{q.t === 'judge' ? (o ? '○　正しい' : '✕　正しくない') : R(o)}</span>
          {right && <span className="ansmark">答え</span>}
        </label>
      )
    })
  }

  return (
    <div className={rootClass} style={{ ['--story-size']: size + 'rem' }}>
      <div className="wrap">
        <section id="reader">
          <header className="top">
            <button type="button" className="backlink" onClick={() => router.push('/classes')}>← クラスへ</button>
            <div className="meta">
              <span className="lv">{((story?.lv) || data.lv || '').toUpperCase()}</span>
              {story?.theme && <span>{story.theme}</span>}
              {story && <span>{story.paras.reduce((n, p) => n + p.length, 0)}文</span>}
              <span>{kind === 'grammar_drill' ? `練習${qs.length}問` : `力だめし${qs.length}問`}</span>
              <span>先生用</span>
            </div>
            <h1>{R(title)}</h1>
            {story && (
              <div className="gchips">
                {story.grammar.map((k, j) => (
                  <button type="button" className="gchip" key={k} onClick={() => setSel({ kind: 'g', id: k })}>
                    <small>{j === 0 ? 'メイン' : 'サブ'}</small>{G[k]?.title || k}
                  </button>
                ))}
              </div>
            )}
          </header>

          <div className="bar" role="toolbar">
            {story && (
              <>
                <div className="grp"><span>ふりがな</span>
                  <div className="seg">
                    <button type="button" aria-pressed={furi === 'all'} onClick={() => setFuri('all')}>全部</button>
                    <button type="button" aria-pressed={furi === 'none'} onClick={() => setFuri('none')}>なし</button>
                  </div>
                </div>
                <button type="button" className="btn" aria-pressed={showEn} onClick={() => setShowEn(v => !v)}>英訳</button>
                <div className="grp"><span>文字</span>
                  <div className="seg">
                    <button type="button" onClick={() => setSize(s => Math.max(1, +(s - .1).toFixed(2)))}>A−</button>
                    <button type="button" onClick={() => setSize(s => Math.min(2, +(s + .1).toFixed(2)))}>A＋</button>
                  </div>
                </div>
              </>
            )}
            <button type="button" className={'btn' + (showAns ? ' primary' : '')} aria-pressed={showAns}
              onClick={() => setShowAns(v => !v)}>
              {showAns ? '答えを隠す' : '答えを出す'}
            </button>
            <span className="spacer"></span>
            <button type="button" className="btn" onClick={() => window.print()}>印刷</button>
          </div>

          <div className="main">
            <div>
              {story && (
                <div className="legend">
                  <span><i className="lw">単語</i>にカーソルで意味</span>
                  <span><i className="lg">波線</i>は文法</span>
                </div>
              )}

              {story && (
                <article className="story" lang="ja">
                  {story.paras.map((para, pi) => (
                    <p key={pi}>
                      {para.map((sen, si) => (
                        <span className="s" key={si}>
                          {sen.s.map((seg, gi) => {
                            if (typeof seg === 'string') return <span key={gi}>{R(seg)}</span>
                            if (seg.g) return (
                              <span className={'g' + (sel?.kind === 'g' && sel.id === seg.g ? ' sel' : '')} key={gi}
                                role="button" tabIndex={0}
                                onMouseEnter={() => setSel({ kind: 'g', id: seg.g })}
                                onClick={() => setSel({ kind: 'g', id: seg.g })}>{R(seg.t)}</span>
                            )
                            if (seg.e || seg.r) return (
                              <span className="w" key={gi} role="button" tabIndex={0}
                                onMouseEnter={() => setSel({ kind: 'w', w: seg })}
                                onClick={() => setSel({ kind: 'w', w: seg })}>{R(seg.t)}</span>
                            )
                            return <span key={gi}>{R(seg.t)}</span>
                          })}
                          <span className="en" lang="en">{sen.en}</span>
                        </span>
                      ))}
                    </p>
                  ))}
                </article>
              )}

              {kind === 'grammar_drill' && (
                <article className="story">
                  {data.pattern && <p style={{ fontSize: '1.1rem' }}>{data.pattern}</p>}
                  <p style={{ fontSize: '1.05rem' }}>{R(data.note)}</p>
                  {(data.ex || []).map((e, i) => (
                    <p key={i} style={{ fontSize: '1.05rem' }}>
                      {R(e[0])}<span className="en" lang="en" style={{ display: 'block' }}>{e[1]}</span>
                    </p>
                  ))}
                </article>
              )}

              {story && (story.quiz || []).length > 0 && (
                <section className="quiz">
                  <h2>読んだあとに</h2>
                  <p className="sub">JLPT読解と同じ4択。{story.quiz.length}問。</p>
                  {story.quiz.map((q, i) => (
                    <div className="q" key={i}>
                      <p>{i + 1}. {R(q.q)}</p>
                      <Options q={q} />
                      {showAns && q.why && <div className="why">{R(q.why)}</div>}
                    </div>
                  ))}
                </section>
              )}

              {qs.length > 0 && (
                <section className="quiz">
                  <h2>{kind === 'grammar_drill' ? '練習' : '力だめし'}</h2>
                  <p className="sub">
                    {kind === 'grammar_drill'
                      ? `四択・並べかえ・正誤で${qs.length}問。`
                      : `この話の漢字・語彙・文法から${qs.length}問。`}
                  </p>
                  {qs.map((q, i) => (
                    <div className="q stq" key={i}>
                      <p className="lab">
                        {i + 1} / {qs.length}　{LABEL[q.t] || QT[q.t] || ''}
                        {q.g && G[q.g]?.title ? `　${G[q.g].title}` : ''}
                        {q.w ? `　${q.w}${q.wen ? '（' + q.wen + '）' : ''}` : ''}
                      </p>
                      <p className="stem">{R(q.q)}</p>
                      {q.t === 'order' ? (
                        <>
                          <div className="tiles">
                            {(q.tiles || []).map((t, m) => <span className="tile" key={m}>{R(t)}</span>)}
                          </div>
                          {showAns && q.sent && <div className="why"><b>答え　</b>{R(q.sent)}</div>}
                        </>
                      ) : <Options q={q} />}
                      {showAns && q.why && <div className="why">{R(q.why)}</div>}
                    </div>
                  ))}
                </section>
              )}
            </div>

            <aside className="side open">
              <div className="card active" data-view="detail">
                <h3>詳しく</h3>
                <Detail />
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}
