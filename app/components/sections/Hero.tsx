"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/** ICONS - Pure SVG for maximum performance */
const Icons = {
  Instagram: ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.51" /></svg>
  ),
  Linkedin: ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
  ),
  Youtube: ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 103.38 103.38 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 103.38 103.38 0 0 1-15 0 2 2 0 0 1-2-2Z" /><path d="m10 15 5-3-5-3z" /></svg>
  ),
  Facebook: ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  ),
  Houzz: ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 24V14.86h7.14V24H12zM4.86 14.86h7.14v9.14H4.86v-9.14zM12 0v9.14H4.86V0H12zM19.14 0v18.28H12V9.14h7.14V0z" /></svg>
  ),
};

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const yText = useTransform(scrollY, [0, 500], [0, 60]);

  const socials = [
    { icon: <Icons.Instagram />, color: "#E4405F", href: "#" },
    { icon: <Icons.Linkedin />, color: "#0077B5", href: "#" },
    { icon: <Icons.Youtube />, color: "#FF0000", href: "#" },
    { icon: <Icons.Facebook />, color: "#1877F2", href: "#" },
    { icon: <Icons.Houzz />, color: "#7AC142", href: "#" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-[#FDFDFD] overflow-hidden pt-20">

      {/* 1. BACKGROUND WATERMARK AND STATIC COLOR SPLASH */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-none select-none flex items-center justify-center opacity-[0.03] z-0">
        <h2 className="text-[45vw] font-black text-zinc-900 tracking-tighter">HI</h2>
      </motion.div>

      {/* Static Gooey Color Splashes representing the 4 Service Colors */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply opacity-50">
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="hero-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1.25 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 block"
          style={{ filter: "url(#hero-goo)" }}
        >
          {/* Terracotta Splat */}
          <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-[#D08C63] rounded-[45%_55%_40%_60%/55%_45%_60%_40%]" />
          <div className="absolute top-[5%] left-[20%] w-40 h-40 bg-[#D08C63] rounded-full" />
          <div className="absolute top-[20%] left-[5%] w-20 h-20 bg-[#D08C63] rounded-full" />

          {/* Ocean Teal Splat */}
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-[#0096FF] rounded-[60%_40%_50%_50%/40%_50%_50%_60%]" />
          <div className="absolute bottom-[25%] right-[15%] w-64 h-64 bg-[#0096FF] rounded-full" />
          <div className="absolute bottom-[5%] right-[25%] w-24 h-24 bg-[#0096FF] rounded-full" />

          {/* Forest Green Splat */}
          <div className="absolute top-[30%] right-[20%] w-96 h-96 bg-[#22C55E] rounded-[50%_60%_40%_70%/60%_50%_70%_40%]" />
          <div className="absolute top-[25%] right-[10%] w-48 h-48 bg-[#22C55E] rounded-full" />
          <div className="absolute top-[45%] right-[30%] w-32 h-32 bg-[#22C55E] rounded-full" />

          {/* Charcoal/Taupe Splat */}
          <div className="absolute bottom-[20%] left-[5%] w-80 h-80 bg-[#A1A1A1] rounded-[40%_60%_70%_30%/50%_40%_60%_50%]" />
          <div className="absolute bottom-[35%] left-[15%] w-56 h-56 bg-[#A1A1A1] rounded-[60%_50%_40%_60%/40%_60%_50%_40%]" />
          <div className="absolute bottom-[15%] left-[20%] w-32 h-32 bg-[#A1A1A1] rounded-full" />
        </motion.div>
      </div>

      {/* 2. SIDE SOCIAL DOCK (Floating) */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-8 z-50">
        <div className="h-12 w-[1px] bg-zinc-200" />
        {socials.map((s, i) => (
          <motion.a
            key={i}
            href={s.href}
            whileHover={{ y: -3, color: s.color }}
            className="text-zinc-400 transition-colors duration-300"
          >
            {s.icon}
          </motion.a>
        ))}
        <div className="h-12 w-[1px] bg-zinc-200" />
      </div>

      {/* 3. MAIN GRID */}
      <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">

        {/* LEFT COLUMN: VISUAL ANCHOR */}
        <div className="hidden lg:block lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            className="relative h-[70vh] w-full shadow-2xl overflow-hidden group border-[1px] border-zinc-100"
          >
            <Image
              src="/Image.png"
              alt="Hatim Idrissi"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
            {/* Gallery Frame Effect */}
            <div className="absolute inset-0 border-[15px] border-[#FDFDFD]" />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: TEXT & VIDEO */}
        <div className="lg:col-span-8 flex flex-col gap-12">

          <div className="flex flex-col gap-8">
            {/* PLATFORM BAR */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
              className="flex items-center gap-6"
            >
              <div className="flex gap-5">
                {socials.slice(0, 3).map((s, i) => (
                  <motion.a key={i} href={s.href} whileHover={{ color: s.color }} className="text-zinc-300">
                    {s.icon}
                  </motion.a>
                ))}
              </div>
              <div className="h-[1px] flex-grow bg-zinc-100" />
              <span className="text-[9px] tracking-[0.6em] font-black text-zinc-300 uppercase italic">Digital Presence</span>
            </motion.div>

            {/* MAIN TITLE */}
            <motion.div style={{ y: yText }}>
              <h1 className="text-7xl md:text-[9.5rem] font-black uppercase tracking-tighter leading-[0.8] italic text-zinc-900 flex flex-col">
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
                >
                  Hatim
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1], delay: 0.45 }}
                  className="text-zinc-200 ml-20 md:ml-64 lg:ml-[28rem] mt-2 md:mt-8"
                >
                  Idrissi
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1], delay: 0.7 }}
                className="mt-8 max-w-lg text-zinc-400 font-medium tracking-wide uppercase text-[10px] leading-relaxed"
              >
                "Un jour je suis né depuis j'improvise." — Hatim Idrissi conçoit des paysages qui respirent et des architectures qui s'évadent.
              </motion.p>
            </motion.div>
          </div>

          {/* VIDEO PORTAL */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1], delay: 0.6 }}
            className="relative h-[40vh] lg:h-[45vh] w-full cursor-pointer group overflow-hidden shadow-2xl rounded-sm"
            onClick={() => setIsVideoOpen(true)}
          >
            <Image
              src="https://i.ytimg.com/vi/lWa5EAfRP34/maxresdefault.jpg"
              alt="Project Film" fill priority
              className="object-cover brightness-50 group-hover:brightness-90 transition-all duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:scale-110 group-hover:border-white transition-all duration-500">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
              </div>
            </div>

            <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-white uppercase tracking-[0.4em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Watch Experience</span>
                <span className="h-[1px] w-0 group-hover:w-full bg-white transition-all duration-700" />
              </div>
              <span className="font-mono text-[9px] text-white/30 italic">33.5898 N // 7.6038 W</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-zinc-950/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-6xl aspect-video relative shadow-2xl">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/lWa5EAfRP34?autoplay=1" frameBorder="0" allowFullScreen />
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-12 right-0 text-white text-[10px] tracking-[0.4em] uppercase hover:text-zinc-400 transition-all"
              >
                Close Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}