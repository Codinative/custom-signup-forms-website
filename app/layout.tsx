import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { APP_NAME, SITE_URL, VENDOR, LINKS } from "@/lib/site";

const poppins = Poppins({ weight: ["600", "700"], variable: "--font-poppins", subsets: ["latin"], display: "swap" });
const inter = Inter({ weight: ["400", "500", "600", "700"], variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ weight: ["500", "600"], variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: "mE51E51lm1Lwm73kSnZ_DXll15Ab0zp2aWaCnir5q2s" },
  title: {
    default: "Custom Signup Forms - B2B Registration for BigCommerce",
    template: "%s - Custom Signup Forms",
  },
  description:
    "Replace the default BigCommerce signup with a custom branded form. Build fields visually, approve requests, and automate emails for B2B and wholesale stores.",
  applicationName: APP_NAME,
  authors: [{ name: VENDOR, url: LINKS.vendor }],
  creator: VENDOR,
  publisher: VENDOR,
  keywords: [
    "BigCommerce signup form", "custom registration form", "B2B signup", "wholesale registration",
    "customer approval", "form builder", "Codinative", "customer groups", "account approval",
    "multi-storefront", "headless signup form",
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: { type: "website", siteName: APP_NAME, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
