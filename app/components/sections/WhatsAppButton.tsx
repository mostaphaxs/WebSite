"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function WhatsAppInteraction() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* THE BETTER LOGO: RECOGNIZABLE BUT ARCHITECTURAL */}
      <motion.button
        onClick={() => setShowToast(!showToast)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-[1000] group"
      >
        <div className="relative flex items-center justify-center w-16 h-16 bg-white/40 backdrop-blur-2xl border border-zinc-200/50 rounded-2xl shadow-sm transition-all duration-500 group-hover:bg-white/60 group-hover:border-zinc-400">
          {/* Official WhatsApp Silhouette - Refined for Hatim Idrissi */}
          <svg 
            viewBox="0 0 24 24" 
            width="32" 
            height="32" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            className="text-zinc-900"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .081 5.363.079 11.971c0 2.112.553 4.177 1.604 6.011L0 24l6.149-1.613a11.893 11.893 0 005.9 1.57h.005c6.605 0 11.97-5.363 11.972-11.971a11.854 11.854 0 00-3.513-8.459z" />
          </svg>
        </div>
      </motion.button>

      {/* THE PERFECT TOAST: SOPHISTICATED REVEAL */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            className="fixed bottom-28 right-8 z-[1001] w-80"
          >
            <div className="relative p-10 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-zinc-100 group">
              {/* Thin Decorative Accent */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-zinc-200 overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="w-full h-full bg-zinc-900"
                />
              </div>

              <div className="flex flex-col">
                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-300 mb-6">
                  Contact
                </p>
                
                <h3 className="text-zinc-900 text-xl font-light leading-snug mb-4">
                  Parlons de votre futur <span className="italic font-serif">projet</span>.
                </h3>
                
                <p className="text-zinc-500 text-[11px] leading-relaxed mb-8">
                  Hatim est disponible pour répondre à vos questions et commencer votre conception.
                </p>

                <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
                  <a 
                    href="https://wa.me/212600000000" 
                    target="_blank"
                    className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-900 hover:text-zinc-500 transition-colors"
                  >
                    Lancer la discussion <span>→</span>
                  </a>
                  <button 
                    onClick={() => setShowToast(false)}
                    className="text-[10px] font-medium uppercase text-zinc-300 hover:text-zinc-900 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}