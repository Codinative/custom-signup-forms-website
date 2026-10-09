---
paths:
  - "components/**"
  - "app/**"
---

# Components & styling

- Max 300 lines per file (`.tsx` and `.module.css`). Split into sub-components before hitting the limit.
- Server Components by default. `'use client'` only for real interactivity: MobileMenu, FaqAccordion, PlanSwitcher, VersionJump, DocsSearch, DocsToc, HashRedirect, StickyHeader, FooterAccordion. Keep client components small; pass data in as props.
- Named exports for components with an exported `XProps` type; `export default` only in route files (`page.tsx`, `layout.tsx`, metadata routes).
- Styles in a co-located `Name.module.css` (camelCase class names) using tokens from `app/globals.css` (`var(--…)`). Desktop-first: artboard values are the base, then overrides in `@media (max-width: 1279px)` (tablet) and `@media (max-width: 767px)` (phone).
- Images: `next/image` only, real `alt`, `sizes` matching the rendered width at each breakpoint; `priority` only on the above-the-fold hero image.
- Internal links: `next/link` with trailing slash (`/pricing/`). External: `<a href target="_blank" rel="noopener">`.
- Content that belongs to a data module (`lib/content/*`) is never hard-coded in a component.
- Accessibility: landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, no skipped heading levels, visible `:focus-visible`, `<button>` for actions and `<a>` for navigation, `aria-expanded`/`aria-controls` on toggles; the phone menu traps focus, closes on Escape and restores focus.
- Match repo style: double quotes, semicolons, 2-space indent, `@/` import alias.
