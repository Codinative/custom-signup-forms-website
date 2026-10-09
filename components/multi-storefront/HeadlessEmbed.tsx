import Link from "next/link";
import { CodeBlock, CodeFileHeader } from "@/components/ui/CodeBlock";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { EMBED_SNIPPET } from "./content";
import styles from "./HeadlessEmbed.module.css";

/** "Headless storefronts": copy + links beside the embed snippet. Phone: short copy, no links, no code header. */
export function HeadlessEmbed() {
  return (
    <section className={styles.section}>
      <div className={styles.copy}>
        <Eyebrow>Headless storefronts</Eyebrow>
        <h2 className={`disp ${styles.title}`}>Catalyst, Next.js, Nuxt - paste two lines.</h2>
        <p className={`body onlyDesktop ${styles.lead}`}>
          Headless storefronts get an embed snippet instead of a script injection. Drop an empty container where
          your signup form was and load the script. Each storefront&apos;s snippet is signed, so a request can only
          claim the storefront it came from.
        </p>
        <div className={`onlyDesktop ${styles.links}`}>
          <Link href="/docs/headless/" className={styles.link}>
            Headless integration guide <Icon name="arrowRight" size={16} />
          </Link>
          <Link href="/docs/api/" className={styles.link}>
            Native app? Use the API <Icon name="arrowRight" size={16} />
          </Link>
        </div>
        <p className="body onlyPhone">Building a native app instead? Use the API integration.</p>
      </div>
      <CodeBlock
        header={<CodeFileHeader filename="signup.tsx" tag="Embed snippet" className="onlyDesktop" />}
        lines={EMBED_SNIPPET}
        className={styles.code}
        preClassName={styles.pre}
        label="Embed snippet"
      />
    </section>
  );
}
