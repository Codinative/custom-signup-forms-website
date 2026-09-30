import type { CSSProperties } from "react";
import Link from "next/link";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { LINKS } from "@/lib/site";
import { APP_URL_BAR, HERO_SCREENSHOT } from "./content";
import styles from "./HomeHero.module.css";

const CHECKS = ["Free plan, no card", "7-day trial on paid plans", "No setup fee"];

// The screenshot keeps the design image's ratio, whichever WebP variant (rounded height) loads.
const SHOT_RATIO = { "--shot-ratio": `${HERO_SCREENSHOT.width} / ${HERO_SCREENSHOT.height}` } as CSSProperties;

const SHOT_SIZES =
  "(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc(100vw - 80px), (max-width: 1439px) calc(100vw - 240px), 1200px";

/** Main.dc.html / MobileHome.dc.html hero. Sits under the absolutely positioned dark SiteHeader. */
export function HomeHero() {
  return (
    <section className={`${styles.hero} onDark`}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.content}>
          <Link href="/release-notes/#v2-0-0" className={styles.pill}>
            <Tag tone="white" className={styles.pillTag}>
              New
            </Tag>
            <span className="onlyDesktop">Multi-storefront, four plans and a Free plan</span>
            <span className="onlyPhone">Multi-storefront and a Free plan</span>
            <Icon name="arrowRight" size={16} className="onlyDesktop" />
            <span className={`${styles.pillEnd} onlyDesktop`} />
          </Link>
          <h1 className={`disp ${styles.title}`}>Your signup form and your approval, on every storefront.</h1>
          <p className={`${styles.sub} onlyDesktop`}>
            Replace the default BigCommerce account form with one you design, review every applicant before they can
            buy, and place them in the right customer group. Run a different form on each storefront when you grow.
          </p>
          <p className={`${styles.subPhone} onlyPhone`}>
            Replace the default BigCommerce account form with one you design, and review every applicant before they
            can buy.
          </p>
          <div className={styles.ctas}>
            <Button href={LINKS.marketplace} variant="white" size="lg" icon="store" className={styles.cta}>
              Install free on BigCommerce
            </Button>
            <Button href="/pricing/" variant="ghost" size="lg" className={styles.cta}>
              See pricing
            </Button>
          </div>
          <div className={`${styles.checks} onlyDesktop`}>
            {CHECKS.map((check) => (
              <span key={check} className={styles.check}>
                <Icon name="check" size={16} strokeWidth={2.5} />
                {check}
              </span>
            ))}
          </div>
          <span className={`${styles.checksPhone} onlyPhone`}>{CHECKS.join(" · ")}</span>
        </div>
        <div className={styles.shot} style={SHOT_RATIO}>
          <BrowserFrame
            src={HERO_SCREENSHOT.src}
            width={HERO_SCREENSHOT.width}
            height={HERO_SCREENSHOT.height}
            alt={HERO_SCREENSHOT.alt}
            sizes={SHOT_SIZES}
            url={APP_URL_BAR}
            priority
            className={styles.frame}
            imgClassName={styles.shotImg}
          />
        </div>
      </div>
    </section>
  );
}
