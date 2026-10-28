import Link from "next/link";
import { numeroServicio, textoPrecio, type Servicio } from "@/lib/servicios";
import { IconoServicio } from "@/components/portada/Iconos";

// Tarjeta de un servicio (/servicios): número, ícono de la red, nombre, línea de descripción,
// "Cotiza a medida" y enlace a su página. El servicio estrella lleva su etiqueta.
export default function TarjetaServicio({ servicio: s, indice }: { servicio: Servicio; indice: number }) {
  return (
    <Link href={`/servicios/${s.slug}`} className={`p3-tarjeta${s.destacado ? " p3-tarjeta--estrella" : ""}`}>
      <span className="p3-tarjeta-cab">
        <span className="p3-tarjeta-ico"><IconoServicio icono={s.icono} /></span>
        <span className="p3-tarjeta-num">{numeroServicio(indice)}</span>
      </span>
      {s.destacado && <span className="p3-estrella p3-estrella--tarjeta">Servicio estrella</span>}
      <h2 className="p3-tarjeta-t">{s.nombre}</h2>
      <p className="p3-tarjeta-d">{s.linea}</p>
      <span className="p3-tarjeta-pie">
        <span className="p3-tarjeta-precio">{textoPrecio(s.precio)}</span>
        <span className="p3-tarjeta-link">Ver servicio <span aria-hidden="true">→</span></span>
      </span>
    </Link>
  );
}
