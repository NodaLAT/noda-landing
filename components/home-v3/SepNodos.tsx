import type { CSSProperties } from "react";

// Separador de "nodos": curva ondulada con burbujas redondas que sobresalen,
// inspirado en el isotipo. Se coloca entre dos secciones de distinto color.
// `arriba` = color de la sección de arriba; `abajo` = color de la de abajo.
export default function SepNodos({ arriba, abajo }: { arriba: string; abajo: string }) {
  const vars = { "--arriba": arriba, "--abajo": abajo } as CSSProperties;
  return (
    <div className="v3-sep" style={vars} aria-hidden="true">
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none">
        <path
          d="M0,0 H1440 V30 C1210,52 1050,20 820,33 C620,45 430,16 232,33 C150,40 70,39 0,37 Z"
          fill="var(--arriba)"
        />
      </svg>
      <span className="v3-nodo" style={{ left: "20%", top: 22, width: 30, height: 30 }} />
      <span className="v3-nodo" style={{ left: "51%", top: 26, width: 42, height: 42 }} />
      <span className="v3-nodo" style={{ left: "79%", top: 24, width: 26, height: 26 }} />
    </div>
  );
}
