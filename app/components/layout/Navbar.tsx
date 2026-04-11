"use client";
import React, { useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { Variants } from "motion/react"; // or "framer-motion"

export default function Navbar() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // 1. SCROLL ANIMATIONS
  const { scrollY } = useScroll();
  
  // Adjusted: Height is more compact to avoid covering Hero content
  const navHeight = useTransform(scrollY, [0, 100], ["100px", "75px"]);
  const navBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]);
  const navShadow = useTransform(scrollY, [0, 100], ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 40px rgba(0,0,0,0.04)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], ["0", "1"]);

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

  // Entrance Animation Variants
 const navVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.3, 
      duration: 1.2, 
      ease: "circOut" // TypeScript is now happy because of the 'Variants' type
    }
  }
};

  const itemVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.3, 
      duration: 1.2, 
      ease: "circOut" // TypeScript is now happy because of the 'Variants' type
    }
  }
};

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed top-0 left-0 w-full z-[100] px-6 md:px-16 flex justify-between items-center backdrop-blur-md transition-all duration-700"
      style={{ 
        height: navHeight as any, 
        backgroundColor: navBg as any,
        boxShadow: navShadow as any,
        borderBottom: `1px solid rgba(244, 244, 245, ${borderOpacity})`
      }}
    >
      
      {/* --- 3D FLOATING LOGO --- */}
      <motion.div 
        variants={itemVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex flex-col group cursor-pointer perspective-[1000px]"
      >
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none text-zinc-900 group-hover:translate-z-[30px] transition-transform duration-500">
            Hatim <span className="text-zinc-400 group-hover:text-zinc-900">Idrissi</span>
          </h1>
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

      {/* --- NAVIGATION LINKS --- */}
      <div className="hidden lg:flex items-center gap-2">
        {["Aquatique", "Végétal", "Formation"].map((link) => (
          <motion.a 
            key={link} 
            variants={itemVariants}
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
            
            {isHovered === link && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-zinc-100 rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.a>
        ))}

        {/* --- CONTACT BUTTON --- */}
        <motion.button 
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05, 
            translateZ: 40,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
          }}
          whileTap={{ scale: 0.95 }}
          className="relative ml-6 px-10 py-3 bg-zinc-900 group overflow-hidden rounded-sm"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
             animate={{ x: ["-100%", "250%"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[45deg]"
          />
          <span className="relative z-10 text-[9px] font-black uppercase tracking-[0.4em] text-white">
            Contact
          </span>
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-black" />
        </motion.button>
      </div>

      {/* --- MOBILE --- */}
      <motion.div variants={itemVariants} className="lg:hidden flex flex-col gap-1 w-6 cursor-pointer">
        <div className="h-[2px] w-full bg-zinc-900" />
        <div className="h-[2px] w-2/3 bg-zinc-400 ml-auto" />
      </motion.div>
    </motion.nav>
  );
}