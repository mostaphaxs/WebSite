"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Navbar() {
  const nameRef = useRef(null);

  useGSAP(() => {
    // ONLY animate the name characters
    gsap.from(".name-char", {
      y: 50,
      opacity: 0,
      rotateX: -90,
      stagger: 0.04,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.2
    });
  }, { scope: nameRef });

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="name-char inline-block whitespace-pre will-change-transform">
        {char}
      </span>
    ));
  };

  return (
    <>
      {/* THE SPACER: This pushes all other content down so it doesn't hide behind the nav */}
      <div className="h-24 md:h-32 w-full" />

      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-16 md:py-10 flex justify-between items-start bg-white/90 backdrop-blur-md border-b border-zinc-100">
        <div ref={nameRef} className="flex flex-col">
       
          
          <div style={{ perspective: "1000px" }}>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none text-zinc-900 flex overflow-hidden">
              {splitText("Hatim Idrissi")}
            </h1>
          </div>

          <p className="text-[10px] md:text-[11px] font-medium tracking-[0.35em] text-zinc-400 uppercase mt-3">
            Architecte d’intérieur
          </p>
        </div>

        {/* Links stay static so they are immediately usable */}
        <div className="hidden lg:flex gap-12 items-center mt-6">
          {["Aquatique", "Design Végétal", "Formation", "Blog"].map((item) => (
            <a key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 hover:text-zinc-900 transition-colors">
              {item}
            </a>
          ))}
          <button className="bg-zinc-900 text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-green-700 transition-all">
            Contact
          </button>
        </div>
      </nav>
    </>
  );
}