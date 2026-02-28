"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";

const leadSchema = z.object({
  full_name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Email inválido"),
  phone_number: z.string().min(8, "Número de teléfono inválido"),
  category: z.string().optional(),
  lead_type: z.enum(["TECHNICIAN", "CLIENT"]),
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
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/leads/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
        <p className="text-accent-green-dark">Te contactaremos pronto para los siguientes pasos.</p>
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
          placeholder="+51 987 654 321"
        />
        {errors.phone_number && <p className="text-accent-red text-xs mt-1">{errors.phone_number.message}</p>}
      </div>

      {type === "TECHNICIAN" && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Especialidad (Opcional)</label>
          <input
            {...register("category")}
            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition"
            placeholder="Ej: Gasfitería, Electricidad..."
          />
        </div>
      )}

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

      <p className="text-[10px] text-slate-400 text-center">
        Al registrarte, aceptas que te contactemos para fines relacionados con AquiEstoy.
      </p>
    </form>
  );
}
