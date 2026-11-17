import Image from 'next/image'
import { BuilderButton } from '@/components/BuilderButton'
import GarageDoor from '@/components/GarageDoor'
import { Logo } from '@/components/Logo'
import { passes } from '@/lib/business'

/** One sprayed green stroke, a filled shape with overspray and a drip, drawn behind the word "block". */
function SprayStroke() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -left-[3%] top-[46%] -z-10 h-[46%] w-[100%] -rotate-[2deg] fill-spray"
    >
      <path d="M14 30c30-12 82-16 140-15 62 1 122-4 176-6 30-1 54 1 62 9 8 9 6 24 2 36-4 14-2 26-10 34-10 10-36 9-70 10-58 2-118 4-176 6-44 2-86 4-112-2-18-4-24-16-24-30 0-16 0-32 12-42z" />
      <path d="M300 92c3 0 4 3 4 7v8c0 4 3 6 3 8a4 4 0 0 1-8 0c0-2 2-4 2-8v-9c-1-3-1-6-1-6z" />
      <circle cx="6" cy="24" r="3" />
      <circle cx="20" cy="14" r="1.8" />
      <circle cx="394" cy="18" r="2.4" />
      <circle cx="388" cy="98" r="2" />
      <circle cx="398" cy="60" r="1.5" />
      <circle cx="30" cy="104" r="1.6" />
      <circle cx="356" cy="6" r="1.4" />
    </svg>
  )
}

const priceRow = [
  { pass: 'dropin' as const, price: `$${passes.dropin.price}`, unit: null, label: 'Drop-In' },
  { pass: 'threepack' as const, price: `$${passes.threepack.price}`, unit: null, label: '3-Pack' },
  { pass: 'unlimited' as const, price: `$${passes.unlimited.price}`, unit: 'a month', label: 'Unlimited' },
]

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative scroll-mt-20">
      <div className="wrap grid gap-8 pb-12 pt-7 md:pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-14">
        <div className="flex flex-col lg:col-span-7 lg:justify-center">
          <h1 id="hero-title" className="font-sans">
            <span className="eyebrow block text-muted">
              Private gym passes · Ocean City, MD
            </span>{' '}
            <span className="mt-3 block font-display text-display uppercase md:mt-4">
              Pick a pass.{' '}
              <br />
              Book a{' '}
              <span className="relative isolate inline-block px-[0.04em]">
                <SprayStroke />
                block.
              </span>
            </span>
          </h1>

          <p className="measure mt-5 text-lead text-ink md:mt-7">
            <strong className="font-bold">Train is a private garage gym in Ocean City, Maryland.</strong> Two hours.
            Eight people max. No class, no instructor. Train exactly how you want.
          </p>

          <div id="hero-actions" className="mt-6 flex flex-wrap gap-3 md:mt-8">
            <BuilderButton className="btn btn-primary text-[1.0625rem]">Book a Block</BuilderButton>
            <a href="#passes" className="btn btn-ghost text-[1.0625rem]">
              See the passes
            </a>
          </div>

          <ul
            aria-label="Pass prices"
            className="on-ink mt-6 grid max-w-xl grid-cols-[1fr_1fr_1.4fr] overflow-hidden rounded-[6px] md:mt-9"
          >
            {priceRow.map((p, i) => (
              <li key={p.pass} className={i > 0 ? 'border-l border-rubber-line' : ''}>
                <BuilderButton
                  pass={p.pass}
                  className="group flex min-h-[78px] w-full flex-col items-start justify-center px-3 py-2.5 text-left transition-colors hover:bg-rubber md:px-5"
                >
                  <span className="flex items-baseline gap-1 whitespace-nowrap">
                    <span className="font-display text-[2rem] leading-none text-chalk md:text-[2.5rem]">{p.price}</span>
                    {p.unit ? <span className="text-label font-medium text-muted-on-ink">{p.unit}</span> : null}
                  </span>
                  <span className="mt-1 text-label font-bold text-chalk underline decoration-muted-on-ink decoration-2 underline-offset-4 group-hover:decoration-spray">
                    {p.label}
                  </span>
                </BuilderButton>
              </li>
            ))}
          </ul>
        </div>

        <div className="-mx-4 md:mx-0 lg:col-span-5">
          <div
            data-door-frame=""
            className="relative aspect-[4/3] overflow-hidden border-y-[3px] border-ink bg-ink md:border-[3px] lg:aspect-[4/5]"
          >
            <Image
              src="/images/raw/01-GARAGE-DOOR-OPEN-exterior-BEST.jpg"
              alt="Train from the parking lot with the garage door rolled all the way up: black Rogue rig and racks, bumper plates, benches and rubber floor inside a blue metal building on 142nd St."
              width={2500}
              height={1875}
              preload
              fetchPriority="high"
              quality={70}
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
              className="hero-photo absolute inset-0 h-full w-full object-cover"
            />
            <GarageDoor>
              <div className="door absolute inset-0 z-10 bg-chalk" data-door="">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative h-1/5 border-b-[3px] border-muted-on-ink/50 last:border-b-0">
                    <div className="absolute inset-x-[6%] top-[28%] h-px bg-line" />
                    <div className="absolute inset-x-[6%] top-[62%] h-px bg-line" />
                  </div>
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Logo sizes="240px" className="w-[44%] max-w-[240px] opacity-95" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-3 bg-ink" />
                <div className="absolute bottom-[9%] left-1/2 h-2 w-14 -translate-x-1/2 rounded-full bg-ink/80" />
              </div>
            </GarageDoor>
          </div>
          <p className="mt-3 border-l-[3px] border-ink px-4 text-label text-muted md:px-3">
            108 142nd St., Unit C, Ocean City. The door is up when the weather is right.
          </p>
        </div>
      </div>
    </section>
  )
}
