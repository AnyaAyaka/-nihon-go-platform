import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getFreeBusyInfo } from '../../../../lib/googleCalendar'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const TEACHER_TZ = 'Europe/London'

// Get the UTC offset (in minutes) for a given instant in the teacher's timezone.
// Positive means ahead of UTC (e.g. BST = +60).
function getTzOffsetMinutes(date, timeZone) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })
  const parts = dtf.formatToParts(date).reduce((acc, p) => {
    acc[p.type] = p.value
    return acc
  }, {})
  const asUTC = Date.UTC(
    parseInt(parts.year), parseInt(parts.month) - 1, parseInt(parts.day),
    parseInt(parts.hour), parseInt(parts.minute), parseInt(parts.second)
  )
  return Math.round((asUTC - date.getTime()) / 60000)
}

// Build a UTC Date for a wall-clock time (HH:mm) on a given calendar day,
// interpreted in the teacher's timezone, correctly handling DST.
function wallClockToUtc(year, month, day, hour, minute, timeZone) {
  // First guess: treat the wall time as if it were UTC.
  let utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0)
  // Find the timezone offset at that instant and correct for it.
  const offset = getTzOffsetMinutes(new Date(utcGuess), timeZone)
  return new Date(utcGuess - offset * 60000)
}

// Return {year, month, day, dayOfWeek} for a Date as seen in the teacher's timezone.
function localDateParts(date, timeZone) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone, weekday: 'short',
    year: 'numeric', month: '2-digit', day: '2-digit'
  })
  const parts = dtf.formatToParts(date).reduce((acc, p) => {
    acc[p.type] = p.value
    return acc
  }, {})
  const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return {
    year: parseInt(parts.year),
    month: parseInt(parts.month),
    day: parseInt(parts.day),
    dayOfWeek: weekdayMap[parts.weekday]
  }
}

// Format a UTC instant as HH:mm:ss wall-clock in the teacher's timezone.
function formatLocalTime(date, timeZone) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone, hour12: false,
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(date)
}

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    if (process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
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
        const { data: workingHours } = await supabase
          .from('teacher_working_hours')
          .select('*')
          .eq('teacher_id', teacher.id)
          .eq('is_active', true)

        if (!workingHours || workingHours.length === 0) {
          results.push({ teacher: teacher.id, status: 'skipped', reason: 'No working hours' })
          continue
        }

        const now = new Date()
        const timeMin = now.toISOString()
        const timeMax = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()

        // getFreeBusyInfo returns { busy, refreshedTokens? }
        const fb = await getFreeBusyInfo(
          teacher.google_calendar_id || 'primary',
          timeMin,
          timeMax,
          teacher.google_access_token,
          teacher.google_refresh_token
        )

        // Persist refreshed access token back to DB so it doesn't show as expired
        if (fb.refreshedTokens && fb.refreshedTokens.access_token) {
          await supabase
            .from('teachers')
            .update({
              google_access_token: fb.refreshedTokens.access_token,
              google_token_expires_at: fb.refreshedTokens.expiry_date
                ? new Date(fb.refreshedTokens.expiry_date).toISOString()
                : null
            })
            .eq('id', teacher.id)
        }

        // Delete ALL future slots for this teacher (>= start of today, teacher TZ)
        // to prevent duplicate accumulation across multiple sync runs.
        const todayParts = localDateParts(now, TEACHER_TZ)
        const startOfTodayUtc = wallClockToUtc(
          todayParts.year, todayParts.month, todayParts.day, 0, 0, TEACHER_TZ
        )
        await supabase
          .from('teacher_availability')
          .delete()
          .eq('teacher_id', teacher.id)
          .gte('start_time_utc', startOfTodayUtc.toISOString())

        const availabilitySlots = []
        const busyTimes = fb.busy || []

        for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
          const dayInstant = new Date(now.getTime() + dayOffset * 24 * 60 * 60 * 1000)
          const { year, month, day, dayOfWeek } = localDateParts(dayInstant, TEACHER_TZ)

          const dayWorkingHours = workingHours.filter(wh => wh.day_of_week === dayOfWeek)
          if (dayWorkingHours.length === 0) continue

          dayWorkingHours.forEach(workingHour => {
            const [startHour, startMin] = workingHour.start_time.split(':').map(Number)
            const [endHour, endMin] = workingHour.end_time.split(':').map(Number)

            const dayStart = wallClockToUtc(year, month, day, startHour, startMin, TEACHER_TZ)
            const dayEnd = wallClockToUtc(year, month, day, endHour, endMin, TEACHER_TZ)

            const dayBusyTimes = busyTimes
              .filter(busy => {
                const bs = new Date(busy.start)
                const be = new Date(busy.end)
                return bs < dayEnd && be > dayStart
              })
              .sort((a, b) => new Date(a.start) - new Date(b.start))

            let cursor = dayStart

            for (const busy of dayBusyTimes) {
              const bs = new Date(busy.start)
              const be = new Date(busy.end)

              if (cursor < bs) {
                const slotEnd = bs < dayEnd ? bs : dayEnd
                availabilitySlots.push({
                  teacher_id: teacher.id,
                  day_of_week: dayOfWeek,
                  start_time_utc: cursor.toISOString(),
                  end_time_utc: slotEnd.toISOString(),
                  local_start_time: formatLocalTime(cursor, TEACHER_TZ),
                  local_end_time: formatLocalTime(slotEnd, TEACHER_TZ),
                  is_available: true
                })
              }
              cursor = be > cursor ? be : cursor
            }

            if (cursor < dayEnd) {
              availabilitySlots.push({
                teacher_id: teacher.id,
                day_of_week: dayOfWeek,
                start_time_utc: cursor.toISOString(),
                end_time_utc: dayEnd.toISOString(),
                local_start_time: formatLocalTime(cursor, TEACHER_TZ),
                local_end_time: formatLocalTime(dayEnd, TEACHER_TZ),
                is_available: true
              })
            }
          })
        }

        if (availabilitySlots.length > 0) {
          await supabase
            .from('teacher_availability')
            .insert(availabilitySlots)
        }

        results.push({
          teacher: teacher.id,
          status: 'success',
          slotsCreated: availabilitySlots.length,
          tokenRefreshed: !!(fb.refreshedTokens && fb.refreshedTokens.access_token)
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
