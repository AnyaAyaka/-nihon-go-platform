'use client'

import { useState, useEffect, Suspense } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'

const TICKET_TO_LESSON_TYPE = {
  'online_trial': 'online_trial',
  'online': 'online',
  'in_person': 'in_person',
  'premium': 'premium'
}

const LESSON_DURATION_MINUTES = 55

function BookingContent() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [allTickets, setAllTickets] = useState([])
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const locationFilter = searchParams.get('location')

  useEffect(() => {
    checkUser()
    fetchTeachers()
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

    setProfile(profileData)

    const { data: ticketsData } = await supabase
      .from('user_current_tickets')
      .select('*')
      .eq('user_id', user.id)

    if (ticketsData) {
      const validTickets = ticketsData.filter(t => t.remaining_tickets > 0)
      setAllTickets(validTickets)
    }
  }

  const fetchTeachers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('user_id, email, full_name, display_name, bio, lesson_types, location')
      .eq('role', 'teacher')
      .order('display_name')

    let filteredData = data || []
    if (locationFilter) {
      filteredData = filteredData.filter(t => t.location === locationFilter)
    }
    setTeachers(filteredData)
  }

  const fetchAvailableSlots = async (teacherUserId) => {
    const { data: teacherData } = await supabase
      .from('teachers')
      .select('id')
      .eq('user_id', teacherUserId)
      .single()
    
    if (!teacherData) return

    const minBookingTime = new Date()
    minBookingTime.setHours(minBookingTime.getHours() + 24)

    const { data: slots } = await supabase
      .from('teacher_availability')
      .select('*')
      .eq('teacher_id', teacherData.id)
      .eq('is_available', true)
      .gte('start_time_utc', minBookingTime.toISOString())
      .order('start_time_utc')
      .limit(100)

    if (slots) {
      setAvailableSlots(slots)
    }
  }

  const getAvailableTicketsForTeacher = (teacher) => {
    if (!teacher || !teacher.lesson_types) return []
    
    const result = allTickets.filter(ticket => {
      const lessonType = TICKET_TO_LESSON_TYPE[ticket.ticket_type]
      return teacher.lesson_types.includes(lessonType)
    })
    
    return result
  }

  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher)
    setAvailableSlots([])
    setSelectedDate(null)
    fetchAvailableSlots(teacher.user_id)
  }

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot)
    setShowConfirmDialog(true)
  }

  const handleConfirmBooking = async () => {
    if (!selectedSlot || !selectedTeacher || !user) return

    setIsBooking(true)

    try {
      const availableTickets = getAvailableTicketsForTeacher(selectedTeacher)
      if (availableTickets.length === 0) {
        alert('No compatible tickets available')
        return
      }

      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: selectedSlot.originalSlotId,
          teacherUserId: selectedTeacher.user_id,
          studentUserId: user.id,
          ticketType: availableTickets[0].ticket_type,
          startTime: selectedSlot.start_time_utc,
          endTime: selectedSlot.end_time_utc
        })
      })

      const result = await response.json()

      if (response.ok) {
        alert('✅ Booking confirmed successfully!')
        router.push('/dashboard')
      } else {
        alert(`❌ Booking failed: ${result.error}`)
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`)
    } finally {
      setIsBooking(false)
    }
  }

  const splitSlotsInto55MinuteChunks = (slots) => {
    const splitSlots = []
    
    slots.forEach(slot => {
      const startTime = new Date(slot.start_time_utc)
      const endTime = new Date(slot.end_time_utc)
      
      let currentStart = new Date(startTime)
      
      while (currentStart < endTime) {
        const currentEnd = new Date(currentStart.getTime() + LESSON_DURATION_MINUTES * 60 * 1000)
        
        if (currentEnd <= endTime) {
          splitSlots.push({
            id: `${slot.id}-${currentStart.getTime()}`,
            originalSlotId: slot.id,
            teacher_id: slot.teacher_id,
            start_time_utc: currentStart.toISOString(),
            end_time_utc: currentEnd.toISOString(),
            is_available: slot.is_available
          })
        }
        
        currentStart = new Date(currentStart.getTime() + 60 * 60 * 1000)
      }
    })
    
    return splitSlots
  }

  const getSlotsByDate = () => {
    const splitSlots = splitSlotsInto55MinuteChunks(availableSlots)
    const grouped = {}
    
    splitSlots.forEach(slot => {
      const date = new Date(slot.start_time_utc).toLocaleDateString('en-GB', {
        timeZone: 'Europe/London'
      })
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(slot)
    })
    return grouped
  }

  const getDatesArray = () => {
    const dates = []
    const today = new Date()
    today.setDate(today.getDate() + 1)
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const slotsByDate = getSlotsByDate()
  const datesArray = getDatesArray()

  const formatTime = (utcTime) => {
    return new Date(utcTime).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London'
    })
  }

  const formatDateKey = (date) => {
    return date.toLocaleDateString('en-GB', { timeZone: 'Europe/London' })
  }

  const getSlotsForDate = (date) => {
    const dateKey = formatDateKey(date)
    return slotsByDate[dateKey] || []
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {showConfirmDialog && selectedSlot && (
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
              width: '90%'
            }}>
              <h2 style={{ marginTop: 0 }}>Confirm Booking</h2>
              
              <div style={{ margin: '20px 0', padding: '20px', background: '#f5f7fa', borderRadius: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Teacher:</strong> {selectedTeacher.display_name || selectedTeacher.full_name}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Date:</strong> {new Date(selectedSlot.start_time_utc).toLocaleDateString('en-GB', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: 'Europe/London'
                  })}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Time:</strong> {formatTime(selectedSlot.start_time_utc)} - {formatTime(selectedSlot.end_time_utc)} (London time)
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Duration: {LESSON_DURATION_MINUTES} minutes
                </div>
              </div>

              <p style={{ color: '#666', fontSize: '14px' }}>
                One ticket will be deducted from your account.
              </p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  onClick={() => {
                    setShowConfirmDialog(false)
                    setSelectedSlot(null)
                  }}
                  disabled={isBooking}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e1e5e9',
                    background: 'white',
                    cursor: isBooking ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={isBooking}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isBooking ? '#ccc' : '#6366f1',
                    color: 'white',
                    cursor: isBooking ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  {isBooking ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        )}

        {!selectedTeacher ? (
          <div style={{ 
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2>Choose Your Teacher</h2>
            <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
              📅 Bookings must be made at least 24 hours in advance
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px',
              marginTop: '20px'
            }}>
              {teachers.map((teacher) => {
                const availableTickets = getAvailableTicketsForTeacher(teacher)
                const canBook = availableTickets.length > 0
                
                return (
                  <div 
                    key={teacher.user_id}
                    onClick={() => canBook && handleSelectTeacher(teacher)}
                    style={{ 
                      padding: '20px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '15px',
                      backgroundColor: canBook ? 'white' : '#f5f5f5',
                      opacity: canBook ? 1 : 0.6,
                      cursor: canBook ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s'
                    }}
                  >
                    <h3 style={{ margin: '0 0 10px 0' }}>
                      {teacher.display_name || teacher.full_name}
                    </h3>
                    <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
                      {teacher.bio}
                    </p>
                    <div style={{ fontSize: '12px', marginBottom: '5px', color: '#888' }}>
                      Lesson types: {teacher.lesson_types ? teacher.lesson_types.join(', ') : 'None'}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: canBook ? '#10b981' : '#ef4444' }}>
                      {canBook ? `✅ Available` : '❌ No compatible tickets'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div style={{ 
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <button 
              onClick={() => {
                setSelectedTeacher(null)
                setAvailableSlots([])
                setSelectedDate(null)
              }}
              style={{
                padding: '10px 20px',
                marginBottom: '20px',
                borderRadius: '8px',
                border: 'none',
                background: '#6366f1',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              ← Back to teachers
            </button>
            
            <h2 style={{ marginBottom: '5px' }}>{selectedTeacher.display_name || selectedTeacher.full_name}</h2>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 20px 0' }}>
              📅 Select a date to see available times (London timezone) • Each lesson is {LESSON_DURATION_MINUTES} minutes
            </p>

            <div style={{
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
              paddingBottom: '15px',
              marginBottom: '20px'
            }}>
              {datesArray.map((date) => {
                const dateSlots = getSlotsForDate(date)
                const hasSlots = dateSlots.length > 0
                const isSelected = selectedDate && formatDateKey(selectedDate) === formatDateKey(date)
                
                return (
                  <div
                    key={date.toISOString()}
                    onClick={() => hasSlots && setSelectedDate(date)}
                    style={{
                      minWidth: '80px',
                      padding: '15px 10px',
                      borderRadius: '12px',
                      textAlign: 'center',
                      cursor: hasSlots ? 'pointer' : 'not-allowed',
                      background: isSelected ? '#6366f1' : hasSlots ? '#f0f1ff' : '#f5f5f5',
                      color: isSelected ? 'white' : hasSlots ? '#333' : '#999',
                      border: isSelected ? '2px solid #6366f1' : '2px solid transparent',
                      transition: 'all 0.2s',
                      opacity: hasSlots ? 1 : 0.5
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: '500', marginBottom: '5px' }}>
                      {date.toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'Europe/London' })}
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: '700' }}>
                      {date.toLocaleDateString('en-GB', { day: 'numeric', timeZone: 'Europe/London' })}
                    </div>
                    <div style={{ fontSize: '12px', marginTop: '5px' }}>
                      {date.toLocaleDateString('en-GB', { month: 'short', timeZone: 'Europe/London' })}
                    </div>
                    {hasSlots && (
                      <div style={{ 
                        fontSize: '10px', 
                        marginTop: '8px',
                        color: isSelected ? 'rgba(255,255,255,0.8)' : '#6366f1',
                        fontWeight: '600'
                      }}>
                        {dateSlots.length} slot{dateSlots.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {selectedDate && (
              <div style={{
                background: '#f8f9fa',
                borderRadius: '15px',
                padding: '20px'
              }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
                  {selectedDate.toLocaleDateString('en-GB', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric',
                    timeZone: 'Europe/London'
                  })}
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  {getSlotsForDate(selectedDate).map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotClick(slot)}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '10px',
                        border: '2px solid #6366f1',
                        background: 'white',
                        color: '#6366f1',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#6366f1'
                        e.currentTarget.style.color = 'white'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white'
                        e.currentTarget.style.color = '#6366f1'
                      }}
                    >
                      {formatTime(slot.start_time_utc)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!selectedDate && availableSlots.length > 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '30px', 
                color: '#666',
                background: '#f8f9fa',
                borderRadius: '15px'
              }}>
                👆 Select a date above to see available times
              </div>
            )}

            {availableSlots.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No available slots found. Please try again later or contact support.
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              padding: '12px 32px',
              background: '#1e293b',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
          >
            ← Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}
