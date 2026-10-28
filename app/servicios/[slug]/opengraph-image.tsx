import { imagenCompartir, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { SERVICIOS } from "@/lib/servicios";

// Una imagen para compartir por cada servicio de lib/servicios.ts.
export const alt = "Servicio de Noda";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICIOS.find((x) => x.slug === slug)!;
  return imagenCompartir({ etiqueta: "Servicio", titulo: s.nombre });
}
