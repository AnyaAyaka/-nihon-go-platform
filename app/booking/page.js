'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

const TICKET_TO_LESSON_TYPE = {
  'online_trial': 'online_trial',
  'online': 'online',
  'in_person': 'in_person',
  'premium': 'premium'
}

export default function BookingPage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [allTickets, setAllTickets] = useState([])
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const router = useRouter()

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
      .select('user_id, email, full_name, display_name, bio, lesson_types')
      .eq('role', 'teacher')
      .order('display_name')

    setTeachers(data || [])
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
      .limit(50)

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
      // 利用可能なチケットから最初のものを使用
      const availableTickets = getAvailableTicketsForTeacher(selectedTeacher)
      if (availableTickets.length === 0) {
        alert('No compatible tickets available')
        return
      }

      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: selectedSlot.id,
          teacherUserId: selectedTeacher.user_id,
          studentUserId: user.id,
          ticketType: availableTickets[0].ticket_type
        })
      })

      const result = await response.json()

      if (response.ok) {
        alert('✅ Booking confirmed successfully!')
        setShowConfirmDialog(false)
        setSelectedSlot(null)
        
        // チケット情報を再取得
        await checkUser()
        
        // スロット情報を再取得
        await fetchAvailableSlots(selectedTeacher.user_id)
      } else {
        alert(`❌ Booking failed: ${result.error}`)
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`)
    } finally {
      setIsBooking(false)
    }
  }

  const formatSlotTime = (utcTime) => {
    const date = new Date(utcTime)
    return date.toLocaleString('en-GB', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London'
    })
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* 確認ダイアログ */}
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
                  <strong>Time:</strong> {formatSlotTime(selectedSlot.start_time_utc)}
                </div>
                <div>
                  <strong>Date:</strong> {new Date(selectedSlot.start_time_utc).toLocaleDateString('en-GB', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
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
            
            <h2 style={{ marginBottom: '10px' }}>{selectedTeacher.display_name || selectedTeacher.full_name}</h2>
            <h3 style={{ color: '#666', fontWeight: '400' }}>Available Time Slots</h3>
            <p style={{ color: '#888', fontSize: '14px', marginTop: '5px' }}>
              📅 Showing slots available 24+ hours from now
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: '15px',
              marginTop: '20px'
            }}>
              {availableSlots.map((slot) => (
                <div 
                  key={slot.id}
                  onClick={() => handleSlotClick(slot)}
                  style={{ 
                    padding: '15px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1'
                    e.currentTarget.style.backgroundColor = '#f0f1ff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e1e5e9'
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  <div style={{ fontWeight: '600', fontSize: '16px' }}>
                    {formatSlotTime(slot.start_time_utc)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    {new Date(slot.start_time_utc).toLocaleDateString('en-GB', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              ))}
            </div>

            {availableSlots.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No available slots found. Please try again later or contact support.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
