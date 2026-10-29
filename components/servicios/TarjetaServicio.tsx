import Link from "next/link";
import { numeroServicio, type Servicio } from "@/lib/servicios";
import { RUTA_COTIZADOR, precioDe } from "@/lib/precios";
import { IconoServicio } from "@/components/portada/Iconos";
import { LineaPrecio } from "@/components/precios/Precio";

// Tarjeta de un servicio (/servicios): número, ícono de la red, nombre, línea de descripción,
// precio (o "Cotiza a medida") y enlace a su página. Toda la tarjeta lleva a la página del servicio
// (el enlace del título se extiende con ::after); el enlace al cotizador queda por encima.
export default function TarjetaServicio({ servicio: s, indice }: { servicio: Servicio; indice: number }) {
  const cotizador = !!precioDe(s.slug)?.modulos;
  return (
    <article className={`p3-tarjeta${s.destacado ? " p3-tarjeta--estrella" : ""}`} data-pulso>
      <span className="p3-tarjeta-cab">
        <span className="p3-tarjeta-ico"><IconoServicio icono={s.icono} /></span>
        <span className="p3-tarjeta-num">{numeroServicio(indice)}</span>
      </span>
      {s.destacado && <span className="p3-estrella p3-estrella--tarjeta">Servicio estrella</span>}
      <h2 className="p3-tarjeta-t"><Link href={`/servicios/${s.slug}`} className="p3-tarjeta-enlace">{s.nombre}</Link></h2>
      <p className="p3-tarjeta-d">{s.linea}</p>
      <span className="p3-tarjeta-pie">
        <LineaPrecio slug={s.slug} />
        <span className="p3-tarjeta-acciones">
          <span className="p3-tarjeta-link" aria-hidden="true">Ver servicio →</span>
          {cotizador && <Link href={RUTA_COTIZADOR} className="p3-tarjeta-cotizar">Cotiza el tuyo</Link>}
        </span>
      </span>
    </article>
  );
}
