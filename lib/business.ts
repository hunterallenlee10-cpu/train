// Every fact on the page lives here.
// Source: trainocmd.com, read on 17 November 2026, plus Evan's own email (BUILD-SPEC.md section 1).
// Anything assumed is marked as a draft (see SEO-LAUNCH.md). Live builds fail while those markers remain.

export type PassId = 'dropin' | 'threepack' | 'unlimited' | 'gift'

export type Pass = {
  id: PassId
  name: string
  shortName: string
  price: number | null
  unit: string
  line: string
  checkoutUrl: string
}

const CURRENT_CHECKOUT = 'https://www.trainocmd.com/buy'

export const business = {
  wordmark: 'train.',
  name: 'Train',
  owner: 'Evan Dittler',
  ownerTitle: 'Owner',
  description: 'Private garage gym and personal training space in Ocean City, Maryland.',
  blockHours: 2,
  maxPerBlock: 8,
  address: {
    full: '108 142nd St., Unit C, Ocean City, MD 21842',
    street: '108 142nd St., Unit C',
    streetNoUnit: '108 142nd St.',
    unit: 'Unit C',
    city: 'Ocean City',
    region: 'MD',
    regionLong: 'Maryland',
    postalCode: '21842',
    country: 'US',
    area: 'Bayside, between Coastal Highway and Sinepuxent Ave.',
    areaLong: 'Bayside, in a newly built garage between Coastal Highway and Sinepuxent Ave.',
  },
  // Coordinates for 108 142nd Street from OpenStreetMap (two buildings share the number).
  geo: { latitude: 38.4473, longitude: -75.053 }, // DRAFT: confirm the map pin is Unit C
  phone: null as string | null, // No phone published. Keep null until Evan wants Call and Text buttons.
  email: 'info@trainocmd.com',
  hoursLine: 'Blocks from 4:00am to 10:00pm',
  opens: '04:00',
  closes: '22:00',
  // DRAFT: confirm these run every day of the week
  openDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  links: {
    login: 'https://trainocmd.com/login',
    schedule: 'https://www.trainocmd.com/schedule',
    checkout: CURRENT_CHECKOUT,
    terms: 'https://www.trainocmd.com/terms-of-service',
    privacy: 'https://www.trainocmd.com/privacy-policy',
    instagram: 'https://www.instagram.com/train_142/', // DRAFT: assumed Instagram, confirm
    maps: 'https://www.google.com/maps/search/?api=1&query=108%20142nd%20St.%20Unit%20C%2C%20Ocean%20City%2C%20MD%2021842',
  },
  social: '@train_142', // DRAFT: assumed Instagram, confirm
  guestPrice: 25,
  parking: {
    where: 'Spots right out front, then Sinepuxent Ave.',
    note: 'Please leave first spot open on nice days in case you want to workout outside!',
  },
  ownerNote:
    "I've had some of the best workouts of my life in my old garage gym. No waiting for equipment. No explaining myself. No group workout plan to follow. When I moved, I missed it immediately.",
  equipment:
    'Brand new equipment, a climbing rope, sleds, portable turf, air bikes, rowers, and bumper plates for when you need to drop it. The garage door opens when the weather is right.',
  lines: {
    tagline: 'Your workout. Your space. No crowds.',
    getItDone: 'Train here. Get it done.',
    howYouWant: 'Train exactly how you want.',
    steps: 'Snag your spot. Show up. Get it done.',
    beThere: 'Be there.',
    getAfterIt: 'Get after it.',
    neverCrowded: 'We are never crowded, by design.',
    gift: 'For the person who has everything but a good gym.',
    noFee: 'No GTFO fee ever. I mean it.',
  },
  bookingSystem: 'Mariana Tek',
} as const

export const passes: Record<PassId, Pass> = {
  dropin: {
    id: 'dropin',
    name: 'Drop-In',
    shortName: 'Drop-In',
    price: 25,
    unit: 'per person',
    line: 'A one-time 2 hour block for you to Train.',
    checkoutUrl: CURRENT_CHECKOUT, // DRAFT: replace with the Mariana Tek product link for each pass
  },
  threepack: {
    id: 'threepack',
    name: '3-Pack',
    shortName: '3-Pack',
    price: 69,
    unit: 'per person',
    line: 'For the Weekend Warriors in town.',
    checkoutUrl: CURRENT_CHECKOUT, // DRAFT: replace with the Mariana Tek product link for each pass
  },
  unlimited: {
    id: 'unlimited',
    name: 'Train Unlimited',
    shortName: 'Unlimited',
    price: 99,
    unit: 'a month',
    line: 'Unlimited access, one flat monthly price.',
    checkoutUrl: CURRENT_CHECKOUT, // DRAFT: replace with the Mariana Tek product link for each pass
  },
  gift: {
    id: 'gift',
    name: 'Gift card',
    shortName: 'Gift card',
    price: null, // DRAFT: confirm gift card amounts (not published)
    unit: '',
    line: 'Amounts are not listed on this page yet.',
    checkoutUrl: CURRENT_CHECKOUT, // DRAFT: replace with the Mariana Tek product link for each pass
  },
}

// Nine 2-hour blocks a day, 4:00am to 10:00pm.
export type Block = { start: number; label: string; long: string }
export const blocks: Block[] = [
  { start: 4, label: '4 to 6am', long: '4:00am to 6:00am' },
  { start: 6, label: '6 to 8am', long: '6:00am to 8:00am' },
  { start: 8, label: '8 to 10am', long: '8:00am to 10:00am' },
  { start: 10, label: '10am to 12pm', long: '10:00am to 12:00pm' },
  { start: 12, label: '12 to 2pm', long: '12:00pm to 2:00pm' },
  { start: 14, label: '2 to 4pm', long: '2:00pm to 4:00pm' },
  { start: 16, label: '4 to 6pm', long: '4:00pm to 6:00pm' },
  { start: 18, label: '6 to 8pm', long: '6:00pm to 8:00pm' },
  { start: 20, label: '8 to 10pm', long: '8:00pm to 10:00pm' },
]

export const emailHref = (subject?: string, body?: string) => {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const q = params.toString().replace(/\+/g, '%20')
  return `mailto:${business.email}${q ? `?${q}` : ''}`
}
