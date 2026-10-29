// Cálculo del cotizador de Atención 24/7 (sin interfaz, para poder probarlo aparte).
// Precios en lib/precios.ts. Los módulos no tienen descuento; la base y la mensualidad sí.
import { PRECIOS, dolares, vigenteDe, type Modulo, type Tramo } from "./precios";

export const SLUG_ATENCION = "atencion-y-ventas-whatsapp";
export const NEGOCIOS = ["Tienda", "Ferretería", "Restaurante", "Clínica o consultorio", "Laboratorio", "Taller", "Inmobiliaria", "Otro"];
export const SISTEMA = [
  { id: "si", nombre: "Sí" },
  { id: "no", nombre: "No" },
  { id: "nose", nombre: "No sé" },
] as const;
export type Sistema = (typeof SISTEMA)[number]["id"];

const P = PRECIOS[SLUG_ATENCION];
export const BASE = P.implementacion;
export const BASE_INCLUYE = P.incluye ?? "";
// El módulo "Conectar con tu sistema" (se cotiza aparte) se pregunta en el paso 04.
export const MODULOS: Modulo[] = (P.modulos ?? []).filter((m) => m.precio !== null);
export const TRAMOS: Tramo[] = P.tramos ?? [];

export type Eleccion = { negocio: string | null; modulos: string[]; tramo: string; sistema: Sistema | null };

export function calcular(e: Eleccion, conOferta: boolean) {
  const extras = MODULOS.filter((m) => e.modulos.includes(m.id)).reduce((t, m) => t + (m.precio ?? 0), 0);
  const tramo = TRAMOS.find((t) => t.id === e.tramo) ?? TRAMOS[0];
  const implNormal = BASE.normal + extras;
  const impl = vigenteDe(BASE, conOferta) + extras;
  return {
    implNormal,
    impl,
    ahorro: implNormal - impl,
    mensualNormal: tramo.mensual?.normal ?? null,
    mensual: tramo.mensual ? vigenteDe(tramo.mensual, conOferta) : null,   // null = a cotizar
    tramo,
    integracion: e.sistema === "si",
  };
}

// Mensaje de WhatsApp con lo elegido y los precios (de oferta mientras esté vigente). Sin datos personales.
export function mensajeWhatsApp(e: Eleccion, conOferta: boolean) {
  const r = calcular(e, conOferta);
  const lanzamiento = conOferta ? " (precio de lanzamiento)" : "";
  const mods = MODULOS.filter((m) => e.modulos.includes(m.id)).map((m) => `${m.nombre} (+${dolares(m.precio!)})`);
  const sistema = SISTEMA.find((s) => s.id === e.sistema)?.nombre;
  return [
    "Hola Noda, quiero mi propuesta de Atención y ventas 24/7 por WhatsApp.",
    `• Negocio: ${e.negocio ?? "sin elegir"}`,
    `• Base: ${BASE_INCLUYE.replace(/^Incluye /, "").replace(/\.$/, "")}`,
    `• Módulos: ${mods.length ? mods.join(", ") : "ninguno"}`,
    `• Conversaciones: ${r.tramo.nombre}`,
    `• Sistema para conectar: ${sistema ?? "sin elegir"}${r.integracion ? " (integración: se cotiza aparte)" : ""}`,
    `• Implementación: ${dolares(r.impl)}${lanzamiento} + IVA`,
    `• Mensualidad: ${r.mensual === null ? "a cotizar" : `${dolares(r.mensual)}/mes${lanzamiento} + IVA`}`,
  ].join("\n");
}
