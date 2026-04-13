"use client";
import React, { useRef, useState, useEffect } from "react";
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

const BrandCopper = "#D08C63";

const Icons = {
  Star: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={BrandCopper} stroke="none"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
  ),
  ArrowUp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
  ),
  Quote: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-white/5"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
  )
};

export default function AboutAndFooter() {
  const containerRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const opacityParallax = useTransform(scrollYProgress, [0.5, 1], [0, 0.05]);

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div ref={containerRef} className="bg-[#050505] text-white overflow-hidden selection:bg-[#D08C63] selection:text-white">

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-32 relative border-t border-white/5">
        <div className="px-6 md:px-12 lg:px-24 mb-20 relative z-10 flex flex-col gap-6">
          <p className="text-[9px] text-[#D08C63] font-black uppercase tracking-[0.4em]">Témoignages</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
              L'EXPÉRIENCE <br />
              <span className="italic font-light tracking-normal text-zinc-600">NATUREL DESIGN</span>
            </h3>
            <div className="flex flex-col text-right">
              <span className="text-4xl font-light text-white italic">+149</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Projets Réalisés</span>
            </div>
          </div>
        </div>

        {/* Drag Carousel */}
        <div className="px-6 md:px-12 lg:px-24 overflow-hidden" ref={carouselRef}>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -carouselWidth }}
            dragElastic={0.05}
            className="flex gap-8 cursor-grab active:cursor-grabbing w-fit"
          >
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                className="w-[320px] md:w-[500px] h-auto min-h-[300px] flex-shrink-0 bg-[#0A0A0A] border border-white/5 p-10 flex flex-col justify-between group hover:border-[#D08C63]/50 transition-colors duration-500 relative overflow-hidden"
              >
                <div className="absolute top-8 right-8">
                  <Icons.Quote />
                </div>

                <p className="text-zinc-400 text-lg md:text-2xl font-light leading-relaxed mb-12 italic group-hover:text-white transition-colors duration-500 relative z-10">
                  "{review.comment}"
                </p>

                <div className="flex justify-between items-end relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-none overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-widest text-[11px] mb-1">{review.name}</h4>
                      <p className="text-[9px] text-zinc-500 font-bold tracking-[0.2em] uppercase">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-[4px]">
                    {[...Array(review.stars)].map((_, idx) => <Icons.Star key={idx} />)}
                  </div>
                </div>

                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#D08C63] to-[#0096FF] group-hover:w-full transition-all duration-1000 ease-out" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-[#0A0A0A] pt-40 pb-12 px-6 md:px-12 lg:px-24 relative overflow-hidden flex flex-col justify-between border-t border-white/5">

        {/* Parallax Watermark Name */}
        <motion.div
          style={{ y: yParallax, opacity: opacityParallax }}
          className="absolute top-20 left-0 w-full text-[13vw] font-black text-white select-none pointer-events-none uppercase leading-none tracking-tighter text-center whitespace-nowrap"
        >
          HATIM IDRISSI
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 mb-32">
          {/* Contact Details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="text-[#D08C63] text-[9px] font-black tracking-[0.4em] uppercase flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#D08C63]" /> Discutons de votre projet
            </p>
            <a href="mailto:contact@hatimidrissi.com" className="group block w-fit">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none group-hover:text-[#D08C63] transition-colors duration-500">
                contact@<br />hatimidrissi.com
              </h2>
            </a>
            <h3 className="text-lg font-light tracking-widest text-zinc-500 uppercase mt-8">
              Atelier d'Architecture Intérieure <br /> Casablanca, Maroc
            </h3>
          </div>

          {/* Navigation & Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-12 lg:pt-14">
            <div>
              <p className="text-white pb-6 mb-6 text-[9px] font-black tracking-[0.3em] uppercase border-b border-white/10">Expertise</p>
              <ul className="flex flex-col gap-6">
                {['Architecture Int.', 'Design Aquatique', 'Design Végétal', 'Formation Pro'].map((item) => (
                  <li key={item} className="group flex items-center gap-4">
                    <span className="w-0 h-[1px] bg-[#D08C63] group-hover:w-4 transition-all duration-300" />
                    <a href="#" className="text-xs text-zinc-400 group-hover:text-white transition-all uppercase tracking-[0.2em] font-bold">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white pb-6 mb-6 text-[9px] font-black tracking-[0.3em] uppercase border-b border-white/10">Réseaux</p>
              <ul className="flex flex-col gap-6">
                {['Instagram', 'LinkedIn', 'YouTube', 'Houzz'].map((item) => (
                  <li key={item} className="group flex items-center gap-4">
                    <span className="w-0 h-[1px] bg-white group-hover:w-4 transition-all duration-300" />
                    <a href="#" className="text-xs text-zinc-400 group-hover:text-white transition-all uppercase tracking-[0.2em] font-bold">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Back to Top */}
          <div className="lg:col-span-1 flex lg:justify-end items-end">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, backgroundColor: "#D08C63", borderColor: "#D08C63" }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 border border-white/20 flex flex-col items-center justify-center gap-2 group bg-transparent transition-colors duration-300"
            >
              <Icons.ArrowUp />
            </motion.button>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-[9px] text-zinc-500 font-bold tracking-[0.3em] uppercase flex items-center gap-2">
            © {new Date().getFullYear()} Hatim Idrissi <span className="mx-2">|</span> All Rights Reserved
          </p>
          <div className="flex gap-4 items-center px-4 py-2 bg-white/5 border border-white/5">
            <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse shadow-[0_0_10px_#22C55E]" />
            <p className="text-[9px] text-white font-black tracking-[0.3em] uppercase">Disponibilité: Ouvert aux projets</p>
          </div>
        </div>
      </footer>
    </div>
  );
}