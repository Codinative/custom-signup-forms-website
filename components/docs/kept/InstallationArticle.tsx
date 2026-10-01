import Link from "next/link";
import { Callout } from "@/components/docs/Callout";
import { DocsFigure } from "@/components/docs/DocsFigure";
import { ProseSection } from "@/components/docs/Prose";
import { StepCards, type StepCard } from "@/components/docs/StepCards";
import { FIGURES } from "@/components/docs/user-guide/guideData";
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
  script: { id: "script", label: "The storefront script" },
  troubleshooting: { id: "troubleshooting", label: "Troubleshooting" },
} satisfies Record<string, TocItem>;

export const installationToc: TocItem[] = Object.values(SECTIONS);

const REQUIREMENTS: StepCard[] = [
  { title: "A BigCommerce store", text: "Install from the BigCommerce App Marketplace. The app adds the form to a standard (Stencil) storefront for you; a headless storefront takes a short embed snippet instead (Pro and Enterprise)." },
  { title: "Customer groups (optional)", text: "If approved applicants should join a group, such as Wholesale, create the group in BigCommerce first so you can pick it in the app." },
  { title: "An email (SMTP) account (optional)", text: "Customer emails (Standard plan and up) are sent through your own provider, such as Brevo, SendGrid or Gmail. Keep its SMTP details at hand." },
];

const STEPS: StepCard[] = [
  { title: "Install the app", text: "Open the Custom Signup Forms listing on the BigCommerce App Marketplace and click Install." },
  { title: "Approve the permissions", text: "BigCommerce lists what the app needs (see Permissions) and asks you to confirm. The app then opens in your control panel." },
  { title: "Choose a plan", text: "Start on Free, or pick a paid plan with a 7-day free trial. You can change plan later under Settings → Subscription." },
  { title: "Build your form", text: "In Form Builder, click New Form, add the account fields (name, email, password) and your own fields, style it and click Save." },
  { title: "Activate it", text: "In Form Builder → Forms, click Activate on the form. The app adds the storefront script for you: nothing to paste." },
  { title: "Test on your storefront", text: "Open your store's create-account page, send a test application and find it under Requests. Then set up emails and approvals." },
];

/** Step 4 screenshot (2× capture of the demo store; size in CSS px). Step 3 uses FIGURES.plans. */
const FIELDS_FIGURE = { src: "/images/install-builder-fields.png", width: 324, height: 697, alt: "Form builder sidebar: Add account fields (name, email, password), the field types and Edit Theme", maxWidth: 324 };

const userGuide = getDoc("user-guide");
const headless = getDoc("headless");
const multiStorefront = getDoc("multi-storefront");
const smtp = getDoc("email-smtp");

/** Installation guide body (corrected 2026-10-01 against the app: the script is installed automatically); rendered inside DocsArticleLayout. */
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
        intro="BigCommerce shows the exact permissions on the install screen. The app uses them to:"
      >
        <ul>
          <li><strong>Customers</strong> - create approved applicants as BigCommerce customers and list your customer groups.</li>
          <li><strong>Content (scripts)</strong> - add and remove the storefront script that shows your form.</li>
          <li><strong>Channel settings</strong> - list your storefronts, so multi-storefront can serve a different form on each.</li>
        </ul>
        <Callout tone="note">The app never reads or writes your store&apos;s orders or payment data.</Callout>
      </ProseSection>

      <ProseSection id={SECTIONS.steps.id} title={SECTIONS.steps.label} intro="Six steps from install to a live form.">
        <StepCards steps={STEPS} hideOnPhone={false} />
        <DocsFigure {...FIGURES.plans} caption="Step 3: the plan chooser opens the first time you use the app. Free needs no card; Standard and Pro start with a 7-day free trial." />
        <DocsFigure {...FIELDS_FIGURE} caption="Step 4: start with Add account fields, then click each field type you need." />
        <div className={styles.actions}>
          <Button href={userGuide.href} variant="outline" size="sm" icon={userGuide.icon} iconSize={16}>
            Read the User guide
          </Button>
        </div>
      </ProseSection>

      <ProseSection
        id={SECTIONS.script.id}
        title={SECTIONS.script.label}
        intro="You don't add any code to a standard storefront. When you activate a form, the app installs one script through BigCommerce's Scripts API:"
      >
        <DocsFigure {...FIGURES.forms} caption="Form Builder → Forms: activate a form and the app installs the script; the live form shows the Active badge." />
        <ul>
          <li>It appears in <strong>Storefront → Script Manager</strong> as <strong>Custom Signup Form</strong>. Leave it there; the app keeps it up to date.</li>
          <li>On your create-account page it replaces BigCommerce&apos;s form with yours and shows a thank-you message after the shopper submits.</li>
          <li>Editing the active form needs no new script: shoppers get the new version the next time the page loads.</li>
          <li><strong>Deactivate</strong> the form in the app to remove the script and bring back BigCommerce&apos;s own form.</li>
        </ul>
        <p>
          With multi-storefront on, the app installs the script on each storefront you switch on (
          <Link href={multiStorefront.href}>{multiStorefront.title}</Link>). A headless storefront needs the embed snippet
          added by your developer (<Link href={headless.href}>{headless.title}</Link>).
        </p>
      </ProseSection>

      <ProseSection id={SECTIONS.troubleshooting.id} title={SECTIONS.troubleshooting.label}>
        <h3>The default form still shows</h3>
        <p>
          Check that a form is active: <strong>Form Builder → Forms</strong> names the active form at the top right. With
          multi-storefront on, open <strong>Storefronts</strong> and check that the storefront has a form and is switched to{" "}
          <strong>Serving</strong>. On a headless storefront, both embed steps are needed. Then reload the create-account page.
        </p>
        <h3>Submissions aren&apos;t appearing in Requests</h3>
        <p>
          Choose the <strong>All</strong> filter and, with multi-storefront on, <strong>All storefronts</strong> in the header.
          Someone who already has a pending request or an account, or who was rejected within the cooldown period, can&apos;t
          submit again with the same email. On the Free plan the form stops taking signups after 100 in a month.
        </p>
        <h3>Approved customers aren&apos;t in the right group</h3>
        <p>
          Pick the group in the <strong>Approve</strong> dialog, or set a rule under <strong>Settings → Customer Groups</strong>{" "}
          (Standard plan and up; the Free plan assigns no group). Groups must exist in BigCommerce before they appear.
        </p>
        <h3>Applicants don&apos;t get emails</h3>
        <p>
          Customer emails need a paid plan, your SMTP details and <strong>Enable Customer Emails</strong> switched on under{" "}
          <strong>Email → Email Settings</strong> (<Link href={smtp.href}>{smtp.title}</Link>), and the email&apos;s own
          switch on under <strong>Settings → Email Sending</strong>.
        </p>
        <Callout tone="note">
          Still stuck? Email <a href={LINKS.support}>{LINKS.email}</a> - we reply within one business day.
        </Callout>
      </ProseSection>
    </>
  );
}
