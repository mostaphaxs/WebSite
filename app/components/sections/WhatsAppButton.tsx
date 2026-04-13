"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function WhatsAppInteraction() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* THE ENHANCED BUTTON: MORPHING GLASS BLOB */}
      <motion.button
        onClick={() => setShowToast(!showToast)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-[1000] group"
      >
        <motion.div
          animate={{
            borderRadius: [
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "50% 50% 30% 70% / 50% 60% 40% 60%",
              "60% 40% 60% 40% / 70% 30% 60% 40%",
              "40% 60% 70% 30% / 40% 50% 60% 50%"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative flex items-center justify-center w-20 h-20 bg-white/60 backdrop-blur-3xl border border-white/40 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:bg-white group-hover:border-zinc-300"
        >
          {/* Subtle Rotating Mesh Gradient Background */}
          <div className="absolute inset-0 opacity-10 blur-xl pointer-events-none group-hover:opacity-20 transition-opacity duration-700 overflow-hidden rounded-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-gradient-to-tr from-[#D08C63] via-[#0096FF] to-[#22C55E]"
            />
          </div>

          {/* Official WhatsApp Silhouette */}
          <svg
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-zinc-900 relative z-10"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .081 5.363.079 11.971c0 2.112.553 4.177 1.604 6.011L0 24l6.149-1.613a11.893 11.893 0 005.9 1.57h.005c6.605 0 11.97-5.363 11.972-11.971a11.854 11.854 0 00-3.513-8.459z" />
          </svg>

          {/* ONLINE PULSE INDICATOR */}
          <div className="absolute top-4 right-4 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
            </div>
          </div>
        </motion.div>
      </motion.button>

      {/* THE REDESIGNED TOAST: PERSONAL ARCHITECTURAL CARD */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 40, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed bottom-32 right-8 z-[1001] w-80 pointer-events-none"
          >
            <div className="relative p-10 bg-white/95 backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-zinc-100 group pointer-events-auto overflow-hidden">

              {/* Thin Interactive Header Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-zinc-50 overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1.2, ease: "circOut" }}
                  className="w-full h-full bg-gradient-to-r from-green-500 to-[#D08C63]"
                />
              </div>

              <div className="flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <p className="text-[10px] font-black tracking-[0.6em] uppercase text-zinc-300">
                    Contact Direct
                  </p>
                  <button
                    onClick={() => setShowToast(false)}
                    className="p-2 -mr-6 -mt-6 opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                </div>

                <h3 className="text-zinc-900 text-3xl font-light leading-[1.1] mb-8">
                  Parlons de votre futur <span className="italic font-signature text-4xl block mt-2 text-[#D08C63]">Projet</span>
                </h3>

                <p className="text-zinc-500 text-[11px] leading-relaxed mb-10 tracking-wide font-medium">
                  Hatim est disponible dès maintenant pour échanger sur vos envies et vos architectures.
                </p>

                <div className="flex flex-col gap-4">
                  <a
                    href="https://wa.me/212600000000"
                    target="_blank"
                    className="group relative flex items-center justify-center p-5 bg-zinc-900 overflow-hidden transition-all duration-500 hover:shadow-xl"
                  >
                    {/* Hover Slide Effect */}
                    <div className="absolute inset-0 bg-[#D08C63] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 text-[10px] font-black tracking-[0.3em] uppercase text-white">
                      Démarrer l'échange <span>→</span>
                    </span>
                  </a>

                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Temps de réponse : rapide</span>
                  </div>
                </div>
              </div>

              {/* Background Ghost Initials */}
              <div className="absolute -bottom-10 -left-10 text-[120px] font-black text-zinc-50 select-none pointer-events-none italic opacity-50"> HI </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}