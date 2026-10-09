import type { DocSlug, TocItem } from "@/lib/content/docsIndex";

/**
 * The four undesigned docs guides, built on the ApiDocs article template. Every statement in
 * them is verified in the app repo (custom-signup-forms, branch feat/four-tier-pricing).
 */
export type GuideSlug = Extract<DocSlug, "multi-storefront" | "plans-and-billing" | "headless" | "email-smtp">;

export type GuideMeta = {
  /** Meta description, 70–160 characters. */
  description: string;
  /** Intro under the h1. */
  lede: string;
  /** Plan tag beside the h1, only where the plan gate is verified in the app. */
  plan?: string;
  /** "On this page": one entry per h2; the h2 text is read from here. */
  toc: TocItem[];
};

export const GUIDES: Record<GuideSlug, GuideMeta> = {
  "multi-storefront": {
    description:
      "Turn on multi-storefront, give each storefront its own signup form, emails and approval settings, and switch storefronts on or off.",
    lede: "Give each storefront its own signup form, emails and approval settings, all from one app. Anything you don’t override keeps following your defaults.",
    plan: "Pro and Enterprise",
    toc: [
      { id: "before-you-start", label: "Before you start" },
      { id: "turn-it-on", label: "Turn it on" },
      { id: "set-up-a-storefront", label: "Set up a storefront" },
      { id: "switch-it-on", label: "Switch it on" },
      { id: "per-storefront-settings", label: "Per-storefront settings" },
      { id: "requests-by-storefront", label: "Requests by storefront" },
      { id: "turn-it-off", label: "Turn it off" },
    ],
  },
  "plans-and-billing": {
    description:
      "What each Custom Signup Forms plan includes, how the 7-day trial and plan changes work, the Free plan limits, and what happens if a payment fails.",
    lede: "Custom Signup Forms has four plans: Free, Standard, Pro and Enterprise. Here’s what each includes, how the trial and plan changes work, and what happens if a payment fails.",
    toc: [
      { id: "the-plans", label: "The plans" },
      { id: "free-trial", label: "Free trial" },
      { id: "changing-plans", label: "Changing plans" },
      { id: "free-plan-limits", label: "Free plan limits" },
      { id: "if-a-payment-fails", label: "If a payment fails" },
      { id: "uninstalling", label: "Uninstalling" },
    ],
  },
  headless: {
    description:
      "Embed the signup form on a headless storefront, such as Catalyst, Next.js or Nuxt, with an empty container and one script tag.",
    lede: "Put your signup form on a storefront BigCommerce doesn’t render, such as Catalyst, Next.js or Nuxt. Your developer adds an empty container and one script tag.",
    plan: "Pro and Enterprise",
    toc: [
      { id: "before-you-start", label: "Before you start" },
      { id: "add-the-container", label: "Add the container" },
      { id: "load-the-script", label: "Load the script" },
      { id: "switch-it-on", label: "Switch it on" },
      { id: "how-the-script-works", label: "How the script works" },
      { id: "native-apps", label: "Native apps" },
    ],
  },
  "email-smtp": {
    description:
      "Connect your own SMTP server to send customer emails: every Email Settings field, sending a test, the five customer emails and template variables.",
    lede: "Customer emails go out through your own mail provider’s SMTP server. Connect it in Email Settings, then send a test.",
    plan: "Standard and above",
    toc: [
      { id: "before-you-start", label: "Before you start" },
      { id: "email-settings", label: "Email settings" },
      { id: "send-a-test", label: "Send a test" },
      { id: "customer-emails", label: "Customer emails" },
      { id: "template-variables", label: "Template variables" },
      { id: "notifications", label: "Notifications" },
      { id: "multiple-storefronts", label: "Multiple storefronts" },
    ],
  },
};

/** `id` + `title` for a ProseSection, so the h2 and its "On this page" entry never drift. */
export function sectionProps(slug: GuideSlug, id: string): { id: string; title: string } {
  const item = GUIDES[slug].toc.find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown section: ${slug}#${id}`);
  return { id: item.id, title: item.label };
}
