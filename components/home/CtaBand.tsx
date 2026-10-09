import { Button } from "@/components/ui/Button";
import { LINKS } from "@/lib/site";
import styles from "./CtaBand.module.css";

/** Closing call to action: inset gradient band (desktop two buttons, phone one). */
export function CtaBand() {
  return (
    <section className={`${styles.band} onDark`}>
      <div className={styles.text}>
        <h2 className={`disp ${styles.title}`}>Own your signup flow today.</h2>
        <p className={`${styles.sub} onlyDesktop`}>
          Install free, build your form and approve your first customer in minutes.
        </p>
        <p className={`${styles.subPhone} onlyPhone`}>Install free and approve your first customer in minutes.</p>
      </div>
      <div className={styles.actions}>
        <Button href={LINKS.marketplace} variant="white" size="lg" className={styles.install}>
          Install free on BigCommerce
        </Button>
        <Button href="/docs/" variant="ghost" size="lg" className="onlyDesktop">
          Read the docs
        </Button>
      </div>
    </section>
  );
}
