'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function JLPTLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    console.log('LAYOUT LOADED:', pathname)
    // テスト：強制的に購入ページ以外には飛ばない
    const match = pathname.match(/\/jlpt\/([^/]+)\/(mock-(\d+))/)
    if (match) {
      const mockNum = parseInt(match[3])
      console.log('Mock number:', mockNum)
    }
  }, [pathname])

  return <>{children}</>
}
