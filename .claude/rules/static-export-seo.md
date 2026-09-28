---
paths:
  - "app/**"
  - "lib/seo.ts"
  - "next.config.ts"
  - "firebase.json"
---

# Static export + SEO

- `output: 'export'` constraints: no `headers()`/`cookies()`, no server actions, no `redirects`/`rewrites`/`headers` in next.config, no ISR; dynamic segments need `generateStaticParams`; metadata routes (sitemap, robots, icons) need `export const dynamic = "force-static"`.
- Redirects live in `firebase.json` (path redirects) or the client `HashRedirect` (`/#pricing` → `/pricing/`; hash fragments never reach a server).
- Every `page.tsx` exports `metadata` from `buildMetadata()` in `lib/seo.ts`: unique title (≤ 60 chars incl. template), description 70–160 chars, canonical URL with trailing slash, Open Graph (title, description, url, image 1200×630), Twitter `summary_large_image`.
- Every route is listed in the routes list that feeds `app/sitemap.ts` (URLs with trailing slash, matching canonicals).
- JSON-LD through `<JsonLd>`: Organization + WebSite (root layout), SoftwareApplication with Offers from the plans module (home, pricing; no aggregateRating while it is a placeholder), FAQPage (pages with FAQs), BreadcrumbList + TechArticle (docs articles).
- Headings carry keywords naturally, but copy stays exactly as designed.
