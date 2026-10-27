import Obj3D from "./Obj3D";

// Cinta amarilla que corre en bucle. El isotipo pequeño separa cada frase.
const FRASES = ["Atiende 24/7", "Agenda sola", "Cotiza en segundos", "Interpreta con IA"];

function Grupo() {
  return (
    <span className="v3-cinta-grupo" aria-hidden="true">
      {FRASES.map((f) => (
        <span key={f} className="v3-cinta-grupo">
          <span className="v3-cinta-item">{f}</span>
          <Obj3D name="isotipo" ancho={26} className="v3-cinta-sep" />
        </span>
      ))}
    </span>
  );
}

export default function Cinta() {
  return (
    <div className="v3-cinta" aria-label="Atiende 24/7, agenda sola, cotiza en segundos, interpreta con IA">
      <div className="v3-cinta-track">
        <Grupo />
        <Grupo />
      </div>
    </div>
  );
}
