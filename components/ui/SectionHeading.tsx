import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import styles from "./SectionHeading.module.css";

export type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Rendered as a `<p>` in the `.body` style unless bodyClassName sets other type (e.g. `lede`). */
  body?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  /** Gap, max-width and margins from the design (e.g. `gap: 16px`). */
  className?: string;
  /** Title size from the design (e.g. `font-size: 48px; line-height: 1.1; font-weight: 700; max-width: 820px`). */
  titleClassName?: string;
  bodyClassName?: string;
};

/**
 * Eyebrow + heading (+ body) stacked in a flex column: structure only, sizes come in through
 * the class props. Split layouts (heading left, body right, e.g. Main "How it works") render the
 * body next to this component instead of through `body`.
 */
export function SectionHeading({
  eyebrow,
  title,
  body,
  as: Heading = "h2",
  align = "left",
  className,
  titleClassName,
  bodyClassName,
}: SectionHeadingProps) {
  const rootClasses = [styles.root, align === "center" ? styles.center : undefined, className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={rootClasses}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading className={["disp", titleClassName].filter(Boolean).join(" ")}>{title}</Heading>
      {body ? <p className={[styles.body, bodyClassName].filter(Boolean).join(" ")}>{body}</p> : null}
    </div>
  );
}
