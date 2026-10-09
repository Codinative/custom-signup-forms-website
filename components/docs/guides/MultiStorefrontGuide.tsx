import Link from "next/link";
import { Callout } from "@/components/docs/Callout";
import { DefinitionRows, type DefinitionRow } from "@/components/docs/DefinitionRows";
import { DocsFigure } from "@/components/docs/DocsFigure";
import { FIGURES } from "@/components/docs/user-guide/guideData";
import { ProseSection } from "@/components/docs/Prose";
import { StepCards, type StepCard } from "@/components/docs/StepCards";
import { PlaceholderBox } from "@/components/ui/PlaceholderBox";
import { sectionProps } from "./guides";
import styles from "./Guides.module.css";

// App repo: components/channels/MsfOffPanel.tsx STEPS (verbatim)
const STEPS: StepCard[] = [
  { title: "Turn it on", text: "Your default storefront keeps serving exactly as it does today." },
  { title: "Set up a storefront", text: "Pick a channel, assign a form, override only the settings that should differ." },
  { title: "Switch it on", text: "The form goes live on that storefront. Switch any storefront off again at any time." },
];

// App repo: lib/bc-channels.ts classifyChannel; components/channels/types.ts TIER_BLURB
const CHANNEL_TYPES: DefinitionRow[] = [
  {
    key: "Stencil storefront",
    value: "Switching it on installs the form script for you.",
  },
  {
    key: "Headless storefront",
    value: (
      <>
        Marked &quot;Headless&quot;. Your developer swaps your signup form for an empty container and loads the script.
        See <Link href="/docs/headless/">Headless storefronts</Link>.
      </>
    ),
  },
  {
    key: "Other channels",
    value: "Marketplace, POS and marketing channels own their own signup, so a form cannot be delivered to them.",
  },
];

const S = (id: string) => sectionProps("multi-storefront", id);

export function MultiStorefrontGuide() {
  return (
    <>
      <StepCards steps={STEPS} hideOnPhone={false} />

      <ProseSection
        {...S("before-you-start")}
        intro="Multi-storefront is on the Pro and Enterprise plans. Pro serves up to 3 storefronts at once, your default storefront included. Enterprise serves 4 or more, agreed with you."
      >
        <p>The Storefronts screen lists your BigCommerce channels. What a channel can do depends on its type:</p>
        <DefinitionRows rows={CHANNEL_TYPES} keyWidth={200} className={styles.stackedRows} />
        <p>
          The app needs access to your channels. If BigCommerce refuses it, turning multi-storefront on fails and the
          app asks you to reinstall, for example &quot;This store has not authorized channel access. Reinstall the app
          to grant it.&quot; Reinstall the app from the BigCommerce Apps page. Your forms, storefront setup and settings
          are kept.
        </p>
        <PlaceholderBox as="span" className={styles.review}>
          For review: the full list of BigCommerce permissions multi-storefront needs, and whether existing installs must
          re-authorize.
        </PlaceholderBox>
      </ProseSection>

      <ProseSection
        {...S("turn-it-on")}
        intro={
          <>
            Open Storefronts and click &quot;Enable multi-storefront&quot;. It stays off until you do, and turning it on
            changes nothing about your default storefront.
          </>
        }
      >
        <DocsFigure {...FIGURES.msfOff} caption="Storefronts, before multi-storefront is on: click Enable multi-storefront." />
        <p>
          The app checks your channel access with BigCommerce first. Once it’s on, you set up each storefront from the
          same screen.
        </p>
      </ProseSection>

      <ProseSection
        {...S("set-up-a-storefront")}
        intro={
          <>
            In the Storefronts list, click &quot;Set up&quot; next to a storefront under &quot;Not set up yet&quot;, or
            open one you’ve set up before. Under &quot;Signup form&quot;, choose a form from &quot;Select a form…&quot;
            and click &quot;Assign&quot;.
          </>
        }
      >
        <DocsFigure {...FIGURES.storefrontUk} caption="A storefront's page: its form, the Serving switch at the top right, and shortcuts to its requests, emails and approval settings." />
        <p>Every storefront picks from the same library of saved forms.</p>
        <Callout tone="note">
          A storefront can’t be switched on without a form. Until it has one, the app shows &quot;No form assigned yet —
          this storefront cannot be switched on until one is.&quot;
        </Callout>
        <h3>Assign one form to several storefronts</h3>
        <DocsFigure {...FIGURES.storefronts} caption="Apply a form to several storefronts sits beside the storefront list." />
        <p>
          Use &quot;Apply a form to several storefronts&quot; to assign one form to up to 50 storefronts at once. It only
          assigns the form: each storefront keeps its own on/off switch.
        </p>
        <p>
          Headless storefronts also need the embed snippet on your site. See{" "}
          <Link href="/docs/headless/">Headless storefronts</Link>.
        </p>
      </ProseSection>

      <ProseSection
        {...S("switch-it-on")}
        intro="Use the switch at the top of the storefront to start serving your form. On a Stencil storefront, switching it on installs the form script for you."
      >
        <p>
          On a headless storefront, switching it on installs nothing. The form appears once your developer has added the
          container and the script.
        </p>
        <p>
          At your plan’s limit you can’t switch another storefront on. On Pro the app shows &quot;You have reached the
          Pro limit of 3 serving storefronts&quot;. Switch one off first, or <Link href="/contact/">contact us</Link>{" "}
          about Enterprise.
        </p>
        <Callout>
          &quot;Remove configuration&quot; is not a stronger &quot;off&quot;. It deletes the storefront’s form assignment
          and the email, notification and cooldown settings you set for it, and can’t be undone. Anything still loading
          the form on that site then falls back to your default storefront’s form. If you’re not sure the site is gone,
          leave it switched off instead.
        </Callout>
      </ProseSection>

      <ProseSection
        {...S("per-storefront-settings")}
        intro={
          <>
            Choose a storefront in the switcher at the top of the app, or &quot;All storefronts&quot; for your defaults. A
            band above each settings screen says which one you’re editing: &quot;Editing the defaults&quot;, or
            &quot;Editing&quot; followed by the storefront’s name.
          </>
        }
      >
        <p>
          With a storefront selected, each setting shows Inherit or Override. Inherit keeps following your defaults,
          including later changes. Override gives that storefront its own value, and no other storefront changes.
        </p>
        <DocsFigure {...FIGURES.override} caption="Editing one storefront: tick Override on a setting to give that storefront its own value." />
        <p>A storefront can override:</p>
        <ul>
          <li>Sender details (From Email, From Name, Reply-To, Store Display Name) and the SMTP account.</li>
          <li>The five customer email templates, and their versions per customer group and per form answer.</li>
          <li>Email branding: logo, banner and social links.</li>
          <li>Which emails are sent, in Settings → Email Sending.</li>
          <li>Team notifications.</li>
          <li>The rejection cooldown.</li>
          <li>Customer-group rules.</li>
        </ul>
        <p>Forms aren’t overridden: there is one shared library, and each storefront is assigned a form from it.</p>
      </ProseSection>

      <ProseSection
        {...S("requests-by-storefront")}
        intro="Every signup records the storefront it came from. Filter the request queue and the Dashboard by storefront, or switch between storefronts from the bar at the top."
      >
        <DocsFigure {...FIGURES.switcher} caption="The storefront switcher, next to the logo." />
      </ProseSection>

      <ProseSection
        {...S("turn-it-off")}
        intro={
          <>
            Click &quot;Turn off&quot; on the Multi-storefront card and confirm. Every storefront except your default
            stops serving a form right away, and their storefront scripts are removed.
          </>
        }
      >
        <p>
          Their form assignments are kept, but each storefront comes back switched off, so you turn them on again
          yourself.
        </p>
        <p>
          If you move to a plan without multi-storefront, it switches off when the change takes effect. Other
          storefronts stop serving, their forms and settings are kept, and all signup requests go into one queue with
          your default settings. See <Link href="/docs/plans-and-billing/">Plans and billing</Link>.
        </p>
      </ProseSection>
    </>
  );
}
