import type { Metadata } from "next";
import { metadataPagina } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Problema from "@/components/sections/Problema";
import Soluciones from "@/components/sections/Soluciones";
import Casos from "@/components/sections/Casos";
import Proceso from "@/components/sections/Proceso";
import PorQue from "@/components/sections/PorQue";
import Contacto from "@/components/sections/Contacto";

export const metadata: Metadata = metadataPagina({
  titulo: "Noda — Automatización con IA para tu negocio",
  descripcion: "Noda automatiza la atención por WhatsApp, el agendamiento, las cotizaciones y la interpretación de documentos de tu negocio con IA. Si lo repites todos los días, lo automatizamos.",
  ruta: "/",
  tituloCompleto: true,
});

// Portada (noda.lat). Header y Footer vienen de app/layout.tsx.
export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Problema />
      <Soluciones />
      <Casos />
      <Proceso />
      <PorQue />
      <Contacto />
    </>
  );
}
