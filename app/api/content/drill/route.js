import { createClient } from '@supabase/supabase-js'
import GRAMMAR from '../../../../content/grammar-drills.json'

// 文法ドリルはここからしか出ません。ログイン必須、1回につき1文法だけ。
export const dynamic = 'force-dynamic'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

function send(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  })
}

export async function GET(req) {
  const header = req.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  if (!token) return send({ error: 'sign in required' }, 401)

  const { data, error } = await admin.auth.getUser(token)
  if (error || !data?.user) return send({ error: 'sign in required' }, 401)

  const url = new URL(req.url)

  // 一覧（問題は返さない。タイトルと級だけ）
  if (url.searchParams.get('list')) {
    const lv = (url.searchParams.get('lv') || '').toLowerCase()
    const items = Object.entries(GRAMMAR)
      .filter(([, g]) => !lv || g.lv === lv)
      .map(([id, g]) => ({ id, title: g.title, lv: g.lv, en: g.en, n: (g.q || []).length }))
      .sort((a, b) => a.lv.localeCompare(b.lv) || a.title.localeCompare(b.title, 'ja'))
    return send({ items }, 200)
  }

  const id = url.searchParams.get('g')
  if (!id) return send({ error: 'missing g' }, 400)
  const g = GRAMMAR[id]
  if (!g) return send({ error: 'no drill for this grammar point' }, 404)

  return send({
    id,
    title: g.title, lv: g.lv, en: g.en, pattern: g.pattern, note: g.note, ex: g.ex,
    questions: g.q || []
  }, 200)
}
