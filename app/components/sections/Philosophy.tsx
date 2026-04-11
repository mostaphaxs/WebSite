"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";

export default function Philosophy() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // 1. DYNAMIC 3D PHYSICS (Slower, heavier spring for "3D" feel)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 40, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 40, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);
  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8 }
    })
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  return (
    <section ref={containerRef} className="pt-32 pb-16 bg-[#FDFDFD] relative overflow-hidden px-6 md:px-12 lg:px-24">
      
      {/* Background Guides */}
      <div className="absolute top-0 left-[15%] w-[1px] h-full bg-zinc-100/50 hidden lg:block" />
      <div className="absolute top-0 right-[15%] w-[1px] h-full bg-zinc-100/50 hidden lg:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-start mb-20 gap-4">
          <motion.h2 
            custom={1} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={textVariant}
            className="text-4xl md:text-6xl font-black text-zinc-900 leading-[0.85] tracking-tighter uppercase italic"
          >
            NOTRE <br /> 
            <span className="text-zinc-900">PHILOSOPHIE</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Image Block */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <motion.div style={{ y: imgY }} className="relative aspect-[3/4] overflow-hidden group/glass shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200" 
                alt="Architectural Harmony" 
                fill 
                className="object-cover transition-all duration-1000 scale-105 group-hover:scale-110"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 backdrop-blur-[2px] bg-white/5" />
              <div className="absolute inset-0 border-[15px] border-[#FDFDFD] z-20" />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-12 lg:pl-10">
            <motion.div custom={2} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={textVariant} className="space-y-6">
              <p className="text-zinc-900 text-2xl md:text-4xl leading-tight font-light italic tracking-tight">
                "Le design est le <span className="text-green-700 font-medium">reflet</span> des pensées et du mode de vie de chacun."
              </p>
              <div className="w-24 h-[1px] bg-green-700/30" />
            </motion.div>

            <motion.div custom={3} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={textVariant} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-500 text-sm leading-relaxed">
              <p>Chez Naturel Design, nous comprenons que l'architecture intérieure joue un rôle central dans l'amélioration du quotidien.</p>
              <p className="border-l border-zinc-100 pl-6 italic">Nous intervenons avec réactivité et précision dans l'optimisation des volumes.</p>
            </motion.div>

            {/* ENHANCED 3D LIVE SIGNATURE */}
            <motion.div 
              custom={4} 
              initial="hidden" 
              animate={isInView ? "visible" : "hidden"} 
              variants={textVariant} 
              className="pt-12 flex flex-col items-start perspective-[1200px]"
            >
              <div 
                className="relative mb-4 group cursor-pointer py-10 px-6 -ml-6"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { x.set(0); y.set(0); }}
              >
                <motion.div
                   style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                   className="relative"
                >
                    {/* 3D PARALLAX SHADOW (Moves opposite to the mouse) */}
                    <motion.span 
                      style={{ 
                        x: shadowX, 
                        y: shadowY,
                        fontFamily: 'var(--font-signature, cursive)',
                        transform: 'translateZ(-20px)' 
                      }}
                      className="absolute inset-0 text-5xl md:text-6xl font-signature italic text-zinc-200 blur-[3px] pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                    >
                        Hatim Idrissi
                    </motion.span>
                    
                    {/* MAIN SIGNATURE TEXT (Pops forward) */}
                    <span 
                      className="text-5xl md:text-6xl font-signature text-zinc-900 italic relative z-10 select-none block group-hover:translate-z-[50px] transition-transform duration-500 ease-out"
                      style={{ fontFamily: 'var(--font-signature, cursive)' }}
                    >
                      Hatim Idrissi
                    </span>
                </motion.div>

                {/* SLOW-DRAW LIVE UNDERLINE */}
                <div className="absolute bottom-6 left-6 w-full pointer-events-none overflow-visible">
                  <svg width="240" height="40" viewBox="0 0 240 40" fill="none" className="overflow-visible">
                    <motion.path
                      d="M10 20C60 5 120 35 180 20C220 10 240 25 245 15"
                      stroke="#15803d"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.3 }}
                      // Slowed down to 2.5s for elegance
                      transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </div>
              
              <span className="text-[9px] font-mono tracking-[0.5em] text-zinc-400 uppercase group-hover:translate-x-4 transition-transform duration-700">
                Directeur Artistique
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}