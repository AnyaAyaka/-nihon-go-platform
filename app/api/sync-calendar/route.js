import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { google } from 'googleapis'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET() {
  try {
    // 全講師を取得
    const { data: teachers, error: teachersError } = await supabase
      .from('teachers')
      .select('*')

    if (teachersError) {
      console.error('Error fetching teachers:', teachersError)
      return NextResponse.json({ error: 'Failed to fetch teachers' }, { status: 500 })
    }

    const results = []

    for (const teacher of teachers) {
      if (!teacher.google_refresh_token) {
        results.push({ teacher: teacher.display_name, status: 'skipped', reason: 'No refresh token' })
        continue
      }

      try {
        // Google OAuth2 クライアントを設定
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          process.env.GOOGLE_REDIRECT_URI
        )

        oauth2Client.setCredentials({
          refresh_token: teacher.google_refresh_token
        })

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

        // 今日から30日間のイベントを取得
        const now = new Date()
        const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

        const response = await calendar.events.list({
          calendarId: 'primary',
          timeMin: now.toISOString(),
          timeMax: thirtyDaysLater.toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
          q: 'Nihon GO! Available'
        })

        const events = response.data.items || []

        // 既存のスロットを削除（将来のもののみ）
        await supabase
          .from('teacher_availability')
          .delete()
          .eq('teacher_id', teacher.id)
          .gte('start_time_utc', now.toISOString())

        // 新しいスロットを追加
        const slots = events.map(event => ({
          teacher_id: teacher.id,
          start_time_utc: event.start.dateTime,
          end_time_utc: event.end.dateTime,
          is_available: true,
          google_event_id: event.id
        }))

        if (slots.length > 0) {
          const { error: insertError } = await supabase
            .from('teacher_availability')
            .insert(slots)

          if (insertError) {
            console.error('Error inserting slots:', insertError)
            results.push({ teacher: teacher.display_name, status: 'error', reason: insertError.message })
            continue
          }
        }

        results.push({ teacher: teacher.display_name, status: 'success', slotsFound: slots.length })

      } catch (error) {
        console.error(`Error syncing calendar for ${teacher.display_name}:`, error)
        results.push({ teacher: teacher.display_name, status: 'error', reason: error.message })
      }
    }

    return NextResponse.json({ success: true, results })

  } catch (error) {
    console.error('Sync calendar error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
