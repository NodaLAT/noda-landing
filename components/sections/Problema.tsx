export default function Problema() {
  return (
    <section id="problema">
      <div className="container reveal">
        <span className="section-eyebrow">El problema</span>
        <h2>Tu equipo gasta horas en tareas que una <em>IA</em> puede hacer sola.</h2>
        <p className="section-sub">
          Atención al cliente fragmentada, citas perdidas, cotizaciones que demoran días, leads que se enfrían,
          reportes que nadie arma. La mayoría de negocios viven con los mismos cuellos de botella — y todos
          tienen el mismo origen: procesos repetitivos hechos a mano.
        </p>
        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-num">01 / Atención fragmentada</div>
            <h3 className="problem-title">Mensajes sin responder a las 8pm</h3>
            <p className="problem-desc">Tus clientes escriben a cualquier hora. Si no contestas en minutos, se van con la competencia. Contratar a alguien de turno nocturno cuesta más de $400/mes.</p>
          </div>
          <div className="problem-card">
            <div className="problem-num">02 / Citas y cotizaciones</div>
            <h3 className="problem-title">Agendamiento manual y proformas que demoran</h3>
            <p className="problem-desc">Citas duplicadas, horarios mal anotados, cotizaciones que tardan días en salir. Cada error es ingreso que se pierde y cada cliente molesto es una reseña negativa potencial.</p>
          </div>
          <div className="problem-card">
            <div className="problem-num">03 / Procesos repetitivos</div>
            <h3 className="problem-title">Tu equipo hace lo mismo todo el día</h3>
            <p className="problem-desc">Confirmar citas, enviar recordatorios, responder precios, hacer seguimiento, mandar resultados. Más del 40% de los trabajadores dedica al menos una cuarta parte de su semana a tareas repetitivas, y un sistema puede hacerlas solo.</p>
            <p className="source-note">Fuente: Smartsheet, Automation in the Workplace</p>
          </div>
          <div className="problem-card">
            <div className="problem-num">04 / Cero datos, cero decisiones</div>
            <h3 className="problem-title">No sabes qué pasa en tu propio negocio</h3>
            <p className="problem-desc">¿Cuántas consultas recibiste esta semana? ¿Cuántos leads no respondieron? ¿Qué servicios piden más? Sin automatización no hay datos. Sin datos, decides a ciegas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
