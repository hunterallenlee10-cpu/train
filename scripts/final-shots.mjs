// Final screenshots at 1440 and 375: hero, passes band, Block Math, each Block Builder step.
// Usage: node scripts/final-shots.mjs [url] [outdir]
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'

const require = createRequire(import.meta.url)
let playwright
try {
  playwright = require('playwright')
} catch {
  playwright = require('/opt/node-tools/node_modules/playwright')
}
const URL_ = process.argv[2] || 'http://localhost:3000'
const OUT = process.argv[3] || 'reports/screenshots'
mkdirSync(OUT, { recursive: true })
const browser = await playwright.chromium.launch()

for (const w of [1440, 375]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 500 ? 812 : 900 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  const go = async (y) => {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
    await page.waitForTimeout(500)
  }
  const top = async (sel) => page.locator(sel).first().evaluate((e) => e.getBoundingClientRect().top + window.scrollY - 64)
  await page.goto(URL_, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2600) // the door has rolled up
  await page.screenshot({ path: `${OUT}/01-hero-${w}.png` })
  await go(await top('#passes'))
  await page.screenshot({ path: `${OUT}/02-passes-${w}.png` })
  await go(await top('#block-math'))
  await page.waitForTimeout(1600) // the slider glide
  await page.screenshot({ path: `${OUT}/03-block-math-${w}.png` })

  await page.locator('#how-it-works button:has-text("6 to 8pm")').click()
  await page.locator('dialog[open]').waitFor()
  await page.locator('dialog label:has-text("Drop-In")').click()
  await page.locator('dialog button[aria-label^="One more"]').click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/04-builder-step1-${w}.png` })
  await page.locator('dialog button:has-text("Next")').click()
  await page.locator('dialog label:has-text("Tomorrow")').click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/05-builder-step2-${w}.png` })
  await page.locator('dialog button:has-text("Next")').click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/06-builder-step3-${w}.png` })
  await page.locator('dialog button:has-text("Continue to secure checkout")').click()
  await page.mouse.move(0, 0)
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/07-builder-last-step-${w}.png` })
  await ctx.close()
}
await browser.close()
console.log(`Screenshots written to ${OUT}`)
