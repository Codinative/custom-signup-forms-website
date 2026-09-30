import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ReleasesBody } from "@/components/releases/ReleasesBody";
import { ReleasesHero } from "@/components/releases/ReleasesHero";
import { RELEASES } from "@/lib/content/releases";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Release notes",
  description:
    "What's new in Custom Signup Forms. Every change that affects your store, in plain words. Updates reach every install automatically.",
  path: "/release-notes/",
});

export default function ReleaseNotesPage() {
  return (
    <>
      <SiteHeader variant="light" active="release-notes" />
      <main id="main">
        <ReleasesHero releases={RELEASES} />
        <ReleasesBody releases={RELEASES} />
      </main>
      <Footer />
    </>
  );
}
