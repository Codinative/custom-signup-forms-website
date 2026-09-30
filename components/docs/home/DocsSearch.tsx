"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./DocsSearch.module.css";

export type DocsSearchEntry = { href: string; title: string; description: string };

export type DocsSearchProps = {
  entries: DocsSearchEntry[];
  /** Width and spacing from the page (desktop: 640px wide, margin-top 10). */
  className?: string;
};

/** null for an empty query; otherwise the entries whose title or description holds every word. */
function search(entries: DocsSearchEntry[], query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return null;
  return entries.filter((entry) => {
    const text = `${entry.title} ${entry.description}`.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

/**
 * The designed "Search the docs" box as a combobox over the docs index. ⌘K / Ctrl+K focuses it;
 * arrows move through the results, Enter opens one, Escape closes the list (then clears the box).
 */
export function DocsSearch({ entries, className }: DocsSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const listId = `${id}-results`;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = search(entries, query);
  const expanded = open && results !== null;
  const activeEntry = expanded ? results[active] : undefined;
  const optionId = (index: number) => `${id}-option-${index}`;

  useEffect(() => {
    const onShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    document.addEventListener("keydown", onShortcut);
    return () => document.removeEventListener("keydown", onShortcut);
  }, []);

  const go = (entry: DocsSearchEntry) => {
    setOpen(false);
    router.push(entry.href);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Keys that confirm an IME composition are not commands
    if (event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (results === null) return;
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActive(0);
      } else if (results.length > 0) {
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActive((index) => (index + step + results.length) % results.length);
      }
    } else if (event.key === "Enter") {
      if (activeEntry) {
        event.preventDefault();
        go(activeEntry);
      }
    } else if (event.key === "Escape") {
      if (expanded) {
        event.preventDefault();
        setOpen(false);
      } else if (query) {
        event.preventDefault();
        setQuery("");
      }
    }
  };

  const count =
    results === null || results.length === 0
      ? "No results"
      : `${results.length} ${results.length === 1 ? "result" : "results"}`;

  return (
    <div role="search" className={[styles.root, className].filter(Boolean).join(" ")}>
      <label className={styles.box}>
        <span className={styles.icon}>
          <Icon name="search" size={20} />
        </span>
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-label="Search the docs"
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-activedescendant={activeEntry ? optionId(active) : undefined}
          aria-keyshortcuts="Meta+K Control+K"
          placeholder="Search the docs"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          className={styles.input}
        />
        <kbd className={`mono ${styles.key}`} aria-hidden="true">
          ⌘K
        </kbd>
      </label>
      {/* Keeps focus in the input while a result is clicked */}
      <ul
        id={listId}
        role="listbox"
        aria-label="Search results"
        hidden={!expanded}
        className={styles.list}
        onMouseDown={(event) => event.preventDefault()}
      >
        {results?.map((entry, index) => (
          <li
            key={entry.href}
            id={optionId(index)}
            role="option"
            aria-selected={index === active}
            className={index === active ? `${styles.option} ${styles.active}` : styles.option}
            onMouseEnter={() => setActive(index)}
            onClick={() => go(entry)}
          >
            <span className={styles.title}>{entry.title}</span>{" "}
            <span className={styles.text}>{entry.description}</span>
          </li>
        ))}
        {results?.length === 0 ? (
          <li role="option" aria-selected={false} aria-disabled="true" className={styles.empty}>
            No results
          </li>
        ) : null}
      </ul>
      <p role="status" className="srOnly">
        {expanded ? count : ""}
      </p>
    </div>
  );
}
