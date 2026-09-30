import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "white" | "ghost" | "outline" | "violet";

export type ButtonProps = {
  href: string;
  children: ReactNode;
  variant: ButtonVariant;
  /** sm 40px · md 48px (default) · lg 54px. Other design heights go in className. */
  size?: "sm" | "md" | "lg";
  icon?: IconName;
  iconSize?: number;
  iconStrokeWidth?: number;
  className?: string;
};

export function Button({
  href,
  children,
  variant,
  size = "md",
  icon,
  iconSize = 18,
  iconStrokeWidth = 2,
  className,
}: ButtonProps) {
  const classes = [styles.btn, styles[size], styles[variant], className].filter(Boolean).join(" ");
  const content = (
    <>
      {icon ? <Icon name={icon} size={iconSize} strokeWidth={iconStrokeWidth} /> : null}
      {children}
    </>
  );
  if (/^(https?:|mailto:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
