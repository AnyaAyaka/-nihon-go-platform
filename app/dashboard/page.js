'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import StudentDashboard from '../components/StudentDashboard'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }
    setUser(user)
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    if (profileData?.role === 'teacher') { router.push('/dashboard/teacher'); return }
    setProfile(profileData)
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <div style={{ fontSize: '18px', color: '#1e293b', fontWeight: '600' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div style={{ background: 'white', padding: '24px 40px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '700', background: 'linear-gradient(135deg, #fb7185 0%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Welcome to Nihon GO! World
          </h1>
          <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '15px' }}>
            Hello, {profile?.full_name || user?.email} • {profile?.role || 'User'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => router.push('/profile')}
            style={{ padding: '12px 24px', background: '#1e293b', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            Edit Profile
          </button>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
            style={{ padding: '12px 24px', background: '#fb7185', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
      <StudentDashboard user={user} profile={profile} />
    </div>
  )
}
