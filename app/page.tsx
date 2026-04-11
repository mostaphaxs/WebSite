
import './globals.css'
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Partners from "./components/sections/Partners";
import Services from "./components/sections/Services";
import Philosophy from "./components/sections/Philosophy";


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

        <Partners />
        
        <Services />
        <Philosophy/>
        <footer className="py-32 px-10 bg-zinc-900 text-white relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-tighter">
                Naturel <span className="text-green-500">Design</span>
              </h2>
              <p className="text-xs text-zinc-500 tracking-widest leading-loose">
                ARCHITECTE D'INTÉRIEUR <br /> CASABLANCA, MOROCCO
              </p>
            </div>
            
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Inquiries</span>
              <a href="mailto:asdas@gmail.com" className="text-xl font-light hover:text-green-500 transition-colors">
                asdas@gmail.com
              </a>
            </div>

            <div className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] md:text-right">
              © 2026 Crafted for Excellence
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}