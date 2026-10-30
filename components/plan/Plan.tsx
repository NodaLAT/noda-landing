"use client";

import { useEffect, useState } from "react";
import { SERVICIOS } from "@/lib/servicios";
import { dolares, ofertaVigente, precioDe } from "@/lib/precios";
import { SLUG_ATENCION, TRAMOS } from "@/lib/cotizador";
import { whatsappLink } from "@/lib/site";
import { calcularPlan, mensajePlan, nuevoCodigo, type ItemPlan } from "@/lib/plan";
import { IconoServicio } from "@/components/portada/Iconos";
import { LineaPrecio } from "@/components/precios/Precio";
import Totales, { DetalleLineas } from "./Totales";
import { usePlan } from "./PlanProvider";

// "Arma tu plan": a la izquierda la lista de los 8 servicios para agregar o quitar (Atención abre sus
// opciones dentro de la misma página); a la derecha el resumen fijo. En celular, el resumen es una barra
// compacta abajo que se despliega (mismas clases que el cotizador: .p3-cot-resumen / .p3-cot-barra).
// Los totales y notas se comparten con el panel lateral (components/plan/Totales.tsx).

const OPCIONES_ATENCION = precioDe(SLUG_ATENCION)!;

export default function Plan({ vigente }: { vigente: boolean }) {
  const { items, tiene, agregar, actualizar, quitar, vaciar } = usePlan();
  const [conOferta, setConOferta] = useState(vigente);
  const [detalle, setDetalle] = useState(false);     // celular: resumen desplegado
  useEffect(() => { setConOferta(vigente && ofertaVigente()); }, [vigente]);

  const r = calcularPlan(items, conOferta);
  const vacio = items.length === 0;
  const atencion = items.find((i) => i.slug === SLUG_ATENCION);

  const enviar = () => {
    if (vacio) return;
    const url = whatsappLink(mensajePlan(items, conOferta, nuevoCodigo()));
    window.open(url, "_blank", "noopener");
  };

  const alternarModulo = (id: string) => {
    const actuales = atencion?.modulos ?? [];
    actualizar(SLUG_ATENCION, { modulos: actuales.includes(id) ? actuales.filter((m) => m !== id) : [...actuales, id] });
  };

  return (
    <div className="p3-cot p3-plan">
      <div className="p3-plan-lista">
        {SERVICIOS.map((s) => {
          const puesto = tiene(s.slug);
          const esAtencion = s.slug === SLUG_ATENCION;
          const precio = precioDe(s.slug);
          return (
            <article key={s.slug} className={`p3-plan-serv${puesto ? " is-puesto" : ""}`}>
              <div className="p3-plan-serv-cab">
                <span className="p3-plan-serv-ico p3-ico-linea"><IconoServicio icono={s.icono} size={24} /></span>
                <div className="p3-plan-serv-txt">
                  <h2 className="p3-plan-serv-t">{s.corto}</h2>
                  <p className="p3-plan-serv-linea">{s.linea}</p>
                  <p className="p3-plan-serv-precio">
                    {precio ? <LineaPrecio slug={s.slug} etiqueta={false} vigente={conOferta} /> : <span className="p3-precio-medida">A cotizar</span>}
                  </p>
                </div>
                {puesto ? (
                  <span className="p3-plan-serv-acc">
                    <span className="p3-plan-puesto" aria-hidden="true">En tu plan ✓</span>
                    <button type="button" className="p3-plan-quitar" onClick={() => quitar(s.slug)}>
                      <span className="p3-sr">Quitar {s.corto} del plan</span><span aria-hidden="true">Quitar</span>
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    className="p3-btn p3-btn-outline p3-btn-sm p3-plan-agregar"
                    onClick={() => agregar(esAtencion ? { slug: s.slug, modulos: [], tramo: TRAMOS[0].id } : { slug: s.slug })}
                  >
                    <span className="p3-sr">Agregar {s.corto} a mi plan</span><span aria-hidden="true">Agregar a mi plan</span>
                  </button>
                )}
              </div>

              {/* Opciones de Atención 24/7 dentro de la misma página */}
              {esAtencion && puesto && (
                <div className="p3-plan-opciones">
                  <fieldset className="p3-plan-grupo">
                    <legend>Qué quieres que haga</legend>
                    {(OPCIONES_ATENCION.modulos ?? []).map((m) => (
                      <label key={m.id} className="p3-cot-opcion">
                        <input type="checkbox" checked={(atencion?.modulos ?? []).includes(m.id)} onChange={() => alternarModulo(m.id)} />
                        <span className="p3-cot-check" aria-hidden="true" />
                        <span className="p3-cot-op-txt"><strong>{m.nombre}</strong></span>
                        <span className="p3-cot-op-precio">{m.precio === null ? "Se cotiza aparte" : `+${dolares(m.precio)}`}</span>
                      </label>
                    ))}
                  </fieldset>
                  <fieldset className="p3-plan-grupo">
                    <legend>Cuántas conversaciones al mes</legend>
                    {(OPCIONES_ATENCION.tramos ?? []).map((t) => (
                      <label key={t.id} className="p3-cot-opcion">
                        <input type="radio" name="plan-tramo" value={t.id} checked={(atencion?.tramo ?? TRAMOS[0].id) === t.id} onChange={() => actualizar(SLUG_ATENCION, { tramo: t.id })} />
                        <span className="p3-cot-check p3-cot-check--radio" aria-hidden="true" />
                        <span className="p3-cot-op-txt"><strong>{t.nombre}</strong></span>
                        <span className="p3-cot-op-precio">
                          {t.mensual ? `${dolares(conOferta && t.mensual.oferta !== undefined ? t.mensual.oferta : t.mensual.normal)}/mes` : "A cotizar"}
                        </span>
                      </label>
                    ))}
                  </fieldset>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <aside className={`p3-cot-resumen p3-plan-resumen${detalle ? " is-abierto" : ""}`} aria-labelledby="p3-plan-resumen-t">
        {/* celular: barra compacta; tocarla despliega el detalle */}
        <div className="p3-cot-barra">
          <button type="button" className="p3-cot-barra-btn" aria-expanded={detalle} aria-controls="p3-plan-detalle" onClick={() => setDetalle((d) => !d)}>
            <span className="p3-cot-barra-txt">
              {vacio ? <span>Tu plan está vacío</span> : <>
                <span>Implementación <b>{dolares(r.impl)}</b></span>{" "}
                {r.mensual > 0 && <span><span aria-hidden="true">· </span><b>{dolares(r.mensual)}/mes</b></span>}
              </>}
              <span className="p3-sr"> Ver el detalle del plan</span>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m6 15 6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="p3-btn p3-btn-acento p3-btn-sm p3-cot-barra-cta" onClick={enviar} disabled={vacio}>Enviar</button>
        </div>

        <div id="p3-plan-detalle" className="p3-cot-detalle">
          <h2 id="p3-plan-resumen-t" className="p3-caja-t">Tu plan</h2>
          {conOferta && !vacio && <span className="p3-precio-etq">Precio de lanzamiento</span>}

          {vacio ? (
            <p className="p3-plan-vacio">Todavía no agregaste servicios. Elige uno para empezar.</p>
          ) : (
            <>
              <DetalleLineas r={r} />
              <Totales r={r} conOferta={conOferta} />
              <button type="button" className="p3-btn p3-btn-acento p3-shine p3-cot-boton p3-plan-enviar" onClick={enviar}>Enviar mi plan por WhatsApp</button>
              <button type="button" className="p3-btn p3-btn-outline p3-btn-sm p3-plan-vaciar" onClick={vaciar}>Vaciar plan</button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
