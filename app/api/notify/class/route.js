import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// 生徒を登録したとき、課題を出したときに、生徒へメールを出す。
// 先生本人からの依頼かどうかを必ず確かめてから送る。
export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)
const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

const APP = 'https://app.nihongo-world.com'
const FROM = 'Nihon GO! World <noreply@nihongo-world.com>'

const KIND_JA = {
  story: '物語を読む',
  story_test: '力だめし 8問',
  grammar_drill: '文法の練習 5問',
  mock: 'JLPT模試'
}
const KIND_EN = {
  story: 'Read a story',
  story_test: 'Mini test, 8 questions',
  grammar_drill: 'Grammar practice, 5 questions',
  mock: 'JLPT mock test'
}

function send(body, status) {
  return new Response(JSON.stringify(body), {
    status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  })
}

function wrap(inner) {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    font-size:15px;line-height:1.7;color:#1C2226;max-width:520px;margin:0 auto;padding:8px 0">
    ${inner}
    <p style="margin:28px 0 0;font-size:12px;color:#5D6970;border-top:1px solid #D9DEDB;padding-top:12px">
      Nihon GO! World　<a href="https://nihongo-world.com" style="color:#27477A">nihongo-world.com</a><br>
      このメールに心当たりがない場合は、そのまま破棄してください。
    </p></div>`
}

function button(href, label) {
  return `<p style="margin:22px 0"><a href="${href}" style="display:inline-block;background:#1C2226;
    color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:700">${label}</a></p>`
}

export async function POST(req) {
  const header = req.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  if (!token) return send({ error: 'sign in required' }, 401)

  const { data: auth, error: aerr } = await admin.auth.getUser(token)
  if (aerr || !auth?.user) return send({ error: 'sign in required' }, 401)

  let body = {}
  try { body = await req.json() } catch (e) { return send({ error: 'bad request' }, 400) }
  const { classId, what, emails, assignmentId } = body
  if (!classId) return send({ error: 'missing classId' }, 400)

  // 依頼した人が、このクラスを持っている先生か確かめる
  const { data: klass } = await admin
    .from('classes').select('id, name, level, org_id').eq('id', classId).single()
  if (!klass) return send({ error: 'class not found' }, 404)

  const { count: isTeacher } = await admin
    .from('org_members').select('org_id', { count: 'exact', head: true })
    .eq('org_id', klass.org_id).eq('user_id', auth.user.id)
  if (!isTeacher) return send({ error: 'not your class' }, 403)

  const { data: org } = await admin
    .from('organizations').select('name').eq('id', klass.org_id).single()
  const school = org?.name || 'Nihon GO! World'

  let to = []
  if (Array.isArray(emails) && emails.length) {
    to = emails.map(e => String(e).toLowerCase()).slice(0, 60)
  } else {
    const { data: students } = await admin
      .from('class_students').select('email').eq('class_id', classId).neq('status', 'removed')
    to = (students || []).map(s => s.email)
  }
  if (!to.length) return send({ sent: 0 }, 200)

  let subject, html
  if (what === 'assignment') {
    const { data: a } = await admin
      .from('assignments').select('kind, ref_id, title, due_on').eq('id', assignmentId).single()
    if (!a) return send({ error: 'assignment not found' }, 404)
    subject = `新しい課題：${a.title || KIND_JA[a.kind] || ''}`
    html = wrap(`
      <p>${school}　${klass.name} に新しい課題が出ました。</p>
      <p style="font-size:18px;font-weight:700;margin:16px 0 4px">${a.title || ''}</p>
      <p style="margin:0;color:#5D6970">${KIND_JA[a.kind] || ''}${a.due_on ? `　${a.due_on} まで` : ''}</p>
      ${button(APP + '/my', '課題を開く')}
      <p style="color:#5D6970;font-size:13px">
        New work has been set in your class.<br>
        ${KIND_EN[a.kind] || ''}${a.due_on ? ` · due ${a.due_on}` : ''}<br>
        Sign in with this email address to see it.
      </p>`)
  } else {
    subject = `${school} のクラスに招待されました`
    html = wrap(`
      <p>${school} の <strong>${klass.name}</strong> に登録されました。</p>
      <p>このメールアドレスでサインインすると、出された課題がそのまま出てきます。
      物語を読んで、力だめしを解いて、間違えたところだけがあとで復習に出ます。</p>
      ${button(APP + '/my', 'はじめる')}
      <p style="color:#5D6970;font-size:13px">
        You have been added to ${klass.name} at ${school}.<br>
        Sign in with this email address and your work will be there.<br>
        Free. No card needed.
      </p>`)
  }

  let ok = 0, failed = []
  for (const address of to) {
    try {
      const r = await resend.emails.send({ from: FROM, to: address, subject, html })
      if (r?.error) failed.push(address); else ok++
    } catch (e) { failed.push(address) }
  }
  return send({ sent: ok, failed }, 200)
}
