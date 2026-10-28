// Por qué Noda — 3 puntos en tarjetas con ícono teal (docs/contenido-web-v3.md, sección 7).
const trazo = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const PUNTOS: { titulo: string; texto: string; icono: React.ReactNode }[] = [
  { titulo: "Sin enredos técnicos", texto: "Tú no tienes que entender nada de tecnología. Nosotros lo construimos, lo conectamos y lo dejamos andando.",
    icono: <g {...trazo}><path d="M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-10 0Z" /><path d="M12 16v5" /></g> },
  { titulo: "Rápido, no eterno", texto: "Tu primera automatización funcionando en días, no en meses.",
    icono: <path {...trazo} d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /> },
  { titulo: "Personas reales detrás", texto: "Si algo pasa, te contestamos nosotros. Sin tickets eternos.",
    icono: <g {...trazo}><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></g> },
];

export default function PorQue() {
  return (
    <section className="p3-sec" id="por-que">
      <div className="p3-wrap">
        <span className="p3-eyebrow">Por qué Noda</span>
        <h2 className="p3-h2">No somos otra agencia. Somos tu equipo de automatización.</h2>
        <ul className="p3-porque">
          {PUNTOS.map((p) => (
            <li key={p.titulo} className="p3-porque-card">
              <span className="p3-porque-ico"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">{p.icono}</svg></span>
              <h3 className="p3-porque-t">{p.titulo}</h3>
              <p className="p3-porque-d">{p.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
