// Runs before `next build`. In live mode the build fails while any DRAFT item or "TODO: swap" marker remains.
// For a local live-mode audit only (Lighthouse), ALLOW_DRAFTS_FOR_LOCAL_AUDIT=1 lets the build through with a warning.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

if (process.env.NEXT_PUBLIC_SITE_MODE !== 'live') process.exit(0)

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = path.join(d, f)
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|css|mjs|md|txt)$/.test(f) ? [p] : []
  })
const hits = ['app', 'components', 'lib', 'public']
  .flatMap(walk)
  .flatMap((f) =>
    readFileSync(f, 'utf8')
      .split('\n')
      .map((l, i) => (/DRAFT|TODO: swap/.test(l) ? `  ${f}:${i + 1}  ${l.trim().slice(0, 110)}` : null))
      .filter(Boolean),
  )

if (!hits.length) {
  console.log('Live build: no DRAFT items left.')
  process.exit(0)
}
console.error(`Live build blocked: ${hits.length} DRAFT item(s) remain.\n${hits.join('\n')}`)
if (process.env.ALLOW_DRAFTS_FOR_LOCAL_AUDIT === '1') {
  console.warn('\nALLOW_DRAFTS_FOR_LOCAL_AUDIT=1: continuing for a local audit only. Never deploy this build.\n')
  process.exit(0)
}
process.exit(1)
