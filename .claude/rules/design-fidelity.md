# Design fidelity (all UI work)

- Source of truth: the page's `design/*.dc.html`. Read the markup for every value; reference PNGs only confirm.
- Copy is verbatim: punctuation, hyphen vs en dash, capitalisation, `<br>` breaks, `&nbsp;`, symbols (→, ·, ×).
- Copy every value exactly (px stays px): font-size, weight, line-height, letter-spacing, colour, padding, margin, gap, width/max-width, radius, border, shadow, gradient stops, grid overlay, opacity, image crop/object-position.
- Shared design classes map to: `.disp .mono .eyebrow .lede .body` → utilities in `app/globals.css`; `.btn*` → `Button`; `.tag` → `Tag`; `.ph` → `PlaceholderBox`; `.frame/.frame-bar/.dot` → `BrowserFrame`; `.check` → `<Icon name="check">`.
- Icons: exact SVG paths from the design via the `components/ui/Icon.tsx` registry. Decorative icons get `aria-hidden`.
- Desktop artboard (1440) = layout at ≥1280 px, content max-width 1440 centred. Phone artboard (390) = layout at <768 px, exact at 390 and fluid 320–767.
- Where phone copy or structure differs, render the phone version at <768 (`.onlyDesktop` / `.onlyPhone` utilities). Keep exactly one `h1` in the DOM.
- 768–1279: desktop structure; 4-col → 2-col, 3-col → 2 or 3 by fit, feature rows side by side down to 1024 then stack text over screenshot; side padding 32–48px.
- No horizontal scroll from 320 to 1920. Wide tables and code blocks scroll inside their own container.
- `href="#"` in designs → real targets from the link map in `docs/ARCHITECTURE.md`.
- Hover states on every link and control (owner-approved 2026-09-30): Button variants darken or tint and lift 1px; text links turn `#1d4ed8` with an underline; header links grow an underline; link cards lift and tint their border; dark-band links turn white. Transitions 0.15s, off under `prefers-reduced-motion`. Always add a visible `:focus-visible` ring (required for accessibility, not a design change).
- No new sections, copy, icons, animations or effects. If the design is genuinely ambiguous, stop and ask the orchestrator; never guess silently.
