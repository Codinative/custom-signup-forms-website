import Link from "next/link";
import { Callout } from "@/components/docs/Callout";
import { DefinitionRows, type DefinitionRow } from "@/components/docs/DefinitionRows";
import { DocsFigure } from "@/components/docs/DocsFigure";
import { FIGURES } from "@/components/docs/user-guide/guideData";
import { ProseSection } from "@/components/docs/Prose";
import { PLANS, type PlanId } from "@/lib/content/plans";
import { LINKS } from "@/lib/site";
import { sectionProps } from "./guides";
import styles from "./Guides.module.css";

/** Name and price come from the one plans module. */
function planOf(id: PlanId) {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

/** "$0", "$99 a month", or Enterprise's custom pricing. */
function priceOf(id: PlanId): string {
  const { price } = planOf(id);
  if (price === null) return "Custom pricing";
  return price === 0 ? "$0" : `$${price} a month`;
}

// App repo: lib/plans.ts PLAN_DEFINITIONS, components/pricing/FeatureMatrix.tsx limit rows, lib/plan-highlights.ts
const PLAN_LIMITS: Record<PlanId, string> = {
  free: "1 storefront, 100 signups a month and 1 saved form. The rejection cooldown is fixed at 3 days, and the form shows a \"Powered by\" line.",
  standard: "1 storefront with unlimited signups and saved forms, and a rejection cooldown you set from 1 to 365 days.",
  pro: "Everything in Standard on up to 3 storefronts serving at once, your default included.",
  enterprise:
    "Everything in Pro on 4 or more storefronts, agreed with you, plus an onboarding call, priority support with an SLA, and invoicing and terms.",
};

const PLAN_ROWS: DefinitionRow[] = (["free", "standard", "pro", "enterprise"] as const).map((id) => ({
  key: planOf(id).name,
  value: `${priceOf(id)}. ${PLAN_LIMITS[id]}`,
}));

// App repo: lib/stripe-checkout.ts decidePlanChange, components/pricing/PricingPage.tsx confirmContent
const CHANGE_ROWS: DefinitionRow[] = [
  {
    key: "Upgrade",
    value:
      "Applies right away, and you’re charged the difference for the rest of the billing period. During a trial nothing is charged and the trial continues.",
  },
  {
    key: "Downgrade",
    value:
      "Takes effect at the end of the billing period you’ve paid for, and you keep every feature until then. During a trial it applies right away and the trial continues.",
  },
  {
    key: "Move to Free",
    value: "Cancels the subscription at the end of the period. Your forms, requests and settings are kept.",
  },
  {
    key: "Enterprise",
    value: (
      <>
        Arranged with us by email at <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>. It can’t be changed from the
        app.
      </>
    ),
  },
];

const S = (id: string) => sectionProps("plans-and-billing", id);

export function PlansBillingGuide() {
  return (
    <>
      <ProseSection
        {...S("the-plans")}
        intro="Every plan includes the visual form builder and the approval queue. Here’s what each one costs and allows:"
      >
        <DefinitionRows rows={PLAN_ROWS} className={styles.stackedRows} />
        <p>
          Standard and above add customer emails through your own SMTP, team notifications, customer groups,
          conditional logic, the &quot;Other&quot; choice, file uploads, and asking an applicant to resubmit. Pro and
          above add multi-storefront and the headless embed.
        </p>
        <p>
          Prices are in US dollars and exclude tax; any tax due is added at checkout. There’s no setup fee on any plan.
          Compare every feature on the <Link href="/pricing/#compare">pricing page</Link>.
        </p>
      </ProseSection>

      <ProseSection
        {...S("free-trial")}
        intro="Standard and Pro start with a 7-day free trial for new subscribers. You add a card at checkout, and nothing is charged until the trial ends. Cancel before then and you pay nothing."
      >
        <p>
          If you’ve subscribed before, there’s no second trial: the plan is charged from the day you start. The Free plan
          needs no card, and an Enterprise trial is agreed with you.
        </p>
      </ProseSection>

      <ProseSection
        {...S("changing-plans")}
        intro={
          <>
            When you first open the app, you pick a plan on the &quot;Choose your plan&quot; screen. Free takes you
            straight to the dashboard; Standard and Pro go to checkout.
          </>
        }
      >
        <DocsFigure {...FIGURES.plans} caption="The &quot;Choose your plan&quot; screen. Later you change plan from Settings → Subscription." />
        <p>
          To change it later, go to Settings → Subscription and click &quot;Upgrade&quot; (on Free) or &quot;Change
          plan&quot;.
        </p>
        <DefinitionRows rows={CHANGE_ROWS} className={styles.stackedRows} />
        <p>
          &quot;Manage billing&quot; in Settings → Subscription opens the Stripe billing portal, where you can update
          your card, see invoices and cancel.
        </p>
        <h3>Moving to a plan with fewer storefronts</h3>
        <p>
          Your default storefront keeps serving its form. Storefronts beyond the new plan’s limit are switched off when
          the change takes effect, and their forms and settings are kept for when you upgrade again.
        </p>
      </ProseSection>

      <ProseSection
        {...S("free-plan-limits")}
        intro="Free accepts 100 signups a month. The count runs per calendar month in UTC and resets on the 1st."
      >
        <p>The Dashboard shows how many you’ve used. The bar turns amber at 80% and red at the cap.</p>
        <Callout>
          At the cap, your form stops accepting signups until the 1st. Shoppers see &quot;This store is not accepting
          new signups right now. Please contact the store owner.&quot; Upgrading removes the cap straight away.
        </Callout>
        <p>
          Free can’t save a form that uses conditional logic, an &quot;Other&quot; choice or a file upload field.
          Remove them, or upgrade to keep them.
        </p>
        <p>
          Free keeps one saved form usable. If you move to Free with more, the others are locked, not deleted, and you
          can use them again after upgrading.
        </p>
      </ProseSection>

      <ProseSection
        {...S("if-a-payment-fails")}
        intro="The app becomes read-only until the payment clears. Your signup form keeps showing on your storefront for 7 days, then it’s taken off."
      >
        <p>A notice at the bottom right of the app gives you two ways out:</p>
        <ul>
          <li>&quot;Clear payment&quot; opens the billing portal, where you update your card.</li>
          <li>
            &quot;Shift to Free plan&quot; cancels the paid plan now and makes the app editable again. The unpaid
            invoice is voided.
          </li>
        </ul>
        <p>
          If the form was taken off, clearing the payment brings it back at once. An open payment dispute also makes the
          app read-only, and plan changes are paused until it’s resolved.
        </p>
      </ProseSection>

      <ProseSection
        {...S("uninstalling")}
        intro="Uninstalling the app stops a paid plan from renewing. The subscription cancels at the end of the current period, and you get an email with the date it ends."
      />
    </>
  );
}
