import type { Metadata } from "next";
import { metadataPagina } from "@/lib/seo";
import Hero from "@/components/home-v3/Hero";
import Cinta from "@/components/home-v3/Cinta";
import Problema from "@/components/home-v3/Problema";
import Servicios from "@/components/home-v3/Servicios";
import Caso from "@/components/home-v3/Caso";
import Proceso from "@/components/home-v3/Proceso";
import PorQue from "@/components/home-v3/PorQue";
import Cierre from "@/components/home-v3/Cierre";
import SepNodos from "@/components/home-v3/SepNodos";

export const metadata: Metadata = metadataPagina({
  titulo: "Noda — Automatización con IA para tu negocio",
  descripcion:
    "Noda automatiza la atención por WhatsApp, el agendamiento, las cotizaciones y la interpretación de documentos de tu negocio con IA. Si lo repites todos los días, lo automatizamos.",
  ruta: "/",
  tituloCompleto: true,
});

// Portada v3 (noda.lat). Header y Footer vienen de app/layout.tsx.
// Entre secciones de distinto color va un separador de "nodos" del color de la de arriba.
export default function Home() {
  return (
    <>
      <Hero />
      {/* el color de arriba sigue a la escena del hero (--escena) */}
      <SepNodos arriba="var(--escena, #1FA098)" abajo="var(--v3-sol)" />
      <Cinta />
      <SepNodos arriba="var(--v3-sol)" abajo="var(--v3-beige)" />
      <Problema />
      <SepNodos arriba="var(--v3-beige)" abajo="var(--v3-tinta)" />
      <Servicios />
      <SepNodos arriba="var(--v3-tinta)" abajo="var(--v3-cian)" />
      <Caso />
      <SepNodos arriba="var(--v3-cian)" abajo="var(--v3-beige)" />
      <Proceso />
      <PorQue />
      <SepNodos arriba="var(--v3-beige)" abajo="var(--v3-coral)" />
      <Cierre />
      <SepNodos arriba="var(--v3-coral)" abajo="var(--footer-bg)" />
    </>
  );
}
