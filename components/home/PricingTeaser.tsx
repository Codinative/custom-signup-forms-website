import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { PLANS, type Plan } from "@/lib/content/plans";
import styles from "./PricingTeaser.module.css";

/** Main.dc.html card. The 46px blurb min-height leaves Standard's 3-line blurb pushing its CTA lower, as designed. */
function TeaserCard({ plan }: { plan: Plan }) {
  return (
    <div className={plan.featured ? `${styles.card} ${styles.featured}` : styles.card}>
      {plan.badge ? <Tag tone="blue">{plan.badge}</Tag> : <span className={styles.badgeSpace} />}
      <span className={`disp ${styles.name}`}>{plan.name}</span>
      <div className={styles.priceRow}>
        <span className={`disp ${styles.price}`}>{plan.teaserPriceLabel}</span>
        <span className={styles.period}>{plan.period}</span>
      </div>
      <p className={`body ${styles.blurb}`}>{plan.teaserBlurb}</p>
      <Button href={plan.cta.href} variant={plan.cta.variant} size="sm" className={styles.cta}>
        {plan.cta.teaserLabel}
      </Button>
    </div>
  );
}

/** MobileHome.dc.html card: name and price on one row, no badge, a space before the period. */
function TeaserPhoneCard({ plan }: { plan: Plan }) {
  return (
    <div className={plan.featured ? `${styles.phoneCard} ${styles.phoneFeatured}` : styles.phoneCard}>
      <div className={styles.phoneTop}>
        <span className={`disp ${styles.phoneName}`}>{plan.name}</span>
        <span>
          <span className={`disp ${styles.phonePrice}`}>{plan.teaserPriceLabel}</span>
          <span className={styles.phonePeriod}>{` ${plan.phoneTeaserPeriod}`}</span>
        </span>
      </div>
      <p className={`body ${styles.phoneBlurb}`}>{plan.phoneTeaserBlurb}</p>
      <Button href={plan.cta.href} variant={plan.cta.variant} size="sm" className={styles.phoneCta}>
        {plan.cta.teaserLabel}
      </Button>
    </div>
  );
}

/** Homepage pricing teaser, fed by the shared plans module. */
export function PricingTeaser() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className={`disp ${styles.title}`}>Start free. Upgrade when you grow.</h2>
          </div>
          <p className={`body ${styles.intro} onlyDesktop`}>
            USD per month, before tax. Paid plans start with a 7-day free trial. No setup fee, no per-signup charges.
          </p>
          <p className={`body ${styles.introPhone} onlyPhone`}>USD per month, before tax. No setup fee.</p>
        </div>
        <div className={`${styles.grid} onlyDesktop`}>
          {PLANS.map((plan) => (
            <TeaserCard key={plan.id} plan={plan} />
          ))}
        </div>
        <div className={`${styles.list} onlyPhone`}>
          {PLANS.map((plan) => (
            <TeaserPhoneCard key={plan.id} plan={plan} />
          ))}
        </div>
        <div className={styles.more}>
          <Link href="/pricing/#compare" className={styles.compare}>
            Compare every feature <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
