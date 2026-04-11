"use client";
import { motion, AnimatePresence, Variants } from "motion/react";
import { useState, useEffect } from "react";

export default function PageReveal({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to ensure 3D assets/images start their own entrance logic
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const glassVariants: Variants = {
    hidden: { opacity: 1 },
    exit: { 
      opacity: 0,
      scale: 1.15,
      filter: "blur(30px)",
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            variants={glassVariants}
            initial="hidden"
            exit="exit"
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-white"
          >
            {/* The "Glass Slab" Background */}
            <motion.div 
              initial={{ width: "0%", opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="absolute inset-0 bg-zinc-50/50 backdrop-blur-3xl"
            />
            
            <div className="relative overflow-hidden flex flex-col items-center">
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <h1 className="text-[10px] font-black tracking-[1.2em] uppercase text-zinc-900 ml-[1.2em]">
                  Hatim Idrissi
                </h1>
                <p className="text-[6px] font-bold tracking-[0.5em] text-zinc-400 uppercase mt-4 italic">
                  Chargement de l'espace...
                </p>
              </motion.div>
              
              {/* Minimalist Progress Line */}
              <div className="h-[1px] w-32 bg-zinc-100 mt-6 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-zinc-900"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Content "Rise" Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={!isLoading ? { 
          opacity: 1, 
          y: 0, 
          scale: 1 
        } : {}}
        transition={{ 
          duration: 1.4, 
          ease: [0.22, 1, 0.36, 1], 
          delay: 0.3 
        }}
      >
        {children}
      </motion.div>
    </>
  );
}