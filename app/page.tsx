"use client";
import React, { useRef } from 'react';
import './globals.css'
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Philosophy from "./components/sections/Philosophy";
import AboutAndFooter from './components/layout/Footer';
import ThemeController from './components/layout/ThemeController';

export default function Home() {
  const testimonialsRef = useRef(null);
  return (
    <main className="relative min-h-screen selection:bg-green-100 bg-white">
      {/* LAYER 1: THE TEXTURE & GRID */}
      <div className="fixed inset-0 z-0 bg-grid pointer-events-none" style={{ willChange: "transform" }} />

      {/* LAYER 2: THE ATMOSPHERIC LIGHTING */}
      <div className="fixed inset-0 z-0 pro-bg-gradient pointer-events-none" style={{ willChange: "transform" }} />

      {/* LAYER 3: THE CONTENT */}
      <ThemeController targetRef={testimonialsRef}>
        <div className="relative z-10">
          <Navbar />

          <section id="architecture">
            <Hero />
          </section>

          {/* Subtle separator using a thin line */}
          <div className="px-16">
            <div className="h-[1px] w-full bg-zinc-200/20" />
          </div>

          <section id="vegetal">
            <Philosophy />
          </section>
          <section id="design-aquatique">
            <Services />
          </section>
          <section id="formation">
            <AboutAndFooter ref={testimonialsRef} />
          </section>
        </div>
      </ThemeController>
    </main>
  );
}