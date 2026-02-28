const FAQS = [
  { question: "¿Cómo verifican a los técnicos?", answer: "Realizamos una verificación rigurosa de identidad (DNI), antecedentes penales, policiales y judiciales. Además, entrevistamos personalmente a cada técnico." },
  { question: "¿Qué pasa si el técnico no llega?", answer: "Si el técnico cancela o no llega, te asignamos otro inmediatamente o te devolvemos el 100% de tu dinero reservado." },
  { question: "¿Puedo pagar en efectivo?", answer: "Por seguridad, todos los pagos se realizan a través de la app (tarjeta o Yape/Plin) para mantener la garantía y el rastro de la transacción." },
];

export default function FaqSection() {
  return (
    <section className="py-24 bg-surface-light">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10 font-display">Preguntas Frecuentes</h2>
        <div className="space-y-4 mb-20">
          {FAQS.map((faq, i) => (
            <details key={i} className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-slate-900 group-open:bg-slate-50 transition-colors">
                <span>{faq.question}</span>
                <span className="transition group-open:rotate-180"><span className="material-symbols-outlined">expand_more</span></span>
              </summary>
              <div className="text-slate-600 p-5 pt-0 border-t border-slate-100 mt-2">{faq.answer}</div>
            </details>
          ))}
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">¿No encontraste tu distrito?</h3>
          <p className="text-slate-600 mb-6">Estamos expandiéndonos rápidamente por todo Arequipa. Déjanos tu correo y te avisaremos.</p>
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input className="flex-1 rounded-lg border-slate-300 focus:border-primary focus:ring focus:ring-primary/20 bg-white px-4 py-2" placeholder="tucorreo@ejemplo.com" type="email" />
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors">Avisarme</button>
          </form>
        </div>
      </div>
    </section>
  );
}
