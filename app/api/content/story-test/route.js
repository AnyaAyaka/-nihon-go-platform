import { createClient } from '@supabase/supabase-js'
import TESTS from '../../../../content/story-tests.json'
import GRAMMAR from '../../../../content/grammar-drills.json'

// 力だめしの問題は、ここからしか出ません。
// ログインしていない人には何も返しません。1回のリクエストで1話分だけ。
export const dynamic = 'force-dynamic'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

function deny(status, error) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  })
}

export async function GET(req) {
  const header = req.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  if (!token) return deny(401, 'sign in required')

  const { data, error } = await admin.auth.getUser(token)
  if (error || !data?.user) return deny(401, 'sign in required')

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return deny(400, 'missing id')

  const questions = TESTS[id]
  if (!questions) return deny(404, 'no test for this story')

  // この回に出てくる文法のタイトルだけ添える（先生の画面で名前を出すため）
  const titles = {}
  for (const q of questions) {
    if (q.g && GRAMMAR[q.g] && !titles[q.g]) titles[q.g] = GRAMMAR[q.g].title
  }

  return new Response(JSON.stringify({ id, questions, titles }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  })
}
