import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader variant="light" />
      <main id="main">
        <section className={styles.hero}>
          <p className="eyebrow">404</p>
          <h1 className={`disp ${styles.title}`}>Page not found.</h1>
          <p className={`lede ${styles.lede}`}>The page you are looking for does not exist or has moved.</p>
          <Button href="/" variant="primary" className={styles.cta}>
            Back to home
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
