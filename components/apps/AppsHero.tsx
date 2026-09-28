import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";
import { footerCopy } from "@/lib/content/navigation";
import styles from "./AppsHero.module.css";

/** /apps hero. Phone: shorter body copy and no partner tag. */
export function AppsHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Eyebrow>More from Codinative</Eyebrow>
          <h1 className={`disp ${styles.title}`}>Apps for BigCommerce, built by one certified partner.</h1>
          <p className="lede onlyDesktop">
            Codinative builds only for BigCommerce. Each app installs from the marketplace, runs without theme
            edits, and is supported by the same team.
          </p>
          <p className="body onlyPhone">
            Each installs from the marketplace, needs no theme edits, and is supported by the same team.
          </p>
        </div>
        <Tag tone="navy" icon="shieldCheck" iconSize={15} className={`${styles.partner} onlyDesktop`}>
          {footerCopy.partner}
        </Tag>
      </div>
    </section>
  );
}
