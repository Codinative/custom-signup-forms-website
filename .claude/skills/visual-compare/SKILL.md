---
name: visual-compare
description: How to run and read the visual test tooling (side-by-side design vs build screenshots, pixel diff, DOM text/style diff, overflow sweep, site audit) for the Custom Signup Forms site. Use in the Testing phase only.
---

# Visual comparison tooling

All scripts use Playwright Chromium at deviceScaleFactor 1 and render the design `.dc.html` files straight from the handoff bundle. Those renders match `reference/*.png` exactly.

## Serve the build
- Final checks: `npm run build && npm run serve`, which serves `out/` on `http://localhost:4173` (default `BASE_URL`).
- Fix loops with several agents: the orchestrator runs `npm run dev` and agents pass `BASE_URL=http://localhost:3100`.

## Commands
| Command | Output (under `test-results/`) |
|---|---|
| `node scripts/visual/dom-diff.mjs <page> [--widths=1440,390]` | `visual/<page>/<w>/dom-diff.md`: missing or extra copy, style mismatches (font, size, weight, line-height, letter-spacing, colour, transform), geometry, vertical drift points, image size/crop differences |
| `node scripts/visual/compare.mjs <page> [--widths=1440,390]` | `visual/<page>/<w>/`: `design.png`, `build.png`, `diff.png`, `slice-NN[a|b].png` (900px tall; desktop split into left/right halves; left = design, right = build, magenta = no content), `report.json` (heights, mismatch %, worst slices) |
| `node scripts/visual/overflow.mjs [--routes=/pricing/] [--widths=…] [--shots=768,1024]` | `OVERFLOW.md` (horizontal overflow and offending elements at 320–1920), `layout/<route>/<w>.png` |
| `node scripts/audit/site-audit.mjs` | `SITE-AUDIT.md` (metadata, headings, landmarks, alt text, JSON-LD, broken internal links) |

Pages: `home`, `menu` (phone menu open, 390 only), `pricing`, `multi-storefront`, `docs`, `docs-api`, `release-notes`, `apps`.

## How to read the results
1. Start with the DOM diff. Missing or extra copy is always a real bug (copy is verbatim). Then fix the style rows. Then fix drift: the first drift point says where extra or missing height was introduced above that element.
2. Check `heightDelta` in `report.json`. A non-zero value means the vertical spacing is off somewhere; the drift points locate it.
3. Open only the worst slices, and look for what the DOM diff can't see: colours, gradients, borders, radii, shadows, icons, image crops, the grid overlay.
4. Fix by re-reading the `.dc.html` value. Never tune a number until the screenshot "looks right".
5. Re-run until the DOM diff is clean and each slice is at or below 1% mismatch. Text antialiasing noise stays around 0.2–0.8%.

## Gotchas
- The design's `a:hover` applies to buttons in the prototype. We intentionally don't copy that (see ARCHITECTURE decisions).
- Inputs, selects and buttons in the build replace the design's static `<div>`/`<a>`. Make their computed font, size and colour match the design text.
- Screen-reader-only text (for example the skip link) is 1px, so the collectors ignore it.
