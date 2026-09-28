import Image from "next/image";
import { APP_NAME } from "@/lib/site";
import styles from "./Logo.module.css";

const LOGOS = {
  light: { src: "/images/logo-light.png", width: 1172, height: 435 },
  dark: { src: "/images/logo-dark.png", width: 351, height: 131 },
};

export type LogoProps = {
  /** light = white wordmark for navy surfaces; dark = navy wordmark for white surfaces. */
  tone: "light" | "dark";
  /** Rendered height in px (36, 38, 44 or 48). Sets the intrinsic size, so the srcset stays small. */
  height: number;
  /** Extra class, e.g. a smaller height at a breakpoint or `align-self`. */
  className?: string;
  /** Header logos are always above the fold. */
  eager?: boolean;
};

export function Logo({ tone, height, className, eager = false }: LogoProps) {
  const logo = LOGOS[tone];
  return (
    <Image
      src={logo.src}
      alt={APP_NAME}
      width={Math.round((logo.width * height) / logo.height)}
      height={height}
      loading={eager ? "eager" : "lazy"}
      className={[styles.logo, className].filter(Boolean).join(" ")}
    />
  );
}
