"use client";
export default function Partners() {
  const brands = ["NESPRESSO", "CDG", "ARVAL", "BEST WESTERN", "ECOLE CENTRALE", "CGEM"];
  
  return (
    <div className="py-12 border-y border-zinc-100 dark:border-zinc-800 overflow-hidden bg-white dark:bg-black">
      <div className="flex gap-20 animate-infinite-scroll">
        {[...brands, ...brands].map((brand, i) => (
          <span key={i} className="text-zinc-300 dark:text-zinc-700 text-2xl font-black tracking-widest uppercase italic">
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}