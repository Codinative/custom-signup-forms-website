import { Eyebrow } from "@/components/ui/Eyebrow";
import { FEATURES } from "./content";
import { FeatureRow } from "./FeatureRow";
import styles from "./Features.module.css";

/** "What you get": heading plus four feature rows. `#features` is linked from the header, menu and footer. */
export function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.head}>
        <Eyebrow className="onlyDesktop">What you get</Eyebrow>
        <h2 className={`disp ${styles.title}`}>
          {'Everything between "Create account" and a customer in the right group.'}
        </h2>
      </div>
      {FEATURES.map((feature) => (
        <FeatureRow key={feature.id} feature={feature} />
      ))}
    </section>
  );
}
