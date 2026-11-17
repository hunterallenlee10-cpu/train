# Structured data validation

Validated with the Schema.org validator (validator.schema.org, POST of the rendered demo-mode HTML), 17 November 2026.

- Objects found: 2 (ExerciseGym, FAQPage)
- Errors: 0
- Warnings: 0

Required properties, parsed from the served HTML and checked by hand:

- name: train.
- url: http://localhost:3000/
- logo: http://localhost:3000/images/logo-black.png
- image: ['http://localhost:3000/images/raw/01-GARAGE-DOOR-OPEN-exterior-BEST.jpg', 'http://localhost:3000/og-image.png']
- email: info@trainocmd.com
- address: 108 142nd St., Unit C, Ocean City, MD 21842
- geo: 38.4473, -75.053
- openingHours: 04:00 to 22:00, 7 days
- offers: Drop-In 25.00 USD; 3-Pack 69.00 USD; Train Unlimited 99.00 USD
- FAQPage questions: 10
- aggregateRating or review present: False

The FAQPage block is generated from the same array as the visible Q and A (lib/faq.ts), so it matches word for word.
