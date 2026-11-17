'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, X } from 'lucide-react'
import { business, emailHref, passes, type PassId } from '@/lib/business'
import { IS_LIVE } from '@/lib/site'
import { hasStarted, nextSevenDays, nyHour } from './dates'
import type { Order } from './order'
import { FinalPanel, StepBlock, StepPass, StepReview } from './Steps'

type StepId = 'pass' | 'block' | 'review' | 'final'

const titles: Record<StepId, string> = {
  pass: 'Pick your pass',
  block: 'Pick your block',
  review: 'Review',
  final: 'One more thing',
}

type Props = { initialPass?: PassId; initialBlock?: number; onClose: () => void }

/**
 * The Block Builder. A modal on desktop and a full-screen sheet on phones.
 * Three tap-only steps (two for a gift card), then the honest last step.
 */
export default function BlockBuilder({ initialPass, initialBlock, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const days = useMemo(() => nextSevenDays(), [])
  const hour = useMemo(() => nyHour(), [])

  const [order, setOrder] = useState<Order>(() => {
    const block = initialBlock ?? null
    const todayGone = block !== null && hasStarted(0, block, hour)
    return { pass: initialPass ?? null, people: 1, guests: 0, day: days[todayGone ? 1 : 0], block }
  })
  const [step, setStep] = useState<StepId>('pass')
  const set = useCallback((o: Partial<Order>) => setOrder((prev) => ({ ...prev, ...o })), [])

  const flow: StepId[] = order.pass === 'gift' ? ['pass', 'review'] : ['pass', 'block', 'review']
  const index = flow.indexOf(step)
  const canNext = step === 'pass' ? !!order.pass : step === 'block' ? !!order.day && order.block !== null : true

  // Open as a modal: Esc closes, the page behind is inert, scroll is locked, focus is trapped.
  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (!d.open) d.showModal()
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    const onCancel = (e: Event) => {
      e.preventDefault()
      onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = Array.from(
        d.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]'),
      ).filter((el) => el.offsetParent !== null || el.matches('input'))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === heading.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    d.addEventListener('cancel', onCancel)
    d.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prev
      d.removeEventListener('cancel', onCancel)
      d.removeEventListener('keydown', onKey)
      if (d.open) d.close()
    }
  }, [onClose])

  // Move focus to the step title whenever the step changes.
  useEffect(() => {
    heading.current?.focus()
  }, [step])

  const next = () => {
    if (!canNext) return
    if (step === 'review') {
      const url = passes[order.pass!].checkoutUrl
      if (IS_LIVE) window.location.assign(url)
      else setStep('final')
      return
    }
    setStep(flow[index + 1])
  }
  const back = () => {
    if (step === 'final') return setStep('review')
    if (index > 0) setStep(flow[index - 1])
  }

  const stepNo = step === 'final' ? flow.length : index + 1
  const missing = step === 'pass' ? 'Pick a pass to go on.' : step === 'block' ? 'Pick a day and a block to go on.' : ''

  return (
    <dialog
      ref={dialog}
      aria-labelledby="bb-title"
      className="block-builder m-0 hidden h-dvh open:flex max-h-none w-full max-w-none flex-col bg-paper p-0 text-ink md:m-auto md:h-auto md:max-h-[min(860px,92dvh)] md:max-w-[640px] md:rounded-[6px] md:border-2 md:border-ink"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 md:px-6">
        <p className="eyebrow text-muted">Block Builder</p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-11 items-center justify-center rounded border-2 border-ink"
          aria-label="Close the Block Builder"
        >
          <X aria-hidden="true" strokeWidth={2.25} className="size-6" />
        </button>
      </div>

      <div className="px-4 pt-4 md:px-6">
        <p className="text-label font-bold" aria-live="polite">
          Step {stepNo} of {flow.length}
        </p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div
            className="h-full rounded-full bg-ink transition-[width] duration-300"
            style={{ width: `${(stepNo / flow.length) * 100}%` }}
          />
        </div>
        <h2 id="bb-title" ref={heading} tabIndex={-1} className="mt-5 text-h2 uppercase outline-none">
          {titles[step]}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-5 md:px-6">
        {step === 'pass' ? <StepPass order={order} set={set} /> : null}
        {step === 'block' ? <StepBlock order={order} set={set} days={days} hour={hour} /> : null}
        {step === 'review' ? <StepReview order={order} /> : null}
        {step === 'final' ? <FinalPanel order={order} /> : null}
      </div>

      <div className="border-t border-line bg-paper px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 md:px-6">
        {step !== 'final' ? (
          <div className="flex items-center gap-3">
            {index > 0 ? (
              <button type="button" className="btn btn-ghost" onClick={back}>
                <ArrowLeft aria-hidden="true" strokeWidth={2.25} className="size-5" />
                Back
              </button>
            ) : null}
            <button type="button" className="btn btn-primary flex-1" onClick={next} disabled={!canNext}>
              {step === 'review' ? 'Continue to secure checkout' : 'Next'}
            </button>
          </div>
        ) : (
          <button type="button" className="btn btn-ghost w-full" onClick={back}>
            <ArrowLeft aria-hidden="true" strokeWidth={2.25} className="size-5" />
            Back to the review
          </button>
        )}
        {!canNext && missing ? <p className="mt-2 text-label text-muted">{missing}</p> : null}
        <p className="mt-2 text-center text-label text-muted">
          Rather ask first?{' '}
          <a className="link" href={emailHref()}>
            Email Evan.
          </a>
          <span className="sr-only"> {business.email}</span>
        </p>
      </div>
    </dialog>
  )
}
