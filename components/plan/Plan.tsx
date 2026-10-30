"use client";

import { useEffect, useState } from "react";
import { SERVICIOS } from "@/lib/servicios";
import {
  MESES_OFERTA, NOTA_PAGO_UNICO, NOTA_REFERENCIAL, TEXTO_DESDE_MES, VIGENCIA,
  dolares, ofertaVigente, precioDe,
} from "@/lib/precios";
import { SLUG_ATENCION, TRAMOS } from "@/lib/cotizador";
import { whatsappLink } from "@/lib/site";
import { calcularPlan, mensajePlan, nuevoCodigo, SLUG_WEBS, type ItemPlan } from "@/lib/plan";
import { IconoServicio } from "@/components/portada/Iconos";
import { LineaPrecio, Tachado } from "@/components/precios/Precio";
import { usePlan } from "./PlanProvider";

// "Arma tu plan": a la izquierda la lista de los 8 servicios para agregar o quitar (Atención abre sus
// opciones dentro de la misma página); a la derecha el resumen fijo. En celular, el resumen es una barra
// compacta abajo que se despliega (mismas clases que el cotizador: .p3-cot-resumen / .p3-cot-barra).

const OPCIONES_ATENCION = precioDe(SLUG_ATENCION)!;

// Mensualidad del total, con el precio normal tachado y la nota de los primeros meses.
function TotalMensual({ r }: { r: ReturnType<typeof calcularPlan> }) {
  if (r.mensual <= 0) return <span className="p3-monto">{r.mensualACotizar ? "A cotizar" : "—"}</span>;
  return (
    <>
      {r.mesesOferta && r.mensualNormal > r.mensual && <><Tachado valor={r.mensualNormal} />{" "}</>}
      <span className="p3-monto p3-cot-grande">{dolares(r.mensual)}/mes</span>
      {r.mesesOferta && (
        <span className="p3-cot-mes-desde"><span aria-hidden="true">· </span>Primeros {MESES_OFERTA} meses; {TEXTO_DESDE_MES.toLowerCase()}, {dolares(r.mensualNormal)}/mes</span>
      )}
    </>
  );
}

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

  const notas = (
    <ul className="p3-precio-notas">
      <li>Todo + IVA.</li>
      <li>{NOTA_PAGO_UNICO}</li>
      <li>{NOTA_REFERENCIAL}</li>
      {r.hosting !== null && <li>El hosting de la web ({dolares(r.hosting)}/mes) se confirma en el diagnóstico.</li>}
      {conOferta && <li>{VIGENCIA}</li>}
    </ul>
  );

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
              <ul className="p3-plan-detalle-lista">
                {r.lineas.map((l) => (
                  <li key={l.slug} className="p3-plan-detalle-item">
                    <div className="p3-plan-detalle-fila">
                      <span>{l.nombre}</span>
                      <b>{l.aCotizar ? "A cotizar" : dolares(l.implBase!)}</b>
                    </div>
                    {l.combo !== null && <span className="p3-plan-detalle-sub p3-con-oferta">{l.combo} % por combinar</span>}
                    {l.modulos.map((m) => (
                      <span key={m.nombre} className="p3-plan-detalle-sub">+ {m.nombre}: {m.precio === null ? "se cotiza aparte" : dolares(m.precio)}</span>
                    ))}
                    {l.tramoNombre && <span className="p3-plan-detalle-sub">Mensualidad: {l.tramoNombre}</span>}
                    {!l.tramoNombre && l.mensual !== null && <span className="p3-plan-detalle-sub">Mensualidad: {dolares(l.mensual)}/mes</span>}
                    {l.hosting !== null && <span className="p3-plan-detalle-sub">Hosting: desde {dolares(l.hosting)}/mes</span>}
                  </li>
                ))}
              </ul>

              <dl className="p3-cot-totales">
                <div>
                  <dt>Implementación</dt>
                  <dd>
                    {conOferta && r.ahorro > 0 && <><Tachado valor={r.implNormal} />{" "}</>}
                    <span className="p3-monto p3-cot-grande">{dolares(r.impl)}</span>
                  </dd>
                </div>
                <div>
                  <dt>Mensualidad</dt>
                  <dd><TotalMensual r={r} /></dd>
                </div>
              </dl>
              {conOferta && r.ahorro > 0 && <p className="p3-cot-ahorro">Ahorras {dolares(r.ahorro)} en la implementación</p>}

              {notas}
              <button type="button" className="p3-btn p3-btn-acento p3-shine p3-cot-boton p3-plan-enviar" onClick={enviar}>Enviar mi plan por WhatsApp</button>
              <button type="button" className="p3-btn p3-btn-outline p3-btn-sm p3-plan-vaciar" onClick={vaciar}>Vaciar plan</button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
