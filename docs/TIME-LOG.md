# Time log: Custom Signup Forms website rebuild

Times are PKT (UTC+5), taken from `date`. **Wall-clock** is elapsed time. **Agent-min** is the sum of the parallel agents' own run times, so agent-min ÷ wall-min is the parallel speed-up. Rows marked ⏸ are time spent waiting for the user; they are not counted as active time.

## Summary

| Phase | Estimate | Start | End | Wall-clock | Variance | Notes |
|---|---|---|---|---|---|---|
| 0 Discovery & setup | – (no prior estimate) | 16:52 | 17:20 | 0:28 | – | 6 parallel read-only agents did the design/fact inventory in 14 min wall-clock |
| ⏸ Plan review by user | – | 17:20 | 17:26 | 0:06 | – | Approved: defaults + Firebase Hosting; setup committed before Phase 1 |
| 1 Development | 2:30–3:15 | 17:26 | 18:21 | 0:55 | −1:35 to −2:20 | 11 parallel agents in two batches (4 + 7); contracts written up front meant no merge conflicts |
| 2 Testing | 2:30–3:30 | 18:20 | 22:46 | 0:39 active (4:26 elapsed) | −1:51 to −2:51 | 3:47 idle while the session was paused, plus a failed agent launch; active work 18:20–18:31 and 22:18–22:46 |
| 3 Deployment (preview) | 0:30–0:45 | 22:46 | 22:53 | 0:07 | −0:23 to −0:38 | Preview channel live and verified; production release waits for your go-ahead (app v2 not shipped yet) |
| **Total active** | **6:15–8:30** | 16:52 | 22:53 | **2:08 active** (6:01 elapsed) | **−4:07 to −6:22** | Elapsed includes 3:47 idle (session paused) and 0:06 plan review |

## Phase 0: Discovery & setup (2026-09-28)

| # | Sub-phase | Start | End | Wall | Agent-min | Who | Notes |
|---|---|---|---|---|---|---|---|
| 0.1 | Read repo (framework, config, routes), spec, prompt, canvas manifest | 16:52 | 16:57 | 0:05 | – | main | Next 15.5 static export, plain CSS; all 17 designs share one style block |
| 0.2 | Design and fact inventories (6 parallel agents, read-only) | 16:57 | 17:11 | 0:14 | 71.6 | 6 agents | Speed-up ≈5.1×. Per agent: home 12.1 · pricing 10.5 · ms+apps 10.3 · docs+API 12.4 · releases+audit 12.6 · kept pages+guide facts 13.6 |
| 0.3 | Tooling: branch, `npm ci`, Playwright, pixelmatch, test scripts, smoke test | 16:58 | 17:05 | 0:07 | – | main | In parallel with 0.2. Design renders match reference PNG heights exactly |
| 0.4 | Claude Code workspace: CLAUDE.md, settings, 4 rules, 3 agents, 4 skills | 17:05 | 17:13 | 0:08 | – | main | |
| 0.5 | Icon extraction (30), ARCHITECTURE.md, TIME-LOG.md, plan and questions | 17:13 | 17:20 | 0:07 | – | main | |

## Phase 1: Development
| # | Sub-phase | Estimate | Start | End | Wall | Agent-min | Who | Notes |
|---|---|---|---|---|---|---|---|---|
| 1.0 | Commit setup (user request) | – | 17:26 | 17:28 | 0:02 | – | main | Setup committed as 3185847 before development |
| 1.1 | D1a Foundation (tokens, fonts, config, images, seo, core UI) | 0:25 | 17:28 | 17:36 | 0:08 | – | main | next 15.5.26 + sharp 0.35.5 override → npm audit 0 vulns; 120 WebP variants; Icon (30), Button, Tag, PlaceholderBox, JsonLd, HashRedirect |
| 1.1b | OG image generator + 16 OG PNGs (done while 1.2 runs) | – | 17:37 | 17:42 | 0:05 | – | main | One bug (logo stretched in flex column) fixed on first look |
| 1.2 | D1b Shared components + data (4 parallel agents) | 0:35 | 17:36 | 17:54 | 0:18 | 56.1 | F1–F4 | Speed-up 3.1×. F1 ui-kit 15.0 · F2 layout 13.7 · F3 data 10.8 · F4 docs template 16.6. Zero shared-code conflicts; repo typecheck+lint clean at merge |
| 1.2b | Contracts sync: ARCHITECTURE §4–5 updated to as-built APIs | – | 17:54 | 17:56 | 0:02 | – | main | Requested by F1 so page agents build against real props |
| 1.3 | D2 Pages (7 parallel page-builder agents; guides split out of kept pages) | 1:15 | 17:56 | 18:19 | 0:23 | 121.0 | A1–A7 | Speed-up 5.3×. A1 home 18.6 · A2 pricing 17.5 · A3 ms+apps 19.5 · A4 docs+API 20.9 · A5 releases 11.3 · A6 kept pages 12.3 · A7 guides 20.9. Main thread meanwhile: removed /docs legal duplicates, fixed stale .next types (my removal broke typecheck for ~5 min), lowered Tag/Button/Placeholder specificity, phone-TOC fix, dead-code removal |
| 1.4 | D3 Integration (shared requests, gates, build) | 0:30 | 18:19 | 18:21 | 0:02 | – | main | Most D3 items were done during 1.3. Static build: 23 pages, 115–117 kB first-load JS; sitemap/canonicals/OG verified in out/ |

## Phase 2: Testing
| # | Sub-phase | Estimate | Start | End | Wall | Agent-min | Who | Notes |
|---|---|---|---|---|---|---|---|---|
| 2.1 | Gates: lint, typecheck, build | 0:05 | 18:20 | 18:21 | 0:01 | – | main | Passed inside the 1.4 production build (next build runs lint + types) |
| 2.2a | Baseline: DOM diff + pixel compare, 8 pages × 1440/390 | – | 18:21 | 18:25 | 0:04 | – | main | Pricing 0.02–0.03% · menu 0.06% · docs 0.06–0.11% · apps desktop 0.07% · releases 0.21–0.24% · multi-storefront 0.5–0.6% · home 1–1.75%. Big deltas = approved deviations only (API corrected errors + Limits section; phone /apps 40px CTAs = +132px). Tool fixes: ignore off-screen skip link, scope menu diff to the dialog |
| ⏸ | Commit + push Phase 1 and baseline (user request) | – | 18:25 | 18:29 | 0:04 | – | main | 43767e8 pushed to origin/feat/website-redesign. Unused requests.png / uncropped storefronts.png dropped from public/ before the commit. Dev server moved to :3100 (another local app holds :3000) |
| 2.2x | First targeted QA launch (3 visual-qa agents) — failed | – | 18:29 | 18:31 | 0:02 | – | QA agents | Session interrupted right after launch; dev server stopped with the interrupt; all 3 agents later stalled (stream watchdog, 600s no progress) with no file changes. Wasted ≈2 min active + relaunch cost |
| ⏸ | Idle: session paused / interrupted | – | 18:31 | 22:18 | 3:47 | – | – | No work possible while the session was paused; excluded from active time |
| 2.2 | Visual fidelity 1440/390 + fixes (4 visual-qa agents, relaunch) | 1:30 | 22:20 | 22:37 | 0:17 | 55.5 | QA-1…QA-4 | Speed-up 3.3×. QA-1 home+menu 14.0 · QA-2 ms+apps 13.4 · QA-3 docs+API 17.2 · QA-4 releases 10.9. Root cause found: WebP variants round to whole px, so `height:auto` images drifted 0.2–0.55px each (home +2px total) |
| 2.3 | Responsive: overflow 320–1920, 768/1024 review | 0:25 | 22:20 | 22:25 | 0:05 | – | main | 16 routes × 15 widths = 240 loads, 0 overflow. Tablet review of undesigned pages: one fix (docs breadcrumb duplicated by the bar crumb at 768–1023) |
| 2.4 | SEO / a11y / links / facts audit + fixes | 0:25 | 22:20 | 22:39 | 0:19 | 17.4 | site-auditor + main | No blockers. Fixed: fetchpriority on LCP frames, /apps LCP priority, phone TOC dropdown Escape/outside-close, rule text. API error-table deviation = approved |
| 2.4b | Shared-code fixes from QA reports | – | 22:29 | 22:39 | 0:10 | – | main | Aspect-ratio pins in BrowserFrame + Logo (root-cause fix), CodeBlock placeholder nowrap, TOC scrollspy (hidden sections + page bottom), "On this page" at 1024–1279, dom-diff menu viewport |
| 2.5 | Browser QA in the built-in browser (static build): menu, redirect, switcher, jump, search, FAQ, TOC disclosure, 404 | 0:20 | 22:25 | 22:29 | 0:04 | – | main | All pass. Hardened HashRedirect for same-page hash changes. Screenshot tool sometimes captures before repaint (not a site bug) |
| 2.6 | Final gates + side-by-side pass on every page | 0:25 | 22:39 | 22:46 | 0:07 | – | main | Lint/types/build ✅. Production build: home 0.13/0.53% · menu 0.06% · pricing 0.01/0.03% · ms 0.22/0.51% · docs 0.02/0.06% · releases 0.05/0.15% · apps 0.05% (phone: approved CTA offset) · API: approved content only. Δh 0 everywhere else. Overflow 0 (all routes, 320–1920). Audit 16/16 clean |

## Phase 3: Deployment
| # | Sub-phase | Estimate | Start | End | Wall | Who | Notes |
|---|---|---|---|---|---|---|---|
| 3.1 | firebase.json, .firebaserc, deploy scripts, live-deploy "ask" guard, README | 0:10 | 22:46 | 22:49 | 0:03 | main | Target found by listing projects/sites: bc-signup-customisation-app (its live channel serves the old site) |
| 3.2 | Preview channel deploy + verification | 0:15 | 22:49 | 22:53 | 0:04 | main | Live channel untouched. 301s, 404, trailing slash, headers, cache, sitemap verified on Firebase; audit 16/16; pixel check home/pricing/API matches local; browser check |
| 3.2b | Commit + push testing and deployment changes (user request) | – | 22:57 | 22:58 | 0:01 | main | Commit timestamp in `git log` is the exact end |
| 3.3 | Production deploy + live checks | 0:10 | | | | main | Waiting for your approval (default: after the app's v2 release) |

## Analysis: what took longer and why

- **Where time went (active 2:08):** discovery + setup 0:28 · development 0:55 · testing 0:39 · deployment 0:07. The 3:47 gap was the session being paused, not work.
- **Parallel agents paid off:** 22 agent runs; batches ran 3.1–5.3× faster than sequential (dev pages: 121 agent-minutes in 23 wall-minutes).
- **Why estimates were far too high:** component contracts and data shapes were fixed before the page agents started (no merge conflicts), and the test tooling (DOM diff + pixel compare) was built during setup, so QA was mechanical. The first baseline was already 0.02–1.75% from the designs.
- **Avoidable costs:** (1) an interrupt right after launching QA agents stopped the dev server and stalled all 3 agents (relaunch needed); (2) deleting two routes without regenerating Next's route types broke typecheck for other agents for ~5 min; (3) the image aspect-ratio root cause (WebP variants round to whole pixels) was found only in QA, and fixing it in BrowserFrame/Logo from the start would have saved each QA agent a pass.
- **Next time:** avoid interrupting while background agents run (or pause them first); pin image aspect ratios in shared image components from day one; when the baseline is this close, 2 QA agents would do instead of 4.

## Change requests (2026-09-29)

| # | Item | Start | End | Wall | Agent-min | Who | Notes |
|---|---|---|---|---|---|---|---|
| CR-0 | Design canvas: homepage Reviews section (placeholders → sample reviews → premium navy band, gold stars), versions 3–5 | not captured | 10:57 | – | – | main | Start time not recorded (no `date` call before the first edit). ~5 min lost to a DNS outage for the artifact host (3 refused saves, recovered after the resolver cache expired) |
| CR-1 | Website: Reviews section (dev) + preview-only sample gating | 10:58 | 11:12 | 0:14 | 11.4 | page-builder + main | Samples render only in `build:preview` (NEXT_PUBLIC_SAMPLE_REVIEWS=1); live build shows real reviews or nothing. Main: real-rating option in softwareApplicationLd (home + pricing) |
| CR-1t | Test CR-1: preview build vs updated design | 11:11 | 11:15 | 0:04 | – | main | Home 0.12% / 0.18%, Δh 0, 0 missing/extra copy. One failed build: stale Turbopack cache in .next (moved aside, not deleted) |
| CR-1b | Show sample reviews on the dev server too (you couldn't see them on localhost) | 11:52 | 11:53 | 0:01 | – | main | Gate is now `NODE_ENV === "development"` or `build:preview`; the live build is unchanged |
| CR-2a | Screenshot v2: sandbox feasibility (read-only analysis) | 10:58 | 11:16 | 0:18 | 22.4 | research agent | Feasible: 4 screens as-is from the emulator; storefronts need a local BigCommerce API mock (preload redirect). No .env, no writes to the app repo |
| ⏸ | Demo-content confirmation from user | 11:16 | 11:24 | 0:08 | – | – | Chosen: Harbor & Pine Supply; 5 serving storefronts on Enterprise |
| CR-2b | Capture v2 app screenshots at 2× (private sandbox, emulator, BC mock, demo seed) | 11:24 | 12:01 | 0:37 | 36.0 | capture agent | ~25 min was one-time sandbox setup (copy, env, emulator, BigCommerce mock, Harbor & Pine seed); capture itself ~10 min after a "deliver now" nudge at 11:56. 8 PNG masters at 2880 px wide; sandbox reusable for re-captures |
| CR-2c | Design canvas: v2 page (8 artboard copies, new images, note) + save | 12:02 | 12:05 | 0:03 | – | main | Originals untouched on page "v1 — current"; images 73–197 KB at 1800 px, 4:4:4 chroma; canvas 4.6 MB (Version 6). One rebuild misfired (zsh does not split \$ARGS) and was redone |
| CR-1c | Commit the reviews work on feat/website-redesign (local, not pushed; your request) | 12:17 | 12:19 | 0:02 | – | main | Typecheck + lint re-run first; commit timestamp in `git log` is the exact end |
| CR-3 | Website: switch to the v2 screenshots on branch feat/website-screenshots-v2 | 12:18 | 12:24 | 0:06 | – | main | 5 masters at 2× added beside the v1 files (v1 untouched, now unused); home, multi-storefront, release-notes and apps data point to them with the V2 design sizes and updated alt text; 2400 w variant added for retina heroes; WebP 82 → 90 + smartSubsample after an A/B crop test (small coloured UI text was soft at 82; hero 2400 w = 131 KB). Removed a hard-coded 860/580 ratio in MultiStorefrontHero (BrowserFrame already pins it) |
| CR-3t | Test CR-3: preview build vs the V2 artboards, overflow, audit, 1×/2×/3× variant check | 12:25 | 12:35 | 0:10 | – | main | Δh 0 on 7 of 8 artboards; mismatch home 0.17/0.17% · multi-storefront 0.21/0.51% · release notes 0.07/0.14% · apps 0.04% (phone +132 px = approved 40 px CTAs). Copy diff clean except the approved placeholder tokens. 0 overflow, audit 16/16. Retina loads the 2400 w hero and 1440 w features; 3× phones load 1080 w |
| ⏸ | Waiting for your go-ahead to commit | 12:36 | 15:17 | – | – | – | Idle, not counted |
| CR-3c | Commit v2 screenshots on feat/website-screenshots-v2; push it and feat/website-redesign (reviews commit) — your request | 15:17 | 15:18 | 0:01 | – | main | Commit timestamp in `git log` is the exact end |

## Change requests (2026-09-30), branch fix/website-feedback (from origin/main after PR #3)

| # | Item | Start | End | Wall | Agent-min | Who | Notes |
|---|---|---|---|---|---|---|---|
| CR-4a | logo-dark.png with the "Powered by CodiNative" line (for Firebase Storage) | 17:30 | 17:37 | 0:07 | – | main | Built from the app repo's navbar artwork (white line, 351×131, transparent) plus a literal variant with logo.png's navy badge; saved to `Custom Signup Forms/Brand assets/`. Local main was checked out and 6 behind origin/main, so the new branch starts from origin/main |
| CR-4b | Website fixes: remove every "Open the app", 2 FAQ answers, apps-page CTAs, taller sticky header, no menu chevrons, site-wide hovers | 17:37 | 17:48 | 0:11 | – | main | signup.codinative.com has no DNS record. Custom Shipping Rules listing verified live (app 65724); Sticky Add to Cart shows "Coming soon". FAQ answers checked against the app (Script Manager install, create-account page) and plans. New client component: StickyHeader |
| CR-4t | Test CR-4: preview build, overflow sweep, audit, scripted browser checks of every fix, header screenshots | 17:49 | 17:57 | 0:08 | – | main | Overflow 0 (16 routes × 15 widths), audit 16/16. Header 88/72 px, sticky/fixed, solid on scroll; anchors land below it; docs columns stick at 112 px, pricing switcher at 72 px. One polish: scrolled navy 0.92 → 0.96 |
| CR-4c | Commit on fix/website-feedback, merge into main, push main (your request) | 18:24 | – | – | – | main | Merge commit timestamp in `git log` is the exact end |

## Other deliverables (not the website)

| # | Item | Start | End | Notes |
|---|---|---|---|---|
| M-1 | Marketplace slides, black + gold (5), then the BigCommerce logo in the sidebar | 2026-09-29 16:45 | 17:20 | Temp folder had been cleared, so only the committed website screenshots were available |
| M-2 | Recapture: builder with the field-types panel, full Storefronts screen; update 2 slides | 17:29 | 17:36 | Private sandbox rebuilt from the capture agent's logged scripts; stopped afterwards |
| M-3 | Blue edition of the slides (website brand) | 17:37 | 17:58 | Black + gold set re-rendered pixel-identical |
| M-4 | App screens only, 3280 px (v3 folder) | 2026-09-30 14:58 | – | End not captured. Google Fonts was unreachable, so renders now use local copies of the site's fonts |

## Change requests (2026-10-01), branch feat/homepage-updates (from main 5d4b59b)

| # | Item | Start | End | Wall | Agent-min | Who | Notes |
|---|---|---|---|---|---|---|---|
| CR-5 | Homepage: partner badge, 2 real reviews + 5.0 rating, builder screenshot with the field panel, builder and multi-storefront copy, headless in How it works, pricing CTAs aligned | 12:06 | 12:18 | 0:12 | – | main | Badge SVG checked (no scripts or external refs) and used wherever the partner claim appeared (trust strip, footer on a white plate, contact, /apps hero). Review texts word for word from the owner's listing screenshot (the listing loads them by script); rating confirmed in the listing HTML. File uploads and headless embed noted with their plans (featureMatrix) |
| CR-5t | Test CR-5: production build, overflow, audit, structured data, scripted checks, section screenshots (desktop + phone) | 12:19 | 12:31 | 0:12 | – | main | Overflow 0, audit 16/16; aggregateRating 5 from 2 reviews and 6 FAQ answers in JSON-LD. Fixes found: Pro card 1px off (2px border) and the badge too small at 40px (now 48px) |
| CR-6 | Pricing: unlimited forms on paid plans (home teaser; /pricing already had it) and "Visual form builder"; FAQ one-open + smooth; "storefront" instead of "BigCommerce storefront" in multi-storefront copy; bigger footer logo; partner badge legible | 12:32 | 12:38 | 0:06 | – | main | Saved-form limits checked in the app (Free 1, paid unlimited). Badge kept unaltered (partner art) and sized where its small line reads: 64 px desktop, 56 contact, 44 phone, 60 on the footer plate |
| CR-7 | Logo sizes: footer logo leads (64 → 96 px, phone 48 → 56; badge 60 → 52 on its plate); header logo 52 → 60 (phone 40 → 44, menu sheet to match) | 12:52 | 13:01 | 0:09 | – | main | Your "1 Issue" dev badge did not reproduce: no console errors or warnings on 6 routes or during FAQ, menu, scroll and tab interactions in a clean browser |
| CR-8 | Footer: white one-colour partner badge instead of the blue badge on a white plate | not captured | 14:44 | – | – | main | Same artwork with its 28 blue fills set to white (the C cut-out mask untouched), 56 px on navy; PartnerBadge `plate` option replaced by `tone: blue | white` |
| CR-9 | Footer: partner badge moved to the bottom bar (copyright left, badge right, centred), replacing "Built for BigCommerce"; brand column = logo + blurb | 14:50 | 14:55 | – | – | main | Checked at 1440 and 1024 (tablet stack); overflow 0 |
| CR-10 | No drag-and-drop claims for the form builder (pricing table row, User guide, Plans and billing guide); sticky plan headings in the pricing comparison table | 15:05 | 15:11 | – | – | main | Head row sticks under the site header from 900 px up (table overflow hidden → clip); 768–899 keeps the in-box sideways scroll, so no sticky there. Overflow 0 |
| CR-11 | User guide rebuilt: every app feature (multi-storefront included), 19 app screenshots, Klaviyo-style steps ("In the app" paths, numbered steps, captions, additional resources) | 15:28 | 16:26 | 0:58 | 31 (mapping agent) | main + 1 mapping agent | Estimate was 60–90 min. Facts mapped from the app repo (17c7188): removed wrong claims (bulk actions, "Request info", a default customer group setting, cooldown between submissions). Screens from a private copy of the current app with the Harbor & Pine demo data; single-storefront screens for the general sections, multi-storefront screens for that section; headless script URL shown with the docs placeholders. Turbopack could not load the app fonts, so the copy ran on webpack dev. Build, typecheck, lint pass; 1440/1024/390: 19 images load, no overflow, one h1 |
| CR-12 | User guide screenshots sharper: full screens recaptured 1024 px wide (close to the app inside the BigCommerce control panel) instead of 1440, the template editor cropped to its fields; each screenshot opens full size on click | 16:46 | 16:56 | 0:10 | – | main | At 1440 the app text showed at about half size in the 736 px column; now about 72%, and the dialogs at full size. 19/19 images load at 1440/1024/390, no overflow |
| CR-13 | Installation guide corrected: the app installs the storefront script itself on Activate (no Script Manager steps), plan choice and 7-day trial, permissions by purpose, troubleshooting rewritten against the app (no "default customer group" setting), Saved forms screenshot | 16:45 | 17:00 | 0:15 | – | main | Build, typecheck, lint pass; audit 16 routes, 0 broken links; no overflow at 1440/1024/390 |
| CR-12r | Reverted the User guide screenshots to the 1440 px captures (owner: the 1024 px set looked stretched); click-to-enlarge kept | 17:03 | 17:09 | – | – | main | Same crops as before, recaptured from the demo copy. Fresh load: 19/19 images, image and box ratios match. A tab opened before an image swap shows new images in the old boxes until reloaded |
| CR-14 | Installation guide screenshots: the first-run plan chooser (step 3) and the builder's Add account fields panel (step 4), next to the existing Saved forms one | 17:12 | 17:21 | – | – | main | Plan chooser cropped above the in-app feature lists (they still say drag-and-drop). The storefront create-account screenshot (step 6) waits for a store URL. 3/3 images load at 1440/1024/390, no overflow |
| CR-15 | Screenshots in the other guides where they help: Multi-storefront (5: enable, storefront page, apply to several, Override, switcher), Headless (embed snippet page), Email and SMTP (4: SMTP edit, Send test, templates, notifications), Plans and billing (plan chooser). API reference left as code | 17:22 | 18:04 | – | – | main | 5 new captures from the demo copy (multi-storefront off and on); the rest reused from the User guide. All guides: images load at 1440/390 with correct ratios, no overflow; audit 16 routes, 0 broken links. In-app Subscription tab and Plans page don't render in the demo copy, so the plan chooser stands in |
| CR-16 | Docs screenshots open full size on the same page (popover viewer with a Close button; Escape or a click outside also closes) instead of a new tab | – | 09:58 | – | – | main | No script: HTML popover, so no new client component. Checked at 1440 and 390: opens, all three ways close it, page scroll position kept, close button clear of the image. Viewer centred vertically (owner request); tall screenshots keep 72px above and below |
| CR-17 | Homepage trust strip, less text: partner badge, divider, stars + 5.0 with a one-line caption; "Live in minutes, no code" and the store-count placeholder removed; a muted customer-logo row (lib/content/customers.ts) appears once the owner sends logos | – | 11:18 | – | – | main | 1440: one line, 113 px tall; 390: 85 px, no overflow. Logo row hidden while the list is empty |
| CR-18 | Customer logos in the trust strip: Samsung Interior Film UK and Teckwrap UAE (owner-supplied store CDN files), as one-colour slate copies because the originals are white and gold for dark headers | – | 11:31 | – | – | main | Sized per logo (44 / 30 px tall, 80% on phones). 1440: one line; 1024 and 390: logos on a second row; no overflow. Third store to be added once it launches |
| CR-19 | Customer logos moved to their own band under the hero (like ripeseed.io): dark, continuing the hero; logos large enough for SOIF's sub-line; muted grey until hover, then the stores' own white and gold with a glow and a small lift; full colour on touch screens. Trust strip back to badge + rating | – | 11:39 | – | – | main | Original logo files (trimmed) instead of the slate copies. 1440: band 268 px, one row; 390: logos stacked; no overflow |
| D-2 | Production deploy of main 86f2b60 (domain fix, guides with screenshots, customer logos, viewer) to Firebase Hosting | – | 16:03 | – | – | main | Live checks on customsignupforms.codinative.com: canonical and og:image on the live domain, /, /pricing/, user guide, sitemap, robots, OG image all 200 |
| CR-20 | Phone footer: the same 4 link columns as desktop (16 links, 2 per row) and the white partner badge above the copyright | – | 17:20 | – | – | main | Replaces the 9-link phone list. Then restyled (looked broken in 2 narrow columns): groups stacked full width, links flow in rows and never break mid-label. 320 and 390 checked, no overflow; desktop unchanged |
| CR-21 | Phone footer: link groups as accordions (native details/summary, no script, chevron turns when open); partner badge and copyright centred | – | 17:27 | – | – | main | 390 checked open and closed, no overflow; desktop unchanged |
| CR-22 | Phone footer accordion eases open and closed like the FAQ, one group open at a time (FooterAccordion client component, FooterLink shared; client list updated in CLAUDE.md and components rule) | – | 12:00 | – | – | main | Checked at 390: panel mid-animation, opening one closes the other, no errors, no overflow |
