"use client";
import { ReactLenis } from 'lenis/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body>{children}</body>
      </ReactLenis>
    </html>
  );
}