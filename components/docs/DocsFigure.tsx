import type { ReactNode } from "react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
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

/** An app screenshot in a docs article: the site's screenshot frame, without the bar, plus a caption. Click opens the 2× original. */
export function DocsFigure({ src, width, height, alt, caption, maxWidth, className }: DocsFigureProps) {
  const sizes = maxWidth ? `(max-width: 767px) calc(100vw - 40px), ${maxWidth}px` : SIZES;
  return (
    <figure className={[styles.figure, className].filter(Boolean).join(" ")} style={maxWidth ? { maxWidth } : undefined}>
      <a href={src} target="_blank" rel="noopener" title="Open full size" className={styles.zoom}>
        <BrowserFrame src={src} width={width} height={height} alt={alt} sizes={sizes} className={styles.frame} />
      </a>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
