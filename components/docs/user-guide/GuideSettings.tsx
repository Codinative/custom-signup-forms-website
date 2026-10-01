import Link from "next/link";
import { DocsFigure } from "@/components/docs/DocsFigure";
import { ProseSection } from "@/components/docs/Prose";
import { getDoc, type DocSlug } from "@/lib/content/docsIndex";
import { LINKS } from "@/lib/site";
import { FIGURES, SECTIONS } from "./guideData";
import { GuideH3, PLAN_PAID, UiPath } from "./GuideParts";

const plansGuide = getDoc("plans-and-billing");

const RESOURCES: Array<{ slug: DocSlug; text: string }> = [
  { slug: "installation", text: "install the app and put your first form live" },
  { slug: "multi-storefront", text: "a different form and settings per storefront" },
  { slug: "headless", text: "add the form to a Catalyst, Next.js or other headless storefront" },
  { slug: "email-smtp", text: "SMTP values for common email providers" },
  { slug: "plans-and-billing", text: "what each plan includes, trials and changing plans" },
];

/** Settings tabs (notifications, cooldown, customer groups, subscription) and further reading. */
export function GuideSettings() {
  return (
    <>
      <ProseSection
        id={SECTIONS.settings.id}
        title={SECTIONS.settings.label}
        intro={<>Click the gear icon in the header. Settings has five tabs: Notifications, Cooldown Period, Customer Groups, Email Sending (see <a href={`#${SECTIONS.emails.id}`}>Customer emails</a>) and Subscription.</>}
      >
        <GuideH3 plan={PLAN_PAID}>Notifications</GuideH3>
        <UiPath steps={["Settings", "Notifications"]} />
        <DocsFigure {...FIGURES.settings} caption="Notifications: who hears about new applications." />
        <p>
          You get an email with the applicant&apos;s answers each time someone submits or resubmits the form. It goes to the
          email address of the account that installed the app; tick <strong>Use custom notification email</strong> to send
          it to another address, such as a shared trade inbox.
        </p>

        <GuideH3>Cooldown Period</GuideH3>
        <p>
          How many days a rejected applicant waits before they can apply again: 1 to 365, 7 by default. On the Free plan it
          is fixed at 3 days. To let one person apply sooner, use <strong>Reset Cooldown</strong> on their rejected request.
        </p>

        <GuideH3 id="groups" plan={PLAN_PAID}>Customer Groups</GuideH3>
        <UiPath steps={["Settings", "Customer Groups"]} />
        <DocsFigure {...FIGURES.groups} caption="Customer Group by Condition: a group for each answer to Business type." />
        <ol>
          <li>Give a Dropdown, Single Choice or Multiple Choice field <a href={`#${SECTIONS.logic.id}`}>conditional logic</a> in your live form.</li>
          <li>Switch on <strong>Rule Enabled</strong> and choose the field under <strong>Based on the answer to</strong>.</li>
          <li>Pick a BigCommerce customer group for each answer, and one for <strong>Any other answer</strong>.</li>
          <li>Choose <strong>When approved</strong> (the default) or <strong>When submitted</strong>, then click <strong>Save Changes</strong>.</li>
        </ol>
        <p>
          The groups must already exist in BigCommerce. <strong>When submitted</strong> creates the customer account in that
          group as soon as the form is sent, while the request still waits for you. A group you pick in the Approve dialog
          always wins over the rule.
        </p>

        <GuideH3>Subscription</GuideH3>
        <p>
          Your plan, its price and renewal date, and this month&apos;s usage: storefronts, signups and saved forms. Use{" "}
          <strong>Upgrade</strong> or <strong>Change plan</strong> to switch plans, and <strong>Manage billing</strong> for
          invoices and your payment method. Upgrades apply straight away; downgrades at the end of the billing period. More
          in <Link href={plansGuide.href}>Plans and billing</Link>.
        </p>
      </ProseSection>

      <ProseSection id={SECTIONS.resources.id} title={SECTIONS.resources.label}>
        <ul>
          {RESOURCES.map(({ slug, text }) => {
            const doc = getDoc(slug);
            return (
              <li key={slug}>
                <Link href={doc.href}>{doc.title}</Link> - {text}.
              </li>
            );
          })}
          <li>
            Questions? Email <a href={LINKS.support}>{LINKS.email}</a>.
          </li>
        </ul>
      </ProseSection>
    </>
  );
}
