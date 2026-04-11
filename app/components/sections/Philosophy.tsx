"use client";
import { motion } from "motion/react";

export default function Philosophy() {
  return (
    <section className="py-32 px-8 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div>
          <h2 className="text-3xl font-bold uppercase mb-8 text-brand-dark tracking-wide">
            Notre Philosophie
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed font-light">
            <p>
              Naturel Design, fondé et dirigé par Hatim Idrissi, excelle dans l'architecture d'intérieur au Maroc. En tant que pionniers du design écologique, nous privilégions l'innovation et la durabilité dans chacun de nos projets.
            </p>
            <p>
              Convaincus que notre environnement influence notre qualité de vie, nous nous engageons à créer des espaces qui améliorent à la fois l'esthétique et le bien-être.
            </p>
            <p>
              Sous la direction visionnaire de Hatim Idrissi, notre équipe travaille à transformer les espaces en lieux où beauté et fonctionnalité se rencontrent harmonieusement. Nous utilisons des matériaux éco-responsables et les dernières technologies pour maximiser l'efficacité énergétique et minimiser l'impact environnemental.
            </p>
          </div>
        </div>

        <div className="h-[600px] bg-gray-100 p-8 flex items-end relative overflow-hidden group">
          <img 
            src="/hatim-idrissi-portrait.jpg" 
            alt="Hatim Idrissi" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="relative z-10 bg-white p-6 shadow-xl max-w-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-green mb-2">Le Fondateur</p>
            <p className="text-xl font-medium text-brand-dark">Hatim Idrissi</p>
          </div>
        </div>

      </div>
    </section>
  );
}