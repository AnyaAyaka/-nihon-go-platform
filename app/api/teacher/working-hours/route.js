import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET: 営業時間を取得
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const teacherId = searchParams.get('teacher_id')
    
    if (!teacherId) {
      return NextResponse.json({ error: 'Teacher ID required' }, { status: 400 })
    }

    // 講師情報を取得
    const { data: teacher } = await supabase
      .from('teachers')
      .select('id')
      .eq('user_id', teacherId)
      .single()

    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
    }

    // 営業時間を取得
    const { data: workingHours, error } = await supabase
      .from('teacher_working_hours')
      .select('*')
      .eq('teacher_id', teacher.id)
      .eq('is_active', true)
      .order('day_of_week')

    if (error) {
      console.error('Error fetching working hours:', error)
      return NextResponse.json({ error: 'Failed to fetch working hours' }, { status: 500 })
    }

    return NextResponse.json({ workingHours: workingHours || [] })

  } catch (error) {
    console.error('Error in GET working hours:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: 営業時間を保存
export async function POST(request) {
  try {
    const { teacherId, workingHours } = await request.json()
    
    if (!teacherId || !workingHours) {
      return NextResponse.json({ error: 'Teacher ID and working hours required' }, { status: 400 })
    }

    // 講師情報を取得
    const { data: teacher } = await supabase
      .from('teachers')
      .select('id')
      .eq('user_id', teacherId)
      .single()

    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
    }

    // 既存の営業時間を削除
    await supabase
      .from('teacher_working_hours')
      .delete()
      .eq('teacher_id', teacher.id)

    // 新しい営業時間を保存
    const hoursToInsert = workingHours
      .filter(day => day.enabled)
      .map(day => ({
        teacher_id: teacher.id,
        day_of_week: day.day,
        start_time: day.startTime,
        end_time: day.endTime,
        is_active: true
      }))

    if (hoursToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from('teacher_working_hours')
        .insert(hoursToInsert)

      if (insertError) {
        console.error('Error inserting working hours:', insertError)
        return NextResponse.json({ error: 'Failed to save working hours' }, { status: 500 })
      }
    }

    return NextResponse.json({ 
      success: true,
      message: 'Working hours saved successfully'
    })

  } catch (error) {
    console.error('Error in POST working hours:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
