import Link from "next/link";
import type { NavLink } from "@/lib/content/navigation";

export type FooterLinkProps = { link: NavLink; className?: string };

/** A footer link: next/link inside the site, a new tab for other sites. */
export function FooterLink({ link, className }: FooterLinkProps) {
  if (/^https?:/.test(link.href)) {
    return (
      <a href={link.href} className={className} target="_blank" rel="noopener">
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}
