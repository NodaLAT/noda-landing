import { CONVERSACIONES } from "@/lib/conversaciones";
import Telefono from "./Telefono";

// "Caso en marcha" — bloque reutilizable (portada, Atención 24/7 e Interpretación con IA).
// Textos de docs/contenido-web-v3.md (sección 5). Solo lo que VyR usa de verdad:
// nada de agendamiento, recordatorios ni reportes junto a VyR.
// Logo: vyr-logo.webp es una copia liviana de vyr-logo.png (mismos colores y proporciones,
// sin el margen transparente), dentro de una tarjeta blanca.
const LOGO = { src: "/assets/v3/clientes/vyr-logo.webp", ancho: 212, alto: 240 };

const trazo = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const PUNTOS: { texto: string; icono: React.ReactNode }[] = [
  { texto: "Atención 24/7 por WhatsApp: precios, horarios, servicios y estado de resultados.",
    icono: <path {...trazo} d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /> },
  { texto: "Resultados automáticos por WhatsApp apenas están listos.",
    icono: <g {...trazo}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5M9 14l2 2 4-4" /></g> },
  { texto: "Interpretación de resultados con IA en palabras simples.",
    icono: <path {...trazo} d="M12 3v3M12 18v3M3 12h3M18 12h3M12 8l1.5 2.5L16 12l-2.5 1.5L12 16l-1.5-2.5L8 12l2.5-1.5Z" /> },
  { texto: "Paso a la secretaria cuando hace falta una persona.",
    icono: <g {...trazo}><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></g> },
  { texto: "Conectado al sistema que el laboratorio ya usa.",
    icono: <g {...trazo}><path d="M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-10 0Z" /><path d="M12 16v5" /></g> },
];
const CIFRAS = [
  { cifra: "24/7", texto: "atención" },
  { cifra: "<3 s", texto: "de respuesta" },
  { cifra: "7 días", texto: "de implementación" },
];

export default function Caso({ id = "casos", compacto = false }: { id?: string; compacto?: boolean }) {
  return (
    <section className={`p3-sec${compacto ? " p3-sec-c" : ""}`} id={id}>
      <div className="p3-wrap">
        <span className="p3-eyebrow">Caso en marcha</span>
        <h2 className="p3-h2">Un caso real, funcionando hoy.</h2>
        <p className="p3-p">Cada implementación se diseña sobre el flujo real del cliente. No usamos plantillas.</p>
        <div className="p3-caso">
          <div className="p3-caso-card">
            <div className="p3-caso-cab">
              <span className="p3-caso-logo">
                <img src={LOGO.src} alt="Logo de Laboratorios VyR San Rafael" width={LOGO.ancho} height={LOGO.alto} loading="lazy" />
              </span>
              <div>
                <span className="p3-caso-sector">Salud · Laboratorio clínico · Quito</span>
                <h3 className="p3-caso-nombre">Laboratorios VyR San Rafael</h3>
              </div>
            </div>
            <ul className="p3-caso-puntos">
              {PUNTOS.map((p) => (
                <li key={p.texto}>
                  <span className="p3-caso-ico"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">{p.icono}</svg></span>
                  <span>{p.texto}</span>
                </li>
              ))}
            </ul>
            <dl className="p3-caso-cifras">
              {CIFRAS.map((c) => (
                <div key={c.cifra}><dt>{c.cifra}</dt><dd>{c.texto}</dd></div>
              ))}
            </dl>
          </div>
          <div className="p3-caso-fono">
            <Telefono nombre={CONVERSACIONES.interpreta.negocio} mensajes={CONVERSACIONES.interpreta.mensajes} />
            <p className="p3-caso-aviso">{CONVERSACIONES.interpreta.aviso}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
