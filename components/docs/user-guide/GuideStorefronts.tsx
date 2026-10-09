import Link from "next/link";
import { DocsFigure } from "@/components/docs/DocsFigure";
import { ProseSection } from "@/components/docs/Prose";
import { getDoc } from "@/lib/content/docsIndex";
import { FIGURES, SECTIONS } from "./guideData";
import { GuideH3, PLAN_MULTI, UiPath } from "./GuideParts";

const multiGuide = getDoc("multi-storefront");
const headlessGuide = getDoc("headless");

/** Multi-storefront: the Storefronts page, the switcher, overrides and headless storefronts. */
export function GuideStorefronts() {
  return (
    <ProseSection
      id={SECTIONS.storefronts.id}
      title={SECTIONS.storefronts.label}
      intro="Serve a different signup form on each storefront, each with its own emails and approval settings. Multi-storefront is part of the Pro plan (up to 3 storefronts) and Enterprise (4 or more)."
    >
      <GuideH3 plan={PLAN_MULTI}>Turn it on and assign forms</GuideH3>
      <UiPath steps={["Storefronts"]} />
      <DocsFigure {...FIGURES.storefronts} caption="Storefronts: each storefront, whether it is serving and the form it shows." />
      <ol>
        <li>Click <strong>Enable multi-storefront</strong>. Your default storefront keeps its form.</li>
        <li>Click a storefront to open it, choose its form under <strong>Signup form</strong> and click <strong>Assign</strong>.</li>
        <li>Switch <strong>Serving</strong> on. On a standard storefront the app installs the form&apos;s script for you.</li>
      </ol>
      <p>
        To give several storefronts the same form, use <strong>Apply a form to several storefronts</strong>: pick the form
        and the storefronts, then click <strong>Apply to … storefronts</strong>. Each storefront keeps its own serving
        switch. Forms are shared, so you still build and edit them in the Form Builder.
      </p>

      <GuideH3>One storefront at a time</GuideH3>
      <DocsFigure {...FIGURES.switcher} caption="The storefront switcher, next to the logo." />
      <p>
        Use the switcher in the header to work on <strong>All storefronts</strong> or a single one. On the Dashboard and
        Requests it filters what you see. On Email and Settings it chooses what you are editing: a banner shows{" "}
        <strong>Editing the defaults</strong> or the storefront&apos;s name. Tick <strong>Override</strong> on a setting to
        give that storefront its own value; everything else is inherited from the defaults. You can override the email
        templates and branding, the email settings and switches, notifications, the cooldown period and the customer
        group rule.
      </p>

      <GuideH3>The storefront page</GuideH3>
      <DocsFigure {...FIGURES.storefront} caption="A headless storefront: its form, the embed snippet and shortcuts to its requests, emails and approval settings." />
      <ul>
        <li><strong>Signup form</strong> - the form this storefront shows, with a link to edit it.</li>
        <li><strong>At a glance</strong> - pending requests, overrides and the cooldown in use.</li>
        <li><strong>Scoped to this storefront</strong> - its requests, email templates and approval settings.</li>
        <li><strong>BigCommerce customer settings</strong> - this storefront&apos;s default and guest customer groups, shown when your store allows the app to read them.</li>
        <li><strong>Remove configuration</strong> - clears the storefront&apos;s form, overrides and script (switch it off first).</li>
      </ul>
      <p>
        A headless storefront (Catalyst, Next.js, Nuxt and the like) gets an <strong>Embed snippet</strong> instead of an
        automatic script: an empty container to place where the signup form goes, and a script tag to load on that page.
        Your developer adds both; see <Link href={headlessGuide.href}>{headlessGuide.title}</Link>. The{" "}
        <Link href={multiGuide.href}>{multiGuide.title}</Link> covers the setup in more depth.
      </p>
    </ProseSection>
  );
}
