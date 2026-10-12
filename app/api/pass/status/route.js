import { admin, send, userFrom } from '../_auth'
import { hasPass } from '../../../../lib/pass'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  const user = await userFrom(req)
  if (!user) return send({ active: false, signedIn: false }, 200)
  const { data } = await admin.from('reader_pass').select('plan, status, current_period_end, source').eq('user_id', user.id).maybeSingle()
  const active = !!(data && data.status === 'active' && new Date(data.current_period_end) > new Date())
  // access：Pass か、クラス・ライセンス・講師などで練習が開いているか
  const access = active || await hasPass(admin, user.id)
  return send({ signedIn: true, active, access, pass: data || null }, 200)
}
