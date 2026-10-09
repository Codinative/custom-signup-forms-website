"use client";

import { Fragment, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import type { FeatureGroup } from "@/lib/content/featureMatrix";
import type { PlanId } from "@/lib/content/plans";
import { FeatureMark } from "./FeatureMark";
import styles from "./PlanSwitcher.module.css";

export type PlanSwitcherProps = {
  plans: { id: PlanId; name: string }[];
  groups: FeatureGroup[];
  /** Selected on the server render, so the static HTML already shows its values. */
  defaultPlan: PlanId;
  /** id of the visible heading that names the tab list */
  labelledBy: string;
  className?: string;
};

/**
 * Phone "Compare plans" (MobilePricing.dc.html): a sticky segmented control (WAI-ARIA tabs,
 * automatic activation; arrow keys, Home and End move the selection) over one value column.
 */
export function PlanSwitcher({ plans, groups, defaultPlan, labelledBy, className }: PlanSwitcherProps) {
  const baseId = useId();
  const [selected, setSelected] = useState<PlanId>(defaultPlan);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelId = `${baseId}-panel`;
  const tabId = (id: PlanId) => `${baseId}-tab-${id}`;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = plans.length - 1;
    const targets: Partial<Record<string, number>> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    setSelected(plans[target].id);
    tabs.current[target]?.focus();
  };

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <div role="tablist" aria-labelledby={labelledBy} className={styles.tabs}>
        {plans.map((plan, index) => {
          const isSelected = plan.id === selected;
          return (
            <button
              key={plan.id}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={tabId(plan.id)}
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              className={styles.tab}
              onClick={() => setSelected(plan.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {plan.name}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={panelId} aria-labelledby={tabId(selected)} tabIndex={0}>
        {groups.map((group) => (
          <Fragment key={group.title}>
            <h3 className={styles.groupTitle}>
              <Icon name={group.icon} size={17} className={styles.groupIcon} />
              {group.title}
            </h3>
            <dl className={styles.rows}>
              {group.rows.map((row) => (
                <div key={row.label} className={styles.row}>
                  <dt className={styles.label}>{row.label}</dt>
                  <dd className={styles.value}>
                    <FeatureMark value={row.values[selected]} />
                  </dd>
                </div>
              ))}
            </dl>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
