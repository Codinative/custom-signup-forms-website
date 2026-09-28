import { CtaBand } from "@/components/home/CtaBand";
import { Features } from "@/components/home/Features";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeHero } from "@/components/home/HomeHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MadeFor } from "@/components/home/MadeFor";
import { MoreApps } from "@/components/home/MoreApps";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Footer } from "@/components/layout/Footer";
import { HashRedirect } from "@/components/layout/HashRedirect";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { answeredFaqs, homeFaqs } from "@/lib/content/faqs";
import { PLAN_OFFERS } from "@/lib/content/plans";
import { buildMetadata, faqLd, organizationLd, softwareApplicationLd, websiteLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Custom Signup Forms - B2B Registration for BigCommerce",
  absoluteTitle: true,
  description:
    "Replace the default BigCommerce account form with one you design, review every applicant before they can buy, and place them in the right customer group.",
  path: "/",
});

// Short factual description for SoftwareApplication (MobileHome hero copy).
const APP_DESCRIPTION =
  "Replace the default BigCommerce account form with one you design, and review every applicant before they can buy.";

// Old in-page anchors that now have their own route.
const HASH_REDIRECTS = { "#pricing": "/pricing/" };

export default function HomePage() {
  return (
    <>
      <SiteHeader variant="dark" />
      <main id="main">
        <HomeHero />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <MadeFor />
        <PricingTeaser />
        <HomeFaq />
        <MoreApps />
        <CtaBand />
      </main>
      <Footer />
      <JsonLd
        data={[
          websiteLd,
          organizationLd,
          softwareApplicationLd(PLAN_OFFERS, APP_DESCRIPTION),
          faqLd(answeredFaqs(homeFaqs)),
        ]}
      />
      <HashRedirect map={HASH_REDIRECTS} />
    </>
  );
}
