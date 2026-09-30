import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ComparePlans } from "@/components/pricing/ComparePlans";
import { EnterpriseBand } from "@/components/pricing/EnterpriseBand";
import { PlanCards } from "@/components/pricing/PlanCards";
import { PlanFit } from "@/components/pricing/PlanFit";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingHero } from "@/components/pricing/PricingHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { answeredFaqs, pricingFaqs } from "@/lib/content/faqs";
import { PLAN_OFFERS } from "@/lib/content/plans";
import { MARKETPLACE_RATING } from "@/lib/content/reviews";
import { buildMetadata, faqLd, softwareApplicationLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Free plan, Standard $99/month, Pro $199/month and Enterprise by quote. Paid plans start with a 7-day free trial. No setup fee. Prices in USD, before tax.",
  path: "/pricing/",
});

const APP_DESCRIPTION =
  "Custom signup forms, request approvals and email automation for BigCommerce. Free plan, paid plans with a 7-day free trial, no setup fee.";

export default function PricingPage() {
  return (
    <>
      <SiteHeader variant="light" active="pricing" />
      <main id="main">
        <PricingHero />
        <PlanCards />
        <PlanFit />
        <ComparePlans />
        <PricingFaq />
        <EnterpriseBand />
      </main>
      <Footer />
      <JsonLd data={[softwareApplicationLd(PLAN_OFFERS, APP_DESCRIPTION, MARKETPLACE_RATING), faqLd(answeredFaqs(pricingFaqs))]} />
    </>
  );
}
