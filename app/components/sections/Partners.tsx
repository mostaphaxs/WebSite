"use client";
import React from "react";

const partnerLogos = [
  "NESPRESSO", "CDG", "ARVAL", "BEST WESTERN", 
  "ECOLE CENTRALE", "CGEM", "ELECTRO PLUS", "ONDA"
];

export default function Partners() {
  return (
    <section className="py-20 bg-white border-y border-gray-100 overflow-hidden">
      <div className="flex flex-col items-center mb-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">
          Ils nous ont fait confiance
        </span>
      </div>

      {/* The Infinite Marquee Container */}
      <div className="relative flex overflow-hidden">
        {/* We double the array to create the seamless loop effect */}
        <div className="flex whitespace-nowrap animate-marquee px-4">
          {[...partnerLogos, ...partnerLogos].map((logo, index) => (
            <div 
              key={index} 
              className="mx-12 text-2xl md:text-4xl font-black text-gray-200 hover:text-green-600 transition-colors cursor-default select-none tracking-tighter italic"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}