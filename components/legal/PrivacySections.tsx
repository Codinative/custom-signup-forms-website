import { Callout } from "@/components/docs/Callout";
import { ProseSection } from "@/components/docs/Prose";
import { APP_NAME, LINKS, VENDOR } from "@/lib/site";

const host = LINKS.vendor.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Privacy Policy text, kept verbatim from the previous site. */
export function PrivacySections() {
  return (
    <>
      <ProseSection>
        <p>
          {APP_NAME} (&ldquo;the App&rdquo;) is a BigCommerce app provided by {VENDOR} (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
          The App lets a merchant publish a custom account-signup form, collect applications, and approve them into
          BigCommerce customer accounts. This policy explains what data the App accesses, stores, and processes.
        </p>
      </ProseSection>

      <ProseSection
        title="Information we access"
        intro="When a merchant installs the App via BigCommerce OAuth, we request only the permissions needed to run the signup flow:"
      >
        <ul>
          <li><strong>Customers</strong> - to create approved applicants as BigCommerce customer accounts.</li>
          <li><strong>Customer groups</strong> - to list groups and assign approved customers to one.</li>
          <li><strong>Storefront scripts</strong> - to install the script that renders your form on the create-account page.</li>
        </ul>
        <p>The App does <strong>not</strong> access orders or payment data.</p>
      </ProseSection>

      <ProseSection
        title="Information we store"
        intro="We store the data required to operate the App, in Google Firebase (Firestore and Storage):"
      >
        <ul>
          <li>Your <strong>store hash</strong> and the <strong>OAuth access token</strong> issued by BigCommerce at install.</li>
          <li>The <strong>store user(s)</strong> who installed or were granted access to the App (id, email, username).</li>
          <li>Your <strong>configuration</strong> - form designs, email templates, notification and cooldown settings, and the default customer group.</li>
          <li>Your <strong>subscription status</strong> for billing (see Third-party processors).</li>
        </ul>
      </ProseSection>

      <ProseSection
        title="Applicant data"
        intro={
          <>
            When a shopper submits your signup form, the App stores the <strong>information they enter</strong> (such as name,
            email and any custom fields) and any <strong>files they upload</strong> (such as a trade licence), so you can review
            and approve the request. On approval, the relevant details are sent to BigCommerce to create the customer account.
            This applicant data is processed on your behalf, as the merchant, and is retained until you delete the request or
            uninstall the App.
          </>
        }
      />

      <ProseSection title="Third-party processors">
        <ul>
          <li><strong>BigCommerce</strong> - the platform the App integrates with.</li>
          <li><strong>Google Firebase / Firestore &amp; Storage</strong> - stores configuration, requests and uploaded files.</li>
          <li><strong>Vercel</strong> - hosts the App.</li>
          <li><strong>Brevo (or your configured SMTP service)</strong> - delivers confirmation and notification emails.</li>
          <li><strong>Stripe</strong> - processes subscription billing.</li>
        </ul>
        <p>We do not sell or share your data with advertisers, and we do not use it for any purpose other than operating the App.</p>
      </ProseSection>

      <ProseSection
        title="Data retention & deletion"
        intro={
          <>
            When you uninstall the App, BigCommerce notifies our uninstall endpoint and we remove your store record,
            access token, configuration, signup requests and associated uploads. To request deletion at any other time,
            email us at <a href={LINKS.support}>{LINKS.email}</a>.
          </>
        }
      />

      <ProseSection
        title="Security"
        intro="All traffic uses HTTPS. Access tokens and credentials are stored server-side and are never exposed to the browser or to shoppers. Uploaded files are stored in access-controlled Firebase Storage."
      />

      <ProseSection
        title="Contact"
        intro={
          <>
            Questions about this policy? Email <a href={LINKS.support}>{LINKS.email}</a> or visit{" "}
            <a href={LINKS.vendor} target="_blank" rel="noopener">{host}</a>.
          </>
        }
      >
        <Callout tone="note">{VENDOR} · {host}</Callout>
      </ProseSection>
    </>
  );
}
