import { cn } from "@/lib/utils";

const SERVICES = [
  { icon: "plumbing", title: "Gasfitería", description: "Reparación de fugas, instalación de grifos y mantenimiento general.", price: "S/36" },
  { icon: "cleaning_services", title: "Limpieza", description: "Limpieza profunda de departamentos, casas y oficinas.", price: "S/78" },
  { icon: "format_paint", title: "Pintura", description: "Pintado de interiores, fachadas y retoques profesionales.", price: "S/300" },
  { icon: "electrical_services", title: "Electricidad", description: "Instalaciones, cableado, reparación de cortocircuitos.", price: "Cotizar" },
  { icon: "carpenter", title: "Carpintería", description: "Reparación de muebles, puertas y trabajos en madera.", price: "Cotizar" },
  { icon: "key", title: "Cerrajería", description: "Apertura de puertas, cambio de chapas y seguridad.", price: "Cotizar" },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 px-6 bg-white" id="services">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-display">Soluciones para cada rincón</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Encuentra al experto ideal para ese arreglo que has estado postergando.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const hasPrice = service.price.startsWith("S/");
            return (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-accent-blue-light p-3 rounded-lg text-primary">
                    <span className="material-symbols-outlined">{service.icon}</span>
                  </div>
                  <span className={cn(
                    "text-sm font-semibold px-2 py-1 rounded",
                    hasPrice ? "text-secondary bg-accent-orange-light" : "text-slate-400 bg-slate-50"
                  )}>
                    {hasPrice ? `Desde ${service.price}` : service.price}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{service.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{service.description}</p>
                <a className="inline-flex items-center text-primary font-semibold text-sm hover:underline" href="#">
                  Solicitar servicio <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
