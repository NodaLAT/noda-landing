import type { Metadata } from "next";
import Link from "next/link";
import { metadataPagina } from "@/lib/seo";
import { SERVICIOS } from "@/lib/servicios";
import { whatsappLink } from "@/lib/site";
import Marco from "@/components/portada/Marco";
import Cierre from "@/components/portada/Cierre";
import { IconoServicio } from "@/components/portada/Iconos";

const descripcion =
  "Atención por WhatsApp, agendamiento, cotizaciones, lectura de documentos con IA, seguimiento de clientes, reportes, webs y sistemas a medida para tu negocio.";

export const metadata: Metadata = metadataPagina({ titulo: "Servicios de automatización con IA", descripcion, ruta: "/servicios" });

// Cartelera de servicios: las 8 tarjetas salen de lib/servicios.ts (mismo ícono que en la red de la portada).
export default function ServiciosPage() {
  return (
    <Marco>
      <section className="p3-pag-head">
        <div className="p3-wrap">
          <span className="p3-eyebrow">Servicios</span>
          <h1 className="p3-pag-h1">Si tu negocio lo repite, hay un servicio para <em className="p3-acento">automatizarlo.</em></h1>
          <p className="p3-pag-sub">
            Elige por dónde empezar. Cada servicio se adapta a la forma en que trabaja tu negocio,
            y todos se pueden combinar entre sí.
          </p>
        </div>
      </section>

      <section className="p3-sec p3-sec-pegada">
        <div className="p3-wrap">
          <ul className="p3-tarjetas">
            {SERVICIOS.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className="p3-tarjeta">
                  <span className="p3-tarjeta-ico"><IconoServicio icono={s.icono} /></span>
                  <h2 className="p3-tarjeta-t">{s.nombre}</h2>
                  <p className="p3-tarjeta-d">{s.linea}</p>
                  <span className="p3-tarjeta-link">Ver servicio <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cierre
        boton="Cotiza a medida"
        href={whatsappLink("Hola Noda, quiero una cotización a medida para automatizar mi negocio")}
      />
    </Marco>
  );
}
