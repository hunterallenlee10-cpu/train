import { Minus, Plus } from 'lucide-react'

type Props = {
  label: string
  hint: string
  value: number
  min: number
  max: number
  unit: (n: number) => string
  onChange: (n: number) => void
}

/** Tap-only number stepper with live value text. */
export default function Stepper({ label, hint, value, min, max, unit, onChange }: Props) {
  return (
    <div className="mt-6 rounded-[6px] border border-line bg-chalk p-4">
      <p className="font-bold" id="stepper-label">
        {label}
      </p>
      <p className="text-label text-muted">{hint}</p>
      <div className="mt-3 flex items-center gap-4" role="group" aria-labelledby="stepper-label">
        <button
          type="button"
          className="btn btn-ghost size-12 p-0"
          aria-label={`One fewer, now ${value}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus aria-hidden="true" strokeWidth={2.25} className="size-5" />
        </button>
        <output aria-live="polite" className="min-w-28 text-center">
          <span className="font-display text-[2.25rem] leading-none tabular-nums">{value}</span>{' '}
          <span className="text-muted">{unit(value)}</span>
        </output>
        <button
          type="button"
          className="btn btn-ghost size-12 p-0"
          aria-label={`One more, now ${value}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          <Plus aria-hidden="true" strokeWidth={2.25} className="size-5" />
        </button>
      </div>
    </div>
  )
}
