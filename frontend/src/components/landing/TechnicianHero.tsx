import { cn } from "@/lib/utils";

export default function TechnicianHero() {
  return (
    <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden py-20 bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/landing/technician_hero.png" 
          alt="Técnico Profesional" 
          className="w-full h-full object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full text-left">
        <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-orange-500/30 text-orange-400 font-bold text-sm mb-6 animate-pulse">
          <span className="w-2 h-2 bg-accent-green rounded-full"></span>
          Convocatoria: Técnicos Fundadores en Arequipa
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight font-display leading-[1.1]">
          Sé tu propio jefe. <br />
          <span className="text-orange-400">Cobra el 100%</span> <br />
          de tu trabajo.
        </h1>
        
        <p className="text-slate-300 text-lg md:text-xl max-w-xl mb-10 font-medium italic">
          "El mundo avanza y AquiEstoy quiere que tú también avances." <br />
          <span className="not-italic text-slate-400 text-base block mt-2">Únete a la red más confiable de Arequipa. Sin oficinas, sin horarios y con pagos directos a tu bolsillo.</span>
        </p>

        <div className="flex flex-wrap gap-4">
          <a 
            href="#join-form"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20 text-lg"
          >
            Postular Gratis
          </a>
          <div className="flex items-center gap-3 text-white/70 bg-white/5 backdrop-blur-sm px-5 rounded-xl border border-white/10 italic text-sm">
            <span className="material-symbols-outlined text-orange-400">workspace_premium</span>
            Primeras 3 conexiones libres de comisión
          </div>
        </div>
      </div>
    </div>
  );
}
