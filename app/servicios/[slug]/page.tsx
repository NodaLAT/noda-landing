import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICIOS, mensajeInteres, textoPrecio, type Servicio } from "@/lib/servicios";
import { whatsappLink } from "@/lib/site";
import { metadataPagina } from "@/lib/seo";
import Marco from "@/components/portada/Marco";
import Faq from "@/components/portada/Faq";
import Caso from "@/components/portada/Caso";
import Cierre from "@/components/portada/Cierre";
import { IconoServicio } from "@/components/portada/Iconos";
import ChatDemo from "@/components/servicios/ChatDemo";
import { MaquetaPanel, MaquetaWeb } from "@/components/servicios/Maquetas";

// Plantilla única para todas las páginas /servicios/[slug]. Todo el contenido sale de lib/servicios.ts.
// Orden: hero, problema, cómo funciona (3 pasos), qué incluye, ideal para, dato con fuente,
// demo, caso en marcha (si aplica), preguntas frecuentes, servicios relacionados y cierre "Cotiza a medida".
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICIOS.find((x) => x.slug === slug);
  if (!s) return {};
  return metadataPagina({ titulo: s.seo.titulo, descripcion: s.seo.descripcion, ruta: `/servicios/${s.slug}` });
}

// Lista con viñetas o, si todavía no hay contenido aprobado, el marcador visible.
function ListaOPendiente({ items, pendiente }: { items: string[]; pendiente: string }) {
  return items.length
    ? <ul className="p3-lista">{items.map((t) => <li key={t}>{t}</li>)}</ul>
    : <p className="p3-pendiente">[PENDIENTE: {pendiente}]</p>;
}

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params;
  const s = SERVICIOS.find((x) => x.slug === slug);
  if (!s) notFound();
  const whatsapp = whatsappLink(mensajeInteres(s));
  const relacionados = s.relacionados.map((r) => SERVICIOS.find((x) => x.slug === r)).filter((x): x is Servicio => !!x);

  return (
    <Marco>
      {/* 1. Hero del servicio */}
      <section className="p3-pag-head">
        <div className="p3-wrap">
          <nav className="p3-miga" aria-label="Ruta de navegación">
            <Link href="/servicios">Servicios</Link><span aria-hidden="true">/</span><span aria-current="page">{s.corto}</span>
          </nav>
          <span className="p3-srv-head-ico p3-ico-linea"><IconoServicio icono={s.icono} size={28} /></span>
          <span className="p3-eyebrow">Servicio</span>
          <h1 className="p3-pag-h1">{s.nombre}</h1>
          <p className="p3-pag-sub">{s.promesa}</p>
          <div className="p3-pag-acc">
            <a href={whatsapp} className="p3-btn p3-btn-acento p3-shine">{textoPrecio(s.precio)}</a>
            <a href="#demo" className="p3-btn p3-btn-outline">Ver la demo</a>
          </div>
        </div>
      </section>

      {/* 2. Problema */}
      <section className="p3-sec p3-sec-c">
        <div className="p3-wrap p3-dos">
          <div>
            <span className="p3-eyebrow">El problema</span>
            <h2 className="p3-h2">{s.problema.titulo}</h2>
            <p className="p3-p">{s.problema.texto}</p>
          </div>
          <div className="p3-caja">
            <h3 className="p3-caja-t">¿Te suena familiar?</h3>
            <ListaOPendiente items={s.problema.puntos} pendiente="puntos del problema" />
          </div>
        </div>
      </section>

      {/* 3. Cómo funciona, en 3 pasos */}
      <section className="p3-sec p3-sec-c">
        <div className="p3-wrap">
          <span className="p3-eyebrow">Cómo funciona</span>
          <h2 className="p3-h2">Así lo ponemos en marcha, en 3 pasos.</h2>
          <div className="p3-pasos p3-pasos-3">
            {s.pasos.map((p, k) => (
              <div key={p.titulo} className="p3-paso">
                <span className="p3-paso-num">{String(k + 1).padStart(2, "0")}</span>
                <h3 className="p3-paso-t">{p.titulo}</h3>
                <p className="p3-paso-d">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Qué incluye · 5. Ideal para */}
      <section className="p3-sec p3-sec-c">
        <div className="p3-wrap p3-dos">
          <div className="p3-caja">
            <h2 className="p3-caja-t">Qué incluye</h2>
            <ListaOPendiente items={s.incluye} pendiente="qué incluye este servicio" />
          </div>
          <div className="p3-caja">
            <h2 className="p3-caja-t">Ideal para</h2>
            <ListaOPendiente items={s.idealPara} pendiente="para qué negocios es ideal" />
          </div>
        </div>
      </section>

      {/* 6. Dato con fuente (solo si el servicio tiene una cifra aprobada) */}
      {s.dato && (
        <section className="p3-sec p3-sec-c">
          <div className="p3-wrap">
            <figure className="p3-dato">
              <span className="p3-dato-cifra">{s.dato.cifra}</span>
              <figcaption>
                <p className="p3-dato-texto">{s.dato.texto}</p>
                <p className="p3-dato-fuente">Fuente: {s.dato.fuente}</p>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* 7. Demo */}
      <section className="p3-sec p3-sec-c" id="demo">
        <div className={`p3-wrap p3-demo${s.demo.tipo === "chat" ? "" : " p3-demo--ancha"}`}>
          <div>
            <span className="p3-eyebrow">Ejemplo <span className="p3-demo-tag">Demo</span></span>
            <h2 className="p3-h2">{s.demo.titulo}</h2>
            <p className="p3-p">{s.demo.intro}</p>
            {s.demo.tipo === "chat" && <p className="p3-demo-nota">Es una simulación: las respuestas son de ejemplo y no se envía ningún mensaje real.</p>}
            {s.demo.tipo === "web" && <p className="p3-demo-nota">{s.demo.nota}</p>}
            {s.demo.tipo === "panel" && <p className="p3-demo-nota">Imagen de ejemplo: cada panel se diseña según los procesos de tu negocio.</p>}
            {s.demo.tipo === "chat" && s.demo.aviso && <p className="p3-demo-aviso">{s.demo.aviso}</p>}
          </div>
          {s.demo.tipo === "chat" && <ChatDemo demo={s.demo} />}
          {s.demo.tipo === "web" && <MaquetaWeb />}
          {s.demo.tipo === "panel" && <MaquetaPanel />}
        </div>
      </section>

      {/* Caso en marcha (VyR), solo en los servicios que el laboratorio usa */}
      {s.casoVyR && <Caso id="caso" compacto />}

      {/* 8. Preguntas frecuentes */}
      <Faq preguntas={s.faq} titulo="Preguntas sobre este servicio." pendiente="[PENDIENTE: preguntas frecuentes de este servicio]" />

      {/* Servicios relacionados */}
      {relacionados.length > 0 && (
        <section className="p3-sec p3-sec-c">
          <div className="p3-wrap">
            <span className="p3-eyebrow">Se combina con</span>
            <h2 className="p3-h2">Servicios que funcionan bien juntos.</h2>
            <ul className="p3-tarjetas p3-relacionados">
              {relacionados.map((r) => (
                <li key={r.slug}>
                  <Link href={`/servicios/${r.slug}`} className="p3-tarjeta">
                    <span className="p3-tarjeta-ico"><IconoServicio icono={r.icono} /></span>
                    <h3 className="p3-tarjeta-t">{r.nombre}</h3>
                    <p className="p3-tarjeta-d">{r.linea}</p>
                    <span className="p3-tarjeta-link">Ver servicio <span aria-hidden="true">→</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 9. Cierre */}
      <Cierre
        titulo="¿Lo quieres para tu negocio?"
        sub="Escríbenos por WhatsApp y cuéntanos cómo trabajas hoy."
        texto="Te mostramos cómo funcionaría en tu negocio, sin compromiso."
        boton="Cotiza a medida"
        href={whatsapp}
      />
    </Marco>
  );
}
