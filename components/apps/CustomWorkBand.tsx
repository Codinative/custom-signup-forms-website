import { Button } from "@/components/ui/Button";
import styles from "./CustomWorkBand.module.css";

/** Custom-work band under the cards. Desktop only (not on the phone artboard). */
export function CustomWorkBand() {
  return (
    <div className={`${styles.wrap} onlyDesktop`}>
      <section className={styles.band}>
        <div className={styles.text}>
          <h2 className={styles.title}>Need something the marketplace doesn&apos;t have?</h2>
          <p className="body">Codinative also builds custom BigCommerce apps and integrations.</p>
        </div>
        <Button href="/contact/" variant="outline">
          Talk to Codinative
        </Button>
      </section>
    </div>
  );
}
