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
              Atención al paciente automatizada por WhatsApp, agendamiento de exámenes, recordatorios previos
              a la toma de muestra y entrega de resultados sin fricción. La recepción se libera para concentrarse
              en lo que realmente requiere atención humana.
            </p>
            <ul className="case-impact">
              <li><strong>Recepción liberada</strong> de consultas repetitivas a lo largo del día</li>
              <li><strong>Agendamiento sin fricción</strong>, disponible 24/7 desde WhatsApp</li>
              <li><strong>Recordatorios automáticos</strong> 24h antes que reducen no-shows</li>
              <li><strong>Reporte diario</strong> al equipo con consultas y citas del día</li>
            </ul>
            <div className="case-tags">
              <span className="case-tag">Bot de WhatsApp</span>
              <span className="case-tag">Agendamiento</span>
              <span className="case-tag">Recordatorios 24h</span>
              <span className="case-tag">Reportes</span>
            </div>
          </div>
          <div className="chat-mockup">
            <div className="chat-header">
              <div className="chat-avatar">VR</div>
              <div><div className="chat-name">VyR San Rafael · Bot Noda</div><div className="chat-status">en línea</div></div>
            </div>
            <div className="messages">
              <div className="msg msg-user">Hola, necesito agendar un perfil lipídico</div>
              <div className="msg msg-bot">¡Hola! Claro 🩸 ¿Para qué fecha lo necesitas?</div>
              <div className="msg msg-user">Mañana en la mañana</div>
              <div className="msg msg-bot">✅ Listo. Te agendé mañana 8:30 AM. Recuerda venir en ayunas (8h). Te enviaré recordatorio esta noche.</div>
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
