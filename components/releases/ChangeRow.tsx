import { Tag } from "@/components/ui/Tag";
import { CHANGE_LABELS, type ReleaseChange } from "@/lib/content/releases";
import styles from "./ChangeRow.module.css";

export type ChangeRowProps = {
  change: ReleaseChange;
};

/** One change in a release: type tag (tone = change type), then the title and optional body. */
export function ChangeRow({ change }: ChangeRowProps) {
  return (
    <div className={styles.row}>
      <Tag tone={change.type} className={styles.tag}>
        {CHANGE_LABELS[change.type]}
      </Tag>
      <div className={styles.text}>
        <span className={styles.title}>{change.title}</span>
        {change.body ? <p className={`body ${styles.bodyText}`}>{change.body}</p> : null}
      </div>
    </div>
  );
}
