import Link from "next/link";
import { numeroServicio, type Servicio } from "@/lib/servicios";
import { RUTA_COTIZADOR, ofertaVigente, precioDe, tieneOferta } from "@/lib/precios";
import { IconoServicio } from "@/components/portada/Iconos";
import { LineaPrecio } from "@/components/precios/Precio";
import Vista from "./Vistas";

// Tarjeta de un servicio en la grilla bento de /servicios: ícono, etiquetas (Servicio estrella / Oferta),
// número, mini vista previa animada, nombre, línea, precio (o "Cotiza a medida") y "Ver servicio".
// Toda la tarjeta lleva a la página del servicio (el enlace del título se extiende con ::after);
// "Cotiza el tuyo" queda por encima. data-pulso: la red de nodos manda pulsos a la tarjeta (RedPlexus).
export default function TarjetaServicio({ servicio: s, indice }: { servicio: Servicio; indice: number }) {
  const cotizador = !!precioDe(s.slug)?.modulos;
  const oferta = tieneOferta(s.slug) && ofertaVigente();
  return (
    <article className={`p3-bc${s.destacado ? " p3-bc--estrella" : ""}`} data-pulso>
      <span className="p3-bc-cab">
        <span className="p3-bc-ico"><IconoServicio icono={s.icono} /></span>
        <span className="p3-bc-etqs">
          {s.destacado && <span className="p3-estrella p3-estrella--tarjeta">Servicio estrella</span>}
          {oferta && <span className="p3-bc-oferta p3-con-oferta">Oferta</span>}
        </span>
        <span className="p3-bc-num">{numeroServicio(indice)}</span>
      </span>
      <div className="p3-bc-cuerpo">
        <Vista icono={s.icono} />
        <div className="p3-bc-txt">
          <h2 className="p3-bc-t"><Link href={`/servicios/${s.slug}`} className="p3-tarjeta-enlace">{s.nombre}</Link></h2>
          <p className="p3-bc-d">{s.linea}</p>
          <div className="p3-bc-pie">
            <LineaPrecio slug={s.slug} etiqueta={false} />
            <span className="p3-tarjeta-acciones">
              <span className="p3-tarjeta-link" aria-hidden="true">Ver servicio →</span>
              {cotizador && <Link href={RUTA_COTIZADOR} className="p3-tarjeta-cotizar">Cotiza el tuyo</Link>}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
