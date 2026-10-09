import { PLAN_FIT, PLANS } from "@/lib/content/plans";
import styles from "./PlanFit.module.css";

/** "Which plan fits?" strip from Pricing.dc.html. Not on the phone artboard. */
export function PlanFit() {
  return (
    <section className={`onlyDesktop ${styles.section}`}>
      <div className={styles.grid}>
        <div className={styles.intro}>
          <h2 className={`disp ${styles.title}`}>{PLAN_FIT.title}</h2>
          <p className={styles.sub}>{PLAN_FIT.sub}</p>
        </div>
        {PLANS.map((plan) => (
          <div key={plan.id} className={styles.cell}>
            <p className={styles.name}>{plan.name}</p>
            <p className={styles.line}>{plan.fitLine}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
