'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function StudentDashboard({ user, profile }) {
  const router = useRouter()
  const [currentTickets, setCurrentTickets] = useState(null)
  const [upcomingLessons, setUpcomingLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchCurrentTickets()
      fetchUpcomingLessons()
    }
  }, [user])

  const fetchCurrentTickets = async () => {
    const { data, error } = await supabase
      .from('user_current_tickets')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching current tickets:', error)
    } else if (data) {
      setCurrentTickets(data)
    }
  }

  const fetchUpcomingLessons = async () => {
    const { data, error } = await supabase
      .from('lesson_bookings')
      .select(`
        *,
        teachers (display_name, timezone)
      `)
      .eq('student_id', user.id)
      .eq('status', 'scheduled')
      .gte('lesson_start_utc', new Date().toISOString())
      .order('lesson_start_utc', { ascending: true })
      .limit(3)

    if (error) {
      console.error('Error fetching upcoming lessons:', error)
    } else {
      setUpcomingLessons(data || [])
    }
    setLoading(false)
  }

  const isExpired = (dateString) => {
    return new Date(dateString) < new Date()
  }

  const formatLessonTime = (utcTime, timezone) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date(utcTime))
  }

  return (
    <div>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>Student Dashboard</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '25px', 
        margin: '20px 0' 
      }}>
        
        <div style={{ 
          border: '2px solid #e1e5e9', 
          padding: '25px', 
          borderRadius: '15px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          transition: 'transform 0.3s ease',
          cursor: 'pointer'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>📚 My Textbooks</h3>
          <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>View and study online textbooks</p>
          <button 
            onClick={() => router.push('/textbook')}
            style={{ 
              padding: '12px 20px', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              border: '2px solid rgba(255,255,255,0.3)', 
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Study Now
          </button>
        </div>

        <div style={{ 
          border: '2px solid #e1e5e9', 
          padding: '25px', 
          borderRadius: '15px',
          background: currentTickets && !isExpired(currentTickets.current_period_end) && currentTickets.remaining_tickets > 0 ? 
            'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 
            'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
          color: 'white',
          transition: 'transform 0.3s ease'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>🎫 My Subscription</h3>
          {loading ? (
            <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>Loading...</p>
          ) : currentTickets && !isExpired(currentTickets.current_period_end) ? (
            <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>
              {currentTickets.remaining_tickets} tickets remaining this month
            </p>
          ) : (
            <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>No active subscription</p>
          )}
          <button 
            onClick={() => router.push('/subscription')}
            style={{ 
              padding: '12px 20px', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              border: '2px solid rgba(255,255,255,0.3)', 
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {currentTickets && !isExpired(currentTickets.current_period_end) && currentTickets.remaining_tickets > 0 ? 
              'Manage Subscription' : 'Subscribe Now'}
          </button>
        </div>

        <div style={{ 
          border: '2px solid #e1e5e9', 
          padding: '25px', 
          borderRadius: '15px',
          background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
          color: 'white',
          transition: 'transform 0.3s ease'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>📅 Book Lesson</h3>
          <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>
            {currentTickets && currentTickets.remaining_tickets > 0 ? 
              'Schedule your next lesson' : 
              'Get tickets to book lessons'
            }
          </p>
          <button 
            onClick={() => router.push(currentTickets && currentTickets.remaining_tickets > 0 ? '/booking' : '/subscription')}
            style={{ 
              padding: '12px 20px', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              border: '2px solid rgba(255,255,255,0.3)', 
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {currentTickets && currentTickets.remaining_tickets > 0 ? 'Book Now' : 'Get Tickets'}
          </button>
        </div>

        <div style={{ 
          border: '2px solid #e1e5e9', 
          padding: '25px', 
          borderRadius: '15px',
          background: 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)',
          color: 'white',
          transition: 'transform 0.3s ease'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>📖 Upcoming Lessons</h3>
          {loading ? (
            <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>Loading...</p>
          ) : upcomingLessons.length > 0 ? (
            <div style={{ margin: '0 0 20px 0' }}>
              {upcomingLessons.slice(0, 2).map((lesson, index) => (
                <div key={lesson.id} style={{ 
                  marginBottom: '10px',
                  fontSize: '14px',
                  opacity: '0.9'
                }}>
                  <div>{lesson.teachers?.display_name}</div>
                  <div>{formatLessonTime(lesson.lesson_start_utc, Intl.DateTimeFormat().resolvedOptions().timeZone)}</div>
                  {index === 0 && upcomingLessons.length > 1 && <hr style={{ margin: '8px 0', opacity: '0.3' }} />}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>No upcoming lessons</p>
          )}
          <button 
            onClick={() => router.push('/booking')}
            style={{ 
              padding: '12px 20px', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              border: '2px solid rgba(255,255,255,0.3)', 
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            View All
          </button>
        </div>

        <div style={{ 
          border: '2px solid #e1e5e9', 
          padding: '25px', 
          borderRadius: '15px',
          background: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)',
          color: 'white',
          transition: 'transform 0.3s ease'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>💬 Chat with Teacher</h3>
          <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>Message your teacher</p>
          <button style={{ 
            padding: '12px 20px', 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            color: 'white', 
            border: '2px solid rgba(255,255,255,0.3)', 
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Open Chat
          </button>
        </div>

      </div>
    </div>
  )
}
