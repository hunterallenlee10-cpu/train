// Day chips and "has this block started" for Train's own clock (Ocean City, America/New_York).
const TZ = 'America/New_York'

export type Day = { index: number; key: string; short: string; sub: string; long: string }

const nyParts = (d = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(d)
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value)
  return { y: get('year'), m: get('month'), d: get('day'), h: get('hour') }
}

/** Seven days starting today, in Ocean City time. */
export const nextSevenDays = (now = new Date()): Day[] => {
  const { y, m, d } = nyParts(now)
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.UTC(y, m - 1, d + i, 12))
    const wk = date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' })
    const long = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' })
    const dm = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
    return {
      index: i,
      key: date.toISOString().slice(0, 10),
      short: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : wk,
      sub: dm,
      long: i === 0 ? `today, ${long}` : long,
    }
  })
}

/** Hour of the day in Ocean City right now. */
export const nyHour = (now = new Date()) => nyParts(now).h

/** A block that has already started today can't be picked for today. */
export const hasStarted = (dayIndex: number, blockStart: number, hour: number) => dayIndex === 0 && blockStart <= hour
