export default function Services() {
  const services = [
    { title: "Coaching Décoration", subtitle: "Architecture Intérieure", img: "/decor.jpg" },
    { title: "Aquatique", subtitle: "Mur d'eau • Aquarium • Vivier", img: "/aquatic.jpg" },
    { title: "Design Végétal", subtitle: "Paysagiste • Végétal Stabilisé", img: "/vegetal.jpg" },
    { title: "Formation", subtitle: "Transmission du savoir-faire", img: "/formation.jpg" },
  ];

  return (
    <section className="py-24 px-8 md:px-20 bg-brand-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm text-brand-green uppercase tracking-[0.3em] font-bold mb-12 text-center">
          Nos Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="h-[400px] w-full bg-gray-200 overflow-hidden relative mb-6">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/40" />
              </div>
              <h3 className="text-xl font-bold uppercase text-brand-dark mb-1">{service.title}</h3>
              <p className="text-sm text-gray-500">{service.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}