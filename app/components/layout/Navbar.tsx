"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Architecture", href: "#architecture", color: "#D08C63" },
  { name: "Design Aquatique", href: "#design-aquatique", color: "#0096FF" },
  { name: "Végétal", href: "#vegetal", color: "#22C55E" },
  { name: "Formation", href: "#formation", color: "#A1A1A1" },
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const navBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"]); // Now handled via CSS for better theme sync
  const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);

  const btnBg = "#0B0D10";
  const btnText = "#FFFFFF";
  const pillBg = "rgba(0,0,0,0.05)";
  const activeTextColor = "#0B0D10";

  // 3D Physics for Logo
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHoveringLogo = useMotionValue(0);
  const logoScrollY = useTransform(scrollY, [0, 50], [0, -15]);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  const scaleSpring = useSpring(isHoveringLogo, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const scale = useTransform(scaleSpring, [0, 1], [1, 1.08]);

  const handleLogoMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    isHoveringLogo.set(1);
  }, [x, y, isHoveringLogo]);

  const handleLogoLeave = useCallback(() => {
    x.set(0); y.set(0); isHoveringLogo.set(0);
  }, [x, y, isHoveringLogo]);

  const closeMobile = useCallback((href: string) => {
    setMobileOpen(false);
    // Small delay so the menu closes before scroll
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 flex justify-between items-center transition-all duration-300 border-b border-transparent bg-[var(--section-bg)]/15"
        style={{
          height: useTransform(scrollY, [0, 50], ["90px", "70px"]),
          backdropFilter: backdropBlur,
          borderColor: useTransform(scrollY, [0, 50], ["rgba(255,255,255,0)", "rgba(255,255,255,0.05)"]),
        }}
      >
        {/* REFINED PREMIUM SCROLL LOCATOR */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px] origin-left z-[110]"
          style={{
            scaleX,
            background: "linear-gradient(90deg, #D08C63 0%, #FFFFFF 50%, #D08C63 100%)",
            backgroundSize: "200% 100%",
            boxShadow: "0px 2px 10px rgba(208, 140, 99, 0.3)"
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* LOGO HUB */}
        <motion.div
          onMouseMove={handleLogoMove}
          onMouseLeave={handleLogoLeave}
          style={{ rotateX, rotateY, scale, y: logoScrollY, transformStyle: "preserve-3d" }}
          className="relative cursor-pointer perspective-[1200px] flex items-center h-full origin-center"
        >
          <div className="relative w-[220px] h-[60px] md:w-[320px] md:h-[90px]" style={{ transform: "translateZ(40px)" }}>
            <Image src="/LogoMe.svg" alt="Hatim Idrissi Logo" fill className="object-contain" priority />
          </div>
        </motion.div>

        {/* DESKTOP NAV LINKS */}
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
                className="relative z-10 text-[9px] font-bold uppercase tracking-[0.4em] block text-[var(--section-text)] group-hover:text-white transition-colors duration-300"
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
            onClick={() => { document.querySelector("#formation")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            <span className="relative z-10">Contact</span>
            <motion.div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="lg:hidden flex flex-col gap-[5px] items-center justify-center w-10 h-10 z-[120] relative"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="block w-6 h-[1.5px] bg-zinc-900 origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-[1.5px] bg-zinc-900"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="block w-6 h-[1.5px] bg-zinc-900 origin-center"
          />
        </button>
      </motion.nav>

      {/* FULL-SCREEN MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[90] bg-white flex flex-col justify-between pt-28 pb-12 px-8 overflow-hidden lg:hidden"
          >
            {/* Subtle grid background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }}
            />

            {/* Color accent bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] flex">
              <div className="flex-1" style={{ backgroundColor: "#D08C63" }} />
              <div className="flex-1" style={{ backgroundColor: "#0096FF" }} />
              <div className="flex-1" style={{ backgroundColor: "#22C55E" }} />
              <div className="flex-1 bg-zinc-300" />
            </div>

            {/* NAV LINKS */}
            <nav className="flex flex-col gap-2 relative z-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  onClick={() => closeMobile(link.href)}
                  className="group flex items-center gap-6 py-5 border-b border-zinc-100 w-full text-left"
                >
                  <span
                    className="text-[10px] font-black tracking-[0.3em] uppercase"
                    style={{ color: link.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900 group-hover:translate-x-2 transition-transform duration-300">
                    {link.name}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* FOOTER INFO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative z-10 flex flex-col gap-4"
            >
              <div className="h-[1px] w-full bg-zinc-100 mb-2" />
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">
                Studio d'Architecture d'Intérieur
              </p>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#22C55E" }} />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                  Casablanca, Maroc — Disponible
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}