import Image from 'next/image'
import { BuilderButton } from '@/components/BuilderButton'
import { blocks, business } from '@/lib/business'

function StepNo({ n }: { n: string }) {
  return (
    <span aria-hidden="true" className="font-display text-[1.25rem] leading-none text-muted">
      {n} / 03
    </span>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section scroll-mt-16 border-t-2 border-ink">
      <div className="wrap">
        <p className="eyebrow text-muted">How a block works</p>
        <h2 id="how-title" className="mt-3 max-w-4xl text-h2 uppercase">
          {business.lines.steps}
        </h2>

        <ol className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
          {/* Step 1: photo 04 wide */}
          <li className="grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="reveal lg:col-span-8">
              <Image
                src="/images/raw/04-rogue-plyo-boxes-dumbbell-rack.jpg"
                alt="Three stacked Rogue wooden plyo boxes on the rubber floor with a rack of hex dumbbells behind."
                width={2500}
                height={1406}
                sizes="(min-width: 1280px) 780px, (min-width: 1024px) 64vw, 100vw"
                className="h-auto w-full border-[3px] border-ink"
              />
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <StepNo n="01" />
              <h3 className="mt-3 text-h2 uppercase">Snag your spot.</h3>
              <p className="mt-4 text-lead">
                Days run from 4:00am until 10:00pm, in 2-hour blocks. Eight spots per block. Reserve your time.
              </p>
            </div>
          </li>

          {/* Step 2: photo 07 as a small card beside large type */}
          <li className="grid items-center gap-8 md:grid-cols-[1fr_auto] lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8 lg:col-start-2">
              <StepNo n="02" />
              <h3 className="mt-3 font-display text-display uppercase">Show up.</h3>
              <p className="mt-4 max-w-xl text-h3 font-display uppercase leading-tight">
                108 142nd St. Unit C, Ocean City, MD 21842.
              </p>
              <p className="mt-3 text-lead font-bold">{business.lines.beThere}</p>
            </div>
            <div className="lg:col-span-3">
              <Image
                src="/images/raw/07-rig-climbing-rope-rings-small.jpg"
                alt="The rig with a climbing rope and gymnastic rings hanging under one bright light."
                width={310}
                height={552}
                sizes="200px"
                className="reveal h-auto w-[160px] border-[3px] border-ink md:w-[200px]"
              />
            </div>
          </li>

          {/* Step 3: photo 02 wide, on the other side */}
          <li className="grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="order-2 lg:order-1 lg:col-span-4 lg:pb-2">
              <StepNo n="03" />
              <h3 className="mt-3 text-h2 uppercase">Get it done.</h3>
              <p className="mt-4 text-lead">{business.equipment}</p>
            </div>
            <div className="reveal order-1 lg:order-2 lg:col-span-8">
              <Image
                src="/images/raw/02-interior-rack-lockers-climbing-rope.jpg"
                alt="Inside Train, wide: a black rack loaded with bumper plates, grey lockers, an adjustable bench and the climbing rope at the right."
                width={2500}
                height={1406}
                sizes="(min-width: 1280px) 780px, (min-width: 1024px) 64vw, 100vw"
                className="h-auto w-full border-[3px] border-ink"
              />
            </div>
          </li>
        </ol>

        <div className="mt-16 border-t border-line pt-8 lg:mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-h3 uppercase">Pick a block</h3>
            <p className="text-muted">
              {business.hoursLine}. {business.maxPerBlock} spots per block.
            </p>
          </div>
          <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
            {blocks.map((b) => (
              <li key={b.start}>
                <BuilderButton
                  block={b.start}
                  className="flex min-h-14 w-full items-center justify-center rounded-[6px] border-2 border-ink bg-chalk px-2 font-display text-[1.125rem] uppercase leading-tight transition-colors hover:bg-ink hover:text-chalk active:scale-[0.98]"
                >
                  {b.label}
                  <span className="sr-only"> block</span>
                </BuilderButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
