import { EMAIL, WHATSAPP_URL } from "@/lib/site";
import { Flecha } from "./Iconos";

// 3.6 Cierre — bloque con el color "cierre" (#1d4a4f en el tema mixto). Textos de docs/contenido-web-v3.md.
// Sin props muestra el cierre de la portada; las otras páginas cambian textos, botón y enlace.
export default function Cierre({
  palabra = "Hablemos",
  titulo = "Te mostramos un sistema funcionando en vivo y vemos qué automatizar primero.",
  sub = "Diagnóstico de 30 minutos, gratis y sin compromiso.",
  texto = "En 48 horas te damos una propuesta a medida.",
  boton = "Escríbenos por WhatsApp",
  href = WHATSAPP_URL,
  correo = true,
}: { palabra?: string; titulo?: string; sub?: string; texto?: string; boton?: string; href?: string; correo?: boolean }) {
  return (
    <section className="p3-cierre" id="contacto">
      <div className="p3-wrap">
        {palabra && <p className="p3-cierre-palabra">{palabra}</p>}
        <h2 className="p3-cierre-t">{titulo}</h2>
        {sub && <p className="p3-cierre-s">{sub}</p>}
        {texto && <p className="p3-cierre-p">{texto}</p>}
        <div className="p3-cierre-acc">
          <a href={href} className="p3-btn p3-btn-cierre">
            {boton}
            <Flecha />
          </a>
          {correo && <a href={`mailto:${EMAIL}`} className="p3-btn p3-btn-cierre-2">{EMAIL}</a>}
        </div>
      </div>
    </section>
  );
}
