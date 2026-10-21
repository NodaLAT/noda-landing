import { imagenCompartir, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Servicios de automatización con IA | Noda";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return imagenCompartir({ etiqueta: "Servicios", titulo: "Servicios de automatización con IA para tu negocio" });
}
