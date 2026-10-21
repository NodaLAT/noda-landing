import { EMAIL, INSTAGRAM_URL, TIKTOK_URL } from "@/lib/site";
import { SITE_URL } from "@/lib/seo";

// Datos de la empresa para Google (formato schema.org). No se ven en la página.
const ORGANIZACION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Noda",
  legalName: "NODA S.A.S.",
  taxID: "1793237077001",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-noda.png`,
  email: EMAIL,
  telephone: "+593979938457",
  address: { "@type": "PostalAddress", addressLocality: "Quito", addressCountry: "EC" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+593979938457",
    email: EMAIL,
    availableLanguage: ["es"],
  },
  sameAs: [INSTAGRAM_URL, TIKTOK_URL],
};

export default function DatosEstructurados() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZACION) }} />;
}
