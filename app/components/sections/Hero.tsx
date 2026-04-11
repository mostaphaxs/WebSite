"use client";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 pt-32">
      <div className="max-w-5xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-brand-green uppercase tracking-[0.3em] text-sm font-bold mb-6"
        >
          Hatim Idrissi Architecte d'Intérieur
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[1.1] mb-8 text-brand-dark"
        >
          Transformer chaque espace en une œuvre d'art naturelle.
        </motion.h1>
      </div>

      {/* High-quality cover image placeholder representing their eco-design */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="w-full h-[50vh] mt-12 bg-gray-200 overflow-hidden relative"
      >
        <img 
          src="/hero-architecture.jpg" 
          alt="Architecture d'intérieur par Hatim Idrissi" 
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
      </motion.div>
    </section>
  );
}