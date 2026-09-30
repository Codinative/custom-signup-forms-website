import type { CSSProperties } from "react";
import Link from "next/link";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { APP_URL_BAR, type Feature, type ResponsiveCopy, type Screenshot } from "./content";
import styles from "./FeatureRow.module.css";

// Screenshot column: 658px at 1440 (1200 content - 470 text - 72 gap); full width once stacked.
const SHOT_SIZES =
  "(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 72px), (max-width: 1279px) calc(100vw - 620px), (max-width: 1439px) calc(100vw - 782px), 658px";

export type FeatureRowProps = {
  feature: Feature;
};

function HeadingCopy({ copy }: { copy: ResponsiveCopy }) {
  if (!copy.phone) return copy.desktop;
  return (
    <>
      <span className="onlyDesktop">{copy.desktop}</span>
      <span className="onlyPhone">{copy.phone}</span>
    </>
  );
}

function BodyCopy({ copy }: { copy: ResponsiveCopy }) {
  if (!copy.phone) return <p className={`body ${styles.desc}`}>{copy.desktop}</p>;
  return (
    <>
      <p className={`body ${styles.desc} onlyDesktop`}>{copy.desktop}</p>
      <p className={`body ${styles.desc} onlyPhone`}>{copy.phone}</p>
    </>
  );
}

// The screenshot keeps the design image's ratio, whichever WebP variant (rounded height) loads.
function shotRatio({ width, height }: Screenshot) {
  return { "--shot-ratio": `${width} / ${height}` } as CSSProperties;
}

/** One "What you get" row: text beside the screenshot (≥1024), text over it below that. */
export function FeatureRow({ feature }: FeatureRowProps) {
  const { eyebrow, tag, title, body, checks, link, image, reverse } = feature;
  return (
    <div className={[styles.row, reverse ? styles.reverse : undefined].filter(Boolean).join(" ")}>
      <div className={styles.text}>
        <div className={styles.labels}>
          <Eyebrow>{eyebrow}</Eyebrow>
          {tag ? (
            <>
              <Tag tone="new" className="onlyDesktop">
                {tag.desktop}
              </Tag>
              <Tag tone="new" className="onlyPhone">
                {tag.phone}
              </Tag>
            </>
          ) : null}
        </div>
        <h3 className={`disp ${styles.title}`}>
          <HeadingCopy copy={title} />
        </h3>
        <BodyCopy copy={body} />
        <ul className={`${styles.checks} onlyDesktop`}>
          {checks.map((check) => (
            <li key={check} className={styles.check}>
              <Icon name="check" size={18} strokeWidth={2.5} className={styles.checkIcon} />
              <span>{check}</span>
            </li>
          ))}
        </ul>
        {link ? (
          <Link href={link.href} className={`${styles.link} onlyDesktop`}>
            {link.label} <Icon name="arrowRight" size={16} />
          </Link>
        ) : null}
      </div>
      <div className={styles.media} style={shotRatio(image)}>
        <BrowserFrame
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes={SHOT_SIZES}
          url={APP_URL_BAR}
          imgClassName={styles.shot}
        />
      </div>
    </div>
  );
}
