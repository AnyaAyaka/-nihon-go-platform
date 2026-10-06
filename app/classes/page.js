'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import '../ng-ui.css'

export default function ClassesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [orgs, setOrgs] = useState([])
  const [classes, setClasses] = useState([])
  const [newOrg, setNewOrg] = useState('')
  const [newClass, setNewClass] = useState({ name: '', level: 'n3', org_id: '' })
  const [error, setError] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }
    const { data: memberships } = await supabase
      .from('org_members')
      .select('role, organizations(id, name, kind, status, seats, trial_ends_at)')
    const list = (memberships || []).map(m => ({ ...m.organizations, role: m.role })).filter(o => o && o.id)
    setOrgs(list)
    if (list.length) {
      setNewClass(c => ({ ...c, org_id: c.org_id || list[0].id }))
      const { data: cls } = await supabase
        .from('classes')
        .select('id, name, level, org_id, created_at, class_students(count)')
        .eq('archived', false)
        .order('created_at', { ascending: false })
      setClasses(cls || [])
    }
    setLoading(false)
  }

  async function createOrg(e) {
    e.preventDefault(); setError('')
    const { data: { user } } = await supabase.auth.getUser()
    const { data: org, error: e1 } = await supabase
      .from('organizations').insert({ name: newOrg, billing_email: user.email }).select().single()
    if (e1) { setError(e1.message); return }
    const { error: e2 } = await supabase.from('org_members').insert({ org_id: org.id, user_id: user.id, role: 'owner' })
    if (e2) { setError(e2.message); return }
    setNewOrg(''); load()
  }

  async function createClass(e) {
    e.preventDefault(); setError('')
    const { data: { user } } = await supabase.auth.getUser()
    const { error: e1 } = await supabase.from('classes')
      .insert({ org_id: newClass.org_id, name: newClass.name, level: newClass.level, teacher_id: user.id })
    if (e1) { setError(e1.message); return }
    setNewClass(c => ({ ...c, name: '' })); load()
  }

  if (loading) return <div className="ng"><div className="ng-wrap ng-app">Loading…</div></div>

  return (
    <div className="ng">
      <div className="ng-wrap ng-app">
        <div className="ng-bar">
          <h1 className="ng-title">Classes</h1>
          <div className="ng-cta">
            <a className="ng-btn ghost" href="/for-schools">Licence &amp; price</a>
            <a className="ng-btn ghost" href="/dashboard">Dashboard</a>
          </div>
        </div>

        {error && <div className="ng-msg ng-err">{error}</div>}

        {orgs.length === 0 && (
          <form className="ng-panel" onSubmit={createOrg}>
            <h2>Set up your school</h2>
            <p className="hint">Fourteen days free, up to 30 learners, no card. Use the name your learners would recognise.</p>
            <div className="ng-field">
              <input className="ng-input" value={newOrg} onChange={e => setNewOrg(e.target.value)}
                placeholder="School or company name" required />
              <button className="ng-btn" type="submit">Create</button>
            </div>
          </form>
        )}

        {orgs.map(o => (
          <div className="ng-panel" key={o.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
              <h2 style={{ margin: 0 }}>{o.name}</h2>
              <span className="ng-tag">
                {o.status === 'trial'
                  ? `Trial until ${new Date(o.trial_ends_at).toLocaleDateString('en-GB')}`
                  : o.status === 'active' ? 'Licence active' : o.status}
                {` · ${o.seats} seats`}
              </span>
            </div>
            {o.status === 'trial' && (
              <p className="hint" style={{ margin: '10px 0 0' }}>
                <a href="/for-schools">Choose a licence</a> before the trial ends and nothing stops working.
              </p>
            )}
          </div>
        ))}

        {orgs.length > 0 && (
          <form className="ng-panel" onSubmit={createClass}>
            <h2>New class</h2>
            <p className="hint">One class per group you teach. You can set different work for each.</p>
            <div className="ng-field">
              <input className="ng-input" value={newClass.name} placeholder="N3 Tuesday evening" required
                onChange={e => setNewClass(c => ({ ...c, name: e.target.value }))} />
              <select className="ng-select" value={newClass.level}
                onChange={e => setNewClass(c => ({ ...c, level: e.target.value }))}>
                {['n5', 'n4', 'n3', 'n2', 'n1'].map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
              </select>
              {orgs.length > 1 && (
                <select className="ng-select" value={newClass.org_id}
                  onChange={e => setNewClass(c => ({ ...c, org_id: e.target.value }))}>
                  {orgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
              )}
              <button className="ng-btn" type="submit">Create class</button>
            </div>
          </form>
        )}

        {classes.map(c => (
          <button className="ng-row" key={c.id} onClick={() => router.push(`/classes/${c.id}`)}>
            <span>
              <strong>{c.name}</strong>
              <span className="meta">{'  '}{(c.level || '').toUpperCase()}</span>
            </span>
            <span className="meta">{c.class_students?.[0]?.count ?? 0} learners</span>
          </button>
        ))}

        {orgs.length > 0 && classes.length === 0 && (
          <p className="ng-empty">No classes yet. Make the first one above, then add your learners.</p>
        )}
      </div>
    </div>
  )
}
