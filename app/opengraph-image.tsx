import { imagenCompartir, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Noda — Automatización con IA para tu negocio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return imagenCompartir({ etiqueta: "Agencia de automatización con IA", titulo: "Si tu negocio lo repite, nosotros lo automatizamos." });
}
