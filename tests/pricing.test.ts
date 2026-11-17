import { describe, expect, it } from 'vitest'
import { blockMath, packMix, readout } from '../lib/pricing.ts'

describe('Block Math check values (BUILD-SPEC section 4)', () => {
  it('1 gives Drop-In $25', () => {
    const r = blockMath(1)
    expect(r.cheapest).toBe('dropin')
    expect(r.cheapestTotal).toBe(25)
  })
  it('3 gives 3-Pack $69', () => {
    const r = blockMath(3)
    expect(r.cheapest).toBe('threepack')
    expect(r.cheapestTotal).toBe(69)
  })
  it('4 gives the 3-Pack mix $94 (one 3-Pack plus one Drop-In)', () => {
    const r = blockMath(4)
    expect(r.cheapest).toBe('threepack')
    expect(r.cheapestTotal).toBe(94)
    expect(packMix(4)).toEqual({ packs: 1, drops: 1, total: 94 })
  })
  it('5 gives Unlimited $99 (the mix would be $119)', () => {
    const r = blockMath(5)
    expect(r.cheapest).toBe('unlimited')
    expect(r.cheapestTotal).toBe(99)
    expect(packMix(5).total).toBe(119)
  })
  it('12 gives Unlimited $99 against $300 in Drop-Ins', () => {
    const r = blockMath(12)
    expect(r.cheapest).toBe('unlimited')
    expect(r.cheapestTotal).toBe(99)
    expect(r.rows.find((x) => x.id === 'dropin')?.total).toBe(300)
  })
  it('readout at 6 matches the spec example', () => {
    expect(readout(6)).toBe('Six blocks on Unlimited is $16.50 a block. Drop-Ins would be $150.')
  })
  it('readouts never use banned words or dashes', () => {
    for (let n = 1; n <= 12; n++) {
      expect(readout(n)).not.toMatch(/booked|confirmed|paid|—|--/i)
    }
  })
})
