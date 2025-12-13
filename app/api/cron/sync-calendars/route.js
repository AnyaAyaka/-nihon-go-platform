import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getFreeBusyInfo } from '../../../../lib/googleCalendar'

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

export async function GET(request) {
  // Vercel Cron認証チェック
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // ローカルテスト用にCRON_SECRETがない場合はスキップ
    if (process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    // Google Calendar連携済みの全講師を取得
    const { data: teachers, error: teachersError } = await supabase
      .from('teachers')
      .select('*')
      .not('google_refresh_token', 'is', null)

    if (teachersError) {
      console.error('Error fetching teachers:', teachersError)
      return NextResponse.json({ error: 'Failed to fetch teachers' }, { status: 500 })
    }

    const results = []

    for (const teacher of teachers) {
      try {
        // Working Hoursを取得
        const { data: workingHours } = await supabase
          .from('teacher_working_hours')
          .select('*')
          .eq('teacher_id', teacher.id)
          .eq('is_active', true)

        if (!workingHours || workingHours.length === 0) {
          results.push({ teacher: teacher.id, status: 'skipped', reason: 'No working hours' })
          continue
        }

        // Google Calendar から busy 時間を取得
        const timeMin = new Date().toISOString()
        const timeMax = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()

        const freeBusyData = await getFreeBusyInfo(
          teacher.google_calendar_id || 'primary',
          timeMin,
          timeMax,
          teacher.google_access_token,
          teacher.google_refresh_token
        )

        // 既存のスロットを削除
        await supabase
          .from('teacher_availability')
          .delete()
          .eq('teacher_id', teacher.id)
          .gte('start_time_utc', timeMin)

        // 新しいスロットを計算
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
                availabilitySlots.push({
                  teacher_id: teacher.id,
                  day_of_week: dayOfWeek,
                  start_time_utc: currentSlotStart.toISOString(),
                  end_time_utc: slotEnd.toISOString(),
                  local_start_time: formatTimeOnly(currentSlotStart),
                  local_end_time: formatTimeOnly(slotEnd),
                  is_available: true
                })
              }
              currentSlotStart = busyEnd > currentSlotStart ? busyEnd : currentSlotStart
            }

            if (currentSlotStart < dayEnd) {
              availabilitySlots.push({
                teacher_id: teacher.id,
                day_of_week: dayOfWeek,
                start_time_utc: currentSlotStart.toISOString(),
                end_time_utc: dayEnd.toISOString(),
                local_start_time: formatTimeOnly(currentSlotStart),
                local_end_time: formatTimeOnly(dayEnd),
                is_available: true
              })
            }
          })
        }

        // スロットを保存
        if (availabilitySlots.length > 0) {
          await supabase
            .from('teacher_availability')
            .insert(availabilitySlots)
        }

        results.push({ 
          teacher: teacher.id, 
          status: 'success', 
          slotsCreated: availabilitySlots.length 
        })

      } catch (error) {
        console.error(`Error syncing teacher ${teacher.id}:`, error)
        results.push({ teacher: teacher.id, status: 'error', reason: error.message })
      }
    }

    return NextResponse.json({ 
      success: true, 
      syncedAt: new Date().toISOString(),
      results 
    })

  } catch (error) {
    console.error('Cron sync error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
