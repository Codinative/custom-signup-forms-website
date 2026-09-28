# Architecture: Custom Signup Forms website rebuild

Status: **plan, awaiting user go-ahead.** Decisions marked ⏳ wait on a user answer; the rest are defaults.

## 1. Routes
| Route | Desktop / phone artboard | Header | Owner (dev batch D2) |
|---|---|---|---|
| `/` | Main / MobileHome (+ MobileMenu) | dark overlay, no active link | A1 home |
| `/pricing/` | Pricing / MobilePricing | light, active Pricing | A2 pricing |
| `/multi-storefront/` | MultiStorefront / MobileMultiStorefront | dark overlay, active Multi-storefront | A3 ms+apps |
| `/apps/` | Apps / MobileApps | light, no active link | A3 ms+apps |
| `/docs/` | Docs / MobileDocs | light, active Docs | A4 docs |
| `/docs/api/` | ApiDocs / MobileApiDocs (the article template) | light, active Docs | A4 docs |
| `/release-notes/` | ReleaseNotes / MobileReleaseNotes | light, active Release notes | A5 releases |
| `/contact/`, `/privacy-policy/`, `/terms-of-service/` | kept content, restyled (page hero + prose) | light | A6 kept+guides |
| `/docs/installation/`, `/docs/user-guide/` | kept content on the article template | light, active Docs | A6 kept+guides |
| `/docs/multi-storefront/`, `/docs/plans-and-billing/`, `/docs/headless/`, `/docs/email-smtp/` | new guides on the article template, app-repo facts only | light, active Docs | A6 kept+guides |
| `/docs/privacy-policy`, `/docs/terms-of-service` | 301 → main pages (firebase.json); route files removed | – | orchestrator |
| 404 | shared header/footer + one line + home link | light | A6 |

## 2. Folders
```
app/                     routes; layout.tsx (fonts, skip link, JSON-LD org/site), globals.css, sitemap.ts, robots.ts, icon.png, apple-icon.png
components/ui/           Icon, Button, Tag, Eyebrow, SectionHeading, PlaceholderBox, BrowserFrame, CodeBlock, FaqAccordion, FaqStatic, JsonLd
components/layout/       SiteHeader, MobileMenu (client), Footer, HashRedirect (client)
components/docs/         DocsArticleLayout, DocsSidebar, DocsToc (client scrollspy), DocsPhoneBar, Prose, DocsCard, DocsSearch (client), …
components/{home,pricing,multi-storefront,apps,releases,legal}/   page sections
lib/content/             plans, featureMatrix, faqs, releases, docsIndex, apps, navigation, routes
lib/site.ts  lib/seo.ts  lib/image-loader.ts
public/images/           originals (+ generated `_v/` WebP variants, gitignored)   public/og/  per-page OG PNGs
scripts/                 images/optimize.mjs, og/generate.mjs, serve-out.mjs, visual/*, audit/*
```

## 3. Tokens (`app/globals.css`)
`--navy #141a44` · `--blue-950 #172554` `--blue-900 #1e3a8a` `--blue-800 #1e40af` `--blue-700 #1d4ed8` `--blue-600 #2563eb` `--blue-300 #93c5fd` `--blue-200 #bfdbfe` `--blue-100 #dbeafe` `--blue-50 #eff6ff` · `--ink #0f172a` `--text-2 #334155` `--text-body #475569` `--muted #64748b` `--faint #94a3b8` · `--line #e2e8f0` `--line-strong #cbd5e1` `--row #f1f5f9` `--surface #f8fafc` · `--success #059669` · `--shadow-primary` `--shadow-frame` · `--grid-overlay` (56px, rgba(255,255,255,.05)) · `--font-display` (Poppins) `--font-body` (Inter) `--font-mono` (JetBrains Mono) · `--pad-x-tablet: clamp(32px, calc(32px + (100vw - 768px) * .0313), 48px)`.
Base = the design helmet exactly (body Inter, `#0f172a`, antialiased; `*{box-sizing}`; `a{#2563eb; no underline}`; `p,h1–h4{margin:0}`) plus utilities `.disp .mono .eyebrow .lede .body .onlyDesktop .onlyPhone .srOnly` and a global `:focus-visible` ring (2px `#2563eb`, offset 2px).
Breakpoints: desktop ≥1280 (exact), tablet 768–1279 (fluid), phone <768 (exact at 390). Header switches to the menu button below **1024** (the desktop header needs ~950px).

## 4. Shared component contracts
```ts
Icon({ name: IconName, size = 24, strokeWidth = 2, className?, title? })   // 30 icons, exact design paths, aria-hidden unless title
Button({ href, children, variant: "primary"|"white"|"ghost"|"outline"|"violet", size?: "sm"|"md"|"lg" /*40|48|54*/, icon?, iconSize?, className? })
  // internal → next/link; http/mailto → <a> (http: target _blank rel noopener). Other heights (34/46/50/52) via className.
Tag({ tone: "new"|"improved"|"fixed"|"security"|"blue"|"latest"|"white"|"glass"|"glassSubtle"|"code"|"navy", icon?, iconSize?, className?, children })
Eyebrow({ tone?: "blue"|"light"|"muted", as?: "p"|"span"|"div", className?, children })
SectionHeading({ eyebrow?, title, body?, as?: "h1"|"h2", align?: "left"|"center", className?, titleClassName?, bodyClassName? })
PlaceholderBox({ as?: "span"|"div", className?, children })             // 1.5px dashed #d97706, #fffbeb, #92400e, r10
BrowserFrame({ src, width, height, alt, sizes, url?, barOnPhone?: boolean, priority?, className? })
CodeBlock({ header?: ReactNode, lines: CodeToken[][], className? })     // CodeToken = { t: string, k?: "key"|"str"|"tag"|"attr"|"comment"|"placeholder" }
FaqAccordion({ items: Faq[], defaultOpen?: number, classNames?, iconSize? })   // client; button[aria-expanded] + region
FaqStatic({ items: Faq[], classNames? })
JsonLd({ data })
SiteHeader({ variant: "dark"|"light", active?: NavKey })                // dark = absolute over the page hero (hero reserves 80/68px)
MobileMenu({ variant })                                                 // client; full-screen navy sheet, focus trap, Esc, scroll lock
Footer()                                                                // desktop 5-col / phone 2-col blocks
HashRedirect({ map: { "#pricing": "/pricing/" } })                      // client, home only
DocsArticleLayout({ active: DocSlug, breadcrumb: Crumb[], title, titleTag?, lede, phoneLede?, toc: TocItem[], children })
```

## 5. Data modules (`lib/content/`, typed, no JSX)
- `plans.ts`: `Plan { id, name, price, priceLabel, teaserPriceLabel, period, phoneTeaserPeriod, tagline, teaserBlurb, phoneTeaserBlurb, badge?, featured, cta { label, teaserLabel, compareLabel, href, variant }, note, lead, bullets[], fitLine }`. It feeds the home teaser, the /pricing cards and the phone switcher, plus SoftwareApplication offers.
- `featureMatrix.ts`: 7 groups, 36 rows, `values: Record<PlanId, true|false|string>`.
- `faqs.ts`: `homeFaqs` (6), `pricingFaqs` (5).
- `releases.ts`: 6 releases, newest first.
- `docsIndex.ts`: groups, entries (slug, href, title, description, icon, tag?, sidebar), integration band, `apiToc`.
- `apps.ts`: 3 apps (current flag, previews, site and marketplace URLs).
- `navigation.ts`: header (5), menu (7), footer columns (4), phone footer (9).
- `routes.ts`: every route for the sitemap.

## 6. Link map (every design `href="#"`)
Logo → `/` · Features → `/#features` · Multi-storefront, Explore multi-storefront → `/multi-storefront/` · Pricing, See pricing → `/pricing/` · Compare every feature → `/pricing/#compare` · Docs, Read the docs → `/docs/` · Release notes → `/release-notes/` · hero "New" pill → `/release-notes/#v2-0-0` · More apps, All apps, See all apps → `/apps/` · Contact, Contact us, Contact support, Talk to Codinative → `/contact/` · Codinative → `https://codinative.com/` · Open the app → `https://signup.codinative.com/` · Install free / Install / Start 7-day (free) trial / Try free / Start a 7-day Pro trial / Get it on BigCommerce (this app) → marketplace listing · footer "Headless and API" → `/docs/headless/` ⏳ · Privacy, terms and data → `/privacy-policy/` · Custom Shipping Rules / Sticky Add to Cart → their sites; their "Get it on BigCommerce" → marketplace URLs ⏳ · docs cards → their routes · email → `mailto:info@codinative.com`.

## 7. Decisions (defaults)
1. Plain CSS kept: tokens and utilities in `globals.css`, component CSS Modules. The old 575-line `globals.css` is replaced.
2. Server Components are pre-rendered to static HTML at build (best for SEO). Client components: MobileMenu, FaqAccordion, PlanSwitcher, VersionJump, DocsSearch, DocsToc, HashRedirect.
3. Images: `next/image` with a custom loader and build-time WebP variants (`scripts/images/optimize.mjs`, sharp), so `sizes`/srcset work in static export. The storefronts crop is pre-cut to 860×580.
4. Placeholders follow the spec, not the design's plain text: `[Release date]` and the `[app-domain] [store-id] [channel] [signature]` tokens in code render as inline dashed amber boxes. The API "Pro and Enterprise" badge stays a placeholder until confirmed ⏳.
5. Hover: text links → `#1d4ed8`; primary button background → `#1d4ed8`; other buttons unchanged. The design's global `a:hover` recolours button text, which is a prototype bug and is not copied. Focus ring everywhere.
6. Design quirks are copied exactly (pricing-teaser CTA offset, `line-height: normal`, icon baseline offsets). Exception: the phone /apps CTAs that collapse to ~18px become 40px ⏳.
7. Undesigned states: the phone FAQ opens to the desktop answer style with a minus icon; docs search is the designed box as an input with a results dropdown over the docs index (⌘K / Ctrl+K); the API phone "On this page ▾" is a native disclosure; version jump is a native `<select>` over the designed box; the TOC highlights the current section on scroll.
8. SEO: `buildMetadata()` per page (title template `%s - Custom Signup Forms`, canonical with trailing slash, OG and Twitter). Per-page OG PNGs come from one branded template (`scripts/og/generate.mjs`, committed to `public/og/`). JSON-LD: Organization, WebSite, SoftwareApplication (offers from plans; no rating), FAQPage, BreadcrumbList, TechArticle. The sitemap uses trailing slashes.
9. Security: next 15.5.19 → 15.5.26 plus `npm audit fix` (non-breaking), so the CI audit gate passes.

## 8. Work breakdown
- **D1 Foundation.**
  - Orchestrator: globals, fonts, config, image pipeline, `lib/seo.ts`, `lib/site.ts`, Icon, Button, Tag, PlaceholderBox, JsonLd, HashRedirect.
  - Then 4 parallel agents: F1 ui-kit (Eyebrow, SectionHeading, BrowserFrame, CodeBlock, FAQ); F2 layout (SiteHeader, MobileMenu, Footer, 404); F3 data (all `lib/content` modules); F4 docs layout (DocsArticleLayout, Sidebar, Toc, PhoneBar, Prose).
- **D2 Pages.** 6 `page-builder` agents in parallel (A1–A6 above). Each owns only its folders.
- **D3 Integration.** Orchestrator: shared-code requests, sitemap and robots, OG images, redirects, typecheck, lint, build green.
- **Testing.**
  - T1 gates.
  - T2: 8 `visual-qa` agents in parallel against one dev server.
  - T3 overflow and 768/1024 review.
  - T4 `site-auditor`.
  - T5 browser QA (keyboard and interactions).
  - T6 final build plus a side-by-side pass of every page at 1440 and 390.
- **Deployment.** `deploy-gcp` skill: preview channel, then approval, then live.
