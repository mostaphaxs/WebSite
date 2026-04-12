"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

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

const BrandCopper = "#D08C63";

const Icons = {
  Star: () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill={BrandCopper} stroke="none"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
  ),
  ArrowUp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  )
};

// --- NEW: 3D TILT COMPONENT ---
function ReviewCard({ review }: { review: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="w-[380px] h-[240px] flex-shrink-0 bg-white p-8 border border-zinc-200 relative group transition-all duration-100 flex flex-col justify-between cursor-grab active:cursor-grabbing shadow-sm hover:shadow-2xl"
    >
      <div style={{ transform: "translateZ(50px)" }} className="flex justify-between items-start">
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

      <p style={{ transform: "translateZ(30px)" }} className="text-zinc-500 text-sm leading-relaxed font-light mt-6 group-hover:text-[#0B0D10] transition-colors duration-300">
        "{review.comment}"
      </p>

      {/* Glossy Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D08C63] group-hover:w-full transition-all duration-700 ease-out" />
    </motion.div>
  );
}

export default function AboutAndFooter() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const opacityParallax = useTransform(scrollYProgress, [0.5, 1], [0, 0.03]);

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div ref={containerRef} className="bg-white overflow-hidden selection:bg-[#D08C63] selection:text-white">
      
      <section className="py-32 relative border-t border-zinc-200 perspective-[1500px]">
        <div className="px-6 md:px-12 lg:px-24 mb-20 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-[9px] text-[#D08C63] font-black uppercase tracking-[0.4em] mb-6">Témoignages</p>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#0B0D10] leading-[0.9]">
              L'EXPÉRIENCE <br /> 
              <span className="italic font-light tracking-normal text-zinc-400">NATUREL DESIGN</span>
            </h3>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">+149 Clients <br/> Satisfaits</span>
          </div>
        </div>

        {/* Marquee with 3D Perspective */}
        <div className="flex overflow-visible relative py-20 bg-zinc-50/30">
          <div className="flex animate-marquee hover:[animation-play-state:paused] gap-12 px-6 items-center">
            {[...reviews, ...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#0B0D10] pt-32 pb-12 px-6 md:px-12 lg:px-24 text-white relative overflow-hidden">
        <motion.div 
          style={{ y: yParallax, opacity: opacityParallax }} 
          className="absolute top-0 left-0 w-full text-[18vw] font-black text-white select-none pointer-events-none uppercase leading-none tracking-tighter text-center"
        >
          NATUREL
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          <div className="lg:col-span-6">
            <p className="text-[#D08C63] text-[9px] font-black tracking-[0.4em] uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#D08C63]" /> Contact Direct
            </p>
            <a href="mailto:asdas@gmail.com" className="group block w-fit">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 group-hover:text-[#D08C63] transition-colors duration-500">
                asdas@gmail.com
              </h2>
            </a>
            <h3 className="text-2xl md:text-3xl font-light tracking-widest text-zinc-600 mb-16 uppercase">Casablanca, MA</h3>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-12 pt-8 lg:pt-0">
            <div>
              <p className="text-zinc-600 text-[9px] font-black tracking-[0.3em] uppercase mb-8 border-b border-white/10 pb-4">Menu</p>
              <ul className="flex flex-col gap-5">
                {['Aquatique', 'Végétal', 'Formation', 'Boutique'].map((item) => (
                  <li key={item}><a href="#" className="text-xs text-zinc-400 hover:text-white transition-all uppercase tracking-[0.2em] font-bold">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-zinc-600 text-[9px] font-black tracking-[0.3em] uppercase mb-8 border-b border-white/10 pb-4">Agence</p>
              <ul className="flex flex-col gap-5">
                {['Vision', 'Équipe', 'Presse', 'Mentions'].map((item) => (
                  <li key={item}><a href="#" className="text-xs text-zinc-400 hover:text-white transition-all uppercase tracking-[0.2em] font-bold">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 flex lg:justify-end items-end">
            <motion.button 
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, backgroundColor: "#D08C63" }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 border border-zinc-800 flex items-center justify-center group bg-zinc-900"
            >
              <Icons.ArrowUp />
            </motion.button>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-white/10 flex justify-between items-center">
          <p className="text-[8px] text-zinc-500 font-black tracking-[0.3em] uppercase">© 2026 HATIM IDRISSI</p>
          <div className="flex gap-4 items-center px-4 py-2 bg-white/5 border border-white/10">
             <div className="w-1.5 h-1.5 bg-[#D08C63] animate-pulse" />
             <p className="text-[8px] text-white font-black tracking-[0.3em] uppercase">Status: Online</p>
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
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}