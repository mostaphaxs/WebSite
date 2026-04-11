"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function PageReveal({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              filter: "blur(40px)", // The "melting glass" feel
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
            }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-white"
          >
            {/* The Glass Layer */}
            <motion.div 
              className="absolute inset-0 bg-zinc-50/40 backdrop-blur-3xl"
            />
            
            {/* Minimalist Centered Brand */}
            <div className="relative overflow-hidden flex flex-col items-center">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[10px] font-black tracking-[1.2em] uppercase text-zinc-900 ml-[1.2em]"
              >
                Hatim Idrissi
              </motion.h1>
              <div className="h-[1px] w-24 bg-zinc-100 mt-4 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-zinc-900"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PURE CONTENT: 
          No movement, no scaling. 
          The site is already there, just being "un-blurred".
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={!isLoading ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </>
  );
}