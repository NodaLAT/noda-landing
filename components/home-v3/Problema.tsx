// Sección "El problema": cuatro cifras grandes sobre tarjetas de color sólido.
const CIFRAS: { num: string; texto: string; fuente: string; color: string }[] = [
  { num: "7×", texto: "más probabilidad de concretar una venta si respondes en la primera hora.", fuente: "Harvard Business Review", color: "teal" },
  { num: "40%+", texto: "de los trabajadores dedica al menos un cuarto de su semana a tareas repetitivas.", fuente: "Smartsheet", color: "sol" },
  { num: "6 h", texto: "por semana estima recuperar un trabajador si automatiza esas tareas.", fuente: "Smartsheet", color: "white" },
  { num: "12,6 M", texto: "de personas usan WhatsApp cada semana en Ecuador. Tus clientes ya están ahí.", fuente: "Sensor Tower, 2025", color: "tinta" },
];

export default function Problema() {
  return (
    <section className="v3-seccion v3-seccion--beige" id="problema">
      <div className="container">
        <h2 className="v3-h2">Tus clientes escriben a toda hora. Tu equipo no puede estar en todas.</h2>
        <p className="v3-sub">
          Mensajes sin responder, citas que se olvidan, cotizaciones que tardan. Cada uno es una venta que se va a la competencia.
        </p>
        <div className="v3-prob-grid">
          {CIFRAS.map((c) => (
            <div key={c.num} className={`v3-prob-card v3-prob-card--${c.color}`}>
              <span className="v3-prob-num">{c.num}</span>
              <p className="v3-prob-text">{c.texto}</p>
              <span className="v3-prob-fuente">{c.fuente}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
