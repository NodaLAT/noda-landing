export default function Soluciones() {
  return (
    <section id="soluciones">
      <div className="container reveal">
        <span className="section-eyebrow">Soluciones</span>
        <h2>No te lo contamos. <em>Te lo mostramos.</em></h2>
        <p className="section-sub">
          No vendemos paquetes fijos. Diagnosticamos qué proceso te consume más tiempo y diseñamos la solución.
          Estos son los frentes donde más impacto generamos — cada uno funcionando de verdad.
        </p>
        <div className="sol-grid">

          <div className="sol-card">
            <div className="sol-visual">
              <div className="mc u"><span>¿Tienen turno para hoy? 🩸</span></div>
              <div className="mc b"><span>¡Hola! Sí, tengo espacio a las 3:00 pm.</span></div>
              <div className="mc b"><span>¿Te lo reservo?</span></div>
            </div>
            <h3 className="sol-title">Atención y ventas 24/7</h3>
            <p className="sol-desc">Tu asistente conversa, resuelve y deriva a humano cuando hay señal de compra. En WhatsApp, en menos de 3 segundos.</p>
          </div>

          <div className="sol-card">
            <div className="sol-visual">
              <div className="confirm">
                <span className="confirm-ico">✓</span>
                <span>
                  <span className="confirm-t">Cita confirmada</span><br />
                  <span className="confirm-s">Mañana · 10:00 am</span><br />
                  <span className="confirm-badge">Recordatorio enviado</span>
                </span>
              </div>
            </div>
            <h3 className="sol-title">Agendamiento y recordatorios</h3>
            <p className="sol-desc">Citas reservadas solas, confirmaciones automáticas y recordatorios 24h antes. Reduce los no-shows a la mitad.</p>
          </div>

          <div className="sol-card">
            <div className="sol-visual">
              <div className="pf">
                <div className="pf-head">Cotización</div>
                <div className="pf-row"><span>Cemento Holcim 50kg</span><b>$8.50</b></div>
                <div className="pf-row"><span>Varilla 12mm × 6m</span><b>$11.20</b></div>
                <div className="pf-row"><span>5 sacos arena</span><b>$25.00</b></div>
                <div className="pf-total"><span>Total</span><b>$44.70</b></div>
              </div>
            </div>
            <h3 className="sol-title">Cotizaciones al instante</h3>
            <p className="sol-desc">Tus clientes piden precio y reciben la proforma completa en segundos, con tu formato y tus márgenes. Sin tocar una hoja de cálculo.</p>
          </div>

          <div className="sol-card">
            <div className="sol-visual">
              <div className="dk-row">
                <div className="dk-kpi"><div className="dk-num">47</div><div className="dk-label">Consultas</div></div>
                <div className="dk-kpi"><div className="dk-num">12</div><div className="dk-label">Citas hoy</div></div>
              </div>
              <div className="dk-bars">
                <div className="dk-bar" style={{ height: "38%" }}></div><div className="dk-bar" style={{ height: "55%" }}></div>
                <div className="dk-bar" style={{ height: "44%" }}></div><div className="dk-bar" style={{ height: "70%" }}></div>
                <div className="dk-bar" style={{ height: "60%" }}></div><div className="dk-bar pk" style={{ height: "92%" }}></div>
              </div>
            </div>
            <h3 className="sol-title">Reportes y dashboards</h3>
            <p className="sol-desc">Convertimos los datos que ya genera tu negocio en reportes claros que llegan a tu correo o WhatsApp. Decides con información real.</p>
          </div>

          <div className="sol-card">
            <div className="sol-visual">
              <div className="ld"><span className="ld-av">MV</span><span className="ld-info"><span className="ld-name">María V. — Ecografía</span><br /><span className="ld-status">Pidió precio · 2h</span></span><span className="ld-tag a">Activo</span></div>
              <div className="ld"><span className="ld-av">JR</span><span className="ld-info"><span className="ld-name">Juan R. — Examen sangre</span><br /><span className="ld-status">Sin respuesta · 48h</span></span><span className="ld-tag w">Reactivar</span></div>
              <div className="ld"><span className="ld-av">CT</span><span className="ld-info"><span className="ld-name">Carla T. — Perfil lipídico</span><br /><span className="ld-status">Cita confirmada · 14:00</span></span><span className="ld-tag c">Cerrado</span></div>
            </div>
            <h3 className="sol-title">CRM y seguimiento de leads</h3>
            <p className="sol-desc">Cada lead llega registrado, etiquetado y con seguimiento automático. Reactivamos a los fríos y avisamos cuando hay señal de compra.</p>
          </div>

          <div className="sol-card">
            <div className="sol-visual">
              <div className="chk"><i>✓</i><span>Recordatorios de pago automáticos</span></div>
              <div className="chk"><i>✓</i><span>Onboarding de clientes sin fricción</span></div>
              <div className="chk"><i>✓</i><span>Integración con tu ERP o CRM</span></div>
              <div className="chk"><i>✓</i><span>Generación de documentos</span></div>
            </div>
            <h3 className="sol-title">Procesos internos a medida</h3>
            <p className="sol-desc">Cobranzas, onboarding, integraciones, notificaciones internas. Si lo haces a mano todos los días, lo automatizamos.</p>
          </div>

        </div>
        <div className="services-note">
          ¿Tienes un proceso que no encaja en estas cajas? <strong>Cuéntanoslo.</strong>{" "}
          Nuestra premisa es simple: si es repetitivo y consume tiempo humano, hay forma de automatizarlo.
        </div>
      </div>
    </section>
  );
}
