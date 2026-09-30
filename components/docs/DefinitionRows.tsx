import type { CSSProperties, ReactNode } from "react";
import styles from "./DefinitionRows.module.css";

export type DefinitionRow = {
  key: string;
  value: ReactNode;
  /** Shorter copy for the phone cards (MobileApiDocs.dc.html). */
  phoneValue?: ReactNode;
};

export type DefinitionRowsProps = {
  rows: DefinitionRow[];
  /** Desktop key column in px (design: 120). */
  keyWidth?: number;
  className?: string;
};

/** ApiDocs.dc.html identifier rows (pub · ch · sig); separate cards on phone. */
export function DefinitionRows({ rows, keyWidth, className }: DefinitionRowsProps) {
  const style = keyWidth ? ({ "--key-w": `${keyWidth}px` } as CSSProperties) : undefined;
  return (
    <dl className={[styles.rows, className].filter(Boolean).join(" ")} style={style}>
      {rows.map((row) => (
        <div key={row.key} className={styles.row}>
          <dt className={`mono ${styles.key}`}>{row.key}</dt>
          <dd className={styles.value}>
            {row.phoneValue ? (
              <>
                <span className="onlyDesktop">{row.value}</span>
                <span className="onlyPhone">{row.phoneValue}</span>
              </>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
