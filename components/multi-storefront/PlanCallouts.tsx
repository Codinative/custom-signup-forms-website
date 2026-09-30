import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { PLANS, type Plan, type PlanId } from "@/lib/content/plans";
import { PLAN_CALLOUTS } from "./content";
import styles from "./PlanCallouts.module.css";

function planById(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

/** Pro / Enterprise compact cards. Names, prices, CTA targets and styling come from PLANS. */
export function PlanCallouts() {
  return (
    <section className={styles.section}>
      {PLAN_CALLOUTS.map((callout) => {
        const plan = planById(callout.planId);
        const price = callout.priceText ?? `${plan.priceLabel} ${plan.period}`;
        return (
          <div key={plan.id} className={plan.featured ? `${styles.card} ${styles.featured}` : styles.card}>
            <Tag tone={plan.featured ? "blue" : "security"} className={styles.tag}>
              {`${plan.name} · ${price}`}
            </Tag>
            <h3 className={`disp ${styles.title}`}>{callout.title}</h3>
            <p className="body onlyDesktop">{callout.body}</p>
            <Button href={plan.cta.href} variant={plan.cta.variant} className={styles.cta}>
              {callout.ctaLabel}
            </Button>
          </div>
        );
      })}
    </section>
  );
}
