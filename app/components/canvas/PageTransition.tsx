"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const architecturalColors = {
  terracotta: "#D08C63",
  teal: "#0096FF",
  green: "#22C55E",
  gray: "#A1A1A1",
  zinc: "#0F172A",
  light: "#F1F5F9",
};

export default function PageReveal({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 7000); // 7s for full detail drawing
    return () => clearTimeout(timer);
  }, []);

  const drawVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: { d: number, l: number }) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: custom.d,
        delay: custom.l,
        ease: "easeInOut"
      }
    }),
    fade: (delay: number) => ({
      opacity: 1,
      transition: { delay, duration: 1 }
    })
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center overflow-hidden"
            exit={{
              opacity: 0,
              filter: "blur(20px)",
              transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            {/* ARCHITECTURAL GRID */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(#000 0.5px, transparent 0.5px), linear-gradient(90deg, #000 0.5px, transparent 0.5px)",
                backgroundSize: "24px 24px"
              }} />

            {/* HORIZONTAL BRANDING (TOP) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="absolute top-12 left-12 z-20 flex flex-col"
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-[0.4em] text-zinc-900 italic">
                Hatim Idrissi
              </h1>
              <div className="h-[2px] w-24 bg-terracotta mt-2" />
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest leading-none">STUDIO D'ARCHITECTURE D'INTÉRIEUR</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              </div>
            </motion.div>

            {/* FULLY FURNISHED ARCHITECTURAL PLANIFICATION */}
            <div className="relative w-full max-w-5xl aspect-[16/9] p-4 scale-75 md:scale-95 lg:scale-105 mt-20">
              <svg viewBox="0 0 1000 560" className="w-full h-full opacity-70">
                <defs>
                  <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke={architecturalColors.light} strokeWidth="1" />
                  </pattern>
                </defs>

                {/* --- 1. THE SHELL (0s-2s) --- */}
                <motion.path
                  d="M50 50 H950 V510 H50 Z"
                  stroke={architecturalColors.zinc} strokeWidth="3.5" fill="none"
                  variants={drawVariants} custom={{ d: 2, l: 0 }}
                  initial="hidden" animate="visible"
                />

                {/* --- 2. MAIN ROOMS DIVISION (1s-3s) --- */}
                <motion.path
                  d="M320 50 V320 H50 M320 320 V510 M650 50 V400 H950 M650 400 V510 M480 320 H680"
                  stroke={architecturalColors.zinc} strokeWidth="2.5" fill="none"
                  variants={drawVariants} custom={{ d: 2, l: 1 }}
                  initial="hidden" animate="visible"
                />

                {/* --- 3. DOORS & CIRCULATION (2.5s-4s) --- */}
                <motion.path d="M320 230 A 90 90 0 0 1 230 320" stroke={architecturalColors.teal} strokeWidth="1" fill="none" strokeDasharray="4 4" variants={drawVariants} custom={{ d: 1, l: 2.5 }} initial="hidden" animate="visible" />
                <motion.path d="M650 320 A 80 80 0 0 0 730 400" stroke={architecturalColors.teal} strokeWidth="1" fill="none" strokeDasharray="4 4" variants={drawVariants} custom={{ d: 1, l: 2.7 }} initial="hidden" animate="visible" />

                {/* --- 4. THE KITCHEN (Zone A - Top Left) (3s-5s) --- */}
                <motion.rect x="80" y="80" width="180" height="80" stroke={architecturalColors.gray} strokeWidth="1" fill="none" variants={drawVariants} custom={{ d: 1, l: 3 }} initial="hidden" animate="visible" />
                <motion.path d="M80 120 H260 M140 80 V160 M200 80 V160" stroke={architecturalColors.gray} strokeWidth="0.5" fill="none" variants={drawVariants} custom={{ d: 1, l: 3.5 }} initial="hidden" animate="visible" />
                {/* Island Stools */}
                {[280, 230, 180].map((x, i) => (
                  <motion.circle key={x} cx={x} cy="180" r="10" stroke={architecturalColors.gray} strokeWidth="0.5" fill="none" variants={drawVariants} custom={{ d: 0.5, l: 4 + i * 0.1 }} initial="hidden" animate="visible" />
                ))}

                {/* --- 5. LIVING ROOM (Zone B - Top Right) (3.5s-5.5s) --- */}
                <motion.path d="M680 80 H920 V250 H840 V150 H680 Z" stroke={architecturalColors.gray} strokeWidth="1.2" fill="none" variants={drawVariants} custom={{ d: 1.5, l: 3.5 }} initial="hidden" animate="visible" />
                <motion.rect x="730" y="110" width="80" height="40" stroke={architecturalColors.gray} strokeWidth="0.8" fill="none" variants={drawVariants} custom={{ d: 1, l: 4 }} initial="hidden" animate="visible" />
                <motion.path d="M840 280 H920" stroke={architecturalColors.gray} strokeWidth="1.5" variants={drawVariants} custom={{ d: 0.5, l: 4.5 }} initial="hidden" animate="visible" /> {/* TV Unit */}

                {/* --- 6. BEDROOM (Zone C - Bottom Left) (4s-6s) --- */}
                <motion.rect x="80" y="350" width="140" height="130" rx="4" stroke={architecturalColors.terracotta} strokeWidth="1" fill="none" variants={drawVariants} custom={{ d: 1, l: 4 }} initial="hidden" animate="visible" />
                <motion.path d="M80 400 H220 M110 350 V370 M160 350 V370" stroke={architecturalColors.terracotta} strokeWidth="0.5" fill="none" variants={drawVariants} custom={{ d: 0.8, l: 4.5 }} initial="hidden" animate="visible" />
                {/* Wardrobe */}
                <motion.rect x="250" y="320" width="40" height="190" stroke={architecturalColors.gray} strokeWidth="1.2" fill="none" variants={drawVariants} custom={{ d: 1, l: 4.2 }} initial="hidden" animate="visible" />

                {/* --- 7. DINING ROOM (Zone D - Bottom Right) (4.5s-6.5s) --- */}
                <motion.rect x="700" y="420" width="220" height="70" rx="2" stroke={architecturalColors.zinc} strokeWidth="1.5" fill="none" variants={drawVariants} custom={{ d: 1, l: 4.5 }} initial="hidden" animate="visible" />
                {/* 6 Chairs */}
                {[730, 810, 890].map((x, i) => (
                  <React.Fragment key={x}>
                    <motion.rect x={x - 15} y="405" width="30" height="15" stroke={architecturalColors.gray} strokeWidth="0.5" fill="none" variants={drawVariants} custom={{ d: 0.4, l: 5 + i * 0.1 }} initial="hidden" animate="visible" />
                    <motion.rect x={x - 15} y="490" width="30" height="15" stroke={architecturalColors.gray} strokeWidth="0.5" fill="none" variants={drawVariants} custom={{ d: 0.4, l: 5.3 + i * 0.1 }} initial="hidden" animate="visible" />
                  </React.Fragment>
                ))}

                {/* --- 8. ANNOTATIONS & LEGEND (6s-7s) --- */}
                <text x="80" y="72" fill={architecturalColors.gray} fontSize="8" fontFamily="monospace" opacity="0.6">ZONE_A: KITCHEN</text>
                <text x="700" y="72" fill={architecturalColors.gray} fontSize="8" fontFamily="monospace" opacity="0.6">ZONE_B: LIVING</text>
                <text x="80" y="342" fill={architecturalColors.terracotta} fontSize="8" fontFamily="monospace" opacity="0.6">ZONE_C: SUITE</text>
                <text x="700" y="412" fill={architecturalColors.zinc} fontSize="8" fontFamily="monospace" opacity="0.6">ZONE_D: DINING</text>
              </svg>

              {/* TECHNICAL DATA OVERLAYS */}
              <div className="absolute inset-x-0 inset-y-0 pointer-events-none p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-zinc-900 tracking-tight uppercase">Planification Architecture d'Intérieur // MOBILIER</span>
                    <span className="text-[8px] font-mono text-zinc-400 uppercase">Projet: RÉSIDENCE PRIVÉE // REF: F-002</span>
                  </motion.div>
                </div>

                <div className="flex justify-between items-end">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5 }} className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-terracotta" />
                        <div className="w-1.5 h-1.5 bg-teal" />
                        <div className="w-1.5 h-1.5 bg-zinc-900" />
                      </div>
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest leading-none">Vérification de cotes validée</span>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 6 }} className="flex flex-col items-end">
                    <span className="text-[7px] font-mono text-zinc-400 uppercase tracking-widest leading-none">Certifié Concept Studio</span>
                    <span className="text-[10px] font-black text-zinc-900 italic tracking-widest uppercase mt-1">IDRISSI ARCH</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white">
        {children}
      </div>
    </>
  );
}