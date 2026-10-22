import { Fragment, type CSSProperties } from "react";
import { WHATSAPP_DIAGNOSTICO_URL } from "@/lib/site";
import HeroPhoneDemo from "./HeroPhoneDemo";
import HeroStory from "./HeroStory";

// Título dividido en palabras para que aparezcan una por una (animación en CSS: no espera al JavaScript).
// [palabra, destacada]
const TITULO: [string, boolean][] = [
  ["Si", false], ["tu", false], ["negocio", false], ["lo", false], ["repite", true], ["todos", false],
  ["los", false], ["días,", false], ["nosotros", false], ["lo", false], ["automatizamos.", false],
];

export default function Hero() {
  return (
    <section className="hero hero-story">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-intro">
            <div>
              <span className="hero-eyebrow hero-anim hero-d1">Aceptando nuevos clientes — atención global</span>
              <h1 className="hero-title">
                {TITULO.map(([palabra, destacada], i) => (
                  <Fragment key={i}>
                    <span className="hero-word" style={{ "--i": i } as CSSProperties}>
                      {destacada ? <em>{palabra}</em> : palabra}
                    </span>
                    {i < TITULO.length - 1 && " "}
                  </Fragment>
                ))}
              </h1>
              <p className="hero-sub hero-anim hero-d3">
                Noda es una agencia de automatización con IA. Construimos asistentes de WhatsApp,
                agendamiento, cotizaciones, interpretación de documentos con IA, webs y sistemas
                a la medida de tu negocio. Sin contratar más personal, sin programar nada.
              </p>
              <div className="hero-actions hero-anim hero-d4">
                <a href={WHATSAPP_DIAGNOSTICO_URL} className="btn btn-primary">
                  Agenda tu diagnóstico gratis
                  <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </a>
                <a href="#soluciones" className="btn btn-ghost">Ver qué hacemos</a>
              </div>
            </div>
          </div>
          <div className="hero-visual hero-anim hero-d5">
            <HeroPhoneDemo />
          </div>
          {/* Sección protagonista: en computadora el teléfono queda fijo mientras pasan estas 4 escenas */}
          <HeroStory />
        </div>
      </div>
    </section>
  );
}
