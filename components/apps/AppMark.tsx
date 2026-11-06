import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { AppEntry } from "@/lib/content/apps";
import styles from "./AppMark.module.css";

export type AppMarkProps = {
  app: Pick<AppEntry, "icon" | "logo">;
  /** The caller's tile class: it sets the size, radius and navy background. */
  className: string;
};

/** An app's tile: its own logo when it has one (the logo fills the tile), else its icon. Decorative: the name sits beside it. */
export function AppMark({ app, className }: AppMarkProps) {
  if (app.logo) {
    return (
      <span className={`${className} ${styles.withLogo}`}>
        <Image src={app.logo} alt="" width={48} height={48} unoptimized />
      </span>
    );
  }
  return (
    <span className={className}>
      <Icon name={app.icon} size={22} strokeWidth={1.9} />
    </span>
  );
}
