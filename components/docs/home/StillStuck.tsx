import { Button } from "@/components/ui/Button";
import { LINKS } from "@/lib/site";
import styles from "./StillStuck.module.css";

/** Docs.dc.html "Still stuck?" box (desktop only; MobileDocs.dc.html has none). The email is plain text as designed. */
export function StillStuck() {
  return (
    <div className={`${styles.box} onlyDesktop`}>
      <div className={styles.text}>
        <span className={styles.title}>Still stuck?</span>
        <p className="body">Email {LINKS.email}. We reply within one business day.</p>
      </div>
      <Button href="/contact/" variant="outline">
        Contact support
      </Button>
    </div>
  );
}
