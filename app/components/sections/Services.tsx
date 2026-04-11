"use client";
import { motion } from "motion/react";

const services = [
  { 
    title: "Architecture Intérieure", 
    subtitle: "Coaching & Décoration", 
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200" 
  },
  { 
    title: "Design Aquatique", 
    subtitle: "Murs d'eau & Aquariums", 
    img: "https://images.unsplash.com/photo-1520967824495-b529aeba26df?q=80&w=1200" 
  },
  { 
    title: "Design Végétal", 
    subtitle: "Paysagiste & Végétal Stabilisé", 
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200" 
  },
  { 
    title: "Formation", 
    subtitle: "Transmission du Savoir-faire", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200" 
  },
];

export default function Services() {
  return (
    <section className="py-32 px-10 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-green-700 mb-4">
            Nos Domaines d'Expertise
          </h2>
          <p className="text-4xl font-black uppercase tracking-tighter">
            Concevoir l'excellence <br /> par la nature.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative h-[500px] overflow-hidden bg-zinc-200"
            >
              <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">
                  {service.subtitle}
                </span>
                <h3 className="text-white text-3xl font-black uppercase tracking-tighter">
                  {service.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}