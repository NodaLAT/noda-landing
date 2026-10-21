import { imagenCompartir, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { SERVICIOS, numeroServicio } from "@/lib/servicios";

// Una imagen para compartir por cada servicio de lib/servicios.ts.
export const alt = "Servicio de Noda";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const indice = SERVICIOS.findIndex((s) => s.slug === slug);
  const s = SERVICIOS[indice];
  return imagenCompartir({ etiqueta: `Servicio ${numeroServicio(indice)}`, titulo: s.nombre, destacado: s.destacado });
}
