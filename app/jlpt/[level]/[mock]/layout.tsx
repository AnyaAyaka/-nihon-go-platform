import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function JLPTLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ level: string; mock: string }>
}) {
  const { level, mock } = await params
  const mockNumber = parseInt(mock.replace('mock-', ''))

  if (mockNumber <= 1) {
    return <>{children}</>
  }

  const cookieStore = await cookies()
  const token = cookieStore.get('sb-access-token')?.value

  if (!token) {
    redirect('/login?reason=jlpt')
  }

  const { data: { user } } = await supabase.auth.getUser(token!)

  if (!user) {
    redirect('/login?reason=jlpt')
  }

  const { data: subscription } = await supabase
    .from('jlpt_subscriptions')
    .select('expires_at')
    .eq('user_id', user.id)
    .eq('level', level.toUpperCase())
    .single()

  const isActive = subscription && new Date(subscription.expires_at) > new Date()

  if (!isActive) {
    redirect(`/jlpt/purchase?level=${level.toUpperCase()}`)
  }

  return <>{children}</>
}
