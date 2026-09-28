import { PlaceholderBox } from "@/components/ui/PlaceholderBox";
import styles from "./ApiPlanTag.module.css";

/** The "Pro and Enterprise" title tag. Which plans get API access is still open, so it is a placeholder. */
export function ApiPlanTag() {
  return (
    <PlaceholderBox as="span" className={styles.tag}>
      Pro and Enterprise
    </PlaceholderBox>
  );
}
