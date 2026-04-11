"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-16 pb-20 overflow-hidden bg-[#FDFDFD]">
      
      {/* BRAND HEADER - Subtle & Clean */}
      <div className="mb-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <span className="text-green-700 uppercase tracking-[0.6em] text-[9px] font-black">
            Bespoke Architecture
          </span>
          <div className="h-[1px] w-12 bg-zinc-200" />
          <span className="text-zinc-400 uppercase tracking-[0.6em] text-[9px] font-medium">
            Casablanca
          </span>
        </motion.div>
      </div>

      {/* DUAL-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch h-[65vh]">
        
        {/* LEFT: STATIC ARCHITECTURAL IMAGE */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative h-full w-full pro-clip-path overflow-hidden shadow-2xl"
        >
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560" 
            alt="Luxe Interior Design" 
            fill
            priority
            className="object-cover transition-transform duration-[5s] hover:scale-110"
          />
          {/* Subtle overlay to soften the image */}
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        {/* RIGHT: INTERACTIVE VIDEO PORTAL */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
          className="relative h-full w-full pro-clip-path overflow-hidden group cursor-pointer shadow-2xl bg-zinc-900"
          onClick={() => setIsVideoOpen(true)}
        >
          <Image 
            src="https://i.ytimg.com/vi/lWa5EAfRP34/maxresdefault.jpg" 
            alt="Cinematic Design Video" 
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 opacity-80"
          />
          
          {/* Play Interface */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:border-green-500 group-hover:bg-white/10 transition-all duration-500">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
            </div>
            <p className="mt-6 text-[9px] text-white uppercase tracking-[0.5em] font-bold opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
              Vision: Hatim Idrissi
            </p>
          </div>
        </motion.div>
      </div>

      {/* VIDEO MODAL (Remains the same) */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-zinc-950 flex items-center justify-center p-4 md:p-20"
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-10 right-10 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:text-green-500 transition-colors z-[210]"
            >
              Fermer [×]
            </button>
            <div className="w-full h-full max-w-6xl aspect-video bg-black shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/lWa5EAfRP34?autoplay=1&rel=0" 
                title="Hatim Idrissi Architecture Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}