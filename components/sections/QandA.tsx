import { Plus } from 'lucide-react'
import { faq } from '@/lib/faq'

/** Native details/summary accordion: works without JavaScript, one open at a time. */
export default function QandA() {
  return (
    <section id="q-and-a" aria-labelledby="qa-title" className="section scroll-mt-16 border-t-2 border-ink">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-muted">Before you come</p>
          <h2 id="qa-title" className="mt-3 text-h2 uppercase">
            Q and A
          </h2>
        </div>
        <div className="lg:col-span-8">
          <div className="border-t-2 border-ink">
            {faq.map((item, i) => (
              <details key={item.q} name="qa" className="group border-b border-line" open={i === 0}>
                <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-4 text-lead font-bold hover:underline hover:decoration-2 hover:underline-offset-4">
                  <h3 className="font-sans font-bold">{item.q}</h3>
                  <Plus
                    aria-hidden="true"
                    strokeWidth={2.25}
                    className="size-6 shrink-0 transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="measure pb-6 pr-10 text-lead">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
