// Block Math. Prices from lib/business.ts.
import { passes } from './business.ts'

export type MathPassId = 'dropin' | 'threepack' | 'unlimited'

const DROP = passes.dropin.price as number
const PACK = passes.threepack.price as number
const UNLIMITED = passes.unlimited.price as number

export type PackMix = { packs: number; drops: number; total: number }

/** Cost of n Drop-Ins. */
export const dropInTotal = (n: number) => DROP * n

/**
 * Cheapest mix of 3-Packs and single Drop-Ins that covers n blocks, with at least one 3-Pack
 * (the 3-Pack row always shows a 3-Pack). Assumes the packs are used within the month.
 * DRAFT: confirm whether the 3-Pack expires.
 */
export const packMix = (n: number): PackMix => {
  let best: PackMix = { packs: 1, drops: Math.max(0, n - 3), total: PACK + DROP * Math.max(0, n - 3) }
  for (let packs = 1; packs <= Math.ceil(n / 3); packs++) {
    const drops = Math.max(0, n - packs * 3)
    const total = packs * PACK + drops * DROP
    if (total < best.total) best = { packs, drops, total }
  }
  return best
}

export const unlimitedTotal = () => UNLIMITED

export type MathRow = { id: MathPassId; total: number; perBlock: number }

export const blockMath = (n: number) => {
  const mix = packMix(n)
  const rows: MathRow[] = [
    { id: 'dropin', total: dropInTotal(n), perBlock: dropInTotal(n) / n },
    { id: 'threepack', total: mix.total, perBlock: mix.total / n },
    { id: 'unlimited', total: unlimitedTotal(), perBlock: unlimitedTotal() / n },
  ]
  // Ties go to the earlier, lower-commitment row.
  const cheapest = rows.reduce((a, b) => (b.total < a.total ? b : a))
  return { n, rows, mix, cheapest: cheapest.id, cheapestTotal: cheapest.total }
}

export const money = (v: number) =>
  Number.isInteger(v) ? `$${v}` : `$${v.toFixed(2)}`

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
export const word = (n: number) => WORDS[n] ?? String(n)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** The one readout sentence under the rows. */
export const readout = (n: number) => {
  const r = blockMath(n)
  const drop = dropInTotal(n)
  const N = cap(word(n))
  const blocksWord = n === 1 ? 'block' : 'blocks'
  if (r.cheapest === 'unlimited') {
    return `${N} ${blocksWord} on Unlimited is ${money(UNLIMITED / n)} a block. Drop-Ins would be ${money(drop)}.`
  }
  if (r.cheapest === 'threepack') {
    const { packs, drops, total } = r.mix
    const packPart = packs === 1 ? 'a 3-Pack' : `${word(packs)} 3-Packs`
    const dropPart = drops === 0 ? '' : ` and ${word(drops)} Drop-In${drops === 1 ? '' : 's'}`
    return `${N} ${blocksWord} on ${packPart}${dropPart} is ${money(total)}, ${money(total / n)} a block. Drop-Ins would be ${money(drop)}.`
  }
  if (n === 1) return `One block? A Drop-In at ${money(DROP)} is the cheapest way in.`
  return `${N} blocks as Drop-Ins is ${money(drop)}. A 3-Pack would be ${money(PACK)}.`
}
