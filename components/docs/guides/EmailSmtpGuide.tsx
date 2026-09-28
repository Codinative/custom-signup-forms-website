import Link from "next/link";
import { Callout } from "@/components/docs/Callout";
import { DefinitionRows, type DefinitionRow } from "@/components/docs/DefinitionRows";
import { ProseSection } from "@/components/docs/Prose";
import { StepCards, type StepCard } from "@/components/docs/StepCards";
import { PlaceholderBox } from "@/components/ui/PlaceholderBox";
import { sectionProps } from "./guides";
import styles from "./Guides.module.css";

const STEPS: StepCard[] = [
  { title: "Get your SMTP details", text: "Host, port, username and password from your email provider." },
  { title: "Fill in Email Settings", text: "Enter them under Email → Email Settings and save." },
  { title: "Send a test", text: "Send a test email from Templates." },
];

// App repo: components/EmailConfig.tsx field labels and hints
const FIELDS: DefinitionRow[] = [
  { key: "Enable Customer Emails", value: "Turns customer emails on. It needs SMTP to be fully configured." },
  { key: "From Email", value: "The sender address. Must be on your authenticated domain." },
  { key: "From Name", value: "The display name shown in your customer’s inbox." },
  {
    key: "Store Display Name",
    value: "Optional. The store name customers see in emails. If you leave it blank, your From Name is used.",
  },
  { key: "Reply-To", value: "Where customers’ replies go." },
  {
    key: "SMTP Host",
    value: (
      <>
        Your SMTP server’s hostname, for example <code>smtp-relay.brevo.com</code>.
      </>
    ),
  },
  { key: "SMTP Port", value: '"Port 587 (TLS/STARTTLS) - Recommended" or "Port 465 (SSL/TLS)".' },
  { key: "SMTP Username", value: "Your SMTP username." },
  { key: "SMTP Password", value: "Your SMTP password or API key." },
];

// App repo: components/EmailSendingConfig.tsx EMAIL_TYPES
const EMAILS: DefinitionRow[] = [
  { key: "Signup Confirmation", value: "Sent when a shopper submits the signup form." },
  { key: "Resubmission Confirmation", value: "Sent when a shopper resubmits after being asked." },
  { key: "Approval Email", value: "Sent when you approve a request." },
  { key: "Rejection Email", value: "Sent when you reject a request." },
  { key: "Resubmission Request", value: "Sent when you ask a shopper to resubmit." },
];

// App repo: components/EmailTemplates.tsx variable list; values from lib/email.ts and the send routes
const VARIABLES: DefinitionRow[] = [
  { key: "{{name}}", value: "The shopper’s name, as entered on the form." },
  { key: "{{email}}", value: "The shopper’s email address." },
  { key: "{{store_name}}", value: "Your Store Display Name, or your From Name if that’s blank." },
  { key: "{{platform_name}}", value: "The same store name as {{store_name}}." },
  { key: "{{date}}", value: "The date and time the email is sent." },
  { key: "{{required_information}}", value: "In the Resubmission Request: the fields you ask the shopper to fix." },
  { key: "{{merchant_message}}", value: "In the Resubmission Request: your optional message." },
];

const S = (id: string) => sectionProps("email-smtp", id);

export function EmailSmtpGuide() {
  return (
    <>
      <StepCards steps={STEPS} hideOnPhone={false} />

      <ProseSection
        {...S("before-you-start")}
        intro="Customer emails are on Standard and above. They’re sent through your own mail provider’s SMTP server, from an address on your own domain."
      >
        <Callout>Until SMTP is set up, no customer emails are sent.</Callout>
        <p>
          Find your SMTP details at the provider where you bought your domain, such as Hostinger or GoDaddy. If you don’t
          have an address on your domain yet, such as <code>info@yourdomain.com</code>, create one there. Its email
          settings list the host, port, username and password.
        </p>
        <PlaceholderBox as="span" className={styles.review}>
          For review: settings for specific providers (Gmail, Microsoft 365) and the SPF and DKIM records to add.
        </PlaceholderBox>
      </ProseSection>

      <ProseSection
        {...S("email-settings")}
        intro={
          <>
            Open Email → Email Settings and click &quot;Edit Settings&quot;. Fill in the fields, then click &quot;Save
            Settings&quot;. &quot;Cancel&quot; drops your changes.
          </>
        }
      >
        <DefinitionRows rows={FIELDS} keyWidth={200} className={styles.stackedRows} />
        <p>Store Display Name is the only optional field.</p>
        <h3>If the app won’t save</h3>
        <p>These messages tell you what to fix:</p>
        <ul>
          <li>&quot;Please fill in all required fields:&quot; followed by the fields still empty.</li>
          <li>&quot;SMTP must be fully configured to enable customer emails.&quot;</li>
          <li>&quot;From Email is required when SMTP is configured.&quot;</li>
          <li>&quot;SMTP port must be a valid number between 1 and 65535.&quot;</li>
        </ul>
      </ProseSection>

      <ProseSection
        {...S("send-a-test")}
        intro={
          <>
            Open Email → Templates, choose an email and click &quot;Send test&quot;. Enter an address in the &quot;Send
            Test Email&quot; window and send it.
          </>
        }
      >
        <Callout tone="note">Saving your settings doesn’t test the connection. Send a test to check them.</Callout>
        <p>If the test fails, check the host, port, username and password with your provider, then try again.</p>
      </ProseSection>

      <ProseSection {...S("customer-emails")} intro="There are five. Edit their content in Email → Templates.">
        <DefinitionRows rows={EMAILS} keyWidth={240} className={styles.stackedRows} />
        <p>
          Switch any of them off in Settings → Email Sending. The Approval Email can have a different version per
          customer group, and any email a different version per form answer.
        </p>
      </ProseSection>

      <ProseSection
        {...S("template-variables")}
        intro="Use these in a subject or body. Each one is replaced when the email is sent."
      >
        <DefinitionRows rows={VARIABLES} keyWidth={240} className={styles.stackedRows} />
      </ProseSection>

      <ProseSection
        {...S("notifications")}
        intro="The app can email you when someone signs up. Set it up in Settings → Notifications."
      >
        <p>
          Notifications go to your account email. To use another address, turn on &quot;Use custom notification
          email&quot; and enter a &quot;Custom Notification Email&quot;. They’re sent by the app, not through your
          SMTP, and are on Standard and above.
        </p>
      </ProseSection>

      <ProseSection
        {...S("multiple-storefronts")}
        intro={
          <>
            With multi-storefront on (Pro and above), a storefront can have its own sender details, SMTP account,
            templates and Email Sending switches. Pick it in the storefront switcher and tick &quot;Override&quot; on
            what should differ; the rest keeps following your defaults.
          </>
        }
      >
        <p>
          A storefront that overrides only its sender details still sends through your global SMTP account, so a new
          password there keeps working for it. See the{" "}
          <Link href="/docs/multi-storefront/">Multi-storefront guide</Link>.
        </p>
      </ProseSection>
    </>
  );
}
