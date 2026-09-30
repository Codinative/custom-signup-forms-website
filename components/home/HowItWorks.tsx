import { Eyebrow } from "@/components/ui/Eyebrow";
import { STEPS } from "./content";
import styles from "./HowItWorks.module.css";

/** "How it works" (desktop artboard only; hidden below 768). */
export function HowItWorks() {
  return (
    <section className={`${styles.section} onlyDesktop`}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <Eyebrow>How it works</Eyebrow>
            <h2 className={`disp ${styles.title}`}>Live in three steps.</h2>
          </div>
          <p className={`body ${styles.intro}`}>
            No theme edits and no developer. The default BigCommerce form comes back the moment you switch yours off.
          </p>
        </div>
        <div className={styles.grid}>
          {STEPS.map((step) => (
            <div key={step.label} className={styles.card}>
              <span className={`mono ${styles.step}`}>{step.label}</span>
              <h3 className={`disp ${styles.cardTitle}`}>{step.title}</h3>
              <p className="body">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
