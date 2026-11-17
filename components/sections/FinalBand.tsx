import Image from 'next/image'
import { BuilderButton } from '@/components/BuilderButton'
import { business } from '@/lib/business'

/** Photo 02 under a flat ink overlay at 70%. */
export default function FinalBand() {
  return (
    <section aria-labelledby="final-title" className="on-ink relative isolate overflow-hidden">
      <Image
        src="/images/raw/02-interior-rack-lockers-climbing-rope.jpg"
        alt=""
        aria-hidden="true"
        width={2500}
        height={1406}
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />
      <div className="wrap section text-center">
        <h2 id="final-title" className="mx-auto max-w-4xl font-display text-display uppercase">
          {business.lines.getItDone}
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <BuilderButton className="btn btn-primary text-[1.0625rem]">Book a Block</BuilderButton>
          <a className="btn btn-ghost text-[1.0625rem]" href={`mailto:${business.email}`}>
            Email Evan
          </a>
        </div>
      </div>
    </section>
  )
}
