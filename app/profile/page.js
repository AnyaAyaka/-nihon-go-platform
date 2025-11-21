'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (profileData) {
      setFullName(profileData.full_name || '')
      setRole(profileData.role || '')
    }

    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    // Roleは変更不可なので、full_nameのみ更新
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName
      })
      .eq('user_id', user.id)

    if (error) {
      alert('Error updating profile: ' + error.message)
      console.error(error)
    } else {
      alert('Profile updated successfully!')
      router.push('/dashboard')
    }

    setSaving(false)
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
          margin: '0 0 32px 0', 
          fontSize: '32px', 
          fontWeight: '700',
          color: '#1e293b'
        }}>
          Profile Settings
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '15px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              Email (cannot be changed):
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                background: '#f8fafc',
                color: '#64748b',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '15px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              Full Name:
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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

          <div style={{ marginBottom: '32px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '15px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              Role (cannot be changed):
            </label>
            <input
              type="text"
              value={role || 'Not set'}
              disabled
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                background: '#f8fafc',
                color: '#64748b',
                textTransform: 'capitalize',
                boxSizing: 'border-box'
              }}
            />
            <p style={{ 
              margin: '8px 0 0 0', 
              fontSize: '13px', 
              color: '#64748b' 
            }}>
              Please contact admin to change your role
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '12px',
              background: saving ? '#94a3b8' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: saving ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            {saving ? 'Updating...' : 'Update Profile'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            style={{
              width: '100%',
              padding: '14px',
              background: 'white',
              color: '#1e293b',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}
