"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CLAVE_PLAN, RUTA_PLAN, type ItemPlan } from "@/lib/plan";

// Estado global del plan. Vive en localStorage (con try/catch; si falla, funciona solo en memoria),
// para que el plan no se pierda al cambiar de página. No guarda ningún dato personal.

type PlanCtx = {
  items: ItemPlan[];
  tiene: (slug: string) => boolean;
  agregar: (item: ItemPlan) => void;
  actualizar: (slug: string, cambios: Partial<ItemPlan>) => void;
  quitar: (slug: string) => void;
  vaciar: () => void;
  listo: boolean;        // ya se leyó localStorage (evita parpadeos en el servidor)
};

const Ctx = createContext<PlanCtx | null>(null);

export function usePlan() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePlan debe usarse dentro de <PlanProvider>");
  return c;
}

function leer(): ItemPlan[] {
  try {
    const crudo = localStorage.getItem(CLAVE_PLAN);
    const datos = crudo ? JSON.parse(crudo) : [];
    return Array.isArray(datos) ? datos.filter((x) => x && typeof x.slug === "string") : [];
  } catch {
    return [];
  }
}

export default function PlanProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemPlan[]>([]);
  const [listo, setListo] = useState(false);
  const [aviso, setAviso] = useState(false);          // "Agregado a tu plan"
  const [montado, setMontado] = useState(false);
  const tiempo = useRef<number | undefined>(undefined);

  // Al montar: leer el plan guardado.
  useEffect(() => { setItems(leer()); setListo(true); setMontado(true); }, []);

  // Guardar en cada cambio (solo después de leer, para no pisar lo guardado con la lista vacía inicial).
  useEffect(() => {
    if (!listo) return;
    try { localStorage.setItem(CLAVE_PLAN, JSON.stringify(items)); } catch { /* sin almacenamiento: solo en memoria */ }
  }, [items, listo]);

  const tiene = useCallback((slug: string) => items.some((i) => i.slug === slug), [items]);

  const mostrarAviso = useCallback(() => {
    setAviso(true);
    window.clearTimeout(tiempo.current);
    tiempo.current = window.setTimeout(() => setAviso(false), 4000);
  }, []);

  const agregar = useCallback((item: ItemPlan) => {
    setItems((xs) => (xs.some((i) => i.slug === item.slug) ? xs.map((i) => (i.slug === item.slug ? { ...i, ...item } : i)) : [...xs, item]));
    mostrarAviso();
  }, [mostrarAviso]);

  const actualizar = useCallback((slug: string, cambios: Partial<ItemPlan>) => {
    setItems((xs) => xs.map((i) => (i.slug === slug ? { ...i, ...cambios } : i)));
  }, []);

  const quitar = useCallback((slug: string) => setItems((xs) => xs.filter((i) => i.slug !== slug)), []);
  const vaciar = useCallback(() => setItems([]), []);

  useEffect(() => () => window.clearTimeout(tiempo.current), []);

  return (
    <Ctx.Provider value={{ items, tiene, agregar, actualizar, quitar, vaciar, listo }}>
      {children}
      {montado && createPortal(
        <div className={`p3-aviso-plan${aviso ? " is-visible" : ""}`} role="status" aria-live="polite" hidden={!aviso}>
          <span className="p3-aviso-plan-ico" aria-hidden="true">✓</span>
          <span>Agregado a tu plan</span>
          <Link href={RUTA_PLAN} className="p3-aviso-plan-link" onClick={() => setAviso(false)}>Ver mi plan</Link>
        </div>,
        document.body
      )}
    </Ctx.Provider>
  );
}
