import type { Metadata } from "next";
import { Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import PageReveal from "./components/canvas/PageTransition";
import SmoothScroll from "./components/SmoothScroll";
import WhatsAppButton from "./components/sections/WhatsAppButton";

const signatureFont = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-signature",
});

export const metadata: Metadata = {
  title: "Hatim Idrissi | Architecte d'intérieur",
  description: "Naturel Design — Studio d'architecture d'intérieur à Casablanca. Conception végétale, aquatique et mobilier sur-mesure.",
  keywords: ["architecte intérieur", "Casablanca", "design végétal", "design aquatique", "Hatim Idrissi", "Naturel Design"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Hatim Idrissi | Architecte d'intérieur",
    description: "Studio d'architecture d'intérieur — conception végétale, aquatique et mobilier sur-mesure.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`antialiased ${signatureFont.variable} bg-[#FDFDFD]`}>
        {/* PageReveal is already a Client Component */}
        <PageReveal>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </PageReveal>
        <WhatsAppButton />
      </body>
    </html>
  );
}