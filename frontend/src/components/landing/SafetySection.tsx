import Image from "next/image";

const SAFETY_IMAGE_URL = "/images/landing/safety_trust.png";

const SAFETY_FEATURES = [
  { icon: "verified_user", title: "Identidad Validada", description: "Todos nuestros técnicos pasan por una revisión estricta de antecedentes penales." },
  { icon: "location_on", title: "Monitoreo próximamente", description: "Con el lanzamiento de nuestra app móvil, incluiremos seguimiento GPS para tu tranquilidad." },
  { icon: "gavel", title: "Soporte y Mediación", description: "Nuestro equipo está siempre disponible para actuar como mediador en cualquier inconveniente." },
];

export default function SafetySection() {
  return (
    <section className="py-24 px-6 bg-white" id="safety">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-slate-100 rounded-full blur-3xl -z-10"></div>
            <Image
              alt="Técnico verificado brindando confianza al cliente"
              className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              src={SAFETY_IMAGE_URL}
              width={600}
              height={450}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-display text-left">Tranquilidad absoluta en cada servicio</h2>
            <p className="text-slate-600 mb-10 text-lg text-left">Hemos diseñado un ecosistema de seguridad para que solo te preocupes por disfrutar tu hogar.</p>
            <div className="space-y-8">
              {SAFETY_FEATURES.map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue-light flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">{feature.icon}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-slate-900 font-display">{feature.title}</h3>
                    <p className="text-slate-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
