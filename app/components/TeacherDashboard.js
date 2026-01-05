'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function TeacherDashboard({ user, profile }) {
  const [teacher, setTeacher] = useState(null)
  const [upcomingLessons, setUpcomingLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState(null)

  useEffect(() => {
    fetchTeacherData()
  }, [user])

  const fetchTeacherData = async () => {
    try {
      // 講師情報を取得
      const { data: teacherData, error: teacherError } = await supabase
        .from('teachers')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (teacherError) {
        console.error('Error fetching teacher:', teacherError)
      } else {
        setTeacher(teacherData)
      }

      // 予約を取得
      if (teacherData) {
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            *,
            profiles:student_id (full_name, email)
          `)
          .eq('teacher_id', teacherData.id)
          .eq('status', 'confirmed')
          .gte('start_time', new Date().toISOString())
          .order('start_time', { ascending: true })

        if (!bookingsError) {
          setUpcomingLessons(bookings || [])
        }
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnectGoogle = () => {
    window.location.href = `/api/calendar/auth?teacher_id=${user.id}`
  }

  const handleSyncCalendar = async () => {
    setSyncing(true)
    setSyncStatus(null)
    try {
      const response = await fetch('/api/calendar/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId: user.id })
      })
      const data = await response.json()
      
      if (data.success) {
        setSyncStatus({ type: 'success', message: `Synced ${data.slotsCreated} available slots from Google Calendar` })
      } else {
        setSyncStatus({ type: 'error', message: data.error || 'Sync failed' })
      }
    } catch (error) {
      setSyncStatus({ type: 'error', message: error.message })
    } finally {
      setSyncing(false)
    }
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
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', color: '#1e293b' }}>
        Teacher Dashboard
      </h2>

      {/* Google Calendar Connection */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
          📅 Google Calendar
        </h3>
        
        {teacher?.google_refresh_token ? (
          <div>
            <p style={{ color: '#10b981', marginBottom: '16px' }}>
              ✅ Connected to Google Calendar
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleSyncCalendar}
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
                {syncing ? 'Syncing...' : '🔄 Sync Now'}
              </button>
              <button
                onClick={handleConnectGoogle}
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
                🔗 Reconnect
              </button>
            </div>
            {syncStatus && (
              <p style={{
                marginTop: '12px',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: syncStatus.type === 'success' ? '#d1fae5' : '#fee2e2',
                color: syncStatus.type === 'success' ? '#065f46' : '#991b1b'
              }}>
                {syncStatus.message}
              </p>
            )}
          </div>
        ) : (
          <div>
            <p style={{ color: '#64748b', marginBottom: '16px' }}>
              Connect your Google Calendar to manage your availability
            </p>
            <button
              onClick={handleConnectGoogle}
              style={{
                padding: '12px 24px',
                backgroundColor: '#4285f4',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Connect Google Calendar
            </button>
          </div>
        )}
      </div>

      {/* Upcoming Lessons */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
          📚 Upcoming Lessons ({upcomingLessons.length})
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

      {/* Zoom Link Info */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
          🔗 Your Zoom Link
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
    </div>
  )
}
