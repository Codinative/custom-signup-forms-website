import type { IconName } from "@/components/ui/Icon";
import type { PlanId } from "@/lib/content/plans";

/**
 * The "Compare plans" table: 7 groups, 36 rows. Column order and the header buttons come from
 * PLANS (name, cta.compareLabel, cta.variant). Row labels are identical on the phone artboard,
 * which shows one plan column at a time through the plan switcher (Pro selected).
 */

/** true = check icon, false = "–" (en dash, #cbd5e1), string = the cell text. */
export type FeatureValue = boolean | string;

export type FeatureRow = {
  label: string;
  values: Record<PlanId, FeatureValue>;
};

export type FeatureGroup = {
  title: string;
  icon: IconName;
  rows: FeatureRow[];
};

function row(
  label: string,
  free: FeatureValue,
  standard: FeatureValue,
  pro: FeatureValue,
  enterprise: FeatureValue,
): FeatureRow {
  return { label, values: { free, standard, pro, enterprise } };
}

// Source: design/Pricing.dc.html + MobilePricing.dc.html (section heading, header note, phone switcher).
export const COMPARE_COPY = {
  eyebrow: "Compare plans",
  title: "Every feature, plan by plan.",
  /** Left cell of the desktop header row; the design has no footnote below the table. */
  note: "Prices exclude tax and are in US dollars.",
} as const;

// Source: design/MobilePricing.dc.html (plan switcher; Pro is selected).
export const COMPARE_PHONE_DEFAULT_PLAN: PlanId = "pro";

// Source: design/Pricing.dc.html (comparison table); rows match design/MobilePricing.dc.html.
export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Limits",
    icon: "gauge",
    rows: [
      row("Storefronts", "1", "1", "3", "4 or more"),
      row("Signup requests", "100 / month", "Unlimited", "Unlimited", "Unlimited"),
      row("Saved forms", "1", "Unlimited", "Unlimited", "Unlimited"),
      row("Rejection cooldown", "3 days, fixed", "1–365 days", "1–365 days", "1–365 days"),
      row("\"Powered by\" line on the form", "Shown", "Removed", "Removed", "Removed"),
    ],
  },
  {
    title: "Form builder",
    icon: "layout",
    rows: [
      row("Drag-and-drop editor with live and full-page preview", true, true, true, true),
      row("Ten field types, plus account fields (name, email, password)", true, true, true, true),
      row("Two-column pairing, heading and description blocks, styling", true, true, true, true),
      row("\"Other\" free-text choice on options", false, true, true, true),
      row("Conditional field logic: show fields by answer", false, true, true, true),
      row("File upload field", false, true, true, true),
      row("Headless embed mode", false, false, true, true),
    ],
  },
  {
    title: "Requests and approval",
    icon: "checkCircle",
    rows: [
      row("Approval queue with search, filters and paging", true, true, true, true),
      row("Approve to create the BigCommerce customer; reject; delete", true, true, true, true),
      row("Duplicate and replay protection, reset cooldown", true, true, true, true),
      row("Dashboard stats and pending-request badge", true, true, true, true),
      row("Ask an applicant to resubmit", false, true, true, true),
      row("Change the cooling-off period", false, true, true, true),
    ],
  },
  {
    title: "Customer groups",
    icon: "users",
    rows: [
      row("Choose a group when approving", false, true, true, true),
      row("Assign a group from a form answer", false, true, true, true),
      row("Create the customer at submission, in a holding group", false, true, true, true),
      row("Per-storefront group rules and default/guest group panel", false, false, true, true),
    ],
  },
  {
    title: "Email",
    icon: "mail",
    rows: [
      row("Your own SMTP plus test send", false, true, true, true),
      row("Confirmation, approval, rejection and resubmission emails", false, true, true, true),
      row("Team notification on a new signup", false, true, true, true),
      row("Visual editor, custom HTML and shared branding", false, true, true, true),
      row("Different approval email per group, different email per answer", false, true, true, true),
      row("On/off switch per email", false, true, true, true),
    ],
  },
  {
    title: "Multiple storefronts",
    icon: "store",
    rows: [
      row("A different form per storefront; apply one form to many", false, false, true, true),
      row("Switch a storefront on or off", false, false, true, true),
      row("Per-storefront emails, notifications and cooldown", false, false, true, true),
      row("Filter the queue by storefront", false, false, true, true),
    ],
  },
  {
    title: "Account and support",
    icon: "shieldCheck",
    rows: [
      row("Setup guides and BigCommerce billing portal", true, true, true, true),
      row("Support", "Email, 7 days", "Email", "Email", "Priority, with an SLA"),
      row("Onboarding call", false, false, false, true),
      row("Free trial", false, "7 days", "7 days", "Agreed with you"),
    ],
  },
];
