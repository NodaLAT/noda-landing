// =====================================================================
// ARMA TU PLAN — cálculo del plan que arma el cliente (sin interfaz)
// ---------------------------------------------------------------------
// El cliente agrega uno o varios servicios y ve implementación (pago único)
// y mensualidad. Todos los precios salen de lib/precios.ts; la lógica de
// Atención 24/7 reutiliza lib/cotizador.ts. Sin datos personales.
//
// Decisiones (ver reporte):
// - Las mensualidades EXACTAS se suman (Atención, Agendamiento, Cotizaciones).
// - El hosting de la web es "desde $15/mes": se muestra como línea aparte,
//   no se suma al total mensual (igual que en el ejemplo del pedido).
// - El 50 % por combinar la web se aplica solo si el plan tiene Atención,
//   Agendamiento o Cotizaciones; se quita si se quita ese servicio.
// =====================================================================
import {
  MESES_OFERTA, PRECIOS, dolares, ofertaVigente, precioDe, vigenteDe,
} from "./precios";
import { SERVICIOS } from "./servicios";
import { SLUG_ATENCION, TRAMOS, MODULOS, calcular, type Eleccion } from "./cotizador";

export const SLUG_WEBS = "webs-con-ia";
export const CLAVE_PLAN = "noda-plan";                 // localStorage
export const ID_SISTEMA = "sistema";                   // módulo "conectar con tu sistema" (se cotiza aparte)
export const RUTA_PLAN = "/plan";

// Un servicio dentro del plan. Para Atención guarda los módulos y el tramo elegidos;
// los demás servicios no tienen opciones.
export type ItemPlan = {
  slug: string;
  modulos?: string[];   // solo Atención (ids de lib/precios.ts; puede incluir "sistema")
  tramo?: string;       // solo Atención (id del tramo de conversaciones)
};

// Una línea del resumen (lo que se muestra por servicio).
export type Linea = {
  slug: string;
  nombre: string;                 // nombre corto
  aCotizar: boolean;              // servicio sin precio (se cotiza a medida)
  impl: number | null;            // implementación vigente total (base + módulos)
  implBase: number | null;        // base para mostrar en el encabezado (sin módulos; los módulos se listan aparte)
  implNormal: number | null;      // implementación normal (para el tachado)
  combo: number | null;           // porcentaje de descuento por combinar (p. ej. 50)
  modulos: { nombre: string; precio: number | null }[];   // solo Atención
  tramoNombre: string | null;     // solo Atención
  mensual: number | null;         // mensualidad exacta vigente
  mensualNormal: number | null;   // mensualidad normal
  mensualACotizar: boolean;       // la mensualidad depende del volumen (Atención, tramo "más")
  hosting: number | null;         // hosting "desde" (solo la web)
};

export type ResultadoPlan = {
  lineas: Linea[];
  implNormal: number;
  impl: number;
  ahorro: number;
  mensualNormal: number;          // suma de las mensualidades normales
  mensual: number;                // suma de las mensualidades vigentes
  mesesOferta: boolean;           // la mensualidad vigente es menor que la normal (primeros meses)
  mensualACotizar: boolean;       // algún servicio tiene mensualidad por volumen a cotizar
  hosting: number | null;         // hosting de la web (no se suma al total)
  conOferta: boolean;
};

const corto = (slug: string) => SERVICIOS.find((s) => s.slug === slug)?.corto ?? slug;

// ¿Está activo el 50 % por combinar la web? (si el plan tiene alguno de los servicios que lo activan)
export function comboWebActivo(slugs: string[]): boolean {
  const combo = PRECIOS[SLUG_WEBS]?.combo;
  return !!combo && combo.con.some((s) => slugs.includes(s));
}

// Eleccion del cotizador a partir de un item de Atención del plan.
export function eleccionAtencion(item: ItemPlan): Eleccion {
  const mods = item.modulos ?? [];
  return {
    negocio: null,
    modulos: mods.filter((id) => id !== ID_SISTEMA),
    tramo: item.tramo ?? TRAMOS[0].id,
    sistema: mods.includes(ID_SISTEMA) ? "si" : "no",
  };
}

function lineaDe(item: ItemPlan, slugs: string[], conOferta: boolean): Linea {
  const base: Linea = {
    slug: item.slug, nombre: corto(item.slug), aCotizar: false,
    impl: null, implBase: null, implNormal: null, combo: null, modulos: [], tramoNombre: null,
    mensual: null, mensualNormal: null, mensualACotizar: false, hosting: null,
  };
  const p = precioDe(item.slug);
  if (!p) return { ...base, aCotizar: true };            // 04, 05, 06, 08: a cotizar

  // Atención 24/7: reutiliza el cálculo del cotizador.
  if (item.slug === SLUG_ATENCION) {
    const r = calcular(eleccionAtencion(item), conOferta);
    const mods = item.modulos ?? [];
    const elegidos = MODULOS.filter((m) => mods.includes(m.id)).map((m) => ({ nombre: m.nombre, precio: m.precio }));
    if (mods.includes(ID_SISTEMA)) elegidos.push({ nombre: "Conectar con tu sistema", precio: null });
    return {
      ...base, impl: r.impl, implBase: vigenteDe(p.implementacion, conOferta), implNormal: r.implNormal,
      modulos: elegidos, tramoNombre: r.tramo.nombre,
      mensual: r.mensual, mensualNormal: r.mensualNormal,
      mensualACotizar: r.mensual === null,
    };
  }

  // Web: implementación con el 50 % por combinar (si está activo) + hosting "desde" aparte.
  if (item.slug === SLUG_WEBS) {
    const activo = comboWebActivo(slugs);
    const factor = activo && p.combo ? 1 - p.combo.porcentaje / 100 : 1;
    const impl = vigenteDe(p.implementacion, conOferta) * factor;
    return {
      ...base,
      impl, implBase: impl,
      implNormal: p.implementacion.normal * factor,
      combo: activo && p.combo ? p.combo.porcentaje : null,
      hosting: p.mensual ? p.mensual.normal : null,
    };
  }

  // Agendamiento y Cotizaciones: implementación + mensualidad fijas.
  const impl = vigenteDe(p.implementacion, conOferta);
  return {
    ...base,
    impl, implBase: impl,
    implNormal: p.implementacion.normal,
    mensual: p.mensual ? vigenteDe(p.mensual, conOferta) : null,
    mensualNormal: p.mensual ? p.mensual.normal : null,
  };
}

export function calcularPlan(items: ItemPlan[], conOferta: boolean = ofertaVigente()): ResultadoPlan {
  const slugs = items.map((i) => i.slug);
  const lineas = items.map((i) => lineaDe(i, slugs, conOferta));
  const impl = lineas.reduce((t, l) => t + (l.impl ?? 0), 0);
  const implNormal = lineas.reduce((t, l) => t + (l.implNormal ?? 0), 0);
  const mensual = lineas.reduce((t, l) => t + (l.mensual ?? 0), 0);
  const mensualNormal = lineas.reduce((t, l) => t + (l.mensualNormal ?? 0), 0);
  const hostingL = lineas.find((l) => l.hosting !== null);
  return {
    lineas, impl, implNormal,
    ahorro: implNormal - impl,
    mensual, mensualNormal,
    mesesOferta: mensual > 0 && mensual < mensualNormal,
    mensualACotizar: lineas.some((l) => l.mensualACotizar),
    hosting: hostingL ? hostingL.hosting : null,
    conOferta,
  };
}

// Código de pedido: "NODA-" + 4 dígitos aleatorios (se genera al enviar).
export const nuevoCodigo = () => "NODA-" + String(Math.floor(1000 + Math.random() * 9000));

// Mensaje de WhatsApp con el plan y los precios (sin datos personales). Respeta los saltos de línea.
export function mensajePlan(items: ItemPlan[], conOferta: boolean, codigo: string): string {
  const r = calcularPlan(items, conOferta);
  const lineas: string[] = [`Hola NODA, armé mi plan en noda.lat (${codigo}):`];

  r.lineas.forEach((l) => {
    if (l.aCotizar) { lineas.push(`- ${l.nombre}: a cotizar`); return; }
    const combo = l.combo ? ` (${l.combo} % por combinar)` : "";
    lineas.push(`- ${l.nombre}: ${dolares(l.implBase!)}${combo}`);
    l.modulos.forEach((m) => lineas.push(`  + ${m.nombre}: ${m.precio === null ? "a cotizar" : dolares(m.precio)}`));
    if (l.tramoNombre) lineas.push(`  Mensualidad: ${l.tramoNombre}`);
    else if (l.mensual !== null) lineas.push(`  Mensualidad: ${dolares(l.mensual)}/mes`);
    if (l.hosting !== null) lineas.push(`  Hosting: desde ${dolares(l.hosting)}/mes`);
  });

  lineas.push(`Implementación: ${dolares(r.impl)} + IVA (pago único)`);
  if (r.mensual > 0) {
    lineas.push(r.mesesOferta
      ? `Mensualidad: ${dolares(r.mensual)}/mes los ${MESES_OFERTA} primeros meses + IVA`
      : `Mensualidad: ${dolares(r.mensual)}/mes + IVA`);
  } else if (r.mensualACotizar) {
    lineas.push("Mensualidad: a cotizar");
  }
  return lineas.join("\n");
}
