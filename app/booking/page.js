'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

const TICKET_TO_LESSON_TYPE = {
  'online_trial': 'online',
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
  const [selectedTicketType, setSelectedTicketType] = useState(null)
  const [teacherAvailability, setTeacherAvailability] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)
  const [userTimezone, setUserTimezone] = useState('UTC')
  const router = useRouter()

  useEffect(() => {
    checkUser()
    fetchTeachers()
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth')
      return
    }

    setUser(user)
    console.log('User:', user.id)

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setProfile(profileData)
    console.log('Profile:', profileData)

    // 全チケットタイプを取得
    const { data: ticketsData, error: ticketsError } = await supabase
      .from('user_current_tickets')
      .select('*')
      .eq('user_id', user.id)

    console.log('Tickets data:', ticketsData)
    console.log('Tickets error:', ticketsError)

    if (ticketsData) {
      const validTickets = ticketsData.filter(t => t.remaining_tickets > 0)
      console.log('Valid tickets:', validTickets)
      setAllTickets(validTickets)
    }
    
    setLoading(false)
  }

  const fetchTeachers = async () => {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('is_active', true)
      .order('display_name')

    console.log('Teachers:', data)
    console.log('Teachers error:', error)

    if (error) {
      console.error('Error fetching teachers:', error)
    } else {
      setTeachers(data || [])
    }
  }

  const fetchTeacherAvailability = async (teacherId) => {
    const { data, error } = await supabase
      .from('teacher_availability')
      .select('*')
      .eq('teacher_id', teacherId)
      .eq('is_available', true)
      .gte('start_time_utc', new Date().toISOString())
      .order('start_time_utc')

    if (error) {
      console.error('Error fetching availability:', error)
    } else {
      setTeacherAvailability(data || [])
    }
  }

  const getAvailableTicketsForTeacher = (teacher) => {
    if (!teacher || !teacher.lesson_types) return []
    
    return allTickets.filter(ticket => {
      const lessonType = TICKET_TO_LESSON_TYPE[ticket.ticket_type]
      return teacher.lesson_types.includes(lessonType)
    })
  }

  const selectTeacher = (teacher) => {
    setSelectedTeacher(teacher)
    setSelectedDate('')
    setSelectedTimeSlot(null)
    setSelectedTicketType(null)
    
    const availableTickets = getAvailableTicketsForTeacher(teacher)
    if (availableTickets.length > 0) {
      setSelectedTicketType(availableTickets[0].ticket_type)
    }
    
    fetchTeacherAvailability(teacher.id)
  }

  const generateTimeSlotsFromAvailability = (availability) => {
    if (!availability || availability.length === 0) return []
    
    const slots = []
    const now = new Date()
    
    availability.forEach(slot => {
      const startTime = new Date(slot.start_time_utc)
      const endTime = new Date(slot.end_time_utc)
      
      if (startTime < now) return
      
      let currentTime = new Date(startTime)
      while (currentTime < endTime) {
        const slotEnd = new Date(currentTime.getTime() + 25 * 60000)
        if (slotEnd <= endTime) {
          slots.push({
            start: new Date(currentTime),
            end: slotEnd,
            userLocalTime: formatTimeInTimezone(currentTime, userTimezone),
            teacherLocalTime: formatTimeInTimezone(currentTime, selectedTeacher.timezone)
          })
        }
        currentTime = new Date(currentTime.getTime() + 30 * 60000)
      }
    })
    
    return slots
  }

  const formatTimeInTimezone = (date, timezone) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date)
  }

  const formatDateInTimezone = (date, timezone) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const bookLesson = async () => {
    const selectedTicket = allTickets.find(t => t.ticket_type === selectedTicketType)
    
    if (!selectedTimeSlot || !selectedTicket || selectedTicket.remaining_tickets < 1) {
      alert('No tickets available or time slot not selected')
      return
    }

    setBooking(true)

    try {
      const lessonStartUTC = selectedTimeSlot.start.toISOString()
      const lessonEndUTC = selectedTimeSlot.end.toISOString()

      const { data: bookingData, error: bookingError } = await supabase
        .from('lesson_bookings')
        .insert({
          student_id: user.id,
          teacher_id: selectedTeacher.id,
          lesson_start_utc: lessonStartUTC,
          lesson_end_utc: lessonEndUTC,
          student_timezone: userTimezone,
          teacher_timezone: selectedTeacher.timezone,
          status: 'scheduled',
          tickets_used: 1,
          ticket_type: selectedTicketType
        })
        .select()
        .single()

      if (bookingError) throw bookingError

      const { error: updateError } = await supabase
        .from('user_current_tickets')
        .update({
          remaining_tickets: selectedTicket.remaining_tickets - 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('ticket_type', selectedTicketType)

      if (updateError) throw updateError

      alert('Lesson booked successfully!')

      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: user.email,
            subject: 'Lesson Booking Confirmation - Nihon GO!',
            html: `
              <h2>Lesson Booking Confirmed</h2>
              <p>Your Japanese lesson has been booked successfully!</p>
              <p><strong>Teacher:</strong> ${selectedTeacher.display_name}</p>
              <p><strong>Time:</strong> ${selectedTimeSlot.start.toLocaleString()}</p>
              <p>You will receive a Zoom link closer to the lesson time.</p>
            `
          })
        })
      } catch (emailError) {
        console.error('Error sending email:', emailError)
      }

      setSelectedDate('')
      setSelectedTimeSlot(null)
      checkUser()

    } catch (error) {
      console.error('Error booking lesson:', error)
      alert('Error booking lesson. Please try again.')
    } finally {
      setBooking(false)
    }
  }

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>

  const hasTickets = allTickets.length > 0
  const availableTimeSlots = selectedDate && selectedTeacher ? 
    generateTimeSlotsFromAvailability(teacherAvailability) : []

  console.log('Has tickets:', hasTickets)
  console.log('All tickets:', allTickets)

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 10px 0'
            }}>
              📅 Book a Lesson
            </h1>
            <p style={{ margin: 0, color: '#666' }}>
              Schedule your Japanese lesson
            </p>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            {allTickets.length > 0 ? (
              allTickets.map(ticket => (
                <div key={ticket.ticket_type} style={{ 
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  color: 'white',
                  borderRadius: '25px',
                  marginBottom: '10px',
                  fontSize: '14px'
                }}>
                  {ticket.ticket_type.replace('_', ' ')}: {ticket.remaining_tickets} tickets
                </div>
              ))
            ) : (
              <div style={{ padding: '10px 20px', color: '#999', fontSize: '14px' }}>
                No tickets found (check console)
              </div>
            )}
            <button 
              onClick={() => router.push('/dashboard')}
              style={{ 
                padding: '8px 16px', 
                background: 'transparent',
                color: '#667eea',
                border: '2px solid #667eea',
                borderRadius: '20px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {!hasTickets && (
          <div style={{ 
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#e74c3c', marginBottom: '15px' }}>No Tickets Available</h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              You need at least 1 ticket to book a lesson. (Check browser console for debug info)
            </p>
            <button 
              onClick={() => router.push('/subscription')}
              style={{ 
                padding: '12px 25px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Get Tickets
            </button>
          </div>
        )}

        {hasTickets && (
          <>
            <div style={{ 
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              marginBottom: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ marginBottom: '20px', color: '#333' }}>Choose Your Teacher</h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '20px' 
              }}>
                {teachers.map((teacher) => {
                  const availableTickets = getAvailableTicketsForTeacher(teacher)
                  const canBook = availableTickets.length > 0
                  
                  return (
                    <div 
                      key={teacher.id}
                      onClick={() => canBook && selectTeacher(teacher)}
                      style={{ 
                        padding: '20px',
                        border: selectedTeacher?.id === teacher.id ? '3px solid #667eea' : '2px solid #e1e5e9',
                        borderRadius: '15px',
                        cursor: canBook ? 'pointer' : 'not-allowed',
                        transition: 'all 0.3s ease',
                        backgroundColor: selectedTeacher?.id === teacher.id ? '#f8f9ff' : 
                                        canBook ? 'white' : '#f5f5f5',
                        opacity: canBook ? 1 : 0.6
                      }}
                    >
                      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                        {teacher.display_name}
                      </h3>
                      <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                        {teacher.bio}
                      </p>
                      <div style={{ fontSize: '12px', color: canBook ? '#4CAF50' : '#999', marginBottom: '5px' }}>
                        {teacher.lesson_types ? teacher.lesson_types.join(', ') : 'No lesson types set'}
                      </div>
                      {!canBook && (
                        <div style={{ fontSize: '12px', color: '#e74c3c', fontWeight: '600' }}>
                          No compatible tickets
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {selectedTeacher && (
              <div style={{ 
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                marginBottom: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Available Times</h2>
                
                {availableTimeSlots.length === 0 ? (
                  <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                    No available time slots. Please try another teacher or sync the calendar.
                  </p>
                ) : (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                    gap: '15px' 
                  }}>
                    {availableTimeSlots.slice(0, 20).map((slot, index) => (
                      <div 
                        key={index}
                        onClick={() => setSelectedTimeSlot(slot)}
                        style={{ 
                          padding: '15px',
                          border: selectedTimeSlot === slot ? '3px solid #4CAF50' : '2px solid #e1e5e9',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          backgroundColor: selectedTimeSlot === slot ? '#f0f8f0' : 'white'
                        }}
                      >
                        <div style={{ fontWeight: '600', color: '#333', marginBottom: '5px' }}>
                          {slot.userLocalTime}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {formatDateInTimezone(slot.start, userTimezone).split(',')[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTimeSlot && (
                  <div style={{ 
                    marginTop: '25px',
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '10px'
                  }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Booking Summary</h4>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Teacher:</strong> {selectedTeacher.display_name}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Time:</strong> {selectedTimeSlot.userLocalTime}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Date:</strong> {formatDateInTimezone(selectedTimeSlot.start, userTimezone)}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Ticket Type:</strong> {selectedTicketType?.replace('_', ' ')}
                    </p>
                    
                    <button 
                      onClick={bookLesson}
                      disabled={booking}
                      style={{ 
                        width: '100%',
                        padding: '15px',
                        marginTop: '15px',
                        background: booking ? '#ccc' : 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: booking ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {booking ? 'Booking...' : 'Confirm Booking'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
