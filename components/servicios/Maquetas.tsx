// Maquetas visuales (no interactivas) para los servicios 7 y 8.
// Todo el contenido es de ejemplo: sin clientes ni datos reales.

function Navegador({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="mock-wrap">
      <span className="demo-tag">Demo</span>
      <div className="mock-browser" role="img" aria-label={`Ejemplo ilustrativo: ${url}`}>
        <div className="mock-bar" aria-hidden="true">
          <span className="mock-dots"><i /><i /><i /></span>
          <span className="mock-url">{url}</span>
        </div>
        <div aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

export function MaquetaWeb() {
  return (
    <Navegador url="tunegocio.com">
      <div className="mw">
        <div className="mw-nav"><span className="mw-logo">Tu negocio</span><span className="mw-links"><i /><i /><i /></span></div>
        <div className="mw-hero">
          <div>
            <div className="mw-title">Atención rápida para cada cliente</div>
            <div className="mw-line" style={{ width: "92%" }} />
            <div className="mw-line" style={{ width: "78%" }} />
            <div className="mw-line" style={{ width: "60%" }} />
            <span className="mw-btn">Escríbenos por WhatsApp</span>
          </div>
          <div className="mw-form">
            <div className="mw-form-title">Déjanos tus datos</div>
            <span className="mw-input">Nombre</span>
            <span className="mw-input">WhatsApp</span>
            <span className="mw-input">¿Qué necesitas?</span>
            <span className="mw-submit">Enviar</span>
            <span className="mw-saved">✓ Guardado en tu registro de clientes</span>
          </div>
        </div>
        <div className="mw-wa">
          <span className="mw-wa-bubble">¡Hola! 👋 ¿En qué te ayudo? Respondo al instante.</span>
          <span className="mw-wa-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
          </span>
        </div>
      </div>
    </Navegador>
  );
}

const PEDIDOS: [string, string, string, "a" | "w" | "c"][] = [
  ["#1042", "Entrega jueves", "En camino", "a"],
  ["#1041", "Entrega miércoles", "Por cobrar", "w"],
  ["#1040", "Entregado lunes", "Completado", "c"],
  ["#1039", "Entrega viernes", "En preparación", "a"],
];

export function MaquetaPanel() {
  return (
    <Navegador url="portal.tunegocio.com">
      <div className="mp">
        <div className="mp-side">
          <span className="mp-brand">Tu negocio</span>
          <span className="mp-item">Inicio</span>
          <span className="mp-item is-on">Pedidos</span>
          <span className="mp-item">Clientes</span>
          <span className="mp-item">Documentos</span>
          <span className="mp-item">Reportes</span>
        </div>
        <div className="mp-main">
          <div className="mp-head">
            <div><div className="mp-title">Pedidos</div><div className="mp-sub">Esta semana</div></div>
            <span className="mp-btn">+ Nuevo pedido</span>
          </div>
          <div className="mp-kpis">
            <div className="dk-kpi"><div className="dk-num">18</div><div className="dk-label">Pedidos</div></div>
            <div className="dk-kpi"><div className="dk-num">5</div><div className="dk-label">Por entregar</div></div>
            <div className="dk-kpi"><div className="dk-num">3</div><div className="dk-label">Por cobrar</div></div>
          </div>
          <div className="mp-table">
            <div className="mp-row is-head"><b>Pedido</b><span>Entrega</span><span>Estado</span></div>
            {PEDIDOS.map(([n, e, s, t]) => (
              <div className="mp-row" key={n}><b>{n}</b><span>{e}</span><span className={`ld-tag ${t}`}>{s}</span></div>
            ))}
          </div>
        </div>
      </div>
    </Navegador>
  );
}
