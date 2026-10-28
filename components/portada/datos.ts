// Datos de la portada v3 (oscura). Los 8 servicios como nodos de la red (opciones que se combinan, sin orden).
// Los slug coinciden con lib/servicios.ts (enlace a cada /servicios/[slug]).
// icono = clave del ícono de línea en RedNodos.tsx.

export type Icono = "chat" | "calendario" | "calculadora" | "documento" | "personas" | "barras" | "navegador" | "bloques";

export type Nodo = {
  corto: string; nombre: string; desc: string; slug: string; icono: Icono;
};

export const NODOS: Nodo[] = [
  { corto: "Atención 24/7", nombre: "Atención y ventas 24/7 por WhatsApp", desc: "Responde al instante, a cualquier hora, y le pasa a tu equipo al cliente listo para comprar.", slug: "atencion-y-ventas-whatsapp", icono: "chat" },
  { corto: "Agendamiento", nombre: "Agendamiento y recordatorios", desc: "Tus clientes reservan solos y reciben un recordatorio para que no falten.", slug: "agendamiento-y-recordatorios", icono: "calendario" },
  { corto: "Cotizaciones", nombre: "Cotizaciones al instante", desc: "Precio en segundos, con tus tarifas y tu formato.", slug: "cotizaciones-al-instante", icono: "calculadora" },
  { corto: "Interpretación con IA", nombre: "Interpretación de documentos con IA", desc: "Lee resultados, facturas u órdenes y los explica en palabras simples.", slug: "interpretacion-de-documentos", icono: "documento" },
  { corto: "CRM y leads", nombre: "CRM y seguimiento de leads", desc: "Cada cliente registrado y con seguimiento, para que ninguno se enfríe.", slug: "crm-y-seguimiento-de-leads", icono: "personas" },
  { corto: "Reportes", nombre: "Reportes y dashboards", desc: "Los números de tu negocio, claros, en tu correo o WhatsApp.", slug: "reportes-y-dashboards", icono: "barras" },
  { corto: "Webs con IA", nombre: "Webs con IA integrada", desc: "Una web que no solo se ve bien: responde y te trae clientes.", slug: "webs-con-ia", icono: "navegador" },
  { corto: "Apps a medida", nombre: "Apps y sistemas a medida", desc: "Herramientas que funcionan en el navegador, hechas para cómo trabaja tu negocio.", slug: "apps-y-sistemas-a-medida", icono: "bloques" },
];
