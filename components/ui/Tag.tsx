import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./Tag.module.css";

export type TagTone =
  | "new"
  | "improved"
  | "fixed"
  | "security"
  | "blue"
  | "latest"
  | "white"
  | "glass"
  | "glassSubtle"
  | "code"
  | "navy";

export type TagProps = {
  tone: TagTone;
  children: ReactNode;
  icon?: IconName;
  iconSize?: number;
  iconStrokeWidth?: number;
  as?: "span" | "div";
  className?: string;
};

export function Tag({ tone, children, icon, iconSize = 14, iconStrokeWidth = 2, as: As = "span", className }: TagProps) {
  return (
    <As className={[styles.tag, styles[tone], className].filter(Boolean).join(" ")}>
      {icon ? <Icon name={icon} size={iconSize} strokeWidth={iconStrokeWidth} /> : null}
      {children}
    </As>
  );
}
