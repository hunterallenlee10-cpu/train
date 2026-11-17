// Block Builder and interaction checks. Usage: node scripts/flow.mjs [url] [shotDir]
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
const SHOTS = process.argv[3] || ''
if (SHOTS) mkdirSync(SHOTS, { recursive: true })

const results = []
const ok = (name, pass, detail = '') => results.push({ name, pass, detail })
const browser = await playwright.chromium.launch()

const open = async (page, locator) => {
  await locator.scrollIntoViewIfNeeded()
  await locator.click()
  await page.locator('dialog[open]').waitFor({ timeout: 8000 })
}
const checkedPass = (page) => page.locator('dialog input[name="bb-pass"]:checked').evaluate((e) => e.value).catch(() => null)
const close = async (page) => {
  await page.keyboard.press('Escape')
  await page.locator('dialog[open]').waitFor({ state: 'detached', timeout: 4000 }).catch(() => {})
}

for (const width of [1440, 375]) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 500 ? 812 : 900 } })
  const page = await ctx.newPage()
  await page.goto(URL_, { waitUntil: 'networkidle' })
  const tag = `@${width}`
  const shot = async (name) => SHOTS && (await page.screenshot({ path: `${SHOTS}/${name}-${width}.png` }))

  // Hero Book a Block: no pass pre-selected
  await open(page, page.locator('#hero-actions [data-builder]'))
  ok(`Hero Book a Block opens step 1 with nothing pre-selected ${tag}`, (await checkedPass(page)) === null)
  ok(`Next is disabled until a pass is picked ${tag}`, await page.locator('dialog button:has-text("Next")').isDisabled())
  const stepText = await page.locator('dialog').innerText()
  ok(`Progress reads "Step 1 of 3" ${tag}`, stepText.includes('Step 1 of 3'))
  ok(`"Rather ask first? Email Evan." on the step ${tag}`, stepText.includes('Rather ask first?') && stepText.includes('Email Evan'))
  await page.waitForTimeout(250)
  await shot('builder-step1-empty')
  await close(page)
  await page.waitForTimeout(150)
  const focusBack = await page.evaluate(() => document.activeElement?.closest('#hero-actions') !== null)
  ok(`Esc closes and focus returns to the opener ${tag}`, focusBack && (await page.locator('dialog[open]').count()) === 0)

  // Hero price row
  for (const [label, id] of [['$25', 'dropin'], ['$69', 'threepack'], ['$99', 'unlimited']]) {
    await open(page, page.locator(`ul[aria-label="Pass prices"] button:has-text("${label}")`))
    ok(`Hero price ${label} pre-selects ${id} ${tag}`, (await checkedPass(page)) === id)
    await close(page)
  }
  // Pass cards
  for (const [label, id] of [['Book a Drop-In', 'dropin'], ['Get the 3-Pack', 'threepack'], ['Go Unlimited', 'unlimited'], ['Gift cards', 'gift']]) {
    await open(page, page.locator(`#passes button:has-text("${label}")`))
    ok(`Passes "${label}" pre-selects ${id} ${tag}`, (await checkedPass(page)) === id)
    if (id === 'unlimited') {
      ok(`Unlimited shows the guests stepper ${tag}`, (await page.locator('dialog').innerText()).includes('Guests on this block'))
    }
    await close(page)
  }
  // Gift band
  await open(page, page.locator('button:has-text("Get a gift card")'))
  ok(`Gift band pre-selects gift card, 2 steps ${tag}`, (await checkedPass(page)) === 'gift' && (await page.locator('dialog').innerText()).includes('Step 1 of 2'))
  await page.locator('dialog button:has-text("Next")').click()
  ok(`Gift card skips the block step ${tag}`, (await page.locator('dialog h2').innerText()).toLowerCase().includes('review'))
  await close(page)

  // Block Math: keyboard on the slider, then Book with this pass
  const range = page.locator('#block-math-range')
  await range.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1800)
  await range.focus()
  await page.keyboard.press('Home')
  const at1 = await page.locator('#block-math').innerText()
  await page.keyboard.press('End')
  const at12 = await page.locator('#block-math').innerText()
  ok(`Slider: Home gives Drop-In $25 cheapest ${tag}`, /DROP-IN\s*CHEAPEST FOR YOU/i.test(at1) && at1.includes('$25'))
  ok(`Slider: End gives Unlimited $99 against $300 ${tag}`, /UNLIMITED\s*CHEAPEST FOR YOU/i.test(at12) && at12.includes('$300'))
  for (let i = 0; i < 7; i++) await page.keyboard.press('ArrowLeft')
  const at5 = await page.locator('#block-math').innerText()
  ok(`Slider: arrows to 5 give Unlimited $99, mix $119 ${tag}`, /UNLIMITED\s*CHEAPEST FOR YOU/i.test(at5) && at5.includes('$119'))
  await page.locator('#block-math button[aria-label="One less time this month"]').click()
  const at4 = await page.locator('#block-math').innerText()
  ok(`Minus button to 4 gives 3-Pack $94 ${tag}`, /3-PACK\s*CHEAPEST FOR YOU/i.test(at4) && at4.includes('$94'))
  if (SHOTS) await page.locator('#block-math').screenshot({ path: `${SHOTS}/blockmath-${width}.png` })
  await open(page, page.locator('#block-math button:has-text("Book with this pass")'))
  ok(`Block Math "Book with this pass" pre-selects the cheapest (3-Pack at 4) ${tag}`, (await checkedPass(page)) === 'threepack')
  await close(page)

  // Time chip: pre-selects the block, then the full flow to the honest last step
  await open(page, page.locator('#how-it-works button:has-text("6 to 8pm")'))
  await page.locator('dialog label:has-text("Drop-In")').click()
  await page.locator('dialog button[aria-label^="One more"]').click()
  await page.waitForTimeout(150)
  await shot('builder-step1')
  await page.locator('dialog button:has-text("Next")').click()
  const blk = await page.locator('dialog input[name="bb-block"]:checked').evaluate((e) => e.value).catch(() => null)
  const day = await page.locator('dialog input[name="bb-day"]:checked').evaluate((e) => e.value).catch(() => null)
  ok(`Time chip pre-selects the 6 to 8pm block ${tag}`, blk === '18', `block ${blk}, day ${day}`)
  const s2 = await page.locator('dialog').innerText()
  ok(`Step 2 shows the honest availability line and no spot counts ${tag}`, s2.includes('Live availability is checked at checkout') && !/sold out|spots left|\d+ left/i.test(s2))
  await page.waitForTimeout(150)
  await shot('builder-step2')
  await page.locator('dialog button:has-text("Next")').click()
  const rev = await page.locator('dialog').innerText()
  ok(`Review shows 2 × $25 = $50 plus tax if any ${tag}`, rev.includes('2 × $25 = $50') && rev.includes('plus tax if any'))
  await page.waitForTimeout(150)
  await shot('builder-step3')
  await page.locator('dialog button:has-text("Continue to secure checkout")').click()
  const fin = await page.locator('dialog').innerText()
  ok(`Demo last step says it is a concept ${tag}`, fin.includes("This is a concept. On the live page this button opens Train's secure checkout with your pass already chosen."))
  ok(`Last step has the real checkout link, email and copy ${tag}`, (await page.locator('dialog a[href="https://www.trainocmd.com/buy"]').count()) === 1 && (await page.locator('dialog a[href^="mailto:info@trainocmd.com?subject="]').count()) === 1 && (await page.locator('dialog button:has-text("Copy my request")').count()) === 1)
  ok(`Nothing claims a booking ${tag}`, !/\b(booked|confirmed|paid|you're in|success)\b/i.test(fin))
  await page.waitForTimeout(150)
  await shot('builder-final')
  // Focus trap: tab many times, focus must stay in the dialog
  for (let i = 0; i < 14; i++) await page.keyboard.press('Tab')
  ok(`Focus stays trapped in the builder ${tag}`, await page.evaluate(() => !!document.activeElement?.closest('dialog')))
  const locked = await page.evaluate(() => getComputedStyle(document.documentElement).overflow === 'hidden')
  ok(`Body scroll is locked while open ${tag}`, locked)
  await close(page)

  if (width < 500) {
    // Sticky bar: hidden at the top, shown after scrolling past the hero buttons
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(400)
    const topShow = await page.locator('[data-show]').getAttribute('data-show')
    await page.evaluate(() => window.scrollTo({ top: 2400, behavior: 'instant' }))
    await page.waitForTimeout(500)
    const midShow = await page.locator('[data-show]').getAttribute('data-show')
    ok('Sticky bar hidden while hero buttons are on screen, shown after', topShow === 'false' && midShow === 'true', `${topShow} then ${midShow}`)
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/stickybar-375.png` })
    // Focus never hidden under the bar
    let covered = 0
    const n = await page.locator('main a, main button, main input, main summary').count()
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    const coveredWhat = []
    for (let i = 0; i < Math.min(n, 60); i++) {
      await page.keyboard.press('Tab')
      await page.waitForTimeout(450)
      const c = await page.evaluate(() => {
        const el = document.activeElement
        const bar = document.querySelector('[data-show="true"]')
        if (!el || el === document.body || !bar || bar.contains(el)) return false
        const r = el.getBoundingClientRect()
        const b = bar.getBoundingClientRect()
        return r.bottom > b.top + 2 && r.top < b.bottom ? (el.textContent || el.tagName).trim().slice(0, 40) : false
      })
      if (c) {
        covered++
        coveredWhat.push(c)
      }
    }
    ok('Keyboard focus is never covered by the sticky bar (60 tabs)', covered === 0, `${covered} covered ${coveredWhat.join(' | ')}`)
    // Burger
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.locator('button[aria-label="Open menu"]').click()
    const sheet = await page.locator('#nav-sheet').isVisible()
    await page.keyboard.press('Escape')
    const gone = (await page.locator('#nav-sheet').count()) === 0
    ok('Burger opens the full-screen sheet and Esc closes it', sheet && gone)
  }
  await ctx.close()
}

// Reduced motion: door never shows and Block Math sits at 4
const rctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } })
const rp = await rctx.newPage()
await rp.goto(URL_, { waitUntil: 'networkidle' })
const doorShown = await rp.locator('[data-door]').evaluate((e) => getComputedStyle(e).display !== 'none')
await rp.locator('#block-math-range').scrollIntoViewIfNeeded()
await rp.waitForTimeout(1500)
const val = await rp.locator('#block-math-range').inputValue()
ok('Reduced motion: door is never shown, Block Math sits at 4', !doorShown && val === '4', `door ${doorShown}, value ${val}`)
await rctx.close()
await browser.close()

let failed = 0
for (const r of results) {
  if (!r.pass) failed++
  console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? `  (${r.detail})` : ''}`)
}
console.log(`\n${results.length - failed}/${results.length} interaction checks passed`)
process.exit(failed ? 1 : 0)
