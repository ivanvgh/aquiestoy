export default function ReferralBanner() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-[800px] mx-auto bg-gradient-to-r from-primary to-accent-blue-dark rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-4">
              <span className="text-xl">🌟</span> AquiEstoy Rewards
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Suma créditos por tu recomendación</h2>
            <p className="text-info text-lg">Invita a amigos (técnicos o clientes) y acumula créditos canjeables por servicios o beneficios exclusivos en el futuro.</p>
          </div>
          <div className="shrink-0">
            <button className="bg-secondary hover:bg-accent-orange-dark text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0 w-full md:w-auto">
              Invitar amigos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
