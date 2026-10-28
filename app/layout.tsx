import type { Metadata, Viewport } from "next";
import DatosEstructurados from "@/components/DatosEstructurados";
import { Analytics } from "@vercel/analytics/next";
import { Poppins } from "next/font/google";
import { ES_PRODUCCION, SITE_URL } from "@/lib/seo";
import "@/styles/design-system.css";
import "@/styles/globals.css";
import "@/styles/servicios.css";
import "@/styles/portada.css";
import "@/styles/paginas.css";

// Tipografía única del sitio: Poppins (Google Fonts), servida desde nuestro propio sitio.
// design-system.css la usa a través de --font-poppins.
const poppins = Poppins({ subsets: ["latin", "latin-ext"], weight: ["400", "600", "700"], display: "swap", variable: "--font-poppins" });

export const metadata: Metadata = {
  metadataBase: new URL(ES_PRODUCCION ? SITE_URL : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  title: { default: "Noda — Automatización con IA para tu negocio", template: "%s | Noda" },
  description:
    "Noda automatiza la atención al cliente, agendamiento, cotizaciones, seguimiento de leads, reportes y procesos internos de tu negocio con IA. Si lo repites todos los días, lo automatizamos.",
  openGraph: { siteName: "Noda", locale: "es_EC", type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // data-tema: tema de color de la PORTADA. Cambiar "neutro" por "teal" aquí cambia toda la paleta.
  return (
    <html lang="es" data-scroll-behavior="smooth" data-tema="mixto" className={poppins.variable}>
      <body>
        {/* Fondo "luz desenfocada": solo se ve con el tema mixto en la portada (ver design-system.css) */}
        <div className="fondo-luz" aria-hidden="true"><span className="fondo-luz-a" /><span className="fondo-luz-b" /></div>
        {/* Cabecera y pie: los pone cada página con el Marco oscuro (components/portada/Marco.tsx) */}
        <main>{children}</main>
        <DatosEstructurados />
        {/* Medición de visitas de Vercel: sin cookies y sin datos que identifiquen a la persona */}
        <Analytics />
      </body>
    </html>
  );
}
