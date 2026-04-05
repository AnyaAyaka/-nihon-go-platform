
'use client'
import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bnncerddxtxemzqfosou.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubmNlcmRkeHR4ZW16cWZvc291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNjA2MzksImV4cCI6MjA2OTgzNjYzOX0.q4bYtrwdvQevGEBIItXbFo-KLH2ZJfs9ez07gbIQvPA'
)

export default function AccessCheck({ level, mockNum }: { level: string; mockNum: number }) {
  useEffect(() => {
    if (mockNum <= 1) return
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = 'https://app.nihongo-world.com/auth?reason=jlpt'
        return
      }
      const { data: subs } = await supabase
        .from('jlpt_subscriptions')
        .select('id')
        .eq('user_id', user.id)
        .eq('level', level)
        .gt('expires_at', new Date().toISOString())
        .limit(1)
      if (!subs || subs.length === 0) {
        window.location.href = 'https://app.nihongo-world.com/jlpt/purchase?level=' + level
      }
    }
    check()
  }, [level, mockNum])
  return null
}
