"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The 4 brand colors derived from the Services section
const architecturalColors = [
  "#D08C63", // Terracotta
  "#0096FF", // Ocean Teal
  "#22C55E", // Forest Green
  "#A1A1A1", // Charcoal/Taupe
];

export default function PageReveal({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const filterId = React.useId();
  const [splashes, setSplashes] = useState<any[]>([]);

  useEffect(() => {
    // Generate ultra-random chaotic blobs covering the screen
    // We only do this on the client side to avoid hydration mismatches
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      color: architecturalColors[i % 4],
      w: 150 + Math.random() * 400, // Varying sizes from medium to huge
      h: 150 + Math.random() * 400,
      top: `${-20 + Math.random() * 140}%`, // Ensure they spread outside borders too
      left: `${-20 + Math.random() * 140}%`,
      // Organic gooey borders
      br: `${40 + Math.random() * 30}% ${40 + Math.random() * 30}% ${40 + Math.random() * 30}% ${40 + Math.random() * 30}% / ${40 + Math.random() * 30}% ${40 + Math.random() * 30}% ${40 + Math.random() * 30}% ${40 + Math.random() * 30}%`,
      rotate: Math.random() * 360,
      // Aggressive burst trajectories for the exit animation
      endX: `${(Math.random() - 0.5) * 300}vw`,
      endY: `${(Math.random() - 0.5) * 300}vh`,
      delay: Math.random() * 0.4, // Staggered entry
      duration: 1.5 + Math.random() * 1
    }));

    setSplashes(generated);

    // Give it time to load the splash and then explode beautifully
    const timer = setTimeout(() => setIsLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0, transition: { duration: 1.5, delay: 0.5 } }} // Parent fades out AFTER blobs burst
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#FDFDFD] overflow-hidden"
          >
            {/* GOOEY SVG FILTER DEDICATED TO PRELOADER */}
            <svg className="absolute w-0 h-0">
              <defs>
                <filter id={filterId}>
                  <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
                    result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </defs>
            </svg>

            {/* Random Splashes canvas combining via Gooey Filter */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none scale-125"
              style={{ filter: `url(#${filterId})` }}
            >
              {splashes.map((splash) => (
                <motion.div
                  key={splash.id}
                  initial={{ scale: 0, rotate: splash.rotate }}
                  animate={{
                    scale: [0, 1.2, 1], // Popping in and settling
                  }}
                  exit={{
                    x: splash.endX,
                    y: splash.endY,
                    scale: 0,
                    // High-velocity exit physics to explode outward
                    transition: { duration: splash.duration, ease: [0.76, 0, 0.24, 1] }
                  }}
                  transition={{ duration: 1.2, delay: splash.delay, ease: "easeOut" }}
                  className="absolute"
                  style={{
                    backgroundColor: splash.color,
                    width: splash.w,
                    height: splash.h,
                    top: splash.top,
                    left: splash.left,
                    borderRadius: splash.br,
                  }}
                />
              ))}
            </div>

            {/* Premium Typography Overlay */}
            <motion.div
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.6 } }}
              // Strong dark drop-shadow so text is piercingly clear over ANY chaotic colored splashes
              className="absolute z-10 flex flex-col items-center drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
            >
              <div className="relative flex flex-col items-center">
                {/* Top Subtitle */}
                <div className="overflow-hidden mb-8">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                    className="block text-white font-black text-[10px] md:text-[12px] tracking-[0.4em] uppercase"
                  >
                    Architecture Intérieure
                  </motion.span>
                </div>

                {/* Main Brand Title Reveal */}
                <div className="overflow-hidden flex gap-4 md:gap-8">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="text-7xl md:text-9xl font-black tracking-tighter uppercase text-white italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                  >
                    Hatim
                  </motion.h1>
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    className="text-7xl md:text-9xl font-black tracking-tighter uppercase text-white italic opacity-90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                  >
                    Idrissi
                  </motion.h1>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#FDFDFD]">
        {children}
      </div>
    </>
  );
}