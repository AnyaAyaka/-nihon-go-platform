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

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  }

  const buttonStyle = {
    background: '#1e293b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%'
  }

  return (
    <div style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '32px', fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>
        Student Dashboard
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        
        {/* My Textbooks Card */}
        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(251, 113, 133, 0.15)'
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.borderColor = '#fb7185'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.borderColor = '#e2e8f0'
          }}
        >
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: '4px', 
            background: 'linear-gradient(90deg, #fb7185 0%, #f472b6 100%)' 
          }}></div>
          <div style={{ fontSize: '40px', marginBottom: '16px', textAlign: 'center' }}>📚</div>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: '600', color: '#1e293b', textAlign: 'center' }}>
            My Textbooks
          </h3>
          <p style={{ margin: '0 0 20px 0', color: '#374151', fontSize: '15px', lineHeight: '1.6', textAlign: 'center' }}>
            View and study online textbooks
          </p>
          <button 
            onClick={() => router.push('/textbooks')}
            style={buttonStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
          >
            Study Now
          </button>
        </div>

        {/* My Tickets Card */}
        <div 
          style={{...cardStyle, background: 'linear-gradient(135deg, #fb7185 0%, #f472b6 100%)', color: 'white'}}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(251, 113, 133, 0.3)'
            e.currentTarget.style.transform = 'translateY(-5px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div style={{ fontSize: '40px', marginBottom: '16px', textAlign: 'center' }}>🎫</div>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: '600', textAlign: 'center' }}>
            My Tickets
          </h3>
          {loading ? (
            <p style={{ margin: '0 0 20px 0', fontSize: '15px', opacity: '0.9', textAlign: 'center' }}>Loading...</p>
          ) : currentTickets && currentTickets.remaining_tickets > 0 ? (
            <p style={{ margin: '0 0 20px 0', textAlign: 'center' }}>
              <span style={{ fontSize: '48px', fontWeight: '900', display: 'block', lineHeight: '1' }}>
                {currentTickets.remaining_tickets}
              </span>
              <span style={{ fontSize: '14px', fontWeight: '400', opacity: '0.9', display: 'block', marginTop: '8px' }}>
                tickets remaining
              </span>
            </p>
          ) : (
            <p style={{ margin: '0 0 20px 0', fontSize: '15px', opacity: '0.9', textAlign: 'center' }}>No tickets available</p>
          )}
          <button 
            onClick={() => router.push('/subscription')}
            style={{...buttonStyle, background: 'rgba(255,255,255,0.2)', border: '2px solid white'}}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            Get Tickets
          </button>
        </div>

        {/* Book Lesson Card */}
        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(251, 113, 133, 0.15)'
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.borderColor = '#fb7185'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.borderColor = '#e2e8f0'
          }}
        >
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: '4px', 
            background: 'linear-gradient(90deg, #fb7185 0%, #f472b6 100%)' 
          }}></div>
          <div style={{ fontSize: '40px', marginBottom: '16px', textAlign: 'center' }}>📅</div>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: '600', color: '#1e293b', textAlign: 'center' }}>
            Book Lesson
          </h3>
          <p style={{ margin: '0 0 20px 0', color: '#374151', fontSize: '15px', lineHeight: '1.6', textAlign: 'center' }}>
            Schedule your next lesson
          </p>
          <button 
            onClick={() => router.push('/booking')}
            style={buttonStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
          >
            Book Now
          </button>
        </div>

        {/* Upcoming Lessons Card */}
        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(251, 113, 133, 0.15)'
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.borderColor = '#fb7185'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.borderColor = '#e2e8f0'
          }}
        >
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: '4px', 
            background: 'linear-gradient(90deg, #fb7185 0%, #f472b6 100%)' 
          }}></div>
          <div style={{ fontSize: '40px', marginBottom: '16px', textAlign: 'center' }}>📖</div>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: '600', color: '#1e293b', textAlign: 'center' }}>
            Upcoming Lessons
          </h3>
          {upcomingLessons.length > 0 ? (
            <p style={{ margin: '0 0 20px 0', color: '#374151', fontSize: '15px', textAlign: 'center' }}>
              {upcomingLessons.length} lessons scheduled
            </p>
          ) : (
            <p style={{ margin: '0 0 20px 0', color: '#374151', fontSize: '15px', textAlign: 'center' }}>
              No upcoming lessons
            </p>
          )}
          <button 
            onClick={() => router.push('/lessons')}
            style={buttonStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
          >
            View All
          </button>
        </div>

        {/* Chat with Teacher Card */}
        <div 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(251, 113, 133, 0.15)'
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.borderColor = '#fb7185'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.borderColor = '#e2e8f0'
          }}
        >
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: '4px', 
            background: 'linear-gradient(90deg, #fb7185 0%, #f472b6 100%)' 
          }}></div>
          <div style={{ fontSize: '40px', marginBottom: '16px', textAlign: 'center' }}>💬</div>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: '600', color: '#1e293b', textAlign: 'center' }}>
            Chat with Teacher
          </h3>
          <p style={{ margin: '0 0 20px 0', color: '#374151', fontSize: '15px', lineHeight: '1.6', textAlign: 'center' }}>
            Message your teacher
          </p>
          <button 
            onClick={() => router.push('/chat')}
            style={buttonStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
          >
            Open Chat
          </button>
        </div>

      </div>
    </div>
  )
}
