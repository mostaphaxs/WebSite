"use client";
import React from "react";
import Image from "next/image";

export default function Philosophy() {
  return (
    <section className="py-32 px-8 md:px-20 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        <div className="order-2 md:order-1">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-green-700 mb-8">
            Notre Vision
          </h2>
          <div className="space-y-8 text-zinc-600 leading-relaxed font-light text-lg">
            <p>
              <span className="font-bold text-zinc-900 italic">Naturel Design</span> n'est pas seulement un studio d'architecture ; c'est un laboratoire d'innovation durable basé à Casablanca.
            </p>
            <p>
              Nous croyons que chaque mur doit respirer. Sous la direction de <span className="text-zinc-900 font-semibold">Hatim Idrissi</span>, nous fusionnons les technologies aquatiques et végétales pour créer des environnements qui guérissent et inspirent.
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2 relative h-[700px] w-full pro-clip-path overflow-hidden shadow-xl">
          <Image 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2560" 
            alt="Vision Architecturale" 
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>

      </div>
    </section>
  );
}