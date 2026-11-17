import Image from 'next/image'
import { BuilderButton } from '@/components/BuilderButton'
import { business } from '@/lib/business'

export default function GiftCards() {
  return (
    <section aria-labelledby="gift-title" className="section">
      <div className="wrap grid items-center gap-10 md:grid-cols-12 lg:gap-16">
        <div className="md:col-span-5 lg:col-span-4 lg:col-start-2">
          <Image
            src="/images/raw/06-rower-ski-erg-sticker-post.jpg"
            alt="A rower stood on end, a ski erg and a post covered in stickers against the mural wall."
            width={1152}
            height={1536}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 40vw, 90vw"
            className="reveal mx-auto h-auto w-full max-w-[400px] border-[3px] border-ink"
          />
        </div>
        <div className="md:col-span-7 lg:col-span-6">
          <p className="eyebrow text-muted">Gift cards</p>
          <h2 id="gift-title" className="mt-3 text-h2 uppercase">
            {business.lines.gift}
          </h2>
          <BuilderButton pass="gift" className="btn btn-primary mt-8">
            Get a gift card
          </BuilderButton>
        </div>
      </div>
    </section>
  )
}
