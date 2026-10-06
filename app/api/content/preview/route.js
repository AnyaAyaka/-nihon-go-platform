import { createClient } from '@supabase/supabase-js'
import TESTS from '../../../../content/story-tests.json'
import GRAMMAR from '../../../../content/grammar-drills.json'

// 先生用。答えと解説つきで問題をまるごと返す。
// 組織に属している人（＝先生）だけ。生徒には返さない。
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

export async function GET(req) {
  const header = req.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  if (!token) return send({ error: 'sign in required' }, 401)

  const { data, error } = await admin.auth.getUser(token)
  if (error || !data?.user) return send({ error: 'sign in required' }, 401)

  const { count } = await admin
    .from('org_members')
    .select('org_id', { count: 'exact', head: true })
    .eq('user_id', data.user.id)
  if (!count) return send({ error: 'teachers only' }, 403)

  const url = new URL(req.url)
  const kind = url.searchParams.get('kind')
  const ref = url.searchParams.get('ref')
  if (!kind || !ref) return send({ error: 'missing kind or ref' }, 400)

  if (kind === 'story_test') {
    const questions = TESTS[ref]
    if (!questions) return send({ error: 'not found' }, 404)
    const titles = {}
    for (const q of questions) if (q.g && GRAMMAR[q.g]) titles[q.g] = GRAMMAR[q.g].title
    return send({ kind, ref, questions, titles }, 200)
  }

  if (kind === 'grammar_drill') {
    const g = GRAMMAR[ref]
    if (!g) return send({ error: 'not found' }, 404)
    return send({
      kind, ref, title: g.title, lv: g.lv, en: g.en, pattern: g.pattern, note: g.note, ex: g.ex,
      questions: g.q || []
    }, 200)
  }

  return send({ error: 'unknown kind' }, 400)
}
