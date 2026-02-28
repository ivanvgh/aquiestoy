"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const technicianFormSchema = z.object({
  specialty: z.string().min(1, "Selecciona una especialidad"),
  district: z.string().min(1, "Selecciona un distrito"),
  phone: z
    .string()
    .min(9, "El número debe tener al menos 9 dígitos")
    .regex(/^\d{9}$/, "Ingresa un número válido de 9 dígitos"),
});

type TechnicianFormValues = z.infer<typeof technicianFormSchema>;

export default function DesignTechnicianForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TechnicianFormValues>({
    resolver: zodResolver(technicianFormSchema),
    defaultValues: {
      specialty: "Gasfitería",
      district: "Cercado",
      phone: "",
    },
  });

  const onSubmit = async (data: TechnicianFormValues) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/leads/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_type: "TECHNICIAN",
          full_name: "Postulante Pendiente",
          email: "pendiente@aquiestoy.pe",
          phone_number: data.phone,
          notes: `Especialidad: ${data.specialty}, Distrito: ${data.district}`,
        }),
      });
      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-accent-green-light p-8 rounded-2xl border border-accent-green-border text-center">
        <span className="material-symbols-outlined text-accent-green text-5xl mb-4">check_circle</span>
        <h3 className="text-xl font-bold text-slate-900 mb-2">¡Solicitud Recibida!</h3>
        <p className="text-slate-600">Nos pondremos en contacto contigo pronto.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-light p-6 rounded-2xl border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4 font-display">Postula ahora</h3>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Especialidad</label>
          <select
            className="w-full rounded-lg border-slate-300 focus:border-secondary focus:ring focus:ring-secondary/20 bg-white"
            {...register("specialty")}
          >
            <option>Gasfitería</option>
            <option>Electricidad</option>
            <option>Limpieza</option>
            <option>Pintura</option>
            <option>Carpintería</option>
            <option>Cerrajería</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Distrito de Residencia</label>
          <select
            className="w-full rounded-lg border-slate-300 focus:border-secondary focus:ring focus:ring-secondary/20 bg-white"
            {...register("district")}
          >
            <option>Cercado</option>
            <option>Cayma</option>
            <option>Yanahuara</option>
            <option>Cerro Colorado</option>
            <option>Paucarpata</option>
            <option>JLByR</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Celular / WhatsApp</label>
          <input
            type="tel"
            className={cn(
              "w-full rounded-lg border-slate-300 focus:border-secondary focus:ring focus:ring-secondary/20 bg-white",
              errors.phone && "border-accent-red focus:ring-accent-red-border"
            )}
            placeholder="912345678"
            {...register("phone")}
          />
          {errors.phone && <p className="text-accent-red text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <button
          className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-lg transition-colors mt-2 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Procesando..." : "Iniciar Registro"}
        </button>
      </form>
    </div>
  );
}
