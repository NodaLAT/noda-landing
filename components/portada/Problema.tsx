import { CIFRAS } from "@/lib/servicios";
import Contador from "./Contador";

// El problema — título, texto y 4 cifras con su fuente visible (cifras en lib/servicios.ts).
// PENDIENTE: el título y el texto salen de docs/contenido-web-v3.md, que todavía no está en el repo.
const TITULO = "[PENDIENTE: título de «El problema» de docs/contenido-web-v3.md]";
const TEXTO = "[PENDIENTE: texto de «El problema» de docs/contenido-web-v3.md]";
const LISTA = [CIFRAS.respuesta, CIFRAS.repetitivas, CIFRAS.horas, CIFRAS.whatsapp];

export default function Problema() {
  return (
    <section className="p3-sec" id="problema">
      <div className="p3-wrap">
        <span className="p3-eyebrow">El problema</span>
        <h2 className="p3-h2 p3-pendiente-t">{TITULO}</h2>
        <p className="p3-p p3-pendiente-t">{TEXTO}</p>
        <ul className="p3-cifras">
          {LISTA.map((c) => (
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
