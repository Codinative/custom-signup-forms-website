import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STOREFRONT_SETTINGS } from "./content";
import styles from "./PerStorefront.module.css";

/** "Per storefront": desktop 3×2 cards with an intro; phone list rows without it. */
export function PerStorefront() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Per storefront"
            title="Override what differs. Inherit the rest."
            className={styles.heading}
            titleClassName={styles.title}
          />
          <p className={`body onlyDesktop ${styles.intro}`}>
            Every setting shows whether it is inherited or overridden, so a storefront never drifts from your
            defaults by accident.
          </p>
        </div>
        <ul className={styles.grid}>
          {STOREFRONT_SETTINGS.map((item) => (
            <li key={item.title} className={styles.card}>
              <span className={styles.icon}>
                <Icon name={item.icon} size={22} strokeWidth={1.9} />
              </span>
              <div className={styles.text}>
                <h3 className={`disp ${styles.cardTitle}`}>{item.title}</h3>
                <p className={`body ${styles.cardBody}`}>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
