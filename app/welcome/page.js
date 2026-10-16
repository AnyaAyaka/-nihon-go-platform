'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

const LESSON_OPTIONS = [
  { value: 'online',        label: 'Online lessons',        hint: 'Learn from anywhere over Zoom' },
  { value: 'in_person',     label: 'In-person lessons',     hint: 'Face-to-face at our school' },
  { value: 'either',        label: 'Either is fine',        hint: 'Show me everything' }
]

const LOCATION_OPTIONS = [
  { value: 'London',     label: 'London' },
  { value: 'Manchester', label: 'Manchester' },
  { value: 'Other',      label: 'Elsewhere / Online only' }
]

const GOAL_OPTIONS = [
  { value: 'conversation', label: 'Daily conversation' },
  { value: 'jlpt',         label: 'JLPT / exam prep' },
  { value: 'travel',       label: 'Travel to Japan' },
  { value: 'work',         label: 'Work / business' },
  { value: 'hobby',        label: 'Anime, manga, culture' },
  { value: 'other',        label: 'Something else' }
]

export default function WelcomePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [nextPath, setNextPath] = useState('/dashboard')

  const [fullName, setFullName] = useState('')
  const [lessonType, setLessonType] = useState('')
  const [location, setLocation] = useState('')
  const [goal, setGoal] = useState('')

  useEffect(() => {
    checkUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkUser = async () => {
    // 完了後に戻る先（同じサイト内のパスだけ受け付ける）
    const nextParam = new URLSearchParams(window.location.search).get('next') || ''
    const dest = nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/dashboard'
    setNextPath(dest)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth')
      return
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('full_name, role, onboarded_at')
      .eq('user_id', user.id)
      .single()

    // 講師はオンボーディング不要
    if (profileData?.role === 'teacher') {
      router.push('/dashboard/teacher')
      return
    }

    // すでに入力済みなら素通り
    if (profileData?.onboarded_at) {
      router.push(dest)
      return
    }

    if (profileData?.full_name) setFullName(profileData.full_name)
    setUser(user)
    setLoading(false)
  }

  // 流入元（/auth で localStorage に保存したもの）を拾う
  const readSignupSource = () => {
    try {
      const raw = window.localStorage.getItem('ng_signup_source')
      if (!raw) return {}
      const parsed = JSON.parse(raw)
      return {
        referrer: parsed.referrer || null,
        utm_source: parsed.utm_source || null,
        utm_medium: parsed.utm_medium || null,
        utm_campaign: parsed.utm_campaign || null
      }
    } catch (e) {
      return {}
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!fullName.trim()) {
      setError('Please tell us your name.')
      return
    }
    if (!lessonType) {
      setError('Please choose how you would like to study.')
      return
    }

    setSaving(true)

    const payload = {
      full_name: fullName.trim(),
      preferred_lesson_type: lessonType,
      onboarded_at: new Date().toISOString(),
      ...readSignupSource()
    }
    if (location) payload.location = location
    if (goal) payload.learning_goal = goal

    const { error: updateError } = await supabase
      .from('profiles')
      .update(payload)
      .eq('user_id', user.id)

    if (updateError) {
      console.error(updateError)
      setError('Sorry, something went wrong. Please try again.')
      setSaving(false)
      return
    }

    // 管理者への新規登録通知（名前が入った状態で送る）
    try {
      await fetch('/api/notify-new-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          full_name: fullName.trim(),
          role: 'student'
        })
      })
    } catch (err) {
      console.error('Failed to notify:', err)
    }

    try { window.localStorage.removeItem('ng_signup_source') } catch (err) {}

    router.push(nextPath)
  }

  const handleSkip = async () => {
    setSaving(true)

    await supabase
      .from('profiles')
      .update({ onboarded_at: new Date().toISOString(), ...readSignupSource() })
      .eq('user_id', user.id)

    try {
      await fetch('/api/notify-new-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, full_name: '', role: 'student' })
      })
    } catch (err) {
      console.error('Failed to notify:', err)
    }

    try { window.localStorage.removeItem('ng_signup_source') } catch (err) {}

    router.push(nextPath)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <div style={{ fontSize: '18px', color: '#1e293b', fontWeight: '600' }}>Loading...</div>
      </div>
    )
  }

  const cardStyle = (selected) => ({
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '14px 16px',
    marginBottom: '10px',
    background: selected ? '#fff1f2' : 'white',
    border: selected ? '2px solid #fb7185' : '2px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    boxSizing: 'border-box'
  })

  const chipStyle = (selected) => ({
    padding: '10px 16px',
    background: selected ? '#1e293b' : 'white',
    color: selected ? 'white' : '#1e293b',
    border: selected ? '2px solid #1e293b' : '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          margin: '0 0 8px 0',
          fontSize: '32px',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #fb7185 0%, #f472b6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Welcome to Nihon GO!
        </h1>
        <p style={{ margin: '0 0 32px 0', fontSize: '15px', color: '#64748b' }}>
          Just two quick questions so we can set up your lessons.
        </p>

        {error && (
          <div style={{
            padding: '12px 16px',
            marginBottom: '20px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#dc2626',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '15px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              What should we call you?
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Emma Watson"
              autoFocus
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '15px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              How would you like to study?
            </label>
            {LESSON_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setLessonType(opt.value)}
                style={cardStyle(lessonType === opt.value)}
              >
                <span style={{ display: 'block', fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
                  {opt.label}
                </span>
                <span style={{ display: 'block', fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                  {opt.hint}
                </span>
              </button>
            ))}
          </div>

          {(lessonType === 'in_person' || lessonType === 'either') && (
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '15px',
                fontWeight: '600',
                color: '#1e293b'
              }}>
                Where are you based?
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {LOCATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setLocation(opt.value)}
                    style={chipStyle(location === opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '15px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              What brings you to Japanese? <span style={{ fontWeight: '400', color: '#94a3b8' }}>(optional)</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {GOAL_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setGoal(goal === opt.value ? '' : opt.value)}
                  style={chipStyle(goal === opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '12px',
              background: saving ? '#94a3b8' : 'linear-gradient(135deg, #fb7185 0%, #f472b6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: saving ? 'none' : '0 4px 12px rgba(251, 113, 133, 0.3)'
            }}
          >
            {saving ? 'Saving...' : 'Start learning'}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            disabled={saving}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              color: '#64748b',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer'
            }}
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  )
}
