"use client";

import { cn } from "@/lib/utils";

const VOTES = [
  { district: "Cayma", percentage: 92, status: "Próxima apertura" },
  { district: "Yanahuara", percentage: 85, status: "Alta demanda" },
  { district: "Cercado", percentage: 78, status: "En evaluación" },
  { district: "J.L. Bustamante", percentage: 65, status: "En evaluación" },
  { district: "Cerro Colorado", percentage: 58, status: "En evaluación" },
];

export default function DistrictVotingResults() {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent-blue-light text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <span className="material-symbols-outlined text-[14px]">how_to_vote</span>
              Votación en Vivo: Arequipa
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 font-display leading-tight">
              Tú decides dónde <span className="text-primary">llegamos</span> primero.
            </h2>
            <p className="text-slate-600 mb-8 text-lg">
              Estamos expandiendo nuestra red basándonos en la demanda real. Vota por tu distrito y sé el primero en recibir beneficios exclusivos de lanzamiento cuando abramos en tu zona.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-accent-green"></span>
                +1,200 Votos Totales
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Actualizado hoy
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 relative">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2 font-display">
              <span className="material-symbols-outlined text-primary">bar_chart</span>
              Ranking por Distritos
            </h3>
            
            <div className="space-y-8">
              {VOTES.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="font-bold text-slate-900">{item.district}</span>
                      <span className={cn(
                        "ml-3 text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded",
                        item.percentage > 80 ? "bg-accent-green-light text-accent-green-darker" : "bg-slate-100 text-slate-500"
                      )}>
                        {item.status}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-400">{item.percentage}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out",
                        item.percentage > 80 ? "bg-accent-green" : "bg-primary/60"
                      )} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <a 
                href="#waitlist" 
                className="text-primary font-bold hover:underline inline-flex items-center gap-1 group"
              >
                Votar por mi distrito
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
