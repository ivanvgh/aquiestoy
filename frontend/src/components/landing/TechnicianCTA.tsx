import { cn } from "@/lib/utils";

export default function TechnicianCTA() {
  return (
    <section className="py-20 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-orange-500/30">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              Promoción de Lanzamiento
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-display leading-tight">
              Gana el <span className="text-orange-500">100%</span> de tus primeros servicios.
            </h2>
            <p className="text-slate-400 text-lg mb-0">
              Únete a la red de técnicos de Arequipa. **0% de comisión** en tus primeros 3 trabajos. Cupos limitados para el estatus de &ldquo;Técnico Fundador&rdquo;.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 w-full lg:w-auto shrink-0">
            <a 
              href="/experts" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-10 rounded-2xl transition-all hover:scale-105 text-center shadow-2xl shadow-orange-500/40 text-lg"
            >
              Postular como Técnico
            </a>
            <div className="flex items-center gap-3 text-white/70 text-sm bg-white/5 border border-white/10 px-5 py-3 rounded-2xl justify-center">
              <span className="material-symbols-outlined text-orange-400">verified</span>
              Sólo 50 cupos de Fundador disponibles
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
