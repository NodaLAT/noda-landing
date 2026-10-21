import type { MetadataRoute } from "next";
import { SERVICIOS } from "@/lib/servicios";
import { SITE_URL } from "@/lib/seo";

// Mapa del sitio para Google (www.noda.lat/sitemap.xml). Los servicios nuevos se agregan solos.
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: ahora, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/servicios`, lastModified: ahora, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICIOS.map((s) => ({ url: `${SITE_URL}/servicios/${s.slug}`, lastModified: ahora, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/privacidad`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terminos`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
  ];
}
