import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./PricingHero.module.css";

/** Pricing.dc.html / MobilePricing.dc.html hero. The phone has its own, shorter sub line. */
export function PricingHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <Eyebrow>Pricing</Eyebrow>
        <h1 className={`disp ${styles.title}`}>Start free. Pay when you need emails, groups or more storefronts.</h1>
        <p className={`lede onlyDesktop ${styles.lede}`}>
          Prices in USD per month, before tax. Paid plans start with a 7-day free trial. No setup fee and no
          per-signup charges.
        </p>
        <p className="body onlyPhone">
          USD per month, before tax. Paid plans start with a 7-day free trial. No setup fee.
        </p>
      </div>
    </section>
  );
}
