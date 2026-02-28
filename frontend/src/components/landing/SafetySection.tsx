import Image from "next/image";

const SAFETY_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCAktTZXPYU3LDtAGfZ3Vfi2dYrvfDoZYQIe_A-6An_YHib4_inUV-q8UbxaVl9LPo-P6_tpZOeKQqiIacPwGciaGAulwqXX5FoTGJpydXkwZwx5eLV_r7Psh9Vk8H8Fscim4-rsjmrZSlXTSDVGbq7AX9LxYdrv82DpX9v8R8pdsBP6uqU7MdalkoYtfpOcI3OEMt0quYz5z6sj9r4a93FADUJywqe2cvGY-jrlsHPcKXrkixqDxZLfpdIZ3Sy2KTE-nu-Qbg81kDT";

const SAFETY_FEATURES = [
  { icon: "account_balance_wallet", title: "Pago Protegido (Escrow)", description: "El técnico no recibe el pago hasta que tú confirmas que el trabajo está terminado y bien hecho." },
  { icon: "location_on", title: "Check-in GPS", description: "Monitoreamos la ubicación del técnico durante el servicio para garantizar tu seguridad y puntualidad." },
  { icon: "gavel", title: "Resolución de Disputas", description: "Si algo sale mal, nuestro equipo de soporte interviene inmediatamente para mediar y resolver." },
];

export default function SafetySection() {
  return (
    <section className="py-24 px-6 bg-white" id="safety">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-slate-100 rounded-full blur-3xl -z-10"></div>
            <Image
              alt="Pago digital seguro en smartphone"
              className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              src={SAFETY_IMAGE_URL}
              width={600}
              height={450}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-[200px] hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-accent-green">lock</span>
                <span className="font-bold text-slate-900 text-sm">Pago en Escrow</span>
              </div>
              <p className="text-xs text-slate-500">Tu dinero se retiene seguro hasta que apruebes el trabajo.</p>
            </div>
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
