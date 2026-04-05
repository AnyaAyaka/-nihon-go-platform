'use client'
import { useEffect } from 'react'

export default function AccessCheck({ level, mockNum }) {
  useEffect(() => {
    if (mockNum <= 1) return
    const check = async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(
          'https://bnncerddxtxemzqfosou.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubmNlcmRkeHR4ZW16cWZvc291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNjA2MzksImV4cCI6MjA2OTgzNjYzOX0.q4bYtrwdvQevGEBIItXbFo-KLH2ZJfs9ez07gbIQvPA'
        )
        const { data: { session } } = await supabase.auth.getSession()
        console.log('AccessCheck session:', session?.user?.id, 'level:', level)
        if (!session?.user) {
          window.location.href = 'https://app.nihongo-world.com/auth?reason=jlpt'
          return
        }
        const { data: subs, error } = await supabase
          .from('jlpt_subscriptions')
          .select('id')
          .eq('user_id', session.user.id)
          .eq('level', level)
          .gt('expires_at', new Date().toISOString())
          .limit(1)
        console.log('AccessCheck subs:', subs, 'error:', error)
        if (!subs || subs.length === 0) {
          window.location.href = 'https://app.nihongo-world.com/jlpt/purchase?level=' + level
        }
      } catch(e) {
        console.error('AccessCheck error:', e)
      }
    }
    check()
  }, [level, mockNum])
  return null
}
