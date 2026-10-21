import type { Metadata } from "next";
import { SERVICIOS } from "@/lib/servicios";
import { TarjetaAMedida, TarjetaServicio } from "@/components/servicios/TarjetaServicio";
import Contacto from "@/components/sections/Contacto";

const descripcion =
  "Atención por WhatsApp, agendamiento, cotizaciones, lectura de documentos con IA, seguimiento de clientes, reportes, webs y sistemas a medida para tu negocio.";

export const metadata: Metadata = {
  title: "Servicios de automatización con IA",
  description: descripcion,
  openGraph: { title: "Servicios de automatización con IA | Noda", description: descripcion },
};

// Cartelera de servicios. Las tarjetas salen de lib/servicios.ts.
export default function ServiciosPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="section-eyebrow hero-anim hero-d1">Servicios</span>
          <h1 className="hero-anim hero-d2">Si tu negocio lo repite, hay un servicio para <em>automatizarlo</em>.</h1>
          <p className="hero-sub hero-anim hero-d3">
            Elige por dónde empezar. Cada servicio se adapta a la forma en que trabaja tu negocio,
            y todos se pueden combinar entre sí.
          </p>
        </div>
      </section>

      <section className="svc-section">
        <div className="container reveal">
          <div className="svc-grid">
            {SERVICIOS.map((s, i) => <TarjetaServicio key={s.slug} servicio={s} indice={i} />)}
            <TarjetaAMedida indice={SERVICIOS.length} />
          </div>
        </div>
      </section>

      <Contacto />
    </>
  );
}
