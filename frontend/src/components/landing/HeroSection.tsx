import Image from "next/image";

const AVATAR_URLS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAVF1H01uH8S60lkxKLdKPYWWg7FjgDM6At0va10SnPQkUjOplOQkcqvjDn9lHys7wLDmMOhGFADrGfIGmP6OSgGnKpQ5wEsXI46UgGi5rhnGCYp5AmyP3jvKzISP5-YDQOtR1ymc7sc0pIXlKbkr3FrjPxvjAOw40YwXmmLj7e50OeP5aWpm6CxFQ9df2h7U3ZWF7rXwb8r1Xoyl1FwORWf7yUBuufr5D2r6Z6bPgYQp9Ui6lXi_ZkHZO87o3Lot7dE2ykBxe6QkU6",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBvZ7qScIubDlWXXQIYvP5PE1m-W8rqcxweetJqN0g1KzZThrciJP_n3R3vXduO8CouoKIFpmEf4qdbB-aBmeCwSx10Uy7oLgUTvBj_S4baR4AZ1sQ2QrnMlAzb8adOIOaOK05xiC4hD_BtyCxaZvH2HITr7hRRBENg3x34oPFX5aURRbjobpFtvlG-eUr5Nj_qE0ggVebAHiQw2RuUKBdtzdUlVOOEySKo7vc_KL1L0jDlbM500Hr8xuZdvHaW8_MxwKe0qOnExStS",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA1cWrXqJ9dQYhlldvO1JOAV4OWDihzlFfAOiS6_mkmAKts-IieBCKrTe8IiJkqyVQkX1U4_npQi2obrUDjjzjhg9E0fG8EhRLqHSyuqLY-eZ0Ixe5Fq_4AzwlRP2lHFDOmo5WIRRPocSQK4iOjV-Khqln6TwgARHEYRlIH1PDiuFMyEyKpruQCyagL0099cxZNDCc1uEpeFYRksViOyzh1onOy45yu3pkWQzOYtdu4BZvOmej0vd1uzmjCR1FiP9Jut_TMA7vAkArz",
];

const HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB4CdAIw-AO1VkAHkpPaj6s6YpxTdVf6nJWlP0tIDR_CmKWmauIei4L-Rch84suS1B5nbPJExwAdhmKMymOTZeGN2FO2SNzAjY95CxmQEYzZZdzZVEB2nBzeLdNQInmF2aXN7XaukJrLH0p8mA0n_1HF2sxVRhHjGuGzKGdsCyoHLm-T8vElpHbpIMn14rZ0ZL7oo4Zyo014x3p0r6o-2f5hClrkNiSK95BxBMOqp9KM69kprQo7qt7YGiwDYoP6VGGSRXPyF89wu9Q";

export default function HeroSection() {
  return (
    <section className="relative pt-8 pb-10 lg:pt-16 lg:pb-32 px-6 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] -z-10 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue-light border border-accent-blue-border w-fit">
                <span className="material-symbols-outlined text-[14px] text-primary leading-none">flight_land</span>
                <span className="text-primary text-[10px] font-bold tracking-wide uppercase">Arequipa: Estamos llegando</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange-light border border-accent-orange-border w-fit">
                <span className="text-[14px]">🎁</span>
                <span className="text-secondary text-[10px] font-bold tracking-wide uppercase">S/10 de Crédito</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight font-display">
              Técnicos de confianza a un <span className="text-primary">mensaje</span> de distancia.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              AquiEstoy conectará a Arequipa con técnicos verificados, puntuales y con precios transparentes. 
              <span className="block mt-2 font-semibold text-slate-900">Asegura tu beneficio de &ldquo;Cliente Fundador&rdquo; hoy.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-2">
              <a href="#waitlist" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white h-14 px-10 rounded-xl text-base font-bold transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group">
                <span className="material-symbols-outlined text-[22px]">schedule</span>
                Quiero ser fundador
              </a>
              <a className="w-full sm:w-auto h-14 px-8 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold rounded-xl transition-all gap-3 group" href="/experts">
                <span className="material-symbols-outlined text-[22px] text-secondary">engineering</span>
                Postular como técnico
              </a>
            </div>
            <div className="flex items-center gap-4 pt-4 text-sm text-slate-500">
              <div className="flex -space-x-3">
                {AVATAR_URLS.map((url, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <Image alt="User Avatar" className="object-cover" src={url} width={40} height={40} />
                  </div>
                ))}
              </div>
              <p className="font-medium"><span className="text-slate-900">+120</span> técnicos postulando en Arequipa</p>
            </div>
          </div>
          <div className="relative aspect-video lg:aspect-auto lg:h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            <div className="hidden lg:block absolute bottom-8 left-8 z-20 text-white max-w-xs bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-accent-green-muted">verified_user</span>
                <span className="font-bold">Seguridad AquiEstoy</span>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">Verificación de antecedentes y póliza de soporte en cada servicio.</p>
            </div>
            <Image
              alt="Técnico profesional trabajando en un hogar de Arequipa"
              className="object-cover object-center scale-105 hover:scale-110 transition-transform duration-[10s]"
              src={HERO_IMAGE_URL}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
