import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Problema from "@/components/sections/Problema";
import Soluciones from "@/components/sections/Soluciones";
import Casos from "@/components/sections/Casos";
import Proceso from "@/components/sections/Proceso";
import PorQue from "@/components/sections/PorQue";
import Contacto from "@/components/sections/Contacto";

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
