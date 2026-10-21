export default function Casos() {
  return (
    <section id="casos" className="band-beige">
      <div className="container reveal">
        <span className="section-eyebrow">Caso en marcha</span>
        <h2>Negocios reales que ya están <em>moviendo</em> sus procesos a Noda.</h2>
        <p className="section-sub">
          Trabajamos con negocios de distintos tamaños y sectores. Cada implementación se diseña sobre el flujo
          real del cliente — no copiamos plantillas.
        </p>
        <div className="case-spotlight">
          <div className="case-card-large">
            <div className="case-header">
              <div className="case-mark">VR</div>
              <div>
                <div className="case-sector">Salud · Laboratorios clínicos</div>
                <div className="case-name">Laboratorios VyR San Rafael</div>
              </div>
            </div>
            <p className="case-desc">
              Atención al paciente automatizada por WhatsApp las 24 horas, entrega automática de resultados
              e interpretación con IA de cada resultado. La recepción se libera para concentrarse en lo que
              realmente requiere atención humana.
            </p>
            <ul className="case-impact">
              <li><strong>Atención 24/7:</strong> precios, horarios, servicios y estado de resultados</li>
              <li><strong>Entrega automática</strong> de resultados por WhatsApp</li>
              <li><strong>Interpretación de resultados</strong> con IA</li>
              <li><strong>Paso a la secretaria</strong> cuando hace falta</li>
            </ul>
            <div className="case-tags">
              <span className="case-tag">Bot de WhatsApp</span>
              <span className="case-tag">Entrega de resultados</span>
              <span className="case-tag">Interpretación con IA</span>
              <span className="case-tag">Atención híbrida</span>
            </div>
          </div>
          {/* Conversación de ejemplo: valores inventados, sin datos de pacientes reales */}
          <div className="chat-mockup">
            <div className="chat-header">
              <div className="chat-avatar">VR</div>
              <div><div className="chat-name">VyR San Rafael · Bot Noda</div><div className="chat-status">en línea</div></div>
              <span className="demo-tag">Demo</span>
            </div>
            <div className="messages">
              <div className="msg msg-bot">¡Hola! 👋 Tu resultado de laboratorio ya está listo. Te lo envío por aquí:</div>
              <div className="msg msg-bot">📄 Resultado_laboratorio.pdf</div>
              <div className="msg msg-user">Gracias. ¿Qué significan los valores?</div>
              <div className="msg msg-bot">Tu glucosa (90 mg/dL) está dentro de lo normal. Tu colesterol (210 mg/dL) está un poco por encima del valor de referencia.</div>
              <div className="msg msg-bot">Esta explicación es orientativa y no reemplaza la consulta con tu médico.</div>
            </div>
          </div>
        </div>
        <div className="sectors-strip">
          <span className="sectors-label">Sectores que atendemos</span>
          <div className="sectors-list">
            <span>Salud y laboratorios</span><span>Comercio y retail</span><span>Restaurantes</span>
            <span>Clínicas y consultorios</span><span>Talleres y servicios</span><span>Constructoras</span>
            <span>Veterinarias</span><span>Inmobiliarias</span>
          </div>
        </div>
      </div>
    </section>
  );
}
