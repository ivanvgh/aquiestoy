import DesignTechnicianForm from "@/components/DesignTechnicianForm";

export default function TechnicianSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-orange-400 to-accent-orange-dark" id="technician">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/30 text-white font-bold text-sm mb-6 animate-bounce">
          <span className="w-2 h-2 bg-accent-red rounded-full animate-pulse"></span>
          Solo quedan 38 cupos este mes
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight font-display">¿Eres técnico independiente en Arequipa?</h2>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">Únete a la red más confiable. Sin jefes, tú decides tus horarios y cobras lo justo.</p>
        <div className="bg-white rounded-3xl p-8 md:p-10 max-w-[900px] mx-auto shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 font-display">
                <span className="material-symbols-outlined text-secondary">pie_chart</span>
                Transparencia Total
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-accent-green-light rounded-lg border border-accent-green-border">
                  <span className="font-medium text-slate-700">Tú ganas (Técnico)</span>
                  <span className="font-bold text-accent-green-dark text-lg">80%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-medium text-slate-500">Comisión Plataforma</span>
                  <span className="font-bold text-slate-500">20%</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4">*La comisión cubre marketing, procesamiento de pagos y seguro. Solo pagas si tienes trabajo.</p>
            </div>
            <DesignTechnicianForm />
          </div>
        </div>
      </div>
    </section>
  );
}
