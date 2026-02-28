const STEPS = [
  { icon: "touch_app", title: "Solicitas tu servicio", description: "Describe lo que necesitas. Los técnicos cercanos recibirán tu señal y te enviarán sus propuestas.", step: "1" },
  { icon: "person_search", title: "Eliges con confianza", description: "Selecciona al experto ideal basado en su precio, experiencia y cercanía. Tú tienes el control.", step: "2" },
  { icon: "home_repair_service", title: "Llegan a tu puerta", description: "El profesional acudirá a tu hogar u oficina puntualmente para realizar el trabajo solicitado.", step: "3" },
  { icon: "payments", title: "Pagas y calificas", description: "Paga directo (Efectivo/Yape) al terminar y califica la experiencia para ayudar a otros.", step: "4" },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-surface-light relative overflow-hidden" id="how-it-works">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center font-display">Así de simple funcionará</h2>
        <div className="relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>
          <div className="grid md:grid-cols-4 gap-8">
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
