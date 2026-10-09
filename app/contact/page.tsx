import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContactCard } from "@/components/legal/ContactCard";
import { LegalBody } from "@/components/legal/LegalBody";
import { PageHero } from "@/components/legal/PageHero";
import { buildMetadata } from "@/lib/seo";
import { VENDOR } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Codinative - support and questions about Custom Signup Forms.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <SiteHeader variant="light" />
      <main id="main">
        <PageHero
          eyebrow="Contact"
          title="Get in touch."
          lede={<>Built and supported by {VENDOR}. Reach out any time - we typically reply within one business day.</>}
        />
        <LegalBody>
          <ContactCard />
        </LegalBody>
      </main>
      <Footer />
    </>
  );
}
