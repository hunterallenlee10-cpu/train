import { business, passes } from '@/lib/business'
import { faq } from '@/lib/faq'
import { abs, SITE_URL } from '@/lib/site'

/** Server-rendered structured data. No ratings, no reviews: there are none. */
export function buildJsonLd() {
  const a = business.address
  const offers = (['dropin', 'threepack', 'unlimited'] as const).map((id) => {
    const p = passes[id]
    return {
      '@type': 'Offer',
      name: p.name,
      description: p.line,
      price: p.price!.toFixed(2),
      priceCurrency: 'USD',
      url: p.checkoutUrl,
      ...(id === 'unlimited'
        ? {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: p.price!.toFixed(2),
              priceCurrency: 'USD',
              unitText: 'MONTH',
              referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
            },
          }
        : {}),
    }
  })

  const gym = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    '@id': `${SITE_URL}/#gym`,
    name: business.wordmark,
    description: business.description,
    url: abs('/'),
    logo: abs('/images/logo-black.png'),
    image: [abs('/images/raw/01-GARAGE-DOOR-OPEN-exterior-BEST.jpg'), abs('/og-image.png')],
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: business.geo.latitude, longitude: business.geo.longitude },
    // DRAFT: blocks run 04:00 to 22:00; confirm these run every day of the week
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: business.openDays, opens: business.opens, closes: business.closes },
    ],
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Train passes', itemListElement: offers },
    sameAs: [business.links.instagram],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#q-and-a`,
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [gym, faqPage]
}

export default function JsonLd() {
  return (
    <>
      {buildJsonLd().map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}
