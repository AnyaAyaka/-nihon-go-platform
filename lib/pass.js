// Reader Pass：何が無料で、何に Pass が要るか。サーバー側で使う。
// ・N5 のミニテストと文法練習は無料
// ・N4〜N1 は、各レベル最初の5話のミニテストだけ無料
// ・それ以外のミニテスト、N4〜N1 の文法練習、JLPT 模試（Mock 02 以降）は Pass が要る

export const PASS_PRICES = {
  month: { amount: 499, interval: 'month', label: '£4.99 a month' },
  year: { amount: 2999, interval: 'year', label: '£29.99 a year' },
}

export function storyIsFree(id) {
  const m = /^(n[1-5])-(\d+)$/.exec(String(id || ''))
  if (!m) return false
  return m[1] === 'n5' || Number(m[2]) <= 5
}

export function grammarIsFree(lv) {
  return String(lv || '').toLowerCase() === 'n5'
}

export async function hasPass(admin, userId) {
  if (!userId) return false
  const { data } = await admin.from('reader_pass')
    .select('status, current_period_end')
    .eq('user_id', userId).maybeSingle()
  if (data && data.status === 'active' && new Date(data.current_period_end) > new Date()) return true
  // 先生のクラスに入っている生徒、学校・会社のライセンス、講師と管理者は Pass なしで使える
  const [{ count: inClass }, { count: inOrg }, { data: prof }] = await Promise.all([
    admin.from('class_students').select('user_id', { count: 'exact', head: true }).eq('user_id', userId).eq('status', 'active'),
    admin.from('org_members').select('user_id', { count: 'exact', head: true }).eq('user_id', userId),
    admin.from('profiles').select('role').eq('user_id', userId).maybeSingle(),
  ])
  return !!(inClass || inOrg || (prof && ['teacher', 'admin'].includes(prof.role)))
}
