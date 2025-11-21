import { NextResponse } from 'next/server'
import { getAuthUrl } from '../../../../lib/googleCalendar'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const teacherId = searchParams.get('teacher_id')
    
    if (!teacherId) {
      return NextResponse.json({ error: 'Teacher ID required' }, { status: 400 })
    }

    // 認証URLを生成
    const authUrl = getAuthUrl()
    
    // teacher_idをstateパラメータに含める
    const urlWithState = `${authUrl}&state=${teacherId}`

    return NextResponse.json({ authUrl: urlWithState })
  } catch (error) {
    console.error('Error generating auth URL:', error)
    return NextResponse.json({ error: 'Failed to generate auth URL' }, { status: 500 })
  }
}
