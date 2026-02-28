"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useReferral } from "@/hooks/useReferral";

const technicianFormSchema = z.object({
  specialties: z.array(z.string()).min(1, "Selecciona al menos una especialidad"),
  other_specialty: z.string().optional(),
  districts: z.array(z.string()).min(1, "Selecciona al menos un distrito"),
  phone: z
    .string()
    .min(9, "El número debe tener al menos 9 dígitos")
    .regex(/^\d{9}$/, "Ingresa un número válido de 9 dígitos"),
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
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/leads/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_type: "TECHNICIAN",
          full_name: "Postulante Pendiente",
          email: "pendiente@aquiestoy.pe",
          phone_number: data.phone,
          referral_code: referralCode, // Automatically include referral code
          notes: `Especialidades: ${data.specialties.join(", ")}${data.other_specialty ? ` (${data.other_specialty})` : ""}, Distritos: ${data.districts.join(", ")}`,
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
        <h3 className="text-xl font-bold text-slate-900 mb-2">¡Bienvenido al Equipo!</h3>
        <p className="text-slate-600 mb-6">Un asesor validará tus datos para activar tu **Panel de Gestión**.</p>
        
        <div className="space-y-3">
          <div className="bg-white/60 p-4 rounded-xl border border-accent-green-border/50 text-left text-xs text-slate-700">
            <p className="font-bold text-accent-green-darker mb-1">🎁 Beneficios Activados:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Control total de tus **ganancias diarias**.</li>
              <li>Acceso a capacitaciones y talleres exclusivos.</li>
              <li>Bonos y vales (Sodimac) por calidad de trabajo.</li>
            </ul>
          </div>
          
          <div className="bg-accent-blue-light/50 p-4 rounded-xl border border-accent-blue-border/50 text-sm text-slate-700">
            <p className="font-bold text-primary mb-1">🚀 ¡Gana Referidos!</p>
            <p className="text-xs">Invita a otros y acumula créditos **una vez que completen su registro**. ¡Cada registro cuenta!</p>
          </div>
        </div>
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
