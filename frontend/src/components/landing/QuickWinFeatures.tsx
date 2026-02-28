const FEATURES = [
  { icon: "shield_person", title: "Antecedentes verificados", description: "Revisión policial y penal" },
  { icon: "timer", title: "Respuesta en minutos", description: "Listos para atenderte hoy" },
  { icon: "payments", title: "Precio desde S/36", description: "Sin costos ocultos" },
  { icon: "verified", title: "Garantía de calidad", description: "Satisfacción asegurada" },
];

export default function QuickWinFeatures() {
  return (
    <section className="bg-surface-light border-y border-slate-200 py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
