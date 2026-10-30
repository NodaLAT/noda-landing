import type { Metadata } from "next";
import { metadataPagina } from "@/lib/seo";
import { ofertaVigente } from "@/lib/precios";
import { RUTA_PLAN } from "@/lib/plan";
import Marco from "@/components/portada/Marco";
import Plan from "@/components/plan/Plan";

export const metadata: Metadata = metadataPagina({
  titulo: "Arma tu plan",
  descripcion: "Arma tu plan con uno o varios servicios, mira el precio al instante y envíalo por WhatsApp.",
  ruta: RUTA_PLAN,
});

// Página "Arma tu plan". El estado vive en el proveedor global (components/plan/PlanProvider.tsx).
// Los tres pasos los muestra <Plan> solo cuando el plan tiene servicios; con el plan vacío, la lista
// de servicios para agregar es lo primero que se ve.
export default function PlanPage() {
  return (
    <Marco>
      <section className="p3-pag-head p3-pag-head--corto">
        <div className="p3-wrap">
          <span className="p3-eyebrow">Arma tu plan</span>
          <h1 className="p3-pag-h1">Arma tu plan</h1>
          <p className="p3-pag-sub">Arma tu plan y recibe la respuesta por WhatsApp en segundos.</p>
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
