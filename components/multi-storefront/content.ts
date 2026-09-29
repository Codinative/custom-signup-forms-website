import type { CodeToken } from "@/components/ui/CodeBlock";
import type { IconName } from "@/components/ui/Icon";
import type { PlanId } from "@/lib/content/plans";

/**
 * /multi-storefront page copy, verbatim from design/MultiStorefront.dc.html and
 * MobileMultiStorefront.dc.html. Plan names and prices come from PLANS (lib/content/plans.ts).
 */

export type Screenshot = { src: string; width: number; height: number; alt: string };

/** URL in the browser-frame bar (desktop only). */
export const FRAME_URL = "store.mybigcommerce.com/manage/app/custom-signup-forms";

// Source: design v2 shot-storefronts-v2.jpg (1400×748) = public/images/storefronts-list-v2.png at 2×.
export const HERO_SHOT: Screenshot = {
  src: "/images/storefronts-list-v2.png",
  width: 1400,
  height: 748,
  alt: "Your storefronts screen listing each BigCommerce storefront, including a headless Catalyst storefront, with its serving status and assigned form",
};

// Source: design v2 shot-approve-v2.jpg ("One queue", desktop only) = public/images/approve-v2.png at 2×.
export const QUEUE_SHOT: Screenshot = {
  src: "/images/approve-v2.png",
  width: 1800,
  height: 1285,
  alt: "Pending signup request from the UK storefront open for review, with the applicant's fields, a trade licence upload and Approve, Reject and Request Resubmission buttons",
};

export type StorefrontSetting = { icon: IconName; title: string; body: string };

// "Per storefront": desktop 3×2 cards, phone list rows (same copy).
export const STOREFRONT_SETTINGS: StorefrontSetting[] = [
  {
    icon: "file",
    title: "Signup form",
    body: "Assign any saved form to a storefront, or one form to many at once.",
  },
  {
    icon: "mail",
    title: "Emails and branding",
    body: "Templates, sender and logo per storefront, or keep the defaults.",
  },
  {
    icon: "users",
    title: "Customer-group rules",
    body: "Send wholesale applicants and retail shoppers to different groups.",
  },
  {
    icon: "bell",
    title: "Team notifications",
    body: "Route new-signup alerts to the team that owns that storefront.",
  },
  {
    icon: "clock",
    title: "Cooldown",
    body: "A longer cooling-off period on one storefront than on another.",
  },
  {
    icon: "store",
    title: "BigCommerce customer settings",
    body: "See and set the storefront's default and guest customer groups.",
  },
];

// Headless embed snippet (identical on both artboards). The four bracketed values are open
// placeholders (DESIGN-SPEC), each its own token so it renders as a dashed amber box.
export const EMBED_SNIPPET: CodeToken[][] = [
  [{ t: "<!-- 1. Replace your signup form with this container -->", k: "comment" }],
  [
    { t: "<div", k: "tag" },
    { t: " " },
    { t: "id", k: "attr" },
    { t: "=" },
    { t: '"custom-signup-container"', k: "str" },
    { t: "></div>", k: "tag" },
  ],
  [],
  [{ t: "<!-- 2. Load the script on that page -->", k: "comment" }],
  [
    { t: "<script", k: "tag" },
    { t: " " },
    { t: "src", k: "attr" },
    { t: "=" },
    { t: '"https://', k: "str" },
    { t: "[app-domain]", k: "placeholder" },
    { t: "/custom-signup.min.js?pub=", k: "str" },
    { t: "[store-id]", k: "placeholder" },
    { t: "&ch=", k: "str" },
    { t: "[channel]", k: "placeholder" },
    { t: "&sig=", k: "str" },
    { t: "[signature]", k: "placeholder" },
    { t: '"', k: "str" },
    { t: "></script>", k: "tag" },
  ],
];

export type HowStep = { title: string; body: string };

// "How it works" (same copy on both artboards).
export const HOW_STEPS: HowStep[] = [
  { title: "Turn it on", body: "Your default storefront keeps serving exactly as it does today." },
  {
    title: "Set up a storefront",
    body: "Pick a channel, assign a form, override only the settings that should differ.",
  },
  {
    title: "Switch it on",
    body: "The form goes live on that storefront. Switch any storefront off again at any time.",
  },
];

export type PlanCallout = {
  planId: PlanId;
  /** Tag text after "Name · "; omitted = the plan's price label and period ("$199 / month"). */
  priceText?: string;
  title: string;
  /** Desktop only. */
  body: string;
  ctaLabel: string;
};

// Plan callouts; the CTA href and variant come from the plan.
export const PLAN_CALLOUTS: PlanCallout[] = [
  {
    planId: "pro",
    title: "Up to 3 storefronts",
    body: "Everything in Standard on each storefront, plus headless embed. 7-day free trial.",
    ctaLabel: "Start free trial",
  },
  {
    planId: "enterprise",
    priceText: "quote",
    title: "4 or more storefronts",
    body: "A storefront count agreed with you, an onboarding call, priority support with an SLA and invoicing on terms.",
    ctaLabel: "Contact us",
  },
];
