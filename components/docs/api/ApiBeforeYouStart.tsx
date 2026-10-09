import { Callout } from "@/components/docs/Callout";
import { DefinitionRows, type DefinitionRow } from "@/components/docs/DefinitionRows";
import { ProseSection } from "@/components/docs/Prose";
import styles from "./ApiBeforeYouStart.module.css";

const IDENTIFIERS: DefinitionRow[] = [
  {
    key: "pub",
    value: "Your store’s public identifier. Safe to ship in an app.",
    phoneValue: "Your store’s public identifier.",
  },
  {
    key: "ch",
    value: "The storefront (BigCommerce channel) the signup belongs to. Leave it out for your default storefront.",
    phoneValue: "The storefront. Omit for your default.",
  },
  {
    key: "sig",
    value: "The storefront’s signature. It proves the request is allowed to claim that storefront; required on submit.",
    phoneValue: "The storefront signature; required on submit.",
  },
];

/** "Before you start": the three identifiers. The phone design keeps only the identifier cards. */
export function ApiBeforeYouStart() {
  return (
    <ProseSection id="before-you-start">
      <div className={`${styles.headingBlock} onlyDesktop`}>
        <h2 className={`disp ${styles.h2}`}>Before you start</h2>
        <p className="body">
          Three values identify the store and storefront. Copy them from the storefront’s embed snippet on the
          Storefronts screen.
        </p>
      </div>
      <DefinitionRows rows={IDENTIFIERS} />
      <Callout className="onlyDesktop">
        Never collect a password in your app for this. Passwords are discarded; on approval the customer receives an
        email to set their own.
      </Callout>
    </ProseSection>
  );
}
