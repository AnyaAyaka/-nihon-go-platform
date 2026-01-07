'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'

const DAYS = [
  { name: 'Monday', value: 1 },
  { name: 'Tuesday', value: 2 },
  { name: 'Wednesday', value: 3 },
  { name: 'Thursday', value: 4 },
  { name: 'Friday', value: 5 },
  { name: 'Saturday', value: 6 },
  { name: 'Sunday', value: 0 }
]

export default function TeacherDashboardPage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [teacher, setTeacher] = useState(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [savingHours, setSavingHours] = useState(false)
  const [upcomingLessons, setUpcomingLessons] = useState([])
  const [workingHours, setWorkingHours] = useState(
    DAYS.map(day => ({
      day: day.value,
      name: day.name,
      enabled: false,
      startTime: '09:00',
      endTime: '17:00'
    }))
  )
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

    // プロフィール取得
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setProfile(profileData)

    // 講師情報取得
    const { data: teacherData } = await supabase
      .from('teachers')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!teacherData) {
      alert('Teacher profile not found')
      router.push('/')
      return
    }

    setTeacher(teacherData)
    
    // Working Hours取得
    await fetchWorkingHours(teacherData.id)
    
    // Upcoming Lessons取得
    await fetchUpcomingLessons(teacherData.id)
    
    // 自動Sync（カレンダー連携済みの場合）
    if (teacherData.google_refresh_token) {
      syncCalendarBackground(user.id)
    }
    
    setLoading(false)
  }

  const fetchWorkingHours = async (teacherId) => {
    try {
      const { data, error } = await supabase
        .from('teacher_working_hours')
        .select('*')
        .eq('teacher_id', teacherId)

      if (data && data.length > 0) {
        const updatedHours = workingHours.map(day => {
          const savedHour = data.find(h => h.day_of_week === day.day)
          if (savedHour) {
            return {
              ...day,
              enabled: savedHour.is_active,
              startTime: savedHour.start_time?.slice(0, 5) || '09:00',
              endTime: savedHour.end_time?.slice(0, 5) || '17:00'
            }
          }
          return day
        })
        setWorkingHours(updatedHours)
      }
    } catch (error) {
      console.error('Error fetching working hours:', error)
    }
  }

  const fetchUpcomingLessons = async (teacherId) => {
    try {
      const { data: bookingsData, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('teacher_id', teacherId)
        .eq('status', 'confirmed')
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(10)

      if (error) {
        console.error('Error fetching bookings:', error)
        return
      }

      const bookingsWithProfiles = await Promise.all(
        (bookingsData || []).map(async (booking) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('user_id', booking.student_id)
            .single()
          return { ...booking, profiles: profileData }
        })
      )

      setUpcomingLessons(bookingsWithProfiles)
    } catch (error) {
      console.error('Error fetching lessons:', error)
    }
  }

  const saveWorkingHours = async () => {
    setSavingHours(true)
    try {
      // 既存のworking hoursを削除
      await supabase
        .from('teacher_working_hours')
        .delete()
        .eq('teacher_id', teacher.id)

      // 有効な日のみ保存
      const hoursToSave = workingHours
        .filter(day => day.enabled)
        .map(day => ({
          teacher_id: teacher.id,
          day_of_week: day.day,
          start_time: day.startTime + ':00',
          end_time: day.endTime + ':00',
          is_active: true
        }))

      if (hoursToSave.length > 0) {
        const { error } = await supabase
          .from('teacher_working_hours')
          .insert(hoursToSave)

        if (error) throw error
      }

      alert('Working hours saved!')
    } catch (error) {
      console.error('Error saving working hours:', error)
      alert('Failed to save: ' + error.message)
    } finally {
      setSavingHours(false)
    }
  }

  const toggleDay = (dayValue) => {
    setWorkingHours(prev =>
      prev.map(day =>
        day.day === dayValue ? { ...day, enabled: !day.enabled } : day
      )
    )
  }

  const updateTime = (dayValue, field, value) => {
    setWorkingHours(prev =>
      prev.map(day =>
        day.day === dayValue ? { ...day, [field]: value } : day
      )
    )
  }

  const connectGoogleCalendar = () => {
    window.location.href = `/api/calendar/auth?teacher_id=${user.id}`
  }

  const syncCalendarBackground = async (userId) => {
    try {
      await fetch('/api/calendar/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId: userId })
      })
      console.log('Background calendar sync completed')
    } catch (error) {
      console.error('Background sync error:', error)
    }
  }

  const syncCalendar = async () => {
    const hasWorkingHours = workingHours.some(day => day.enabled)
    if (!hasWorkingHours) {
      alert('Please set your working hours first!')
      return
    }

    setSyncing(true)
    try {
      const response = await fetch('/api/calendar/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId: user.id })
      })

      const data = await response.json()

      if (data.success) {
        alert('Calendar synced! ' + data.slotsCreated + ' availability slots created.')
      } else if (data.error === 'reconnect_required') {
        alert('Google Calendar connection expired. Please click Reconnect.')
        // Update local state to show disconnected
        setTeacher(prev => ({ ...prev, google_refresh_token: null }))
      } else {
        alert('Failed to sync: ' + (data.message || data.error))
      }
    } catch (error) {
      console.error('Error syncing calendar:', error)
      alert('Failed to sync calendar')
    } finally {
      setSyncing(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London'
    })
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

  const isCalendarConnected = teacher?.google_refresh_token

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
            Hello, {profile?.full_name || teacher?.display_name} • Teacher
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', color: '#1e293b' }}>
          Teacher Dashboard
        </h2>

        {/* Upcoming Lessons */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
            Upcoming Lessons ({upcomingLessons.length})
          </h3>
          
          {upcomingLessons.length === 0 ? (
            <p style={{ color: '#64748b' }}>No upcoming lessons scheduled.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {upcomingLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  style={{
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                        {lesson.profiles?.full_name || 'Student'}
                      </p>
                      <p style={{ color: '#64748b', fontSize: '14px' }}>
                        {lesson.profiles?.email}
                      </p>
                      <p style={{ color: '#3b82f6', fontSize: '14px', marginTop: '8px' }}>
                        {formatDateTime(lesson.start_time)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {lesson.lesson_type?.replace('_', ' ')}
                      </span>
                      {lesson.zoom_link && (
                        <a
                          href={lesson.zoom_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'block',
                            marginTop: '8px',
                            padding: '8px 16px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}
                        >
                          Join Zoom
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Zoom Link */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
            Your Zoom Link
          </h3>
          {teacher?.zoom_link ? (
            <div>
              <p style={{ color: '#64748b', marginBottom: '8px' }}>Your personal meeting room:</p>
              <a
                href={teacher.zoom_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#3b82f6', wordBreak: 'break-all' }}
              >
                {teacher.zoom_link}
              </a>
            </div>
          ) : (
            <p style={{ color: '#64748b' }}>No Zoom link configured. Please contact admin.</p>
          )}
        </div>

        {/* Working Hours */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
            Working Hours
          </h3>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>
            Set your availability for each day of the week.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {workingHours.map((day) => (
              <div key={day.day} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                padding: '12px 16px',
                background: day.enabled ? '#f0f9ff' : '#f8fafc',
                borderRadius: '10px',
                border: day.enabled ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                flexWrap: 'wrap'
              }}>
                <input
                  type="checkbox"
                  checked={day.enabled}
                  onChange={() => toggleDay(day.day)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span style={{ 
                  width: '100px', 
                  fontWeight: '600',
                  color: day.enabled ? '#1e293b' : '#94a3b8'
                }}>
                  {day.name}
                </span>
                {day.enabled && (
                  <>
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(e) => updateTime(day.day, 'startTime', e.target.value)}
                      style={{ 
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                    <span style={{ color: '#64748b' }}>to</span>
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(e) => updateTime(day.day, 'endTime', e.target.value)}
                      style={{ 
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          <button 
            onClick={saveWorkingHours}
            disabled={savingHours}
            style={{ 
              marginTop: '20px',
              padding: '12px 24px',
              background: savingHours ? '#94a3b8' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: savingHours ? 'not-allowed' : 'pointer'
            }}
          >
            {savingHours ? 'Saving...' : 'Save Working Hours'}
          </button>
        </div>

        {/* Google Calendar */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
            Google Calendar
          </h3>

          {isCalendarConnected ? (
            <div>
              <p style={{ color: '#10b981', marginBottom: '16px' }}>
                Connected to Google Calendar
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={syncCalendar}
                  disabled={syncing}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: syncing ? '#94a3b8' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: syncing ? 'not-allowed' : 'pointer'
                  }}
                >
                  {syncing ? 'Syncing...' : 'Sync Now'}
                </button>
                <button
                  onClick={connectGoogleCalendar}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'white',
                    color: '#1e293b',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Reconnect
                </button>
              </div>
              <p style={{ marginTop: '12px', color: '#64748b', fontSize: '14px' }}>
                Calendar syncs automatically when you log in. Click 'Sync Now' to update immediately.
              </p>
            </div>
          ) : (
            <div>
              <p style={{ color: '#64748b', marginBottom: '16px' }}>
                Connect your Google Calendar to automatically sync your availability.
              </p>
              <button
                onClick={connectGoogleCalendar}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#4285f4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Connect Google Calendar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
