import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeadlessEmbed } from "@/components/multi-storefront/HeadlessEmbed";
import { HowItWorks } from "@/components/multi-storefront/HowItWorks";
import { MultiStorefrontHero } from "@/components/multi-storefront/MultiStorefrontHero";
import { OneQueue } from "@/components/multi-storefront/OneQueue";
import { PerStorefront } from "@/components/multi-storefront/PerStorefront";
import { PlanCallouts } from "@/components/multi-storefront/PlanCallouts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Multi-storefront",
  description:
    "BigCommerce lets one store run several storefronts. Multi-storefront gives each its own form, emails and approval rules.",
  path: "/multi-storefront/",
});

export default function MultiStorefrontPage() {
  return (
    <>
      <SiteHeader variant="dark" active="multi-storefront" />
      <main id="main">
        <MultiStorefrontHero />
        <PerStorefront />
        <HeadlessEmbed />
        <OneQueue />
        <HowItWorks />
        <PlanCallouts />
      </main>
      <Footer />
    </>
  );
}
