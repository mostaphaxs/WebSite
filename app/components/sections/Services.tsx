"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

const services = [
  { 
    title: "Architecture Intérieure", 
    subtitle: "Coaching & Décoration", 
    // High-end 4K Unsplash Architectural Image
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2560" 
  },
  { 
    title: "Design Aquatique", 
    subtitle: "Murs d'eau & Aquariums", 
    // High-end 4K Unsplash Aquatic Design Image
    img: "https://images.unsplash.com/photo-1520967824495-b529aeba26df?q=80&w=2560" 
  },
  { 
    title: "Design Végétal", 
    subtitle: "Paysagiste & Végétal Stabilisé", 
    // High-end 4K Unsplash Green Wall Image
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2560" 
  },
  { 
    title: "Formation", 
    subtitle: "Transmission du Savoir-faire", 
    // High-end 4K Unsplash Professional Studio Image
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2560" 
  },
];

export default function Services() {
  return (
    <section className="py-32 px-10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-green-700 mb-4">
            Nos Expertises
          </h2>
          <p className="text-4xl font-black uppercase tracking-tighter text-zinc-900">
            Concevoir l'excellence par la nature.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col"
            >
              {/* UNIQUE SHAPE CONTAINER */}
              {/* We use 'pro-clip-path' from our globals.css */}
              <div className="relative h-[600px] w-full bg-zinc-100 overflow-hidden pro-clip-path">
                <Image 
                  src={service.img} 
                  alt={service.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  // THE UNIQUE HOVER EFFECT: Scale + Skew + Color-shift
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:skew-y-1 grayscale group-hover:grayscale-0"
                  priority={index < 2} // Preload the top two images for performance
                />
              </div>

              {/* OVERLAY / TITLE */}
              <div className="absolute inset-0 flex flex-col justify-end p-10 pointer-events-none">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">
                  {service.subtitle}
                </span>
                <h3 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  {service.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}