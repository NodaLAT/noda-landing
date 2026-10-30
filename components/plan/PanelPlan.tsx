"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { dolares, ofertaVigente } from "@/lib/precios";
import { whatsappLink } from "@/lib/site";
import { calcularPlan, mensajePlan, nuevoCodigo, RUTA_PLAN } from "@/lib/plan";
import Totales from "./Totales";
import { usePlan } from "./PlanProvider";

// Panel lateral del plan ("el carrito"): entra desde la derecha (a pantalla completa en celular) con
// el fondo oscurecido. Lista los servicios con su precio y un botón para quitarlos, los mismos totales
// que /plan y el envío por WhatsApp (mismo mensaje y código). Se cierra con la X, el fondo y Escape;
// mientras está abierto el fondo no se desplaza y el foco queda atrapado dentro.
export default function PanelPlan() {
  const { items, quitar, panelAbierto, cerrarPanel } = usePlan();
  const [montado, setMontado] = useState(false);
  const [conOferta, setConOferta] = useState(false);
  const cajaRef = useRef<HTMLDivElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMontado(true); }, []);
  useEffect(() => { if (panelAbierto) setConOferta(ofertaVigente()); }, [panelAbierto]);

  // Si el plan queda vacío con el panel abierto, lo cerramos.
  useEffect(() => { if (panelAbierto && items.length === 0) cerrarPanel(); }, [items.length, panelAbierto, cerrarPanel]);

  // Abierto: bloquea el scroll del fondo, pone el foco en la X, cierra con Escape y atrapa el foco (Tab).
  useEffect(() => {
    if (!panelAbierto) return;
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { cerrarPanel(); return; }
      if (e.key !== "Tab") return;
      const foco = cajaRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!foco || foco.length === 0) return;
      const primero = foco[0];
      const ultimo = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [panelAbierto, cerrarPanel]);

  if (!montado || !panelAbierto) return null;

  const r = calcularPlan(items, conOferta);
  const enviar = () => {
    if (items.length === 0) return;
    window.open(whatsappLink(mensajePlan(items, conOferta, nuevoCodigo())), "_blank", "noopener");
  };

  return createPortal(
    <div className="p3-panel-plan">
      <button type="button" className="p3-panel-fondo" aria-label="Cerrar el plan" onClick={cerrarPanel} />
      <div className="p3-panel-caja" role="dialog" aria-modal="true" aria-labelledby="p3-panel-plan-t" ref={cajaRef}>
        <div className="p3-panel-cab">
          <h2 id="p3-panel-plan-t" className="p3-caja-t">Tu plan</h2>
          <button type="button" ref={cerrarRef} className="p3-panel-x" aria-label="Cerrar el plan" onClick={cerrarPanel}>✕</button>
        </div>
        <div className="p3-panel-cuerpo">
          {conOferta && <span className="p3-precio-etq">Precio de lanzamiento</span>}
          <ul className="p3-panel-items">
            {r.lineas.map((l) => (
              <li key={l.slug} className="p3-panel-item">
                <span className="p3-panel-item-n">{l.nombre}</span>
                <span className="p3-panel-item-p">{l.aCotizar ? "A cotizar" : dolares(l.implBase!)}</span>
                <button type="button" className="p3-panel-quitar" onClick={() => quitar(l.slug)}>
                  <span className="p3-sr">Quitar {l.nombre} del plan</span><span aria-hidden="true">Quitar</span>
                </button>
              </li>
            ))}
          </ul>
          <Totales r={r} conOferta={conOferta} />
          <button type="button" className="p3-btn p3-btn-acento p3-shine p3-cot-boton" onClick={enviar}>Enviar mi plan por WhatsApp</button>
          <Link href={RUTA_PLAN} className="p3-panel-editar" onClick={cerrarPanel}>Editar mi plan</Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
