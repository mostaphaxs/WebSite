
import './globals.css'
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";

import Services from "./components/sections/Services";
import Philosophy from "./components/sections/Philosophy";
import AboutAndFooter from './components/layout/Footer';


export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-green-100">
      {/* LAYER 1: THE TEXTURE & GRID */}
      <div className="fixed inset-0 z-0 bg-grid pointer-events-none" />
      
      {/* LAYER 2: THE ATMOSPHERIC LIGHTING */}
      <div className="fixed inset-0 z-0 pro-bg-gradient pointer-events-none" />

      {/* LAYER 3: THE CONTENT */}
      <div className="relative z-10">
        <Navbar />
        
        <Hero />
        
        {/* Subtle separator using a thin line */}
        <div className="px-16">
          <div className="h-[1px] w-full bg-zinc-200" />
        </div>

        <Philosophy/>
        <Services />
        <AboutAndFooter/>
      </div>
    </main>
  );
}