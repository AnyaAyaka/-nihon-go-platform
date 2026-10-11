import { createClient } from '@supabase/supabase-js'

// 本人がアカウントを削除する。Apple と Google の審査で必須。
// 予約中のレッスンがある人と、講師・管理者は削除できない（メールで対応）。
// 支払いの記録は Stripe / Apple / Google 側に残るので、こちらの学習データは消してよい。
export const dynamic = 'force-dynamic'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

function send(body, status) {
  return new Response(JSON.stringify(body), {
    status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  })
}

export async function POST(req) {
  const header = req.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  if (!token) return send({ error: 'sign in required' }, 401)
  const { data, error } = await admin.auth.getUser(token)
  if (error || !data?.user) return send({ error: 'sign in required' }, 401)
  const uid = data.user.id

  let body = {}
  try { body = await req.json() } catch (e) { /* empty body */ }
  if (body.confirm !== 'DELETE') return send({ error: 'confirm' }, 400)

  const { data: prof } = await admin.from('profiles').select('role').eq('user_id', uid).maybeSingle()
  const { data: teacher } = await admin.from('teachers').select('user_id').eq('user_id', uid).maybeSingle()
  if (teacher || (prof && prof.role && prof.role !== 'student')) {
    return send({ error: 'staff', message: 'Teacher and admin accounts are closed by email. Please contact info@nihongolondon.com.' }, 409)
  }

  const { count: upcoming } = await admin.from('bookings').select('id', { count: 'exact', head: true })
    .eq('student_id', uid).neq('status', 'cancelled').gt('start_time', new Date().toISOString())
  if (upcoming) {
    return send({ error: 'upcoming', message: `You have ${upcoming} upcoming ${upcoming === 1 ? 'lesson' : 'lessons'}. Please cancel ${upcoming === 1 ? 'it' : 'them'} first, or email info@nihongolondon.com.` }, 409)
  }

  // auth.users に「削除不可」でつながっている表を先に消す
  const steps = [
    ['jlpt_subscriptions', 'user_id'],
    ['user_current_tickets', 'user_id'],
    ['ticket_usage_history', 'user_id'],
    ['teacher_student_restrictions', 'student_id'],
    ['profiles', 'user_id'],
  ]
  for (const [table, col] of steps) {
    const { error: e } = await admin.from(table).delete().eq(col, uid)
    if (e) return send({ error: 'failed', message: 'Something went wrong. Please email info@nihongolondon.com.' }, 500)
  }

  // 残り（学習の記録、復習、クラス）は auth.users と一緒に消える
  const { error: delErr } = await admin.auth.admin.deleteUser(uid)
  if (delErr) return send({ error: 'failed', message: 'Something went wrong. Please email info@nihongolondon.com.' }, 500)

  return send({ ok: true }, 200)
}
