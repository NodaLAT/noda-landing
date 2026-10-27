import { WHATSAPP_URL, EMAIL } from "@/lib/site";
import Obj3D from "./Obj3D";

// Cierre: palabra "HABLEMOS" gigante con el isotipo grande flotando delante.
export default function Cierre() {
  return (
    <section className="v3-seccion v3-seccion--coral v3-cierre" id="contacto">
      <span className="v3-cierre-word" aria-hidden="true">HABLEMOS</span>
      <div className="container">
        <Obj3D name="isotipo" ancho={210} className="v3-cierre-isotipo" />
        <h2>Te mostramos un sistema funcionando en vivo y vemos qué automatizar primero.</h2>
        <p className="v3-cierre-sub">
          Diagnóstico de 30 minutos, gratis y sin compromiso. En 48 horas te damos una propuesta a medida.
        </p>
        <div className="v3-cierre-actions">
          <a href={WHATSAPP_URL} className="v3-btn v3-btn--primario">
            Escríbenos por WhatsApp <span className="flecha" aria-hidden="true">→</span>
          </a>
          <a href={`mailto:${EMAIL}`} className="v3-btn v3-btn--fantasma">{EMAIL}</a>
        </div>
      </div>
    </section>
  );
}
