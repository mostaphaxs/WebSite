"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

const services = [
  { 
    title: "Architecture Intérieure", 
    subtitle: "Coaching & Décoration", 
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2560",
    cursorTag: "STRUCTURE"
  },
  { 
    title: "Design Aquatique", 
    subtitle: "Murs d'eau & Aquariums", 
    img: "https://images.unsplash.com/photo-1520967824495-b529aeba26df?q=80&w=2560",
    cursorTag: "AQUA"
  },
  { 
    title: "Design Végétal", 
    subtitle: "Paysagiste & Végétal Stabilisé", 
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2560",
    cursorTag: "NATURE"
  },
  { 
    title: "Formation", 
    subtitle: "Transmission du Savoir-faire", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2560",
    cursorTag: "STUDIO"
  },
];

export default function Services() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  
  // Custom Mouse Tracker
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor "lag" effect
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#FDFDFD] relative z-10 cursor-none">
      
      {/* --- DYNAMIC CUSTOM CURSOR (Matches Hero Glass Morph) --- */}
      <AnimatePresence>
        {hoveredService && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-0 left-0 w-28 h-28 rounded-full pointer-events-none z-[9999] flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl mix-blend-difference"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <span className="text-[10px] font-black text-white tracking-widest uppercase italic p-4 text-center leading-tight">
              {hoveredService}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* TITLE SECTION (Aligned with Hero Style) */}
        <div className="mb-24 flex items-end gap-6 justify-between border-b border-zinc-100 pb-12">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-green-700 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-green-700" /> Expertises
            </h2>
            <p className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.85] italic">
              Nos Services <br /> <span className="text-zinc-200">Sur-Mesure</span>
            </p>
          </div>
          <p className="text-[8px] font-mono tracking-[0.5em] text-zinc-300 uppercase hidden md:block">
            Projet Réf: SER_2026 // Casa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              onMouseEnter={() => setHoveredService(service.cursorTag)}
              onMouseLeave={() => setHoveredService(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col"
            >
              {/* IMAGE CONTAINER (Clean Rectangular + Thick White Border) */}
              <div className="relative h-[500px] md:h-[650px] w-full bg-zinc-900 overflow-hidden shadow-2xl">
                <Image 
                  src={service.img} 
                  alt={service.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  // Standard brightness/color on load. Gentle scale on hover.
                  className="object-cover brightness-100 grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-105"
                  priority={index < 2}
                />

                {/* --- REFINED GLASS HOVER --- */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                   {/* Backdrop Blur to make it "Glass" */}
                   <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />
                   {/* Diagonal Specular Highlight Sweep */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out" />
                   {/* Inner polished edge */}
                   <div className="absolute inset-4 border border-white/20" />
                </div>

                {/* THICK WHITE PORTFOLIO FRAME (Matches Hero Aesthetic) */}
                <div className="absolute inset-0 border-[15px] border-white z-20 pointer-events-none shadow-sm" />

                {/* TECHNICAL SPEC LABEL (Appears on Hover) */}
                <div className="absolute top-10 right-10 z-30 overflow-hidden h-6">
                    <motion.span className="block text-[7px] font-mono text-white/60 uppercase tracking-[0.5em] translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        Visual Data // HI_{index + 1}
                    </motion.span>
                </div>
              </div>

              {/* CONTENT AREA (Typography slides up on hover) */}
              <div className="relative mt-8 group-hover:translate-x-4 transition-transform duration-700 ease-out z-10">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-green-700 text-[9px] font-black uppercase tracking-widest">
                        {service.subtitle}
                    </span>
                    <div className="w-0 group-hover:w-16 h-[1px] bg-green-700 transition-all duration-700" />
                </div>
                
                <h3 className="text-zinc-900 text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
                  {service.title}
                </h3>
              </div>

              {/* MASSIVE GHOST NUMBER */}
              <div className="absolute -top-16 -right-8 text-[12rem] font-black text-zinc-100/50 select-none group-hover:text-green-700/5 transition-colors duration-1000 -z-0">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}