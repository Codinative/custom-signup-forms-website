import { DocsFigure } from "@/components/docs/DocsFigure";
import { ProseSection } from "@/components/docs/Prose";
import { FIGURES, SECTIONS } from "./guideData";
import { UiPath } from "./GuideParts";

/** Getting around, the dashboard and the saved-forms library. */
export function GuideBasics() {
  return (
    <>
      <ProseSection
        id={SECTIONS.overview.id}
        title={SECTIONS.overview.label}
        intro={<>Open the app from your BigCommerce control panel under <strong>Apps → My Apps → Custom Signup Forms</strong>. Everything lives in the top bar:</>}
      >
        <ul>
          <li><strong>Dashboard</strong> - totals, shortcuts and the latest requests.</li>
          <li><strong>Form Builder</strong> - your saved forms and the editor.</li>
          <li><strong>Requests</strong> - every application, with an amber badge counting the ones waiting for you.</li>
          <li><strong>Email</strong> - the customer email templates and your sending (SMTP) settings.</li>
          <li><strong>Storefronts</strong> - which form each storefront serves (multi-storefront, Pro and Enterprise).</li>
          <li>The <strong>gear icon</strong> opens Settings; <strong>Help</strong> links to the SMTP and headless integration guides.</li>
        </ul>
        <p>
          When multi-storefront is on, a storefront switcher also appears next to the logo. See{" "}
          <a href={`#${SECTIONS.storefronts.id}`}>Multi-storefront</a>.
        </p>
      </ProseSection>

      <ProseSection
        id={SECTIONS.dashboard.id}
        title={SECTIONS.dashboard.label}
        intro="The dashboard shows how your signup flow is doing and how many applications are waiting for a decision."
      >
        <DocsFigure {...FIGURES.dashboard} caption="The dashboard: request totals, then shortcuts to the screens you use most." />
        <ul>
          <li><strong>Four totals</strong> - Total Signups (with the change against the previous 7 days), Pending Review, Approved (with your approval rate) and Rejected. Click a total to open those requests.</li>
          <li><strong>Quick Actions</strong> - Form Builder, View Requests, Email Templates and Preview Form, a full-page preview of your live form.</li>
          <li><strong>Recent Signup Requests</strong> - the five latest applications, each with a <strong>View</strong> button.</li>
          <li><strong>Create New Form</strong> - opens the builder to start a new form.</li>
        </ul>
        <p>During a free trial a banner counts the days left. On the Free plan a meter shows how many of your 100 monthly signups you have used.</p>
      </ProseSection>

      <ProseSection
        id={SECTIONS.forms.id}
        title={SECTIONS.forms.label}
        intro="Every form you save is kept in a library, so you can prepare a new form while another one is live."
      >
        <UiPath steps={["Form Builder", "Forms"]} />
        <DocsFigure {...FIGURES.forms} caption="Saved forms. The live form carries the Active badge and is named at the top right." />
        <ul>
          <li>Click a form to open it in the builder.</li>
          <li>Use the icons on each card to <strong>activate</strong> or <strong>deactivate</strong> the form, <strong>rename</strong> it or <strong>delete</strong> it.</li>
          <li><strong>New Form</strong> starts a blank form. To copy a form, open it and choose <strong>Save as new form</strong> when you save.</li>
          <li>Search by name and switch between the grid and list views.</li>
        </ul>
        <p>
          The Free plan keeps one saved form; paid plans keep as many as you like. A form that a storefront is serving
          can&apos;t be deleted until that storefront has another form.
        </p>
      </ProseSection>
    </>
  );
}
