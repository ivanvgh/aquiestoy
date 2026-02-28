"use client";

import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white p-1.5 rounded-lg">
            <span className="material-symbols-outlined text-[24px]">home_repair_service</span>
          </div>
          <h2 className="text-primary text-xl font-black tracking-tight font-display">AquiEstoy</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-slate-600 hover:text-primary font-medium text-sm transition-colors" href="#services">Servicios</a>
          <a className="text-slate-600 hover:text-primary font-medium text-sm transition-colors" href="#how-it-works">Cómo funciona</a>
          <a className="text-slate-600 hover:text-primary font-medium text-sm transition-colors" href="#safety">Seguridad</a>
        </nav>
        <div className="flex items-center gap-4">
          <a className="hidden sm:block text-slate-600 font-medium text-sm hover:text-primary transition-colors" href="/experts">Soy Técnico</a>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-primary hover:text-white text-slate-600 transition-all"
              aria-label="Cuenta de usuario"
            >
              <span className="material-symbols-outlined text-[24px]">account_circle</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <a
                  href="/login"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">login</span>
                  Iniciar sesión
                </a>
                <a
                  href="/register"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                  Registrarse
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
