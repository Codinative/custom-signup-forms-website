import Image from "next/image";
import styles from "./BrowserFrame.module.css";

export type BrowserFrameProps = {
  /** `/images/<file>.png`; the custom loader serves the WebP variants. */
  src: string;
  /** Intrinsic size: 1440×900 for the screenshots, 860×580 for storefronts-crop.png. */
  width: number;
  height: number;
  alt: string;
  /** Rendered width per breakpoint, e.g. `(max-width: 767px) calc(100vw - 40px), 658px`. */
  sizes: string;
  /** URL shown in the top bar. Without it the frame has no bar. */
  url?: string;
  /** Keep the bar below 768px. The phone artboards drop it, so it is hidden there by default. */
  barOnPhone?: boolean;
  /** Above-the-fold hero screenshot only. */
  priority?: boolean;
  /** Per-page tweaks, e.g. the home hero's square bottom corners and `margin-bottom: -1px`. */
  className?: string;
  imgClassName?: string;
};

/** The design's `.frame` / `.frame-bar` / `.dot` screenshot frame (radius 16, 14 below 768px). */
export function BrowserFrame({
  src,
  width,
  height,
  alt,
  sizes,
  url,
  barOnPhone = false,
  priority = false,
  className,
  imgClassName,
}: BrowserFrameProps) {
  const barClasses = barOnPhone ? styles.bar : `${styles.bar} onlyDesktop`;
  return (
    <div className={[styles.frame, className].filter(Boolean).join(" ")}>
      {url ? (
        <div className={barClasses} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={`mono ${styles.url}`}>{url}</span>
        </div>
      ) : null}
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={[styles.img, imgClassName].filter(Boolean).join(" ")}
      />
    </div>
  );
}
