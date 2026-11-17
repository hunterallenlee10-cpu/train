'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { BuilderButton } from '@/components/BuilderButton'
import { passes } from '@/lib/business'
import { blockMath, money, readout, type MathPassId } from '@/lib/pricing'

const MIN = 1
const MAX = 12
const DEFAULT = 4

const names: Record<MathPassId, string> = {
  dropin: passes.dropin.name,
  threepack: passes.threepack.name,
  unlimited: passes.unlimited.name,
}

const detail = (id: MathPassId, n: number, packs: number, drops: number) => {
  if (id === 'dropin') return `${n} × $${passes.dropin.price}`
  if (id === 'unlimited') return 'One flat monthly price'
  const p = packs === 1 ? '1 3-Pack' : `${packs} 3-Packs`
  return drops ? `${p} + ${drops} Drop-In${drops === 1 ? '' : 's'}` : p
}

/**
 * Which pass is cheapest for you? One real range slider (1 to 12, default 4) with minus and plus buttons.
 * The answer is there from the server render. On first view the slider glides once from 1 to 4.
 */
export default function BlockMath() {
  const [n, setN] = useState(DEFAULT)
  const touched = useRef(false)
  const root = useRef<HTMLDivElement>(null)
  const ids = { label: useId(), value: useId() }
  const r = blockMath(n)

  const set = (v: number) => {
    touched.current = true
    setN(Math.min(MAX, Math.max(MIN, v)))
  }

  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let stop: (() => void) | undefined
    const io = new IntersectionObserver(
      async (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        if (touched.current) return
        try {
          const { animate } = await import('motion/react')
          if (touched.current) return
          setN(MIN)
          const controls = animate(MIN, DEFAULT, {
            duration: 1,
            ease: [0.33, 1, 0.68, 1],
            delay: 0.2,
            onUpdate: (v) => {
              if (!touched.current) setN(Math.round(v))
            },
          })
          stop = () => controls.stop()
        } catch {
          /* The answer at 4 is already on screen. */
        }
      },
      { threshold: 0.55 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      stop?.()
    }
  }, [])

  return (
    <div ref={root}>
      <div className="card p-5 md:p-7">
        <label id={ids.label} htmlFor="block-math-range" className="block text-lead font-bold">
          How many times will you train this month?
        </label>
        <p id={ids.value} className="mt-3 flex items-baseline gap-2" aria-hidden="true">
          <span className="font-display text-[3.5rem] leading-none tabular-nums">{n}</span>
          <span className="text-lead">{n === 1 ? 'time' : 'times'} this month</span>
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            className="btn btn-ghost size-12 shrink-0 p-0"
            aria-label="One less time this month"
            onClick={() => set(n - 1)}
            disabled={n <= MIN}
          >
            <Minus aria-hidden="true" strokeWidth={2.25} className="size-5" />
          </button>
          <input
            id="block-math-range"
            type="range"
            min={MIN}
            max={MAX}
            step={1}
            value={n}
            aria-valuetext={`${n} ${n === 1 ? 'time' : 'times'} this month`}
            onChange={(e) => set(Number(e.target.value))}
            className="block-range h-12 w-full cursor-pointer"
          />
          <button
            type="button"
            className="btn btn-ghost size-12 shrink-0 p-0"
            aria-label="One more time this month"
            onClick={() => set(n + 1)}
            disabled={n >= MAX}
          >
            <Plus aria-hidden="true" strokeWidth={2.25} className="size-5" />
          </button>
        </div>
        <div className="mt-1 flex justify-between px-[60px] text-label text-muted" aria-hidden="true">
          <span>1</span>
          <span>6</span>
          <span>12</span>
        </div>
      </div>

      <ul className="mt-4 space-y-3" aria-label="Cost for the month by pass">
        {r.rows.map((row) => {
          const best = row.id === r.cheapest
          return (
            <li
              key={row.id}
              className={`grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 rounded-[6px] border px-4 py-3.5 md:grid-cols-[1fr_auto_7.5rem] md:px-5 ${
                best ? 'border-ink bg-spray text-ink' : 'border-line bg-chalk'
              }`}
            >
              <div>
                <p className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-h3 uppercase leading-none">{names[row.id]}</span>
                  {best ? (
                    <span className="rounded-[4px] bg-ink px-2 py-1 text-label font-bold text-spray">Cheapest for you</span>
                  ) : null}
                </p>
                <p className={`mt-1 text-label ${best ? 'text-ink' : 'text-muted'}`}>
                  {detail(row.id, n, r.mix.packs, r.mix.drops)}
                </p>
              </div>
              <p className="text-right">
                <span className="font-display text-[2rem] leading-none tabular-nums">{money(row.total)}</span>
                <span className="sr-only"> for the month</span>
              </p>
              <p className={`col-span-2 text-label md:col-span-1 md:text-right ${best ? 'text-ink' : 'text-muted'}`}>
                {money(row.perBlock)} a block
              </p>
            </li>
          )
        })}
      </ul>

      <p className="mt-5 text-lead font-medium" aria-live="polite">
        {readout(n)}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <BuilderButton pass={r.cheapest} className="btn btn-primary">
          Book with this pass
        </BuilderButton>
        <span className="text-muted">
          {names[r.cheapest]} is selected for you.
        </span>
      </div>
      {/* DRAFT: confirm tax */}
      <p className="mt-6 text-label text-muted">Prices from trainocmd.com. Tax, if any, is shown at checkout.</p>
    </div>
  )
}
