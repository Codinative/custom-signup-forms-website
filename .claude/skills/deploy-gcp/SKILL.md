---
name: deploy-gcp
description: Runbook for deploying the Custom Signup Forms static export (out/) to GCP with Firebase Hosting, covering config, caching headers, redirects, preview channels, production release and custom domain. Use in the Deployment phase only, after Testing has passed.
---

# Deploy to Firebase Hosting (GCP)

## Preconditions
- Testing phase is complete: lint, typecheck and build are green, and the visual, overflow and audit reports are clean.
- The user has given explicit permission to deploy. The user runs `npx firebase-tools login` themselves; never enter credentials.
- The Firebase / GCP project id is known (`.firebaserc`).

## Config (repo root)
- `firebase.json` → `hosting.public: "out"`, `cleanUrls: true`, `trailingSlash: true` (matches Next `trailingSlash`), `ignore: ["firebase.json", "**/.*"]`.
- Caching:
  - `/_next/static/**` → `public, max-age=31536000, immutable`
  - images, fonts and `/og/**` → `public, max-age=604800`
  - HTML → `public, max-age=0, must-revalidate`
- Security headers on `**`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`.
- Redirects (301): `/docs/privacy-policy` → `/privacy-policy/`, `/docs/terms-of-service` → `/terms-of-service/`. Hash URLs like `/#pricing` never reach the server; the client `HashRedirect` handles them.
- `404.html` from the export is served automatically.

## Steps
1. `npm run build`, then check that `out/index.html`, `out/sitemap.xml`, `out/robots.txt` and `out/404.html` exist.
2. Preview: `npx firebase-tools hosting:channel:deploy preview --expires 7d`. Share the URL, then run the audit against it (`BASE_URL=<preview> node scripts/audit/site-audit.mjs`).
3. After the user approves: `npx firebase-tools deploy --only hosting`.
4. Custom domain (user action in the Firebase console): add `custom-signup-forms.codinative.com`, create the DNS records shown there, and wait for SSL.
5. Post-deploy: fetch `/`, `/pricing/`, `/sitemap.xml` and `/robots.txt` on the live domain. Submit the sitemap in Google Search Console (the site already has a verification meta tag).

## Rollback
Firebase console → Hosting → release history → roll back. Or `npx firebase-tools hosting:clone <site>:<prev-version> <site>:live`.
