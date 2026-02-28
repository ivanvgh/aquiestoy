import Link from "next/link";

export default function SimplifiedHeader() {
  return (
    <header className="absolute top-0 w-full z-50 py-6">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-orange-500 text-white p-1.5 rounded-lg">
            <span className="material-symbols-outlined text-[24px]">home_repair_service</span>
          </div>
          <h2 className="text-white text-xl font-black tracking-tight font-display">AquiEstoy</h2>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              Programa de Técnicos Fundadores
            </p>
          </div>
          <a href="/login" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">account_circle</span>
            <span className="hidden sm:inline">Entrar</span>
          </a>
        </div>
      </div>
    </header>
  );
}
