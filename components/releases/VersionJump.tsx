"use client";

import { useState, type ChangeEvent } from "react";
import styles from "./VersionJump.module.css";

export type VersionJumpOption = {
  /** Article id, e.g. "v2-0-0". */
  anchor: string;
  /** Visible text, e.g. "v2.0.0". */
  label: string;
};

export type VersionJumpProps = {
  label: string;
  /** Newest first; the first option is the initial (server-rendered) value. */
  options: VersionJumpOption[];
  className?: string;
};

/** Phone "Jump to version" box (MobileReleaseNotes.dc.html) with a native select laid transparently over it. */
export function VersionJump({ label, options, className }: VersionJumpProps) {
  const [anchor, setAnchor] = useState(options[0]?.anchor ?? "");
  const current = options.find((option) => option.anchor === anchor);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value;
    setAnchor(next);
    document.getElementById(next)?.scrollIntoView({ block: "start" });
    window.history.replaceState(null, "", `#${next}`);
  }

  return (
    <div className={[styles.jump, className].filter(Boolean).join(" ")}>
      <span className={styles.label} aria-hidden="true">
        {label}
      </span>
      <span className={`mono ${styles.value}`} aria-hidden="true">
        {`${current?.label ?? ""} ▾`}
      </span>
      <select className={styles.select} value={anchor} onChange={handleChange} aria-label={label}>
        {options.map((option) => (
          <option key={option.anchor} value={option.anchor}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
