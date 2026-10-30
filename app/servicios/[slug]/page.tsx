import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICIOS, mensajeInteres, AVISO_SALUD, type Servicio } from "@/lib/servicios";
import { RUTA_COTIZADOR, precioDe } from "@/lib/precios";
import { BloquePrecio, LineaPrecio } from "@/components/precios/Precio";
import { whatsappLink } from "@/lib/site";
import { metadataPagina } from "@/lib/seo";
import Marco from "@/components/portada/Marco";
import Faq from "@/components/portada/Faq";
import Caso from "@/components/portada/Caso";
import Cierre from "@/components/portada/Cierre";
import Telefono from "@/components/portada/Telefono";
import { IconoServicio } from "@/components/portada/Iconos";
import ChatDemo from "@/components/servicios/ChatDemo";
import { MaquetaPanel, MaquetaWeb } from "@/components/servicios/Maquetas";
import { ComoFunciona, DemoCabecera, DemoWhatsApp, QueIncluye, ICONOS_ATENCION, ICONOS_INCLUYE_ATENCION } from "@/components/servicios/Atencion";

// Plantilla única para todas las páginas /servicios/[slug]. Todo el contenido sale de lib/servicios.ts
// (textos de docs/contenido-web-v3.md). Orden del documento: título · subtítulo · el problema ·
// cómo funciona (3 pasos) · qué incluye · ideal para · dato (si hay) · conversación de ejemplo ·
// caso real (si hay) · preguntas frecuentes · "Cotiza a medida" + "Cotiza por WhatsApp" · se combina con.
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

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params;
  const s = SERVICIOS.find((x) => x.slug === slug);
  if (!s) notFound();
  const whatsapp = whatsappLink(mensajeInteres(s));
  const relacionados = s.relacionados.map((r) => SERVICIOS.find((x) => x.slug === r)).filter((x): x is Servicio => !!x);
  const d = s.demo;
  const precio = precioDe(s.slug);
  const esAtencion = s.slug === "atencion-y-ventas-whatsapp";

  // ---------------------------------------------------------------------
  // PLANTILLA v3 (cabecera con la demo al lado). La usan todos los servicios
  // que definen "comoFunciona" en lib/servicios.ts. Los que todavía no la
  // tienen caen a la plantilla antigua de más abajo (sin cambios).
  // Atención (servicio estrella) suma su demo interactiva "Pruébalo tú mismo".
  // ---------------------------------------------------------------------
  if (s.comoFunciona) {
    return (
      <Marco>
        {/* Cabecera con la demo animada al lado (debajo en celular) */}
        <section className="p3-pag-head">
          <div className="p3-wrap pa-head">
            <div className="pa-head-col">
              <nav className="p3-miga" aria-label="Ruta de navegación">
                <Link href="/servicios">Servicios</Link><span aria-hidden="true">/</span><span aria-current="page">{s.corto}</span>
              </nav>
              <span className="p3-srv-head-ico p3-ico-linea"><IconoServicio icono={s.icono} size={28} /></span>
              <span className="p3-eyebrow">Servicio{s.destacado && <span className="p3-estrella">Servicio estrella</span>}</span>
              <h1 className="p3-pag-h1">{s.nombre}</h1>
              <p className="p3-pag-sub">{s.subtitulo}</p>
              <div className="p3-pag-acc">
                {precio
                  ? <a href="#precio" className="p3-btn p3-btn-acento p3-shine">Ver precio</a>
                  : <a href={whatsapp} className="p3-btn p3-btn-acento p3-shine">Cotiza por WhatsApp</a>}
                {precio?.modulos
                  ? <Link href={RUTA_COTIZADOR} className="p3-btn p3-btn-outline">Cotiza el tuyo</Link>
                  : <a href="#como-funciona" className="p3-btn p3-btn-outline">Ver cómo funciona</a>}
              </div>
              {precio && <p className="p3-precio-cab"><LineaPrecio slug={s.slug} /></p>}
            </div>
            <div className="pa-head-demo"><DemoCabecera icono={s.icono} /></div>
          </div>
        </section>

        {/* Aviso médico visible (servicios de salud) */}
        {s.avisoSalud && (
          <section className="p3-sec p3-sec-c">
            <div className="p3-wrap"><p className="p3-demo-aviso pa-aviso-salud">{AVISO_SALUD}</p></div>
          </section>
        )}

        {/* El problema */}
        <section className="p3-sec p3-sec-c">
          <div className="p3-wrap">
            <h2 className="p3-eyebrow">El problema</h2>
            <p className="p3-problema-txt">{s.problema}</p>
          </div>
        </section>

        {/* Cómo funciona (3 o 4 pasos con línea que se ilumina al bajar) */}
        <section className="p3-sec p3-sec-c" id="como-funciona">
          <div className="p3-wrap">
            <h2 className="p3-eyebrow">Cómo funciona</h2>
            <ComoFunciona pasos={s.comoFunciona} iconos={esAtencion ? ICONOS_ATENCION : undefined} />
          </div>
        </section>

        {/* Demo interactiva grande (solo Atención) */}
        {esAtencion && (
          <section className="p3-sec p3-sec-c" id="ejemplo">
            <div className="p3-wrap">
              <h2 className="p3-eyebrow">Pruébalo tú mismo <span className="p3-demo-tag">Demo</span></h2>
              <p className="p3-p">Toca una pregunta, como lo haría un cliente, y mira cómo responde el asistente de una ferretería de ejemplo.</p>
              <DemoWhatsApp />
            </div>
          </section>
        )}

        {/* Antes y con Noda */}
        {s.antesConNoda && (
          <section className="p3-sec p3-sec-c">
            <div className="p3-wrap">
              <h2 className="p3-eyebrow">Antes y con Noda</h2>
              <div className="pa-antes">
                <div className="pa-antes-col pa-antes-col--antes">
                  <h3 className="pa-antes-t">Antes</h3>
                  <ul className="pa-antes-lista">
                    {s.antesConNoda.map((x) => <li key={x.antes}>{x.antes}</li>)}
                  </ul>
                </div>
                <div className="pa-antes-col pa-antes-col--con">
                  <h3 className="pa-antes-t">Con Noda</h3>
                  <ul className="pa-antes-lista">
                    {s.antesConNoda.map((x) => <li key={x.con}>{x.con}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Qué incluye (con íconos) · Ideal para */}
        <section className="p3-sec p3-sec-c">
          <div className="p3-wrap p3-dos">
            <div className="p3-caja">
              <h2 className="p3-caja-t">Qué incluye</h2>
              <QueIncluye items={s.incluye} iconos={esAtencion ? ICONOS_INCLUYE_ATENCION : undefined} />
            </div>
            <div className="p3-caja">
              <h2 className="p3-caja-t">Ideal para</h2>
              <p className="p3-ideal p3-mayus">{s.idealPara}</p>
            </div>
          </div>
        </section>

        {/* Dato con fuente (si el servicio tiene una cifra aprobada) */}
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

        {/* Caso real (VyR) */}
        {s.casoVyR && <Caso id="caso" compacto />}

        {/* Preguntas frecuentes */}
        <Faq preguntas={s.faq} titulo="Preguntas frecuentes" />

        {/* Precio (servicios con precio) o "Cotiza a medida" + botón de WhatsApp */}
        {precio
          ? <BloquePrecio slug={s.slug} whatsapp={whatsapp} />
          : <Cierre palabra="" titulo="Cotiza a medida" sub="" texto="" boton="Cotiza por WhatsApp" href={whatsapp} correo={false} />}

        {/* Se combina con */}
        {relacionados.length > 0 && (
          <section className="p3-sec p3-sec-c">
            <div className="p3-wrap">
              <h2 className="p3-eyebrow">Se combina con</h2>
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
      </Marco>
    );
  }

  return (
    <Marco>
      {/* Título y subtítulo */}
      <section className="p3-pag-head">
        <div className="p3-wrap">
          <nav className="p3-miga" aria-label="Ruta de navegación">
            <Link href="/servicios">Servicios</Link><span aria-hidden="true">/</span><span aria-current="page">{s.corto}</span>
          </nav>
          <span className="p3-srv-head-ico p3-ico-linea"><IconoServicio icono={s.icono} size={28} /></span>
          <span className="p3-eyebrow">Servicio{s.destacado && <span className="p3-estrella">Servicio estrella</span>}</span>
          <h1 className="p3-pag-h1">{s.nombre}</h1>
          <p className="p3-pag-sub">{s.subtitulo}</p>
          <div className="p3-pag-acc">
            {precio
              ? <a href="#precio" className="p3-btn p3-btn-acento p3-shine">Ver precio</a>
              : <a href={whatsapp} className="p3-btn p3-btn-acento p3-shine">Cotiza a medida</a>}
            {precio?.modulos
              ? <Link href={RUTA_COTIZADOR} className="p3-btn p3-btn-outline">Cotiza el tuyo</Link>
              : <a href="#ejemplo" className="p3-btn p3-btn-outline">Ver la demo</a>}
          </div>
          {precio && <p className="p3-precio-cab"><LineaPrecio slug={s.slug} /></p>}
        </div>
      </section>

      {/* El problema */}
      <section className="p3-sec p3-sec-c">
        <div className="p3-wrap">
          <h2 className="p3-eyebrow">El problema</h2>
          <p className="p3-problema-txt">{s.problema}</p>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="p3-sec p3-sec-c">
        <div className="p3-wrap">
          <h2 className="p3-eyebrow">Cómo funciona</h2>
          <ol className="p3-pasos p3-pasos-3">
            {s.pasos.map((p, k) => (
              <li key={p} className="p3-paso">
                <span className="p3-paso-num">{String(k + 1).padStart(2, "0")}</span>
                <p className="p3-paso-txt">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Qué incluye · Ideal para */}
      <section className="p3-sec p3-sec-c">
        <div className="p3-wrap p3-dos">
          <div className="p3-caja">
            <h2 className="p3-caja-t">Qué incluye</h2>
            <ul className="p3-lista p3-mayus">{s.incluye.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="p3-caja">
            <h2 className="p3-caja-t">Ideal para</h2>
            <p className="p3-ideal p3-mayus">{s.idealPara}</p>
          </div>
        </div>
      </section>

      {/* Dato con fuente (solo si el servicio tiene una cifra aprobada) */}
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

      {/* Conversación de ejemplo (siempre con la etiqueta "Demo") */}
      <section className="p3-sec p3-sec-c" id="ejemplo">
        <div className={`p3-wrap p3-demo${d.tipo === "web" || d.tipo === "panel" ? " p3-demo--ancha" : ""}`}>
          <div>
            {d.tipo === "web" || d.tipo === "panel" ? (
              <>
                <span className="p3-eyebrow">Ejemplo <span className="p3-demo-tag">Demo</span></span>
                <h2 className="p3-h2">{d.titulo}</h2>
                <p className="p3-p">{d.intro}</p>
                <p className="p3-demo-nota">{d.tipo === "web" ? d.nota : "Imagen de ejemplo: cada panel se diseña según los procesos de tu negocio."}</p>
              </>
            ) : (
              <>
                <h2 className="p3-eyebrow">Conversación de ejemplo <span className="p3-demo-tag">Demo</span></h2>
                {d.tipo === "chat" && <p className="p3-p">{d.intro}</p>}
                {d.tipo === "chat" && <p className="p3-demo-nota">Es una simulación: las respuestas son de ejemplo y no se envía ningún mensaje real.</p>}
                {d.aviso && <p className="p3-demo-aviso">{d.aviso}</p>}
              </>
            )}
          </div>
          {d.tipo === "chat" && <ChatDemo demo={d} />}
          {d.tipo === "conversacion" && <div className="p3-demo-fono"><Telefono nombre={d.negocio} mensajes={d.mensajes} /></div>}
          {d.tipo === "web" && <MaquetaWeb />}
          {d.tipo === "panel" && <MaquetaPanel />}
        </div>
      </section>

      {/* Caso real (VyR), solo en los servicios que el laboratorio usa */}
      {s.casoVyR && <Caso id="caso" compacto />}

      {/* Preguntas frecuentes */}
      <Faq preguntas={s.faq} titulo="Preguntas frecuentes" />

      {/* Precio (servicios con precio) o "Cotiza a medida", junto al botón de WhatsApp */}
      {precio
        ? <BloquePrecio slug={s.slug} whatsapp={whatsapp} />
        : <Cierre palabra="" titulo="Cotiza a medida" sub="" texto="" boton="Cotiza por WhatsApp" href={whatsapp} correo={false} />}

      {/* Se combina con */}
      {relacionados.length > 0 && (
        <section className="p3-sec p3-sec-c">
          <div className="p3-wrap">
            <h2 className="p3-eyebrow">Se combina con</h2>
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
    </Marco>
  );
}
