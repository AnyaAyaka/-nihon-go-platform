'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import '../../ng-ui.css'


const KIND_JA = {
  story: '読む',
  story_test: '力だめし 8問',
  grammar_drill: '文法の練習 5問',
  mock: '模試'
}

export default function ClassDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [klass, setKlass] = useState(null)
  const [students, setStudents] = useState([])
  const [assignments, setAssignments] = useState([])
  const [catalog, setCatalog] = useState([])
  const [mocks, setMocks] = useState([])
  const [mockPick, setMockPick] = useState({ ref_id: '', due_on: '' })
  const [progress, setProgress] = useState([])
  const [emails, setEmails] = useState('')
  const [one, setOne] = useState({ name: '', email: '' })
  const [bulkOpen, setBulkOpen] = useState(false)
  const [editing, setEditing] = useState(null)   // 名前を直している行
  const [pick, setPick] = useState({ ref_id: '', kind: 'story', due_on: '' })
  const [error, setError] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => { load() }, [id])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }

    const { data: c } = await supabase.from('classes').select('*').eq('id', id).single()
    setKlass(c)

    const { data: st } = await supabase.from('class_students').select('*').eq('class_id', id).order('invited_at')
    setStudents(st || [])

    const { data: asg } = await supabase.from('assignments').select('*').eq('class_id', id).order('created_at', { ascending: false })
    setAssignments(asg || [])

    const ids = (st || []).map(s => s.user_id).filter(Boolean)
    if (ids.length) {
      const { data: pr } = await supabase.from('progress').select('*').in('user_id', ids)
      setProgress(pr || [])
    }

    const [cat, mk] = await Promise.all([
      fetch('/data/stories-catalog.json').then(r => r.json()).catch(() => []),
      fetch('/data/mocks.json').then(r => r.json()).catch(() => [])
    ])
    setCatalog(cat.filter(s => !c?.level || s.lv === c.level))
    setMocks(mk.filter(m => !c?.level || m.lv === c.level))
    setLoading(false)
  }

  // 生徒へメールを出す。失敗しても作業自体は止めない。
  async function notify(payload) {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return null
      const r = await fetch('/api/notify/class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ classId: id, ...payload })
      })
      return r.ok ? await r.json() : null
    } catch (e) { return null }
  }

  async function addOne(e) {
    e.preventDefault()
    setError(''); setNote('')
    const email = one.email.trim().toLowerCase()
    if (!email.includes('@')) { setError('メールアドレスを入れてください。'); return }
    const { error: e1 } = await supabase.from('class_students')
      .upsert([{ class_id: id, email, name: one.name.trim() || null, status: 'invited' }], { onConflict: 'class_id,email' })
    if (e1) { setError(e1.message); return }
    const res = await notify({ what: 'invite', emails: [email] })
    setNote(res?.sent ? `${email} に案内のメールを送りました。` : `${email} を登録しました。`)
    setOne({ name: '', email: '' })
    load()
  }

  async function addStudents(e) {
    if (e && e.preventDefault) e.preventDefault()
    setError('')
    // 1行に1人。「田中太郎 tanaka@example.com」でも「tanaka@example.com」でも可。
    // 1行にアドレスが複数あるときは、名前なしでまとめて追加する。
    const rows = []
    for (const line of emails.split(/\r?\n/)) {
      const found = line.match(/[^\s,;<>]+@[^\s,;<>]+/g) || []
      if (!found.length) continue
      if (found.length === 1) {
        let rest = line.replace(found[0], '').replace(/[,;<>]/g, ' ').trim()
        rows.push({ class_id: id, email: found[0].toLowerCase(), name: rest || null, status: 'invited' })
      } else {
        for (const f of found) rows.push({ class_id: id, email: f.toLowerCase(), name: null, status: 'invited' })
      }
    }
    if (!rows.length) return
    const { error: e1 } = await supabase.from('class_students').upsert(rows, { onConflict: 'class_id,email' })
    if (e1) { setError(e1.message); return }
    const res = await notify({ what: 'invite', emails: rows.map(r => r.email) })
    setNote(res?.sent ? `${res.sent}人に案内のメールを送りました。` : `${rows.length}人を登録しました。`)
    setEmails('')
    setBulkOpen(false)
    load()
  }

  async function addAssignment(e) {
    e.preventDefault()
    setError('')
    if (!pick.ref_id) return
    const story = catalog.find(s => s.id === pick.ref_id)
    const { data: ins, error: e1 } = await supabase.from('assignments').insert({
      class_id: id,
      kind: pick.kind,
      ref_id: pick.ref_id,
      title: story ? `${story.title}（${story.en}）` : pick.ref_id,
      due_on: pick.due_on || null
    }).select().single()
    if (e1) { setError(e1.message); return }
    const res = await notify({ what: 'assignment', assignmentId: ins?.id })
    setNote(res?.sent ? `課題を出して、${res.sent}人に知らせました。` : '課題を出しました。')
    setPick(p => ({ ...p, ref_id: '' }))
    load()
  }

  async function renameStudent(sid, name) {
    const v = (name || '').trim() || null
    await supabase.from('class_students').update({ name: v }).eq('id', sid)
    setStudents(list => list.map(x => (x.id === sid ? { ...x, name: v } : x)))
    setEditing(null)
  }

  async function removeStudent(sid) {
    const s = students.find(x => x.id === sid)
    const who = (s && (s.name || s.email)) || 'この生徒'
    if (!window.confirm(`${who} をこのクラスから外しますか。\n成績は残ります。同じアドレスで登録し直せば戻せます。`)) return
    await supabase.from('class_students').update({ status: 'removed' }).eq('id', sid)
    load()
  }

  async function removeAssignment(aid) {
    const a = assignments.find(x => x.id === aid)
    if (!window.confirm(`「${(a && a.title) || 'この課題'}」を取り消しますか。\nすでに解いた人の成績は残ります。`)) return
    await supabase.from('assignments').delete().eq('id', aid)
    load()
  }

  function done(userId, kind, refId) {
    return progress.find(p => p.user_id === userId && p.kind === kind && p.ref_id === refId)
  }

  // 落としたところを、文法と語彙でまとめる
  function misses() {
    const mail = {}
    students.forEach(s => { if (s.user_id) mail[s.user_id] = s.name || s.email })
    const g = {}, w = {}
    for (const p of progress) {
      for (const it of (p.detail?.wrong || [])) {
        if (it.g) {
          const e = g[it.g] = g[it.g] || { id: it.g, label: it.gt || it.g, n: 0, who: new Set() }
          e.n += 1; if (mail[p.user_id]) e.who.add(mail[p.user_id])
        }
        if (it.w) {
          const e = w[it.w] = w[it.w] || { id: it.w, label: it.w, en: it.wen || '', n: 0, who: new Set() }
          e.n += 1; if (mail[p.user_id]) e.who.add(mail[p.user_id])
        }
      }
    }
    const sort = o => Object.values(o).sort((a, b) => b.who.size - a.who.size || b.n - a.n).slice(0, 8)
    return { grammar: sort(g), vocab: sort(w) }
  }

  async function addMock(e) {
    e.preventDefault()
    setError('')
    if (!mockPick.ref_id) return
    const m = mocks.find(x => x.id === mockPick.ref_id)
    const { data: ins, error: e1 } = await supabase.from('assignments').insert({
      class_id: id, kind: 'mock', ref_id: mockPick.ref_id,
      title: m ? m.title : mockPick.ref_id, due_on: mockPick.due_on || null
    }).select().single()
    if (e1) { setError(e1.message); return }
    const res = await notify({ what: 'assignment', assignmentId: ins?.id })
    setNote(res?.sent ? `模試を出して、${res.sent}人に知らせました。` : '模試を出しました。')
    setMockPick({ ref_id: '', due_on: '' })
    load()
  }

  async function assignDrill(gid, label) {
    setError('')
    const { data: ins, error: e1 } = await supabase.from('assignments').insert({
      class_id: id, kind: 'grammar_drill', ref_id: gid, title: label, due_on: null
    }).select().single()
    if (e1) { setError(e1.message); return }
    const res = await notify({ what: 'assignment', assignmentId: ins?.id })
    setNote(res?.sent ? `「${label}」の練習を出して、${res.sent}人に知らせました。` : '練習を出しました。')
    load()
  }

  const active = students.filter(s => s.status !== 'removed')

  if (loading) return <div className="ng"><div className="ng-wrap ng-app">読み込み中…</div></div>

  return (
    <div className="ng">
      <div className="ng-wrap ng-app">
        <div className="ng-bar">
          <h1 className="ng-title">
            {klass?.name}<span>{(klass?.level || '').toUpperCase()}</span>
          </h1>
          <a className="ng-btn ghost" href="/classes">クラス一覧</a>
        </div>

        {error && <div className="ng-msg ng-err">{error}</div>}
        {note && <div className="ng-msg">{note}</div>}

        <form className="ng-panel" onSubmit={addOne}>
          <h2>生徒</h2>
          <p className="hint">
            名前とメールアドレスを入れて追加します。生徒はそのアドレスでサインインするとクラスに入ります。
          </p>
          <div className="ng-field">
            <input className="ng-input" style={{ minWidth: 180 }} value={one.name}
              onChange={e => setOne(o => ({ ...o, name: e.target.value }))} placeholder="名前（例：田中太郎）" />
            <input className="ng-input" style={{ minWidth: 260 }} type="email" value={one.email}
              onChange={e => setOne(o => ({ ...o, email: e.target.value }))} placeholder="メールアドレス" required />
            <button className="ng-btn" type="submit">追加</button>
          </div>

          <button type="button" className="ng-mini" style={{ marginTop: 10 }}
            onClick={() => setBulkOpen(v => !v)}>
            {bulkOpen ? '− まとめて追加をとじる' : '＋ まとめて追加する'}
          </button>

          {bulkOpen && (
            <div style={{ marginTop: 10 }}>
              <p className="hint" style={{ margin: '0 0 8px' }}>
                1行に1人。「田中太郎 tanaka@example.com」のように名前を前に書けます。アドレスだけでもかまいません。
              </p>
              <div className="ng-field">
                <textarea className="ng-textarea" value={emails}
                  onChange={e => setEmails(e.target.value)}
                  placeholder={"田中太郎 tanaka@example.com\nanna@example.com"} />
                <button className="ng-btn ghost" type="button" onClick={addStudents}>まとめて追加</button>
              </div>
            </div>
          )}

          {active.length === 0 ? (
            <p className="hint" style={{ margin: '16px 0 0' }}>まだ誰も入っていません。</p>
          ) : (
            <div style={{ marginTop: 18 }}>
              <p className="ng-tag" style={{ marginBottom: 6 }}>{active.length}人</p>
              {students.filter(s => s.status === 'removed').length > 0 && (
                <p className="ng-tag" style={{ margin: '0 0 8px' }}>
                  外した人：{students.filter(s => s.status === 'removed').map(s => s.name || s.email).join('、')}
                  （同じアドレスで登録し直すと戻ります）
                </p>
              )}
              {active.map(s => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
                  padding: '8px 0', borderTop: '1px solid var(--line)' }}>
                  {editing === s.id ? (
                    <input className="ng-input" autoFocus
                      style={{ minWidth: 150, maxWidth: 180, padding: '6px 10px' }}
                      defaultValue={s.name || ''} placeholder="名前"
                      onBlur={e => renameStudent(s.id, e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); renameStudent(s.id, e.target.value) } }} />
                  ) : (
                    <span style={{ minWidth: 150, fontFamily: 'var(--read)', fontSize: '1.05rem' }}>
                      {s.name || <span className="ng-tag">名前なし</span>}
                    </span>
                  )}
                  <span style={{ minWidth: 220 }}>{s.email}</span>
                  <span className="ng-tag">
                    {s.status === 'invited' ? '招待済み・サインイン待ち' : '参加済み'}
                  </span>
                  {editing !== s.id && (
                    <button type="button" className="ng-mini" onClick={() => setEditing(s.id)}>名前を直す</button>
                  )}
                  <button type="button" className="ng-mini" onClick={() => removeStudent(s.id)}>解除</button>
                </div>
              ))}
            </div>
          )}
        </form>

        <form className="ng-panel" onSubmit={addAssignment}>
          <h2>課題を出す</h2>
          <p className="hint">物語を選んで、読ませるか、力だめし8問を解かせるかを決めます。締切も付けられます。</p>
          <div className="ng-field">
            <select className="ng-select" style={{ minWidth: 320 }} value={pick.ref_id}
              onChange={e => setPick(p => ({ ...p, ref_id: e.target.value }))}>
              <option value="">物語を選ぶ…</option>
              {catalog.map(s => (
                <option key={s.id} value={s.id}>
                  {s.lv.toUpperCase()} {String(s.no).padStart(2, '0')} · {s.title} — {s.en}
                </option>
              ))}
            </select>
            <select className="ng-select" value={pick.kind} onChange={e => setPick(p => ({ ...p, kind: e.target.value }))}>
              <option value="story">物語を読む</option>
              <option value="story_test">力だめし 8問</option>
            </select>
            <input className="ng-input" type="date" value={pick.due_on}
              onChange={e => setPick(p => ({ ...p, due_on: e.target.value }))} />
            <button className="ng-btn" type="submit">出す</button>
          </div>
          {pick.ref_id && (
            <p className="hint" style={{ margin: '12px 0 0' }}>
              出す前に中身を見る：
              <a href={`/teach/story_test/${encodeURIComponent(pick.ref_id)}`} target="_blank" rel="noopener">力だめし8問（答えつき）</a>
            </p>
          )}
        </form>

        <form className="ng-panel" onSubmit={addMock}>
          <h2>模試を出す</h2>
          <p className="hint">本番と同じ形式。点数は解き終わった時点で自動で記録されます。</p>
          <div className="ng-field">
            <select className="ng-select" style={{ minWidth: 320 }} value={mockPick.ref_id}
              onChange={e => setMockPick(p => ({ ...p, ref_id: e.target.value }))}>
              <option value="">模試を選ぶ…</option>
              {mocks.map(m => (
                <option key={m.id} value={m.id}>{m.title}（{m.questions}問）</option>
              ))}
            </select>
            <input className="ng-input" type="date" value={mockPick.due_on}
              onChange={e => setMockPick(p => ({ ...p, due_on: e.target.value }))} />
            <button className="ng-btn" type="submit">出す</button>
          </div>
        </form>

        <div className="ng-panel">
          <h2>出した課題</h2>
          {assignments.length === 0 ? (
            <p className="hint" style={{ margin: 0 }}>まだ何も出していません。上の2つから出せます。</p>
          ) : (
            <>
              <p className="hint" style={{ margin: '0 0 10px' }}>新しいものが上。提出の数は、解き終わった人数です。</p>
              {assignments.map(a => {
                const n = progress.filter(p => p.kind === a.kind && p.ref_id === a.ref_id).length
                return (
                  <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
                    padding: '10px 0', borderTop: '1px solid var(--line)' }}>
                    <span className="ng-tag" style={{ minWidth: 110 }}>{KIND_JA[a.kind] || a.kind}</span>
                    <strong style={{ fontFamily: 'var(--read)', fontSize: '1.05rem', flex: 1, minWidth: 220 }}>
                      {(a.kind === 'story_test' || a.kind === 'grammar_drill')
                        ? <a href={`/teach/${a.kind}/${encodeURIComponent(a.ref_id)}`}>{a.title || a.ref_id}</a>
                        : (a.title || a.ref_id)}
                    </strong>
                    <span className="ng-tag" style={{ minWidth: 110 }}>
                      {a.due_on ? `締切 ${a.due_on}` : '締切なし'}
                    </span>
                    <span className={n ? 'ng-ok' : 'ng-tag'} style={{ minWidth: 80 }}>
                      {n} / {active.length} 提出
                    </span>
                    <button className="ng-mini" onClick={() => removeAssignment(a.id)}>取り消す</button>
                  </div>
                )
              })}
            </>
          )}
        </div>

        {(() => {
          const m = misses()
          if (!m.grammar.length && !m.vocab.length) return null
          return (
            <div className="ng-panel">
              <h2>落としているところ</h2>
              <p className="hint">力だめしの誤答を、文法と語彙でまとめたものです。人数の多い順。</p>
              {m.grammar.length > 0 && (
                <>
                  <p className="ng-tag" style={{ marginBottom: 6 }}>文法</p>
                  {m.grammar.map(x => (
                    <div key={x.id} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
                      padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                      <strong style={{ fontFamily: 'var(--read)', minWidth: 180 }}>{x.label}</strong>
                      <span className="ng-miss">{x.who.size}人</span>
                      <span className="ng-tag" style={{ flex: 1, minWidth: 160 }}>{[...x.who].join('、')}</span>
                      <a className="ng-mini" href={`/teach/grammar_drill/${encodeURIComponent(x.id)}`}
                        target="_blank" rel="noopener">問題を見る</a>
                      <button className="ng-btn ghost" style={{ padding: '6px 12px', fontSize: '.85rem' }}
                        onClick={() => assignDrill(x.id, x.label)}>この文法の練習を出す</button>
                    </div>
                  ))}
                </>
              )}
              {m.vocab.length > 0 && (
                <>
                  <p className="ng-tag" style={{ margin: '18px 0 6px' }}>語彙・漢字</p>
                  {m.vocab.map(x => (
                    <div key={x.id} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
                      padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                      <strong style={{ fontFamily: 'var(--read)', minWidth: 120 }}>{x.label}</strong>
                      <span className="ng-tag" style={{ minWidth: 140 }}>{x.en}</span>
                      <span className="ng-miss">{x.who.size}人</span>
                      <span className="ng-tag" style={{ flex: 1, minWidth: 160 }}>{[...x.who].join('、')}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )
        })()}

        <div className="ng-panel ng-scroll">
          <h2>進み具合</h2>
          {active.length === 0 || assignments.length === 0 ? (
            <p className="hint">生徒を登録して課題を出すと、解き終わった順にここに点数が入ります。</p>
          ) : (
            <table className="ng-table">
              <thead>
                <tr>
                  <th>生徒</th>
                  {assignments.map(a => (
                    <th key={a.id} title={a.title}>
                      {a.ref_id}<br />
                      <span style={{ fontWeight: 400 }}>
                        {a.kind === 'story' ? '読む' : a.kind === 'grammar_drill' ? '文法練習' : a.kind === 'mock' ? '模試' : '力だめし'}
                      </span>
                      {a.due_on && <><br /><span style={{ fontWeight: 400 }}>{a.due_on}まで</span></>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {active.map(s => (
                  <tr key={s.id}>
                    <td>
                      {s.name || s.email}
                      {s.name && <span className="ng-tag"><br />{s.email}</span>}
                      {s.status === 'invited' && <span className="ng-tag">　サインイン待ち</span>}
                    </td>
                    {assignments.map(a => {
                      const p = s.user_id && done(s.user_id, a.kind, a.ref_id)
                      return (
                        <td key={a.id} className={p ? 'ng-ok' : ''}>
                          {p ? (p.max_score ? `${p.score} / ${p.max_score}` : '済み') : '—'}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
