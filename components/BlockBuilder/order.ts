import { blocks, business, passes, type PassId } from '@/lib/business'
import { money } from '@/lib/pricing'
import type { Day } from './dates'

export type Order = {
  pass: PassId | null
  people: number
  guests: number
  day: Day | null
  block: number | null
}

export const blockLabel = (start: number | null) => blocks.find((b) => b.start === start)?.label ?? ''

/** The total as plain arithmetic, e.g. "2 × $25 = $50". */
export const totalLine = (o: Order) => {
  if (!o.pass) return ''
  const p = passes[o.pass]
  if (o.pass === 'gift') return 'Gift card amount not listed on this page'
  if (o.pass === 'unlimited') {
    if (!o.guests) return `${money(p.price!)} a month`
    const g = o.guests * business.guestPrice
    return `${money(p.price!)} a month + ${o.guests} guest${o.guests === 1 ? '' : 's'} × ${money(business.guestPrice)} = ${money(p.price! + g)}`
  }
  const total = o.people * p.price!
  return o.people === 1 ? `${money(p.price!)}` : `${o.people} × ${money(p.price!)} = ${money(total)}`
}

export const whoLine = (o: Order) => {
  if (o.pass === 'unlimited') return o.guests ? `You plus ${o.guests} guest${o.guests === 1 ? '' : 's'}` : 'Just you'
  if (o.pass === 'dropin' || o.pass === 'threepack') return `${o.people} ${o.people === 1 ? 'person' : 'people'}`
  return ''
}

/** Plain-text summary for "Email this request" and "Copy my request". */
export const requestText = (o: Order) => {
  if (!o.pass) return ''
  const p = passes[o.pass]
  if (o.pass === 'gift') return `Hi Evan, I'd like to buy a Train gift card.`
  const who = whoLine(o).toLowerCase()
  const when =
    o.day && o.block !== null
      ? ` for the ${blockLabel(o.block)} block ${o.day.index === 0 ? o.day.long : `on ${o.day.long}`}`
      : ''
  return `Hi Evan, I'd like to buy a ${p.name} (${who})${when}. Total shown on the page: ${totalLine(o)}, plus tax if any.`
}
