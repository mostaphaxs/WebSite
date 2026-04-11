"use client";
import React, { useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // 1. SCROLL ANIMATIONS
  const { scrollY } = useScroll();
  
  // Shrink height from 112px to 80px
  const navHeight = useTransform(scrollY, [0, 100], ["112px", "80px"]);
  // Increase blur and opacity of background
  const navBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]);
  const navShadow = useTransform(scrollY, [0, 100], ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 30px rgba(0,0,0,0.06)"]);
  // Move the whole nav bar slightly up/down
  const navY = useTransform(scrollY, [0, 100], ["0px", "0px"]);

  // 2. 3D MOUSE PHYSICS (for Logo)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-16 flex justify-between items-center backdrop-blur-md transition-all duration-500"
        style={{ 
          height: navHeight as any, 
          backgroundColor: navBg as any,
          boxShadow: navShadow as any,
          y: navY as any
        }}
      >
        
        {/* --- 3D FLOATING LOGO (Pivots on Mouse) --- */}
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="flex flex-col group cursor-pointer perspective-[1000px]"
        >
          <div className="relative" style={{ transformStyle: "preserve-3d" }}>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none text-zinc-900 group-hover:translate-z-[30px] transition-transform duration-500">
              Hatim <span className="text-zinc-400 group-hover:text-zinc-900">Idrissi</span>
            </h1>
            {/* 3D Reflection layer */}
            <h1 className="absolute inset-0 text-xl md:text-2xl font-black uppercase tracking-tighter leading-none text-zinc-100 translate-z-[-15px] blur-[1px]">
              Hatim Idrissi
            </h1>
          </div>
          <motion.p 
            style={{ opacity: useTransform(scrollY, [0, 50], [1, 0]) }}
            className="text-[7px] font-black tracking-[0.5em] text-zinc-400 uppercase mt-2"
          >
            Architecte d’intérieur
          </motion.p>
        </motion.div>

        {/* --- DYNAMIC NAVIGATION --- */}
        <div className="hidden lg:flex items-center gap-2">
          {["Aquatique", "Végétal", "Formation"].map((link) => (
            <motion.a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              onHoverStart={() => setIsHovered(link)}
              onHoverEnd={() => setIsHovered(null)}
              whileHover={{ translateZ: 20, y: -2 }}
              className="relative px-5 py-2 transition-all duration-300 perspective-[500px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className={`relative z-10 text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${isHovered === link ? 'text-zinc-900' : 'text-zinc-500'}`}>
                {link}
              </span>
              
              {/* Floating Dock Indicator */}
              {isHovered === link && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white shadow-[0_10px_20px_rgba(0,0,0,0.08)] border border-zinc-100 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.a>
          ))}

          {/* --- THE BLACK BLOCK BUTTON --- */}
          <motion.button 
            whileHover={{ 
              scale: 1.05, 
              translateZ: 40,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className="relative ml-6 px-8 py-3 bg-zinc-900 group overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Shine animation on scroll/hover */}
            <motion.div 
               animate={{ x: ["-100%", "200%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[45deg]"
            />
            
            <span className="relative z-10 text-[9px] font-black uppercase tracking-[0.4em] text-white">
              Contact
            </span>
            
            {/* 3D Depth Layer for Button */}
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-black" />
          </motion.button>
        </div>

        {/* --- MOBILE COMPACT MENU --- */}
        <div className="lg:hidden flex flex-col gap-1 w-6">
          <motion.div animate={{ width: isHovered ? "100%" : "60%" }} className="h-[2px] bg-zinc-900 ml-auto" />
          <div className="h-[2px] w-full bg-zinc-900" />
        </div>
      </nav>
    </>
  );
}