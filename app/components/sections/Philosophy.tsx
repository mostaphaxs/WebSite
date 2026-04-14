"use client";
import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, Variants, AnimatePresence } from "motion/react";
import Image from "next/image";

// Static data — defined outside component to avoid recreation on every render
const images = ["/Scroll/1.png", "/Scroll/2.png", "/Scroll/3.png", "/Scroll/4.png", "/Scroll/5.png", "/Scroll/6.png", "/Scroll/7.png", "/Scroll/8.png", "/Scroll/9.png"];

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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  }, [x, y]);

  // --- CAROUSEL LOGIC ---
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)), []);
  const prevSlide = useCallback(() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)), []);

  return (
    <section ref={containerRef} className="pt-32 pb-32 bg-white relative overflow-hidden px-6 md:px-12 lg:px-24">

      {/* Static Gooey Color Splashes representing the 4 Service Colors */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply opacity-50">
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="philo-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <div className="absolute inset-0 scale-125" style={{ filter: "url(#philo-goo)" }}>
          {/* Terracotta Splat */}
          <div className="absolute top-[10%] right-[10%] w-72 h-72 bg-[#D08C63] rounded-[45%_55%_40%_60%/55%_45%_60%_40%]" />
          <div className="absolute top-[5%] right-[20%] w-40 h-40 bg-[#D08C63] rounded-full" />
          <div className="absolute top-[20%] right-[5%] w-20 h-20 bg-[#D08C63] rounded-full" />

          {/* Ocean Teal Splat */}
          <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-[#0096FF] rounded-[60%_40%_50%_50%/40%_50%_50%_60%]" />
          <div className="absolute bottom-[25%] left-[15%] w-64 h-64 bg-[#0096FF] rounded-full" />
          <div className="absolute bottom-[5%] left-[25%] w-24 h-24 bg-[#0096FF] rounded-full" />

          {/* Forest Green Splat */}
          <div className="absolute top-[40%] left-[20%] w-96 h-96 bg-[#22C55E] rounded-[50%_60%_40%_70%/60%_50%_70%_40%]" />
          <div className="absolute top-[35%] left-[10%] w-48 h-48 bg-[#22C55E] rounded-full" />
          <div className="absolute top-[55%] left-[30%] w-32 h-32 bg-[#22C55E] rounded-full" />

          {/* Charcoal/Taupe Splat */}
          <div className="absolute bottom-[20%] right-[5%] w-80 h-80 bg-[#A1A1A1] rounded-[40%_60%_70%_30%/50%_40%_60%_50%]" />
          <div className="absolute bottom-[35%] right-[15%] w-56 h-56 bg-[#A1A1A1] rounded-[60%_50%_40%_60%/40%_60%_50%_40%]" />
          <div className="absolute bottom-[15%] right-[20%] w-32 h-32 bg-[#A1A1A1] rounded-full" />
        </div>
      </div>

      {/* 2. BACKGROUND GHOST TEXT (Makes it feel 'Full') */}
      <motion.div
        style={{ x: ghostX }}
        className="absolute top-[5%] left-0 md:left-[-10%] text-[18vw] font-black text-zinc-100/60 select-none pointer-events-none whitespace-nowrap z-0 uppercase italic"
      >
        L'ESSENTIEL
      </motion.div>

      {/* Background Guides */}
      <div className="absolute top-0 left-[15%] w-[1px] h-full bg-zinc-100/50 hidden lg:block" />
      <div className="absolute top-0 right-[15%] w-[1px] h-full bg-zinc-100/50 hidden lg:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col gap-24 relative z-10 mb-20">
          {/* --- UNIFIED SECTION HEADER --- */}
          <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={nameVariants}>
            <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.8] italic text-zinc-900 flex flex-col">
              <span className="opacity-100">Notre</span>
              <span className="text-zinc-200 block sm:inline-block sm:ml-[10vw] lg:ml-[12vw] mt-2 group-hover:text-zinc-900 transition-colors duration-700">
                Philosophie
              </span>
            </h2>
            <div className="w-32 h-[2px] bg-zinc-900/20 mt-12" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* 3. OPTIMIZED IMAGE CAROUSEL BLOCK */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative group">
            <motion.div style={{ y: imgY }} className="relative aspect-[3/4] overflow-hidden shadow-2xl bg-zinc-100">

              {/* Carousel Images */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`Naturel Design Realization ${currentIndex + 1}`}
                    fill
                    priority={currentIndex === 0}
                    loading={currentIndex === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-[10s] scale-105 group-hover:scale-110"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Glass frame overlay */}
              <div className="absolute inset-0 border-[12px] border-[#FDFDFD] z-20 pointer-events-none" />

              {/* Controls: Left Arrow */}
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-zinc-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-30 hover:bg-white"
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>

              {/* Controls: Right Arrow */}
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-zinc-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-30 hover:bg-white"
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>

              {/* Controls: Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "w-4 bg-white shadow-md" : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

            </motion.div>

            {/* Small Floating Quote (Adds fullness) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-10 -right-10 bg-white p-6 shadow-xl hidden lg:block max-w-[200px] z-40"
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

            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={nameVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-900 text-base leading-relaxed">
              <p>Chez Naturel Design, nous comprenons que l'architecture intérieure joue un rôle de plus en plus central dans l'amélioration de notre quotidien. Aujourd'hui, le design est perçu comme un élément essentiel par de nombreuses personnes. C'est pourquoi, en tant que spécialistes du domaine, nous pensons que le design reflète les pensées et le mode de vie de chacun. Notre équipe, consciente de ces évolutions, se dévoue à anticiper et satisfaire les attentes de nos clients.</p>
              <p className="border-l border-zinc-200 pl-8 italic">Hatim Idrissi, fondateur et directeur de Naturel Design, veille personnellement à ce que chaque projet porte la marque de notre engagement en matière d'excellence et de satisfaction client. Forts de notre expérience, nous intervenons avec réactivité et précision, que ce soit dans le respect des délais ou dans l'optimisation des espaces. Notre mission est simple : donner vie aux attentes de nos clients en créant des réalisations à la fois fonctionnelles et esthétiques.</p>
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
                  {/* Subtle Shadow Version */}
                  <motion.span
                    style={{ x: shadowX, y: shadowY, transform: 'translateZ(-20px)' }}
                    className={`absolute inset-0 text-6xl md:text-7xl font-signature text-zinc-200 blur-[2px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 signature-draw ${isInView ? 'animate-signature' : ''}`}
                  >
                    Hatim Idrissi
                  </motion.span>

                  {/* Main Realistic Signature */}
                  <span className={`text-6xl md:text-8xl font-signature text-zinc-900 relative z-10 block signature-draw ${isInView ? 'animate-signature' : ''}`}>
                    Hatim Idrissi
                  </span>
                </motion.div>

                {/* Optional underline/accent also draws */}
                <div className="absolute bottom-6 left-6 w-full pointer-events-none">
                  <svg width="320" height="40" viewBox="0 0 320 40" fill="none">
                    <motion.path
                      d="M10 20C80 5 160 35 240 20C280 10 310 25 315 15"
                      stroke="#D08C63"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </div>

              <span className="text-[10px] font-mono tracking-[0.6em] text-zinc-400 uppercase">
                Hatim Idrissi — Fondateur
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}