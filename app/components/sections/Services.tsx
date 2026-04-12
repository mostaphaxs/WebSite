"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const services = [
  { 
    title: "Architecture Intérieure", 
    subtitle: "Coaching & Décoration", 
    // High-end minimalist living room
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000",
    id: "01"
  },
  { 
    title: "Design Aquatique", 
    subtitle: "Murs d'eau & Aquariums", 
    // Luxury minimalist pool/water architectural element
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000",
    id: "02"
  },
  { 
    title: "Design Végétal", 
    subtitle: "Paysagiste & Végétal Stabilisé", 
    // Architectural interior with integrated greenery/tree
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000",
    id: "03"
  },
  { 
    title: "Formation", 
    subtitle: "Transmission du Savoir-faire", 
    // Clean, modern design studio atmosphere
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000",
    id: "04"
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["8%", "-15%"]);

  return (
    <section ref={containerRef} className="py-40 px-6 md:px-12 lg:px-24 bg-[#FDFDFD] relative overflow-hidden">
      
      {/* BACKGROUND TEXT */}
      <motion.div 
        style={{ x: bgTextX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-zinc-100/70 select-none pointer-events-none whitespace-nowrap z-0 italic"
      >
        L'ART DE VIVRE // NATUREL
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-32">
          <span className="text-[10px] font-black tracking-[1em] text-green-800 uppercase mb-4 block">Collection</span>
          <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter text-zinc-900 italic leading-[0.75]">
            Nos <span className="text-zinc-200">Essences</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 md:gap-y-40">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // INTENSE PARALLAX ENGINE
  const imgTranslateY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div 
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col group ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative h-[600px] md:h-[750px] w-full bg-zinc-200 overflow-hidden shadow-2xl transition-all duration-700">
        
        {/* PARALLAX ELEMENT */}
        <motion.div 
           style={{ y: imgTranslateY }} 
           className="absolute -top-[20%] left-0 w-full h-[140%] "
        >
          <Image 
            src={service.img} 
            alt={service.title} 
            fill
            unoptimized
            priority={index < 2}
            className="object-cover"
          />
        </motion.div>

        {/* --- LIQUID GLASS HOVER (Matches Hero) --- */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              {/* The Glass Pane */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md shadow-[inset_0_0_100px_rgba(255,255,255,0.2)]" />
              
              {/* Text Reveal */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="relative z-30 text-center"
              >
                 <span className="text-white text-[10px] tracking-[0.6em] font-black uppercase mb-2 block">Explorer</span>
                 <p className="text-white/60 font-mono text-[8px] tracking-[0.4em] uppercase">HI_PROJECT // {service.id}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* THICK ARCHITECTURAL FRAME */}
        <div className="absolute inset-0 border-[20px] border-[#FDFDFD] z-30 pointer-events-none" />
      </div>

      {/* TYPOGRAPHY */}
      <div className="mt-12 group-hover:translate-x-6 transition-transform duration-1000 ease-[0.16,1,0.3,1]">
        <div className="flex items-center gap-6 mb-4">
          <span className="text-green-800 text-[11px] font-black uppercase tracking-widest">{service.subtitle}</span>
          <div className="h-[1px] flex-grow bg-zinc-200 transition-all duration-700 group-hover:bg-green-800/30" />
        </div>
        
        <h3 className="text-zinc-900 text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.8]">
          {service.title}
        </h3>
      </div>

      {/* GHOST NUMBER */}
      <div className="absolute -top-16 -left-10 text-[18rem] font-black text-zinc-100 select-none -z-10 group-hover:text-green-800/5 transition-colors duration-1000">
        {service.id}
      </div>
    </motion.div>
  );
}