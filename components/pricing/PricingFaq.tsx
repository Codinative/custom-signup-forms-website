import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FaqStatic } from "@/components/ui/FaqStatic";
import { pricingFaqs } from "@/lib/content/faqs";
import styles from "./PricingFaq.module.css";

/**
 * "Billing questions". Desktop: eyebrow + "Plans, trials and changes." beside every answer.
 * Phone: "Billing questions" as the heading over a compact accordion.
 */
export function PricingFaq() {
  return (
    <section className={styles.section}>
      <div className={`onlyDesktop ${styles.intro}`}>
        <Eyebrow>Billing questions</Eyebrow>
        <h2 className={`disp ${styles.title}`}>Plans, trials and changes.</h2>
      </div>
      <FaqStatic items={pricingFaqs} className="onlyDesktop" />
      <h2 className={`disp onlyPhone ${styles.phoneTitle}`}>Billing questions</h2>
      <FaqAccordion items={pricingFaqs} variant="compact" className="onlyPhone" />
    </section>
  );
}
