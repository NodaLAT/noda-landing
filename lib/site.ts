// Datos de contacto y navegación compartidos por todas las páginas.
// Son datos públicos (aparecen en el sitio). Claves, tokens o webhooks
// NUNCA van aquí: van en variables de entorno de Vercel.

export const WHATSAPP_DEMO_URL =
  "https://wa.me/593979938457?text=Hola%20Noda%2C%20quiero%20automatizar%20mi%20negocio";
// Botón general ("Hablar con Noda" y WhatsApp del pie de página): también con mensaje precargado.
export const WHATSAPP_URL = WHATSAPP_DEMO_URL;
export const WHATSAPP_DIAGNOSTICO_URL =
  "https://wa.me/593979938457?text=Hola%20Noda%2C%20quiero%20agendar%20mi%20diagn%C3%B3stico%20gratis";
// Enlace a WhatsApp con un mensaje precargado (ej. "Hola Noda, me interesa ...").
export const whatsappLink = (mensaje: string) =>
  `https://wa.me/593979938457?text=${encodeURIComponent(mensaje)}`;
export const EMAIL = "contacto@noda.lat";
export const INSTAGRAM_URL = "https://instagram.com/noda.lat";
export const TIKTOK_URL = "https://tiktok.com/@noda.lat";

// Los enlaces empiezan con "/" para que funcionen desde cualquier página:
// en la portada hacen scroll a la sección; desde otra página, llevan a la portada.
export const NAV_LINKS = [
  { label: "Servicios", href: "/servicios" },
  { label: "Casos", href: "/#casos" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Por qué Noda", href: "/#por-que" },
];
