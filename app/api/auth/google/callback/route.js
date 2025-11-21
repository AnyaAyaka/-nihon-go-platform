import { NextResponse } from 'next/server'
import { getOAuth2Client } from '../../../../../lib/googleCalendar'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state') // teacher_id
    
    if (!code || !state) {
      return NextResponse.redirect(new URL('/dashboard/teacher?error=auth_failed', request.url))
    }

    const oauth2Client = getOAuth2Client()
    
    // 認証コードをトークンに交換
    const { tokens } = await oauth2Client.getToken(code)
    
    // データベースにトークンを保存
    const { error } = await supabase
      .from('teachers')
      .update({
        google_access_token: tokens.access_token,
        google_refresh_token: tokens.refresh_token,
        google_token_expires_at: new Date(tokens.expiry_date).toISOString(),
        google_calendar_id: 'primary' // デフォルトカレンダー
      })
      .eq('user_id', state)

    if (error) {
      console.error('Error saving tokens:', error)
      return NextResponse.redirect(new URL('/dashboard/teacher?error=save_failed', request.url))
    }

    // 成功したら講師ダッシュボードにリダイレクト
    return NextResponse.redirect(new URL('/dashboard/teacher?calendar_connected=true', request.url))
    
  } catch (error) {
    console.error('Error in Google callback:', error)
    return NextResponse.redirect(new URL('/dashboard/teacher?error=callback_failed', request.url))
  }
}
