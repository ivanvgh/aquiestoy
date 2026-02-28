const STEPS = [
  { icon: "touch_app", title: "Solicita tu servicio", description: "Describe lo que necesitas en la app o web. Es rápido y sencillo.", step: "1" },
  { icon: "person_search", title: "Elige a tu experto", description: "Revisa perfiles verificados, calificaciones y precios transparentes.", step: "2" },
  { icon: "task_alt", title: "Paga seguro y califica", description: "El pago se libera al terminar. Si te gusta, califica con 5 estrellas.", step: "3" },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-surface-light relative overflow-hidden" id="how-it-works">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center font-display">Así de simple funciona</h2>
        <div className="relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>
          <div className="grid md:grid-cols-3 gap-12">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center mb-6 relative">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">{step.step}</div>
                  <span className="material-symbols-outlined text-4xl text-primary">{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
