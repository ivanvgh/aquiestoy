"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useReferral } from "@/hooks/useReferral";
import { supabase } from "@/lib/supabaseClient";


const DISTRICTS = [
  "Alto Selva Alegre",
  "Arequipa (Cercado)",
  "Cayma",
  "Cerro Colorado",
  "Characato",
  "Chiguata",
  "Jacobo Hunter",
  "J.L. Bustamante y Rivero",
  "La Joya",
  "Mariano Melgar",
  "Miraflores",
  "Mollebaya",
  "Paucarpata",
  "Pocsi",
  "Polobaya",
  "Quequeña",
  "Sabandía",
  "Sachaca",
  "San Juan de Siguas",
  "San Juan de Tarucani",
  "Santa Isabel de Siguas",
  "Santa Rita de Siguas",
  "Socabaya",
  "Tiabaya",
  "Uchumayo",
  "Vítor",
  "Yanahuara",
  "Yarabamba",
  "Yura",
];

const leadSchema = z.object({
  full_name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Email inválido"),
  phone_number: z
    .string()
    .regex(/^9\d{8}$/, "Debe ser un número peruano válido: 9 dígitos empezando con 9 (ej: 987 654 321)"),
  category: z.string().optional(),
  district: z.string().min(1, "Selecciona tu distrito para votar"),
  lead_type: z.enum(["TECHNICIAN", "CLIENT"]),
  accept_terms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos para continuar",
  }),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormProps {
  type: "TECHNICIAN" | "CLIENT";
  className?: string;
}

export default function LeadForm({ type, className }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ownReferralCode, setOwnReferralCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      lead_type: type,
      accept_terms: false,
      district: "",
    },
  });

  const referralCode = useReferral();

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // 1. Insert into registrations table (all proper columns)
      const { data: insertedData, error: regError } = await supabase
        .from('registrations')
        .insert([{
          full_name: data.full_name,
          email: data.email,
          phone_number: `+51${data.phone_number}`,
          type: data.lead_type.toLowerCase(),
          district: data.district,
          category: data.category || null,
          referred_by: referralCode || null,
          accepted_terms: data.accept_terms,
        }])
        .select('own_referral_code')
        .single();

      if (regError) {
        if (regError.code === '23505') {
          throw new Error("Este correo ya está registrado.");
        }
        throw new Error(regError.message);
      }

      if (insertedData?.own_referral_code) {
        setOwnReferralCode(insertedData.own_referral_code);
      }

      // 2. Record the district vote
      const { error: voteError } = await supabase
        .from('votes')
        .insert([{
          feature_name: `district:${data.district}`,
        }]);

      if (voteError) {
        console.error("Error saving vote:", voteError);
      }


      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const shareUrl = ownReferralCode && typeof window !== 'undefined'
      ? `${window.location.origin}/?ref=${ownReferralCode}`
      : null;

    return (
      <div className={cn("text-center p-8 bg-accent-green-light rounded-xl border border-accent-green-border", className)}>
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-xl font-bold text-accent-green-darker mb-2">¡Bienvenido a AquiEstoy!</h3>
        <p className="text-accent-green-dark mb-6">Tu registro fue exitoso. Te contactaremos pronto.</p>

        {shareUrl && (
          <div className="bg-white rounded-xl border border-accent-green-border p-4 text-left">
            <p className="text-sm font-bold text-slate-700 mb-2">🎁 Gana créditos invitando amigos</p>
            <p className="text-xs text-slate-500 mb-3">Comparte tu enlace. Ganarás <strong>S/10 de crédito</strong> por cada persona que se registre.</p>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `*AquiEstoy* - Tecnicos verificados en Arequipa\n\nMe acabo de registrar en la nueva app que conecta hogares con tecnicos de confianza. Es GRATIS y hay beneficios exclusivos para los primeros en registrarse.\n\nRegistrate aqui (te dejo mi invitacion):\n${shareUrl}`
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4 text-left", className)}
    >
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
        <input
          {...register("full_name")}
          className={cn(
            "w-full p-3 rounded-lg border focus:ring-2 outline-none transition",
            errors.full_name ? "border-accent-red focus:ring-accent-red-border" : "border-slate-200 focus:ring-primary/20"
          )}
          placeholder="Ej: Juan Pérez"
        />
        {errors.full_name && <p className="text-accent-red text-xs mt-1">{errors.full_name.message}</p>}
      </div>

      <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
          <input
            {...register("email")}
            type="email"
            className={cn(
              "w-full p-3 rounded-lg border focus:ring-2 outline-none transition",
              errors.email ? "border-accent-red focus:ring-accent-red-border" : "border-slate-200 focus:ring-primary/20"
            )}
            placeholder="juan@ejemplo.com"
          />
          {errors.email && <p className="text-accent-red text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp / Celular</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm font-medium select-none">
              🇵🇪 +51
            </span>
            <input
              {...register("phone_number")}
              type="tel"
              maxLength={9}
              className={cn(
                "w-full p-3 rounded-r-lg border focus:ring-2 outline-none transition",
                errors.phone_number ? "border-accent-red focus:ring-accent-red-border" : "border-slate-200 focus:ring-primary/20"
              )}
              placeholder="987 654 321"
            />
          </div>
          {errors.phone_number && <p className="text-accent-red text-xs mt-1">{errors.phone_number.message}</p>}
        </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Tu Distrito (Vota por tu zona)</label>
        <select
          {...register("district")}
          className={cn(
            "w-full p-3 rounded-lg border focus:ring-2 outline-none transition bg-white",
            errors.district ? "border-accent-red focus:ring-accent-red-border" : "border-slate-200 focus:ring-primary/20"
          )}
        >
          <option value="">Selecciona un distrito</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {errors.district && <p className="text-accent-red text-xs mt-1">{errors.district.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {type === "TECHNICIAN" ? "Especialidad (Opcional)" : "¿Qué servicios te interesarían?"}
        </label>
        <input
          {...register("category")}
          className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition"
          placeholder={type === "TECHNICIAN" ? "Ej: Gasfitería, Electricidad..." : "Ej: Limpieza, Pintura, Mudanza..."}
        />
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

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-2 cursor-pointer group">
          <input
            {...register("accept_terms")}
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
          />
          <span className="text-xs text-slate-500 leading-normal group-hover:text-slate-700 transition-colors">
            Acepto que me contacten para fines relacionados con AquiEstoy y acepto los <a href="#" className="underline font-medium decoration-primary/30">Términos y Condiciones</a>.
          </span>
        </label>
        {errors.accept_terms && <p className="text-accent-red text-xs">{errors.accept_terms.message}</p>}
      </div>

      {error && <p className="p-3 bg-accent-red-light text-accent-red-dark rounded-lg text-sm border border-accent-red-border">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full py-4 rounded-lg font-bold text-white transition shadow-md",
          type === "TECHNICIAN" ? "bg-primary hover:bg-primary-dark" : "bg-secondary hover:bg-secondary-dark",
          isSubmitting && "opacity-50 cursor-not-allowed"
        )}
      >
        {isSubmitting ? "Enviando..." : type === "TECHNICIAN" ? "Registrarme como Técnico" : "Unirme a la lista de espera"}
      </button>

    </form>
  );
}
