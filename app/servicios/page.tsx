import type { Metadata } from "next";
import { metadataPagina } from "@/lib/seo";
import { EXTRA_A_MEDIDA, SERVICIOS } from "@/lib/servicios";
import { WHATSAPP_URL, whatsappLink } from "@/lib/site";
import Marco from "@/components/portada/Marco";
import Cierre from "@/components/portada/Cierre";
import TarjetaServicio from "@/components/servicios/TarjetaServicio";
import RedPlexus from "@/components/servicios/RedPlexus";
import Bento from "@/components/servicios/Bento";

const descripcion =
  "Atención por WhatsApp, agendamiento, cotizaciones, lectura de documentos con IA, seguimiento de clientes, reportes, webs y sistemas a medida para tu negocio.";

export const metadata: Metadata = metadataPagina({ titulo: "Servicios de automatización con IA", descripcion, ruta: "/servicios" });

// Cartelera de servicios (textos de docs/contenido-web-v3.md). Las 8 tarjetas salen de lib/servicios.ts.
// Detrás del encabezado y la grilla corre la red de nodos (RedPlexus); cada tarjeta con data-pulso recibe pulsos.
// Grilla bento con filtros: components/servicios/Bento.tsx.
export default function ServiciosPage() {
  return (
    <Marco>
      <div className="p3-plexus-zona">
      <RedPlexus />
      <section className="p3-pag-head">
        <div className="p3-wrap" data-plexus-calma>
          <span className="p3-eyebrow">Servicios</span>
          <h1 className="p3-pag-h1">Todo lo que tu negocio repite, lo automatizamos.</h1>
          <p className="p3-pag-sub">Elige por dónde empezar o cuéntanos tu proceso y lo diseñamos contigo.</p>
        </div>
      </section>

      <section className="p3-sec p3-sec-pegada">
        <div className="p3-wrap">
          <Bento
            slugs={SERVICIOS.map((s) => s.slug)}
            extra={
              <div className="p3-tarjeta-extra">
                <p className="p3-tarjeta-extra-t">{EXTRA_A_MEDIDA.titulo}</p>
                <a href={whatsappLink(EXTRA_A_MEDIDA.mensaje)} className="p3-btn p3-btn-outline">{EXTRA_A_MEDIDA.boton}</a>
              </div>
            }
          >
            {SERVICIOS.map((s, i) => <TarjetaServicio key={s.slug} servicio={s} indice={i} />)}
          </Bento>
        </div>
      </section>
      </div>

      <Cierre
        palabra=""
        titulo="¿No sabes por dónde empezar? Escríbenos y lo vemos juntos."
        sub=""
        texto=""
        boton="Cotiza por WhatsApp"
        href={WHATSAPP_URL}
        correo={false}
      />
    </Marco>
  );
}
