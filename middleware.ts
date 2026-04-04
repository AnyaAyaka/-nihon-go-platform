import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /jlpt/[level]/mock-02以降だけチェック
  const match = pathname.match(/^\/jlpt\/([^/]+)\/(mock-(\d+))/)
  if (!match) return NextResponse.next()

  const level = match[1].toUpperCase()
  const mockNum = parseInt(match[3])

  // mock-01は無料
  if (mockNum <= 1) return NextResponse.next()

  // トークン取得
  const token = request.cookies.get(`sb-bnncerddxtxemzqfosou-auth-token`)?.value

  if (!token) {
    return NextResponse.redirect(new URL(`/auth?reason=jlpt`, request.url))
  }

  let accessToken: string
  try {
    accessToken = JSON.parse(token).access_token
  } catch {
    return NextResponse.redirect(new URL(`/auth?reason=jlpt`, request.url))
  }

  // ユーザー取得
  const { data: { user } } = await supabase.auth.getUser(accessToken)
  if (!user) {
    return NextResponse.redirect(new URL(`/auth?reason=jlpt`, request.url))
  }

  // サブスクチェック
  const { data: subs } = await supabase
    .from('jlpt_subscriptions')
    .select('id')
    .eq('user_id', user.id)
    .eq('level', level)
    .gt('expires_at', new Date().toISOString())
    .limit(1)

  if (!subs || subs.length === 0) {
    return NextResponse.redirect(new URL(`/jlpt/purchase?level=${level}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/jlpt/:path*'],
}
