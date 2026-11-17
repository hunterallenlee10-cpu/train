import { useState } from 'react'
import { blocks, business, emailHref, passes, type PassId } from '@/lib/business'
import { money } from '@/lib/pricing'
import Stepper from './Stepper'
import { hasStarted, type Day } from './dates'
import { blockLabel, requestText, totalLine, whoLine, type Order } from './order'

const choiceBase =
  'flex cursor-pointer items-center justify-between gap-4 rounded-[6px] border-2 px-4 text-left transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-ink'
const choiceOn = 'border-ink bg-spray text-ink'
const choiceOff = 'border-line bg-chalk hover:border-ink'

const passOrder: PassId[] = ['dropin', 'threepack', 'unlimited', 'gift']

export function StepPass({ order, set }: { order: Order; set: (o: Partial<Order>) => void }) {
  return (
    <fieldset>
      <legend className="sr-only">Pick your pass</legend>
      <div className="grid gap-3">
        {passOrder.map((id) => {
          const p = passes[id]
          const on = order.pass === id
          return (
            <label key={id} className={`${choiceBase} min-h-[72px] w-full py-3 ${on ? choiceOn : choiceOff}`}>
              <input
                type="radio"
                name="bb-pass"
                value={id}
                checked={on}
                onChange={() => set({ pass: id })}
                className="sr-only"
              />
              <span>
                <span className="block font-display text-h3 uppercase leading-none">{p.name}</span>
                <span className={`mt-1 block text-label ${on ? 'text-ink' : 'text-muted'}`}>
                  {id === 'gift' ? 'For someone else.' : p.line}
                </span>
              </span>
              <span className="shrink-0 text-right">
                {p.price !== null ? (
                  <>
                    <span className="block font-display text-[1.75rem] leading-none">{money(p.price)}</span>
                    <span className={`block text-label ${on ? 'text-ink' : 'text-muted'}`}>{p.unit}</span>
                  </>
                ) : null}
              </span>
            </label>
          )
        })}
      </div>
      {order.pass === 'dropin' || order.pass === 'threepack' ? (
        // DRAFT: confirm one buyer can pay for several people
        <Stepper
          label="How many people?"
          hint={`${money(passes[order.pass].price!)} per person, up to ${business.maxPerBlock}.`}
          value={order.people}
          min={1}
          max={business.maxPerBlock}
          unit={(n) => (n === 1 ? 'person' : 'people')}
          onChange={(people) => set({ people })}
        />
      ) : null}
      {order.pass === 'unlimited' ? (
        <Stepper
          label="Guests on this block"
          hint={`Members can add a guest for ${money(business.guestPrice)} each.`}
          value={order.guests}
          min={0}
          max={business.maxPerBlock - 1}
          unit={(n) => (n === 1 ? 'guest' : 'guests')}
          onChange={(guests) => set({ guests })}
        />
      ) : null}
    </fieldset>
  )
}

export function StepBlock({ order, set, days, hour }: { order: Order; set: (o: Partial<Order>) => void; days: Day[]; hour: number }) {
  return (
    <div>
      <fieldset>
        <legend className="font-bold">Day</legend>
        <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-2">
          {days.map((d) => {
            const on = order.day?.key === d.key
            return (
              <label
                key={d.key}
                className={`${choiceBase} min-h-14 min-w-[76px] shrink-0 flex-col items-start justify-center gap-0 px-3 py-2 ${on ? choiceOn : choiceOff}`}
              >
                <input
                  type="radio"
                  name="bb-day"
                  value={d.key}
                  checked={on}
                  onChange={() => {
                    const clash = order.block !== null && hasStarted(d.index, order.block, hour)
                    set({ day: d, block: clash ? null : order.block })
                  }}
                  className="sr-only"
                />
                <span className="font-bold leading-tight">{d.short}</span>
                <span className={`text-label ${on ? 'text-ink' : 'text-muted'}`}>{d.sub}</span>
              </label>
            )
          })}
        </div>
      </fieldset>
      <fieldset className="mt-5">
        <legend className="font-bold">Block</legend>
        <p className="mt-1 text-label text-muted">{business.maxPerBlock} spots per block. Live availability is checked at checkout.</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {blocks.map((b) => {
            const started = order.day ? hasStarted(order.day.index, b.start, hour) : false
            const on = order.block === b.start
            return (
              <label
                key={b.start}
                className={`${choiceBase} min-h-14 w-full flex-col justify-center gap-0 font-display text-[1.25rem] uppercase ${
                  started ? 'cursor-not-allowed border-line bg-paper text-muted' : on ? choiceOn : choiceOff
                }`}
              >
                <input
                  type="radio"
                  name="bb-block"
                  value={b.start}
                  checked={on}
                  disabled={started}
                  onChange={() => set({ block: b.start })}
                  className="sr-only"
                />
                <span className="leading-tight">{b.label}</span>
                {started ? <span className="font-sans text-label font-medium normal-case">Started</span> : null}
              </label>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}

export function StepReview({ order }: { order: Order }) {
  if (!order.pass) return null
  const p = passes[order.pass]
  const rows: [string, string][] = [['Pass', p.price === null ? p.name : `${p.name}, ${money(p.price)} ${p.unit}`]]
  if (order.pass !== 'gift') {
    rows.push([order.pass === 'unlimited' ? 'Guests' : 'People', whoLine(order)])
    rows.push(['Day', order.day ? order.day.long.replace(/^today, /, 'Today, ') : ''])
    rows.push(['Block', blockLabel(order.block)])
  }
  return (
    <div>
      <dl className="divide-y divide-line rounded-[6px] border border-line bg-chalk">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-3">
            <dt className="text-muted">{k}</dt>
            <dd className="text-right font-bold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 rounded-[6px] border-2 border-ink p-4">
        <p className="text-label font-bold uppercase tracking-[0.14em] text-muted">Total</p>
        <p className="mt-1 font-display text-h3 uppercase">{totalLine(order)}</p>
        <p className="mt-1 text-muted">plus tax if any</p>
      </div>
    </div>
  )
}

export function FinalPanel({ order }: { order: Order }) {
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle')
  const text = requestText(order)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied('done')
    } catch {
      setCopied('failed')
    }
  }
  return (
    <div>
      <p className="text-lead font-medium">
        This is a concept. On the live page this button opens Train&apos;s secure checkout with your pass already chosen.
      </p>
      <p className="mt-4 rounded-[6px] border border-line bg-chalk p-4 text-muted">{text}</p>
      <div className="mt-6 grid gap-3">
        <a className="btn btn-primary" href={business.links.checkout}>
          Open the current checkout
        </a>
        <a className="btn btn-ghost" href={emailHref('My Train request', text)}>
          Email this request to Train
        </a>
        <button type="button" className="btn btn-ghost" onClick={copy}>
          Copy my request
        </button>
        <p aria-live="polite" className="min-h-6 text-center text-label text-muted">
          {copied === 'done' ? 'Copied. Paste it anywhere.' : copied === 'failed' ? 'Copy did not work here. Use the email link.' : ''}
        </p>
      </div>
    </div>
  )
}
