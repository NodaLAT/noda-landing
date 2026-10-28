import { imagenCompartir, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Noda — Automatizamos tu negocio para que vendas más";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Imagen para compartir la portada: logo + tagline sobre el fondo del tema.
export default function Image() {
  return imagenCompartir({ etiqueta: "Automatización con IA · Quito, Ecuador", titulo: "Automatizamos tu negocio", segunda: "para que", destacado: "vendas más." });
}
