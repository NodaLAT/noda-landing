import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";
import DatosEstructurados from "@/components/DatosEstructurados";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import { ES_PRODUCCION, SITE_URL } from "@/lib/seo";
// El orden importa: igual que en el index.html original.
import "@/styles/design-system.css";
import "@/styles/globals.css";
import "@/styles/noda-hero.css";
import "@/styles/servicios.css";
import "@/styles/legal.css";
import "@/styles/home-v3.css";

// Las mismas tipografías de siempre (Google Fonts), pero servidas desde nuestro propio sitio:
// el celular no tiene que conectarse a otro servidor y la página aparece antes.
// design-system.css las usa a través de --font-display, --font-body y --font-mono.
const fuenteDisplay = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], axes: ["opsz"], display: "swap", variable: "--font-display" });
const fuenteBody = Manrope({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-body" });
const fuenteMono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], display: "swap", variable: "--font-mono" });

export const metadata: Metadata = {
  // Dirección base para enlaces e imágenes al compartir: www.noda.lat en producción,
  // la dirección de la vista previa en Vercel, o la de tu computadora.
  metadataBase: new URL(ES_PRODUCCION ? SITE_URL : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  // La portada usa "default"; las demás páginas, "Título | Noda".
  title: { default: "Noda — Automatización con IA para tu negocio", template: "%s | Noda" },
  description:
    "Noda automatiza la atención al cliente, agendamiento, cotizaciones, seguimiento de leads, reportes y procesos internos de tu negocio con IA. Si lo repites todos los días, lo automatizamos.",
  openGraph: { siteName: "Noda", locale: "es_EC", type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${fuenteDisplay.variable} ${fuenteBody.variable} ${fuenteMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollEffects />
        <DatosEstructurados />
        {/* Medición de visitas de Vercel: sin cookies y sin datos que identifiquen a la persona */}
        <Analytics />
      </body>
    </html>
  );
}
