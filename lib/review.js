import { supabase } from './supabase'

// 間違えた文法・語彙を復習リストに入れる（すでにあれば回数を足して、明日もう一度に戻す）
// items: [{ kind:'grammar'|'vocab', ref, label, en }]
export async function addToReview(userId, items) {
  const uniq = []
  for (const it of items || []) {
    if (!it || !it.ref || !it.kind) continue
    if (!uniq.some(x => x.kind === it.kind && x.ref === it.ref)) uniq.push(it)
  }
  if (!uniq.length) return

  const { data: existing } = await supabase
    .from('review_items')
    .select('kind, ref, wrong_count')
    .eq('user_id', userId)
    .in('ref', uniq.map(x => x.ref))

  const today = new Date().toISOString().slice(0, 10)
  const rows = uniq.map(it => {
    const was = (existing || []).find(e => e.kind === it.kind && e.ref === it.ref)
    return {
      user_id: userId,
      kind: it.kind,
      ref: it.ref,
      label: it.label || it.ref,
      en: it.en || null,
      box: 0,
      due_on: today,
      right_streak: 0,
      wrong_count: was ? was.wrong_count + 1 : 1
    }
  })

  const { error } = await supabase
    .from('review_items')
    .upsert(rows, { onConflict: 'user_id,kind,ref' })
  if (error) console.warn('review_items', error.message)
}

export async function dueCount(userId) {
  const today = new Date().toISOString().slice(0, 10)
  const { count } = await supabase
    .from('review_items')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .lte('due_on', today)
  return count || 0
}
