import { Callout } from "@/components/docs/Callout";
import { DocsFigure } from "@/components/docs/DocsFigure";
import { ProseSection } from "@/components/docs/Prose";
import { FIGURES, SECTIONS } from "./guideData";
import { GuideH3, PLAN_PAID, UiPath } from "./GuideParts";

/** The builder: fields, field settings, conditional logic and the theme. */
export function GuideBuilder() {
  return (
    <>
      <ProseSection
        id={SECTIONS.builder.id}
        title={SECTIONS.builder.label}
        intro="The builder is a visual editor with a live preview. You add each field with a click, then arrange the fields in the list beside the preview."
      >
        <UiPath steps={["Form Builder", "New Form"]} />
        <DocsFigure {...FIGURES.builder} caption="The builder: field types on the left, the form as shoppers will see it on the right." />
        <ol>
          <li>Click <strong>Add account fields (name, email, password)</strong>. BigCommerce needs First Name, Last Name, Email and Password to create the account, so a form can&apos;t be saved without them. They are always required.</li>
          <li>Click a field type: Text, Email, Phone, Number, Long Text, Dropdown, Single Choice, Multiple Choice, Country, State / Province, Date, File Upload or Website / Link.</li>
          <li>In the <strong>Add New Field</strong> dialog, enter the label (and the options for a choice field), then click <strong>Add Field</strong>.</li>
          <li>Drag fields in the <strong>Form Fields</strong> list, under the field types, to change their order. <strong>Pair with next field</strong> puts two fields side by side.</li>
          <li>Click <strong>Save</strong>, choose <strong>Save to existing form</strong> or <strong>Save as new form</strong>, and give the form a name.</li>
        </ol>
        <p>
          Saving doesn&apos;t publish a new form: see <a href={`#${SECTIONS.publish.id}`}>Put a form live</a>. The
          State / Province list follows the country the shopper picks.
        </p>
        <GuideH3 plan={PLAN_PAID}>File uploads</GuideH3>
        <p>
          Add a <strong>File Upload</strong> field to collect documents such as a trade licence or a tax certificate.
          Shoppers can upload PDF, Word (DOC, DOCX), Excel (XLS, XLSX), JPG or PNG files of up to 10 MB, and you open
          them from the request.
        </p>
      </ProseSection>

      <ProseSection
        id={SECTIONS.fields.id}
        title={SECTIONS.fields.label}
        intro={<>Click a field in the <strong>Form Fields</strong> list to open <strong>Edit Field</strong>. Its sections:</>}
      >
        <DocsFigure {...FIGURES.field} caption="Edit Field for a dropdown. The preview on the right updates as you type." />
        <ul>
          <li><strong>Basic Settings</strong> - the label, the placeholder and whether the field is required.</li>
          <li><strong>Options</strong> (Dropdown, Single Choice, Multiple Choice) - a label and a value for each option. Tick <strong>Add an &ldquo;Other&rdquo; choice with a free-text box</strong> to let shoppers type their own answer (Standard and up).</li>
          <li><strong>Conditional Logic</strong> - show other fields depending on the answer. See below.</li>
          <li><strong>Heading / Description</strong> - text above or below the field, as a bold heading or a muted description. It is only shown, never submitted.</li>
          <li><strong>Label Styling</strong> and <strong>Input Styling</strong> - colours, sizes, borders, radius and padding for this field.</li>
        </ul>
        <p>
          <strong>Save Changes</strong> updates your draft; the form itself is stored when you click <strong>Save</strong> in
          the top bar.
        </p>
      </ProseSection>

      <ProseSection
        id={SECTIONS.logic.id}
        title={SECTIONS.logic.label}
        intro="Show a field only when it is relevant, for example a portfolio link only for interior designers. Logic is available on Standard and up."
      >
        <DocsFigure {...FIGURES.logic} caption="Portfolio website appears only when the shopper picks Interior designer." />
        <ol>
          <li>In the <strong>Form Fields</strong> list, click a Dropdown, Single Choice or Multiple Choice field.</li>
          <li>Open <strong>Conditional Logic</strong> and tick <strong>Show different fields depending on which option is selected</strong>.</li>
          <li>Under each option, tick the fields to show when a shopper picks it. Fields you don&apos;t tick for the chosen option stay hidden.</li>
          <li>Click <strong>Save Changes</strong>, then <strong>Save</strong> the form.</li>
        </ol>
        <ul>
          <li>The controlling field becomes required, and the account fields can&apos;t be hidden.</li>
          <li>A field can be shown by one controlling field only.</li>
          <li>Hidden fields aren&apos;t checked or submitted.</li>
          <li>The same answers can pick the customer group and the version of an email the applicant gets.</li>
        </ul>
      </ProseSection>

      <ProseSection
        id={SECTIONS.theme.id}
        title={SECTIONS.theme.label}
        intro={<>Click <strong>Edit Theme</strong>, under the field types, to style the whole form.</>}
      >
        <DocsFigure {...FIGURES.theme} caption="Edit Theme Settings: start from a preset, then adjust each part." />
        <ul>
          <li><strong>Branding Presets</strong> - eight ready-made colour schemes.</li>
          <li><strong>Content</strong> - the title, subtitle, primary colour and form background.</li>
          <li><strong>Typography</strong> - colour, size and weight of the title and subtitle.</li>
          <li><strong>Layout</strong> - <strong>Center</strong>, or <strong>Split</strong> with an image beside the form (paste the image&apos;s URL), and the page background.</li>
          <li><strong>Submit Button</strong> - its text, colours and corner radius.</li>
        </ul>
        <p>
          The live preview switches between <strong>Desktop</strong> and <strong>Mobile</strong>; <strong>Expand</strong> opens
          a full-page preview.
        </p>
        <Callout tone="note">On the Free plan the form shows a small &ldquo;Powered by&rdquo; line. Paid plans remove it.</Callout>
      </ProseSection>
    </>
  );
}
