# Custom Signup Forms — marketing website

Static marketing + docs site for **customsignupforms.codinative.com** (BigCommerce app by Codinative).
App repo = facts source only, never edit: `/Users/macbook/Documents/Arham Asjid/apps/Custom Signup Forms/Code/custom-signup-forms`

## Stack
- Next.js 15.5 App Router · React 19 · TypeScript strict · ESLint (`next/core-web-vitals`, `next/typescript`)
- `output: 'export'` + `trailingSlash: true` → static HTML in `out/`, hosted on GCP (Firebase Hosting). No server runtime.
- Plain CSS: tokens, base and typography utilities in `app/globals.css`; component styles in co-located `*.module.css`. No Tailwind, no CSS-in-JS, no inline `style` except truly dynamic values.
- Fonts via `next/font/google`: Poppins 600/700 (display), Inter 400–700 (body), JetBrains Mono 500/600 (labels, code).

## Commands
- `npm run dev -- -p 3100` (:3100; port 3000 is used by another local app) · `npm run typecheck` · `npm run lint` · `npm run build` (static export → `out/`)
- `npm run serve` — serves `out/` on :4173 like Firebase (trailing-slash redirects, 404.html)
- Testing phase only: `npm run test:visual -- <page>`, `npm run test:dom -- <page>`, `npm run test:overflow`, `npm run test:audit`

## Design source of truth (handoff bundle)
`/Users/macbook/Documents/Arham Asjid/apps/Custom Signup Forms/Code/website-redesign-handoff/`
- `DESIGN-SPEC.md` — the brief: routes, tokens, responsive rules, facts, open placeholders
- `design/*.dc.html` — exact values; read the markup, never estimate from PNGs
- `reference/*.png` — pixel targets (desktop 1440, phone 390)
- `assets/` — full-resolution originals (site copies live in `public/images/`)
- Route ↔ artboard map: `scripts/visual/pages.mjs`. Architecture, component contracts, link map: `docs/ARCHITECTURE.md`

## Layout
- `app/` one folder per route · `components/{layout,ui,home,pricing,multi-storefront,docs,releases,apps,legal}/`
- `lib/content/*.ts` typed data (plans, featureMatrix, faqs, releases, docsIndex, apps, navigation) · `lib/site.ts` links · `lib/seo.ts` metadata + JSON-LD helpers
- `scripts/` build + test tooling · `docs/` project docs (ARCHITECTURE, TIME-LOG)

## Workflow (strict order)
1. **Development** — build every page. While developing only `typecheck` + `lint` are allowed; no screenshots, no Playwright.
2. **Testing** — only after ALL development: visual compare 1440/390, DOM diff, 768/1024 layout, overflow 320–1920, SEO/a11y audit, browser QA, fix loop.
3. **Deployment** — Firebase Hosting (skill `deploy-gcp`).
- Log every phase and sub-phase start/end in `docs/TIME-LOG.md` (skill `time-log`).
- Parallel agents own only their page folders; shared code (`components/ui`, `components/layout`, `lib/`, `app/layout.tsx`, `app/globals.css`) changes only through the orchestrator.

## Agents & skills (`.claude/`)
- Agents: `page-builder` (development, one per page), `visual-qa` (testing, one per page), `site-auditor` (testing, SEO/a11y/links/facts)
- Skills: `dc-to-react` (design markup → components), `visual-compare` (test tooling), `deploy-gcp`, `time-log`

## Git
- Branch `feat/website-redesign`. Never commit or push without explicit user permission. Stage specific files only.

## Hard rules (details in `.claude/rules/`)
- The design wins: copy, sizes, colours, spacing exactly as in `.dc.html`. No additions, removals or "improvements".
- Every file ≤ 300 lines. Server Components by default; `'use client'` only for MobileMenu, FaqAccordion, PlanSwitcher, VersionJump, DocsSearch, DocsToc, HashRedirect, StickyHeader.
- Facts (prices, limits, links, API) only from DESIGN-SPEC.md or the app repo. Placeholders stay a visible `PlaceholderBox`; never invent ratings, counts, dates or quotes.
- Never read `.env*` or secrets. Never `rm -rf`.
