// Datos de la portada v3 (oscura). Los 8 servicios como nodos de la red (opciones que se combinan, sin orden).
// Salen de lib/servicios.ts (fuente única): nombre corto, línea de descripción, ícono y slug.
import { SERVICIOS, type Icono } from "@/lib/servicios";

export type Nodo = {
  corto: string; nombre: string; desc: string; slug: string; icono: Icono; destacado?: boolean;
};

export const NODOS: Nodo[] = SERVICIOS.map((s) => ({
  corto: s.corto, nombre: s.nombre, desc: s.linea, slug: s.slug, icono: s.icono, destacado: s.destacado,
}));
