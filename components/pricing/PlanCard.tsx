import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import type { Plan } from "@/lib/content/plans";
import styles from "./PlanCard.module.css";

export type PlanCardProps = {
  plan: Plan;
};

/**
 * /pricing plan card, one DOM for both artboards. Name and price share `.head`: a row on the
 * phone, `display: contents` + `order` on desktop (name, tagline, then price). The phone drops
 * the spacer, the note and the divider.
 */
export function PlanCard({ plan }: PlanCardProps) {
  return (
    <div className={[styles.card, plan.featured ? styles.featured : undefined].filter(Boolean).join(" ")}>
      {plan.badge ? (
        <Tag tone="blue" className={styles.badge}>
          {plan.badge}
        </Tag>
      ) : (
        <span className={styles.spacer} aria-hidden="true" />
      )}
      <div className={styles.head}>
        <h2 className={`disp ${styles.name}`}>{plan.name}</h2>
        <p className={styles.priceRow}>
          <span className={`disp ${styles.price}`}>{plan.priceLabel}</span>
          {plan.period ? <span className={styles.period}>{` ${plan.period}`}</span> : null}
        </p>
      </div>
      <p className={`body ${styles.tagline}`}>{plan.tagline}</p>
      <Button href={plan.cta.href} variant={plan.cta.variant} className={styles.cta}>
        {plan.cta.label}
      </Button>
      <span className={styles.note}>{plan.note}</span>
      <div className={styles.divider} />
      {plan.lead ? <span className={styles.lead}>{plan.lead}</span> : null}
      <ul className={styles.list}>
        {plan.bullets.map((bullet) => (
          <li key={bullet} className={styles.item}>
            <Icon name="check" size={17} strokeWidth={2.5} className={styles.check} />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
