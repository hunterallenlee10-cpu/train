// npm run og. Builds the link preview image and the icons from his real wordmark and photo 01.
//  - public/og-image.png 1200x630: paper, black wordmark, "Pick a pass. Book a block.", photo 01
//  - app/icon.png, app/apple-icon.png, app/favicon.ico: the "t" from the black wordmark (with its drip)
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const require = createRequire(import.meta.url)
let playwright
try {
  playwright = require('playwright')
} catch {
  playwright = require('/opt/node-tools/node_modules/playwright')
}
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const tmp = mkdtempSync(path.join(tmpdir(), 'train-og-'))
const im = (...args) => execFileSync('convert', args, { stdio: 'inherit' })
const PAPER = '#EEECE6'

// 1. The "t": crop the left of the trimmed wordmark, then mask along the gap between the t and the r.
const logo = path.join(root, 'public/images/logo-black.png')
const t2 = path.join(tmp, 't2.png')
const mask = path.join(tmp, 'mask.png')
const t = path.join(tmp, 't.png')
im(logo, '-crop', '330x470+0+0', '+repage', '-trim', '+repage', '-crop', '300x345+0+0', '+repage', t2)
im('-size', '300x345', 'xc:black', '-fill', 'white', '-draw', 'polygon 0,0 262,0 262,104 176,117 163,150 110,282 104,345 0,345', mask)
im(t2, '(', '+clone', '-alpha', 'extract', mask, '-compose', 'multiply', '-composite', ')', '-alpha', 'off', '-compose', 'copy_opacity', '-composite', '-trim', '+repage', t)

const icon = (size, glyph, out) =>
  im('-size', `${size}x${size}`, `xc:${PAPER}`, '(', t, '-resize', `${glyph}x${glyph}`, ')', '-gravity', 'center', '-geometry', `+${Math.round(size * 0.02)}+0`, '-composite', '-strip', out)
icon(512, 420, path.join(root, 'app/icon.png'))
icon(180, 146, path.join(root, 'app/apple-icon.png'))
const f16 = path.join(tmp, 'f16.png')
const f32 = path.join(tmp, 'f32.png')
const f48 = path.join(tmp, 'f48.png')
icon(16, 15, f16)
icon(32, 29, f32)
icon(48, 43, f48)
im(f16, f32, f48, path.join(root, 'app/favicon.ico'))

// 2. The link preview, rendered in Chromium with the site's two fonts.
const photo = path.join(root, 'public/images/raw/01-GARAGE-DOOR-OPEN-exterior-BEST.jpg')
const speckle = path.join(root, 'public/images/speckle.png')
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@700&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:${PAPER} url('file://${speckle}');background-size:180px;font-family:'DM Sans';color:#141512;overflow:hidden}
  .wrap{display:grid;grid-template-columns:600px 600px;height:630px}
  .left{padding:56px 40px 48px 64px;display:flex;flex-direction:column}
  .logo{width:178px}
  h1{font-family:Anton;font-weight:400;text-transform:uppercase;font-size:88px;line-height:.95;margin-top:auto;letter-spacing:.005em}
  .b{position:relative;display:inline-block;isolation:isolate}
  .b svg{position:absolute;left:-3%;top:46%;width:100%;height:46%;z-index:-1;transform:rotate(-2deg);fill:#39FF35}
  .eyebrow{margin-top:26px;font-size:21px;letter-spacing:.14em;text-transform:uppercase;color:#55564F}
  .right{position:relative;border-left:4px solid #141512;overflow:hidden}
  .right img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:76% 50%;transform:scale(1.12);transform-origin:70% 30%}
</style></head><body><div class="wrap">
  <div class="left">
    <img class="logo" src="file://${logo}">
    <h1>Pick a pass.<br>Book a <span class="b"><svg viewBox="0 0 400 120" preserveAspectRatio="none"><path d="M14 30c30-12 82-16 140-15 62 1 122-4 176-6 30-1 54 1 62 9 8 9 6 24 2 36-4 14-2 26-10 34-10 10-36 9-70 10-58 2-118 4-176 6-44 2-86 4-112-2-18-4-24-16-24-30 0-16 0-32 12-42z"/></svg>block.</span></h1>
    <p class="eyebrow">Private gym · Ocean City, MD</p>
  </div>
  <div class="right"><img src="file://${photo}"></div>
</div></body></html>`
const htmlFile = path.join(tmp, 'og.html')
writeFileSync(htmlFile, html)
const browser = await playwright.chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto(`file://${htmlFile}`, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: path.join(root, 'public/og-image.png') })
await browser.close()
im(path.join(root, 'public/og-image.png'), '-strip', '-define', 'png:compression-level=9', path.join(root, 'public/og-image.png'))
console.log('Wrote public/og-image.png, app/icon.png, app/apple-icon.png, app/favicon.ico')
