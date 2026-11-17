// Q and A. His questions from trainocmd.com, answers in his words from BUILD-SPEC.md section 1, trimmed only for length.
// The same array feeds the visible accordion and the FAQPage JSON-LD, so they match word for word.
import { business, passes } from './business.ts'

export type Qa = { q: string; a: string }

export const faq: Qa[] = [
  {
    q: 'What does it cost?',
    a: `Drop-In, $${passes.dropin.price} per person. 3-Pack, $${passes.threepack.price} per person. Train Unlimited, $${passes.unlimited.price} a month. Members can add a guest to their block for $${business.guestPrice}.`,
  },
  {
    q: 'Where are you located?',
    a: `${business.address.full}. ${business.address.areaLong}`,
  },
  {
    q: 'Where do I park?',
    a: `${business.parking.where} ${business.parking.note}`,
  },
  {
    q: 'What if I need to cancel my membership?',
    a: `Cancel any time. ${business.lines.noFee}`,
  },
  {
    q: 'Can I bring a friend to my session?',
    a: `Yes. Members can add a guest to their block for $${business.guestPrice}.`,
  },
  {
    q: 'Is there an instructor or a class to follow?',
    a: `No class, no instructor. ${business.lines.tagline} ${business.lines.howYouWant}`,
  },
  {
    q: 'Does it get crowded in the summer?',
    a: `Eight people max per block. ${business.lines.neverCrowded}`,
  },
  {
    // DRAFT: Evan's chalk answer from trainocmd.com is not in the brief. Paste his answer here.
    q: 'Can I use chalk?',
    a: `Ask Evan before your block: ${business.email}.`,
  },
  {
    // DRAFT: confirm. Built from his equipment line about bumper plates.
    q: 'Can I slam weights?',
    a: 'There are bumper plates for when you need to drop it.',
  },
  {
    q: 'Can I rent the whole space?',
    a: `Yes, you can rent the whole space for a group. Rates by email: ${business.email}.`,
  },
]
