"use client";

import { SLUG_ATENCION, TRAMOS } from "@/lib/cotizador";
import type { ItemPlan } from "@/lib/plan";
import { usePlan } from "./PlanProvider";

// Botón "Agregar a mi plan" que se usa en las páginas de servicio (variante "pagina")
// y como acción pequeña en las tarjetas de /servicios (variante "tarjeta").
// Atención se agrega con sus opciones por defecto (sin módulos, hasta 1.000 conversaciones).

function itemPara(slug: string): ItemPlan {
  return slug === SLUG_ATENCION ? { slug, modulos: [], tramo: TRAMOS[0].id } : { slug };
}

export default function BotonPlan({ slug, variante = "pagina" }: { slug: string; variante?: "pagina" | "tarjeta" }) {
  const { tiene, agregar, quitar } = usePlan();
  const puesto = tiene(slug);

  if (variante === "tarjeta") {
    return (
      <button type="button" className={`p3-tarjeta-plan${puesto ? " is-puesto" : ""}`}
        onClick={() => (puesto ? quitar(slug) : agregar(itemPara(slug)))}>
        {puesto ? "En tu plan ✓" : "Agregar a mi plan"}
      </button>
    );
  }

  if (puesto) {
    return (
      <span className="p3-bt-plan-estado">
        <span className="p3-bt-plan-ok">En tu plan ✓</span>
        <button type="button" className="p3-bt-plan-quitar" onClick={() => quitar(slug)}>Quitar</button>
      </span>
    );
  }
  return (
    <button type="button" className="p3-btn p3-btn-outline p3-bt-plan" onClick={() => agregar(itemPara(slug))}>
      Agregar a mi plan
    </button>
  );
}
