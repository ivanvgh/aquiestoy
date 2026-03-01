"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

interface VoteStat {
  district: string;
  percentage: number;
  status: string;
  count: number;
}

const DEFAULT_DISTRICTS = ["Cayma", "Yanahuara", "Cercado", "J.L. Bustamante", "Cerro Colorado"];

export default function DistrictVotingResults() {
  const [votes, setVotes] = useState<VoteStat[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('votes')
          .select('feature_name');

        if (error) throw error;

        // Aggregate votes by district
        const counts: Record<string, number> = {};
        let total = 0;

        data.forEach((v: any) => {
          if (v.feature_name.startsWith('district:')) {
            const district = v.feature_name.split(':')[1];
            counts[district] = (counts[district] || 0) + 1;
            total++;
          }
        });

        // Map to display format — target is 50 registrations per district to open
        const TARGET = 50;
        const stats = DEFAULT_DISTRICTS.map(d => {
          const count = counts[d] || 0;
          const percentage = Math.min(Math.round((count / TARGET) * 100), 100);

          let status = "En evaluación";
          if (count >= TARGET) status = "Próxima apertura";
          else if (count >= TARGET * 0.5) status = "Alta demanda";

          return { district: d, count, percentage, status };
        }).sort((a, b) => b.count - a.count);

        setVotes(stats);
        setTotalVotes(total);
      } catch (err) {
        console.error("Error fetching votes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotes();

    // Optional: Set up real-time subscription
    const channel = supabase
      .channel('public:votes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'votes' }, fetchVotes)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
                +{totalVotes.toLocaleString()} Votos Totales
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                {isLoading ? "Actualizando..." : "Actualizado ahora"}
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
              {isLoading && votes.length === 0 ? (
                <div className="flex flex-col gap-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                      <div className="h-2.5 bg-slate-50 rounded-full w-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                votes.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="font-bold text-slate-900">{item.district}</span>
                        <span className={cn(
                          "ml-3 text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded",
                          item.count >= 50 ? "bg-accent-green-light text-accent-green-darker" :
                          item.count >= 25 ? "bg-accent-blue-light text-primary" : "bg-slate-100 text-slate-500"
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
                          item.percentage > 80 ? "bg-accent-green" : 
                          item.percentage > 50 ? "bg-primary" : "bg-primary/60"
                        )} 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              )}
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
