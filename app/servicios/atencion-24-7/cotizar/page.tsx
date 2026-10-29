import type { Metadata } from "next";
import Link from "next/link";
import { metadataPagina } from "@/lib/seo";
import { ofertaVigente, RUTA_COTIZADOR } from "@/lib/precios";
import { SERVICIOS } from "@/lib/servicios";
import { SLUG_ATENCION } from "@/lib/cotizador";
import Marco from "@/components/portada/Marco";
import Cotizador from "@/components/precios/Cotizador";

const servicio = SERVICIOS.find((s) => s.slug === SLUG_ATENCION)!;

export const metadata: Metadata = metadataPagina({
  titulo: "Cotiza tu bot de WhatsApp",
  descripcion: "Arma tu asistente de Atención 24/7 por WhatsApp: elige lo que necesitas y mira el precio al instante.",
  ruta: RUTA_COTIZADOR,
});

const SIGUE = [
  "Eliges lo que necesitas",
  "Te escribimos y hacemos el diagnóstico gratis",
  "Lo construimos y tú apruebas",
];

// Cotizador de Atención 24/7 (precios en lib/precios.ts, cálculo en lib/cotizador.ts).
export default function CotizarPage() {
  return (
    <Marco>
      <section className="p3-pag-head p3-pag-head--corto">
        <div className="p3-wrap">
          <nav className="p3-miga" aria-label="Ruta de navegación">
            <Link href="/servicios">Servicios</Link><span aria-hidden="true">/</span>
            <Link href={`/servicios/${servicio.slug}`}>{servicio.corto}</Link><span aria-hidden="true">/</span>
            <span aria-current="page">Cotizador</span>
          </nav>
          <span className="p3-eyebrow">{servicio.nombre}</span>
          <h1 className="p3-pag-h1">Cotiza tu bot de WhatsApp</h1>
          <p className="p3-pag-sub">{servicio.subtitulo}</p>
        </div>
      </section>

      <section className="p3-sec p3-sec-pegada">
        <div className="p3-wrap">
          <Cotizador vigente={ofertaVigente()} />
        </div>
      </section>

      <section className="p3-sec p3-sec-c">
        <div className="p3-wrap">
          <h2 className="p3-eyebrow">Cómo sigue</h2>
          <ol className="p3-pasos p3-pasos-3">
            {SIGUE.map((t, k) => (
              <li key={t} className="p3-paso">
                <span className="p3-paso-num">{String(k + 1).padStart(2, "0")}</span>
                <p className="p3-paso-txt">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Marco>
  );
}
