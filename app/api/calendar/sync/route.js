import { NextResponse } from 'next/server'
import { getFreeBusyInfo } from '../../../../lib/googleCalendar'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const TEACHER_TZ = 'Europe/London'

function getTzOffsetMinutes(date, timeZone) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })
  const parts = dtf.formatToParts(date).reduce((acc, p) => { acc[p.type] = p.value; return acc }, {})
  const asUTC = Date.UTC(
    parseInt(parts.year), parseInt(parts.month) - 1, parseInt(parts.day),
    parseInt(parts.hour), parseInt(parts.minute), parseInt(parts.second)
  )
  return Math.round((asUTC - date.getTime()) / 60000)
}

function wallClockToUtc(year, month, day, hour, minute, timeZone) {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0)
  const offset = getTzOffsetMinutes(new Date(utcGuess), timeZone)
  return new Date(utcGuess - offset * 60000)
}

function localDateParts(date, timeZone) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone, weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit'
  })
  const parts = dtf.formatToParts(date).reduce((acc, p) => { acc[p.type] = p.value; return acc }, {})
  const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return {
    year: parseInt(parts.year),
    month: parseInt(parts.month),
    day: parseInt(parts.day),
    dayOfWeek: weekdayMap[parts.weekday]
  }
}

function formatLocalTime(date, timeZone) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(date)
}

// Round a UTC instant up to the next whole hour in LONDON wall-clock terms.
// (Preserves the existing "round busy end up to next hour" behaviour.)
function roundUpToHourLocal(date, timeZone) {
  const p = new Intl.DateTimeFormat('en-US', {
    timeZone, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).formatToParts(date).reduce((acc, x) => { acc[x.type] = x.value; return acc }, {})
  let h = parseInt(p.hour)
  const hasRemainder = parseInt(p.minute) > 0 || parseInt(p.second) > 0
  if (hasRemainder) h += 1
  return wallClockToUtc(parseInt(p.year), parseInt(p.month), parseInt(p.day), h, 0, timeZone)
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

    const now = new Date()
    const timeMin = now.toISOString()
    const timeMax = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()

    let fb
    try {
      fb = await getFreeBusyInfo(
        teacher.google_calendar_id || 'primary',
        timeMin,
        timeMax,
        teacher.google_access_token,
        teacher.google_refresh_token
      )
    } catch (error) {
      if (error.message?.includes('invalid_grant') || error.code === 401) {
        await supabase
          .from('teachers')
          .update({ google_access_token: null, google_refresh_token: null })
          .eq('id', teacher.id)

        return NextResponse.json({
          error: 'reconnect_required',
          message: 'Google Calendar connection expired. Please reconnect.'
        }, { status: 401 })
      }
      throw error
    }

    // Persist any silently-refreshed token
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

    // Delete all future slots from start of today (London) to avoid duplicates
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

          // Round busy end up to next whole hour (London), preserving prior behaviour
          const nextStart = roundUpToHourLocal(be, TEACHER_TZ)
          cursor = nextStart > cursor ? nextStart : cursor
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
