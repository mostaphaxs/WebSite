"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

/** * RAW SVG ICONS - Build-Safe */
const Icons = {
  Instagram: ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.51"/></svg>
  ),
  Linkedin: ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  Facebook: ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  Youtube: ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 103.38 103.38 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 103.38 103.38 0 0 1-15 0 2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3z"/></svg>
  ),
  X: ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l11.733 16h4.267l-11.733-16z M4 20l6.768-6.768 M13.232 10.768L20 4" /></svg>
  ),
  Houzz: ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 24V14.86h7.14V24H12zM4.86 14.86h7.14v9.14H4.86v-9.14zM12 0v9.14H4.86V0H12zM19.14 0v18.28H12V9.14h7.14V0z"/></svg>
  ),
  Mail: ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  )
};

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 150]);

  const dockSocials = [
    { icon: <Icons.Instagram size={16} />, href: "#" },
    { icon: <Icons.Linkedin size={16} />, href: "#" },
    { icon: <Icons.Facebook size={16} />, href: "#" },
  ];

  const topPlatforms = [
    { icon: <Icons.Instagram />, color: "#E4405F", href: "#" },
    { icon: <Icons.Youtube />, color: "#FF0000", href: "#" },
    { icon: <Icons.Facebook />, color: "#1877F2", href: "#" },
    { icon: <Icons.Linkedin />, color: "#0077B5", href: "#" },
    { icon: <Icons.X />, color: "#000000", href: "#" },
    { icon: <Icons.Houzz />, color: "#7AC142", href: "#" },
    { icon: <Icons.Mail />, color: "#15803d", href: "#" },
  ];

  return (
    <section className="relative h-[calc(100vh-100px)] mt-[100px] flex flex-col justify-center px-20 md:px-12 overflow-hidden bg-[#FDFDFD]">
      
      {/* 1. BACKGROUND WATERMARK - Reverted to Subtle Dark */}
      <motion.div style={{ y: y1 }} className="absolute -left-10 top-0 pointer-events-none select-none opacity-[0.02] z-0">
        <h2 className="text-[55vw] font-black leading-none text-zinc-900">H</h2>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute -right-10 bottom-0 pointer-events-none select-none opacity-[0.02] z-0">
        <h2 className="text-[55vw] font-black leading-none text-zinc-900">I</h2>
      </motion.div>

      {/* 2. PERSISTENT SOCIAL DOCK */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-8 z-30">
        <span className="text-[8px] font-black tracking-[0.5em] text-zinc-300 rotate-90 mb-4 select-none uppercase">Connect</span>
        <div className="w-[1px] h-16 bg-zinc-200 mb-2" />
        <div className="flex flex-col gap-6">
          {dockSocials.map((social, index) => (
            <motion.a 
              key={index} href={social.href} 
              whileHover={{ scale: 1.2, color: "#15803d" }}
              className="text-zinc-400 transition-colors duration-300 flex items-center justify-center"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        <div className="w-[1px] h-16 bg-zinc-200 mt-2" />
      </div>

      {/* 3. COORDINATES */}
      <div className="absolute left-12 bottom-12 hidden xl:flex items-center gap-6 opacity-30 z-20">
        <div className="h-[1px] w-16 bg-zinc-900" />
        <span className="text-[9px] tracking-[0.5em] font-mono text-zinc-900 italic uppercase">33.5898 N // 7.6038 W</span>
      </div>

      {/* 4. MAIN LAYOUT */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end relative z-10">
        
        {/* LEFT IMAGE ACCENT (Using local Image.png) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
          className="hidden md:block md:col-span-5 lg:col-span-4 relative h-[70vh] w-150 group"
        >
          <div className="w-full h-full pro-clip-path overflow-hidden light-sweep shadow-2xl bg-zinc-100">
            <Image 
              src="/Image.png" 
              alt="Hatim Idrissi Architecture" 
              fill 
              className="object-cover transition-transform duration-[8s] group-hover:scale-110"
            />
            <div className="absolute inset-0 border border-white/20 pro-clip-path z-30 pointer-events-none group-hover:border-green-500/40 transition-colors duration-700" />
          </div>
        </motion.div>

        {/* RIGHT AREA: ICONS + VIDEO */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6">
          
          {/* TOP PLATFORM BAR + EXPRESSION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center -my-2 gap-8 mt-7 px-20"
          >
            {/* The Icons */}
            <div className="flex items-center gap-8 shrink-0">
              {topPlatforms.map((p, i) => (
                <motion.a 
                  key={i} href={p.href}
                  whileHover={{ 
                    scale: 1.25, 
                    color: p.color,
                    filter: `drop-shadow(0 0 10px ${p.color}66)` 
                  }}
                  className="text-zinc-400 transition-colors duration-300"
                >
                  {p.icon}
                </motion.a>
              ))}
            </div>
            
            {/* The Connecting Line & Expression */}
            <div className="flex-grow flex items-center gap-6 overflow-hidden">
              <div className="flex-grow h-[1px] bg-zinc-200" />
              <span className="text-[12px] tracking-[0.2em] font-semibold text-zinc-400 uppercase italic whitespace-nowrap">
                "Un jour je suis né depuis j'improvise."
              </span>
            </div>
          </motion.div>

          {/* VIDEO PORTAL */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="relative h-[55vh] left-20 md:h-155 w-270 group cursor-pointer"
            onClick={() => setIsVideoOpen(true)}
          >
            <div className="w-full h-full pro-clip-path overflow-hidden light-sweep shadow-2xl bg-zinc-950">
              <Image 
                src="https://i.ytimg.com/vi/lWa5EAfRP34/maxresdefault.jpg" 
                alt="Project Film" fill priority
                className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-[2000ms]"
              />
              
              <div className="absolute inset-0 border border-white/10 pro-clip-path z-30 pointer-events-none group-hover:border-green-500/50 transition-colors duration-700" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-green-500/50 transition-all duration-700 bg-white/5 backdrop-blur-sm shadow-2xl">
                   <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-2" />
                </div>
              </div>

              <div className="absolute bottom-10 left-10 p-5 rounded-sm border border-white/10 bg-white/5 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 shadow-2xl">
                 <span className="text-[10px] text-white uppercase tracking-[0.5em] font-black">Experience Film</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 5. MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-zinc-950/95 backdrop-blur-3xl flex items-center justify-center p-4"
          >
            <div className="w-full max-w-6xl aspect-video relative rounded-lg overflow-hidden shadow-2xl border border-white/10">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/lWa5EAfRP34?autoplay=1" frameBorder="0" allowFullScreen />
              <button 
                onClick={() => setIsVideoOpen(false)} 
                className="absolute -top-12 right-0 text-white text-[10px] tracking-[0.4em] uppercase hover:text-green-500 transition-colors"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}