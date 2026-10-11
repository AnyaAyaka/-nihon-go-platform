'use client'

// ストアのアプリだけに出す「毎日のリマインダー」。
// 決めた時間に毎日1回、端末の通知で知らせる。設定は端末の中だけに残る。

import { useState, useEffect } from 'react'
import { isNativeApp } from '../../lib/native'

const KEY = 'ng-reminder'
const NOTE_ID = 1001

function readPref() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null') } catch (e) { return null }
}
function writePref(p) {
  try { localStorage.setItem(KEY, JSON.stringify(p)) } catch (e) {}
}

export default function Reminder() {
  const [show, setShow] = useState(false)
  const [on, setOn] = useState(false)
  const [time, setTime] = useState('19:00')
  const [note, setNote] = useState('')

  useEffect(() => {
    if (!isNativeApp()) return
    setShow(true)
    const p = readPref()
    if (p) { setOn(!!p.on); if (p.time) setTime(p.time) }
  }, [])

  async function apply(nextOn, nextTime) {
    setNote('')
    const { LocalNotifications } = await import('@capacitor/local-notifications')
    await LocalNotifications.cancel({ notifications: [{ id: NOTE_ID }] }).catch(() => {})
    if (nextOn) {
      let perm = await LocalNotifications.checkPermissions()
      if (perm.display !== 'granted') perm = await LocalNotifications.requestPermissions()
      if (perm.display !== 'granted') {
        setOn(false)
        writePref({ on: false, time: nextTime })
        setNote('Notifications are turned off for this app. You can allow them in your phone settings.')
        return
      }
      const [hour, minute] = nextTime.split(':').map(Number)
      await LocalNotifications.schedule({
        notifications: [{
          id: NOTE_ID,
          title: 'Time for Japanese',
          body: 'One story or a few reviews. Ten minutes is enough.',
          schedule: { on: { hour, minute }, allowWhileIdle: true },
        }],
      })
    }
    setOn(nextOn)
    setTime(nextTime)
    writePref({ on: nextOn, time: nextTime })
  }

  if (!show) return null

  return (
    <div className="ng-panel">
      <h2>Daily reminder</h2>
      <p className="hint" style={{ margin: '4px 0 12px' }}>A nudge at the same time every day.</p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={on} onChange={e => apply(e.target.checked, time)} />
          Remind me every day at
        </label>
        <input
          className="ng-input"
          type="time"
          aria-label="Reminder time"
          value={time}
          onChange={e => apply(on, e.target.value || time)}
          style={{ width: 130 }}
        />
      </div>
      {note && <p className="hint" style={{ margin: '10px 0 0' }}>{note}</p>}
    </div>
  )
}
