"use client";
import { motion } from "motion/react";

export default function Navbar() {
  const links = [
    { name: "Aquatique", href: "#" },
    { name: "Design Végétal", href: "#" },
    { name: "Formation", href: "#" },
    { name: "Blog", href: "#" },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 px-10 py-8 flex justify-between items-start mix-blend-difference"
    >
      {/* Left: The "Accueil" Brand block */}
      <a href="/" className="flex flex-col group text-white">
        <span className="text-[9px] font-bold tracking-[0.3em] opacity-50 uppercase mb-1">Accueil</span>
        <span className="text-2xl font-black tracking-tighter uppercase leading-none">
          Hatim Idrissi
        </span>
        <span className="text-[10px] font-medium tracking-[0.25em] opacity-70 uppercase mt-1">
          Architecte d'Intérieur
        </span>
      </a>

      {/* Right: Navigation & Contact */}
      <div className="flex flex-col items-end gap-6">
        <div className="hidden lg:flex gap-10">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:text-green-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        <button className="bg-white text-black px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-green-500 hover:text-white transition-all">
          Contact
        </button>
      </div>
    </motion.nav>
  );
}