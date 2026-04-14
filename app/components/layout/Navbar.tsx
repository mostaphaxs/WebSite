"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Navigation Logic Colors
  const navBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]);
  const activeTextColor = "#0B0D10"; // Keep text dark for white background
  const pillBg = "rgba(0,0,0,0.05)";
  const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);

  const btnBg = "#0B0D10";
  const btnText = "#FFFFFF";

  // 3D Physics for Logo
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHoveringLogo = useMotionValue(0);
  const logoScrollY = useTransform(scrollY, [0, 50], [0, -15]); // Shift the massive logo up when shrinking navbar

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  const scaleSpring = useSpring(isHoveringLogo, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const scale = useTransform(scaleSpring, [0, 1], [1, 1.08]);

  const navLinks = [
    { name: "Architecture", href: "#architecture" },
    { name: "Design Aquatique", href: "#design-aquatique" },
    { name: "Végétal", href: "#vegetal" },
    { name: "Formation", href: "#formation" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 flex justify-between items-center transition-all duration-300 border-b border-transparent"
      style={{
        height: useTransform(scrollY, [0, 50], ["90px", "70px"]),
        backgroundColor: navBg,
        backdropFilter: backdropBlur,
        borderColor: useTransform(scrollY, [0, 50], ["rgba(255,255,255,0)", "rgba(255,255,255,0.05)"]),
      }}
    >
      {/* --- REFINED PREMIUM SCROLL LOCATOR --- */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[4px] origin-left z-[110]"
        style={{
          scaleX,
          // Copper Gradient Shimmer
          background: "linear-gradient(90deg, #D08C63 0%, #FFFFFF 50%, #D08C63 100%)",
          backgroundSize: "200% 100%",
          boxShadow: "0px 2px 10px rgba(208, 140, 99, 0.3)"
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* --- LOGO HUB --- */}
      <motion.div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
          isHoveringLogo.set(1);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); isHoveringLogo.set(0); }}
        style={{ rotateX, rotateY, scale, y: logoScrollY, transformStyle: "preserve-3d" }}
        className="relative cursor-pointer perspective-[1200px] flex items-center h-full origin-center"
      >
        <div className="relative w-[260px] h-[70px] md:w-[380px] md:h-[100px]" style={{ transform: "translateZ(40px)" }}>
          <Image src="/LogoMe.svg" alt="Logo" fill className="object-contain" priority />
        </div>
      </motion.div>

      {/* --- NAV LINKS --- */}
      <div className="hidden lg:flex items-center gap-1 relative">
        {navLinks.map((link, index) => (
          <motion.a
            key={link.name}
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
              className="relative z-10 text-[9px] font-bold uppercase tracking-[0.4em] block"
            >
              {link.name}
            </motion.span>
          </motion.a>
        ))}

        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "#D08C63",
            color: "#FFFFFF",
            boxShadow: "0px 10px 20px rgba(208, 140, 99, 0.2)"
          }}
          whileTap={{ scale: 0.95 }}
          style={{ backgroundColor: btnBg, color: btnText }}
          className="relative ml-8 px-8 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all shadow-xl overflow-hidden group"
        >
          <span className="relative z-10">Contact</span>
          <motion.div
            className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          />
        </motion.button>
      </div>
    </motion.nav>
  );
}