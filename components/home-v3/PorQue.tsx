// Sección "Por qué Noda": tres columnas con ícono de línea.
const PUNTOS = [
  {
    t: "Sin enredos técnicos",
    d: "Hablamos claro, sin palabras raras. Tú te enfocas en tu negocio y nosotros en que la tecnología funcione.",
    icono: (
      <svg viewBox="0 0 24 24"><path d="M8 9h8M8 13h5" /><path d="M21 12a9 9 0 1 1-4.2-7.6L21 4v5h-5" /></svg>
    ),
  },
  {
    t: "Rápido, no eterno",
    d: "En 7 días tienes algo funcionando de verdad. Nada de proyectos que se alargan durante meses.",
    icono: (
      <svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9 2h6" /></svg>
    ),
  },
  {
    t: "Personas reales detrás",
    d: "Un equipo que responde, acompaña y ajusta contigo. No te dejamos solo frente a un sistema.",
    icono: (
      <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 6.2a3.2 3.2 0 0 1 0 6.1M18 20a5.5 5.5 0 0 0-2.8-4.8" /></svg>
    ),
  },
];

export default function PorQue() {
  return (
    <section className="v3-seccion v3-seccion--beige" id="por-que">
      <div className="container">
        <span className="v3-eyebrow">Por qué Noda</span>
        <h2 className="v3-h2">Tecnología que se siente simple.</h2>
        <div className="v3-why-grid">
          {PUNTOS.map((p) => (
            <div key={p.t} className="v3-why">
              <span className="v3-why-ico">{p.icono}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
