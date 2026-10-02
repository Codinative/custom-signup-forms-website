import Image from "next/image";
import type { ReactNode } from "react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Icon } from "@/components/ui/Icon";
import styles from "./DocsFigure.module.css";

export type DocsFigureProps = {
  /** `/images/<file>.png`; the custom loader serves the WebP variants. */
  src: string;
  /** Image size in CSS px (half the 2× capture). */
  width: number;
  height: number;
  alt: string;
  caption?: ReactNode;
  /** Dialog crops narrower than the article column keep their own width instead of being stretched. */
  maxWidth?: number;
  className?: string;
};

/** Article column width per breakpoint (DocsArticleLayout: 736 at 1440, wider at 1024–1279 without the TOC). */
const SIZES =
  "(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1279px) calc(100vw - 388px), 736px";

/**
 * An app screenshot in a docs article: the site's screenshot frame, without the bar, plus a caption.
 * Clicking it opens the screenshot at full size over the page (HTML popover, no script); Close, Escape or a click
 * outside the image closes it.
 */
export function DocsFigure({ src, width, height, alt, caption, maxWidth, className }: DocsFigureProps) {
  const sizes = maxWidth ? `(max-width: 767px) calc(100vw - 40px), ${maxWidth}px` : SIZES;
  const viewerId = `zoom-${src.split("/").pop()?.replace(/\.\w+$/, "")}`;
  return (
    <figure className={[styles.figure, className].filter(Boolean).join(" ")} style={maxWidth ? { maxWidth } : undefined}>
      <button type="button" popoverTarget={viewerId} className={styles.zoom} aria-label={`View larger: ${alt}`}>
        <BrowserFrame src={src} width={width} height={height} alt={alt} sizes={sizes} className={styles.frame} />
      </button>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
      <div id={viewerId} popover="auto" role="dialog" aria-label={alt} className={styles.viewer}>
        <button type="button" popoverTarget={viewerId} popoverTargetAction="hide" className={styles.close} aria-label="Close">
          <Icon name="close" size={22} />
        </button>
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes={`(max-width: ${width + 32}px) calc(100vw - 32px), ${width}px`}
          loading="lazy"
          className={styles.viewerImg}
        />
      </div>
    </figure>
  );
}
