"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants } from "motion/react";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // 1. SCROLL ANIMATIONS
  const { scrollY } = useScroll();
  
  const navHeight = useTransform(scrollY, [0, 100], ["110px", "80px"]);
  
  // FIXED: No more white. Transitions from transparent to the Logo's Deep Charcoal.
  const navBg = useTransform(
    scrollY, 
    [0, 100], 
    ["rgba(11, 13, 16, 0)", "rgba(11, 13, 16, 0.95)"] 
  );
  
  const navShadow = useTransform(scrollY, [0, 100], ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 40px rgba(0,0,0,0.6)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], ["0", "0.05"]);

  // 2. 3D MOUSE PHYSICS
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full z-[100] px-6 md:px-16 flex justify-between items-center backdrop-blur-md transition-colors duration-700"
      style={{ 
        height: navHeight as any, 
        backgroundColor: navBg as any,
        boxShadow: navShadow as any,
        borderBottom: `1px solid rgba(255, 255, 255, ${borderOpacity})`
      }}
    >
      
      {/* --- 3D LOGO (Seamless Match) --- */}
      <motion.div 
        variants={itemVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group cursor-pointer perspective-[1000px]"
      >
        <div className="relative w-[240px] h-[80px] transition-transform duration-500 group-hover:translate-z-[40px] flex items-center">
          <Image 
            src="/Logo.png" 
            alt="Hatim Idrissi" 
            fill 
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* --- NAVIGATION LINKS (High-Contrast White/Zinc) --- */}
      <div className="hidden lg:flex items-center gap-2">
        {["Aquatique", "Végétal", "Formation"].map((link) => (
          <motion.a 
            key={link} 
            variants={itemVariants}
            href={`#${link.toLowerCase()}`}
            onHoverStart={() => setIsHovered(link)}
            onHoverEnd={() => setIsHovered(null)}
            className="relative px-5 py-2"
          >
            <span className={`relative z-10 text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-500 ${isHovered === link ? 'text-white' : 'text-zinc-500'}`}>
              {link}
            </span>
            {isHovered === link && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.a>
        ))}

        {/* --- CONTACT BUTTON --- */}
        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="relative ml-8 px-10 py-3 bg-white group overflow-hidden rounded-full transition-all"
        >
          <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em] text-black">
            Contact
          </span>
        </motion.button>
      </div>

      {/* MOBILE MENU TOGGLE */}
      <motion.div variants={itemVariants} className="lg:hidden flex flex-col gap-1 w-6">
        <div className="h-[2px] w-full bg-white" />
        <div className="h-[2px] w-2/3 bg-zinc-600 ml-auto" />
      </motion.div>
    </motion.nav>
  );
}
