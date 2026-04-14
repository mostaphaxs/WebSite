"use client";
import React, { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

const PaintExplosion = ({ color, isInView }: { color: string; isInView: boolean }) => {
  const filterId = React.useId();

  // Pre-computed stable positions — avoids Math.random() in render which causes
  // different values on every re-render (correctness + performance bug)
  const dropletPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const dist = 380 + (((i * 73) % 150)); // deterministic pseudo-spread
      positions.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    }
    return positions;
  }, []);

  // Fixed edge-only points
  const visiblePoints = [
    { x: -52, y: -48 },
    { x: 52, y: -48 },
    { x: -52, y: 48 },
    { x: 52, y: 48 },
    { x: -52, y: 0 },
    { x: 52, y: 0 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-90 overflow-visible">
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className="relative w-full h-full flex items-center justify-center scale-110"
        style={{ filter: `url(#${filterId})` }}
      >
        {visiblePoints.map((point, i) => (
          <motion.div
            key={`edge-${i}`}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={isInView ? {
              scale: [0, 1.8, 1.5],
              x: `${point.x}%`,
              y: `${point.y}%`
            } : {}}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              ease: [0.19, 1, 0.22, 1]
            }}
            className="absolute w-32 h-32 md:w-48 md:h-48"
            style={{
              backgroundColor: color,
              borderRadius: '60% 40% 50% 50% / 40% 50% 50% 60%',
              willChange: 'transform',
            }}
          />
        ))}

        {/* Minimal perimeter droplets that stay in the visible gutter */}
        {dropletPositions.map((pos, i) => (
          <motion.div
            key={`drop-${i}`}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={isInView ? {
              scale: [0, 1.5, 1],
              x: dropletPositions[i].x,
              y: dropletPositions[i].y
            } : {}}
            transition={{
              duration: 2,
              delay: 0.2 + (i * 0.05),
              ease: "easeOut"
            }}
            className="absolute w-8 h-8 rounded-full"
            style={{ backgroundColor: color, willChange: 'transform' }}
          />
        ))}
      </div>
    </div>
  );
};

// Static service data — defined outside component to avoid recreation on every render
const services = [
  {
    title: "Architecture D'intérieure",
    subtitle: "Coaching & Décoration",
    img: "/Image3.png",
    id: "01",
    splashColor: "#D08C63",
  },
  {
    title: "Design Aquatique",
    subtitle: "Murs d'eau & Aquariums",
    img: "/image5.png",
    id: "02",
    splashColor: "#0096FF",
  }, {
    title: "Design Végétal",
    subtitle: "Paysagiste & Végétal Stabilisé",
    img: "/image2.png",
    id: "03",
    splashColor: "#22C55E",
  },
  {
    title: "Formation",
    subtitle: "Transmission du Savoir-faire",
    img: "/image4.png",
    id: "04",
    splashColor: "#A1A1A1",
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["8%", "-15%"]);

  return (
    <section ref={containerRef} className="py-40 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      <motion.div
        style={{ x: bgTextX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-zinc-100/70 select-none pointer-events-none whitespace-nowrap z-0 italic uppercase"
      >
        L'ART DE VIVRE // NATUREL
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-32">
          <span className="text-[10px] font-black tracking-[1em] text-zinc-400 uppercase mb-8 block">Savoir-Faire</span>
          <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.8] italic text-zinc-900 flex flex-col">
            <span className="opacity-100">Nos</span>
            <span className="text-zinc-200 block sm:inline-block sm:ml-[10vw] lg:ml-[12vw] mt-2 group-hover:text-zinc-900 transition-colors duration-700">
              Services
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 md:gap-y-40">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imgTranslateY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex flex-col group ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
    >
      <PaintExplosion color={service.splashColor} isInView={isInView} />

      <div className="relative h-[600px] md:h-[750px] w-full bg-zinc-200 overflow-hidden shadow-2xl glass-morphism border border-white/10">
        <motion.div style={{ y: imgTranslateY }} className="absolute -top-[10%] left-0 w-full h-[120%]">
          <Image
            src={service.img}
            alt={service.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>

        {/* CSS-Only High Performance Overlay (No React State/JS needed) */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] text-white text-left">
            <span className="text-[10px] md:text-[12px] tracking-[0.6em] font-black uppercase mb-2 block">Explorer le projet</span>
            <div className="h-[1px] w-12 bg-white/30 mb-4" />
            <p className="font-mono text-[8px] md:text-[9px] tracking-[0.4em] uppercase opacity-60">REF_ID // 2026_{service.id}</p>
          </div>
        </div>

        <div className="absolute inset-0 border-[20px] border-[#FDFDFD] z-30 pointer-events-none" />
      </div>

      <div className="mt-12 group-hover:translate-x-4 transition-transform duration-700">
        <div className="flex items-center gap-6 mb-4">
          <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: service.splashColor }}>
            {service.subtitle}
          </span>
          <div className="h-[1px] flex-grow bg-zinc-200" />
        </div>
        <h3 className="text-zinc-900 text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.8]">
          {service.title}
        </h3>
      </div>
    </motion.div>
  );
}