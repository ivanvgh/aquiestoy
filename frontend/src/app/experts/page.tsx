import TechnicianHero from "@/components/landing/TechnicianHero";
import TechnicianBenefitsGrid from "@/components/landing/TechnicianBenefitsGrid";
import DesignTechnicianForm from "@/components/DesignTechnicianForm";
import FaqSection from "@/components/landing/FaqSection";
import SimplifiedHeader from "@/components/landing/SimplifiedHeader";
import SimplifiedFooter from "@/components/landing/SimplifiedFooter";

export default function ExpertosPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <SimplifiedHeader />
      <TechnicianHero />
      
      <TechnicianBenefitsGrid />

      {/* Trust & Transparency Section */}
      <section className="py-24 bg-slate-50" id="join">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <div className="md:sticky md:top-24">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                Transparencia AquiEstoy
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-6 font-display leading-tight">
                Tus finanzas bajo tu control total.
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="bg-accent-green-light p-3 rounded-xl text-accent-green-dark">
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Pagos Directos</h4>
                    <p className="text-sm text-slate-500">Recibe tu dinero en efectivo, Yape o plin al instante de terminar el trabajo. Sin intermediarios.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <span className="material-symbols-outlined">query_stats</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Panel de Ganancias</h4>
                    <p className="text-sm text-slate-500">Visualiza cuánto ha ganado cada día y cada semana desde tu celular. Gestión profesional simplificada.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Capacitaciones Gratuitas</h4>
                    <p className="text-sm text-slate-500">Accede a talleres de atención al cliente y gestión de herramientas para llevar tu oficio al siguiente nivel.</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="join-form" className="bg-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">No pierdes nada, es gratis.</h3>
                <p className="text-sm text-slate-500">Regístrate hoy, solo tendrás trabajo y cero preocupaciones de estar buscando afuera.*</p>
              </div>
              <DesignTechnicianForm />
              <p className="text-center text-slate-400 text-xs mt-6 italic">
                *Al registrarte, un asesor de AquiEstoy se comunicará contigo para validar tus documentos e iniciar el proceso de verificación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified FAQ for Technicians */}
      <FaqSection showWaitlistCTA={false} />

      <SimplifiedFooter />

    </main>
  );
}
