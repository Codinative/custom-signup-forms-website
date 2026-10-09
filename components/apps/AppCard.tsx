import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { APP_CARD_COPY, SIGNUP_SCREENSHOT, type AppEntry } from "@/lib/content/apps";
import { CheckoutMock } from "./CheckoutMock";
import { StickyBarMock } from "./StickyBarMock";
import styles from "./AppCard.module.css";

export type AppCardProps = {
  app: AppEntry;
};

function Preview({ preview }: { preview: AppEntry["preview"] }) {
  if (preview === "checkout") return <CheckoutMock />;
  if (preview === "stickyBar") return <StickyBarMock />;
  return (
    <BrowserFrame
      {...SIGNUP_SCREENSHOT}
      priority
      sizes="(max-width: 767px) calc(100vw - 88px), (max-width: 1279px) calc(50vw - 110px), (max-width: 1439px) calc(33.3vw - 156px), 324px"
      className={styles.shot}
    />
  );
}

/** One /apps card (a list item): preview, identity, copy, checks and the two CTAs. */
export function AppCard({ app }: AppCardProps) {
  return (
    <li className={styles.card}>
      <Preview preview={app.preview} />
      <div className={styles.body}>
        <div className={styles.identity}>
          <span className={styles.appIcon}>
            <Icon name={app.icon} size={22} strokeWidth={1.9} />
          </span>
          <div className={styles.names}>
            <h2 className={`disp ${styles.name}`}>{app.name}</h2>
            <span className={styles.tagline}>{app.tagline}</span>
          </div>
        </div>
        {app.current ? (
          <Tag tone="blue" className={styles.here}>
            {APP_CARD_COPY.currentTag}
          </Tag>
        ) : null}
        <p className="body">{app.description}</p>
        <ul className={styles.features}>
          {app.features.map((feature) => (
            <li key={feature} className={styles.feature}>
              <Icon name="check" size={16} strokeWidth={2.5} className={styles.check} />
              {feature}
            </li>
          ))}
        </ul>
        <div className={styles.ctas}>
          <Button href={app.siteUrl} variant="outline" size="sm" className={styles.cta}>
            {APP_CARD_COPY.siteLabel}
            <span className="srOnly">: {app.name}</span>
          </Button>
          {app.marketplaceUrl ? (
            <Button href={app.marketplaceUrl} variant="primary" size="sm" className={styles.cta}>
              {APP_CARD_COPY.marketplaceLabel}
              <span className="srOnly">: {app.name}</span>
            </Button>
          ) : (
            <span className={`${styles.cta} ${styles.soon}`}>
              {APP_CARD_COPY.comingSoonLabel}
              <span className="srOnly"> to the BigCommerce marketplace: {app.name}</span>
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
