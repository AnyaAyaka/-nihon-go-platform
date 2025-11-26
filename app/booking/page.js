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
  const [debugInfo, setDebugInfo] = useState([])
  const router = useRouter()

  useEffect(() => {
    checkUser()
    fetchTeachers()
  }, [])

  const addDebug = (msg) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])
  }

  const checkUser = async () => {
    addDebug('Starting checkUser')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth')
      return
    }

    setUser(user)
    addDebug(`User found: ${user.id}`)

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setProfile(profileData)
    addDebug(`Profile loaded`)

    const { data: ticketsData } = await supabase
      .from('user_current_tickets')
      .select('*')
      .eq('user_id', user.id)

    if (ticketsData) {
      const validTickets = ticketsData.filter(t => t.remaining_tickets > 0)
      setAllTickets(validTickets)
      addDebug(`Tickets: ${validTickets.length}`)
    }
  }

  const fetchTeachers = async () => {
    addDebug('Fetching teachers...')
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'teacher')
      .order('display_name')

    addDebug(`Teachers query result: ${data?.length || 0} teachers, Error: ${error?.message || 'none'}`)
    
    if (data) {
      data.forEach(t => {
        addDebug(`Teacher: ${t.display_name}, lesson_types: ${JSON.stringify(t.lesson_types)}`)
      })
    }

    setTeachers(data || [])
  }

  const getAvailableTicketsForTeacher = (teacher) => {
    if (!teacher || !teacher.lesson_types) return []
    
    const result = allTickets.filter(ticket => {
      const lessonType = TICKET_TO_LESSON_TYPE[ticket.ticket_type]
      const match = teacher.lesson_types.includes(lessonType)
      addDebug(`Matching ${ticket.ticket_type} -> ${lessonType} against ${teacher.lesson_types.join(',')}: ${match}`)
      return match
    })
    
    return result
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Debug Info */}
        <div style={{ 
          background: '#1e293b',
          color: '#10b981',
          padding: '15px',
          borderRadius: '10px',
          marginBottom: '20px',
          fontFamily: 'monospace',
          fontSize: '12px',
          maxHeight: '200px',
          overflow: 'auto'
        }}>
          <strong>DEBUG LOG:</strong><br/>
          {debugInfo.map((info, i) => (
            <div key={i}>{info}</div>
          ))}
        </div>

        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2>Choose Your Teacher ({teachers.length} found)</h2>
          
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
                  style={{ 
                    padding: '20px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '15px',
                    backgroundColor: canBook ? 'white' : '#f5f5f5',
                    opacity: canBook ? 1 : 0.6
                  }}
                >
                  <h3 style={{ margin: '0 0 10px 0' }}>
                    {teacher.display_name}
                  </h3>
                  <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
                    {teacher.bio}
                  </p>
                  <div style={{ fontSize: '12px', marginBottom: '5px' }}>
                    Lesson types: {teacher.lesson_types ? teacher.lesson_types.join(', ') : 'None'}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: '600' }}>
                    {canBook ? `✅ Can book (${availableTickets.length} compatible tickets)` : '❌ No compatible tickets'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
