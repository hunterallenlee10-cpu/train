import { BuilderButton } from '@/components/BuilderButton'
import { Logo } from '@/components/Logo'
import { business, passes, type PassId } from '@/lib/business'

type Card = {
  id: Exclude<PassId, 'gift'>
  extra: string
  cta: string
  marked?: boolean
}

const cards: Card[] = [
  { id: 'dropin', extra: 'Good for: one workout, or trying the place.', cta: 'Book a Drop-In' },
  { id: 'threepack', extra: 'That is $23 a block.', cta: 'Get the 3-Pack' },
  { id: 'unlimited', extra: business.lines.noFee, cta: 'Go Unlimited', marked: true },
]

/** Drips hanging off the bottom edge of the ink band, echoing the drips on his wordmark. */
const drips = [
  { left: '4%', len: 34, w: 10 },
  { left: '13%', len: 70, w: 14 },
  { left: '27%', len: 22, w: 9 },
  { left: '41%', len: 52, w: 12 },
  { left: '58%', len: 96, w: 15 },
  { left: '66%', len: 28, w: 9 },
  { left: '79%', len: 60, w: 13 },
  { left: '92%', len: 40, w: 11 },
]

function Drips() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full h-28 overflow-hidden">
      {drips.map((d, i) => (
        <svg
          key={i}
          viewBox={`0 0 ${d.w * 2} ${d.len + d.w * 2}`}
          width={d.w * 2}
          height={d.len + d.w * 2}
          className={`absolute top-0 fill-ink ${i % 2 ? 'hidden md:block' : ''}`}
          style={{ left: d.left }}
        >
          <path
            d={`M0 0h${d.w * 2}c${-d.w * 0.5} ${d.w * 0.4} ${-d.w * 0.62} ${d.w * 0.9} ${-d.w * 0.62} ${d.w * 1.6}V${d.len}h${-d.w * 0.76}V${d.w * 1.6}C${d.w * 0.62} ${d.w * 0.9} ${d.w * 0.5} ${d.w * 0.4} 0 0z`}
          />
          <circle cx={d.w} cy={d.len + d.w * 0.35} r={d.w * 0.72} />
        </svg>
      ))}
    </div>
  )
}

export default function Passes() {
  return (
    <>
      <section id="passes" aria-labelledby="passes-title" className="on-ink relative scroll-mt-16">
        <div className="wrap section pb-16 lg:pb-24">
          <Logo tone="white" sizes="96px" className="h-auto w-[76px] md:w-[92px]" />
          <h2 id="passes-title" className="mt-6 text-h2 uppercase">
            Three ways in.
          </h2>
          <p className="mt-3 text-lead text-muted-on-ink">
            Every block is two hours. Eight people max.
          </p>

          <ul className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6 lg:mt-14 lg:grid-cols-3">
            {cards.map((c) => {
              const p = passes[c.id]
              return (
                <li
                  key={c.id}
                  className={`relative flex flex-col rounded-[6px] bg-rubber p-6 md:p-7 lg:p-8 ${
                    c.marked ? 'order-first border-2 border-spray md:col-span-2 lg:order-none lg:col-span-1' : 'border border-rubber-line'
                  }`}
                >
                  {c.marked ? (
                    <p className="tag-spray mb-5 self-start">Best if you train 5 or more times a month</p>
                  ) : null}
                  <h3 className="text-h3 uppercase">{p.name}</h3>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-[4.5rem] leading-none lg:text-[5.5rem]">${p.price}</span>
                    <span className="font-medium text-muted-on-ink">{p.unit}</span>
                  </p>
                  <p className="mt-5 text-lead">{p.line}</p>
                  <p className={`mt-3 ${c.marked ? 'font-bold text-chalk' : 'text-muted-on-ink'}`}>
                    {c.marked ? <span className="font-display text-h3 uppercase leading-tight">{c.extra}</span> : c.extra}
                  </p>
                  <div className="mt-auto pt-8">
                    <BuilderButton pass={c.id} className={`btn w-full ${c.marked ? 'btn-primary' : 'btn-ghost'}`}>
                      {c.cta}
                    </BuilderButton>
                  </div>
                </li>
              )
            })}
          </ul>

          <noscript>
            <p className="mt-6 text-lead">
              The Block Builder needs JavaScript.{' '}
              <a className="link" href={business.links.checkout}>
                Open Train&apos;s current checkout
              </a>
            </p>
          </noscript>

          <div className="mt-8 flex flex-col gap-3 border-t border-rubber-line pt-6 text-muted-on-ink md:flex-row md:items-center md:justify-between">
            <p>
              <span className="font-bold text-chalk">Bringing someone?</span> Members can add a guest to any block for $
              {business.guestPrice}.
            </p>
            <p className="flex flex-wrap items-center gap-x-2">
              <span className="font-bold text-chalk">Giving it to someone?</span>
              <BuilderButton pass="gift" className="link inline-flex min-h-11 items-center">
                Gift cards
              </BuilderButton>
            </p>
          </div>
        </div>
        <Drips />
      </section>
      <div className="wrap pt-36 text-center md:pt-32">
        <p className="text-muted">
          Already have a pass?{' '}
          <a className="link" href={business.links.login}>
            Log in to book.
          </a>
        </p>
      </div>
    </>
  )
}
