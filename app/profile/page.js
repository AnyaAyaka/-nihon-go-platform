'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }

      setUser(user)

      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code === 'PGRST116') {
        // プロフィールが存在しない場合、新規作成
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([
            { user_id: user.id, email: user.email, role: 'student' }
          ])
          .select()
          .single()

        if (insertError) {
          console.log('Insert error:', insertError)
        } else {
          setProfile(newProfile)
        }
      } else if (error) {
        console.log('Profile error:', error)
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    setSaving(true)
    try {
      const updateData = { full_name: profile.full_name }
      
      // 管理者のみ役割を変更可能
      if (profile && profile.role === 'admin') {
        updateData.role = profile.role
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', user.id)

      if (error) {
        alert('Error updating profile!')
      } else {
        alert('Profile updated successfully!')
      }
    } catch (error) {
      alert('Error updating profile!')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Profile Settings</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Email (cannot be changed):</label>
        <input 
          type="email" 
          value={user?.email || ''} 
          disabled 
          style={{ width: '100%', padding: '10px', margin: '10px 0', backgroundColor: '#f5f5f5' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Full Name:</label>
        <input 
          type="text" 
          value={profile?.full_name || ''} 
          onChange={(e) => setProfile({...profile, full_name: e.target.value})}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Role:</label>
        {profile && profile.role === 'admin' ? (
          <select 
            value={profile?.role || 'student'} 
            onChange={(e) => setProfile({...profile, role: e.target.value})}
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        ) : (
          <input 
            type="text" 
            value={
              profile?.role === 'student' ? 'Student' : 
              profile?.role === 'teacher' ? 'Teacher' : 
              profile?.role === 'admin' ? 'Admin' : 
              profile?.role || 'Not set'
            } 
            disabled 
            style={{ width: '100%', padding: '10px', margin: '10px 0', backgroundColor: '#f5f5f5' }}
          />
        )}
        {profile && profile.role !== 'admin' && (
          <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
            Please contact admin to change your role
          </p>
        )}
      </div>

      <button 
        onClick={updateProfile}
        disabled={saving}
        style={{ 
          padding: '12px 24px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: saving ? 'not-allowed' : 'pointer'
        }}
      >
        {saving ? 'Saving...' : 'Update Profile'}
      </button>

      <br /><br />
      <button 
        onClick={() => router.push('/dashboard')}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#gray', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px' 
        }}
      >
        Back to Dashboard
      </button>
    </div>
  )
}
