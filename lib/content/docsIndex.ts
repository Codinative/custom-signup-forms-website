import type { IconName } from "@/components/ui/Icon";

/** Docs articles built on DocsArticleLayout (the left-nav entries). */
export type DocSlug =
  | "installation"
  | "user-guide"
  | "plans-and-billing"
  | "multi-storefront"
  | "headless"
  | "api"
  | "email-smtp";

export type DocsTag = "Updated" | "New";

export type DocsEntry = {
  slug: DocSlug | "release-notes" | "privacy";
  /** Route with trailing slash. */
  href: string;
  title: string;
  description: string;
  icon: IconName;
  tag?: DocsTag;
  inSidebar: boolean;
  /** Left-nav label when it differs from the title. */
  sidebarLabel?: string;
};

export type DocsGroup = {
  id: "get-started" | "storefronts-and-integrations" | "reference";
  title: string;
  entries: DocsEntry[];
};

export type Crumb = { label: string; href?: string };

/** desktopOnly: the section is hidden below 768px, so the phone "On this page" list skips it.
 * sub: listed indented under the item before it (a sub-section). */
export type TocItem = { id: string; label: string; desktopOnly?: boolean; sub?: boolean };

/** Docs home groups and cards (Docs.dc.html / MobileDocs.dc.html). */
export const docsGroups: DocsGroup[] = [
  {
    id: "get-started",
    title: "Get started",
    entries: [
      {
        slug: "installation",
        href: "/docs/installation/",
        title: "Installation guide",
        description: "Requirements, permissions and the steps from install to a live form.",
        icon: "book",
        tag: "Updated",
        inSidebar: true,
      },
      {
        slug: "user-guide",
        href: "/docs/user-guide/",
        title: "User guide",
        description: "The builder, approvals, emails, customer groups and settings, with screenshots.",
        icon: "file",
        tag: "Updated",
        inSidebar: true,
      },
      {
        slug: "plans-and-billing",
        href: "/docs/plans-and-billing/",
        title: "Plans and billing",
        description: "What each plan includes, trials, changing plans and what happens if a payment fails.",
        icon: "creditCard",
        tag: "New",
        inSidebar: true,
      },
    ],
  },
  {
    id: "storefronts-and-integrations",
    title: "Storefronts and integrations",
    entries: [
      {
        slug: "multi-storefront",
        href: "/docs/multi-storefront/",
        title: "Multi-storefront guide",
        description: "Turn it on, set up a storefront, override settings, switch it on.",
        icon: "store",
        tag: "New",
        inSidebar: true,
      },
      {
        slug: "headless",
        href: "/docs/headless/",
        title: "Headless storefronts",
        description: "Embed the form in Catalyst, Next.js, Nuxt or any web storefront with two lines.",
        icon: "code",
        tag: "Updated",
        inSidebar: true,
      },
      {
        slug: "api",
        href: "/docs/api/",
        title: "API integration",
        description: "Native mobile apps, kiosks and your own backend: fetch the form and submit signups over HTTPS.",
        icon: "api",
        tag: "New",
        inSidebar: true,
      },
    ],
  },
  {
    id: "reference",
    title: "Reference",
    entries: [
      {
        slug: "email-smtp",
        href: "/docs/email-smtp/",
        title: "Email and SMTP setup",
        description: "Connect your mail provider and send a test.",
        icon: "mail",
        inSidebar: true,
      },
      {
        slug: "release-notes",
        href: "/release-notes/",
        title: "Release notes",
        description: "Everything that changed, version by version.",
        icon: "sparkles",
        inSidebar: false,
      },
      {
        slug: "privacy",
        href: "/privacy-policy/",
        title: "Privacy, terms and data",
        description: "What the app stores and for how long.",
        icon: "shieldCheck",
        inSidebar: false,
      },
    ],
  },
];

export const docsEntries: DocsEntry[] = docsGroups.flatMap((group) => group.entries);

/** Left nav of the article template, in ApiDocs.dc.html order. */
export const docsSidebar: DocsEntry[] = docsEntries.filter((entry) => entry.inSidebar);

export function getDoc(slug: DocSlug): DocsEntry {
  const entry = docsEntries.find((e) => e.slug === slug);
  if (!entry) throw new Error(`Unknown doc: ${slug}`);
  return entry;
}

/** "Docs / <group> / <title>", as in the ApiDocs breadcrumb. The group has no page, so no link. */
export function docBreadcrumb(slug: DocSlug): Crumb[] {
  const group = docsGroups.find((g) => g.entries.some((e) => e.slug === slug));
  return [
    { label: "Docs", href: "/docs/" },
    ...(group ? [{ label: group.title }] : []),
    { label: getDoc(slug).title },
  ];
}

export type IntegrationCard = {
  icon: IconName;
  title: string;
  /** Desktop only. */
  description: string;
  /** Desktop link text (followed by the arrowRight icon). */
  linkLabel: string;
  /** Phone link text, arrow as a character. */
  phoneLinkLabel: string;
  href: string;
};

/** Docs home "Where does your signup happen?" band. The heading is desktop only. */
export const integrationBand: { eyebrow: string; title: string; cards: IntegrationCard[] } = {
  eyebrow: "Where does your signup happen?",
  title: "Pick the integration that fits.",
  cards: [
    {
      icon: "store",
      title: "BigCommerce Stencil storefront",
      description: "Nothing to add. The app installs the form on your create-account page.",
      linkLabel: "Installation guide",
      phoneLinkLabel: "Installation guide →",
      href: "/docs/installation/",
    },
    {
      icon: "globe",
      title: "Headless web storefront",
      description: "Catalyst, Next.js, Nuxt, a custom site: paste the embed snippet.",
      linkLabel: "Headless storefronts",
      phoneLinkLabel: "Headless storefronts →",
      href: "/docs/headless/",
    },
    {
      icon: "smartphone",
      title: "Native app, kiosk or backend",
      description: "No web page to render into: call the API and draw the form yourself.",
      linkLabel: "API integration",
      phoneLinkLabel: "API integration →",
      href: "/docs/api/",
    },
  ],
};

/** "On this page" for /docs/api/ (ApiDocs.dc.html right rail). */
export const apiToc: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "before-you-start", label: "Before you start" },
  { id: "get-the-form", label: "Get the form" },
  { id: "submit-a-signup", label: "Submit a signup" },
  { id: "file-uploads", label: "File uploads", desktopOnly: true },
  { id: "errors", label: "Errors" },
  { id: "limits-and-retries", label: "Limits and retries", desktopOnly: true },
];
