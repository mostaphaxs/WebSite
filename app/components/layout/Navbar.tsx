"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // --- LOGIC: BLACK AT TOP -> WHITE ON SCROLL ---
  const navBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(11, 13, 16, 0.98)"]);
  const activeTextColor = useTransform(scrollY, [0, 50], ["#0B0D10", "#FFFFFF"]);
  const pillBg = useTransform(scrollY, [0, 50], ["rgba(0,0,0,0.05)", "rgba(255,255,255,0.1)"]);
  
  const btnBg = useTransform(scrollY, [0, 50], ["#0B0D10", "#FFFFFF"]);
  const btnText = useTransform(scrollY, [0, 50], ["#FFFFFF", "#0B0D10"]);

  // --- ENHANCED 3D PHYSICS FOR LOGO ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHoveringLogo = useMotionValue(0); // Tracks if mouse is over logo for dynamic scaling

  // Tighter springs for a heavier, more luxurious feel
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  const scaleSpring = useSpring(isHoveringLogo, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const scale = useTransform(scaleSpring, [0, 1], [1, 1.08]); // Scales up by 8% on hover

  const navLinks = [
    { name: "Architecture", href: "#architecture" },
    { name: "Design Aquatique", href: "#design-aquatique" },
    { name: "Végétal", href: "#vegetal" },
    { name: "Formation", href: "#formation" },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 flex justify-between items-center transition-all duration-300"
      style={{ 
        height: useTransform(scrollY, [0, 50], ["90px", "70px"]), 
        backgroundColor: navBg,
      }}
    >
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] origin-left"
        style={{ scaleX, backgroundColor: activeTextColor, opacity: 0.3 }}
      />

      {/* --- LOGO HUB: CINEMATIC ENTRANCE + 3D MAGNETIC HOVER --- */}
      <motion.div 
        // 1. Cinematic Page Load Animation
        initial={{ opacity: 0, y: -25, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Custom easing for premium feel
        
        // 2. Magnetic Hover Logic
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
          isHoveringLogo.set(1);
        }}
        onMouseLeave={() => { 
          x.set(0); 
          y.set(0); 
          isHoveringLogo.set(0);
        }}
        style={{ 
          rotateX, 
          rotateY, 
          scale,
          transformStyle: "preserve-3d" 
        }}
        className="relative cursor-pointer perspective-[1200px] flex items-center h-full origin-center"
      >
        {/* Inner container with translateZ for maximum 3D pop */}
        <div 
          className="relative w-[200px] h-[50px] md:w-[280px] md:h-[60px]"
          style={{ transform: "translateZ(40px)" }} 
        >
          <Image 
            src="/LogoMe.svg" 
            alt="Logo" 
            fill 
            className="object-contain" 
            priority 
          />
        </div>
      </motion.div>

      {/* --- NAV LINKS --- */}
      <div className="hidden lg:flex items-center gap-1 relative">
        {navLinks.map((link, index) => (
          <motion.div 
            key={link.name}
            // Cascading entrance animation for links
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
          >
            <motion.a 
              href={link.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-5 py-2 group block"
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="navPill"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-0 rounded-lg"
                    style={{ backgroundColor: pillBg }}
                  />
                )}
              </AnimatePresence>

              <motion.span 
                style={{ color: activeTextColor }}
                animate={{ 
                  y: hoveredIndex === index ? -2 : 0,
                  scale: hoveredIndex === index ? 1.05 : 1
                }}
                className="relative z-10 text-[9px] font-bold uppercase tracking-[0.4em] transition-opacity duration-300 block"
              >
                {link.name}
              </motion.span>
            </motion.a>
          </motion.div>
        ))}

        {/* Contact Button Entrance */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ backgroundColor: btnBg, color: btnText }}
          className="relative ml-8 px-8 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-300 shadow-xl"
        >
          Contact
        </motion.button>
      </div>

      {/* MOBILE TRIGGER */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="lg:hidden flex flex-col gap-1.5 w-7"
      >
        <motion.div style={{ backgroundColor: activeTextColor }} className="h-[1px] w-full" />
        <motion.div style={{ backgroundColor: activeTextColor }} className="h-[1px] w-full" />
      </motion.div>
    </motion.nav>
  );
}