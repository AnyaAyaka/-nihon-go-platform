'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function StudentDashboard({ user, profile }) {
  const router = useRouter()
  const [allTickets, setAllTickets] = useState([])
  const [upcomingLessons, setUpcomingLessons] = useState([])
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showLessonDialog, setShowLessonDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isCancelling, setIsCancelling] = useState(false)

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
      .gt('remaining_tickets', 0)

    if (error) {
      console.error('Error fetching current tickets:', error)
    } else if (data) {
      setAllTickets(data || [])
    }
  }

  const fetchUpcomingLessons = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        teachers:teacher_id (
          display_name,
          user_id
        )
      `)
      .eq('student_id', user.id)
      .eq('status', 'confirmed')
      .gte('start_time', new Date().toISOString())
      .order('start_time', { ascending: true })
      .limit(5)

    if (error) {
      console.error('Error fetching upcoming lessons:', error)
    } else {
      setUpcomingLessons(data || [])
    }
    setLoading(false)
  }

  const canCancelOrReschedule = (lessonStartTime) => {
    const now = new Date()
    const lessonTime = new Date(lessonStartTime)
    const hoursUntilLesson = (lessonTime - now) / (1000 * 60 * 60)
    return hoursUntilLesson >= 24
  }

  const handleCancelLesson = async () => {
    if (!selectedLesson) return
    
    const canCancel = canCancelOrReschedule(selectedLesson.start_time)
    
    const confirmMessage = canCancel
      ? 'Are you sure you want to cancel this lesson? Your ticket will be refunded.'
      : 'This lesson is within 24 hours. Cancelling now will result in 100% charge (no ticket refund). Continue?'
    
    if (!confirm(confirmMessage)) return

    setIsCancelling(true)

    try {
      const response = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: selectedLesson.id,
          refundTicket: canCancel
        })
      })

      const result = await response.json()

      if (response.ok) {
        alert(canCancel ? '✅ Lesson cancelled. Ticket refunded.' : '✅ Lesson cancelled. No refund (within 24h).')
        setShowLessonDialog(false)
        setSelectedLesson(null)
        await fetchUpcomingLessons()
        await fetchCurrentTickets()
      } else {
        alert(`❌ Cancellation failed: ${result.error}`)
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`)
    } finally {
      setIsCancelling(false)
    }
  }

  const handleRescheduleLesson = () => {
    if (!selectedLesson) return
    
    const canReschedule = canCancelOrReschedule(selectedLesson.start_time)
    
    if (!canReschedule) {
      alert('Cannot reschedule within 24 hours of the lesson.')
      return
    }

    // キャンセル後に予約ページへ
    if (confirm('To reschedule, we will cancel this lesson (ticket will be refunded) and redirect you to the booking page. Continue?')) {
      handleCancelLesson().then(() => {
        router.push('/booking')
      })
    }
  }

  const totalTickets = allTickets.reduce((sum, ticket) => sum + ticket.remaining_tickets, 0)

  const handleContactUs = () => {
    window.location.href = 'mailto:info@nihongolondon.com?subject=Support Request from Nihon GO! Platform'
  }

  return (
    <div style={{ 
      padding: '40px 24px', 
      maxWidth: '1400px', 
      margin: '0 auto', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
      minHeight: '100vh' 
    }}>
      <h2 style={{ 
        marginBottom: '30px', 
        fontSize: '32px', 
        fontWeight: '700', 
        color: '#1e293b' 
      }}>
        Student Dashboard
      </h2>

      {/* レッスン詳細ダイアログ */}
      {showLessonDialog && selectedLesson && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{ marginTop: 0 }}>Lesson Details</h2>
            
            <div style={{ margin: '20px 0', padding: '20px', background: '#f5f7fa', borderRadius: '10px' }}>
              <div style={{ marginBottom: '12px' }}>
                <strong>Teacher:</strong> {selectedLesson.teachers?.display_name}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Date & Time:</strong><br/>
                {new Date(selectedLesson.start_time).toLocaleString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Europe/London'
                })}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Lesson Type:</strong> {selectedLesson.lesson_type?.replace('_', ' ')}
              </div>
              {selectedLesson.zoom_link && (
                <div>
                  <strong>Zoom Link:</strong><br/>
                  <a 
                    href={selectedLesson.zoom_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#0ea5e9',
                      textDecoration: 'underline',
                      wordBreak: 'break-all'
                    }}
                  >
                    {selectedLesson.zoom_link}
                  </a>
                </div>
              )}
            </div>

            {canCancelOrReschedule(selectedLesson.start_time) ? (
              <p style={{ color: '#10b981', fontSize: '14px', marginBottom: '20px' }}>
                ✅ You can reschedule or cancel this lesson for free (24+ hours before start time)
              </p>
            ) : (
              <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '20px' }}>
                ⚠️ This lesson is within 24 hours. Cancellation will result in 100% charge (no ticket refund).
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedLesson.zoom_link && (
                
                  href={selectedLesson.zoom_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#0ea5e9',
                    color: 'white',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Join Zoom Meeting
                </a>
              )}
              
              <button
                onClick={handleRescheduleLesson}
                disabled={isCancelling}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #6366f1',
                  background: 'white',
                  color: '#6366f1',
                  cursor: isCancelling ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Reschedule
              </button>

              <button
                onClick={handleCancelLesson}
                disabled={isCancelling}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #ef4444',
                  background: 'white',
                  color: '#ef4444',
                  cursor: isCancelling ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Lesson'}
              </button>

              <button
                onClick={() => {
                  setShowLessonDialog(false)
                  setSelectedLesson(null)
                }}
                disabled={isCancelling}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e1e5e9',
                  background: 'white',
                  cursor: isCancelling ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Lessons Banner */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px 30px',
        marginBottom: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '28px', marginRight: '12px' }}>📖</div>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#1e293b' }}>
            Upcoming Lessons
          </h3>
        </div>

        {loading ? (
          <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>Loading...</p>
        ) : upcomingLessons.length > 0 ? (
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            overflowX: 'auto',
            paddingBottom: '8px'
          }}>
            {upcomingLessons.map((lesson) => (
              <div 
                key={lesson.id}
                onClick={() => {
                  setSelectedLesson(lesson)
                  setShowLessonDialog(true)
                }}
                style={{ 
                  minWidth: '280px',
                  padding: '20px', 
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
                  borderRadius: '12px',
                  border: '2px solid #e0f2fe',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#38bdf8'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e0f2fe'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ 
                  fontWeight: '700', 
                  color: '#0c4a6e', 
                  fontSize: '16px',
                  marginBottom: '8px'
                }}>
                  {lesson.teachers?.display_name || 'Teacher'}
                </div>
                <div style={{ 
                  color: '#475569', 
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px'
                }}>
                  <span>🗓️</span>
                  {new Date(lesson.start_time).toLocaleString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/London'
                  })}
                </div>
                <div style={{ 
                  color: '#64748b', 
                  fontSize: '13px',
                  textTransform: 'capitalize'
                }}>
                  {lesson.lesson_type?.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>
            No upcoming lessons scheduled
          </p>
        )}
      </div>
      
      {/* 3 Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '30px' 
      }}>
        
        {/* My Tickets Card */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #fb7185 0%, #f472b6 100%)',
            color: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 8px 24px rgba(251, 113, 133, 0.25)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(251, 113, 133, 0.35)'
            e.currentTarget.style.transform = 'translateY(-4px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(251, 113, 133, 0.25)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '20px', textAlign: 'center' }}>🎫</div>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: '700', textAlign: 'center' }}>
            My Tickets
          </h3>
          {loading ? (
            <p style={{ margin: '0 0 24px 0', fontSize: '16px', opacity: '0.9', textAlign: 'center' }}>Loading...</p>
          ) : allTickets.length > 0 && totalTickets > 0 ? (
            <div style={{ margin: '0 0 24px 0', textAlign: 'center' }}>
              <span style={{ fontSize: '56px', fontWeight: '900', display: 'block', lineHeight: '1' }}>
                {totalTickets}
              </span>
              <span style={{ fontSize: '16px', fontWeight: '400', opacity: '0.9', display: 'block', marginTop: '12px' }}>
                tickets remaining
              </span>
              <div style={{ 
                marginTop: '16px', 
                fontSize: '13px', 
                opacity: '0.85',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                {allTickets.map(ticket => (
                  <div key={ticket.ticket_type}>
                    {ticket.ticket_type.replace('_', ' ')}: {ticket.remaining_tickets}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p style={{ margin: '0 0 24px 0', fontSize: '16px', opacity: '0.9', textAlign: 'center' }}>No tickets available</p>
          )}
          <button 
            onClick={() => router.push('/subscription')}
            style={{
              background: 'rgba(255,255,255,0.25)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '12px',
              padding: '14px 28px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
          >
            Get Tickets
          </button>
        </div>

        {/* Book Lesson Card */}
        <div 
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '2px solid #e2e8f0',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(251, 113, 133, 0.15)'
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.borderColor = '#fb7185'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.borderColor = '#e2e8f0'
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '20px', textAlign: 'center' }}>📅</div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: '700', color: '#1e293b', textAlign: 'center' }}>
            Book Lesson
          </h3>
          <p style={{ margin: '0 0 28px 0', color: '#64748b', fontSize: '15px', lineHeight: '1.6', textAlign: 'center' }}>
            Schedule your next Japanese lesson with your teacher
          </p>
          <button 
            onClick={() => router.push('/booking')}
            style={{
              background: '#1e293b',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 28px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
          >
            Book Now
          </button>
        </div>

        {/* Contact Us Card */}
        <div 
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '2px solid #e2e8f0',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(251, 113, 133, 0.15)'
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.borderColor = '#fb7185'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.borderColor = '#e2e8f0'
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '20px', textAlign: 'center' }}>💬</div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: '700', color: '#1e293b', textAlign: 'center' }}>
            Contact Us
          </h3>
          <p style={{ margin: '0 0 28px 0', color: '#64748b', fontSize: '15px', lineHeight: '1.6', textAlign: 'center' }}>
            Need help? Our support team is here to assist you
          </p>
          <button 
            onClick={handleContactUs}
            style={{
              background: '#1e293b',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 28px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
          >
            Email Support
          </button>
        </div>

      </div>
    </div>
  )
}
