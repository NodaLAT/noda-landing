import Telefono, { type Msg } from "./Telefono";

// 3.3 Caso real (oscuro). Solo laboratorio: nada de agendamiento/recordatorios/reportes.
const PUNTOS = [
  "Atención 24/7 por WhatsApp: precios, horarios, servicios y estado de resultados.",
  "Resultados automáticos por WhatsApp apenas están listos.",
  "Interpretación de resultados con IA en palabras simples.",
  "Paso a la secretaria cuando hace falta una persona.",
  "Conectado al sistema que el laboratorio ya usa.",
];
const CHIPS = ["24/7 atención", "<3 s de respuesta", "7 días de implementación"];

const CONVER: Msg[] = [
  { de: "cliente", texto: "¿Ya están mis resultados?", hora: "9:41" },
  { de: "bot", texto: "Sí, aquí los tienes.", hora: "9:41" },
  { de: "bot", archivo: { nombre: "Resultados.pdf", detalle: "1 página · 212 KB" }, hora: "9:41" },
  { de: "cliente", texto: "¿Me explicas qué significan?", hora: "9:42" },
  { de: "bot", texto: "Claro. Tus valores están dentro del rango esperado. Te explico cada uno en palabras simples.", hora: "9:42" },
];

export default function Caso() {
  return (
    <section className="p3-sec" id="casos">
      <div className="p3-wrap">
        <span className="p3-eyebrow">Caso en marcha</span>
        <h2 className="p3-h2">Negocios reales que ya están moviendo sus procesos a Noda.</h2>
        <div className="p3-caso">
          <div className="p3-caso-card">
            <span className="p3-caso-sector">Salud · Laboratorio clínico · Quito</span>
            <h3 className="p3-caso-nombre">Laboratorios VyR San Rafael</h3>
            <ul className="p3-caso-puntos">
              {PUNTOS.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <div className="p3-caso-chips">
              {CHIPS.map((c) => <span key={c} className="p3-chip">{c}</span>)}
            </div>
          </div>
          <div className="p3-caso-fono">
            <Telefono nombre="Laboratorio" mensajes={CONVER} />
            <p className="p3-caso-aviso">Esta explicación es orientativa y no reemplaza la consulta con tu médico.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
