import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { COMPARE_COPY, FEATURE_GROUPS } from "@/lib/content/featureMatrix";
import { PLANS } from "@/lib/content/plans";
import { FeatureMark } from "./FeatureMark";
import styles from "./ComparisonTable.module.css";

export type ComparisonTableProps = {
  /** id of the visible heading that names the table */
  labelledBy: string;
  className?: string;
};

/**
 * Desktop "Compare plans" grid from Pricing.dc.html with ARIA table roles. From 768 to 1279 it
 * scrolls inside its own container so the page never scrolls sideways.
 */
export function ComparisonTable({ labelledBy, className }: ComparisonTableProps) {
  return (
    <div className={[styles.scroller, className].filter(Boolean).join(" ")}>
      <div role="table" aria-labelledby={labelledBy} className={styles.table}>
        <div role="row" className={styles.headRow}>
          <span role="cell" className={styles.note}>
            {COMPARE_COPY.note}
          </span>
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              role="columnheader"
              aria-labelledby={`compare-plan-${plan.id}`}
              className={styles.planHead}
            >
              <span
                id={`compare-plan-${plan.id}`}
                className={["disp", styles.planName, plan.featured ? styles.featured : undefined]
                  .filter(Boolean)
                  .join(" ")}
              >
                {plan.name}
              </span>
              <Button href={plan.cta.href} variant={plan.cta.variant} size="sm" className={styles.planCta}>
                {plan.cta.compareLabel}
              </Button>
            </div>
          ))}
        </div>
        {FEATURE_GROUPS.map((group) => (
          <Fragment key={group.title}>
            <div role="row" className={styles.groupRow}>
              <span role="rowheader" aria-colspan={PLANS.length + 1} className={styles.groupTitle}>
                <Icon name={group.icon} size={18} className={styles.groupIcon} />
                {group.title}
              </span>
            </div>
            {group.rows.map((row) => (
              <div key={row.label} role="row" className={styles.row}>
                <span role="rowheader" className={styles.label}>
                  {row.label}
                </span>
                {PLANS.map((plan) => (
                  <div key={plan.id} role="cell" className={styles.cell}>
                    <FeatureMark value={row.values[plan.id]} />
                  </div>
                ))}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
