import { Callout } from "@/components/docs/Callout";
import { DocsFigure } from "@/components/docs/DocsFigure";
import { ProseSection } from "@/components/docs/Prose";
import { FIGURES, SECTIONS } from "./guideData";
import { GuideH3, PLAN_PAID, UiPath } from "./GuideParts";

/** Going live, the request queue and the approve / reject / resubmit decisions. */
export function GuideRequests() {
  return (
    <>
      <ProseSection
        id={SECTIONS.publish.id}
        title={SECTIONS.publish.label}
        intro="On a single storefront, the active form replaces BigCommerce's create-account form. No theme edits are needed."
      >
        <ol>
          <li>Go to <strong>Form Builder → Forms</strong>.</li>
          <li>On the form&apos;s card, click the <strong>Activate</strong> icon and confirm.</li>
          <li>The app adds a script called <strong>Custom Signup Form</strong> to your store&apos;s Script Manager, and shoppers see your form on the create-account page.</li>
          <li>Open your store&apos;s create-account page to check it, and send a test application.</li>
        </ol>
        <ul>
          <li><strong>Editing the live form</strong> - save it as usual; shoppers get the new version the next time the page loads.</li>
          <li><strong>Deactivate</strong> - removes the script, and shoppers get BigCommerce&apos;s own form again.</li>
          <li><strong>More than one storefront</strong> - with multi-storefront on, you assign a form to each storefront instead. See <a href={`#${SECTIONS.storefronts.id}`}>Multi-storefront</a>.</li>
        </ul>
        <p>After submitting, the shopper sees a thank-you message, and the application waits for you in Requests.</p>
      </ProseSection>

      <ProseSection
        id={SECTIONS.requests.id}
        title={SECTIONS.requests.label}
        intro="Each application becomes a request. Nothing is created in BigCommerce until you approve it."
      >
        <UiPath steps={["Requests"]} />
        <DocsFigure {...FIGURES.requests} caption="Signup Requests: filter by status, search, then open a request with View." />
        <ul>
          <li>Filter by <strong>All</strong>, <strong>Pending</strong>, <strong>Approved</strong> or <strong>Rejected</strong>, or search by name or email.</li>
          <li>Twelve requests load at a time; <strong>Load More</strong> fetches the next ones.</li>
          <li>Click <strong>View</strong> to open a request.</li>
        </ul>
        <DocsFigure {...FIGURES.request} caption="A request: the applicant's answers, uploaded files and your three choices." />
        <p>
          The request shows every answer with its label from your form (passwords are never shown) and each uploaded
          file, which opens in a new tab. Use <strong>Search fields</strong> on long forms.
        </p>
      </ProseSection>

      <ProseSection
        id={SECTIONS.approvals.id}
        title={SECTIONS.approvals.label}
        intro="A pending request has three buttons: Approve, Reject and Request Resubmission."
      >
        <GuideH3>Approve</GuideH3>
        <DocsFigure {...FIGURES.approve} caption="Approve: the customer group comes from your rule unless you pick another one." />
        <ol>
          <li>Click <strong>Approve</strong>.</li>
          <li>Choose the <strong>Customer group</strong>: your rule&apos;s group, your store&apos;s default, a specific group, or none.</li>
          <li>Click <strong>Approve and Create Customer</strong>.</li>
        </ol>
        <p>
          The app creates the customer in BigCommerce, on the storefront the applicant used, in the chosen group. When
          customer emails are set up, it then sends the Approval Email, which asks the customer to set a password with
          &ldquo;Forgot your password?&rdquo;: for security, the password typed on the form isn&apos;t used. Apart from the
          name, email and (when your form asks for them) phone, company and address, the answers stay in the app rather
          than on the BigCommerce customer.
        </p>
        <Callout tone="note">
          On the Free plan, approving creates the account only: no customer group and no email. Tell the applicant to sign
          in with &ldquo;Forgot your password?&rdquo;.
        </Callout>

        <GuideH3>Reject</GuideH3>
        <p>
          Click <strong>Reject</strong> and confirm. The applicant gets your Rejection Email (when customer emails are set
          up) and can&apos;t apply again with that email address until the cooldown period ends: 7 days by default, 3 days
          on the Free plan. On paid plans, set up the Rejection Email template before you reject. If someone should be
          allowed to apply sooner, open their rejected request and click <strong>Reset Cooldown</strong>.
        </p>

        <GuideH3 plan={PLAN_PAID}>Request Resubmission</GuideH3>
        <DocsFigure {...FIGURES.resubmit} caption="Ask for corrections: pick the fields and add a short message." />
        <ol>
          <li>Click <strong>Request Resubmission</strong>.</li>
          <li>Tick the fields that need correcting and, if you like, add a message (up to 500 characters).</li>
          <li>Click <strong>Send Resubmission Request</strong>.</li>
        </ol>
        <p>
          The applicant gets the Resubmission Request email listing those fields. When they resubmit, the old request is
          replaced by a new pending one and they get the Resubmission Confirmation email.
        </p>

        <GuideH3>Duplicates</GuideH3>
        <p>
          Someone with a pending request, or an approved account, can&apos;t submit the form again with the same email
          address. They are told why on the form.
        </p>
      </ProseSection>
    </>
  );
}
