// 3.4 Cómo trabajamos — 4 pasos con número grande.
const PASOS = [
  { n: "01", t: "Nos escribes", d: "Por WhatsApp. Entendemos qué tipo de negocio tienes y qué quieres simplificar.", chip: "Respuesta hoy" },
  { n: "02", t: "Diagnóstico", d: "Una reunión para encontrar el proceso que más tiempo te consume.", chip: "30 min · Sin costo" },
  { n: "03", t: "Propuesta", d: "Una solución a medida, con precio claro, después de entender el problema.", chip: "En 48 h" },
  { n: "04", t: "Funcionando", d: "La construimos, la conectamos a tus herramientas, la probamos contigo y queda andando.", chip: "7 días · Soporte incluido" },
];

export default function Proceso() {
  return (
    <section className="p3-sec" id="proceso">
      <div className="p3-wrap">
        <span className="p3-eyebrow">Cómo trabajamos</span>
        <h2 className="p3-h2">De la primera conversación a tu sistema funcionando: 7 días.</h2>
        <div className="p3-pasos">
          {PASOS.map((p) => (
            <div key={p.n} className="p3-paso">
              <span className="p3-paso-num">{p.n}</span>
              <h3 className="p3-paso-t">{p.t}</h3>
              <p className="p3-paso-d">{p.d}</p>
              <span className="p3-chip">{p.chip}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
