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
    
    if (!user) {
      router.push('/auth')
      return
    }

    setUser(user)

    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // 講師の場合は /dashboard/teacher にリダイレクト
    if (profileData?.role === 'teacher') {
      router.push('/dashboard/teacher')
      return
    }

    setProfile(profileData)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Header */}
      <div style={{ 
        background: 'white', 
        padding: '24px 40px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            fontSize: '32px', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #fb7185 0%, #f472b6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome to Nihon GO! World
          </h1>
          <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '15px' }}>
            Hello, {profile?.full_name || user?.email} • {profile?.role || 'User'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => router.push('/profile')}
            style={{
              padding: '12px 24px',
              background: '#1e293b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '12px 24px',
              background: '#fb7185',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      {!profile || !profile.role ? (
        <div style={{
          maxWidth: '600px',
          margin: '80px auto',
          padding: '60px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>👋</div>
          <h2 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '28px', 
            fontWeight: '700',
            color: '#1e293b'
          }}>
            Complete Your Profile
          </h2>
          <p style={{ 
            margin: '0 0 32px 0', 
            color: '#64748b', 
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            Please set your role in your profile to access the dashboard features.
          </p>
          <button
            onClick={() => router.push('/profile')}
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #fb7185 0%, #f472b6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(251, 113, 133, 0.3)'
            }}
          >
            Set Up Profile
          </button>
        </div>
      ) : profile.role === 'student' ? (
        <StudentDashboard user={user} profile={profile} />
      ) : (
        <div style={{
          maxWidth: '600px',
          margin: '80px auto',
          padding: '60px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>❓</div>
          <h2 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '28px', 
            fontWeight: '700',
            color: '#1e293b'
          }}>
            Unknown Role
          </h2>
          <p style={{ 
            margin: '0 0 32px 0', 
            color: '#64748b', 
            fontSize: '16px'
          }}>
            Your profile role is not recognized. Role: "{profile?.role}"
          </p>
          <button
            onClick={() => router.push('/profile')}
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #fb7185 0%, #f472b6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Update Profile
          </button>
        </div>
      )}
    </div>
  )
}
