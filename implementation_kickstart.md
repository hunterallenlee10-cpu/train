# Implementation kickstart

The plan, tokens and checklist for the train. purchase page concept. Source of truth: BUILD-SPEC.md.

## Plan
- [x] First actions: BUILD-SPEC.md, CLAUDE.md, git, this file
- [x] Section 0: photos downloaded from Drive into `public/images/raw/` (7 photos, 2 logos), every image viewed
- [x] Phase 1: scaffold, tokens, fonts, palette board, nav, hero with garage door, footer (mobile first)
- [x] Review 1: juror scored the hero 71/100. Fixed: full-bleed phone photo and door waits for 60% visibility, square-edged frame cropped toward the racks, price row on an ink plate, tighter spray stroke
- [x] Phase 2: passes band, Block Math, `lib/pricing.ts` with tests
- [x] Phase 3: how a block works, find the garage, trainers band, gift cards, Q and A, final band
- [x] Phase 4: Block Builder, every button wired with pre-selects, honest last step, mobile sticky bar
- [x] Phase 5: SEO (modes, robots, sitemap, llms.txt, JSON-LD), link preview image, favicon, 404, SEO-LAUNCH.md
- [ ] Phase 6: Lighthouse mobile and desktop, live and demo, on production builds
- [ ] Review 2: fresh subagent juror on the full page plus a fact audit against section 1, fix once
- [ ] Phase 7: final review against the checklist, commit, ready for Vercel as `train-ocmd-concept`

After every phase: `npm run check`, screenshots at 1440 and 375, look, fix the three weakest things, commit.

## Architecture
- `app/layout.tsx` fonts, metadata, JSON-LD, analytics. `app/page.tsx` composes sections.
- `components/sections/*` one file per section, server components by default.
- Client islands only: nav sheet, garage door, Block Math, accordion, Block Builder (loaded on first open), plus a tiny launcher that turns server-rendered buttons into Block Builder openers.
- Builder buttons are real `<button>` elements carrying `data-pass` / `data-block` attributes. One delegated listener opens the builder with those pre-selects, so the passes section stays server-rendered.
- `lib/business.ts` facts, `lib/pricing.ts` maths, `lib/site.ts` mode and URL.

## Design tokens ("Spray and Rubber")
| Token | Hex | OKLCH | Use |
| --- | --- | --- | --- |
| paper | #EEECE6 | oklch(94.3% 0.0083 91.5) | page background, about 60% |
| chalk | #F8F7F3 | oklch(97.6% 0.0054 95.1) | cards on paper, garage door |
| line | #D2D0C8 | oklch(85.7% 0.0111 95.2) | 1px borders on paper |
| ink | #141512 | oklch(19.3% 0.0061 122.0) | text, pass band, footer, about 30% |
| rubber | #22231F | oklch(25.4% 0.0075 118.3) | cards in the dark band |
| spray | #39FF35 | oklch(87.3% 0.2765 142.6) | primary fill, selected states, best deal tag, hero stroke, about 10% |
| spray-hover | #2BE027 | oklch(79.0% 0.2544 142.5) | primary hover |
| muted | #55564F | oklch(45.0% 0.0112 113.4) | muted text on paper |
| muted-on-ink | #A9AAA2 | oklch(73.5% 0.0114 112.5) | muted text on ink |
| deep-green | #0E6B0C | oklch(46.0% 0.1487 142.5) | links and success text on paper |
| error | #B3261E | oklch(50.1% 0.1783 28.7) | errors on paper |

Contrast (computed): ink on paper 15.5, muted on paper 6.3, ink on spray 13.6, muted-on-ink on ink 7.8, muted-on-ink on rubber 6.7, deep green on paper 5.7, error on paper 5.5.

Type: Anton 400 display, DM Sans 400/500/700 body. Seven steps (label, body, lead, h3, h2, h1, display), each a clamp() with ceiling at most 2.5x the floor. Hero headline clamp(3rem, 13vw, 7.5rem). Body 1rem+, line height 1.55. Measure about 66ch.

Material: static speckle on paper (tiny inline SVG), drip shapes under the pass band. Cards flat, 1px border, 6px radius. Spacing on an 8px grid, sections 112px desktop, 72px mobile.

Motion: only the garage door (hero) and Block Math (slider glide). Everything else: hover/press, CSS reveals behind reduced-motion and support checks.

## Final review checklist (section 10)
- [ ] With JavaScript switched off, the three passes and their prices are still on the page.
- [ ] The hero alone would sell the job. The garage door plays once and the photo behind it is his real garage. On a 375px screen the headline and "Book a Block" are visible without scrolling.
- [ ] Block Math gives $25, $69, $94, $99 and $99 for 1, 3, 4, 5 and 12, and works with mouse, touch and keyboard.
- [ ] Every button on the page goes somewhere new. No button links to the page it is on.
- [ ] Every "Book a Block" opens the Block Builder with the right pre-selects. The last step never claims a booking.
- [ ] Every item in "Things only this business has" is on the page.
- [ ] Zero em dashes, zero "--", zero stock or AI images, zero invented facts, no phone number, no reviews, no spot counts.
- [ ] 2 fonts, the token palette only, motion in only 2 sections, no cursor effects or loading intro.
- [ ] Mobile at 375px: no overflow, burger works, sticky bar works and never covers focus. A keyboard-only pass and a 200% zoom pass both work.
- [ ] Demo mode serves noindex, nofollow in the tag and the header, with the concept footer line. Live mode serves index, follow, the sitemap and no concept line.
- [ ] The link preview image and favicon are his.
- [ ] Lighthouse SEO is 100 in live mode on mobile and desktop, and the other three are 90 or higher.
- [ ] One h1 with the service and the town. Title and description as written in section 7. JSON-LD validates and claims nothing untrue.
