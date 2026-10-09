import type { ReactNode } from "react";
import prose from "@/components/docs/Prose.module.css";
import { Tag } from "@/components/ui/Tag";
import styles from "./UserGuide.module.css";

/** Where a screen lives in the app, e.g. Form Builder → Builder. */
export function UiPath({ steps }: { steps: string[] }) {
  return (
    <p className={styles.path}>
      In the app:{" "}
      {steps.map((step, i) => (
        <span key={step}>
          {i > 0 ? " → " : null}
          <strong>{step}</strong>
        </span>
      ))}
    </p>
  );
}

/** A subsection heading, optionally with the plans it needs. */
export function GuideH3({ id, children, plan }: { id?: string; children: ReactNode; plan?: string }) {
  if (!plan) return <h3 id={id} className={prose.h3}>{children}</h3>;
  return (
    <div className={styles.titleRow}>
      <h3 id={id} className={prose.h3}>{children}</h3>
      <Tag tone="blue">{plan}</Tag>
    </div>
  );
}

export const PLAN_PAID = "Standard and up";
export const PLAN_MULTI = "Pro and Enterprise";
