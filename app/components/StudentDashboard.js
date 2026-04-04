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
  const [tierInfo, setTierInfo] = useState({ tier: 'none', lessonsCompleted: 0 })
  const [jlptSubscriptions, setJlptSubscriptions] = useState([])

  useEffect(() => {
    if (user) {
      fetchCurrentTickets()
      fetchUpcomingLessons()
      fetchTierInfo()
      fetchJlptSubscriptions()
    }
  }, [user])

  const fetchTierInfo = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('tier, total_lessons_completed')
      .eq('user_id', user.id)
      .single()
    if (!error && data) {
      setTierInfo({ tier: data.tier || 'none', lessonsCompleted: data.total_lessons_completed || 0 })
    }
  }

  const fetchJlptSubscriptions = async () => {
    const { data } = await supabase
      .from('jlpt_subscriptions')
      .select('level, expires_at')
      .eq('user_id', user.id)
      .gt('expires_at', new Date().toISOString())
    if (data) setJlptSubscriptions(data)
  }

  const fetchCurrentTickets = async () => {
    const { data, error } = await supabase
      .from('user_current_tickets')
      .select('*')
      .eq('user_id', user.id)
      .gt('remaining_tickets', 0)
    if (error) console.error('Error fetching current tickets:', error)
    else if (data) setAllTickets(data || [])
  }

  const fetchUpcomingLessons = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`*, teachers:teacher_id (display_name, user_id)`)
      .eq('student_id', user.id)
      .eq('status', 'confirmed')
      .gte('start_time', new Date().toISOString())
      .order('start_time', { ascending: true })
      .limit(5)
    if (error) console.error('Error fetching upcoming lessons:', error)
    else setUpcomingLessons(data || [])
    setLoading(false)
  }

  const canCancelOrReschedule = (lessonStartTime) => {
    const hoursUntilLesson = (new Date(lessonStartTime) - new Date()) / (1000 * 60 * 60)
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
        body: JSON.stringify({ bookingId: selectedLesson.id, refundTicket: canCancel })
      })
      const result = await response.json()
      if (response.ok) {
        alert(canCancel ? 'Lesson cancelled. Ticket refunded.' : 'Lesson cancelled. No refund (within 24h).')
        setShowLessonDialog(false)
        setSelectedLesson(null)
        await fetchUpcomingLessons()
        await fetchCurrentTickets()
      } else {
        alert(`Cancellation failed: ${result.error}`)
      }
    } catch (error) {
      alert(`Error: ${error.message}`)
    } finally {
      setIsCancelling(false)
    }
  }

  const handleRescheduleLesson = () => {
    if (!selectedLesson) return
    if (!canCancelOrReschedule(selectedLesson.start_time)) {
      alert('Cannot reschedule within 24 hours of the lesson.')
      return
    }
    if (confirm('To reschedule, we will cancel this lesson (ticket will be refunded) and redirect you to the booking page. Continue?')) {
      handleCancelLesson().then(() => router.push('/booking'))
    }
  }

  const totalTickets = allTickets.reduce((sum, t) => sum + t.remaining_tickets, 0)

  const getLevelUrl = (level) => ({
    N5: 'https://nihongo-world.com/materials/jlpt/n5/',
    N4: 'https://nihongo-world.com/materials/jlpt/n4/',
    N3: 'https://nihongo-world.com/materials/jlpt/n3/',
    N2: 'https://nihongo-world.com/materials/jlpt/n2/',
    N1: 'https://nihongo-world.com/materials/jlpt/n1/',
  })[level] || 'https://nihongo-world.com/materials/jlpt/'

  const getTierProgress = () => {
    const l = tierInfo.lessonsCompleted
    if (l >= 100) return { progress: 100, remaining: 0, nextTier: null }
    if (l >= 75) return { progress: ((l - 75) / 25) * 100, remaining: 100 - l, nextTier: 'Platinum' }
    if (l >= 50) return { progress: ((l - 50) / 25) * 100, remaining: 75 - l, nextTier: 'Gold' }
    if (l >= 25) return { progress: ((l - 25) / 25) * 100, remaining: 50 - l, nextTier: 'Silver' }
    return { progress: (l / 25) * 100, remaining: 25 - l, nextTier: 'Bronze' }
  }

  const tierNames = { none: 'No Tier', bronze: 'Bronze', silver: 'Silver', gold: 'Gold', platinum: 'Platinum' }
  const progressInfo = getTierProgress()

  const card = {
    background: 'var(--color-background-primary)',
    borderRadius: '12px',
    border: '0.5px solid var(--color-border-tertiary)',
    padding: '20px 24px',
    marginBottom: '12px',
  }

  const sectionLabel = {
    fontSize: '11px',
    fontWeight: '500',
    color: 'var(--color-text-secondary)',
    margin: '0 0 12px',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
  }

  return (
    <div style={{ padding: '32px 24px', maxWidth: '800px', margin: '0 auto' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 2px' }}>Welcome back</p>
          <p style={{ fontSize: '20px', fontWeight: '500', color: 'var(--color-text-primary)', margin: 0 }}>{profile?.full_name || user?.email}</p>
        </div>
        <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
          style={{ fontSize: '13px', color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          Log out
        </button>
      </div>

      {showLessonDialog && selectedLesson && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'var(--color-background-primary)', borderRadius: '16px', padding: '28px', maxWidth: '480px', width: '90%' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 16px' }}>Lesson details</p>
            <div style={{ background: 'var(--color-background-secondary)', borderRadius: '8px', padding: '16px', marginBottom: '16px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>Teacher: </span>{selectedLesson.teachers?.display_name}</div>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>Time: </span>{new Date(selectedLesson.start_time).toLocaleString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' })}</div>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>Type: </span>{selectedLesson.lesson_type?.replace('_', ' ')}</div>
              {selectedLesson.zoom_link && <div><span style={{ color: 'var(--color-text-secondary)' }}>Zoom: </span><a href={selectedLesson.zoom_link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-info)' }}>{selectedLesson.zoom_link}</a></div>}
            </div>
            <p style={{ fontSize: '13px', color: canCancelOrReschedule(selectedLesson.start_time) ? 'var(--color-text-success)' : 'var(--color-text-danger)', marginBottom: '16px' }}>
              {canCancelOrReschedule(selectedLesson.start_time) ? 'Free cancellation available (24+ hours before start)' : 'Within 24 hours — cancellation will forfeit your ticket'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={handleRescheduleLesson} disabled={isCancelling} style={{ padding: '10px', fontSize: '14px' }}>Reschedule</button>
              <button onClick={handleCancelLesson} disabled={isCancelling} style={{ padding: '10px', fontSize: '14px', color: 'var(--color-text-danger)', borderColor: 'var(--color-border-danger)' }}>{isCancelling ? 'Cancelling...' : 'Cancel lesson'}</button>
              <button onClick={() => { setShowLessonDialog(false); setSelectedLesson(null) }} style={{ padding: '10px', fontSize: '14px' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Lessons */}
      <div style={card}>
        <p style={sectionLabel}>Upcoming lessons</p>
        {loading ? <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>Loading...</p>
          : upcomingLessons.length > 0 ? (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
              {upcomingLessons.map((lesson) => (
                <div key={lesson.id} onClick={() => { setSelectedLesson(lesson); setShowLessonDialog(true) }}
                  style={{ minWidth: '220px', padding: '12px 16px', background: 'var(--color-background-secondary)', borderRadius: '8px', border: '0.5px solid var(--color-border-tertiary)', cursor: 'pointer' }}>
                  <p style={{ fontWeight: '500', fontSize: '14px', color: 'var(--color-text-primary)', margin: '0 0 4px' }}>{lesson.teachers?.display_name || 'Teacher'}</p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 4px' }}>
                    {new Date(lesson.start_time).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' })}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, textTransform: 'capitalize' }}>{lesson.lesson_type?.replace('_', ' ')}</p>
                </div>
              ))}
            </div>
          ) : <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>No upcoming lessons scheduled</p>
        }
      </div>

      {/* JLPT Mock Tests */}
      {jlptSubscriptions.length > 0 && (
        <div style={card}>
          <p style={sectionLabel}>JLPT mock tests</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {jlptSubscriptions.map((sub) => (
              <a key={sub.level} href={getLevelUrl(sub.level)}
                style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '12px 20px', background: 'var(--color-background-secondary)', borderRadius: '8px', border: '0.5px solid var(--color-border-tertiary)', textDecoration: 'none' }}>
                <span style={{ fontSize: '18px', fontWeight: '500', color: 'var(--color-text-primary)' }}>{sub.level}</span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Expires {new Date(sub.expires_at).toLocaleDateString('en-GB')}</span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-info)', marginTop: '4px' }}>Go to tests</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Tickets + Book */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <div style={{ background: 'var(--color-background-primary)', borderRadius: '12px', border: '0.5px solid var(--color-border-tertiary)', padding: '20px 24px' }}>
          <p style={sectionLabel}>My tickets</p>
          {loading ? <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 12px' }}>Loading...</p>
            : totalTickets > 0 ? (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '28px', fontWeight: '500', color: 'var(--color-text-primary)', margin: '0 0 4px' }}>{totalTickets}</p>
                {allTickets.map(t => (
                  <p key={t.ticket_type} style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>{t.ticket_type.replace('_', ' ')}: {t.remaining_tickets}</p>
                ))}
              </div>
            ) : <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 12px' }}>No tickets available</p>
          }
          <button onClick={() => router.push('/subscription')} style={{ width: '100%', fontSize: '13px' }}>Get tickets</button>
        </div>

        <div style={{ background: 'var(--color-background-primary)', borderRadius: '12px', border: '0.5px solid var(--color-border-tertiary)', padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
          <p style={sectionLabel}>Book a lesson</p>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 auto' }}>Schedule with a certified teacher</p>
          <button onClick={() => router.push('/booking')} style={{ width: '100%', fontSize: '13px', marginTop: '12px' }}>Book now</button>
        </div>
      </div>

      {/* Tier Progress */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <p style={sectionLabel}>Your tier</p>
            <p style={{ fontSize: '18px', fontWeight: '500', color: 'var(--color-text-primary)', margin: 0 }}>{tierNames[tierInfo.tier] || 'No Tier'}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Lessons this year</p>
            <p style={{ fontSize: '24px', fontWeight: '500', color: 'var(--color-text-primary)', margin: 0 }}>{tierInfo.lessonsCompleted}</p>
          </div>
        </div>
        <div style={{ height: '4px', background: 'var(--color-background-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progressInfo.progress}%`, background: 'var(--color-text-secondary)', borderRadius: '2px', transition: 'width 0.5s ease' }} />
        </div>
        {progressInfo.nextTier && <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '6px 0 0' }}>{progressInfo.remaining} lessons to {progressInfo.nextTier}</p>}
        {!progressInfo.nextTier && <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '6px 0 0' }}>Highest tier reached — 20% off all purchases</p>}
      </div>

      {/* Contact */}
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <a href="mailto:info@nihongolondon.com" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Contact support</a>
      </div>

    </div>
  )
}
