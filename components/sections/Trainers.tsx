import Image from 'next/image'
import { business, emailHref } from '@/lib/business'

/** The skull mural (photo 05, already darkened by the owner) behind the trainers and whole-space offer. */
export default function Trainers() {
  return (
    <section aria-labelledby="trainers-title" className="on-ink relative isolate overflow-hidden">
      <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
        <Image
          src="/images/raw/05-skull-beach-mural-wall-darkened.jpg"
          alt="The hand-painted wall mural at Train: skulls, palm trees, a beach and hibiscus flowers, with the rig at the right."
          width={1955}
          height={1100}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-[22%_50%] lg:object-[30%_50%]"
        />
      </div>
      <div className="wrap relative py-0 lg:flex lg:min-h-[640px] lg:items-center lg:justify-end lg:py-24">
        <div className="-mt-6 rounded-[6px] border border-rubber-line bg-rubber p-6 md:p-8 lg:mt-0 lg:max-w-[460px] lg:p-10">
          <p className="eyebrow text-muted-on-ink">Trainers and groups</p>
          <h2 id="trainers-title" className="mt-3 text-h2 uppercase">
            Train your clients here.
          </h2>
          <p className="mt-5 text-lead">
            A high quality, private, professional space to meet clients without the noise of a big commercial gym. You can
            also rent the whole space for a group.
          </p>
          <a className="btn btn-ghost mt-8" href={emailHref('Trainer or group rates at Train')}>
            Email Evan about rates
          </a>
          <p className="mt-4 text-label text-muted-on-ink">Rates by email: {business.email}</p>
        </div>
      </div>
      <div className="h-10 lg:hidden" />
    </section>
  )
}
