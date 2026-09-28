import Link from "next/link";
import { Callout } from "@/components/docs/Callout";
import { ProseSection } from "@/components/docs/Prose";
import { getDoc, type TocItem } from "@/lib/content/docsIndex";
import { LINKS } from "@/lib/site";

/** Section anchors (kept from the previous site) and their "On this page" labels. */
const SECTIONS = {
  dashboard: { id: "dashboard", label: "The dashboard" },
  builder: { id: "builder", label: "The form builder" },
  requests: { id: "requests", label: "Managing requests" },
  emails: { id: "emails", label: "Email templates" },
  groups: { id: "groups", label: "Customer groups" },
  settings: { id: "settings", label: "Settings & cooldowns" },
} satisfies Record<string, TocItem>;

export const userGuideToc: TocItem[] = Object.values(SECTIONS);

const installation = getDoc("installation");

/** User guide body, kept verbatim from the previous site; rendered inside DocsArticleLayout. */
export function UserGuideArticle() {
  return (
    <>
      <ProseSection
        id={SECTIONS.dashboard.id}
        title={SECTIONS.dashboard.label}
        intro="The Dashboard is your overview. At a glance it shows how your signup flow is performing:"
      >
        <ul>
          <li><strong>Request stats</strong> - totals for pending, approved and rejected applications.</li>
          <li><strong>Recent activity</strong> - the latest submissions so you can act on new requests quickly.</li>
          <li><strong>Quick links</strong> - jump to the Form Builder, Requests, Email templates or Settings.</li>
        </ul>
      </ProseSection>

      <ProseSection
        id={SECTIONS.builder.id}
        title={SECTIONS.builder.label}
        intro={<>The <strong>Form Builder</strong> is a visual, drag-and-drop editor with a live preview. You can:</>}
      >
        <ul>
          <li>Add fields of any type - text, email, phone, number, textarea, select, radio, checkbox, date, URL, country/state, and file upload.</li>
          <li>Group fields into rows, reorder them, and mark them required.</li>
          <li>Style colours, fonts, borders, padding and more, and choose a centered or split-screen layout with your own image.</li>
          <li>Save multiple <strong>form versions</strong> and publish the one you want live.</li>
        </ul>
        <p>When you save, the app updates the storefront script so your latest form goes live. Use <strong>Live Preview</strong> to see changes instantly before you publish.</p>
      </ProseSection>

      <ProseSection
        id={SECTIONS.requests.id}
        title={SECTIONS.requests.label}
        intro={<>Every storefront submission becomes a <strong>request</strong> in the Requests page rather than an instant account. For each one you can:</>}
      >
        <ul>
          <li><strong>Approve</strong> - creates the customer in BigCommerce, assigns your chosen group, and sends the approval email.</li>
          <li><strong>Reject</strong> - declines the application and (optionally) emails the applicant.</li>
          <li><strong>Request info</strong> - asks the applicant to resubmit with additional details.</li>
        </ul>
        <p>Open any request to see the full submission and any uploaded documents. Use search and the status filters to find requests fast, and <strong>bulk actions</strong> to approve or reject several at once.</p>
      </ProseSection>

      <ProseSection
        id={SECTIONS.emails.id}
        title={SECTIONS.emails.label}
        intro={<>On the <strong>Email</strong> page you configure a branded HTML template for each moment in the flow - submission confirmation, approval, rejection and resubmission requests. For each template you can:</>}
      >
        <ul>
          <li>Set the subject and design the body in the visual HTML editor.</li>
          <li>Customise the logo, colours, banner, CTA, footer notes and social links.</li>
          <li>Insert <strong>placeholders</strong> such as the customer&apos;s name for personalised content.</li>
          <li>Send a <strong>test email</strong> to yourself before going live.</li>
        </ul>
        <Callout tone="note">Email delivery uses your configured SMTP service (e.g. Brevo). Set this up so confirmation and approval emails reach applicants reliably.</Callout>
      </ProseSection>

      <ProseSection
        id={SECTIONS.groups.id}
        title={SECTIONS.groups.label}
        intro={<>Choose a default <strong>customer group</strong> in Settings to have approved applicants automatically assigned to it - for example a <strong>Wholesale</strong> group with its own pricing and visibility. The list is read from your BigCommerce store, so create the group there first if it doesn&apos;t exist yet.</>}
      />

      <ProseSection id={SECTIONS.settings.id} title={SECTIONS.settings.label} intro="Settings is where you manage the rest of the flow:">
        <ul>
          <li><strong>Notifications</strong> - get an email when a new request arrives so nothing waits unseen.</li>
          <li><strong>Cooldowns</strong> - set a time limit between submissions to prevent duplicates, and reset it for an applicant when needed.</li>
          <li><strong>Default customer group</strong> - the group approved customers are added to.</li>
        </ul>
        <Callout tone="note">
          New here? Start with the <Link href={installation.href}>Installation guide</Link>. For anything else, email{" "}
          <a href={LINKS.support}>{LINKS.email}</a>.
        </Callout>
      </ProseSection>
    </>
  );
}
