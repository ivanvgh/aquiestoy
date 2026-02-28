export default function Footer() {
  return (
    <footer className="bg-background-dark text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white text-primary p-1 rounded">
                <span className="material-symbols-outlined text-[20px]">home_repair_service</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight font-display text-left">AquiEstoy</h2>
            </div>
            <p className="text-slate-400 max-w-xs mb-6 text-left">Conectando hogares con soluciones confiables. La forma más segura de contratar servicios en Arequipa.</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" href="#"><span className="material-symbols-outlined text-white">social_leaderboard</span></a>
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" href="#"><span className="material-symbols-outlined text-white">photo_camera</span></a>
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" href="#"><span className="material-symbols-outlined text-white">smart_display</span></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-left">Servicios</h4>
            <ul className="space-y-2 text-slate-400 text-sm text-left">
              <li><a className="hover:text-white transition-colors" href="#">Gasfitería</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Electricidad</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Limpieza</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Pintura</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-left">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm text-left">
              <li><a className="hover:text-white transition-colors" href="#">Términos y Condiciones</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Política de Privacidad</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Libro de Reclamaciones</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2025 AquiEstoy S.A.C. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">volcano</span>
            <span>Nacido con orgullo en Arequipa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
