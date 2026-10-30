import type { Metadata } from "next";
import { metadataPagina } from "@/lib/seo";
import { ofertaVigente } from "@/lib/precios";
import { RUTA_PLAN } from "@/lib/plan";
import Marco from "@/components/portada/Marco";
import { IconoServicio } from "@/components/portada/Iconos";
import Plan from "@/components/plan/Plan";

export const metadata: Metadata = metadataPagina({
  titulo: "Arma tu plan",
  descripcion: "Arma tu plan con uno o varios servicios, mira el precio al instante y envíalo por WhatsApp.",
  ruta: RUTA_PLAN,
});

// Tres pasos cortos, con íconos del mismo set de los servicios.
const PASOS = [
  { icono: "bloques", texto: "Elige tus servicios." },
  { icono: "calculadora", texto: "Mira tu precio al instante." },
  { icono: "chat", texto: "Envíalo por WhatsApp y te respondemos." },
] as const;

// Página "Arma tu plan". El estado vive en el proveedor global (components/plan/PlanProvider.tsx).
export default function PlanPage() {
  return (
    <Marco>
      <section className="p3-pag-head p3-pag-head--corto">
        <div className="p3-wrap">
          <span className="p3-eyebrow">Arma tu plan</span>
          <h1 className="p3-pag-h1">Arma tu plan</h1>
          <p className="p3-pag-sub">Arma tu plan y recibe la respuesta por WhatsApp en segundos.</p>
          <ol className="p3-plan-pasos">
            {PASOS.map((p, k) => (
              <li key={p.texto} className="p3-plan-paso">
                <span className="p3-plan-paso-ico p3-ico-linea"><IconoServicio icono={p.icono} size={22} /></span>
                <span className="p3-plan-paso-num">{k + 1}</span>
                <span className="p3-plan-paso-txt">{p.texto}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="p3-sec p3-sec-pegada">
        <div className="p3-wrap">
          <Plan vigente={ofertaVigente()} />
        </div>
      </section>
    </Marco>
  );
}
