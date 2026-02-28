import LeadForm from "@/components/LeadForm";

export default function WaitlistSection() {
  return (
    <section className="py-24 px-6 bg-accent-blue-light relative overflow-hidden" id="waitlist">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-[1000px] mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-accent-blue-border">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-14 bg-gradient-to-br from-primary to-primary-dark text-white flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 w-fit mb-6">
                <span className="material-symbols-outlined text-sm">hourglass_top</span>
                <span className="text-xs font-bold tracking-wide uppercase">Acceso Anticipado</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4 font-display leading-tight">
                Únete a la Revolución del Servicio en Arequipa
              </h2>
              <p className="text-white/80 text-lg mb-8">
                No somos solo una app, somos tu nuevo aliado de confianza. Regístrate hoy como <strong>&ldquo;Cliente Fundador&rdquo;</strong> y ayuda a decidir qué distritos abrimos primero.
              </p>
              <ul className="space-y-4">
                {[
                "Estatus de 'Cliente Fundador' con beneficios de por vida",
                "Crédito de S/10 para tu primer servicio (Primeros 100)",
                "Inspección técnica gratuita garantizada"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-green">check_circle</span>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 md:p-14 bg-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display text-center">
                Únete a la lista de espera
              </h3>
              <LeadForm type="CLIENT" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
