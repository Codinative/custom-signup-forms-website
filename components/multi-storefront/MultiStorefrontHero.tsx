import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { LINKS } from "@/lib/site";
import { FRAME_URL, HERO_SHOT } from "./content";
import styles from "./MultiStorefrontHero.module.css";

/** Dark hero: starts at the top of the page, under the absolutely positioned dark SiteHeader. */
export function MultiStorefrontHero() {
  return (
    <section className={`${styles.hero} onDark`}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Tag tone="glass" className={styles.tag}>
            Pro and Enterprise
          </Tag>
          <h1 className={`disp ${styles.title}`}>A different signup form on every storefront.</h1>
          <p className={`${styles.sub} onlyDesktop`}>
            BigCommerce lets one store run several storefronts. Multi-storefront gives each its own form, emails
            and approval rules, while anything you do not override keeps following the defaults you already have.
          </p>
          <p className={`${styles.subPhone} onlyPhone`}>
            Each storefront gets its own form, emails and approval rules. Anything you do not override follows your
            defaults.
          </p>
          <div className={styles.ctas}>
            <Button href={LINKS.marketplace} variant="white" className={styles.cta}>
              Start a 7-day Pro trial
            </Button>
            <Button href="/pricing/" variant="ghost" className={styles.cta}>
              See pricing
            </Button>
          </div>
        </div>
        <BrowserFrame
          {...HERO_SHOT}
          url={FRAME_URL}
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 72px), (max-width: 1279px) calc(53.5vw - 80px), (max-width: 1439px) calc(53.5vw - 137px), 632px"
          priority
          className={styles.shot}
          imgClassName={styles.shotImg}
        />
      </div>
    </section>
  );
}
