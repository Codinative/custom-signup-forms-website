import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./EnterpriseBand.module.css";

/** Navy Enterprise band. The phone drops the icons and uses its own, shorter line. */
export function EnterpriseBand() {
  return (
    <div className={styles.wrap}>
      <section className={`onDark ${styles.band}`}>
        <div className={styles.intro}>
          <div className={styles.iconBox}>
            <Icon name="building" size={26} strokeWidth={1.75} className={styles.icon} />
          </div>
          <div className={styles.text}>
            <h2 className={`disp ${styles.title}`}>Running four or more storefronts?</h2>
            <p className={`onlyDesktop ${styles.body}`}>
              Enterprise sets the storefront count with you, adds an onboarding call, priority support with an SLA,
              and invoicing on terms.
            </p>
            <p className={`onlyPhone ${styles.phoneBody}`}>
              Enterprise sets the count with you, plus onboarding, an SLA and invoicing on terms.
            </p>
          </div>
        </div>
        <Button href="/contact/" variant="white" icon="mail" className={styles.cta}>
          Contact us about Enterprise
        </Button>
      </section>
    </div>
  );
}
