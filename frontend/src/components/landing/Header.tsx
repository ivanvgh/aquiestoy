export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white p-1.5 rounded-lg">
            <span className="material-symbols-outlined text-[24px]">home_repair_service</span>
          </div>
          <h2 className="text-primary text-xl font-black tracking-tight font-display">AquiEstoy</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-slate-600 hover:text-primary font-medium text-sm transition-colors" href="#services">Servicios</a>
          <a className="text-slate-600 hover:text-primary font-medium text-sm transition-colors" href="#how-it-works">Cómo funciona</a>
          <a className="text-slate-600 hover:text-primary font-medium text-sm transition-colors" href="#safety">Seguridad</a>
        </nav>
        <div className="flex items-center gap-4">
          <a className="hidden sm:block text-slate-900 font-medium text-sm hover:text-secondary transition-colors" href="#technician">Soy Técnico</a>
          <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
            Descargar App
          </button>
        </div>
      </div>
    </header>
  );
}
