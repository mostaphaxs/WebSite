// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import PageReveal from "./components/canvas/PageTransition";

import SmoothScroll from "./components/SmoothScroll"; // Import your new wrapper

export const metadata: Metadata = {
  title: "Hatim Idrissi | Architecte d’intérieur",
  description: "Conception architecturale entre nature et design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased bg-[#FDFDFD]">
        {/* PageReveal is already a Client Component */}
        <PageReveal>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </PageReveal>
      </body>
    </html>
  );
}