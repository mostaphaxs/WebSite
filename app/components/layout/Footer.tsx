"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

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
    stars: 4,
    img: "https://i.pravatar.cc/150?u=elena"
  }
];

const Icons = {
  Star: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#15803d" stroke="none"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
  ),
  Houzz: ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 24V14.86h7.14V24H12zM4.86 14.86h7.14v9.14H4.86v-9.14zM12 0v9.14H4.86V0H12zM19.14 0v18.28H12V9.14h7.14V0z"/></svg>
  ),
  ArrowUp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  )
};

export default function AboutAndFooter() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="bg-[#FDFDFD] overflow-hidden">
      
      {/* --- REVIEWS SECTION --- */}
      <section className="py-40 bg-zinc-50/50 relative border-t border-zinc-100">
        <div className="px-6 md:px-12 lg:px-24 mb-16 relative z-10">
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-zinc-900 leading-none">
            L'EXPÉRIENCE <br /> <span className="text-green-700 font-signature normal-case text-5xl">Naturel Design</span>
          </h3>
          <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-6">Témoignages & Avis Clients</p>
        </div>

        <div className="flex overflow-hidden relative py-10 perspective-[2000px]">
          <div className="flex animate-marquee hover:[animation-play-state:paused] gap-8 px-4">
            {[...reviews, ...reviews].map((review, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15, rotateY: 5, rotateX: 5 }}
                className="w-[350px] flex-shrink-0 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100 relative group transition-all duration-500 rounded-sm"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-green-700/10 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={review.img} alt={review.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                  </div>
                  <div>
                    <h4 className="font-black text-zinc-900 uppercase tracking-tighter text-sm">{review.name}</h4>
                    <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">{review.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(review.stars)].map((_, i) => <Icons.Star key={i} />)}
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed italic relative z-10 group-hover:text-zinc-900 transition-colors">
                  "{review.comment}"
                </p>
                <div className="absolute bottom-4 right-4 text-[40px] font-black text-zinc-50 opacity-0 group-hover:opacity-100 transition-all -z-10">”</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                    {reviews.map((r, i) => (
                        <img key={i} src={r.img} className="w-8 h-8 rounded-full border-2 border-white grayscale" alt="" />
                    ))}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">+149 Clients Satisfaits</span>
            </div>
            
            <a href="#" className="flex items-center gap-4 group">
               <span className="text-xs font-black tracking-widest uppercase border-b border-zinc-900 group-hover:text-green-700 group-hover:border-green-700 transition-all">Consulter sur Houzz</span>
               <Icons.Houzz size={20} />
            </a>
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-zinc-950 pt-32 pb-12 px-6 md:px-12 lg:px-24 text-white relative overflow-hidden">
        {/* Parallax Background Text */}
        <motion.div 
          style={{ y: yParallax }} 
          className="absolute top-20 -right-20 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none italic leading-none whitespace-nowrap"
        >
          HATIM IDRISSI
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          {/* Contact Info */}
          <div className="lg:col-span-5">
            <p className="text-[#D4AF37] text-[10px] font-black tracking-[0.4em] uppercase mb-8">Contact Direct</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-12">
              asdas@gmail.com <br />
              <span className="text-zinc-500 hover:text-white transition-colors cursor-pointer">+212 6 00 00 00 00</span>
            </h2>
            <div className="flex gap-8">
              {['Instagram', 'LinkedIn', 'Houzz'].map((social) => (
                <a key={social} href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <p className="text-zinc-600 text-[10px] font-black tracking-widest uppercase mb-6">Exploration</p>
              <ul className="flex flex-col gap-4">
                {['Aquatique', 'Végétal', 'Formation', 'Boutique'].map((item) => (
                  <li key={item}><a href="#" className="text-sm text-zinc-400 hover:text-white transition-all uppercase tracking-tighter font-bold">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-zinc-600 text-[10px] font-black tracking-widest uppercase mb-6">Agence</p>
              <ul className="flex flex-col gap-4">
                {['Vision', 'Équipe', 'Presse', 'Mentions'].map((item) => (
                  <li key={item}><a href="#" className="text-sm text-zinc-400 hover:text-white transition-all uppercase tracking-tighter font-bold">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Back to Top 3D Button */}
          <div className="lg:col-span-3 flex justify-end items-end">
            <motion.button 
              onClick={scrollToTop}
              whileHover={{ y: -10, rotateX: 10 }}
              className="w-20 h-20 bg-zinc-900 border border-zinc-800 flex items-center justify-center group shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="group-hover:translate-z-10 transition-transform">
                <Icons.ArrowUp />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] text-zinc-600 font-bold tracking-widest uppercase">
            © 2026 HATIM IDRISSI — TOUS DROITS RÉSERVÉS
          </p>
          <div className="flex gap-6 items-center">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <p className="text-[9px] text-zinc-600 font-bold tracking-widest uppercase">DISPONIBLE POUR PROJETS</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}