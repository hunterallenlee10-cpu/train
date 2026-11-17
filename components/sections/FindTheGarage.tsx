import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { business } from '@/lib/business'

/** Proof he is real: the room and the owner. There are no reviews yet, so none are shown. */
export default function FindTheGarage() {
  const a = business.address
  return (
    <section id="find-the-garage" aria-labelledby="garage-title" className="section bg-chalk/60 border-y border-line">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <div className="reveal relative aspect-[16/15] overflow-hidden border-[3px] border-ink bg-ink">
            <Image
              src="/images/raw/01-GARAGE-DOOR-OPEN-exterior-BEST.jpg"
              alt="The outside of Train on 142nd St.: number 108 on the blue metal building and the garage door rolled all the way up over the racks, rig and rubber floor."
              width={2500}
              height={1875}
              sizes="(min-width: 1280px) 590px, (min-width: 1024px) 48vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover object-[100%_50%]"
            />
          </div>
        </div>
        <div className="lg:col-span-6 lg:pt-2">
          <p className="eyebrow text-muted">From the owner</p>
          <h2 id="garage-title" className="mt-3 text-h2 uppercase">
            Find the garage.
          </h2>
          <figure className="mt-8 border-l-[6px] border-ink pl-5 md:pl-7">
            <blockquote>
              <p className="text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] font-medium leading-snug">
                &ldquo;{business.ownerNote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-4 font-bold">
              {business.owner}, {business.ownerTitle}
            </figcaption>
          </figure>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-sans text-label font-bold uppercase tracking-[0.14em] text-muted">Address</h3>
              <address className="mt-2 not-italic">
                <span className="block font-bold">{business.name}</span>
                <span className="block">{a.full}</span>
              </address>
              <p className="mt-2 text-muted">{a.area}</p>
            </div>
            <div>
              <h3 className="font-sans text-label font-bold uppercase tracking-[0.14em] text-muted">Parking</h3>
              <p className="mt-2">{business.parking.where}</p>
              <p className="mt-1">&ldquo;{business.parking.note}&rdquo;</p>
            </div>
          </div>
          <p className="mt-8">
            <a className="link inline-flex min-h-11 items-center gap-2" href={business.links.maps}>
              <MapPin aria-hidden="true" strokeWidth={2.25} className="size-5" />
              Get directions to Train
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
