import { imagenCompartir, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Política de privacidad | Noda";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return imagenCompartir({ etiqueta: "Legal", titulo: "Política de privacidad" });
}
