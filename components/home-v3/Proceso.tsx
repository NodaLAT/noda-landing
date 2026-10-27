// Sección "Proceso": 4 tarjetas con número gigante.
const PASOS = [
  { n: "01", t: "Nos escribes", d: "Por WhatsApp. Entendemos qué tipo de negocio tienes y qué quieres simplificar.", chip: "Respuesta hoy" },
  { n: "02", t: "Diagnóstico", d: "Una reunión para encontrar el proceso que más tiempo te consume.", chip: "30 min · Sin costo" },
  { n: "03", t: "Propuesta", d: "Te armamos una solución a medida, con precio claro, después de entender el problema.", chip: "En 48 h" },
  { n: "04", t: "Funcionando", d: "La construimos, la conectamos a tus herramientas, la probamos contigo y queda andando.", chip: "7 días · Soporte incluido" },
];

export default function Proceso() {
  return (
    <section className="v3-seccion v3-seccion--beige" id="proceso">
      <div className="container">
        <span className="v3-eyebrow">Cómo trabajamos</span>
        <h2 className="v3-h2">De la primera conversación a tu sistema funcionando: 7 días.</h2>
        <div className="v3-pasos">
          {PASOS.map((p) => (
            <div key={p.n} className="v3-paso">
              <span className="v3-paso-num">{p.n}</span>
              <h3 className="v3-paso-title">{p.t}</h3>
              <p className="v3-paso-desc">{p.d}</p>
              <span className="v3-paso-chip">{p.chip}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
