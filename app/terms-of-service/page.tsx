import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LegalBody } from "@/components/legal/LegalBody";
import { PageHero } from "@/components/legal/PageHero";
import { TermsSections } from "@/components/legal/TermsSections";
import { buildMetadata } from "@/lib/seo";
import { APP_NAME } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms for using Custom Signup Forms, a BigCommerce app by Codinative.",
  path: "/terms-of-service/",
});

export default function TermsOfServicePage() {
  return (
    <>
      <SiteHeader variant="light" />
      <main id="main">
        <PageHero
          eyebrow="Legal"
          title="Terms of Service"
          lede={<>The terms for using {APP_NAME}. Last updated 16 June 2026.</>}
        />
        <LegalBody>
          <TermsSections />
        </LegalBody>
      </main>
      <Footer />
    </>
  );
}
