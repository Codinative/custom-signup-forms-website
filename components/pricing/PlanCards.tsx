import { PLANS } from "@/lib/content/plans";
import { PlanCard } from "./PlanCard";
import styles from "./PlanCards.module.css";

/** The four plan cards: 4 columns on desktop, 2 from 768 to 1279, stacked on the phone. */
export function PlanCards() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}
