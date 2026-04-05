'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '../../../../lib/supabase'

export default function JLPTLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    const match = pathname.match(/\/jlpt\/([^/]+)\/(mock-(\d+))/)
    if (!match) return

    const level = match[1].toUpperCase()
    const mockNum = parseInt(match[3])

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
        .eq('level', level)
        .gt('expires_at', new Date().toISOString())
        .limit(1)

      if (!subs || subs.length === 0) {
        window.location.href = `https://app.nihongo-world.com/jlpt/purchase?level=${level}`
      }
    }

    check()
  }, [pathname])

  return <>{children}</>
}
