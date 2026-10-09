import { Eyebrow } from "@/components/ui/Eyebrow";
import { docsEntries } from "@/lib/content/docsIndex";
import { DocsSearch } from "./DocsSearch";
import styles from "./DocsHero.module.css";

/** Docs.dc.html hero (centred) · MobileDocs.dc.html hero (left-aligned, no lede). */
export function DocsHero() {
  const entries = docsEntries.map(({ href, title, description }) => ({ href, title, description }));
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <Eyebrow>Documentation</Eyebrow>
        <h1 className={`disp ${styles.title}`}>Everything to set up and run your signup flow.</h1>
        <p className={`lede onlyDesktop ${styles.lede}`}>
          Guides for store owners, and integration docs for developers building headless storefronts and apps.
        </p>
        <DocsSearch entries={entries} className={styles.search} />
      </div>
    </section>
  );
}
