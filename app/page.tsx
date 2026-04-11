"use client";
import './globals.css'
import React from "react";
import Navbar from "./components/layout/Navbar";
import Scene from "./components/canvas/Scene";
import Hero from "./components/sections/Hero";
import Partners from "./components/sections/Partners";
import Services from "./components/sections/Services";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#f9fafb] text-[#1a1a1a]">
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Fixed 3D Background Layer */}
      <Scene />

      {/* 3. Scrolling Content Layer */}
      <div className="relative z-10">
        
        {/* Hero Section (Introduction) */}
        <Hero />

        {/* Trust Bar (Partners) */}
        <Partners />

        {/* Core Services Section */}
        <Services />

        {/* Philosophy / About Section (New Pro Section) */}
        <section className="py-32 px-10 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-sm uppercase tracking-[0.4em] text-green-700 font-bold">
                Notre Philosophie
              </h2>
              <p className="text-4xl font-light leading-tight">
                Nous créons des espaces où <span className="font-bold">beauté</span> et <span className="font-bold italic">durabilité</span> se rencontrent.
              </p>
              <p className="text-zinc-500 leading-relaxed max-w-md">
                Sous la direction de Hatim Idrissi, notre équipe transforme chaque projet en une opportunité de démontrer comment un design réfléchi améliore la qualité de vie.
              </p>
            </div>
            <div className="aspect-square bg-zinc-100 relative overflow-hidden rounded-sm">
              <div className="absolute inset-0 flex items-center justify-center text-zinc-300 uppercase tracking-widest text-xs">
                Image Portfolio Placeholder
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-10 bg-[#1a1a1a] text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="space-y-4">
              <div className="text-xl font-black tracking-tighter uppercase">
                Naturel <span className="text-green-500">Design</span>
              </div>
              <p className="text-zinc-500 text-sm max-w-xs">
                Pionniers du design écologique et de l'architecture d'intérieur au Maroc.
              </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end">
              <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Contactez-nous</p>
              <a href="mailto:asdas@gmail.com" className="text-3xl font-light hover:text-green-500 transition-colors">
                asdas@gmail.com
              </a>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-zinc-800 text-[10px] text-zinc-600 uppercase tracking-widest text-center">
            © 2026 Naturel Design • Hatim Idrissi • Casablanca, Maroc
          </div>
        </footer>
      </div>
    </main>
  );
}