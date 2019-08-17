export const ONLINEHOST = 'http://api.juheapi.com'

export const QAHOST = 'http://localhost:57992'

export const HOST = process.env.NODE_ENV === "production" ? ONLINEHOST : QAHOST;