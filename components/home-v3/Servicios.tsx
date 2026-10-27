import Link from "next/link";
import { SERVICIOS, SERVICIO_A_MEDIDA, numeroServicio, textoPrecio } from "@/lib/servicios";
import { whatsappLink } from "@/lib/site";
import Obj3D from "./Obj3D";

// Objeto 3D y color por servicio, en el orden de lib/servicios.ts.
const ESTILO: { obj: string; color: string }[] = [
  { obj: "burbuja", color: "teal" },      // 01 Atención 24/7 (estrella)
  { obj: "calendario", color: "cian" },   // 02 Agendamiento
  { obj: "calculadora", color: "coral" }, // 03 Cotizaciones
  { obj: "documento", color: "beige" },   // 04 Interpretación
  { obj: "iman", color: "sol" },          // 05 CRM
  { obj: "grafico", color: "teal" },      // 06 Reportes
  { obj: "navegador", color: "coral" },   // 07 Webs
  { obj: "bloques", color: "cian" },      // 08 Apps
];

export default function Servicios() {
  return (
    <section className="v3-seccion v3-seccion--tinta" id="servicios">
      <div className="container">
        <span className="v3-eyebrow">Servicios</span>
        <h2 className="v3-h2">Si tu negocio lo repite, lo automatizamos.</h2>
        <p className="v3-sub">
          Diagnosticamos qué te consume más tiempo y diseñamos la solución. Cada uno funcionando de verdad.
        </p>
        <div className="v3-serv-grid">
          {SERVICIOS.map((s, i) => {
            const e = ESTILO[i];
            const estrella = i === 0;
            return (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className={`v3-serv-card v3-serv-card--${e.color}${estrella ? " v3-serv-card--estrella" : ""}`}
              >
                <div className="v3-serv-top">
                  <span className="v3-serv-num">{numeroServicio(i)}</span>
                  {estrella && <span className="v3-serv-estrella">Servicio estrella</span>}
                </div>
                <h3 className="v3-serv-nombre">{s.nombre}</h3>
                <p className="v3-serv-desc">{s.resumen}</p>
                <span className="v3-serv-tag">{textoPrecio(s.precio)}</span>
                <Obj3D name={e.obj} ancho={estrella ? 150 : 104} className="v3-serv-obj" />
              </Link>
            );
          })}
          {/* novena tarjeta: a medida */}
          <div className="v3-serv-medida">
            <p>
              <strong>¿Tu proceso no está aquí?</strong>
              Lo diseñamos contigo.
            </p>
            <a href={whatsappLink(SERVICIO_A_MEDIDA.mensajeWhatsApp)} className="v3-btn v3-btn--primario">
              Cuéntanos por WhatsApp <span className="flecha" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
