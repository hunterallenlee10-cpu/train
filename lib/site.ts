// The launch switch. NEXT_PUBLIC_SITE_MODE: "demo" (default) or "live".
export const SITE_MODE: 'demo' | 'live' = process.env.NEXT_PUBLIC_SITE_MODE === 'live' ? 'live' : 'demo'
export const IS_LIVE = SITE_MODE === 'live'
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')
export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

export const TITLE = 'Private Gym Passes and Blocks in Ocean City, MD | train.'
export const DESCRIPTION =
  'Buy a pass and book a 2-hour block at train., a private garage gym in Ocean City, MD. Drop-in, 3-pack or unlimited monthly. Eight people max per block.'
