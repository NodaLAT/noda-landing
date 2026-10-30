"use client";

import {
  MESES_OFERTA, NOTA_PAGO_UNICO, NOTA_REFERENCIAL, TEXTO_DESDE_MES, VIGENCIA, dolares,
} from "@/lib/precios";
import type { ResultadoPlan } from "@/lib/plan";
import { Tachado } from "@/components/precios/Precio";

// Resumen de precios del plan. Lo comparten /plan (components/plan/Plan.tsx) y el panel lateral
// (components/plan/PanelPlan.tsx) para que muestren exactamente los mismos totales y notas.
//  - DetalleLineas: desglose por servicio (módulos, mensualidad, hosting). Solo /plan.
//  - Totales (por defecto): implementación con tachado y ahorro, mensualidad y notas (hosting aparte). Ambos.

// Desglose por servicio (lo que suma cada uno). Solo en /plan.
export function DetalleLineas({ r }: { r: ResultadoPlan }) {
  return (
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
  );
}

// Mensualidad del total, con el precio normal tachado y la nota de los primeros meses.
function TotalMensual({ r }: { r: ResultadoPlan }) {
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

export default function Totales({ r, conOferta }: { r: ResultadoPlan; conOferta: boolean }) {
  return (
    <>
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

      <ul className="p3-precio-notas">
        <li>Todo + IVA.</li>
        <li>{NOTA_PAGO_UNICO}</li>
        <li>{NOTA_REFERENCIAL}</li>
        {r.hosting !== null && <li>El hosting de la web ({dolares(r.hosting)}/mes) se confirma en el diagnóstico.</li>}
        {conOferta && <li>{VIGENCIA}</li>}
      </ul>
    </>
  );
}
