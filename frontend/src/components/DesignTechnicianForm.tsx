"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useReferral } from "@/hooks/useReferral";
import { supabase } from "@/lib/supabaseClient";


const technicianFormSchema = z.object({
  specialties: z.array(z.string()).min(1, "Selecciona al menos una especialidad"),
  other_specialty: z.string().optional(),
  districts: z.array(z.string()).min(1, "Selecciona al menos un distrito"),
  phone: z
    .string()
    .regex(/^9\d{8}$/, "Debe ser un número peruano válido: 9 dígitos empezando con 9"),
  accept_terms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos",
  }),
});

const SPECIALTIES = [
  "Gasfitería", "Electricidad", "Limpieza", "Pintura", "Carpintería", "Cerrajería",
  "Línea Blanca", "Aire Acondicionado", "Drywall", "Jardinería", "Seguridad",
  "Soporte IT", "Veterinaria", "Estética", "Mudanza", "Auxilio Mecánico",
  "Topografía", "Arquitectura", "Enfermería/Terapia", "Soldadura", "Contabilidad", "Otro"
];
const DISTRICTS = [
  "Alto Selva Alegre", "Arequipa (Cercado)", "Cayma", "Cerro Colorado", "Characato",
  "Chiguata", "Jacobo Hunter", "J.L. Bustamante y Rivero", "La Joya", "Mariano Melgar",
  "Miraflores", "Mollebaya", "Paucarpata", "Pocsi", "Polobaya", "Quequeña",
  "Sabandía", "Sachaca", "San Juan de Siguas", "San Juan de Tarucani",
  "Santa Isabel de Siguas", "Santa Rita de Siguas", "Socabaya", "Tiabaya",
  "Uchumayo", "Vítor", "Yanahuara", "Yarabamba", "Yura"
];

type TechnicianFormValues = z.infer<typeof technicianFormSchema>;

export default function DesignTechnicianForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ownReferralCode, setOwnReferralCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TechnicianFormValues>({
    resolver: zodResolver(technicianFormSchema),
    defaultValues: {
      specialties: [],
      other_specialty: "",
      districts: [],
      phone: "",
      accept_terms: false,
    },
  });

  const selectedSpecialties = watch("specialties") || [];
  const selectedDistricts = watch("districts") || [];
  const referralCode = useReferral();

  const onSubmit = async (data: TechnicianFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const { data: inserted, error: regError } = await supabase
        .from("registrations")
        .insert([{
          full_name: "Técnico Pendiente",
          email: `tech_${Date.now()}@pendiente.aquiestoy.pe`,
          phone_number: `+51${data.phone}`,
          type: "technician",
          district: data.districts[0],
          category: [
            ...data.specialties,
            ...(data.other_specialty ? [data.other_specialty] : []),
          ].join(", "),
          referred_by: referralCode || null,
          accepted_terms: data.accept_terms,
          metadata: {
            all_districts: data.districts,
            all_specialties: data.specialties,
            other_specialty: data.other_specialty,
          },
        }])
        .select("own_referral_code")
        .single();

      if (regError) {
        throw new Error(regError.message);
      }

      if (inserted?.own_referral_code) {
        setOwnReferralCode(inserted.own_referral_code);
      }

      // Record vote for primary district
      await supabase.from("votes").insert([{
        feature_name: `district:${data.districts[0]}`,
      }]);


      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const shareUrl = ownReferralCode && typeof window !== "undefined"
      ? `${window.location.origin}/?ref=${ownReferralCode}`
      : null;

    return (
      <div className="bg-accent-green-light p-8 rounded-2xl border border-accent-green-border text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">¡Bienvenido al Equipo!</h3>
        <p className="text-slate-600 mb-6">Un asesor validará tus datos para activar tu perfil.</p>

        {shareUrl && (
          <div className="bg-white rounded-xl border border-accent-green-border p-4 text-left">
            <p className="text-sm font-bold text-slate-700 mb-2">🎁 Gana créditos invitando colegas</p>
            <p className="text-xs text-slate-500 mb-3">Comparte tu enlace. Ganarás <strong>S/10 de crédito</strong> por cada técnico o cliente que se registre.</p>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `*AquiEstoy* - Tecnicos verificados en Arequipa\n\nMe acabo de registrar como tecnico en la nueva app que conecta hogares con tecnicos de confianza. Es GRATIS y hay beneficios exclusivos para los primeros en unirse.\n\nRegistrate aqui (te dejo mi invitacion):\n${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-lg text-sm font-bold transition"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Invitar por WhatsApp
            </a>
            {ownReferralCode && (
              <p className="text-center text-xs text-slate-400 mt-2">Tu código: <strong className="text-slate-600">{ownReferralCode}</strong></p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Mis Especialidades</label>
          <div className="max-h-48 overflow-y-auto pr-1 -mr-1 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SPECIALTIES.map((spec) => (
                <label
                  key={spec}
                  className={cn(
                    "flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-all justify-start text-left",
                    "hover:bg-slate-50",
                    selectedSpecialties.includes(spec)
                      ? "border-secondary bg-secondary/5 text-secondary-dark font-bold"
                      : "border-slate-200 text-slate-600"
                  )}
                >
                  <input
                    type="checkbox"
                    value={spec}
                    {...register("specialties")}
                    className="h-4 w-4 rounded border-slate-300 text-secondary focus:ring-secondary/20"
                  />
                  <span className="truncate sm:whitespace-normal">{spec}</span>
                </label>
              ))}
            </div>
          </div>
          {errors.specialties && <p className="text-accent-red text-[10px] mt-1">{errors.specialties.message}</p>}
        </div>

        {selectedSpecialties.includes("Otro") && (
          <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <input
              {...register("other_specialty")}
              className="w-full p-2 text-xs rounded-lg border border-secondary/30 focus:ring-2 focus:ring-secondary/20 outline-none"
              placeholder="Dinos qué otro servicio ofreces..."
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Zonas de Cobertura</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {DISTRICTS.map((dist) => (
              <label
                key={dist}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-lg border text-[11px] cursor-pointer transition-all justify-start text-left",
                  "hover:bg-slate-50",
                  selectedDistricts.includes(dist)
                    ? "border-secondary bg-secondary/5 text-secondary-dark font-bold"
                    : "border-slate-200 text-slate-600"
                )}
              >
                <input
                  type="checkbox"
                  value={dist}
                  {...register("districts")}
                  className="h-3.5 w-3.5 rounded border-slate-300 text-secondary focus:ring-secondary/20"
                />
                <span className="truncate">{dist}</span>
              </label>
            ))}
          </div>
          {errors.districts && <p className="text-accent-red text-[10px] mt-1">{errors.districts.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Celular / WhatsApp</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm font-medium select-none">
            🇵🇪 +51
          </span>
          <input
            type="tel"
            maxLength={9}
            className={cn(
              "w-full rounded-r-lg border focus:ring-2 outline-none transition p-2.5",
              errors.phone
                ? "border-accent-red focus:ring-accent-red-border"
                : "border-slate-300 focus:border-secondary focus:ring-secondary/20 bg-white"
            )}
            placeholder="987 654 321"
            {...register("phone")}
          />
        </div>
        {errors.phone && <p className="text-accent-red text-xs mt-1">{errors.phone.message}</p>}
      </div>

      {referralCode && (
        <div className="flex items-center gap-2 p-3 bg-accent-green-light rounded-lg border border-accent-green-border">
          <span className="text-lg">🎁</span>
          <div className="flex-1">
            <p className="text-xs font-bold text-accent-green-darker">¡Fuiste invitado!</p>
            <p className="text-xs text-accent-green-dark">Código de referido: <strong>{referralCode}</strong></p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-2 cursor-pointer group">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-secondary focus:ring-secondary/20"
            {...register("accept_terms")}
          />
          <span className="text-[11px] text-slate-500 leading-tight group-hover:text-slate-700 transition-colors">
            Acepto los <a href="#" className="underline font-medium">Términos y Condiciones</a> y el tratamiento de mis datos.
          </span>
        </label>
        {errors.accept_terms && <p className="text-accent-red text-[10px]">{errors.accept_terms.message}</p>}
      </div>

      {error && <p className="p-3 bg-accent-red-light text-accent-red-dark rounded-lg text-sm border border-accent-red-border">{error}</p>}


      <button
        className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-lg transition-colors mt-2 disabled:opacity-50 shadow-lg shadow-slate-200"
        type="submit"
        disabled={loading}
      >
        {loading ? "Procesando..." : "Postular como Experto"}
      </button>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 mb-2 justify-center text-secondary">
          <span className="material-symbols-outlined text-sm">auto_graph</span>
          <span className="text-[11px] font-bold uppercase tracking-wider">Más que solo trabajo</span>
        </div>
        <p className="text-[10px] text-slate-500 text-center leading-relaxed">
          Gestiona tus **ganancias**, accede a **capacitaciones** y gana **bonos** (vales Sodimac y más) por tu buen desempeño.
          Un asesor validará tus documentos para activar tu perfil.
        </p>
      </div>
    </form>
  );
}
