import { Eyebrow } from "@/components/ui/Eyebrow";
import { HOW_STEPS } from "./content";
import styles from "./HowItWorks.module.css";

/** "How it works": heading beside three numbered steps. Phone: no eyebrow, white background. */
export function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <Eyebrow className="onlyDesktop">How it works</Eyebrow>
          <h2 className={`disp ${styles.title}`}>Three steps, and your default storefront never changes.</h2>
        </div>
        <ol className={styles.steps}>
          {HOW_STEPS.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={`mono ${styles.num}`}>{i + 1}</span>
              <div className={styles.stepText}>
                <span className={styles.stepTitle}>{step.title}</span>
                <p className="body">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
