import Image from 'next/image'
import BlockMath from '@/components/BlockMath/BlockMath'

export default function BlockMathSection() {
  return (
    <section id="block-math" aria-labelledby="block-math-title" className="section pt-16 lg:pt-20">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="eyebrow text-muted">Block Math</p>
          <h2 id="block-math-title" className="mt-3 text-h2 uppercase">
            Which pass is cheapest for you?
          </h2>
          <div className="mt-8">
            <BlockMath />
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
          <div className="reveal relative aspect-[4/3] overflow-hidden border-[3px] border-ink bg-ink lg:aspect-[2/3]">
            <Image
              src="/images/raw/03-echo-bike-dumbbells-kettlebells-skull-mural.jpg"
              alt="Inside Train: a Rogue Echo bike, a rack of hex dumbbells and kettlebells, and the edge of the hand-painted skull and hibiscus mural."
              width={2500}
              height={3333}
              sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, 100vw"
              className="photo-03 absolute inset-0 h-full w-full object-cover"
            />
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
