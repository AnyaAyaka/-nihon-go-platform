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

export default function TeacherDashboard() {
  const [user, setUser] = useState(null)
  const [teacher, setTeacher] = useState(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [savingHours, setSavingHours] = useState(false)
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
    
    const params = new URLSearchParams(window.location.search)
    if (params.get('calendar_connected') === 'true') {
      alert('✅ Google Calendar connected successfully!')
      window.history.replaceState({}, '', '/dashboard/teacher')
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth')
      return
    }

    setUser(user)

    const { data: teacherData } = await supabase
      .from('teachers')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!teacherData) {
      alert('Teacher profile not found')
      router.push('/dashboard')
      return
    }

    setTeacher(teacherData)
    
    await fetchWorkingHours(user.id)
    
    setLoading(false)
  }

  const fetchWorkingHours = async (userId) => {
    try {
      const response = await fetch(`/api/teacher/working-hours?teacher_id=${userId}`)
      const data = await response.json()
      
      if (data.workingHours && data.workingHours.length > 0) {
        const updatedHours = workingHours.map(day => {
          const savedHour = data.workingHours.find(h => h.day_of_week === day.day)
          if (savedHour) {
            return {
              ...day,
              enabled: true,
              startTime: savedHour.start_time.slice(0, 5),
              endTime: savedHour.end_time.slice(0, 5)
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

  const saveWorkingHours = async () => {
    setSavingHours(true)
    try {
      const response = await fetch('/api/teacher/working-hours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId: user.id,
          workingHours: workingHours
        })
      })

      const data = await response.json()

      if (data.success) {
        alert('✅ Working hours saved successfully!')
      } else {
        alert('❌ Failed to save working hours: ' + data.error)
      }
    } catch (error) {
      console.error('Error saving working hours:', error)
      alert('Failed to save working hours')
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

  const connectGoogleCalendar = async () => {
    try {
      const response = await fetch(`/api/auth/google?teacher_id=${user.id}`)
      const data = await response.json()
      
      if (data.authUrl) {
        window.location.href = data.authUrl
      }
    } catch (error) {
      console.error('Error connecting calendar:', error)
      alert('Failed to connect Google Calendar')
    }
  }

  const syncCalendar = async () => {
    const hasWorkingHours = workingHours.some(day => day.enabled)
    if (!hasWorkingHours) {
      alert('⚠️ Please set your working hours first!')
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
        alert(`✅ Calendar synced! ${data.slotsCreated} availability slots created.`)
      } else {
        alert('❌ Failed to sync calendar: ' + data.error)
      }
    } catch (error) {
      console.error('Error syncing calendar:', error)
      alert('Failed to sync calendar')
    } finally {
      setSyncing(false)
    }
  }

  if (loading) return <div>Loading...</div>

  const isCalendarConnected = teacher?.google_access_token && teacher?.google_refresh_token
  const timezoneName = teacher?.timezone?.split('/')[1] || 'London'

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0'
          }}>
            👨‍🏫 Teacher Dashboard
          </h1>
          <p style={{ margin: 0, color: '#666' }}>
            Welcome, {teacher.display_name}!
          </p>
        </div>

        {/* Working Hours */}
        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '10px', color: '#333' }}>
            🕒 Working Hours
          </h2>
          <p style={{ 
            color: '#667eea', 
            fontSize: '14px', 
            fontWeight: '600',
            marginBottom: '20px' 
          }}>
            Your Local Time: {timezoneName}
          </p>
          <p style={{ color: '#666', marginBottom: '25px' }}>
            Set your availability for each day of the week. Only these hours will be available for booking.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {workingHours.map((day) => (
              <div key={day.day} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                padding: '15px',
                background: day.enabled ? '#f8f9ff' : '#f5f5f5',
                borderRadius: '10px',
                border: day.enabled ? '2px solid #667eea' : '1px solid #e1e5e9'
              }}>
                <input
                  type="checkbox"
                  checked={day.enabled}
                  onChange={() => toggleDay(day.day)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span style={{ 
                  width: '120px', 
                  fontWeight: '600',
                  color: day.enabled ? '#333' : '#999'
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
                        borderRadius: '8px',
                        border: '1px solid #e1e5e9',
                        fontSize: '14px'
                      }}
                    />
                    <span style={{ color: '#666' }}>to</span>
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(e) => updateTime(day.day, 'endTime', e.target.value)}
                      style={{ 
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid #e1e5e9',
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
              padding: '15px 30px',
              background: savingHours ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: savingHours ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
          >
            {savingHours ? 'Saving...' : '💾 Save Working Hours'}
          </button>
        </div>

        {/* Google Calendar Integration */}
        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>
            📅 Google Calendar Integration
          </h2>

          {!isCalendarConnected ? (
            <div>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Connect your Google Calendar to automatically sync your busy times. 
                Your working hours will be checked against your calendar to prevent double bookings.
              </p>
              <button 
                onClick={connectGoogleCalendar}
                style={{ 
                  padding: '15px 30px',
                  background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)'
                }}
              >
                🔗 Connect Google Calendar
              </button>
            </div>
          ) : (
            <div>
              <div style={{ 
                padding: '15px',
                background: '#e8f5e9',
                borderRadius: '10px',
                marginBottom: '20px',
                border: '2px solid #4CAF50'
              }}>
                <p style={{ margin: 0, color: '#2e7d32', fontWeight: '600' }}>
                  ✅ Google Calendar Connected
                </p>
                <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
                  Calendar ID: {teacher.google_calendar_id || 'primary'}
                </p>
              </div>

              <button 
                onClick={syncCalendar}
                disabled={syncing}
                style={{ 
                  padding: '15px 30px',
                  background: syncing ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: syncing ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}
              >
                {syncing ? '🔄 Syncing...' : '🔄 Sync Calendar Now'}
              </button>

              <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
                Sync your calendar to update your availability for the next 2 weeks based on your working hours and Google Calendar events.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
