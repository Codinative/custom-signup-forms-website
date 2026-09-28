import { Icon } from "@/components/ui/Icon";
import type { FeatureValue } from "@/lib/content/featureMatrix";
import styles from "./FeatureMark.module.css";

export type FeatureMarkProps = {
  value: FeatureValue;
};

/** One comparison value: text, a green check ("Included") or a grey en dash ("Not included"). */
export function FeatureMark({ value }: FeatureMarkProps) {
  if (typeof value === "string") {
    return <span className={styles.text}>{value}</span>;
  }
  if (value) {
    return (
      <>
        <span className={styles.check}>
          <Icon name="check" size={18} strokeWidth={2.5} />
        </span>
        <span className="srOnly">Included</span>
      </>
    );
  }
  return (
    <>
      <span className={styles.dash} aria-hidden="true">
        –
      </span>
      <span className="srOnly">Not included</span>
    </>
  );
}
