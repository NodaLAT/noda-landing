// 3.5 Preguntas frecuentes — acordeón accesible con <details>/<summary> (sin JS). Textos de docs/contenido-web-v3.md.
// Sin props muestra las preguntas de la portada; las páginas de servicio le pasan las suyas.
export type Pregunta = { pregunta: string; respuesta: string };

const PREGUNTAS: Pregunta[] = [
  { pregunta: "¿Necesito saber de tecnología?", respuesta: "No. Nosotros nos encargamos de todo; tú solo nos cuentas cómo funciona tu negocio." },
  { pregunta: "¿Cuánto cuesta?", respuesta: "Depende de lo que quieras automatizar. Después del diagnóstico gratuito te damos una propuesta con precio claro." },
  { pregunta: "¿Funciona con mi número de WhatsApp?", respuesta: "Trabajamos con WhatsApp Business oficial. En el diagnóstico revisamos tu caso." },
  { pregunta: "¿Qué pasa si la IA no sabe responder algo?", respuesta: "Pasa la conversación a una persona de tu equipo." },
  { pregunta: "¿Cuánto tarda la implementación?", respuesta: "La primera automatización suele quedar lista en unos 7 días." },
];

export default function Faq({ preguntas = PREGUNTAS, titulo = "Lo que más nos preguntan." }: {
  preguntas?: Pregunta[];
  titulo?: string;
}) {
  return (
    <section className="p3-sec" id="preguntas">
      <div className="p3-wrap p3-faq-wrap">
        <span className="p3-eyebrow">Preguntas</span>
        <h2 className="p3-h2">{titulo}</h2>
        <div className="p3-faq">
          {preguntas.map((p) => (
            <details key={p.pregunta} className="p3-faq-item">
              <summary className="p3-faq-q">
                <span>{p.pregunta}</span>
                <span className="p3-faq-ico" aria-hidden="true" />
              </summary>
              <p className="p3-faq-a">{p.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
