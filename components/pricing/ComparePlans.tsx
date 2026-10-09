import { Eyebrow } from "@/components/ui/Eyebrow";
import { COMPARE_COPY, COMPARE_PHONE_DEFAULT_PLAN, FEATURE_GROUPS } from "@/lib/content/featureMatrix";
import { PLANS } from "@/lib/content/plans";
import { ComparisonTable } from "./ComparisonTable";
import { PlanSwitcher } from "./PlanSwitcher";
import styles from "./ComparePlans.module.css";

const TITLE_ID = "compare-title";

/** "Compare plans" (#compare, linked from the homepage): table ≥768, plan switcher on the phone. */
export function ComparePlans() {
  return (
    <section id="compare" className={styles.section}>
      <div className={styles.heading}>
        <Eyebrow>{COMPARE_COPY.eyebrow}</Eyebrow>
        <h2 id={TITLE_ID} className={`disp ${styles.title}`}>
          {COMPARE_COPY.title}
        </h2>
      </div>
      <ComparisonTable labelledBy={TITLE_ID} className="onlyDesktop" />
      <PlanSwitcher
        plans={PLANS.map(({ id, name }) => ({ id, name }))}
        groups={FEATURE_GROUPS}
        defaultPlan={COMPARE_PHONE_DEFAULT_PLAN}
        labelledBy={TITLE_ID}
        className="onlyPhone"
      />
    </section>
  );
}
