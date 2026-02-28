import { cn } from "@/lib/utils";

export default function TechnicianCTA() {
  return (
    <section className="py-20 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left max-w-xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-display">¿Eres un experto en tu oficio?</h2>
            <p className="text-slate-400 text-lg">
              Únete a la red de técnicos mejor pagados de Arequipa. Sin comisiones abusivas y con total libertad de horario.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a 
              href="/experts" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 text-center shadow-lg shadow-orange-500/20"
            >
              Postular como Técnico
            </a>
            <div className="flex items-center gap-2 text-white/60 text-sm border border-white/10 px-4 py-2 rounded-xl justify-center">
              <span className="material-symbols-outlined text-orange-400 text-sm">verified</span>
              Cupos de Fundador Disponibles
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
