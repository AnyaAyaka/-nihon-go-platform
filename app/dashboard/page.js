'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import StudentDashboard from '../components/StudentDashboard'
import TeacherDashboard from '../components/TeacherDashboard'
import AdminDashboard from '../components/AdminDashboard'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }

      setUser(user)

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      setProfile(profileData)
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  const getRoleDisplayName = (role) => {
    switch(role) {
      case 'student': return 'Student'
      case 'teacher': return 'Teacher'
      case 'admin': return 'Admin'
      default: return 'User'
    }
  }

  const renderDashboard = () => {
    switch(profile?.role) {
      case 'student':
        return <StudentDashboard user={user} profile={profile} />
      case 'teacher':
        return <TeacherDashboard user={user} profile={profile} />
      case 'admin':
        return <AdminDashboard user={user} profile={profile} />
      default:
        return (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: '20px',
            color: 'white',
            margin: '0 0 8px 0'
          }}>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Complete Your Profile</h3>
            <p style={{ fontSize: '16px', opacity: '0.9', marginBottom: '24px' }}>
              Please set your role in your profile to access the dashboard features.
            </p>
            <button
              onClick={() => router.push('/profile')}
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '25px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Set Up Profile
            </button>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{
          padding: '40px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '24px 32px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '32px',
              fontWeight: '700',
              background: 'linear-gradient(90deg, #1e293b 0%, #fb7185 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 8px 0'
            }}>
              Welcome to Nihon GO! World
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0'
            }}>
              Hello, {profile?.full_name || user?.email} • {getRoleDisplayName(profile?.role)}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
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
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(251,113,133,0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f43f5e'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#fb7185'}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {renderDashboard()}
    </div>
  )
}
