"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

const PaintExplosion = ({ color, isInView }: { color: string; isInView: boolean }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
      
      {/* 1. THE MAIN SPLAT (High-velocity impact) */}
      <motion.svg
        viewBox="0 0 200 200"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 3.5, opacity: 0.8 } : {}}
        transition={{ 
          type: "spring", 
          stiffness: 250, 
          damping: 15,
          delay: 0.1 
        }}
        className="w-[100%] h-[100%]"
        fill={color}
      >
        <path d="M100,30 L110,60 L140,40 L130,80 L170,75 L145,100 L185,130 L140,135 L150,175 L110,150 L100,190 L90,150 L50,175 L60,135 L15,130 L55,100 L30,75 L70,80 L60,40 L90,60 Z" />
        <circle cx="120" cy="50" r="4" />
        <circle cx="160" cy="110" r="6" />
        <circle cx="80" cy="160" r="3" />
        <circle cx="40" cy="90" r="5" />
      </motion.svg>

      {/* 2. FLYING DROPLETS */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={isInView ? { 
            scale: [0, 1.2, 0],
            x: (Math.random() - 0.5) * 500, 
            y: (Math.random() - 0.5) * 500 + 50,
            opacity: [0, 1, 0]
          } : {}}
          transition={{ 
            duration: 0.6, 
            delay: 0.15 + (Math.random() * 0.2),
            ease: "easeOut" 
          }}
          className="absolute w-3 h-3 rotate-45"
          style={{ backgroundColor: color, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} 
        />
      ))}
    </div>
  );
};

const services = [
  { 
    title: "Architecture Intérieure", 
    subtitle: "Coaching & Décoration", 
    // Structural, clean interior design
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000",
    id: "01",
    splashColor: "#D08C63", 
  },
  { 
    title: "Design Aquatique", 
    subtitle: "Murs d'eau & Aquariums", 
    // SPECIFIC: High-end integrated wall aquarium
    img: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=2000",
    id: "02",
    splashColor: "#0096FF",
  },{ 
    title: "Design Végétal", 
    subtitle: "Paysagiste & Végétal Stabilisé", 
    // ULTRA-VIBRANT GREEN living wall
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2000",
    id: "03",
    splashColor: "#22C55E", // Brighter green for the splash
  },
  { 
    title: "Formation", 
    subtitle: "Transmission du Savoir-faire", 
    // Collaborative architectural workspace
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2000",
    id: "04",
    splashColor: "#A1A1A1", 
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
      <motion.div 
        style={{ x: bgTextX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-zinc-100/70 select-none pointer-events-none whitespace-nowrap z-0 italic uppercase"
      >
        L'ART DE VIVRE // NATUREL
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-32">
          <span className="text-[10px] font-black tracking-[1em] text-zinc-400 uppercase mb-4 block">Savoir-Faire</span>
          <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter text-zinc-900 italic leading-[0.75]">
            Nos <span className="text-zinc-200">Services</span>
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
  const isInView = useInView(cardRef, { once: false, amount: 0.4 });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imgTranslateY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col group ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
    >
      <PaintExplosion color={service.splashColor} isInView={isInView} />

      <div className="relative h-[600px] md:h-[750px] w-full bg-zinc-200 overflow-hidden shadow-2xl">
        <motion.div style={{ y: imgTranslateY }} className="absolute -top-[10%] left-0 w-full h-[120%]">
          <Image 
            src={service.img} 
            alt={service.title} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            >
              <div className="text-center text-white">
                 <span className="text-[10px] tracking-[0.6em] font-black uppercase mb-2 block">Explorer le service</span>
                 <p className="font-mono text-[8px] tracking-[0.4em] uppercase opacity-60">REF_ID // 2026_{service.id}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 border-[20px] border-[#FDFDFD] z-30 pointer-events-none" />
      </div>

      <div className="mt-12 group-hover:translate-x-4 transition-transform duration-700">
        <div className="flex items-center gap-6 mb-4">
          <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: service.splashColor }}>
            {service.subtitle}
          </span>
          <div className="h-[1px] flex-grow bg-zinc-200" />
        </div>
        <h3 className="text-zinc-900 text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.8]">
          {service.title}
        </h3>
      </div>
    </motion.div>
  );
}