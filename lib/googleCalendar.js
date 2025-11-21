import { google } from 'googleapis'

export function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
}

export function getAuthUrl() {
  const oauth2Client = getOAuth2Client()
  
  const scopes = [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events'
  ]

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  })
}

export async function getCalendarClient(accessToken, refreshToken) {
  const oauth2Client = getOAuth2Client()
  
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken
  })

  return google.calendar({ version: 'v3', auth: oauth2Client })
}

export async function listCalendars(accessToken, refreshToken) {
  const calendar = await getCalendarClient(accessToken, refreshToken)
  
  const response = await calendar.calendarList.list()
  return response.data.items || []
}

export async function getFreeBusyInfo(calendarId, timeMin, timeMax, accessToken, refreshToken) {
  const calendar = await getCalendarClient(accessToken, refreshToken)
  
  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin,
      timeMax: timeMax,
      items: [{ id: calendarId }]
    }
  })

  return response.data.calendars[calendarId]
}

export async function createCalendarEvent(calendarId, event, accessToken, refreshToken) {
  const calendar = await getCalendarClient(accessToken, refreshToken)
  
  const response = await calendar.events.insert({
    calendarId: calendarId,
    requestBody: event
  })

  return response.data
}
