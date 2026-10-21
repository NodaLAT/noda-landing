import type { MetadataRoute } from "next";
import { ES_PRODUCCION, SITE_URL } from "@/lib/seo";

// Instrucciones para buscadores (www.noda.lat/robots.txt).
// Solo producción se deja indexar; las vistas previas piden no aparecer en Google.
export default function robots(): MetadataRoute.Robots {
  return ES_PRODUCCION
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL }
    : { rules: { userAgent: "*", disallow: "/" } };
}
