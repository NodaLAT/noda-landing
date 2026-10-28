import type { Icono } from "@/lib/servicios";
import { IconoServicio } from "./Iconos";

// Cinta bajo el hero: desplazamiento continuo y lento (CSS). Con "reducir movimiento" queda quieta.
// La lista se repite dos veces para que el bucle no tenga salto; la copia es invisible para lectores de pantalla.
const FRASES: { texto: string; icono: Icono }[] = [
  { texto: "Atiende 24/7", icono: "chat" },
  { texto: "Agenda sola", icono: "calendario" },
  { texto: "Cotiza en segundos", icono: "calculadora" },
  { texto: "Interpreta con IA", icono: "documento" },
];

function Grupo({ copia = false }: { copia?: boolean }) {
  return (
    <ul className="p3-cinta-grupo" aria-hidden={copia || undefined}>
      {[...FRASES, ...FRASES].map((f, i) => (
        <li key={i}>
          <span className="p3-cinta-ico"><IconoServicio icono={f.icono} size={18} /></span>
          {f.texto}
        </li>
      ))}
    </ul>
  );
}

export default function Cinta() {
  return (
    <section className="p3-cinta" aria-label="Lo que hace Noda">
      <div className="p3-cinta-pista">
        <Grupo />
        <Grupo copia />
      </div>
    </section>
  );
}
