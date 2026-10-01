/**
 * FAQ items. Questions are verbatim from the design. `a: null` = the answer is still needed; the
 * page shows a placeholder and leaves the item out of FAQPage JSON-LD (use answeredFaqs).
 * Section headings stay in the page components: home (eyebrow "FAQ", h2, and the body with the
 * email link) and pricing ("Billing questions" / "Plans, trials and changes.").
 */

export type Faq = {
  q: string;
  a: string | null;
};

export type AnsweredFaq = {
  q: string;
  a: string;
};

const SMALLER_PLAN_ANSWER =
  "Upgrades apply and are charged immediately; downgrades take effect at the end of your billing period. Your default storefront always keeps serving. Extra storefronts beyond the new limit are switched off, and on Free one saved form stays usable while the rest are locked - never deleted - until you upgrade again.";

// Source: design/Pricing.dc.html ("Billing questions"); same questions in MobilePricing.dc.html.
export const pricingFaqs: Faq[] = [
  {
    q: "What happens when I reach 100 signups in a month on Free?",
    a: "The form stops accepting new signups until the 1st of the next month, when the count resets. Upgrading to Standard removes the cap immediately.",
  },
  {
    q: "How is Pro different from Standard?",
    a: "Standard is the full workflow on one storefront. Pro adds up to three storefronts, each with its own form, emails, notifications, cooldown and customer-group rules, plus an embed snippet for headless storefronts.",
  },
  {
    q: "What happens if I move to a smaller plan?",
    a: SMALLER_PLAN_ANSWER,
  },
  {
    q: "What happens if a payment fails?",
    a: "The app becomes read-only while you update your card, and your signup form keeps showing on your storefront for 7 days. You can also move to the Free plan straight away from the notice in the app.",
  },
  {
    q: "Is there a setup fee?",
    a: "No. There is no setup fee on any plan and no per-signup charge.",
  },
];

// Source: design/Main.dc.html (questions; Q1 answer). Q4 and Q5 answers: the current site's
// approved copy (user-approved). Q6 reuses the pricing answer. Q2 and Q3: written from the owner's
// notes (2026-09-30), checked against the app (Script Manager install, create-account page) and plans.
export const homeFaqs: Faq[] = [
  {
    q: "Is there really a free plan?",
    a: "Yes. The Free plan has no time limit and needs no card: build one form, collect up to 100 signups a month and approve them by hand. Paid plans add customer emails, customer groups, conditional logic, file uploads and more storefronts.",
  },
  {
    q: "How does it replace the default BigCommerce signup form?",
    a: "The app adds a small script to your storefront through BigCommerce's Script Manager, so there are no theme edits. On the create-account page, that script swaps BigCommerce's default form for the one you built. By default every submission then waits in the app as a request, and only the applicants you approve become BigCommerce customers - so only people you authorize can sign in and buy.",
  },
  {
    q: "Can I run a different form on each storefront?",
    a: "Yes. With multi-storefront, each storefront can serve its own form, with its own emails and approval rules, and anything you don't override follows your defaults. Multi-storefront is part of the Pro plan (up to 3 storefronts) and Enterprise (4 or more).",
  },
  {
    q: "Do customers get an account immediately?",
    a: "Only if you want them to. By default every submission becomes a request you review. When you approve it, the app creates the customer in BigCommerce and assigns your chosen customer group. You can also reject or ask for more information.",
  },
  {
    q: "Will it conflict with an ERP or connector that manages customer groups?",
    a: "No. The app assigns a customer group only once - at the moment it creates the approved customer - and only if you pick a group on approval (it's optional). It never runs an ongoing sync or re-assigns groups afterwards, so it won't fight a connector that pushes group membership. If you want your ERP to be the single source of truth for groups, just leave the group unset on approval and let the connector handle it.",
  },
  {
    q: "What happens if I move to a smaller plan?",
    a: SMALLER_PLAN_ANSWER,
  },
];

/** Items with an answer, for FAQPage JSON-LD (faqLd in lib/seo.ts). */
export function answeredFaqs(items: Faq[]): AnsweredFaq[] {
  return items.filter((item): item is AnsweredFaq => item.a !== null);
}
