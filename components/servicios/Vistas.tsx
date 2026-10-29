import type { Icono } from "@/lib/servicios";
import ChatMini from "./ChatMini";

// Mini vistas previas de las tarjetas de /servicios: decorativas (aria-hidden), solo CSS/SVG.
// Las animaciones corren solo con .is-activa (la pone Bento.tsx cuando la tarjeta está en pantalla)
// y quedan quietas con "reducir movimiento" (styles/paginas.css, sección BENTO).
// Sin datos reales: líneas y bloques abstractos; las únicas palabras son etiquetas genéricas.

const Lineas = ({ n, clase }: { n: number; clase: string }) => <>{Array.from({ length: n }, (_, i) => <i key={i} className={clase} />)}</>;

function Calendario() {
  // 3 semanas; la celda 10 es el horario que se marca
  return (
    <div className="bv-cal">
      <div className="bv-cal-dias"><Lineas n={7} clase="bv-cal-dia" /></div>
      <div className="bv-cal-grilla">
        {Array.from({ length: 21 }, (_, i) => <i key={i} className={i === 10 ? "bv-cal-celda is-marcada" : [2, 5, 13, 17].includes(i) ? "bv-cal-celda is-ocupada" : "bv-cal-celda"} />)}
      </div>
      <span className="bv-cal-chip">Jue 10:00 ✓</span>
    </div>
  );
}

function Proforma() {
  return (
    <div className="bv-pro">
      {[0, 1, 2].map((i) => <span key={i} className="bv-pro-fila" style={{ "--i": i } as React.CSSProperties}><i /><b /></span>)}
      <span className="bv-pro-total"><em>Total</em><b /></span>
    </div>
  );
}

function Documento() {
  return (
    <div className="bv-doc">
      <div className="bv-doc-hoja">
        <i className="bv-doc-titulo" />
        {[92, 78, 86, 64, 80, 55].map((w, i) => <i key={i} className="bv-doc-linea" style={{ width: `${w}%`, "--i": i } as React.CSSProperties} />)}
        <span className="bv-doc-scan" />
      </div>
    </div>
  );
}

function Etapas() {
  return (
    <div className="bv-crm">
      {["Nuevo", "Seguimiento", "Cliente"].map((e) => <span key={e} className="bv-crm-col"><em>{e}</em></span>)}
      <i className="bv-crm-c bv-crm-c1" /><i className="bv-crm-c bv-crm-c2" /><i className="bv-crm-c bv-crm-c3" />
      <i className="bv-crm-c bv-crm-mueve" />
    </div>
  );
}

function Barras() {
  return (
    <div className="bv-bar">
      {[38, 56, 44, 70, 62, 84, 96].map((h, i) => <i key={i} style={{ height: `${h}%`, "--i": i } as React.CSSProperties} className={i === 6 ? "is-ultima" : undefined} />)}
    </div>
  );
}

function Navegador() {
  return (
    <div className="bv-web">
      <span className="bv-web-barra"><i /><i /><i /><b /></span>
      <span className="bv-web-cuerpo"><i style={{ width: "62%" }} className="bv-web-t" /><i style={{ width: "84%" }} /><i style={{ width: "70%" }} /><i className="bv-web-boton" /></span>
      <span className="bv-web-wa">
        <svg viewBox="0 0 24 24" width="16" height="16"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></svg>
      </span>
    </div>
  );
}

function Panel() {
  return (
    <div className="bv-app">
      <span className="bv-app-lado"><Lineas n={4} clase="" /></span>
      <span className="bv-app-mods">{[0, 1, 2, 3].map((i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</span>
    </div>
  );
}

const VISTAS: Record<Icono, () => React.ReactNode> = {
  chat: () => <ChatMini />,
  calendario: Calendario,
  calculadora: Proforma,
  documento: Documento,
  personas: Etapas,
  barras: Barras,
  navegador: Navegador,
  bloques: Panel,
};

export default function Vista({ icono }: { icono: Icono }) {
  const V = VISTAS[icono];
  return <div className={`p3-bv p3-bv--${icono}`} aria-hidden="true"><V /></div>;
}
