// チケットまわりのルールを1か所にまとめたファイル。
//
// これまで同じ内容が予約画面（app/booking/page.js）と予約API
// （app/api/bookings/create/route.js）に別々に書かれていて、
// 片方だけ直して食い違う事故が起きていた。両方ここだけを見る。
//
// 注意：チケット種別 → レッスン種別の対応表は「2種類」ある。
// 名前が似ているが用途が違うので、混ぜないこと。

// 1) 講師の対応可否を照合するための対応表。
//    teachers.lesson_types と突き合わせる。
//    teachers.lesson_types には in_person_90 も inperson_trial も存在しないため、
//    どちらも「in_person に対応している講師なら可」とみなす。
export const TICKET_TO_TEACHER_LESSON_TYPE = {
  online_trial: 'online_trial',
  online: 'online',
  inperson_trial: 'in_person',
  in_person: 'in_person',
  in_person_90: 'in_person',
  premium: 'premium',
  online_trial_pair: 'online_trial',
  online_pair: 'online',
  inperson_trial_pair: 'in_person',
  in_person_pair: 'in_person'
}

// 2) bookings.lesson_type に実際に保存する値の対応表。
//    こちらは体験や90分を潰さない。集計や請求がこの値を見ている。
export const TICKET_TO_BOOKING_LESSON_TYPE = {
  online_trial: 'online_trial',
  online: 'online',
  inperson_trial: 'inperson_trial',
  in_person: 'in_person',
  in_person_90: 'in_person_90',
  premium: 'premium',
  online_trial_pair: 'online_trial',
  online_pair: 'online',
  inperson_trial_pair: 'inperson_trial',
  in_person_pair: 'in_person'
}

// 予約画面に出すチケット名
export const TICKET_LABELS = {
  online_trial: 'Online Trial',
  online: 'Online',
  inperson_trial: 'In-Person Trial',
  in_person: 'In-Person',
  in_person_90: 'In-Person (90 min)',
  premium: 'Premium (Online)',
  online_trial_pair: 'Online Trial (2 learners)',
  online_pair: 'Online (2 learners)',
  inperson_trial_pair: 'In-Person Trial (2 learners)',
  in_person_pair: 'In-Person (2 learners)'
}

// 2人で受けるチケット
export const PAIR_TICKET_TYPES = [
  'online_trial_pair',
  'online_pair',
  'inperson_trial_pair',
  'in_person_pair'
]

// 対面レッスン。前に移動時間が要る種別
export const IN_PERSON_LESSON_TYPES = ['in_person', 'in_person_90', 'inperson_trial']
export const TRAVEL_MINUTES = 60

// レッスン尺。
//  実尺 … bookings.end_time、確認画面、メールに使う値
//  バッファ … 実尺の後ろに付く占有分。重複判定だけに使う
//  ステップ … 開始候補の刻み
export const DEFAULT_LESSON_MINUTES = 55
export const LESSON_BUFFER_MINUTES = 5
export const SLOT_STEP_MINUTES = 30

const LESSON_DURATIONS = {
  online_trial: 55,
  online: 55,
  inperson_trial: 55,
  in_person: 55,
  in_person_90: 85,
  premium: 55,
  online_trial_pair: 55,
  online_pair: 55,
  inperson_trial_pair: 55,
  in_person_pair: 55
}

// ticket_type / lesson_type どちらのキーでも引ける
export function lessonMinutes(type) {
  return LESSON_DURATIONS[type] ?? DEFAULT_LESSON_MINUTES
}

// ---- 有効期限 -------------------------------------------------------
// 期限は購入時に user_current_tickets.expires_at に入り、
// 購入確認メールでもお客さんに伝えている。
// ルールは2つ。
//   1) 期限を過ぎたチケットは使えない
//   2) レッスンの日が期限より後になる予約も受け付けない（期限内に受講する）

export function isTicketUsable(ticket, now = new Date()) {
  if (!ticket || !(ticket.remaining_tickets > 0)) return false
  if (!ticket.expires_at) return true
  return new Date(ticket.expires_at).getTime() >= now.getTime()
}

export function isWithinExpiry(ticket, lessonStart) {
  if (!ticket?.expires_at) return true
  return new Date(lessonStart).getTime() <= new Date(ticket.expires_at).getTime()
}

export function formatExpiry(expiresAt) {
  return new Date(expiresAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// 予約してよいかの判定を1か所に。
// 返り値 { ok: true } または { ok: false, error: 'お客さんに見せる文面' }
export function checkTicketForBooking(ticket, lessonStart, now = new Date()) {
  if (!ticket || !(ticket.remaining_tickets > 0)) {
    return { ok: false, error: 'No valid tickets available' }
  }

  if (ticket.expires_at) {
    const label = formatExpiry(ticket.expires_at)

    if (!isTicketUsable(ticket, now)) {
      return {
        ok: false,
        error: `Your lesson credits expired on ${label}. Please contact us and we will be happy to help.`
      }
    }

    if (!isWithinExpiry(ticket, lessonStart)) {
      return {
        ok: false,
        error: `Your lesson credits are valid until ${label}. Please choose a date on or before then.`
      }
    }
  }

  return { ok: true }
}
