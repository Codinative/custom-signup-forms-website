import type { OfferInput } from "@/lib/seo";
import { LINKS } from "@/lib/site";

/**
 * One plans module for every pricing surface. Copy is verbatim from the design; which field
 * feeds which surface:
 * - /pricing cards (desktop + phone): name, badge, tagline, priceLabel, period, cta.label, note,
 *   lead, bullets. The phone cards omit `note` and render a space between price and period.
 * - Home teaser, desktop: badge, name, teaserPriceLabel, period, teaserBlurb, cta.teaserLabel.
 * - Home teaser, phone: name, teaserPriceLabel, phoneTeaserPeriod, phoneTeaserBlurb,
 *   cta.teaserLabel. No badge; a space between price and period.
 * - Compare table header + phone plan switcher: name, cta.compareLabel, cta.variant.
 * - "Which plan fits?" row: name + fitLine, headed by PLAN_FIT.
 * - JSON-LD offers: price + offerDescription (PLAN_OFFERS).
 * `featured` = the Pro styling (2px #2563eb border, primary CTA, blue name in the compare header).
 * An empty period string is the design's empty period span. `cta.variant` is the same on every
 * surface.
 */

export type PlanId = "free" | "standard" | "pro" | "enterprise";

export type PlanCta = {
  /** /pricing cards. */
  label: string;
  /** Home teaser, desktop and phone. */
  teaserLabel: string;
  /** Compare-table header button (desktop). */
  compareLabel: string;
  href: string;
  variant: "primary" | "outline";
};

export type Plan = {
  id: PlanId;
  name: string;
  /** USD per month; null = quote (Enterprise). */
  price: number | null;
  priceLabel: string;
  teaserPriceLabel: string;
  period: string;
  phoneTeaserPeriod: string;
  tagline: string;
  teaserBlurb: string;
  phoneTeaserBlurb: string;
  badge?: string;
  featured: boolean;
  cta: PlanCta;
  /** Small line under the /pricing card CTA (desktop only). */
  note: string;
  /** "Everything in …, plus:" above the bullets; null = no lead (Free). */
  lead: string | null;
  bullets: string[];
  fitLine: string;
  /** Short factual offer text for JSON-LD, built only from design phrases. */
  offerDescription: string;
};

// Source: design/Pricing.dc.html, MobilePricing.dc.html (cards, "Which plan fits?", compare header),
// Main.dc.html + MobileHome.dc.html (home pricing teaser).
export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceLabel: "$0",
    teaserPriceLabel: "$0",
    period: "forever",
    phoneTeaserPeriod: "",
    tagline: "Build a form, collect signups, approve by hand.",
    teaserBlurb: "One form, 100 signups a month, approve by hand.",
    phoneTeaserBlurb: "One form, 100 signups a month, approve by hand.",
    featured: false,
    cta: {
      label: "Install free",
      teaserLabel: "Install free",
      compareLabel: "Install",
      href: LINKS.marketplace,
      variant: "outline",
    },
    note: "No card required",
    lead: null,
    bullets: [
      "Drag-and-drop form builder",
      "Approval queue",
      "100 signups a month",
      "1 saved form",
      "Email support, 7-day response",
    ],
    fitLine: "One storefront, approving by hand, under 100 signups a month.",
    offerDescription: "1 storefront, 100 signups a month, 1 saved form",
  },
  {
    id: "standard",
    name: "Standard",
    price: 99,
    priceLabel: "$99",
    teaserPriceLabel: "$99",
    period: "/ month",
    phoneTeaserPeriod: "/ mo",
    tagline: "The full workflow on a single storefront.",
    teaserBlurb: "Unlimited signups, customer emails, customer groups and conditional logic.",
    phoneTeaserBlurb: "Unlimited signups, emails, customer groups, conditional logic.",
    featured: false,
    cta: {
      label: "Start 7-day free trial",
      teaserLabel: "Start 7-day trial",
      compareLabel: "Try free",
      href: LINKS.marketplace,
      variant: "outline",
    },
    note: "Then billed monthly. Cancel any time.",
    lead: "Everything in Free, plus:",
    bullets: [
      "Unlimited signups and saved forms",
      "Customer emails through your own SMTP",
      "Customer groups",
      "Conditional logic and file uploads",
      "Email support",
    ],
    fitLine: "You want to email applicants, use customer groups or conditional logic.",
    offerDescription: "1 storefront, unlimited signups and saved forms",
  },
  {
    id: "pro",
    name: "Pro",
    price: 199,
    priceLabel: "$199",
    teaserPriceLabel: "$199",
    period: "/ month",
    phoneTeaserPeriod: "/ mo",
    tagline: "Everything in Standard, per storefront, with separate settings.",
    teaserBlurb: "Everything in Standard on up to 3 storefronts, plus headless embed.",
    phoneTeaserBlurb: "Up to 3 storefronts, plus headless embed.",
    badge: "Multi-storefront",
    featured: true,
    cta: {
      label: "Start 7-day free trial",
      teaserLabel: "Start 7-day trial",
      compareLabel: "Try free",
      href: LINKS.marketplace,
      variant: "primary",
    },
    note: "Then billed monthly. Cancel any time.",
    lead: "Everything in Standard, plus:",
    bullets: [
      "Up to 3 storefronts",
      "A different form per storefront",
      "Per-storefront emails and settings",
      "Headless embed",
      "Email support",
    ],
    fitLine: "You run 2 or 3 storefronts, or a headless storefront.",
    offerDescription: "Up to 3 storefronts, headless embed",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    priceLabel: "Let's talk",
    teaserPriceLabel: "Custom",
    period: "",
    phoneTeaserPeriod: "",
    tagline: "Everything in Pro without the storefront limit, plus onboarding and an SLA.",
    teaserBlurb: "4 or more storefronts, onboarding call and an SLA.",
    phoneTeaserBlurb: "4 or more storefronts, onboarding and an SLA.",
    featured: false,
    cta: {
      label: "Contact us",
      teaserLabel: "Contact us",
      compareLabel: "Contact",
      href: "/contact/",
      variant: "outline",
    },
    note: "Quote and terms agreed with you",
    lead: "Everything in Pro, plus:",
    bullets: [
      "4 or more storefronts, agreed with you",
      "Onboarding call",
      "Priority support with an SLA",
      "Invoicing and terms",
    ],
    fitLine: "Four or more storefronts, an onboarding call or an SLA.",
    offerDescription: "4 or more storefronts, agreed with you",
  },
];

// Source: design/Pricing.dc.html ("Which plan fits?" row, desktop only).
export const PLAN_FIT = {
  title: "Which plan fits?",
  sub: "Pick the line that sounds like you.",
} as const;

// Source: derived from PLANS. Enterprise has no published price, so it is not an Offer
// (OfferInput.price in lib/seo.ts is a number).
export const PLAN_OFFERS: OfferInput[] = PLANS.flatMap((plan) =>
  plan.price === null ? [] : [{ name: plan.name, price: plan.price, description: plan.offerDescription }],
);
