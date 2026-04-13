import type { Metadata } from "next";
import { Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import PageReveal from "./components/canvas/PageTransition";

const signatureFont = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-signature",
});

import SmoothScroll from "./components/SmoothScroll"; // Import your new wrapper
import WhatsAppButton from "./components/sections/WhatsAppButton";

export const metadata: Metadata = {
  title: "Hatim Idrissi | Architecte d’intérieur",
  description: "Conception architecturale entre nature et design.",
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