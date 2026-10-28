import type { Metadata } from "next";
import { metadataPagina } from "@/lib/seo";
import Marco from "@/components/portada/Marco";
import Hero from "@/components/portada/Hero";
import RedNodos from "@/components/portada/RedNodos";
import Caso from "@/components/portada/Caso";
import Proceso from "@/components/portada/Proceso";
import Faq from "@/components/portada/Faq";
import Cierre from "@/components/portada/Cierre";

export const metadata: Metadata = metadataPagina({
  titulo: "Noda — Automatización con IA para tu negocio",
  descripcion:
    "Automatizamos tu negocio para que vendas más. Respondemos, agendamos y cotizamos por ti en WhatsApp, las 24 horas, con IA.",
  ruta: "/",
  tituloCompleto: true,
});

// Portada v3 (oscura, cinematográfica). Cabecera y pie vienen del Marco común.
export default function Home() {
  return (
    <Marco>
      <Hero />
      <RedNodos />
      <Caso />
      <Proceso />
      <Faq />
      <Cierre />
    </Marco>
  );
}
