import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { email, full_name, role } = await request.json()

    await resend.emails.send({
      from: 'Nihon GO! World <noreply@nihongo-world.com>',
      to: 'info@nihongo-world.com',
      subject: 'New User Registration - Nihon GO! World',
      html: '<h2>New User Registered!</h2>' +
        '<p>A new user has signed up on Nihon GO! World.</p>' +
        '<h3>User Details:</h3>' +
        '<ul>' +
        '<li><strong>Name:</strong> ' + (full_name || 'Not provided') + '</li>' +
        '<li><strong>Email:</strong> ' + (email || 'Not provided') + '</li>' +
        '<li><strong>Role:</strong> ' + (role || 'student') + '</li>' +
        '<li><strong>Registration Time:</strong> ' + new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }) + '</li>' +
        '</ul>' +
        '<p>You can view all users in the Supabase dashboard.</p>'
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
