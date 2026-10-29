"use client";

import { Children, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { FILTROS_SERVICIOS } from "@/lib/servicios";

// Grilla bento de /servicios con filtros (pestañas accesibles: role tablist, flechas, Inicio/Fin).
// Las tarjetas llegan ya dibujadas desde el servidor (children, en el orden de "slugs"); aquí solo se
// decide cuáles se ven, su tamaño y su orden. En computadora la grilla tiene 4 columnas y en tableta 2:
// "grande" = 2×2 (tableta: todo el ancho), "ancho" = 2×1, "total" = toda la fila.
// El cambio de filtro usa View Transitions donde existe (si no, cambia directo) y nada con "reducir movimiento".
// También: brillo del borde que sigue al mouse (--mx/--my) y animación de las vistas solo en pantalla.
type Tam = "grande" | "ancho" | "normal";
const DISENO: Record<string, [string, Tam][]> = {
  todos: [
    ["atencion-y-ventas-whatsapp", "grande"], ["agendamiento-y-recordatorios", "normal"], ["cotizaciones-al-instante", "normal"],
    ["interpretacion-de-documentos", "ancho"], ["crm-y-seguimiento-de-leads", "normal"], ["reportes-y-dashboards", "ancho"],
    ["webs-con-ia", "normal"], ["apps-y-sistemas-a-medida", "ancho"],
  ],
  vender: [["atencion-y-ventas-whatsapp", "grande"], ["cotizaciones-al-instante", "ancho"], ["crm-y-seguimiento-de-leads", "normal"], ["webs-con-ia", "normal"]],
  ahorrar: [["agendamiento-y-recordatorios", "grande"], ["interpretacion-de-documentos", "ancho"], ["reportes-y-dashboards", "ancho"]],
  ordenar: [["apps-y-sistemas-a-medida", "grande"], ["crm-y-seguimiento-de-leads", "ancho"], ["reportes-y-dashboards", "ancho"]],
};

export default function Bento({ slugs, extra, children }: { slugs: string[]; extra: React.ReactNode; children: React.ReactNode }) {
  const [filtro, setFiltro] = useState("todos");
  const [anuncio, setAnuncio] = useState("");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const grilla = useRef<HTMLUListElement>(null);
  const tarjetas = Children.toArray(children);
  const diseno = new Map(DISENO[filtro].map(([slug, tam], orden) => [slug, { tam, orden }]));
  // orden real del DOM (no "order" de CSS): así el teclado y el lector siguen el orden visual
  const orden = slugs.map((_, i) => i).sort((a, b) => (diseno.get(slugs[a])?.orden ?? 100 + a) - (diseno.get(slugs[b])?.orden ?? 100 + b));

  const cambiar = (id: string) => {
    if (id === filtro) return;
    const n = DISENO[id].length;
    const aplicar = () => flushSync(() => { setFiltro(id); setAnuncio(`Mostrando ${n} servicios`); });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "startViewTransition" in document) document.startViewTransition(aplicar);
    else aplicar();
  };

  const teclas = (ev: React.KeyboardEvent, i: number) => {
    const n = FILTROS_SERVICIOS.length;
    const destino = ev.key === "ArrowRight" ? (i + 1) % n : ev.key === "ArrowLeft" ? (i - 1 + n) % n
      : ev.key === "Home" ? 0 : ev.key === "End" ? n - 1 : -1;
    if (destino < 0) return;
    ev.preventDefault();
    tabs.current[destino]?.focus();
    cambiar(FILTROS_SERVICIOS[destino].id);
  };

  useEffect(() => {
    const ul = grilla.current;
    if (!ul) return;
    // vistas animadas solo en pantalla
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("is-activa", e.isIntersecting)), { rootMargin: "60px" });
    ul.querySelectorAll(".p3-bv").forEach((v) => io.observe(v));
    // brillo del borde que sigue al mouse
    let raf = 0, ultimo: PointerEvent | null = null;
    const pintar = () => {
      raf = 0;
      const ev = ultimo, card = (ev?.target as Element | null)?.closest?.(".p3-bc") as HTMLElement | null;
      if (!ev || !card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
      card.style.setProperty("--my", `${ev.clientY - r.top}px`);
    };
    const mover = (ev: PointerEvent) => { ultimo = ev; if (!raf) raf = requestAnimationFrame(pintar); };
    ul.addEventListener("pointermove", mover, { passive: true });
    return () => { io.disconnect(); ul.removeEventListener("pointermove", mover); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="p3-bento-zona">
      <div className="p3-filtros" role="tablist" aria-label="Filtrar servicios">
        {FILTROS_SERVICIOS.map((f, i) => (
          <button
            key={f.id}
            ref={(b) => { tabs.current[i] = b; }}
            type="button"
            role="tab"
            id={`filtro-${f.id}`}
            aria-selected={filtro === f.id}
            aria-controls="p3-bento-panel"
            tabIndex={filtro === f.id ? 0 : -1}
            className="p3-filtro"
            onClick={() => cambiar(f.id)}
            onKeyDown={(ev) => teclas(ev, i)}
          >
            {f.nombre}
          </button>
        ))}
      </div>
      <div id="p3-bento-panel" role="tabpanel" aria-labelledby={`filtro-${filtro}`}>
        <ul className="p3-bento" ref={grilla}>
          {orden.map((i) => {
            const d = diseno.get(slugs[i]);
            return (
              <li key={slugs[i]} hidden={!d} className={`p3-bento-item is-${d?.tam ?? "normal"}`}
                style={{ viewTransitionName: d ? `bento-${i}` : undefined }}>
                {tarjetas[i]}
              </li>
            );
          })}
          <li className={`p3-bento-item p3-bento-extra ${filtro === "todos" ? "is-ancho" : "is-total"}`} style={{ viewTransitionName: "bento-extra" }}>
            {extra}
          </li>
        </ul>
      </div>
      <p className="p3-sr" aria-live="polite">{anuncio}</p>
    </div>
  );
}
