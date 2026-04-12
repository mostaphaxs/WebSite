"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const reviews = [
  {
    name: "Sarah Lahlou",
    role: "Propriétaire Villa",
    comment: "Un travail d'orfèvre sur l'intégration végétale. Mon salon respire enfin.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Marc Depont",
    role: "CEO Tech Hub",
    comment: "L'aspect aquatique du lobby a transformé l'expérience de nos clients.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=marc"
  },
  {
    name: "Yassine Bennani",
    role: "Architecte",
    comment: "Une collaboration fluide et un sens du détail technique impressionnant.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=yassine"
  },
  {
    name: "Elena Rossi",
    role: "Design d'Espace",
    comment: "Naturel Design a su capturer l'essence de notre projet hôtelier.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=elena"
  }
];

// Replaced generic green with the Copper from your Logo
const BrandCopper = "#D08C63";
const BrandObsidian = "#0B0D10";

const Icons = {
  Star: () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill={BrandCopper} stroke="none"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
  ),
  Houzz: ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 24V14.86h7.14V24H12zM4.86 14.86h7.14v9.14H4.86v-9.14zM12 0v9.14H4.86V0H12zM19.14 0v18.28H12V9.14h7.14V0z"/></svg>
  ),
  ArrowUp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  )
};

export default function AboutAndFooter() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const opacityParallax = useTransform(scrollYProgress, [0.5, 1], [0, 0.03]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="bg-white overflow-hidden selection:bg-[#D08C63] selection:text-white">
      
      {/* --- REVIEWS: GALLERY STYLE --- */}
      <section className="py-32 relative border-t border-zinc-200">
        <div className="px-6 md:px-12 lg:px-24 mb-20 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-[9px] text-[#D08C63] font-black uppercase tracking-[0.4em] mb-6">Témoignages & Avis</p>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#0B0D10] leading-[0.9]">
              L'EXPÉRIENCE <br /> 
              <span className="italic font-light tracking-normal text-zinc-400">NATUREL DESIGN</span>
            </h3>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {reviews.map((r, i) => (
                <img key={i} src={r.img} className="w-10 h-10 rounded-none border border-white grayscale" alt="" />
              ))}
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">+149 Clients <br/> Satisfaits</span>
          </div>
        </div>

        {/* Cinematic Marquee */}
        <div className="flex overflow-hidden relative py-10 perspective-[2000px] border-y border-zinc-100 bg-zinc-50/30">
          <div className="flex animate-marquee hover:[animation-play-state:paused] gap-8 px-4 items-center">
            {[...reviews, ...reviews, ...reviews].map((review, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="w-[380px] h-[220px] flex-shrink-0 bg-white p-8 border border-zinc-200 relative group transition-all duration-500 flex flex-col justify-between cursor-grab active:cursor-grabbing"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0B0D10] uppercase tracking-widest text-[10px]">{review.name}</h4>
                      <p className="text-[8px] text-[#D08C63] font-black tracking-[0.3em] uppercase mt-1">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-[2px]">
                    {[...Array(review.stars)].map((_, i) => <Icons.Star key={i} />)}
                  </div>
                </div>
                
                <p className="text-zinc-500 text-sm leading-relaxed font-light mt-6 group-hover:text-[#0B0D10] transition-colors duration-300">
                  "{review.comment}"
                </p>
                
                {/* Structural accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D08C63] group-hover:w-full transition-all duration-700 ease-out" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER: ARCHITECTURAL BLUEPRINT STYLE --- */}
      <footer className="bg-[#0B0D10] pt-32 pb-12 px-6 md:px-12 lg:px-24 text-white relative overflow-hidden">
        
        {/* Giant Structural Background Typography */}
        <motion.div 
          style={{ y: yParallax, opacity: opacityParallax }} 
          className="absolute top-0 left-0 w-full text-[18vw] font-black text-white select-none pointer-events-none uppercase leading-none tracking-tighter text-center"
        >
          NATUREL
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          
          {/* Main Contact Hub */}
          <div className="lg:col-span-6">
            <p className="text-[#D08C63] text-[9px] font-black tracking-[0.4em] uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#D08C63]" />
              Contact Direct
            </p>
            <a href="mailto:asdas@gmail.com" className="group block w-fit">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 text-white group-hover:text-[#D08C63] transition-colors duration-500">
                asdas@gmail.com
              </h2>
            </a>
            <h3 className="text-2xl md:text-3xl font-light tracking-widest text-zinc-600 hover:text-white transition-colors duration-300 cursor-pointer mb-16">
              +212 6 00 00 00 00
            </h3>
            
            {/* Social Links with Magnetic Hover Style */}
            <div className="flex gap-8 border-t border-white/10 pt-8 w-fit">
              {['Instagram', 'LinkedIn', 'Houzz'].map((social) => (
                <a key={social} href="#" className="relative group overflow-hidden pb-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors duration-300">
                    {social}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500 ease-out" />
                </a>
              ))}
            </div>
          </div>

          {/* Site Blueprint / Navigation */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-12 pt-8 lg:pt-0">
            <div>
              <p className="text-zinc-600 text-[9px] font-black tracking-[0.3em] uppercase mb-8 border-b border-white/10 pb-4">Exploration</p>
              <ul className="flex flex-col gap-5">
                {['Aquatique', 'Végétal', 'Formation', 'Boutique'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-zinc-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 uppercase tracking-[0.2em] font-bold">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-zinc-600 text-[9px] font-black tracking-[0.3em] uppercase mb-8 border-b border-white/10 pb-4">Agence</p>
              <ul className="flex flex-col gap-5">
                {['Vision', 'Équipe', 'Presse', 'Mentions'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-zinc-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 uppercase tracking-[0.2em] font-bold">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3D Action Back to Top */}
          <div className="lg:col-span-2 flex lg:justify-end items-end">
            <motion.button 
              onClick={scrollToTop}
              whileHover={{ y: -8, backgroundColor: "#D08C63", borderColor: "#D08C63" }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 border border-zinc-800 flex items-center justify-center group transition-colors duration-300"
            >
              <div className="text-zinc-500 group-hover:text-[#0B0D10] group-hover:-translate-y-1 transition-all duration-300">
                <Icons.ArrowUp />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Lower Perimeter */}
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[8px] text-zinc-500 font-black tracking-[0.3em] uppercase">
            © 2026 HATIM IDRISSI — TOUS DROITS RÉSERVÉS
          </p>
          <div className="flex gap-4 items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10">
             <div className="w-1.5 h-1.5 bg-[#D08C63] animate-pulse" />
             <p className="text-[8px] text-white font-black tracking-[0.3em] uppercase">DISPONIBLE POUR PROJETS</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
}