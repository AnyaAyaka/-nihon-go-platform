'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function BookingPage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [currentTickets, setCurrentTickets] = useState(null)
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
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
    // ユーザーのタイムゾーンを自動検出
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
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

    // 現在のチケット残高を取得
    const { data: ticketsData } = await supabase
      .from('user_current_tickets')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setCurrentTickets(ticketsData)
    setLoading(false)
  }

  const fetchTeachers = async () => {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('is_active', true)
      .order('display_name')

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
      .order('day_of_week, local_start_time')

    if (error) {
      console.error('Error fetching availability:', error)
    } else {
      setTeacherAvailability(data || [])
    }
  }

  const selectTeacher = (teacher) => {
    setSelectedTeacher(teacher)
    setSelectedDate('')
    setSelectedTimeSlot(null)
    fetchTeacherAvailability(teacher.id)
  }

  const generateTimeSlots = (availability, date) => {
    if (!availability || !date) return []

    const selectedDateObj = new Date(date)
    const dayOfWeek = selectedDateObj.getDay() // 0=Sunday, 1=Monday

    const dayAvailability = availability.filter(slot => slot.day_of_week === dayOfWeek)
    if (dayAvailability.length === 0) return []

    const slots = []
    dayAvailability.forEach(slot => {
      const startTime = new Date(`${date} ${slot.local_start_time}`)
      const endTime = new Date(`${date} ${slot.local_end_time}`)
      
      // 25分スロットを生成
      let currentTime = new Date(startTime)
      while (currentTime < endTime) {
        const slotEnd = new Date(currentTime.getTime() + 25 * 60000) // 25分後
        if (slotEnd <= endTime) {
          slots.push({
            start: new Date(currentTime),
            end: slotEnd,
            teacherLocalTime: formatTimeInTimezone(currentTime, selectedTeacher.timezone),
            userLocalTime: formatTimeInTimezone(currentTime, userTimezone)
          })
        }
        currentTime = new Date(currentTime.getTime() + 30 * 60000) // 30分間隔
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
    if (!selectedTimeSlot || !currentTickets || currentTickets.remaining_tickets < 1) {
      alert('No tickets available or time slot not selected')
      return
    }

    setBooking(true)

    try {
      // UTC時間に変換
      const lessonStartUTC = selectedTimeSlot.start.toISOString()
      const lessonEndUTC = selectedTimeSlot.end.toISOString()

      // レッスン予約を作成
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
          tickets_used: 1
        })
        .select()
        .single()

      if (bookingError) throw bookingError

      // チケット使用履歴を記録
      const { error: usageError } = await supabase
        .from('ticket_usage_history')
        .insert({
          user_id: user.id,
          tickets_used: 1,
          reason: 'lesson_booking',
          lesson_date: selectedDate
        })

      if (usageError) throw usageError

      // チケット残数を減らす
      const { error: updateError } = await supabase
        .from('user_current_tickets')
        .update({
          remaining_tickets: currentTickets.remaining_tickets - 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (updateError) throw updateError

      alert('Lesson booked successfully! You will receive a Zoom link via email.')
// メール送信
try {
  // 生徒へのメール
  await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: user.email,
      subject: 'Lesson Booking Confirmation - Nihon GO!',
      html: `
        <h2>Lesson Booking Confirmed</h2>
        <p>Your Japanese lesson has been booked successfully!</p>
        <p><strong>Teacher:</strong> ${selectedTeacher.name}</p>
        <p><strong>Date:</strong> ${selectedDate}</p>
        <p><strong>Time:</strong> ${selectedTimeSlot.start.toLocaleString()}</p>
        <p>You will receive a Zoom link closer to the lesson time.</p>
      `
    })
  })

  // 講師へのメール  
  await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: selectedTeacher.email,
      subject: 'New Lesson Booking - Nihon GO!',
      html: `
        <h2>New Lesson Booking</h2>
        <p>You have a new lesson booking!</p>
        <p><strong>Student:</strong> ${user.email}</p>
        <p><strong>Date:</strong> ${selectedDate}</p>
        <p><strong>Time:</strong> ${selectedTimeSlot.start.toLocaleString()}</p>
      `
    })
  })
} catch (emailError) {
  console.error('Error sending email:', emailError)
  // メール送信エラーでも予約は成功しているので、警告のみ
}      
      // リセット
      setSelectedDate('')
      setSelectedTimeSlot(null)
      setCurrentTickets({ ...currentTickets, remaining_tickets: currentTickets.remaining_tickets - 1 })

    } catch (error) {
      console.error('Error booking lesson:', error)
      alert('Error booking lesson. Please try again.')
    } finally {
      setBooking(false)
    }
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const twoWeeksFromNow = new Date()
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14)
    return twoWeeksFromNow.toISOString().split('T')[0]
  }

  if (loading) return <div>Loading...</div>

  const hasTickets = currentTickets && currentTickets.remaining_tickets > 0
  const availableTimeSlots = selectedDate && selectedTeacher ? 
    generateTimeSlots(teacherAvailability, selectedDate) : []

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
              Schedule your Japanese lesson with our qualified teachers
            </p>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              padding: '10px 20px',
              background: hasTickets ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 
                         'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              color: 'white',
              borderRadius: '25px',
              marginBottom: '10px'
            }}>
              {currentTickets?.remaining_tickets || 0} tickets remaining
            </div>
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
              You need at least 1 ticket to book a lesson. Purchase a subscription to get started.
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
              Get Subscription
            </button>
          </div>
        )}

        {hasTickets && (
          <>
            {/* Teacher Selection */}
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
                {teachers.map((teacher) => (
                  <div 
                    key={teacher.id}
                    onClick={() => selectTeacher(teacher)}
                    style={{ 
                      padding: '20px',
                      border: selectedTeacher?.id === teacher.id ? '3px solid #667eea' : '2px solid #e1e5e9',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backgroundColor: selectedTeacher?.id === teacher.id ? '#f8f9ff' : 'white'
                    }}
                  >
                    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                      {teacher.display_name}
                    </h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                      {teacher.bio}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#999' }}>
                        🌍 {teacher.timezone}
                      </span>
                      <span style={{ fontSize: '12px', color: '#999' }}>
                        🗣️ {teacher.languages?.join(', ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date and Time Selection */}
            {selectedTeacher && (
              <div style={{ 
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                marginBottom: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Select Date & Time</h2>
                
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                    Choose Date:
                  </label>
                  <input 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value)
                      setSelectedTimeSlot(null)
                    }}
                    min={getMinDate()}
                    max={getMaxDate()}
                    style={{ 
                      padding: '12px',
                      borderRadius: '10px',
                      border: '2px solid #e1e5e9',
                      fontSize: '16px'
                    }}
                  />
                </div>

                {selectedDate && (
                  <div>
                    <h3 style={{ marginBottom: '15px', color: '#333' }}>
                      Available Times for {formatDateInTimezone(new Date(selectedDate), userTimezone)}
                    </h3>
                    
                    {availableTimeSlots.length === 0 ? (
                      <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                        No available time slots for this date. Please try another date.
                      </p>
                    ) : (
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                        gap: '15px' 
                      }}>
                        {availableTimeSlots.map((slot, index) => (
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
                              Your time ({userTimezone.split('/')[1]})
                            </div>
                            <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                              Teacher: {slot.teacherLocalTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
                      <strong>Date:</strong> {formatDateInTimezone(new Date(selectedDate), userTimezone)}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Your Time:</strong> {selectedTimeSlot.userLocalTime} ({userTimezone.split('/')[1]})
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Teacher Time:</strong> {selectedTimeSlot.teacherLocalTime} ({selectedTeacher.timezone.split('/')[1]})
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Duration:</strong> 25 minutes
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Cost:</strong> 1 ticket
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
