// Screenshots with Playwright. Usage:
//   node scripts/shoot.mjs <url> <outdir> [name] [--full] [--widths=1440,375] [--selector=#passes] [--wait=1600] [--nojs]
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

const require = createRequire(import.meta.url)
let playwright
try {
  playwright = require('playwright')
} catch {
  playwright = require('/opt/node-tools/node_modules/playwright')
}

const [url = 'http://localhost:3000', outdir = 'reports/shots', name = 'page', ...flags] = process.argv.slice(2)
const opt = Object.fromEntries(
  flags.map((f) => {
    const [k, v] = f.replace(/^--/, '').split('=')
    return [k, v ?? true]
  }),
)
const widths = String(opt.widths ?? '1440,375').split(',').map(Number)
mkdirSync(outdir, { recursive: true })

const browser = await playwright.chromium.launch()
for (const w of widths) {
  const h = w < 500 ? 812 : w < 1100 ? 1024 : 900
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: opt.dpr ? Number(opt.dpr) : 1,
    javaScriptEnabled: !opt.nojs,
    reducedMotion: opt.reduced ? 'reduce' : 'no-preference',
  })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  if (opt.full) {
    // Walk down the page so lazy images load, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForLoadState('networkidle')
  }
  if (opt.selector) {
    await page.locator(String(opt.selector)).first().scrollIntoViewIfNeeded()
  }
  await page.waitForTimeout(Number(opt.wait ?? 1800))
  const file = path.join(outdir, `${name}-${w}.png`)
  if (opt.selector && opt.clip) {
    await page.locator(String(opt.selector)).first().screenshot({ path: file })
  } else {
    await page.screenshot({ path: file, fullPage: !!opt.full })
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  console.log(`${file}  horizontal overflow: ${overflow}px`)
  await ctx.close()
}
await browser.close()
