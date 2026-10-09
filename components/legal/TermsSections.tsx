import Link from "next/link";
import { ProseSection } from "@/components/docs/Prose";
import { APP_NAME, LINKS, VENDOR } from "@/lib/site";

/** Terms of Service text, kept verbatim from the previous site. */
export function TermsSections() {
  return (
    <>
      <ProseSection>
        <p>
          By installing or using {APP_NAME} (&ldquo;the App&rdquo;), provided by {VENDOR} (&ldquo;we&rdquo;, &ldquo;us&rdquo;),
          you (&ldquo;the merchant&rdquo;) agree to these terms.
        </p>
      </ProseSection>

      <ProseSection
        title="1. The service"
        intro="The App lets a merchant design a custom account-signup form, publish it to their BigCommerce storefront via a script, collect applications with optional file uploads, and approve them into BigCommerce customer accounts with automated email notifications."
      />

      <ProseSection title="2. Merchant responsibilities">
        <ul>
          <li>Installing the storefront script correctly and verifying the form before directing customers to it.</li>
          <li>Reviewing applications and deciding whom to approve, reject, or ask for more information.</li>
          <li>Handling applicant data lawfully, including obtaining any consents required in your jurisdiction, and honouring deletion requests.</li>
          <li>Configuring email (SMTP) settings so confirmation and notification emails are delivered.</li>
        </ul>
      </ProseSection>

      <ProseSection
        title="3. Billing & trial"
        intro="The App is offered on a subscription basis with a free trial period. After the trial, recurring fees and any one-time setup fee apply as shown at sign-up and on the BigCommerce listing. Fees are billed through our payment processor. You can cancel at any time by uninstalling the App; fees already charged are non-refundable except where required by law."
      />

      <ProseSection
        title="4. Acceptable use"
        intro="You agree not to use the App to collect data unlawfully, to send unsolicited email, or in any way that violates BigCommerce's terms or applicable law. We may suspend access for misuse."
      />

      <ProseSection
        title="5. Availability & changes"
        intro="We aim for high availability but do not guarantee uninterrupted service. We may update the App and these terms; continued use after a change constitutes acceptance."
      />

      <ProseSection
        title="6. Limitation of liability"
        intro={`To the maximum extent permitted by law, ${VENDOR} is not liable for any indirect, incidental, or consequential damages arising from use of the App. Our total liability is limited to the fees paid for the App in the preceding three months.`}
      />

      <ProseSection
        title="7. Termination"
        intro={
          <>
            You may stop using the App at any time by uninstalling it from your BigCommerce control panel, which removes the
            storefront script and deletes your stored data (see the <Link href="/privacy-policy/">Privacy Policy</Link>).
          </>
        }
      />

      <ProseSection
        title="8. Contact"
        intro={
          <>
            Questions about these terms? Email <a href={LINKS.support}>{LINKS.email}</a>.
          </>
        }
      />
    </>
  );
}
