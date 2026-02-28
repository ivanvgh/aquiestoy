"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useReferral } from "@/hooks/useReferral";

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
  phone_number: z.string().min(8, "Número de teléfono inválido"),
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/leads/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          referral_code: referralCode,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos. Inténtalo de nuevo.");
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
    return (
      <div className={cn("text-center p-8 bg-accent-green-light rounded-xl border border-accent-green-border", className)}>
        <h3 className="text-xl font-bold text-accent-green-darker mb-2">¡Gracias por registrarte!</h3>
        <p className="text-accent-green-dark mb-4">Te contactaremos pronto para los siguientes pasos.</p>
        <div className="bg-white/50 p-4 rounded-xl border border-accent-green-border/50 text-sm text-accent-green-darker">
          <p className="font-semibold mb-1">🎁 ¡Empieza a ganar!</p>
          <p>Invita a amigos (técnicos o clientes) y acumula créditos **una vez que se registren**. ¡Asegúrense de usar tu enlace o mencionar tu nombre!</p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-sm underline text-accent-green hover:text-accent-green-darker"
        >
          Enviar otro registro
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4 text-left p-6 bg-white rounded-xl shadow-lg border border-slate-100", className)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <input
            {...register("phone_number")}
            className={cn(
              "w-full p-3 rounded-lg border focus:ring-2 outline-none transition",
              errors.phone_number ? "border-accent-red focus:ring-accent-red-border" : "border-slate-200 focus:ring-primary/20"
            )}
            placeholder="987 654 321"
          />
          {errors.phone_number && <p className="text-accent-red text-xs mt-1">{errors.phone_number.message}</p>}
        </div>
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
