export default function PorQue() {
  return (
    <section id="por-que">
      <div className="container reveal">
        <div className="why-grid">
          <div>
            <span className="section-eyebrow">Por qué Noda</span>
            <h2>No somos otra <em>agencia</em>. Somos tu equipo de automatización.</h2>
            <div className="why-points">
              <div className="why-point">
                <svg className="why-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                <div className="why-content"><h3>Tecnología de última generación, sin enredos</h3><p>Trabajamos con WhatsApp oficial de Meta e inteligencia artificial de última generación. Tú no tienes que entender nada — nosotros lo dejamos andando.</p></div>
              </div>
              <div className="why-point">
                <svg className="why-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <div className="why-content"><h3>Implementación rápida, no proyectos eternos</h3><p>Tu primera automatización funcionando en 7 días. Iteramos con datos reales, no con suposiciones.</p></div>
              </div>
              <div className="why-point">
                <svg className="why-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                <div className="why-content"><h3>Soporte humano, no chatbot que te ignora</h3><p>Cuando tienes un problema, contestamos como personas. Sin tickets eternos ni call centers tercerizados.</p></div>
              </div>
            </div>
          </div>
          <div className="why-visual">
            <div className="stat-block"><div className="stat-num">7x</div><div className="stat-label">Más probabilidades de concretar un cliente cuando respondes en la primera hora</div><div className="source-note">Fuente: Harvard Business Review</div></div>
            <div className="stat-block"><div className="stat-num">-25%</div><div className="stat-label">Inasistencias cuando tus clientes reciben recordatorios</div><div className="source-note">Fuente: BMJ Open</div></div>
            <div className="stat-block"><div className="stat-num">+6 h</div><div className="stat-label">Por semana que un trabajador estima recuperar automatizando tareas repetitivas</div><div className="source-note">Fuente: Smartsheet</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
