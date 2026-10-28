// Datos de la portada v3 (oscura). Los 8 servicios como nodos de la red.
// Los slug coinciden con lib/servicios.ts (enlace a cada /servicios/[slug]).
// pos = posición normalizada [x,y] (0..1) sobre el canvas en escritorio (zigzag).

export type Nodo = {
  n: string; corto: string; nombre: string; desc: string; slug: string; pos: [number, number];
};

export const NODOS: Nodo[] = [
  { n: "01", corto: "Atención 24/7", nombre: "Atención y ventas 24/7 por WhatsApp", desc: "Responde al instante, a cualquier hora, y le pasa a tu equipo al cliente listo para comprar.", slug: "atencion-y-ventas-whatsapp", pos: [0.05, 0.6] },
  { n: "02", corto: "Agendamiento", nombre: "Agendamiento y recordatorios", desc: "Tus clientes reservan solos y reciben un recordatorio para que no falten.", slug: "agendamiento-y-recordatorios", pos: [0.18, 0.3] },
  { n: "03", corto: "Cotizaciones", nombre: "Cotizaciones al instante", desc: "Precio en segundos, con tus tarifas y tu formato.", slug: "cotizaciones-al-instante", pos: [0.31, 0.66] },
  { n: "04", corto: "Interpretación con IA", nombre: "Interpretación de documentos con IA", desc: "Lee resultados, facturas u órdenes y los explica en palabras simples.", slug: "interpretacion-de-documentos", pos: [0.44, 0.34] },
  { n: "05", corto: "CRM y leads", nombre: "CRM y seguimiento de leads", desc: "Cada cliente registrado y con seguimiento, para que ninguno se enfríe.", slug: "crm-y-seguimiento-de-leads", pos: [0.57, 0.7] },
  { n: "06", corto: "Reportes", nombre: "Reportes y dashboards", desc: "Los números de tu negocio, claros, en tu correo o WhatsApp.", slug: "reportes-y-dashboards", pos: [0.7, 0.32] },
  { n: "07", corto: "Webs con IA", nombre: "Webs con IA integrada", desc: "Una web que no solo se ve bien: responde y te trae clientes.", slug: "webs-con-ia", pos: [0.83, 0.62] },
  { n: "08", corto: "Apps a medida", nombre: "Apps y sistemas a medida", desc: "Herramientas que funcionan en el navegador, hechas para cómo trabaja tu negocio.", slug: "apps-y-sistemas-a-medida", pos: [0.95, 0.36] },
];
