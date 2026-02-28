import Image from "next/image";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

import beforePainting from "@/assets/images/landing/before_painting.png";
import afterPainting from "@/assets/images/landing/after_painting.png";

const CLIENT_AVATAR_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAVF1H01uH8S60lkxKLdKPYWWg7FjgDM6At0va10SnPQkUjOplOQkcqvjDn9lHys7wLDmMOhGFADrGfIGmP6OSgGnKpQ5wEsXI46UgGi5rhnGCYp5AmyP3jvKzISP5-YDQOtR1ymc7sc0pIXlKbkr3FrjPxvjAOw40YwXmmLj7e50OeP5aWpm6CxFQ9df2h7U3ZWF7rXwb8r1Xoyl1FwORWf7yUBuufr5D2r6Z6bPgYQp9Ui6lXi_ZkHZO87o3Lot7dE2ykBxe6QkU6";

export default function SuccessCaseSection() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange-light border border-accent-orange-border mb-6">
              <span className="material-symbols-outlined text-secondary text-sm">auto_awesome</span>
              <span className="text-secondary text-xs font-bold tracking-wide uppercase">Casos de Éxito</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight font-display">Resultados Reales en Arequipa</h2>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-surface-light border-l-4 border-secondary">
                <h4 className="font-bold text-slate-900 mb-2 italic">&quot;Pintura de fachada integral&quot;</h4>
                <p className="text-slate-600 mb-4">Renovación total en Cerro Colorado. Se aplicó base selladora y dos manos de pintura premium elastomérica, ideal para el clima de Arequipa.</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <Image alt="Cliente" className="object-cover" src={CLIENT_AVATAR_URL} width={40} height={40} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 text-left">Sr. Valdivia</p>
                    <p className="text-xs text-slate-500 text-left">Cerro Colorado, Arequipa</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-primary">
                <span className="material-symbols-outlined">verified</span>
                <span className="font-semibold text-sm uppercase tracking-wider">Técnico Nivel Pro Certificado</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <BeforeAfterSlider beforeImage={beforePainting.src} afterImage={afterPainting.src} />
            <div className="mt-4 flex justify-center items-center gap-2 text-slate-400 text-sm">
              <span className="material-symbols-outlined text-base">swipe_left_alt</span>
              <span>Desliza para ver la transformación</span>
              <span className="material-symbols-outlined text-base">swipe_right_alt</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
