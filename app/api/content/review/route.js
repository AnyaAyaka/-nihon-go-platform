import { createClient } from '@supabase/supabase-js'
import GRAMMAR from '../../../../content/grammar-drills.json'
import TESTS from '../../../../content/story-tests.json'

// 復習用に、間違えた項目の問題を1問ずつ返す。ログイン必須。
export const dynamic = 'force-dynamic'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

// 単語 -> その単語を問う問題（力だめしから集めたもの）
const WORDQ = (() => {
  const m = {}
  for (const qs of Object.values(TESTS)) {
    for (const q of qs) {
      if (q.w) (m[q.w] = m[q.w] || []).push(q)
    }
  }
  return m
})()

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

  let body = {}
  try { body = await req.json() } catch (e) { return send({ error: 'bad request' }, 400) }
  const items = Array.isArray(body.items) ? body.items.slice(0, 30) : []

  const out = []
  for (const it of items) {
    const box = Number(it.box) || 0
    if (it.kind === 'grammar') {
      const g = GRAMMAR[it.ref]
      const pool = (((g && g.q) || []).filter(x => x.t === 'mc' || x.t === 'judge'))
      if (!pool.length) continue
      out.push({
        kind: 'grammar', ref: it.ref, label: (g && g.title) || it.ref, box,
        note: g && g.note, question: pool[box % pool.length]
      })
    } else if (it.kind === 'vocab') {
      const pool = WORDQ[it.ref] || []
      if (!pool.length) continue
      const q = pool[box % pool.length]
      out.push({
        kind: 'vocab', ref: it.ref, label: it.ref, en: q.wen || '', box,
        question: q
      })
    }
  }
  return send({ items: out }, 200)
}
