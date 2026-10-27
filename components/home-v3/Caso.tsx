import FonoWhatsApp, { type MsgFono } from "./FonoWhatsApp";

const PUNTOS = [
  "Atención 24/7 por WhatsApp: precios, horarios, servicios y estado de resultados.",
  "Resultados automáticos por WhatsApp apenas están listos.",
  "Interpretación de resultados con IA en palabras simples.",
  "Paso a la secretaria cuando hace falta una persona.",
  "Conectado al sistema que el laboratorio ya usa.",
];
const CHIPS = ["24/7 atención", "<3 s de respuesta", "7 días de implementación"];

const CONVERSACION: MsgFono[] = [
  { de: "cliente", texto: "¿Ya están mis resultados?" },
  { de: "bot", texto: "Sí, aquí los tienes." },
  { de: "bot", archivo: { nombre: "Resultados.pdf", detalle: "Documento · 1 página" } },
  { de: "cliente", texto: "¿Me explicas qué significan?" },
  { de: "bot", texto: "Claro. Tus valores están dentro del rango esperado. Te explico cada uno en palabras simples." },
];

export default function Caso() {
  return (
    <section className="v3-seccion v3-seccion--cian" id="casos">
      <div className="container">
        <span className="v3-eyebrow">Caso en marcha</span>
        <h2 className="v3-h2">Negocios reales que ya están moviendo sus procesos a Noda.</h2>
        <div className="v3-caso-grid">
          <div className="v3-caso-card">
            <span className="v3-caso-sector">Salud · Laboratorio clínico · Quito</span>
            <h3 className="v3-caso-nombre">Laboratorios VyR San Rafael</h3>
            <ul className="v3-caso-puntos">
              {PUNTOS.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <div className="v3-caso-chips">
              {CHIPS.map((c) => <span key={c} className="v3-caso-chip">{c}</span>)}
            </div>
          </div>
          <div className="v3-caso-fono">
            <FonoWhatsApp
              nombre="Laboratorio"
              mensajes={CONVERSACION}
              nota="Esta explicación es orientativa y no reemplaza la consulta con tu médico."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
