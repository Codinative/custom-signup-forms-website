import { Callout } from "@/components/docs/Callout";
import { ProseSection } from "@/components/docs/Prose";
import { StepCards, type StepCard } from "@/components/docs/StepCards";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getDoc, type TocItem } from "@/lib/content/docsIndex";
import { LINKS } from "@/lib/site";
import styles from "./InstallationArticle.module.css";

/** Section anchors (kept from the previous site) and their "On this page" labels. */
const SECTIONS = {
  requirements: { id: "requirements", label: "Before you install" },
  permissions: { id: "permissions", label: "Permissions" },
  steps: { id: "steps", label: "Installation steps" },
  script: { id: "script", label: "Installing the script" },
  troubleshooting: { id: "troubleshooting", label: "Troubleshooting" },
} satisfies Record<string, TocItem>;

export const installationToc: TocItem[] = Object.values(SECTIONS);

const REQUIREMENTS: StepCard[] = [
  { title: "A BigCommerce store", text: "Any plan. Install from the App Marketplace or your control panel under Apps → My Apps." },
  { title: "Access to Script Manager", text: "You'll add one storefront script to swap the default account page for your custom form. It lives under Storefront → Script Manager." },
  { title: "Customer groups (optional)", text: "If you want approved applicants assigned to a group - e.g. Wholesale - create the group in BigCommerce first so you can select it." },
];

const STEPS: StepCard[] = [
  { title: "Install the app", text: "Add Custom Signup Forms from the BigCommerce App Marketplace, or from Apps → My Apps. Your 7-day free trial starts on install." },
  { title: "Grant the requested permissions", text: "BigCommerce shows the permissions the app needs and asks you to confirm. Approve them to finish - you're returned to the app dashboard." },
  { title: "Build your form", text: "Open the Form Builder, add and arrange your fields, set the layout and branding, and use Live Preview to check it. Save when you're happy." },
  { title: "Generate & install the script", text: "The app generates a storefront script. Add it in Storefront → Script Manager (see below) so the form appears on your create-account page." },
  { title: "Set up emails & approvals", text: "Customise your email templates, choose the customer group for approved accounts, and configure notifications and cooldowns in Settings." },
  { title: "Verify on the storefront", text: "Visit your store's create-account page. You should see your custom form. Submit a test application and confirm it appears in the Requests dashboard." },
];

const userGuide = getDoc("user-guide");

/** Installation guide body, kept verbatim from the previous site; rendered inside DocsArticleLayout. */
export function InstallationArticle() {
  return (
    <>
      <Callout tone="note">
        Custom Signup Forms replaces your store&apos;s <b>default account registration</b> with a form you design, and holds
        new signups for <b>your approval</b> before creating the customer.
      </Callout>

      <ProseSection
        id={SECTIONS.requirements.id}
        title={SECTIONS.requirements.label}
        intro={<>Make sure your store is ready. You&apos;ll need:</>}
      >
        <ul className={styles.checklist}>
          {REQUIREMENTS.map((item) => (
            <li key={item.title}>
              <Icon name="check" size={18} strokeWidth={2.5} className={styles.check} />
              <span>
                <strong>{item.title}</strong>
                <span className={styles.checkText}>{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </ProseSection>

      <ProseSection
        id={SECTIONS.permissions.id}
        title={SECTIONS.permissions.label}
        intro="On install the app requests only the scopes it needs to run the signup flow - nothing about your orders or payments:"
      >
        <ul>
          <li><strong>Customers - modify</strong> - to create approved applicants as real BigCommerce customer accounts.</li>
          <li><strong>Customer groups - read</strong> - to list your groups so you can assign approved customers to one.</li>
          <li><strong>Content / Checkout scripts - modify</strong> - to install the storefront script that renders your form.</li>
        </ul>
        <Callout tone="note">The app never reads or writes orders or payment data.</Callout>
      </ProseSection>

      <ProseSection id={SECTIONS.steps.id} title={SECTIONS.steps.label} intro="Six steps from install to a live form.">
        <StepCards steps={STEPS} hideOnPhone={false} />
        <div className={styles.actions}>
          <Button href={userGuide.href} variant="outline" size="sm" icon={userGuide.icon} iconSize={16}>
            Read the User guide
          </Button>
        </div>
      </ProseSection>

      <ProseSection
        id={SECTIONS.script.id}
        title={SECTIONS.script.label}
        intro="Custom Signup Forms renders on the storefront through a single script you add in BigCommerce:"
      >
        <ul>
          <li>Go to <strong>Storefront → Script Manager</strong> and click <strong>Create a Script</strong>.</li>
          <li>Set <strong>Location</strong> to <strong>Footer</strong> and <strong>Pages</strong> to the <strong>Login</strong> / create-account page (or all pages).</li>
          <li>Paste the script the app generated, then save.</li>
        </ul>
        <p>On the create-account page the script replaces the default form with your custom one, handles validation and file uploads, and shows your thank-you message after submission. To remove it later, simply delete the script.</p>
      </ProseSection>

      <ProseSection id={SECTIONS.troubleshooting.id} title={SECTIONS.troubleshooting.label}>
        <h3>The default form still shows</h3>
        <p>The script isn&apos;t loading on that page. Re-check that the script is enabled in <strong>Script Manager</strong>, that it targets the create-account / Login page, and that you saved the latest version generated by the app.</p>
        <h3>Submissions aren&apos;t appearing in Requests</h3>
        <p>Make sure you installed the most recent generated script after your last save, and that your form is published. Then submit a fresh test application.</p>
        <h3>Approved customers aren&apos;t in the right group</h3>
        <p>Open <strong>Settings</strong> and confirm the default customer group is set. Groups must exist in BigCommerce before they appear in the list.</p>
        <Callout tone="note">
          Still stuck? Email <a href={LINKS.support}>{LINKS.email}</a> - we reply within one business day.
        </Callout>
      </ProseSection>
    </>
  );
}
