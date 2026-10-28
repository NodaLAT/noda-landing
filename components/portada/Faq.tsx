// 3.5 Preguntas frecuentes — acordeón accesible con <details>/<summary> (sin JS).
const PREGUNTAS = [
  { q: "¿Necesito saber de tecnología?", a: "No. Nosotros nos encargamos de todo; tú solo nos cuentas cómo funciona tu negocio." },
  { q: "¿Cuánto cuesta?", a: "Depende de lo que quieras automatizar. Después del diagnóstico gratuito te damos una propuesta con precio claro." },
  { q: "¿Funciona con mi número de WhatsApp?", a: "Trabajamos con WhatsApp Business oficial. En el diagnóstico revisamos tu caso." },
  { q: "¿Qué pasa si la IA no sabe responder algo?", a: "Pasa la conversación a una persona de tu equipo." },
  { q: "¿Cuánto tarda la implementación?", a: "La primera automatización suele quedar lista en unos 7 días." },
];

export default function Faq() {
  return (
    <section className="p3-sec" id="preguntas">
      <div className="p3-wrap p3-faq-wrap">
        <span className="p3-eyebrow">Preguntas</span>
        <h2 className="p3-h2">Lo que más nos preguntan.</h2>
        <div className="p3-faq">
          {PREGUNTAS.map((p) => (
            <details key={p.q} className="p3-faq-item">
              <summary className="p3-faq-q">
                <span>{p.q}</span>
                <span className="p3-faq-ico" aria-hidden="true" />
              </summary>
              <p className="p3-faq-a">{p.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
