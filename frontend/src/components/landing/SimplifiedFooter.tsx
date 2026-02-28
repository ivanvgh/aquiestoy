export default function SimplifiedFooter() {
  return (
    <footer className="bg-slate-900 text-white/40 py-12 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="bg-white/10 text-white p-1 rounded">
                <span className="material-symbols-outlined text-[16px]">home_repair_service</span>
              </div>
              <span className="text-sm font-bold text-white/60">AquiEstoy</span>
          </div>
          
          <div className="flex gap-8 text-xs font-medium">
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Soporte</a>
          </div>

          <p className="text-[10px] uppercase tracking-widest">© 2025 Arequipa, Perú</p>
        </div>
      </div>
    </footer>
  );
}
