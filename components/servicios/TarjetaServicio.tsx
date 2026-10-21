import Link from "next/link";
import { SERVICIO_A_MEDIDA, numeroServicio, textoPrecio, type Servicio } from "@/lib/servicios";
import { whatsappLink } from "@/lib/site";
import { Flecha, IconoServicio } from "./Iconos";

// Tarjeta de la cartelera. Lleva a /servicios/[slug].
export function TarjetaServicio({ servicio, indice }: { servicio: Servicio; indice: number }) {
  return (
    <Link href={`/servicios/${servicio.slug}`} className={servicio.destacado ? "svc-card svc-card--star" : "svc-card"}>
      <div className="svc-top">
        <IconoServicio icono={servicio.icono} />
        {servicio.destacado
          ? <span className="svc-badge">★ Servicio estrella</span>
          : <span className="svc-num">{numeroServicio(indice)}</span>}
      </div>
      <h2 className="svc-title">{servicio.nombre}</h2>
      <p className="svc-desc">{servicio.resumen}</p>
      <div className="svc-foot">
        <span className="svc-price">{textoPrecio(servicio.precio)}</span>
        <span className="svc-link">Ver servicio <Flecha size={15} /></span>
      </div>
    </Link>
  );
}

// Última tarjeta: "¿Tu proceso no está aquí?". Va directo a WhatsApp.
export function TarjetaAMedida({ indice }: { indice: number }) {
  return (
    <a href={whatsappLink(SERVICIO_A_MEDIDA.mensajeWhatsApp)} className="svc-card svc-card--custom">
      <div className="svc-top">
        <IconoServicio icono="a-medida" />
        <span className="svc-num">{numeroServicio(indice)}</span>
      </div>
      <h2 className="svc-title">{SERVICIO_A_MEDIDA.nombre}</h2>
      <p className="svc-desc">{SERVICIO_A_MEDIDA.resumen}</p>
      <div className="svc-foot">
        <span className="svc-price">Diagnóstico gratis</span>
        <span className="svc-link">{SERVICIO_A_MEDIDA.cta} <Flecha size={15} /></span>
      </div>
    </a>
  );
}
