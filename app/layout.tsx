import type { Metadata } from "next";
import "./globals.css";
import PageReveal from "./components/canvas/PageTransition";
import { ReactLenis } from "@studio-freight/react-lenis";

export const metadata: Metadata = {
  title: "Hatim Idrissi | Architecte d’intérieur",
  description: "Conception architecturale entre nature et design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased bg-[#FDFDFD]">
        <PageReveal>
          {/* Smooth scrolling for that premium architectural feel */}
          <ReactLenis root>
            {children}
          </ReactLenis>
        </PageReveal>
      </body>
    </html>
  );
}