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

// Returns { client, getRefreshedTokens } so callers can persist any
// tokens that googleapis silently refreshed during the request.
function buildClient(accessToken, refreshToken) {
  const oauth2Client = getOAuth2Client()
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken
  })

  let refreshedTokens = null
  oauth2Client.on('tokens', (tokens) => {
    // Fired when the access token is auto-refreshed.
    refreshedTokens = { ...(refreshedTokens || {}), ...tokens }
  })

  const client = google.calendar({ version: 'v3', auth: oauth2Client })
  return { client, getRefreshedTokens: () => refreshedTokens }
}

export async function getCalendarClient(accessToken, refreshToken) {
  return buildClient(accessToken, refreshToken).client
}

export async function listCalendars(accessToken, refreshToken) {
  const { client } = buildClient(accessToken, refreshToken)
  const response = await client.calendarList.list()
  return response.data.items || []
}

export async function getFreeBusyInfo(calendarId, timeMin, timeMax, accessToken, refreshToken) {
  const { client, getRefreshedTokens } = buildClient(accessToken, refreshToken)

  const response = await client.freebusy.query({
    requestBody: {
      timeMin: timeMin,
      timeMax: timeMax,
      items: [{ id: calendarId }]
    }
  })

  const calendarData = response.data.calendars[calendarId] || { busy: [] }
  return { ...calendarData, refreshedTokens: getRefreshedTokens() }
}

export async function createCalendarEvent(calendarId, event, accessToken, refreshToken) {
  const { client } = buildClient(accessToken, refreshToken)

  const response = await client.events.insert({
    calendarId: calendarId,
    requestBody: event
  })

  return response.data
}
