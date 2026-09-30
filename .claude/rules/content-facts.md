---
paths:
  - "lib/**"
  - "app/docs/**"
  - "components/docs/**"
---

# Content & facts

- Facts come from DESIGN-SPEC.md ("Facts the copy relies on") and the app repo (read-only). Never invent a rating, store count, date, quote, limit, price or API behaviour.
- Plans: Free $0 · Standard $99/month · Pro $199/month · Enterprise quote. 7-day free trial on paid plans, no setup fee on any plan, USD before tax.
- Links: Install → `https://www.bigcommerce.com/apps/custom-signup-forms-by-codinative/`; Open the app → `https://signup.codinative.com/`; Custom Shipping Rules → `https://custom-shipping-rules.codinative.com/`; Sticky Add to Cart → `https://sticky-add-to-cart.codinative.com/`; support `info@codinative.com`. All live in `lib/site.ts`.
- Open placeholders render `<PlaceholderBox>` with the design's text: marketplace rating, number of stores, v2.0.0 release date, `[app-domain]`, `[store-id]`, `[channel]`, `[signature]`, API plan availability.
- Undesigned docs guides (`/docs/multi-storefront`, `/docs/plans-and-billing`, `/docs/headless`, `/docs/email-smtp`): only statements verified in the app repo; anything unverifiable goes in a `PlaceholderBox` labelled for review.
- One plans module feeds the homepage teaser, /pricing cards and the phone plan switcher; the feature matrix feeds the comparison table and switcher.
