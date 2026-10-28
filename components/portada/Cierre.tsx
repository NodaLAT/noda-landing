import { WHATSAPP_URL } from "@/lib/site";
import { Flecha } from "./Iconos";

// 3.6 Cierre — bloque con el color "cierre" (#1d4a4f en el tema mixto).
// Sin props muestra el cierre de la portada; las otras páginas cambian textos, botón y enlace.
export default function Cierre({
  titulo = "¿Tu proceso no está aquí? Lo diseñamos contigo.",
  sub = "Diagnóstico de 30 minutos, gratis y sin compromiso.",
  texto = "En 48 horas te damos una propuesta a medida.",
  boton = "Escríbenos por WhatsApp",
  href = WHATSAPP_URL,
}: { titulo?: string; sub?: string; texto?: string; boton?: string; href?: string }) {
  return (
    <section className="p3-cierre" id="contacto">
      <div className="p3-wrap">
        <h2 className="p3-cierre-t">{titulo}</h2>
        <p className="p3-cierre-s">{sub}</p>
        {texto && <p className="p3-cierre-p">{texto}</p>}
        <a href={href} className="p3-btn p3-btn-cierre">
          {boton}
          <Flecha />
        </a>
      </div>
    </section>
  );
}
