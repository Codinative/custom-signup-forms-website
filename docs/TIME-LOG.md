# Time log: Custom Signup Forms website rebuild

Times are PKT (UTC+5), taken from `date`. **Wall-clock** is elapsed time. **Agent-min** is the sum of the parallel agents' own run times, so agent-min ÷ wall-min is the parallel speed-up. Rows marked ⏸ are time spent waiting for the user; they are not counted as active time.

## Summary

| Phase | Estimate | Start | End | Wall-clock | Variance | Notes |
|---|---|---|---|---|---|---|
| 0 Discovery & setup | – (no prior estimate) | 16:52 | 17:20 | 0:28 | – | 6 parallel read-only agents did the design/fact inventory in 14 min wall-clock |
| ⏸ Plan review by user | – | 17:20 | 17:26 | 0:06 | – | Approved: defaults + Firebase Hosting; setup committed before Phase 1 |
| 1 Development | 2:30–3:15 | 17:26 | 18:21 | 0:55 | −1:35 to −2:20 | 11 parallel agents in two batches (4 + 7); contracts written up front meant no merge conflicts |
| 2 Testing | 2:30–3:30 | | | | | |
| 3 Deployment | 0:30–0:45 | | | | | Excludes your DNS/console steps |
| **Total active** | **6:15–8:30** | | | | | |

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
| ⏸ | Commit Phase 1 + baseline (user request) | – | 18:25 | | | – | main | Unused requests.png / uncropped storefronts.png dropped from public/ before commit |
| 2.2 | Visual fidelity 1440/390 + fixes (targeted visual-qa agents) | 1:30 | | | | | QA agents | |
| 2.3 | Responsive: overflow 320–1920, 768/1024 review | 0:25 | | | | | main | |
| 2.4 | SEO / a11y / links / facts audit + fixes | 0:25 | | | | | site-auditor | |
| 2.5 | Browser QA: keyboard, menu, accordions, switcher, jump, search | 0:20 | | | | | main | |
| 2.6 | Final gates + side-by-side pass on every page | 0:25 | | | | | main | |

## Phase 3: Deployment
| # | Sub-phase | Estimate | Start | End | Wall | Who | Notes |
|---|---|---|---|---|---|---|---|
| 3.1 | firebase.json, .firebaserc, headers, redirects | 0:10 | | | | main | |
| 3.2 | Preview channel deploy + audit on preview URL | 0:15 | | | | main | Needs your `firebase login` |
| 3.3 | Production deploy + live checks | 0:10 | | | | main | Needs your approval |
