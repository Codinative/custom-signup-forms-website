# Custom Signup Forms - marketing website

The marketing + documentation site for **Custom Signup Forms**, a BigCommerce app by
[Codinative](https://codinative.com) that replaces the default account-signup form with a
branded, custom form - with request approval, customer-group assignment, and automated emails.

Built with **Next.js 15** (App Router) + **React 19** + TypeScript. No database, no API -
a static, fast marketing SPA intended for `custom-signup-forms.codinative.com`.

## Live site & links

🌐 **Live site:** https://custom-signup-forms.codinative.com/

| Page | Link |
|------|------|
| Home (marketing) | https://custom-signup-forms.codinative.com/ |
| Documentation home | https://custom-signup-forms.codinative.com/docs |
| Installation guide | https://custom-signup-forms.codinative.com/docs/installation |
| User guide | https://custom-signup-forms.codinative.com/docs/user-guide |
| The app (embedded) | https://signup.codinative.com/ |
| Codinative | https://codinative.com/ |

## Structure

```
app/
  page.tsx                 Landing (hero, features, how-it-works, requests, use cases, pricing, docs, FAQ, CTA)
  docs/page.tsx            Docs home
  docs/installation/       Installation guide
  docs/user-guide/         User guide
  privacy-policy/          Privacy policy (also re-exported under /docs)
  terms-of-service/        Terms of service (also re-exported under /docs)
  contact/                 Contact page
  layout.tsx               Metadata + Inter font
  globals.css              Brand design system (blue accent, light/dark)
components/                Nav, Footer, Icon, BrandMark, BigCommerceMark, PartnerBadge, SignupPreview
lib/site.ts                Single source of truth for copy + links
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> writes the finished site to ./out
npm start        # preview the exported site from ./out
npm run lint
```

## Deploy

The site is a fully static export (`output: 'export'` in [`next.config.ts`](next.config.ts)).
`npm run build` writes the finished site to **`out/`** - plain HTML, CSS, JS and assets with
no Node server, so any static host can serve it. `out/` is git-ignored; build it in CI or
locally before deploying.

Production hosting is **Firebase Hosting**: point the Hosting `public` directory at `out`
and deploy with `firebase deploy --only hosting`, then point `custom-signup-forms.codinative.com`
at the Hosting site. Pages are exported as `route/index.html` (`trailingSlash: true`), so
canonical URLs end with a slash, e.g. `/docs/`. No environment variables are required.

## Editing copy & links

Update product links (marketplace listing, app URL, support email) in
[`lib/site.ts`](lib/site.ts). The marketplace URL and the embedded app URL
(`signup.codinative.com`) are placeholders until the app is published and its
production domain is final.

---

This is the **marketing site only**. The embedded BigCommerce app itself lives in the
separate `Codinative/custom-signup-forms` repository.
