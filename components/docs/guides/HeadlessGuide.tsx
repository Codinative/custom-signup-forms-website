import Link from "next/link";
import { Callout } from "@/components/docs/Callout";
import { ProseSection } from "@/components/docs/Prose";
import { StepCards, type StepCard } from "@/components/docs/StepCards";
import { CodeBlock, CodeHeader } from "@/components/ui/CodeBlock";
import { PlaceholderBox } from "@/components/ui/PlaceholderBox";
import { sectionProps } from "./guides";
import { CONTAINER_LINES, HTML_LINES, NEXT_LINES, NUXT_LINES, SCRIPT_LINES } from "./headlessSnippets";
import styles from "./Guides.module.css";

const STEPS: StepCard[] = [
  { title: "Add the container", text: "Replace your signup form with an empty div." },
  { title: "Load the script", text: "Copy your storefront’s snippet into the page." },
  { title: "Switch it on", text: "Turn the storefront on in the app." },
];

const S = (id: string) => sectionProps("headless", id);

export function HeadlessGuide() {
  return (
    <>
      <StepCards steps={STEPS} hideOnPhone={false} />

      <ProseSection
        {...S("before-you-start")}
        intro={
          <>
            Headless embeds are on the Pro and Enterprise plans, with multi-storefront turned on. See the{" "}
            <Link href="/docs/multi-storefront/">Multi-storefront guide</Link>.
          </>
        }
      >
        <p>
          They’re for storefront channels BigCommerce doesn’t render with Stencil, such as Catalyst, Next.js, Nuxt or a
          custom site. On the Storefronts screen these are marked &quot;Headless&quot;.
        </p>
      </ProseSection>

      <ProseSection {...S("add-the-container")} intro="On your signup page, replace your signup form with this empty container:">
        <CodeBlock header={<CodeHeader title="Container" lang="html" />} lines={CONTAINER_LINES} />
        <Callout>
          Delete your own signup form. The app only fills the container and never touches the rest of the page, so if
          your old form is still there, shoppers see two signup forms.
        </Callout>
        <p>
          The container must be empty: anything inside it is cleared when the form renders. Style it however you like;
          the form fills the width you give it.
        </p>
      </ProseSection>

      <ProseSection
        {...S("load-the-script")}
        intro={
          <>
            Copy your storefront’s script tag from Storefronts: open the storefront, find &quot;Embed snippet&quot; and
            click &quot;Copy snippet&quot;. It looks like this:
          </>
        }
      >
        <CodeBlock header={<CodeHeader title="Embed snippet" lang="html" />} lines={SCRIPT_LINES} />
        <p>
          Use your own tag, not this example. It identifies your store and the storefront the form belongs to. The tag
          is the same everywhere; only the place it goes changes.
        </p>
        <h3>HTML</h3>
        <p>
          For any site whose <code>&lt;head&gt;</code> you control, such as WordPress, Drupal or a custom build, put the
          tag in the <code>&lt;head&gt;</code>. A React app built with Vite or Create React App belongs here too: the
          tag goes in <code>index.html</code>.
        </p>
        <CodeBlock header={<CodeHeader title="HTML" lang="html" />} lines={HTML_LINES} />
        <h3>Next.js and Catalyst</h3>
        <p>
          Catalyst is built on Next.js. With the App Router, load the tag with <code>next/script</code> in{" "}
          <code>app/layout.tsx</code>; with the Pages Router, use <code>pages/_app.tsx</code>.
        </p>
        <CodeBlock header={<CodeHeader title="app/layout.tsx" lang="tsx" />} lines={NEXT_LINES} />
        <h3>Nuxt</h3>
        <p>
          Add the tag to <code>app.head.script</code> in <code>nuxt.config.ts</code>. To load it on one page only, call{" "}
          <code>useHead()</code> with the same script entry from that page.
        </p>
        <CodeBlock header={<CodeHeader title="nuxt.config.ts" lang="ts" />} lines={NUXT_LINES} />
      </ProseSection>

      <ProseSection
        {...S("switch-it-on")}
        intro="Assign a form to the storefront and switch it on in Storefronts. For a headless storefront this only records your choice; nothing is installed."
      >
        <p>
          The app reminds you with &quot;Switched on, but not live yet.&quot; Shoppers see your form once both steps
          are done on your site.
        </p>
        <p>Switching the storefront off stops the form on your site, even with the tag still in place.</p>
      </ProseSection>

      <ProseSection
        {...S("how-the-script-works")}
        intro="The script looks for the container. If it finds it, your form renders inside. If not, it stops straight away without loading anything else, so it’s safe to load on every page."
      >
        <p>
          Single-page apps such as Catalyst, Next.js, Nuxt or Gatsby need nothing extra. The form renders when a shopper
          arrives at the signup page and clears when they leave, so coming back shows one form, not two.
        </p>
        <PlaceholderBox as="span" className={styles.review}>
          For review: the production app domain behind [app-domain], and notes on Content Security Policy and cookie
          consent for this script.
        </PlaceholderBox>
      </ProseSection>

      <ProseSection
        {...S("native-apps")}
        intro={
          <>
            The embed needs a web page with an element on it, so it can’t render inside a native mobile app. For native
            apps, kiosks or your own backend, use the <Link href="/docs/api/">API integration</Link>.
          </>
        }
      />
    </>
  );
}
