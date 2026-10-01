import Link from "next/link";
import { Callout } from "@/components/docs/Callout";
import { DocsFigure } from "@/components/docs/DocsFigure";
import { ProseSection } from "@/components/docs/Prose";
import { getDoc } from "@/lib/content/docsIndex";
import { FIGURES, SECTIONS } from "./guideData";
import { GuideH3, UiPath } from "./GuideParts";

const smtpGuide = getDoc("email-smtp");

const TEMPLATES: Array<[string, string]> = [
  ["Signup Confirmation", "a shopper submits the form"],
  ["Resubmission Confirmation", "a shopper resubmits after corrections"],
  ["Approval Email", "you approve a request"],
  ["Rejection Email", "you reject a request"],
  ["Resubmission Request", "you ask for corrections"],
];

const PLACEHOLDERS = ["{{name}}", "{{email}}", "{{date}}", "{{store_name}}", "{{platform_name}}", "{{required_information}}", "{{merchant_message}}"];

/** Customer emails: sending (SMTP), the five templates, the editor and the on/off switches. */
export function GuideEmails() {
  return (
    <ProseSection
      id={SECTIONS.emails.id}
      title={SECTIONS.emails.label}
      intro="Customer emails are part of the Standard plan and up. They are sent from your own email address, so set up sending first."
    >
      <GuideH3>Set up sending (SMTP)</GuideH3>
      <UiPath steps={["Email", "Email Settings"]} />
      <DocsFigure {...FIGURES.emailSettings} caption="Email Settings: customer emails stay off until SMTP is set up." />
      <ol>
        <li>Click <strong>Edit Settings</strong>.</li>
        <li>Under <strong>Sender Information</strong>, enter the From Email (on your own domain), From Name, Reply-To and, if you like, a Store Display Name.</li>
        <li>Under <strong>SMTP Configuration</strong>, enter your provider&apos;s host, port (587 or 465), username and password, then click <strong>Save Settings</strong>.</li>
        <li>Switch on <strong>Enable Customer Emails</strong>.</li>
      </ol>
      <p>
        <Link href={smtpGuide.href}>{smtpGuide.title}</Link> has the values for common providers. Notifications to
        your own team don&apos;t need SMTP: Codinative sends them.
      </p>

      <GuideH3>The five templates</GuideH3>
      <UiPath steps={["Email", "Templates"]} />
      <DocsFigure {...FIGURES.emails} caption="Email Templates: pick a template on the left to preview it." />
      <ul>
        {TEMPLATES.map(([name, when]) => (
          <li key={name}>
            <strong>{name}</strong> - sent when {when}.
          </li>
        ))}
      </ul>
      <p>
        <strong>Shared Branding</strong> holds the logo, a banner image and your social links for every template. Use{" "}
        <strong>Send test</strong> to email a template to yourself before going live.
      </p>

      <GuideH3>Edit a template</GuideH3>
      <DocsFigure {...FIGURES.emailEditor} caption="The template editor, with a live preview of the email." />
      <ol>
        <li>Pick the template and click <strong>Edit template</strong>.</li>
        <li>In <strong>Email Content</strong>, write the subject line, title, greeting and body.</li>
        <li>Adjust <strong>Branding &amp; Colors</strong>, <strong>Call-to-Action Buttons</strong> (give each button its URL) and <strong>Footer &amp; Links</strong>.</li>
        <li>Click <strong>Save template</strong>.</li>
      </ol>
      <p>
        Prefer your own markup? Switch from <strong>Visual Editor</strong> to <strong>Custom HTML</strong> at the top of
        the page; each mode keeps its own version. Placeholders fill in the details of each applicant:{" "}
        {PLACEHOLDERS.map((p, i) => (
          <span key={p}>
            {i > 0 ? ", " : null}
            <code>{p}</code>
          </span>
        ))}
        .
      </p>
      <ul>
        <li><strong>Per customer group</strong> - the Approval Email can have a version for each BigCommerce customer group.</li>
        <li><strong>Per answer</strong> - when your form has a field with conditional logic, a template can have a version for each answer to it.</li>
      </ul>
      <Callout tone="note">Set up every template before your form goes live, so each email says what you want.</Callout>

      <GuideH3>Turn an email on or off</GuideH3>
      <UiPath steps={["Settings", "Email Sending"]} />
      <DocsFigure {...FIGURES.emailSending} caption="Email Sending: one switch per customer email." />
      <p>
        Every email is on by default. Switch one off and it is never sent, while the action itself (approving, for
        example) still happens.
      </p>
    </ProseSection>
  );
}
