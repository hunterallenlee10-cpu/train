// npm run check. Page checks against a running server (CHECK_URL, default http://localhost:3000).
import { createRequire } from 'node:module'
import { execSync } from 'node:child_process'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const require = createRequire(import.meta.url)
let playwright
try {
  playwright = require('playwright')
} catch {
  playwright = require('/opt/node-tools/node_modules/playwright')
}
const { business, passes } = await import('../lib/business.ts')

const URL_ = (process.env.CHECK_URL || 'http://localhost:3000').replace(/\/$/, '')
const results = []
const ok = (name, pass, detail = '') => results.push({ name, pass, detail })

const browser = await playwright.chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const res = await page.goto(URL_, { waitUntil: 'networkidle' })
ok('Home responds 200', res?.status() === 200, `status ${res?.status()}`)

const data = await page.evaluate(() => {
  const visible = document.body.innerText
  const attrs = [...document.querySelectorAll('[alt],[aria-label],[title],meta[content]')]
    .map((e) => [e.getAttribute('alt'), e.getAttribute('aria-label'), e.getAttribute('title'), e.tagName === 'META' ? e.getAttribute('content') : null])
    .flat()
    .filter(Boolean)
  const textAll = document.body.textContent
  return {
    h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.replace(/\s+/g, ' ').trim()),
    headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1])),
    hashLinks: [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')),
    ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
    sameOrigin: [...document.querySelectorAll('a[href]')]
      .map((a) => a.href)
      .filter((h) => h.startsWith(location.origin))
      .map((h) => h.split('#')[0]),
    links: [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.getAttribute('href'), text: (a.innerText || a.getAttribute('aria-label') || '').trim() })),
    imgs: [...document.querySelectorAll('img')].map((i) => ({
      src: i.getAttribute('src'),
      alt: i.getAttribute('alt'),
      hidden: !!i.closest('[aria-hidden="true"]'),
      w: i.getAttribute('width'),
      h: i.getAttribute('height'),
      sizes: i.getAttribute('sizes'),
    })),
    visible,
    textAll,
    attrs,
    buttonsLinkingSelf: [...document.querySelectorAll('a[href]')].filter((a) => {
      const h = a.getAttribute('href')
      return h === '' || h === '/' || h === location.href || h === '#'
    }).length,
  }
})

ok('Exactly one h1', data.h1.length === 1, data.h1.join(' | '))
ok('h1 holds "private gym passes" and "Ocean City, MD"', /private gym passes/i.test(data.h1[0] || '') && /Ocean City, MD/.test(data.h1[0] || ''))
const skips = data.headings.filter((l, i) => i > 0 && l > data.headings[i - 1] + 1)
ok('Headings step down in order', skips.length === 0, data.headings.join(','))

const missingAnchors = [...new Set(data.hashLinks)].filter((h) => h.length > 1 && !data.ids.includes(h.slice(1)))
ok('No broken anchors', missingAnchors.length === 0, missingAnchors.join(', '))
ok('No link points back at this page', data.buttonsLinkingSelf === 0, `${data.buttonsLinkingSelf} found`)

const broken = []
for (const href of [...new Set(data.sameOrigin)].filter((h) => h !== URL_ + '/' && h !== URL_)) {
  const r = await page.request.get(href)
  if (r.status() >= 400) broken.push(`${href} ${r.status()}`)
}
ok('No broken internal links', broken.length === 0, broken.join(', ') || `${new Set(data.sameOrigin).size} checked`)

const vague = data.links.filter((l) => /^(learn more|click here|read more|here|more)$/i.test(l.text) || !l.text)
ok('Every link says where it goes', vague.length === 0, vague.map((l) => l.href).join(', '))

const text = data.visible + ' ' + data.attrs.join(' ')
const placeholder = text.match(/lorem|ipsum|\bTODO\b|\bTBD\b|\bXXX\b|placeholder|\{\{|\}\}|\bundefined\b|\bNaN\b|\[object/gi)
ok('No leftover blanks or placeholder text', !placeholder, placeholder?.join(', ') || '')
const dashes = text.match(/.{0,20}(—|–|--).{0,20}/g)
ok('No em dashes or double hyphens', !dashes, dashes?.join(' | ') || '')
const banned = text.match(/\b(booked|confirmed|paid)\b/gi)
ok('No "booked", "confirmed" or "paid"', !banned, banned?.join(', ') || '')
const hype = text.match(/revolutionary|cutting-edge|seamless|elevate|unparalleled|state of the art|#1|\bbest gym\b/gi)
ok('No hype words or #1 claims', !hype, hype?.join(', ') || '')

const badImgs = data.imgs.filter((i) => (!i.hidden && !i.alt) || !i.w || !i.h)
ok('Alt text and width/height on every image', badImgs.length === 0, badImgs.map((i) => i.src).join(', ') || `${data.imgs.length} images`)
const noSizes = data.imgs.filter((i) => i.src?.includes('/_next/image') && !i.sizes)
ok('A sizes value on every optimised image', noSizes.length === 0, noSizes.map((i) => i.src).join(', '))
const foreign = data.imgs.filter((i) => !/images%2F(raw%2F|logo-)|\/images\/(raw\/|logo-)/.test(i.src || ''))
ok('Only the real photos and logos are used', foreign.length === 0, foreign.map((i) => i.src).join(', '))

ok('Email on the page matches lib/business.ts', data.visible.includes(business.email))
const emails = [...new Set((data.visible + ' ' + data.links.map((l) => l.href).join(' ')).match(/[\w.+-]+@[\w-]+\.[a-z]{2,}(?=[^a-z]|$)/gi) || [])].map((e) => e.replace(/^mailto:/, '')).filter((e) => e !== business.email)
ok('No other email address', emails.length === 0, emails.join(', '))
ok('Full address on the page matches lib/business.ts', data.visible.includes(business.address.full))
const tel = data.links.filter((l) => /^(tel|sms):/.test(l.href))
const phone = data.visible.match(/\(?\d{3}\)?[\s.]\d{3}[\s.]\d{4}/)
ok('No phone number or tel/sms links', tel.length === 0 && !phone)
for (const p of ['dropin', 'threepack', 'unlimited']) {
  ok(`Price $${passes[p].price} for ${passes[p].name} is on the page`, data.visible.includes(`$${passes[p].price}`))
}

// JavaScript off: passes and prices still on the page
const noJs = await browser.newPage({ javaScriptEnabled: false })
await noJs.goto(URL_, { waitUntil: 'load' })
const noJsText = await noJs.evaluate(() => (document.querySelector('#passes') || document.body).textContent)
const passText = await noJs.evaluate(() => document.querySelector('#passes')?.innerText || '')
const noJsPass = ['Drop-In', '3-Pack', 'Train Unlimited', '$25', '$69', '$99'].every((t) => noJsText.includes(t))
ok('With JavaScript off, the three passes and prices are on the page', noJsPass, passText ? 'checked inside #passes' : 'passes band missing, checked body')
await browser.close()

// Pricing unit tests
let testsOk = false
let testOut = ''
try {
  testOut = execSync('npx vitest run --reporter=dot', { encoding: 'utf8', stdio: 'pipe' })
  testsOk = true
} catch (e) {
  testOut = String(e.stdout || e)
}
ok('Pricing unit tests pass', testsOk, (testOut.match(/Tests\s+.*$/m) || [''])[0].trim())

// DRAFT markers (fail only in live mode)
const live = process.env.NEXT_PUBLIC_SITE_MODE === 'live'
const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = path.join(d, f)
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|css|mjs)$/.test(f) ? [p] : []
  })
const drafts = ['app', 'components', 'lib'].flatMap(walk).flatMap((f) =>
  readFileSync(f, 'utf8')
    .split('\n')
    .map((l, i) => (/DRAFT|TODO: swap/.test(l) ? `${f}:${i + 1}` : null))
    .filter(Boolean),
)
ok(live ? 'No DRAFT items in live mode' : `DRAFT items listed (demo mode, allowed): ${drafts.length}`, live ? drafts.length === 0 : true, live ? drafts.join(', ') : '')

const width = Math.max(...results.map((r) => r.name.length))
let failed = 0
for (const r of results) {
  if (!r.pass) failed++
  console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name.padEnd(width)}  ${r.detail}`)
}
console.log(`\n${results.length - failed}/${results.length} checks passed against ${URL_}`)
process.exit(failed ? 1 : 0)
