/**
 * Release notes, newest first. Copy is verbatim and identical on both artboards. `version` has no
 * "v" (the page shows "v2.0.0"); `date` is ISO yyyy-mm-dd, or null for the open "[Release date]"
 * placeholder. The first release carries the "Latest" tag. Dates match the app repo CHANGELOG.md.
 */

export type ChangeType = "new" | "improved" | "fixed" | "security";

export type ReleaseChange = {
  type: ChangeType;
  title: string;
  body?: string;
};

export type ReleaseScreenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** URL text in the desktop frame bar; the phone frame has no bar. */
  frameUrl: string;
};

export type Release = {
  version: string;
  date: string | null;
  title: string;
  screenshot?: ReleaseScreenshot;
  changes: ReleaseChange[];
};

// Source: design/ReleaseNotes.dc.html (change tags).
export const CHANGE_LABELS: Record<ChangeType, string> = {
  new: "New",
  improved: "Improved",
  fixed: "Fixed",
  security: "Security",
};

// Source: design/ReleaseNotes.dc.html + MobileReleaseNotes.dc.html.
export const RELEASE_COPY = {
  latest: "Latest",
  datePlaceholder: "[Release date]",
} as const;

// Source: design/ReleaseNotes.dc.html, MobileReleaseNotes.dc.html; screenshot = design v2 shot-storefronts-v2.jpg.
export const RELEASES: Release[] = [
  {
    version: "2.0.0",
    date: "2026-10-08",
    title: "Multi-storefront, four plans and a Free plan",
    screenshot: {
      src: "/images/storefronts-list-v2.png",
      width: 1400,
      height: 748,
      alt: "Storefronts screen listing each storefront, including a headless Catalyst storefront, with its serving status and assigned form",
      frameUrl: "store.mybigcommerce.com/manage/app/custom-signup-forms",
    },
    changes: [
      {
        type: "new",
        title: "Multi-storefront",
        body: "Serve a different signup form on each storefront, with its own emails, notifications, cooldown and customer-group rules. Anything you do not override follows your defaults.",
      },
      {
        type: "new",
        title: "Storefront switcher and storefront column",
        body: "Switch the whole app to one storefront from the top bar, and see which storefront every request came from.",
      },
      {
        type: "new",
        title: "Headless embed",
        body: "A signed embed snippet for Catalyst, Next.js and other headless storefronts.",
      },
      {
        type: "new",
        title: "Four plans, including Free",
        body: "Free, Standard ($99), Pro ($199) and Enterprise. Free has no time limit and needs no card. No setup fee on any plan.",
      },
      {
        type: "new",
        title: "Change plans inside the app",
        body: "Upgrades apply and are charged immediately; downgrades land at the end of your billing period. A confirmation shows the exact amount first.",
      },
      {
        type: "improved",
        title: "A gentler failed payment",
        body: "The app becomes read-only while you update your card, and your form keeps showing on your storefront for 7 days.",
      },
      {
        type: "improved",
        title: "Your forms are kept on Free",
        body: "Moving to Free keeps one form usable of your choice and locks the rest, never deleting them.",
      },
      { type: "fixed", title: "Creating a form no longer changes a storefront you did not choose" },
      { type: "fixed", title: "Cooldown and duplicate checks can no longer be side-stepped" },
    ],
  },
  {
    version: "1.6.0",
    date: "2026-07-24",
    title: "Email on/off switches",
    changes: [
      {
        type: "new",
        title: "Email Sending settings",
        body: "Turn each customer email on or off, including per customer group and per form answer.",
      },
      {
        type: "improved",
        title: "Remove a saved email version",
        body: "A per-group or per-answer email can now be removed to fall back to the default.",
      },
    ],
  },
  {
    version: "1.5.0",
    date: "2026-07-20",
    title: "Cleaner emails and a friendlier builder",
    changes: [
      { type: "improved", title: "Customer emails show your store name", body: "Not the app name." },
      {
        type: "improved",
        title: "Multiple-choice answers are all captured",
        body: "And the team notification shows readable labels.",
      },
      {
        type: "improved",
        title: "Option values follow their labels",
        body: "And the Add field palette uses plain names and icons.",
      },
      { type: "security", title: "Dependency update", body: "One critical advisory patched." },
    ],
  },
  {
    version: "1.4.0",
    date: "2026-07-13",
    title: "Conditional logic",
    changes: [
      { type: "new", title: "Conditional field logic", body: "Show or hide fields based on an answer." },
      {
        type: "new",
        title: "Emails and customer groups by answer",
        body: "Send a different email, or assign a different group, per option.",
      },
      {
        type: "new",
        title: "Headings and descriptions on fields",
        body: "Display-only text above a label or below an input.",
      },
      { type: "improved", title: "Team notification includes every submitted field" },
    ],
  },
  {
    version: "1.3.0",
    date: "2026-05-07",
    title: "Billing",
    changes: [
      {
        type: "new",
        title: "Subscription billing with a free trial",
        body: "Managed from the billing portal inside the app.",
      },
    ],
  },
  {
    version: "1.2.0",
    date: "2026-04-16",
    title: "Email templates overhaul",
    changes: [
      {
        type: "improved",
        title: "Rebuilt email templates",
        body: "Shared branding, a safer test email and clearer setup checks.",
      },
    ],
  },
];

/** "2.0.0" → "v2-0-0" (the element id; the home "New" pill links to /release-notes/#v2-0-0). */
export function releaseAnchor(version: string): string {
  return `v${version.replace(/\./g, "-")}`;
}

const RELEASE_DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-07-24" → "24 July 2026". */
export function formatReleaseDate(iso: string): string {
  return RELEASE_DATE_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}
