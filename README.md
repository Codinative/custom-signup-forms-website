# Custom Signup Forms - marketing website

The marketing + documentation site for **Custom Signup Forms**, a BigCommerce app by
[Codinative](https://codinative.com) that replaces the default account-signup form with a
branded, custom form - with request approval, customer-group assignment, and automated emails.

Built with **Next.js 15** (App Router) + **React 19** + TypeScript, exported as a fully static
site (`output: 'export'`) and hosted on **Firebase Hosting** (GCP). No database, no API, no server.

## Live site & links

🌐 **Live site:** https://customsignupforms.codinative.com/

| Page | Link |
|------|------|
| Home (marketing) | https://customsignupforms.codinative.com/ |
| Pricing | https://customsignupforms.codinative.com/pricing/ |
| Multi-storefront | https://customsignupforms.codinative.com/multi-storefront/ |
| Documentation home | https://customsignupforms.codinative.com/docs/ |
| API integration | https://customsignupforms.codinative.com/docs/api/ |
| Release notes | https://customsignupforms.codinative.com/release-notes/ |
| More apps | https://customsignupforms.codinative.com/apps/ |
| Codinative | https://codinative.com/ |

## Structure

```
app/                       One folder per route; layout.tsx (fonts, metadata), globals.css (design tokens),
                           sitemap.ts, robots.ts, icon.png, not-found.tsx
components/ui/             Button, Tag, Icon, BrowserFrame, CodeBlock, FAQ, PlaceholderBox, JsonLd …
components/layout/         SiteHeader (dark/light, sticky), StickyHeader, MobileMenu, Footer, Logo, HashRedirect
components/docs/           Docs article template (sidebar, "On this page", phone bar) + docs pages
components/<page>/         Page sections (home, pricing, multi-storefront, apps, releases, legal)
lib/content/               Typed content: plans, featureMatrix, faqs, releases, docsIndex, apps, navigation, routes
lib/site.ts · lib/seo.ts   Links and constants · metadata + JSON-LD helpers
scripts/                   Image variants, OG images, static server, visual/audit test tooling
docs/                      ARCHITECTURE.md (component contracts) · TIME-LOG.md (build timings)
```

## Develop

```bash
npm install
npm run dev -- -p 3100   # http://localhost:3100 (also generates WebP image variants)
npm run lint && npm run typecheck
npm run build            # static export → out/
npm run serve            # serve out/ like Firebase on http://localhost:4173
npm run og               # regenerate the per-page Open Graph images (public/og/)
```

Testing tools (after `build` + `serve`): `npm run test:visual` (design vs build screenshots),
`npm run test:dom` (copy/style diff against the design files), `npm run test:overflow`
(320–1920px), `npm run test:audit` (SEO, accessibility, links).

## Deploy (Firebase Hosting)

Configured in [`firebase.json`](firebase.json) (static `out/`, clean URLs with trailing slashes,
301s for the old `/docs/privacy-policy` and `/docs/terms-of-service` URLs, caching and security
headers) and [`.firebaserc`](.firebaserc) (project `bc-signup-customisation-app`).

```bash
npx firebase-tools login   # once
npm run deploy:preview     # build + deploy to a 7-day preview channel URL
npm run deploy:live        # build + deploy to the live site
```

Custom domain: Firebase console → Hosting → Add custom domain → `customsignupforms.codinative.com`,
then create the DNS records it shows. Submit `/sitemap.xml` in Google Search Console after going live.

## Editing copy & links

Update product links (marketplace listing, app URL, support email) in
[`lib/site.ts`](lib/site.ts). Plans, prices, the feature matrix, FAQs, release notes, docs index and
apps live in [`lib/content/`](lib/content/). One plans module feeds the homepage teaser, `/pricing`
and the phone plan switcher. Open facts (marketplace rating, store count, v2.0.0 date, app domain)
render as dashed amber placeholders until they are filled in.

---

This is the **marketing site only**. The embedded BigCommerce app itself lives in the
separate `Codinative/custom-signup-forms` repository.
