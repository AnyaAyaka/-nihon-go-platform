'use client'

import { useState, useEffect, Suspense } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'

// チケット種別 → 講師の対応可否を照合するための lesson_type（teachers.lesson_types と突き合わせる）。
// in_person_90 は teachers.lesson_types に存在しないため、in_person 対応講師 = 90分も可 とみなす。
const TICKET_TO_LESSON_TYPE = {
  'online_trial': 'online_trial',
  'online': 'online',
  'inperson_trial': 'in_person',
  'in_person': 'in_person',
  'in_person_90': 'in_person',
  'premium': 'premium',
  // ペアチケット。講師の絞り込みは通常チケットと同じ扱い
  'online_trial_pair': 'online_trial',
  'online_pair': 'online',
  'inperson_trial_pair': 'in_person',
  'in_person_pair': 'in_person'
}

// 予約画面でチケット名を表示するためのラベル
const TICKET_LABELS = {
  'online_trial': 'Online Trial',
  'online': 'Online',
  'inperson_trial': 'In-Person Trial',
  'in_person': 'In-Person',
  'in_person_90': 'In-Person (90 min)',
  'premium': 'Premium',
  'online_trial_pair': 'Online Trial (2 learners)',
  'online_pair': 'Online (2 learners)',
  'inperson_trial_pair': 'In-Person Trial (2 learners)',
  'in_person_pair': 'In-Person (2 learners)'
}

// レッスン尺の設計:
//  - 実尺 (actual): bookings.end_time / 確認画面 / メールに使う値。標準55分、in_person_90 は85分。
//    スロットが「空き枠に収まるか」の判定にも実尺を使う（既存55分の挙動を維持）。
//  - バッファ (buffer): 実尺の後ろに付く占有分。重複判定のフットプリント [start, end+buffer) に使う。
//    → 実質の占有は 標準60分 / 90分だが、これは「重複判定」にのみ効かせ、開始候補の刻みには使わない。
//  - ステップ (step): 開始候補の刻み。各空き枠の開始を起点に 30分刻み で候補を出す（従来は60分固定）。
//    60は30の倍数なので、旧・毎時開始スロットは新スロットの部分集合＝従来スロットは必ず残る。
// キーは ticket_type / lesson_type どちらでも引ける（値の体系が共通）。
const LESSON_BUFFER_MINUTES = 5
const SLOT_STEP_MINUTES = 30
const LESSON_DURATIONS = {
  'online_trial': 55,
  'online': 55,
  'inperson_trial': 55,
  'in_person': 55,
  'in_person_90': 85,
  'premium': 55,
  'online_trial_pair': 55,
  'online_pair': 55,
  'inperson_trial_pair': 55,
  'in_person_pair': 55
}
const DEFAULT_LESSON_MINUTES = 55
// 実尺（分）
const lessonMinutes = (type) => LESSON_DURATIONS[type] ?? DEFAULT_LESSON_MINUTES

function BookingContent() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [allTickets, setAllTickets] = useState([])
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [existingBookings, setExistingBookings] = useState([])
  const [selectedTicketType, setSelectedTicketType] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const locationFilter = searchParams.get('location')

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user) {
      fetchTeachers()
    }
  }, [user])

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
    // まず全講師を取得
    const { data } = await supabase
      .from('profiles')
      .select('user_id, email, full_name, display_name, bio, lesson_types, location')
      .eq('role', 'teacher')
      .order('display_name')

    let filteredData = data || []

    // ロケーションフィルター
    if (locationFilter) {
      filteredData = filteredData.filter(t => t.location === locationFilter)
    }

    // 制限テーブルをチェック（この生徒に非表示の講師を除外）
    if (user) {
      const { data: restrictions } = await supabase
        .from('teacher_student_restrictions')
        .select('teacher_id')
        .eq('student_id', user.id)

      if (restrictions && restrictions.length > 0) {
        // teachersテーブルからuser_idを取得して照合
        const { data: teachersData } = await supabase
          .from('teachers')
          .select('id, user_id')

        const restrictedTeacherUserIds = restrictions.map(r => {
          const teacher = teachersData?.find(t => t.id === r.teacher_id)
          return teacher?.user_id
        }).filter(Boolean)

        filteredData = filteredData.filter(t => !restrictedTeacherUserIds.includes(t.user_id))
      }
    }

    // ロケーション優先で並べ替え: London -> Manchester -> East Coast(online) -> その他
    const locationRank = (loc) => {
      const l = (loc || '').toLowerCase()
      if (l === 'london') return 0
      if (l === 'manchester') return 1
      if (l === 'online') return 2
      return 3
    }
    filteredData = [...filteredData].sort((a, b) => {
      const rankDiff = locationRank(a.location) - locationRank(b.location)
      if (rankDiff !== 0) return rankDiff
      // 同じロケーション内は display_name 順
      return (a.display_name || '').localeCompare(b.display_name || '')
    })

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

    // 既存予約（キャンセル以外・未来分）を取得し、スロットの重複除外に使う。
    // 90分予約(占有90分)と55分スロット、およびその逆の重複を時間レンジで弾く。
    const { data: bookings } = await supabase
      .from('bookings')
      .select('start_time, end_time, status, lesson_type')
      .eq('teacher_id', teacherData.id)
      .neq('status', 'cancelled')
      .gte('end_time', minBookingTime.toISOString())
      .order('start_time')

    setExistingBookings(bookings || [])
  }

  const getAvailableTicketsForTeacher = (teacher) => {
    if (!teacher || !teacher.lesson_types) return []
    
    const result = allTickets.filter(ticket => {
      const lessonType = TICKET_TO_LESSON_TYPE[ticket.ticket_type]
      return teacher.lesson_types.includes(lessonType)
    })
    
    return result
  }

  // この講師で使えるチケット種別（重複排除）をレッスン選択肢として返す
  const getLessonOptionsForTeacher = (teacher) => {
    const tickets = getAvailableTicketsForTeacher(teacher)
    const seen = new Set()
    const options = []
    tickets.forEach((t) => {
      if (seen.has(t.ticket_type)) return
      seen.add(t.ticket_type)
      options.push({
        ticketType: t.ticket_type,
        label: TICKET_LABELS[t.ticket_type] || t.ticket_type,
        minutes: lessonMinutes(t.ticket_type)
      })
    })
    return options
  }

  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher)
    setAvailableSlots([])
    setExistingBookings([])
    setSelectedDate(null)
    const options = getLessonOptionsForTeacher(teacher)
    // 既定は従来通り先頭のチケット（＝現行挙動を維持）
    setSelectedTicketType(options[0]?.ticketType || null)
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

      // 選択中のレッスン種別（既定は先頭）。90分は in_person_90 が渡る。
      const ticketType = (selectedTicketType && availableTickets.some(t => t.ticket_type === selectedTicketType))
        ? selectedTicketType
        : availableTickets[0].ticket_type

      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: selectedSlot.originalSlotId,
          teacherUserId: selectedTeacher.user_id,
          studentUserId: user.id,
          ticketType,
          startTime: selectedSlot.start_time_utc,
          endTime: selectedSlot.end_time_utc
        })
      })

      const result = await response.json()

      if (response.ok) {
        alert('Booking confirmed successfully!')
        router.push('/dashboard')
      } else {
        alert(`Booking failed: ${result.error}`)
      }
    } catch (error) {
      alert(`Error: ${error.message}`)
    } finally {
      setIsBooking(false)
    }
  }

  // 指定チケット種別の実尺に基づいてスロットを生成する。
  //  - 枠内判定は実尺（start + 実尺 <= 枠終了）。既存の55分挙動に合わせる。
  //  - 開始候補は各空き枠の開始起点から 30分刻み（12:30/15:30 等の開始に対応）。
  //  - 既存予約との重複はフットプリント [start, end + バッファ) 同士のレンジ重なりで除外。
  //    これにより 90分予約が55分スロットを弾き、逆も成立する。空き枠は誤除外しない
  //    （バッファは既存予約に対してのみ効く）。
  const generateSlots = (slots, ticketType, bookings) => {
    if (!ticketType) return []
    const actualMs = lessonMinutes(ticketType) * 60 * 1000
    const stepMs = SLOT_STEP_MINUTES * 60 * 1000
    const bufferMs = LESSON_BUFFER_MINUTES * 60 * 1000

    // 既存予約のフットプリント（占有区間）を先に算出
    const bookedRanges = (bookings || []).map(b => ({
      start: new Date(b.start_time).getTime(),
      end: new Date(b.end_time).getTime() + bufferMs
    }))

    const result = []
    slots.forEach(slot => {
      const availStart = new Date(slot.start_time_utc)
      const availEnd = new Date(slot.end_time_utc)

      let currentStart = new Date(availStart)
      while (currentStart < availEnd) {
        const currentEnd = new Date(currentStart.getTime() + actualMs)

        if (currentEnd <= availEnd) {
          const candStart = currentStart.getTime()
          const candEnd = currentEnd.getTime() + bufferMs // 候補もバッファ込みで判定
          const overlaps = bookedRanges.some(r => candStart < r.end && candEnd > r.start)

          if (!overlaps) {
            result.push({
              id: `${slot.id}-${currentStart.getTime()}`,
              originalSlotId: slot.id,
              teacher_id: slot.teacher_id,
              start_time_utc: currentStart.toISOString(),
              end_time_utc: currentEnd.toISOString(), // 実尺
              is_available: slot.is_available
            })
          }
        }

        currentStart = new Date(currentStart.getTime() + stepMs)
      }
    })

    return result
  }

  const getSlotsByDate = () => {
    const splitSlots = generateSlots(availableSlots, selectedTicketType, existingBookings)
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
                  Lesson: {TICKET_LABELS[selectedTicketType] || 'In-Person'} · {lessonMinutes(selectedTicketType)} minutes
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
              Bookings must be made at least 24 hours in advance
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
                      {canBook ? 'Available' : 'No compatible tickets'}
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
              Back to teachers
            </button>
            
            <h2 style={{ marginBottom: '5px' }}>{selectedTeacher.display_name || selectedTeacher.full_name}</h2>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 20px 0' }}>
              Select a date to see available times (London timezone)
            </p>

            {/* レッスン種別トグル: 90分チケット保有者にのみ表示（非保有者のUIは従来と同一） */}
            {(() => {
              const options = getLessonOptionsForTeacher(selectedTeacher)
              const has90 = options.some((o) => o.ticketType === 'in_person_90')
              if (!has90 || options.length < 2) return null
              return (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {options.map((opt) => {
                    const isSelected = selectedTicketType === opt.ticketType
                    return (
                      <button
                        key={opt.ticketType}
                        onClick={() => {
                          setSelectedTicketType(opt.ticketType)
                          setSelectedDate(null)
                        }}
                        style={{
                          padding: '10px 18px',
                          borderRadius: '10px',
                          border: isSelected ? '2px solid #6366f1' : '2px solid #e1e5e9',
                          background: isSelected ? '#6366f1' : 'white',
                          color: isSelected ? 'white' : '#333',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {opt.label} · {opt.minutes} min
                      </button>
                    )
                  })}
                </div>
              )
            })()}

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
                Select a date above to see available times
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
            Back to Dashboard
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