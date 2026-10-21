// Datos de contacto y navegación compartidos por todas las páginas.
// Son datos públicos (aparecen en el sitio). Claves, tokens o webhooks
// NUNCA van aquí: van en variables de entorno de Vercel.

export const WHATSAPP_URL = "https://wa.me/593979938457";
export const WHATSAPP_DEMO_URL =
  "https://wa.me/593979938457?text=Hola%20Noda%2C%20quiero%20automatizar%20mi%20negocio";
export const WHATSAPP_DIAGNOSTICO_URL =
  "https://wa.me/593979938457?text=Hola%20Noda%2C%20quiero%20agendar%20mi%20diagn%C3%B3stico%20gratis";
export const EMAIL = "contacto@noda.lat";
export const INSTAGRAM_URL = "https://instagram.com/noda.lat";
export const TIKTOK_URL = "https://tiktok.com/@noda.lat";

// Los enlaces empiezan con "/" para que funcionen desde cualquier página:
// en la portada hacen scroll a la sección; desde otra página, llevan a la portada.
export const NAV_LINKS = [
  { label: "Soluciones", href: "/#soluciones" },
  { label: "Casos", href: "/#casos" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Por qué Noda", href: "/#por-que" },
];
