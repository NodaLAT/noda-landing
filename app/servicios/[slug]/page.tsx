import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICIOS, mensajeInteres, numeroServicio, textoPrecio, type CasoReal } from "@/lib/servicios";
import { whatsappLink } from "@/lib/site";
import { Flecha } from "@/components/servicios/Iconos";
import ChatDemo from "@/components/servicios/ChatDemo";
import { MaquetaPanel, MaquetaWeb } from "@/components/servicios/Maquetas";

// Plantilla única para todas las páginas /servicios/[slug].
// Solo existen las direcciones de los servicios en lib/servicios.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICIOS.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.seo.titulo,
    description: s.seo.descripcion,
    openGraph: { title: `${s.seo.titulo} | Noda`, description: s.seo.descripcion },
  };
}

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params;
  const indice = SERVICIOS.findIndex((x) => x.slug === slug);
  if (indice < 0) notFound();
  const s = SERVICIOS[indice];
  const whatsapp = whatsappLink(mensajeInteres(s));

  return (
    <>
      {/* 1. Encabezado */}
      <section className="page-head">
        <div className="container">
          <nav className="breadcrumb hero-anim hero-d1" aria-label="Ruta de navegación">
            <Link href="/servicios">Servicios</Link><span aria-hidden="true">/</span><span>{s.nombre}</span>
          </nav>
          <div className="head-tags hero-anim hero-d1">
            <span className="section-eyebrow">Servicio {numeroServicio(indice)}</span>
            {s.destacado && <span className="svc-badge">★ Servicio estrella</span>}
          </div>
          <h1 className="hero-anim hero-d2">{s.nombre}</h1>
          <p className="hero-sub hero-anim hero-d3">{s.promesa}</p>
          <div className="hero-actions hero-anim hero-d4">
            <a href={whatsapp} className="btn btn-primary">Quiero este servicio <Flecha /></a>
            <a href="#ejemplo" className="btn btn-ghost">Ver el ejemplo</a>
          </div>
          <span className="price-pill hero-anim hero-d4">{textoPrecio(s.precio)}</span>
        </div>
      </section>

      {/* 2. El problema */}
      <section>
        <div className="container reveal">
          <div className="svc-split">
            <div>
              <span className="section-eyebrow">El problema</span>
              <h2>{s.problema.titulo}</h2>
              <p className="section-sub">{s.problema.texto}</p>
            </div>
            <div className="case-card-large">
              <div className="list-title">¿Te suena familiar?</div>
              <ul className="case-impact">
                {s.problema.puntos.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Ejemplo interactivo */}
      <section id="ejemplo" className="band-beige">
        <div className="container reveal">
          <div className={s.demo.tipo === "chat" ? "demo-grid" : "demo-grid demo-grid--wide"}>
            <div>
              <div className="head-tags">
                <span className="section-eyebrow">Ejemplo</span>
                <span className="demo-tag">Demo</span>
              </div>
              <h2>{s.demo.titulo}</h2>
              <p className="section-sub">{s.demo.intro}</p>
              {s.demo.tipo === "web" && <p className="demo-note"><strong>Mira a tu alrededor.</strong> {s.demo.nota}</p>}
              {s.demo.tipo === "chat" && <p className="demo-note">Es una simulación: las respuestas son de ejemplo y no se envía ningún mensaje real.</p>}
              {s.demo.tipo === "panel" && <p className="demo-note">Imagen de ejemplo: cada panel se diseña según los procesos de tu negocio.</p>}
            </div>
            {s.demo.tipo === "chat" && <ChatDemo demo={s.demo} />}
            {s.demo.tipo === "web" && <MaquetaWeb />}
            {s.demo.tipo === "panel" && <MaquetaPanel />}
          </div>
        </div>
      </section>

      {/* 4. Cómo funciona */}
      <section>
        <div className="container reveal">
          <span className="section-eyebrow">Cómo funciona</span>
          <h2>Así lo ponemos en marcha, en <em>4 pasos</em>.</h2>
          <div className="steps">
            {s.pasos.map((p, k) => (
              <div className="step" key={p.titulo}>
                <div className="step-num">{numeroServicio(k)}</div>
                <h3 className="step-title">{p.titulo}</h3>
                <p className="step-desc">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Caso real (solo si el servicio tiene uno) */}
      {s.caso && <Caso caso={s.caso} />}

      {/* 6. Cierre con WhatsApp */}
      <section className="band-dark">
        <div className="container reveal">
          <div className="close-head">
            <span className="section-eyebrow">Hablemos</span>
            <h2>¿Lo quieres para tu negocio?</h2>
            <p className="section-sub">
              Escríbenos por WhatsApp y cuéntanos cómo trabajas hoy. Te mostramos cómo funcionaría en tu negocio, sin compromiso.
            </p>
          </div>
          <div className="close-actions">
            <a href={whatsapp} className="btn btn-light">Escribir por WhatsApp <Flecha /></a>
            <Link href="/servicios" className="contact-link">Ver todos los servicios <Flecha size={15} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Caso({ caso }: { caso: CasoReal }) {
  const tieneLateral = caso.videoProximamente || !!caso.conversacion;
  return (
    <section className="band-beige">
      <div className="container reveal">
        <span className="section-eyebrow">Caso real</span>
        <h2>Ya funciona en un negocio <em>real</em>.</h2>
        <div className={tieneLateral ? "case-spotlight" : "case-spotlight case-spotlight--single"}>
          <div className="case-card-large">
            <div className="case-header">
              <div className="case-mark">{caso.iniciales}</div>
              <div>
                <div className="case-sector">{caso.sector} · {caso.ciudad}</div>
                <div className="case-name">{caso.negocio}</div>
              </div>
            </div>
            <p className="case-desc">{caso.descripcion}</p>
            {caso.puntos && (
              <ul className="case-impact">
                {caso.puntos.map((p) => <li key={p}>{p}</li>)}
              </ul>
            )}
            {caso.etiquetas && (
              <div className="case-tags">
                {caso.etiquetas.map((t) => <span className="case-tag" key={t}>{t}</span>)}
              </div>
            )}
          </div>

          {caso.videoProximamente ? (
            <div className="video-slot">
              <span className="video-play" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <span className="video-label">Video próximamente</span>
              <span className="video-text">El flujo real, tal como funciona hoy en {caso.negocio}.</span>
            </div>
          ) : caso.conversacion && (
            <div className="chat-mockup">
              <div className="chat-header">
                <div className="chat-avatar">{caso.iniciales}</div>
                <div><div className="chat-name">VyR San Rafael · Bot Noda</div><div className="chat-status">en línea</div></div>
              </div>
              <div className="messages">
                {caso.conversacion.map((m) => (
                  <div key={m.texto} className={m.de === "cliente" ? "msg msg-user" : "msg msg-bot"}>{m.texto}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
