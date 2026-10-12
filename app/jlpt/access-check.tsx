'use client'
import { useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function AccessCheck({ level, mockNum }: { level: string; mockNum: number }) {
  useEffect(() => {
    if (mockNum <= 1) return

    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = `https://app.nihongo-world.com/auth?reason=jlpt`
        return
      }

      const { data: subs } = await supabase
        .from('jlpt_subscriptions')
        .select('id')
        .eq('user_id', user.id)
        .eq('level', level.toUpperCase())
        .gt('expires_at', new Date().toISOString())
        .limit(1)

      if (!subs || subs.length === 0) {
        // Reader Pass があれば全レベルの模試が開く
        const { data: pass } = await supabase
          .from('reader_pass')
          .select('current_period_end')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .gt('current_period_end', new Date().toISOString())
          .limit(1)
        if (pass && pass.length) return
        window.location.href = `https://app.nihongo-world.com/jlpt/purchase?level=${level.toUpperCase()}`
      }
    }

    check()
  }, [level, mockNum])

  return null
}
