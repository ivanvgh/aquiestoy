"use client";

const FAQS = [
  { question: "¿Cómo verifican a los técnicos?", answer: "Validamos la identidad de cada técnico y realizamos una revisión de sus antecedentes penales antes de permitirles unirse a la plataforma." },
  { question: "¿Qué sucede si hay algún imprevisto?", answer: "Promovemos una comunidad basada en el compromiso y la puntualidad. Si un profesional no pudiera asistir, nuestro equipo de soporte te ayudará a reasignar el servicio de inmediato y gestionará una solución para que tu experiencia sea positiva." },
  { question: "¿Puedo pagar en efectivo?", answer: "Sí. En esta etapa, promovemos el trato directo. Puedes pagar en efectivo, Yape o transferencia una vez que el trabajo esté terminado y estés totalmente conforme." },
  { question: "¿Tienen garantía por los trabajos?", answer: "AquiEstoy actúa como mediador y seleccionamos técnicos que ofrecen garantía por su mano de obra. En caso de inconvenientes, nuestro equipo de soporte intervendrá para ayudarte a encontrar una solución justa." },
];

interface FaqSectionProps {
  showWaitlistCTA?: boolean;
}

export default function FaqSection({ showWaitlistCTA = true }: FaqSectionProps) {
  return (
    <section className="py-12 lg:py-24 bg-surface-light">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-8 lg:mb-10 font-display">Preguntas Frecuentes</h2>
        <div className="space-y-4 mb-10 lg:mb-20">
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
        {showWaitlistCTA && (
          <div className="text-center bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">Arequipa, tú decides dónde empezamos</h3>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              Estamos priorizando el lanzamiento según los votos de cada distrito. Asegura tu lugar, dinos qué necesitas y recibe beneficios exclusivos por ser de los primeros en apoyarnos.
            </p>
            <div className="flex justify-center">
              <a 
                href="#waitlist" 
                className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                Votar y Asegurar Beneficio
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
