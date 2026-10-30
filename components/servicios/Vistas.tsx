import type { Icono } from "@/lib/servicios";
import ChatMini, { Check2 } from "./ChatMini";

// Vistas previas de las tarjetas de /servicios: decorativas (aria-hidden), solo HTML/CSS/SVG, sin imágenes.
// Todas llevan la etiqueta "Demo" y usan negocios y personas FICTICIOS (Ferretería El Tornillo, Taller AutoPro,
// Laboratorio Demo, Café La Ronda...). No hay logos de Google ni de otras empresas; el único ícono de marca es el
// oficial de WhatsApp (simple-icons, sin modificar) y solo donde se habla de WhatsApp.
// Las animaciones corren solo con .is-activa (la pone Bento.tsx cuando la tarjeta está en pantalla) y quedan
// quietas con "reducir movimiento": el estado base de cada pieza es el final (styles/paginas.css, VISTAS PREVIAS).

const v = (n: number) => ({ "--i": n }) as React.CSSProperties;

// Ícono oficial de WhatsApp (simple-icons 13.21.0, CC0), sin modificar.
export function IconoWhatsApp({ size = 12 }: { size?: number }) {
  return (
    <svg className="bv-wa-ico" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const Demo = () => <span className="bv-demo">Demo</span>;

// Agendamiento: semana en estilo claro; entra la cita nueva y luego el aviso del recordatorio.
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie"];
const HORAS = ["8:00", "9:00", "10:00", "11:00"];
const CITAS: [number, number, string, string][] = [   // día, hora, texto, color
  [0, 0, "Control", "azul"], [1, 1, "Ortodoncia", "lila"], [0, 2, "Revisión", "ambar"],
  [2, 3, "Control", "azul"], [4, 2, "Blanqueamiento", "rosa"], [3, 0, "Revisión", "ambar"], [2, 1, "Extracción", "lila"],
];

function Calendario() {
  return (
    <div className="bv-app bv-cal">
      <div className="bv-app-cab"><b>Clínica dental · Agenda</b><Demo /></div>
      <div className="bv-cal-grilla">
        {DIAS.map((d, k) => <span key={d} className="bv-cal-dia" style={{ gridColumn: k + 2 }}>{d}</span>)}
        {HORAS.map((h, k) => <span key={h} className="bv-cal-hora" style={{ gridRow: k + 2 }}>{h}</span>)}
        {CITAS.map(([d, h, t, c]) => (
          <span key={`${d}-${h}`} className={`bv-cita bv-cita--${c}`} style={{ gridColumn: d + 2, gridRow: h + 2 }}>{t}</span>
        ))}
        <span className="bv-cita bv-cita--nueva" style={{ gridColumn: 5, gridRow: 4 }}>Limpieza dental</span>
      </div>
      <div className="bv-avisos">
        <span className="bv-aviso bv-aviso--cita"><b>+</b> Limpieza dental · Jue 10:00</span>
        <span className="bv-aviso bv-aviso--wa"><IconoWhatsApp />Recordatorio enviado por WhatsApp <Check2 /></span>
      </div>
    </div>
  );
}

// Cotizaciones: proforma en hoja blanca del taller ficticio "Taller AutoPro".
function Proforma() {
  return (
    <div className="bv-hoja bv-pro">
      <div className="bv-pro-cab">
        <svg className="bv-pro-logo" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#1e3a5f" />
          <path d="M14.2 6.6a3.6 3.6 0 0 0-4.6 4.6L5.8 15a1.3 1.3 0 0 0 1.8 1.8l3.8-3.8a3.6 3.6 0 0 0 4.6-4.6l-2 2-1.7-.4-.4-1.7z" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className="bv-pro-marca"><b>Taller AutoPro</b><small>Proforma N.º 0142</small></span>
        <Demo />
      </div>
      <div className="bv-pro-fila" style={v(0)}><span>Pastillas de freno Chevrolet Sail</span><b>$45,00</b></div>
      <div className="bv-pro-fila" style={v(1)}><span>Mano de obra</span><b>$25,00</b></div>
      <div className="bv-pro-fila bv-pro-sub" style={v(2)}><span>Subtotal</span><b>$70,00</b></div>
      <div className="bv-pro-fila bv-pro-sub" style={v(3)}><span>IVA 15 %</span><b>$10,50</b></div>
      <div className="bv-pro-fila bv-pro-total" style={v(4)}><span>Total</span><b>$80,50</b></div>
      <span className="bv-pro-accion">
        <em className="bv-pro-aprobar">Aprobar</em>
        <span className="bv-sello"><Check2 />Aprobada · PDF con tu marca</span>
      </span>
    </div>
  );
}

// Interpretación: resultado de laboratorio ficticio con línea de escaneo y la explicación simple.
const ANALISIS: [string, string, string, boolean][] = [
  ["Glucosa", "92 mg/dL", "Normal", false],
  ["Hemoglobina", "14,2 g/dL", "Normal", false],
  ["Colesterol", "215 mg/dL", "Algo alto", true],
];

function Documento() {
  return (
    <div className="bv-lab">
      <div className="bv-hoja bv-lab-hoja">
        <div className="bv-lab-cab"><b>Laboratorio Demo</b><small>Resultados</small><Demo /></div>
        {ANALISIS.map(([n, val, est, alto], i) => (
          <div key={n} className="bv-lab-fila" style={v(i)}>
            <span>{n}</span><b>{val}</b><em className={alto ? "is-alto" : undefined}>{est}</em>
          </div>
        ))}
        <span className="bv-scan" />
      </div>
      <div className="bv-lab-burbuja">
        <p>Glucosa y hemoglobina están normales. El colesterol salió algo alto: coméntalo en tu próxima consulta.</p>
        <small>Esta explicación es orientativa y no reemplaza la consulta con tu médico.</small>
      </div>
    </div>
  );
}

// CRM: tablero Nuevo · Seguimiento · Cliente; una tarjeta pasa de columna en columna.
type Contacto = { ini: string; nombre: string; interes: string; etq: [string, string]; color: string };
const COLUMNAS: [string, Contacto][] = [
  ["Interesado", { ini: "LM", nombre: "Lucía", interes: "Taladro", etq: ["Web", "verde"], color: "#2563eb" }],
  ["Cotizó", { ini: "LP", nombre: "Luis", interes: "Cotización", etq: ["Urgente", "rojo"], color: "#b45309" }],
  ["Cliente", { ini: "AR", nombre: "Ana", interes: "Limpieza", etq: ["VIP", "azul"], color: "#7c3aed" }],
];
const MUEVE: Contacto = { ini: "JV", nombre: "Jorge", interes: "Proforma", etq: ["Nuevo", "verde"], color: "#0f766e" };

function Contacto({ c, clase = "" }: { c: Contacto; clase?: string }) {
  return (
    <span className={`bv-crm-c ${clase}`}>
      <span className="bv-crm-av" style={{ background: c.color }}>{c.ini}</span>
      <span className="bv-crm-txt"><b>{c.nombre}</b><small>{c.interes}</small></span>
      <em className={`bv-etq bv-etq--${c.etq[1]}`}>{c.etq[0]}</em>
    </span>
  );
}

function Etapas() {
  return (
    <div className="bv-app bv-crm">
      <div className="bv-app-cab"><b>Clientes</b><Demo /></div>
      <div className="bv-crm-tablero">
        {COLUMNAS.map(([col, c]) => (
          <div key={col} className="bv-crm-col"><span className="bv-crm-col-t">{col}</span><Contacto c={c} /></div>
        ))}
        <Contacto c={MUEVE} clase="bv-crm-mueve" />
      </div>
    </div>
  );
}

// Reportes: 3 indicadores, gráfico de líneas y barras y el aviso del resumen semanal.
const BARRAS = [34, 48, 40, 58, 52, 70, 64];
const LINEA = "M7 52 L35 44 L63 47 L91 34 L119 37 L147 22 L175 14";

function Barras() {
  return (
    <div className="bv-app bv-rep">
      <div className="bv-app-cab"><b>Resumen de la semana</b><Demo /></div>
      <div className="bv-rep-kpis">
        {[["Consultas", "47"], ["Citas", "12"], ["Ventas", "$1.240"]].map(([t, n], i) => (
          <span key={t} className="bv-rep-kpi" style={v(i)}><small>{t}</small><b>{n}</b></span>
        ))}
      </div>
      <svg className="bv-rep-graf" viewBox="0 0 182 60" preserveAspectRatio="none" aria-hidden="true">
        {[15, 30, 45].map((y) => <line key={y} x1="0" x2="182" y1={y} y2={y} className="bv-rep-guia" />)}
        {BARRAS.map((h, i) => <rect key={i} x={i * 28 + 1} y={60 - h * .7} width="12" height={h * .7} rx="2" className="bv-rep-barra" style={v(i)} />)}
        <path d={LINEA} pathLength={1} className="bv-rep-linea" />
      </svg>
    </div>
  );
}

// Webs: navegador claro con la web ficticia "Café La Ronda", botón flotante de WhatsApp y su resultado de búsqueda.
function Navegador() {
  return (
    <div className="bv-webs">
      <div className="bv-nav">
        <span className="bv-nav-barra"><i /><i /><i /><b>cafelaronda.com</b><Demo /></span>
        <span className="bv-sitio">
          <span className="bv-sitio-top"><b>Café La Ronda</b><span><i /><i /><i /></span></span>
          <span className="bv-sitio-t">Café de altura y desayunos todo el día</span>
          <span className="bv-sitio-btns"><em>Ver el menú</em><em className="is-borde">Reservar</em></span>
        </span>
        <span className="bv-wa-flota"><IconoWhatsApp size={15} /></span>
      </div>
      <div className="bv-serp">
        <span className="bv-serp-url">cafelaronda.com › menu</span>
        <span className="bv-serp-t">Café La Ronda | Desayunos y café de altura</span>
        <span className="bv-serp-d">Pide tu desayuno o reserva tu mesa. Te respondemos al instante por WhatsApp.</span>
      </div>
    </div>
  );
}

// Apps: panel con barra lateral, contador y tabla de pedidos con estados de colores.
const PEDIDOS: [string, string, string, string][] = [
  ["#1043", "M. Torres", "Pendiente", "ambar"],
  ["#1042", "Ferretería Sur", "En proceso", "azul"],
  ["#1041", "J. Andrade", "Entregado", "verde"],
  ["#1040", "Café Norte", "Entregado", "verde"],
  ["#1039", "P. Salazar", "En proceso", "azul"],      // estas tres solo se ven con la tarjeta grande
  ["#1038", "Panadería Lucero", "Entregado", "verde"],
  ["#1037", "R. Villacís", "Entregado", "verde"],
];
const RESUMEN: [string, string][] = [["18", "Pedidos"], ["5", "Por entregar"], ["3", "Por cobrar"]];

function Panel() {
  return (
    <div className="bv-app bv-apps">
      <span className="bv-apps-lado">
        <b>Mi negocio</b>
        <i>Inicio</i><i className="is-on">Pedidos</i><i>Clientes</i><i>Reportes</i>
      </span>
      <span className="bv-apps-main">
        <span className="bv-apps-cab">
          <b>Pedidos</b>
          <span className="bv-apps-contador"><small>Hoy</small><b className="bv-contador" /></span>
          <Demo />
        </span>
        <span className="bv-apps-kpis">
          {RESUMEN.map(([n, t]) => <span key={t}><b>{n}</b><small>{t}</small></span>)}
        </span>
        <span className="bv-apps-tabla">
          {PEDIDOS.map(([n, c, e, col], i) => (
            <span key={n} className="bv-apps-fila">
              <b>{n}</b><span>{c}</span>
              {i === 0 ? (
                // El pedido de arriba avanza de estado: Recibido → En preparación → Listo
                <span className="bv-apps-estado">
                  <em className="bv-etq bv-etq--ambar">Recibido</em>
                  <em className="bv-etq bv-etq--azul">En preparación</em>
                  <em className="bv-etq bv-etq--verde">Listo</em>
                </span>
              ) : (
                <em className={`bv-etq bv-etq--${col}`}>{e}</em>
              )}
            </span>
          ))}
        </span>
        <span className="bv-apps-aviso"><Check2 />Aviso enviado al cliente · Pedido listo</span>
      </span>
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
