const BENEFITS = [
  {
    icon: "payments",
    title: "Maximiza tus Ingresos",
    description:
      "Aprovecha el 0% de comisión durante el lanzamiento. Todo lo que cobras es íntegramente para ti por tus primeros 3 trabajos.",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    featured: true,
  },
  {
    icon: "schedule",
    title: "Libertad absoluta",
    description:
      "Tú decides cuándo y dónde trabajar. Sin jefes ni horarios impuestos. Activa tu perfil cuando estés disponible.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: "verified_user",
    title: "Confianza ganada",
    description:
      "Forma parte del círculo élite de técnicos verificados. El sello de AquiEstoy es sinónimo de calidad y seguridad.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: "trending_up",
    title: "Impulsa tu Carrera",
    description:
      "Accede a capacitaciones VIP, bonos por metas y vales para renovar tus herramientas. Premiamos tu excelencia.",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    icon: "reviews",
    title: "Tu reputación, tu activo",
    description:
      "Construye tu prestigio con reseñas de clientes. A mejor calificación y más trabajos realizados, más clientes confiarán en ti.",
    gradient: "from-pink-400 to-rose-500",
  },
];

export default function TechnicianBenefitsGrid() {
  return (
    <section className="relative py-28 bg-slate-950 overflow-hidden">
      {/* Ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/[0.07] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-orange-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Beneficios exclusivos
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.1]">
            ¿Por qué ser un
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Técnico Fundador
            </span>
            ?
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BENEFITS.map((benefit, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl transition-all duration-500 ${
                benefit.featured ? "md:col-span-2" : ""
              }`}
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-100 group-hover:from-white/[0.15] transition-opacity duration-500" />

              <div
                className={`relative rounded-2xl bg-slate-900/80 backdrop-blur-sm p-8 ${
                  benefit.featured ? "md:p-10" : ""
                } h-full`}
              >
                {/* Icon with gradient */}
                <div
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${benefit.gradient} mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                >
                  <span className="material-symbols-outlined text-white text-xl">
                    {benefit.icon}
                  </span>
                </div>

                <h3
                  className={`font-bold text-white mb-3 font-display ${
                    benefit.featured
                      ? "text-2xl md:text-3xl"
                      : "text-xl"
                  }`}
                >
                  {benefit.title}
                </h3>

                <p
                  className={`text-slate-400 leading-relaxed ${
                    benefit.featured
                      ? "text-base md:text-lg max-w-2xl"
                      : "text-sm"
                  }`}
                >
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
