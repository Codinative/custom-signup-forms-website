# Architecture: Custom Signup Forms website rebuild

Status: **approved 2026-09-28 (defaults + Firebase Hosting).** Items marked ⏳ use the default (placeholder or fallback) until the owner supplies them.

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
| `/docs/installation/` | kept content on the article template | light, active Docs | A6 kept+guides |
| `/docs/user-guide/` | rewritten 2026-10-01 (every app feature, 19 app screenshots `public/images/guide-*.png`) on the article template, `components/docs/user-guide/` | light, active Docs | owner request |
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

## 4. Shared component contracts (as built in D1b; read the source before using)
Base styles in `components/ui` use `:where()` (zero specificity), so a page `className` always wins. Exception: Button variant colours keep class specificity (they must beat the global `a { color }`).
```ts
Icon({ name, size = 24, strokeWidth = 2, className?, title? })   // alertTriangle shieldCheck file check truck cart search store arrowRight globe smartphone book creditCard code api mail sparkles clock building lock minus plus menu close chevronRight users bell gauge layout checkCircle
Button({ href, children, variant: "primary"|"white"|"ghost"|"outline"|"violet", size?: "sm"|"md"|"lg" /*40|48|54*/, icon?, iconSize = 18, iconStrokeWidth = 2, className? })   // http → new tab; other heights via className
Tag({ tone: "new"|"improved"|"fixed"|"security"|"blue"|"latest"|"white"|"glass"|"glassSubtle"|"code"|"navy", children, icon?, iconSize = 14, iconStrokeWidth = 2, as?, className? })
PlaceholderBox({ children, as?: "span"|"div", className? })   // padding/size per use from the design
PartnerBadge({ height, tone?: "blue"|"white", className? })   // official Certified BigCommerce Partner SVG; white = one-colour version for dark surfaces
Eyebrow({ children, tone?: "blue"|"light"|"muted", as?: "p"|"span"|"div" /*span*/, className? })
SectionHeading({ eyebrow?, title, body?, as?: "h1"|"h2", align?: "left"|"center", className?, titleClassName?, bodyClassName? })   // title gets .disp; split layouts render body themselves
BrowserFrame({ src, width, height, alt, sizes, url?, barOnPhone = false, priority?, className?, imgClassName? })   // bar at ≥768 when url; radius 14 <768
CodeBlock({ header?, lines: CodeToken[][], className?, preClassName?, label? })   // default look = API docs panel
  CodeToken = { t: string; k?: "key"|"str"|"tag"|"attr"|"comment"|"muted"|"placeholder" }   // a placeholder is its own token
  CodeHeader({ title, lang, className? }) · CodeFileHeader({ filename, tag, className? })
FaqAccordion({ items: FaqItem[], variant: "home"|"compact", defaultOpen?, className? })   // client
FaqStatic({ items: FaqItem[], className? })   // FaqItem = { q: string; a: ReactNode }; a === null → <PlaceholderBox as="span">
JsonLd({ data })
SiteHeader({ variant: "dark"|"light", active?: NavKey })   // render FIRST, outside <main>; renders MobileMenu itself
Footer() · Logo({ tone: "light"|"dark", height, className?, eager? }) · HashRedirect({ map })
DocsArticleLayout({ active: DocSlug, breadcrumb: Crumb[], title, titleTag?, lede, phoneLede?, phoneCrumb?, toc: TocItem[], children })   // renders <main id="main">
ProseSection({ id?, title?, intro?, className?, children? }) · Callout({ tone?: "warning"|"note", className?, children })
DefinitionRows({ rows: { key, value, phoneValue? }[], keyWidth?, className? }) · StepCards({ steps, hideOnPhone = true, className? })
DocsFigure({ src, width, height, alt, caption?, maxWidth?, className? })   // app screenshot in an article: BrowserFrame (no bar) + figcaption; maxWidth keeps narrow dialog crops at their own size
```
- Page shell: `<SiteHeader …/>` then `<main id="main">…</main>` (docs articles: DocsArticleLayout provides main) then `<Footer />`.
- Dark hero (home, multi-storefront): starts at the top of the page and draws its own gradient; top padding = `calc(var(--header-h) + <design top padding>)`; add `className="onDark"` to dark sections.

## 5. Data modules (`lib/content/`, typed, no JSX)
- `plans.ts`: `PlanId`, `PlanCta`, `Plan`, `PLANS`, `PLAN_FIT`, `PLAN_OFFERS` (JSON-LD offers). Feeds the home teaser, /pricing, the phone switcher and SoftwareApplication.
- `featureMatrix.ts`: `FeatureValue`, `FeatureRow`, `FeatureGroup`, `FEATURE_GROUPS` (7 groups, 36 rows), `COMPARE_COPY`, `COMPARE_PHONE_DEFAULT_PLAN`.
- `faqs.ts`: `Faq { q, a: string | null }`, `homeFaqs` (6), `pricingFaqs` (5), `answeredFaqs()` for FAQPage JSON-LD.
- `releases.ts`: `RELEASES` (6, newest first), `CHANGE_LABELS`, `RELEASE_COPY`, `releaseAnchor()`, `formatReleaseDate()`.
- `apps.ts`: `APPS`, `APP_CARD_COPY`, `SIGNUP_SCREENSHOT`, `CHECKOUT_PREVIEW`, `STICKY_BAR_PREVIEW`.
- `navigation.ts`: `headerLinks`, `headerCtas`, `menuLinks`, `menuCtas`, `footerColumns`, `phoneFooterLinks`, `footerCopy`.
- `docsIndex.ts`: `docsGroups`, `docsEntries`, `docsSidebar`, `getDoc()`, `docBreadcrumb()`, `integrationBand`, `apiToc`.
- `reviews.ts`: `REVIEWS` / `MARKETPLACE_RATING` (real Marketplace data: 2 reviews, 5.0, as of 2026-10-01; titles and dates, no names), `SAMPLE_REVIEWS` / `SAMPLE_RATING` (shown only by `npm run dev` and `build:preview`), `getReviewsContent()`.
- `routes.ts`: `ROUTES` (sitemap).

## 6. Link map (every design `href="#"`)
Logo → `/` · Features → `/#features` · Multi-storefront, Explore multi-storefront → `/multi-storefront/` · Pricing, See pricing → `/pricing/` · Compare every feature → `/pricing/#compare` · Docs, Read the docs → `/docs/` · Release notes → `/release-notes/` · hero "New" pill → `/release-notes/#v2-0-0` · More apps, All apps, See all apps → `/apps/` · Contact, Contact us, Contact support, Talk to Codinative → `/contact/` · Codinative → `https://codinative.com/` · Install free / Install / Start 7-day (free) trial / Try free / Start a 7-day Pro trial / Get it on BigCommerce (this app) → marketplace listing · footer "Headless and API" → `/docs/headless/` ⏳ · Privacy, terms and data → `/privacy-policy/` · Custom Shipping Rules / Sticky Add to Cart → their sites; "Get it on BigCommerce": Custom Shipping Rules → its marketplace listing, Sticky Add to Cart → "Coming soon" (not listed yet). No "Open the app" anywhere (owner decision 2026-09-30) · docs cards → their routes · email → `mailto:info@codinative.com`.

## 7. Decisions (defaults)
1. Plain CSS kept: tokens and utilities in `globals.css`, component CSS Modules. The old 575-line `globals.css` is replaced.
2. Server Components are pre-rendered to static HTML at build (best for SEO). Client components: MobileMenu, FaqAccordion, PlanSwitcher, VersionJump, DocsSearch, DocsToc, HashRedirect, StickyHeader (marks the header `data-scrolled`).
3. Images: `next/image` with a custom loader and build-time WebP variants (`scripts/images/optimize.mjs`, sharp), so `sizes`/srcset work in static export. App screenshots are the v2 masters captured at 2× (`*-v2.png`, 2880 px wide; the storefronts list 1768 px), served up to 2400 px wide at WebP quality 90 with smartSubsample; `width`/`height` props are the v2 design image sizes. The v1 files stay in `public/images` unused.
4. Placeholders follow the spec, not the design's plain text: `[Release date]` and the `[app-domain] [store-id] [channel] [signature]` tokens in code render as inline dashed amber boxes. The API "Pro and Enterprise" badge stays a placeholder until confirmed ⏳.
5. Hover (owner-approved 2026-09-30, replaces the design-only rule): every Button variant darkens or tints and lifts 1px; text links turn `#1d4ed8` with an underline; header links grow an underline; link cards lift and tint their border; links on navy bands turn white; 0.15s transitions, none under `prefers-reduced-motion`. The design's global `a:hover` recolours button text, which is a prototype bug and is not copied. Focus ring everywhere.
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
