import type { DocsFigureProps } from "@/components/docs/DocsFigure";
import type { TocItem } from "@/lib/content/docsIndex";

/** Section anchors and their "On this page" labels (dashboard, builder, requests, emails, settings kept from the old guide). */
export const SECTIONS = {
  overview: { id: "getting-around", label: "Getting around" },
  dashboard: { id: "dashboard", label: "The dashboard" },
  forms: { id: "saved-forms", label: "Saved forms" },
  builder: { id: "builder", label: "Build a form" },
  fields: { id: "field-settings", label: "Field settings" },
  logic: { id: "conditional-logic", label: "Conditional logic" },
  theme: { id: "theme", label: "Theme and preview" },
  publish: { id: "go-live", label: "Put a form live" },
  requests: { id: "requests", label: "Review requests" },
  approvals: { id: "approvals", label: "Approve, reject, resubmit" },
  emails: { id: "emails", label: "Customer emails" },
  storefronts: { id: "multi-storefront", label: "Multi-storefront" },
  settings: { id: "settings", label: "Settings" },
  resources: { id: "resources", label: "Additional resources" },
} satisfies Record<string, TocItem>;

export const userGuideToc: TocItem[] = Object.values(SECTIONS);

type Figure = Omit<DocsFigureProps, "caption" | "className">;

/** App screenshots (2× captures of the app with the Harbor & Pine demo store; sizes in CSS px). */
export const FIGURES = {
  dashboard: { src: "/images/guide-dashboard.png", width: 1440, height: 875, alt: "Custom Signup Forms dashboard with the four request totals and the Quick Actions shortcuts" },
  forms: { src: "/images/guide-forms.png", width: 1440, height: 869, alt: "Saved Forms tab with three forms; Wholesale application carries the Active badge" },
  builder: { src: "/images/guide-builder.png", width: 1440, height: 973, alt: "Form builder: the field types on the left and the live preview of the form on the right" },
  field: { src: "/images/guide-field.png", width: 944, height: 948, alt: "Edit Field dialog for a dropdown: label, placeholder, required and its options", maxWidth: 736 },
  logic: { src: "/images/guide-logic.png", width: 944, height: 948, alt: "Conditional Logic section: Portfolio website is shown when the shopper picks Interior designer", maxWidth: 736 },
  theme: { src: "/images/guide-theme.png", width: 1072, height: 904, alt: "Edit Theme Settings dialog with the branding presets and a live preview" },
  requests: { src: "/images/guide-requests.png", width: 1440, height: 1427, alt: "Signup Requests page with status filters, search and the list of applicants" },
  request: { src: "/images/guide-request.png", width: 816, height: 928, alt: "Request details: the applicant's answers, an uploaded trade licence and the Approve, Reject and Request Resubmission buttons", maxWidth: 736 },
  approve: { src: "/images/guide-approve.png", width: 576, height: 629, alt: "Approve request dialog: the customer group rule picks Interior designers, with other groups to override it", maxWidth: 576 },
  resubmit: { src: "/images/guide-resubmit.png", width: 576, height: 774, alt: "Request Resubmission dialog with a field ticked and a message for the applicant", maxWidth: 576 },
  emails: { src: "/images/guide-emails.png", width: 1440, height: 1105, alt: "Email Templates page with the five templates and a preview of the Signup Confirmation email" },
  emailEditor: { src: "/images/guide-email-editor.png", width: 1440, height: 1000, alt: "Template editor: subject line, title, greeting and body on the left, live preview on the right" },
  emailSettings: { src: "/images/guide-email-settings.png", width: 1440, height: 937, alt: "Email Settings tab: SMTP is required before customer emails can be switched on" },
  emailSending: { src: "/images/guide-email-sending.png", width: 1440, height: 806, alt: "Settings, Email Sending tab: one on/off switch per customer email" },
  settings: { src: "/images/guide-settings.png", width: 1440, height: 875, alt: "Settings, Notifications tab with a custom notification email address" },
  groups: { src: "/images/guide-groups.png", width: 1440, height: 1235, alt: "Settings, Customer Groups tab: a customer group for each answer to Business type" },
  storefronts: { src: "/images/guide-storefronts.png", width: 1440, height: 699, alt: "Storefronts page: multi-storefront on, five storefronts and the form each one serves" },
  storefront: { src: "/images/guide-storefront-headless.png", width: 1440, height: 862, alt: "A headless storefront's page: its signup form, the embed snippet and the serving switch" },
  switcher: { src: "/images/guide-switcher.png", width: 720, height: 471, alt: "The storefront switcher open in the header, listing All storefronts and each storefront", maxWidth: 720 },
  // Used by the other guides (Installation, Multi-storefront, Headless, Email and SMTP, Plans and billing).
  plans: { src: "/images/install-plans.png", width: 1248, height: 500, alt: "Choose your plan: Free, Standard and Pro with a 7-day free trial, and Enterprise" },
  msfOff: { src: "/images/guide-msf-off.png", width: 1440, height: 718, alt: "Storefronts page with multi-storefront off and the Enable multi-storefront button" },
  storefrontUk: { src: "/images/guide-storefront-uk.png", width: 1440, height: 673, alt: "A standard storefront's page: its signup form, the Serving switch and shortcuts to its requests, emails and approval settings" },
  override: { src: "/images/guide-override.png", width: 1440, height: 990, alt: "Settings while editing one storefront: an Override tick beside each setting" },
  smtpEdit: { src: "/images/guide-smtp-edit.png", width: 1248, height: 935, alt: "Email Settings in edit mode: sender information and the SMTP host, port, username and password" },
  sendTest: { src: "/images/guide-send-test.png", width: 576, height: 338, alt: "Send Test Email dialog with an email address field", maxWidth: 576 },
} satisfies Record<string, Figure>;
