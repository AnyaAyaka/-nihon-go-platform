import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(new URL('/dashboard?error=google_auth_failed', request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/dashboard?error=no_code', request.url))
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )

    const { tokens } = await oauth2Client.getToken(code)
    
    // Get user info from token
    oauth2Client.setCredentials(tokens)
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
    const { data: userInfo } = await oauth2.userinfo.get()

    // Find teacher by email
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('email', userInfo.email)
      .single()

    if (!profile) {
      return NextResponse.redirect(new URL('/dashboard?error=teacher_not_found', request.url))
    }

    // Update teacher with refresh token
    const { error: updateError } = await supabase
      .from('teachers')
      .update({ 
        google_refresh_token: tokens.refresh_token,
        google_email: userInfo.email
      })
      .eq('user_id', profile.user_id)

    if (updateError) {
      console.error('Error updating teacher:', updateError)
      return NextResponse.redirect(new URL('/dashboard?error=update_failed', request.url))
    }

    // Trigger calendar sync
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://nihon-go-platform.vercel.app'}/api/sync-calendar`)
    } catch (syncError) {
      console.error('Sync error:', syncError)
    }

    return NextResponse.redirect(new URL('/dashboard?success=google_connected', request.url))

  } catch (error) {
    console.error('Google auth error:', error)
    return NextResponse.redirect(new URL('/dashboard?error=auth_error', request.url))
  }
}
