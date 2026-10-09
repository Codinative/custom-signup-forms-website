import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LegalBody } from "@/components/legal/LegalBody";
import { PageHero } from "@/components/legal/PageHero";
import { PrivacySections } from "@/components/legal/PrivacySections";
import { buildMetadata } from "@/lib/seo";
import { APP_NAME } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Custom Signup Forms handles data when installed on your BigCommerce store.",
  path: "/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader variant="light" />
      <main id="main">
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          lede={<>How {APP_NAME} handles data when installed on your BigCommerce store. Last updated 16 June 2026.</>}
        />
        <LegalBody>
          <PrivacySections />
        </LegalBody>
      </main>
      <Footer />
    </>
  );
}
