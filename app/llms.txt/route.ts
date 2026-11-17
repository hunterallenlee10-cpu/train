import { business, passes } from '@/lib/business'
import { abs, IS_LIVE } from '@/lib/site'

export const dynamic = 'force-static'

// llms.txt: served as Markdown in live mode only. Demo mode returns 404.
export function GET() {
  if (!IS_LIVE) {
    return new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
  const a = business.address
  const body = `# ${business.wordmark} (Train), Ocean City, MD

> ${business.description} Two-hour blocks, ${business.maxPerBlock} people max per block, no class and no instructor.

## Passes

- ${passes.dropin.name}: $${passes.dropin.price} ${passes.dropin.unit}. ${passes.dropin.line}
- ${passes.threepack.name}: $${passes.threepack.price} ${passes.threepack.unit}. ${passes.threepack.line}
- ${passes.unlimited.name}: $${passes.unlimited.price} ${passes.unlimited.unit}. ${passes.unlimited.line} ${business.lines.noFee}
- Guests: members can add a guest to their block for $${business.guestPrice}.

## Visit

- Address: ${a.full}. ${a.areaLong}
- Blocks: 4:00am to 10:00pm, nine 2-hour blocks a day.
- Parking: ${business.parking.where}
- Email: ${business.email}

## Links

- [Buy a pass and book a block](${abs('/')})
- [Booking calendar](${business.links.schedule})
- [Member log-in](${business.links.login})
`
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}
