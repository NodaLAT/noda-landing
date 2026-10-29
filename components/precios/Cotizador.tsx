"use client";

import { useEffect, useRef, useState } from "react";
import { MESES_OFERTA, NOTA_PAGO_UNICO, NOTA_REFERENCIAL, TEXTO_DESDE_MES, TEXTO_MESES, VIGENCIA, dolares, ofertaVigente } from "@/lib/precios";
import { BASE, BASE_INCLUYE, MODULOS, NEGOCIOS, SISTEMA, TRAMOS, calcular, mensajeWhatsApp, type Eleccion, type Sistema } from "@/lib/cotizador";
import { whatsappLink } from "@/lib/site";

// Cotizador de Atención 24/7: 4 pasos con controles nativos (radios y casillas, accesibles con teclado)
// y un resumen fijo (al costado en computadora, abajo y pegajoso en celular). Sin formulario de datos:
// el botón abre WhatsApp con lo elegido.

// Número que pasa suavemente de un valor a otro (sin animación con "reducir movimiento").
function Numero({ valor }: { valor: number }) {
  const [mostrado, setMostrado] = useState(valor);
  const desde = useRef(valor);
  useEffect(() => {
    const inicio = desde.current;
    if (inicio === valor) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { desde.current = valor; setMostrado(valor); return; }
    const t0 = performance.now(), dur = 450;
    let raf = 0;
    const paso = (t: number) => {
      const u = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - u, 3);
      const v = Math.round(inicio + (valor - inicio) * e);
      desde.current = v; setMostrado(v);
      if (u < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [valor]);
  return <>{dolares(mostrado)}</>;
}

function Tachado({ valor }: { valor: number }) {
  return <s className="p3-tachado"><span className="p3-sr">Antes </span>{dolares(valor)}</s>;
}

export default function Cotizador({ vigente }: { vigente: boolean }) {
  // La oferta la decide el servidor al dibujar; en el navegador se vuelve a comprobar con la hora real.
  const [conOferta, setConOferta] = useState(vigente);
  useEffect(() => { setConOferta(vigente && ofertaVigente()); }, [vigente]);

  const [e, setE] = useState<Eleccion>({ negocio: null, modulos: [], tramo: TRAMOS[0].id, sistema: null });
  const r = calcular(e, conOferta);
  const enlace = whatsappLink(mensajeWhatsApp(e, conOferta));
  const alternar = (id: string) =>
    setE((x) => ({ ...x, modulos: x.modulos.includes(id) ? x.modulos.filter((m) => m !== id) : [...x.modulos, id] }));

  const notas = (
    <ul className="p3-precio-notas">
      <li>Precios + IVA.</li>
      <li>{NOTA_REFERENCIAL}</li>
      <li>{NOTA_PAGO_UNICO}</li>
      {conOferta && <li>{VIGENCIA}</li>}
    </ul>
  );

  return (
    <div className="p3-cot">
      <form className="p3-cot-pasos" onSubmit={(ev) => ev.preventDefault()} aria-label="Arma tu cotización">
        <fieldset className="p3-cot-paso">
          <legend><span className="p3-cot-num">01</span> Tu negocio</legend>
          <div className="p3-cot-chips">
            {NEGOCIOS.map((n) => (
              <label key={n} className="p3-cot-chip">
                <input type="radio" name="negocio" value={n} checked={e.negocio === n} onChange={() => setE((x) => ({ ...x, negocio: n }))} />
                <span>{n}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="p3-cot-paso">
          <legend><span className="p3-cot-num">02</span> Qué quieres que haga</legend>
          <div className="p3-cot-opcion is-incluida">
            <span className="p3-cot-check" aria-hidden="true">✓</span>
            <span className="p3-cot-op-txt">
              <strong>Implementación base (incluida)</strong>
              <span>{BASE_INCLUYE}</span>
            </span>
            <span className="p3-cot-op-precio">
              {conOferta && BASE.oferta !== undefined ? <><Tachado valor={BASE.normal} /> {dolares(BASE.oferta)}</> : dolares(BASE.normal)}
            </span>
          </div>
          {MODULOS.map((m) => (
            <label key={m.id} className="p3-cot-opcion">
              <input type="checkbox" checked={e.modulos.includes(m.id)} onChange={() => alternar(m.id)} />
              <span className="p3-cot-check" aria-hidden="true" />
              <span className="p3-cot-op-txt"><strong>{m.nombre}</strong></span>
              <span className="p3-cot-op-precio">+{dolares(m.precio!)}</span>
            </label>
          ))}
          <p className="p3-cot-nota">Conectar con tu sistema se cotiza aparte: lo preguntamos en el paso 04.</p>
        </fieldset>

        <fieldset className="p3-cot-paso">
          <legend><span className="p3-cot-num">03</span> Cuántas conversaciones al mes</legend>
          {TRAMOS.map((t) => (
            <label key={t.id} className="p3-cot-opcion">
              <input type="radio" name="tramo" value={t.id} checked={e.tramo === t.id} onChange={() => setE((x) => ({ ...x, tramo: t.id }))} />
              <span className="p3-cot-check p3-cot-check--radio" aria-hidden="true" />
              <span className="p3-cot-op-txt"><strong>{t.nombre}</strong></span>
              <span className="p3-cot-op-precio">
                {t.mensual
                  ? (conOferta && t.mensual.oferta !== undefined
                    ? <><Tachado valor={t.mensual.normal} /> {dolares(t.mensual.oferta)}/mes<span className="p3-meses p3-meses--bloque">{TEXTO_MESES}</span></>
                    : `${dolares(t.mensual.normal)}/mes`)
                  : "A cotizar"}
              </span>
            </label>
          ))}
        </fieldset>

        <fieldset className="p3-cot-paso">
          <legend><span className="p3-cot-num">04</span> ¿Tienes un sistema que quieras conectar?</legend>
          <div className="p3-cot-chips">
            {SISTEMA.map((s) => (
              <label key={s.id} className="p3-cot-chip">
                <input type="radio" name="sistema" value={s.id} checked={e.sistema === s.id} onChange={() => setE((x) => ({ ...x, sistema: s.id as Sistema }))} />
                <span>{s.nombre}</span>
              </label>
            ))}
          </div>
          {r.integracion && <p className="p3-cot-nota p3-cot-nota--destacada">Integración: se cotiza aparte.</p>}
        </fieldset>

        <div className="p3-cot-notas-movil">{notas}</div>
      </form>

      <aside className="p3-cot-resumen" aria-labelledby="p3-cot-resumen-t">
        <h2 id="p3-cot-resumen-t" className="p3-caja-t">Tu cotización</h2>
        {conOferta && <span className="p3-precio-etq">Precio de lanzamiento</span>}
        <dl className="p3-cot-totales">
          <div>
            <dt>Implementación</dt>
            <dd>
              {conOferta && r.ahorro > 0 && <><Tachado valor={r.implNormal} />{" "}</>}
              <span className="p3-monto p3-cot-grande" aria-hidden="true"><Numero valor={r.impl} /></span>
              <span className="p3-sr">{dolares(r.impl)}</span>
            </dd>
          </div>
          <div>
            <dt>Mensualidad</dt>
            <dd>
              {r.mensual === null ? <span className="p3-monto">A cotizar</span> : r.mesesOferta ? (
                <>
                  <span className="p3-cot-mes-etq">Primeros {MESES_OFERTA} meses:</span>{" "}
                  <span className="p3-monto p3-cot-grande" aria-hidden="true"><Numero valor={r.mensual} />/mes</span>
                  <span className="p3-sr">{dolares(r.mensual)} al mes.</span>
                  <span className="p3-cot-mes-desde"><span aria-hidden="true">· </span>{TEXTO_DESDE_MES}: {dolares(r.mensualNormal!)}/mes</span>
                </>
              ) : (
                <>
                  <span className="p3-monto p3-cot-grande" aria-hidden="true"><Numero valor={r.mensual} />/mes</span>
                  <span className="p3-sr">{dolares(r.mensual)} al mes</span>
                </>
              )}
            </dd>
          </div>
        </dl>
        {conOferta && r.ahorro > 0 && <p className="p3-cot-ahorro">Ahorras {dolares(r.ahorro)} en la implementación</p>}
        {r.integracion && <p className="p3-cot-integra">Integración: se cotiza aparte</p>}
        <p className="p3-sr" aria-live="polite">
          {`Implementación ${dolares(r.impl)}. Mensualidad ${r.mensual === null ? "a cotizar"
            : r.mesesOferta ? `${dolares(r.mensual)} al mes los primeros ${MESES_OFERTA} meses y ${dolares(r.mensualNormal!)} al mes desde el mes ${MESES_OFERTA + 1}`
            : `${dolares(r.mensual)} al mes`}.`}
        </p>
        <div className="p3-cot-notas-escritorio">{notas}</div>
        <a href={enlace} className="p3-btn p3-btn-acento p3-shine p3-cot-boton" target="_blank" rel="noopener">
          Pedir mi propuesta por WhatsApp
        </a>
      </aside>
    </div>
  );
}
