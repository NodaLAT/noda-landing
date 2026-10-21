import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";
// El orden importa: igual que en el index.html original.
import "@/styles/design-system.css";
import "@/styles/globals.css";
import "@/styles/noda-hero.css";
import "@/styles/servicios.css";

export const metadata: Metadata = {
  // La portada usa "default"; las demás páginas, "Título | Noda".
  title: { default: "Noda — Automatización con IA para tu negocio", template: "%s | Noda" },
  description:
    "Noda automatiza la atención al cliente, agendamiento, cotizaciones, seguimiento de leads, reportes y procesos internos de tu negocio con IA. Si lo repites todos los días, lo automatizamos.",
  openGraph: { title: "Noda — Automatización con IA" },
  icons: { icon: { url: "/isotipo-noda.png", type: "image/png" } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Mismas fuentes y misma URL que la landing original */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollEffects />
      </body>
    </html>
  );
}
