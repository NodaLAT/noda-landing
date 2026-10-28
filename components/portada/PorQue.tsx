// Por qué Noda — 3 puntos en tarjetas con ícono teal.
// PENDIENTE: los títulos y textos salen de docs/contenido-web-v3.md, que todavía no está en el repo.
const trazo = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const PUNTOS: { titulo: string; texto: string; icono: React.ReactNode }[] = [
  { titulo: "[PENDIENTE: punto 1 de «Por qué Noda»]", texto: "[PENDIENTE: texto del punto 1]",
    icono: <path {...trazo} d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /> },
  { titulo: "[PENDIENTE: punto 2 de «Por qué Noda»]", texto: "[PENDIENTE: texto del punto 2]",
    icono: <path {...trazo} d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6Z" /> },
  { titulo: "[PENDIENTE: punto 3 de «Por qué Noda»]", texto: "[PENDIENTE: texto del punto 3]",
    icono: <g {...trazo}><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></g> },
];

export default function PorQue() {
  return (
    <section className="p3-sec" id="por-que">
      <div className="p3-wrap">
        <h2 className="p3-eyebrow">Por qué Noda</h2>
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
