import type { Metadata } from "next";

// Dirección oficial del sitio (noda.lat redirige a www.noda.lat).
export const SITE_URL = "https://www.noda.lat";
export const ES_PRODUCCION = process.env.VERCEL_ENV === "production";

// Título, descripción, dirección canónica y tarjeta para compartir de cada página.
// La imagen de la tarjeta la genera el archivo opengraph-image.tsx de cada carpeta.
export function metadataPagina({ titulo, descripcion, ruta, tituloCompleto = false }: {
  titulo: string;
  descripcion: string;
  ruta: string;
  tituloCompleto?: boolean;   // true = no agregar " | Noda" al final (portada)
}): Metadata {
  const tituloSocial = tituloCompleto ? titulo : `${titulo} | Noda`;
  return {
    title: tituloCompleto ? { absolute: titulo } : titulo,
    description: descripcion,
    // La versión oficial de cada página es siempre la de www.noda.lat (también desde las vistas previas).
    alternates: { canonical: `${SITE_URL}${ruta === "/" ? "/" : ruta}` },
    openGraph: { title: tituloSocial, description: descripcion, url: ruta, siteName: "Noda", locale: "es_EC", type: "website" },
    twitter: { card: "summary_large_image", title: tituloSocial, description: descripcion },
  };
}
