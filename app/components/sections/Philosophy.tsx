"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, Variants } from "motion/react";
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

  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const ghostX = useTransform(scrollYProgress, [0, 1], [0, -100]); // Ghost text movement

  const nameVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.3, duration: 1.2, ease: "circOut" }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  return (
    <section ref={containerRef} className="pt-32 pb-32 bg-[#FDFDFD] relative overflow-hidden px-6 md:px-12 lg:px-24">
      
      {/* 2. BACKGROUND GHOST TEXT (Makes it feel 'Full') */}
      <motion.div 
        style={{ x: ghostX }}
        className="absolute top-20 right-[-10%] text-[20vw] font-black text-zinc-50 select-none pointer-events-none whitespace-nowrap z-0 uppercase italic"
      >
        L'ESSENTIEL
      </motion.div>

      {/* Background Guides */}
      <div className="absolute top-0 left-[15%] w-[1px] h-full bg-zinc-100/50 hidden lg:block" />
      <div className="absolute top-0 right-[15%] w-[1px] h-full bg-zinc-100/50 hidden lg:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-start mb-20 gap-4">
          <motion.h2 
            initial="hidden" animate={isInView ? "visible" : "hidden"} variants={nameVariants}
            className="text-5xl md:text-8xl font-black text-zinc-900 leading-[0.8] tracking-tighter uppercase italic"
          >
            NOTRE <br /> 
            <span className="text-zinc-900">PHILOSOPHIE</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
         {/* 3. OPTIMIZED IMAGE BLOCK */}
<div className="lg:col-span-5 order-2 lg:order-1 relative">
  <motion.div style={{ y: imgY }} className="relative aspect-[3/4] overflow-hidden shadow-2xl bg-zinc-100">
    <Image 
      // This is a high-end, minimalist white kitchen (Architectural standard)
      src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1200" 
      alt="Minimal Architectural Kitchen" 
      fill 
      priority
      unoptimized={true} // Bypasses potential Next.js image optimization errors
      className="object-cover transition-all duration-1000 scale-105"
    />
    {/* Glass frame overlay */}
    <div className="absolute inset-0 border-[12px] border-[#FDFDFD] z-20" />
  </motion.div>
  
  {/* Small Floating Quote (Adds fullness) */}
  <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="absolute -bottom-10 -right-10 bg-white p-6 shadow-xl hidden lg:block max-w-[200px] z-30"
  >
      <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-bold">Structure</p>
      <p className="text-xs font-medium text-zinc-900 leading-relaxed italic">"L'harmonie naît de la soustraction, pas de l'addition."</p>
  </motion.div>
</div>

          {/* Text Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-16 lg:pl-10">
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={nameVariants} className="space-y-8">
              <p className="text-zinc-900 text-3xl md:text-5xl leading-[1.1] font-light italic tracking-tight">
                "Le design est le <span className="text-green-800 font-medium">reflet</span> des pensées et du mode de vie."
              </p>
              <div className="w-32 h-[2px] bg-green-800/20" />
            </motion.div>

            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={nameVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-500 text-base leading-relaxed">
              <p>Chez Naturel Design, nous comprenons que l'architecture intérieure joue un rôle central dans l'amélioration du quotidien.</p>
              <p className="border-l border-zinc-200 pl-8 italic">Nous intervenons avec réactivité et précision pour transformer l'espace en une expérience sensorielle.</p>
            </motion.div>

            {/* SIGNATURE SECTION */}
            <motion.div 
              initial="hidden" animate={isInView ? "visible" : "hidden"} variants={nameVariants} 
              className="pt-12 flex flex-col items-start perspective-[1200px]"
            >
              <div 
                className="relative mb-4 group cursor-pointer py-10 px-6 -ml-6"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { x.set(0); y.set(0); }}
              >
                <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
                    <motion.span 
                      style={{ x: shadowX, y: shadowY, transform: 'translateZ(-20px)' }}
                      className="absolute inset-0 text-6xl font-signature italic text-zinc-200 blur-[3px] opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                    >
                        Hatim Idrissi
                    </motion.span>
                    
                    <span className="text-6xl md:text-7xl font-signature text-zinc-900 italic relative z-10 block">
                      Hatim Idrissi
                    </span>
                </motion.div>

                <div className="absolute bottom-6 left-6 w-full pointer-events-none">
                  <svg width="240" height="40" viewBox="0 0 240 40" fill="none">
                    <motion.path
                      d="M10 20C60 5 120 35 180 20C220 10 240 25 245 15"
                      stroke="#15803d"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </div>
              
              <span className="text-[10px] font-mono tracking-[0.6em] text-zinc-400 uppercase">
                Directeur Artistique
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}