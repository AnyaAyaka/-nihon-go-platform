import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  try {
    // 認証チェック（Vercel Cronからのリクエストのみ許可）
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Google Calendar連携済みの全講師を取得
    const { data: teachers, error } = await supabase
      .from('teachers')
      .select('user_id, display_name')
      .not('google_access_token', 'is', null)
      .not('google_refresh_token', 'is', null)

    if (error) throw error

    const results = []
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nihon-go-platform.vercel.app'

    // 各講師のカレンダーを同期
    for (const teacher of teachers) {
      try {
        const response = await fetch(`${baseUrl}/api/calendar/sync`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teacherId: teacher.user_id })
        })
        
        const result = await response.json()
        results.push({
          teacher: teacher.display_name,
          success: response.ok,
          slotsCreated: result.slotsCreated || 0
        })
      } catch (err) {
        results.push({
          teacher: teacher.display_name,
          success: false,
          error: err.message
        })
      }
    }

    return NextResponse.json({
      success: true,
      results,
      totalTeachers: teachers.length
    })
  } catch (error) {
    console.error('Error in sync-all:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
