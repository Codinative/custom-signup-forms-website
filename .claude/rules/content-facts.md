---
paths:
  - "lib/**"
  - "app/docs/**"
  - "components/docs/**"
---

# Content & facts

- Facts come from DESIGN-SPEC.md ("Facts the copy relies on") and the app repo (read-only). Never invent a rating, store count, date, quote, limit, price or API behaviour.
- Plans: Free $0 · Standard $99/month · Pro $199/month · Enterprise quote. 7-day free trial on paid plans, no setup fee on any plan, USD before tax.
- Links: Install → `https://www.bigcommerce.com/apps/custom-signup-forms-by-codinative/`; no "Open the app" link anywhere (merchants open the app from their BigCommerce control panel; `signup.codinative.com` does not exist); Custom Shipping Rules → site `https://custom-shipping-rules.codinative.com/`, listing `https://www.bigcommerce.com/apps/custom-shipping-rules-by-codinative/`; Sticky Add to Cart → site `https://sticky-add-to-cart.codinative.com/`, not on the marketplace yet ("Coming soon"); support `info@codinative.com`. All live in `lib/site.ts`.
- Open placeholders render `<PlaceholderBox>` with the design's text: number of stores, v2.0.0 release date, `[app-domain]`, `[store-id]`, `[channel]`, `[signature]`, API plan availability.
- Undesigned docs guides (`/docs/multi-storefront`, `/docs/plans-and-billing`, `/docs/headless`, `/docs/email-smtp`): only statements verified in the app repo; anything unverifiable goes in a `PlaceholderBox` labelled for review.
- Marketplace reviews and rating are real and word for word from the listing (`lib/content/reviews.ts`; 2 reviews, 5.0 as of 2026-10-01; the listing shows no reviewer names, so none are shown). The certified-partner claim always uses the official badge (`PartnerBadge`, owner-supplied SVG).
- One plans module feeds the homepage teaser, /pricing cards and the phone plan switcher; the feature matrix feeds the comparison table and switcher.
