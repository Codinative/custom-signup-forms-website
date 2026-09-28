import type { IconName } from "@/components/ui/Icon";
import { SIGNUP_SCREENSHOT } from "@/lib/content/apps";

/**
 * Homepage lists (feature rows, steps, audiences). Copy is verbatim from design/Main.dc.html;
 * `phone` holds the MobileHome.dc.html copy where it differs (omitted = same on both).
 */

export type ResponsiveCopy = {
  desktop: string;
  phone?: string;
};

export type Screenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Feature = {
  id: string;
  eyebrow: string;
  /** "New" tag next to the eyebrow (desktop and phone copy differ). */
  tag?: { desktop: string; phone: string };
  title: ResponsiveCopy;
  body: ResponsiveCopy;
  /** Desktop only. */
  checks: string[];
  /** Desktop only. */
  link?: { label: string; href: string };
  image: Screenshot;
  /** Screenshot on the left while the row is side by side (≥1024). */
  reverse: boolean;
};

export type Step = {
  label: string;
  title: string;
  body: string;
};

export type Audience = {
  icon: IconName;
  title: string;
  body: string;
};

/** URL in the browser-frame bar of every desktop screenshot. */
export const APP_URL_BAR = "store.mybigcommerce.com/manage/app/custom-signup-forms";

export const HERO_SCREENSHOT: Screenshot = {
  src: "/images/dashboard.png",
  width: 1440,
  height: 900,
  alt: "Custom Signup Forms dashboard with total signups, pending review, approved and rejected counts, and quick actions for the form builder, requests, email templates and form preview",
};

// Source: design/Main.dc.html ("What you get" rows); phone copy: MobileHome.dc.html.
export const FEATURES: Feature[] = [
  {
    id: "form-builder",
    eyebrow: "Form builder",
    title: {
      desktop: "Design the form you need, not the one BigCommerce ships.",
      phone: "Design the form you need.",
    },
    body: {
      desktop:
        "Drag fields into place, pair them into two columns, add headings and help text, and style it to match your store. Preview on desktop and mobile before it goes live.",
      phone: "Drag fields into place, add conditional logic and file uploads, and preview on desktop and mobile.",
    },
    checks: [
      "Text, email, phone, number, dropdown, single and multiple choice, date, website, country and state",
      "File uploads for trade licences and tax documents",
      "Conditional logic: show fields based on an answer",
      'An "Other" option with its own text box',
    ],
    image: {
      src: "/images/builder.png",
      width: 1440,
      height: 900,
      alt: "Form builder with the field types to add on the left and a live desktop preview of the Create your account form",
    },
    reverse: false,
  },
  {
    id: "approvals",
    eyebrow: "Approvals",
    title: { desktop: "Nobody gets an account until you say so." },
    body: {
      desktop:
        "Every signup lands in a review queue with the full submission and any uploads. Approve to create the BigCommerce customer, reject, or ask for a resubmission.",
      phone: "Approve to create the BigCommerce customer in the right group, reject, or ask for a resubmission.",
    },
    checks: [
      "Choose the customer group on approval, or set it automatically from an answer",
      "Cooldowns and duplicate protection stop repeat applications",
      "A badge in the app shows what is waiting",
      "Your team gets an email for every new request",
    ],
    image: SIGNUP_SCREENSHOT,
    reverse: true,
  },
  {
    id: "emails",
    eyebrow: "Emails",
    title: {
      desktop: "Branded emails for every step, sent from your own address.",
      phone: "Branded emails, from your own address.",
    },
    body: {
      desktop:
        "Confirmation, approval, rejection and resubmission emails with your logo and colours, in a visual editor or your own HTML. Send yourself a test first.",
      phone: "A different approval email per customer group or per answer, and an on/off switch for each.",
    },
    checks: [
      "A different approval email per customer group",
      "A different email per form answer",
      "Switch any email on or off",
      "Sent through your own SMTP",
    ],
    image: {
      src: "/images/emails.png",
      width: 1440,
      height: 900,
      alt: "Email templates screen listing the signup confirmation, resubmission, approval, rejection and resubmission request emails, with a preview of the confirmation email",
    },
    reverse: false,
  },
  {
    id: "multi-storefront",
    eyebrow: "Multi-storefront",
    tag: { desktop: "New in 2.0", phone: "New" },
    title: {
      desktop: "One app for every storefront you run.",
      phone: "One app for every storefront.",
    },
    body: {
      desktop:
        "Serve a different signup form on each BigCommerce storefront, with its own emails and approval rules, and see which storefront every request came from.",
      phone: "A different form, emails and rules per storefront, plus an embed snippet for headless sites.",
    },
    checks: [
      "A different form, email set, cooldown and group rules per storefront",
      "Everything you do not override follows your defaults",
      "Embed snippet for headless storefronts such as Catalyst or Next.js",
      "Filter the request queue by storefront",
    ],
    link: { label: "Explore multi-storefront", href: "/multi-storefront/" },
    image: {
      src: "/images/storefronts-crop.png",
      width: 860,
      height: 580,
      alt: "Storefronts list showing the signup form each BigCommerce storefront serves, including a headless Catalyst storefront",
    },
    reverse: true,
  },
];

// Source: design/Main.dc.html ("How it works", desktop only).
export const STEPS: Step[] = [
  {
    label: "Step 1",
    title: "Install from the marketplace",
    body: "Start on the Free plan or pick a paid plan with a 7-day trial. No card needed for Free.",
  },
  {
    label: "Step 2",
    title: "Build and switch on your form",
    body: "Design it in the builder and activate it. The app adds it to your create-account page for you.",
  },
  {
    label: "Step 3",
    title: "Review and approve",
    body: "Approve to create the customer in BigCommerce and place them in a group. On paid plans, add your SMTP to email applicants.",
  },
];

// Source: design/Main.dc.html ("Made for", desktop only).
export const AUDIENCES: Audience[] = [
  {
    icon: "building",
    title: "B2B and wholesale",
    body: "Collect a trade licence and company details, vet the reseller, and approve them straight into your wholesale price group.",
  },
  {
    icon: "lock",
    title: "Members-only stores",
    body: "Gate registration behind your approval so only people you have vetted can create an account and shop.",
  },
  {
    icon: "store",
    title: "Several brands, one store",
    body: "A retail storefront with a short form, a wholesale portal that asks for a tax ID, and a headless site - each with its own rules.",
  },
];
