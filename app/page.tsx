import type { Metadata } from "next";
import { metadataPagina } from "@/lib/seo";
import HeaderPortada from "@/components/portada/HeaderPortada";
import Hero from "@/components/portada/Hero";
import RedNodos from "@/components/portada/RedNodos";
import Caso from "@/components/portada/Caso";
import Proceso from "@/components/portada/Proceso";
import Faq from "@/components/portada/Faq";
import Cierre from "@/components/portada/Cierre";
import FooterPortada from "@/components/portada/FooterPortada";

export const metadata: Metadata = metadataPagina({
  titulo: "Noda — Automatización con IA para tu negocio",
  descripcion:
    "Automatizamos tu negocio para que vendas más. Respondemos, agendamos y cotizamos por ti en WhatsApp, las 24 horas, con IA.",
  ruta: "/",
  tituloCompleto: true,
});

// Portada v3 (oscura, cinematográfica). Header y Footer propios (los globales se ocultan en "/").
export default function Home() {
  return (
    <div className="p3">
      <HeaderPortada />
      <Hero />
      <RedNodos />
      <Caso />
      <Proceso />
      <Faq />
      <Cierre />
      <FooterPortada />
    </div>
  );
}
