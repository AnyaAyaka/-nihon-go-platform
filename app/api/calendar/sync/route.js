import { NextResponse } from 'next/server'
import { getFreeBusyInfo } from '../../../../lib/googleCalendar'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function formatTimeOnly(date) {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

export async function POST(request) {
  try {
    const { teacherId } = await request.json()
    
    if (!teacherId) {
      return NextResponse.json({ error: 'Teacher ID required' }, { status: 400 })
    }

    const { data: teacher, error: teacherError } = await supabase
      .from('teachers')
      .select('*')
      .eq('user_id', teacherId)
      .single()

    if (teacherError || !teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
    }

    if (!teacher.google_access_token || !teacher.google_refresh_token) {
      return NextResponse.json({ error: 'Google Calendar not connected' }, { status: 400 })
    }

    const { data: workingHours, error: hoursError } = await supabase
      .from('teacher_working_hours')
      .select('*')
      .eq('teacher_id', teacher.id)
      .eq('is_active', true)

    if (hoursError || !workingHours || workingHours.length === 0) {
      return NextResponse.json({ error: 'No working hours set. Please set your working hours first.' }, { status: 400 })
    }

    const timeMin = new Date().toISOString()
    const timeMax = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()

    let freeBusyData
    try {
      freeBusyData = await getFreeBusyInfo(
        teacher.google_calendar_id || 'primary',
        timeMin,
        timeMax,
        teacher.google_access_token,
        teacher.google_refresh_token
      )
    } catch (error) {
      if (error.message?.includes('invalid_grant') || error.code === 401) {
        // トークンが無効 - 再認証が必要
        await supabase
          .from('teachers')
          .update({
            google_access_token: null,
            google_refresh_token: null
          })
          .eq('id', teacher.id)
        
        return NextResponse.json({ 
          error: 'reconnect_required',
          message: 'Google Calendar connection expired. Please reconnect.'
        }, { status: 401 })
      }
      throw error
    }

    await supabase
      .from('teacher_availability')
      .delete()
      .eq('teacher_id', teacher.id)
      .gte('start_time_utc', timeMin)

    const availabilitySlots = []
    const busyTimes = freeBusyData.busy || []

    for (let day = 0; day < 14; day++) {
      const currentDate = new Date(Date.now() + day * 24 * 60 * 60 * 1000)
      const dayOfWeek = currentDate.getDay()
      
      const dayWorkingHours = workingHours.filter(wh => wh.day_of_week === dayOfWeek)
      
      if (dayWorkingHours.length === 0) continue

      dayWorkingHours.forEach(workingHour => {
        const [startHour, startMin] = workingHour.start_time.split(':')
        const [endHour, endMin] = workingHour.end_time.split(':')
        
        const dayStart = new Date(currentDate)
        dayStart.setHours(parseInt(startHour), parseInt(startMin), 0, 0)
        
        const dayEnd = new Date(currentDate)
        dayEnd.setHours(parseInt(endHour), parseInt(endMin), 0, 0)

        const dayBusyTimes = busyTimes.filter(busy => {
          const busyStart = new Date(busy.start)
          const busyEnd = new Date(busy.end)
          return busyStart < dayEnd && busyEnd > dayStart
        }).sort((a, b) => new Date(a.start) - new Date(b.start))

        let currentSlotStart = dayStart
        
        for (const busy of dayBusyTimes) {
          const busyStart = new Date(busy.start)
          const busyEnd = new Date(busy.end)
          
          if (currentSlotStart < busyStart) {
            const slotEnd = busyStart < dayEnd ? busyStart : dayEnd
            
            const slot = {
              teacher_id: teacher.id,
              day_of_week: dayOfWeek,
              start_time_utc: currentSlotStart.toISOString(),
              end_time_utc: slotEnd.toISOString(),
              local_start_time: formatTimeOnly(currentSlotStart),
              local_end_time: formatTimeOnly(slotEnd),
              is_available: true
            }
            
            availabilitySlots.push(slot)
          }
          
          currentSlotStart = busyEnd > currentSlotStart ? busyEnd : currentSlotStart
        }

        if (currentSlotStart < dayEnd) {
          const slot = {
            teacher_id: teacher.id,
            day_of_week: dayOfWeek,
            start_time_utc: currentSlotStart.toISOString(),
            end_time_utc: dayEnd.toISOString(),
            local_start_time: formatTimeOnly(currentSlotStart),
            local_end_time: formatTimeOnly(dayEnd),
            is_available: true
          }
          
          availabilitySlots.push(slot)
        }
      })
    }

    if (availabilitySlots.length > 0) {
      const { error: insertError } = await supabase
        .from('teacher_availability')
        .insert(availabilitySlots)

      if (insertError) {
        console.error('Error inserting availability:', insertError)
        return NextResponse.json({ error: 'Failed to save availability' }, { status: 500 })
      }
    }

    return NextResponse.json({ 
      success: true, 
      slotsCreated: availabilitySlots.length,
      message: 'Calendar synced successfully'
    })

  } catch (error) {
    console.error('Error syncing calendar:', error)
    return NextResponse.json({ error: error.message || 'Failed to sync calendar' }, { status: 500 })
  }
}
