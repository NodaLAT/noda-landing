import { CIFRAS_PROBLEMA } from "@/lib/servicios";
import Contador from "./Contador";

// El problema — título, texto y 4 cifras con su fuente visible (docs/contenido-web-v3.md, sección 3).
export default function Problema() {
  return (
    <section className="p3-sec" id="problema">
      <div className="p3-wrap">
        <span className="p3-eyebrow">El problema</span>
        <h2 className="p3-h2">Tus clientes escriben a toda hora. Tu equipo no puede estar en todas.</h2>
        <p className="p3-p">Mensajes sin responder, citas que se olvidan, cotizaciones que tardan. Cada una es una venta que se va a la competencia.</p>
        <ul className="p3-cifras">
          {CIFRAS_PROBLEMA.map((c) => (
            <li key={c.cifra} className="p3-cifra">
              <span className="p3-cifra-num"><Contador valor={c.cifra} /></span>
              <p className="p3-cifra-txt">{c.texto}</p>
              <p className="p3-cifra-fuente">Fuente: {c.fuente}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
