// =====================================================================
// SERVICIOS DE NODA — fuente única de datos
// ---------------------------------------------------------------------
// Textos aprobados: docs/contenido-web-v3.md (usarlos tal cual).
// La red de la portada, la cartelera (/servicios) y cada página
// (/servicios/[slug]) se arman solas a partir de esta lista.
// Para agregar un servicio nuevo:
//   1. Copia una entrada de SERVICIOS y cambia sus textos.
//   2. Dale un "slug" único (será la dirección: /servicios/tu-slug).
//
// PRECIOS: están en lib/precios.ts (servicios sin precio muestran "Cotiza a medida").
// =====================================================================
import { CONVERSACIONES, type Conversacion } from "./conversaciones";

// Íconos de línea (components/portada/Iconos.tsx), los mismos de la red de la portada.
export type Icono = "chat" | "calendario" | "calculadora" | "documento" | "personas" | "barras" | "navegador" | "bloques";

// Mensajes que el asistente puede mostrar en un chat interactivo de ejemplo.
export type Mensaje =
  | { tipo: "texto"; texto: string; de?: "cliente" }   // de: "cliente" = respuesta simulada del visitante
  | { tipo: "confirmacion"; titulo: string; detalle: string; etiqueta: string }
  | { tipo: "cotizacion"; titulo: string; filas: [string, string][]; total: string; nota?: string }
  | { tipo: "ficha"; titulo: string; filas: [string, string][] }
  | { tipo: "indicadores"; titulo: string; items: [string, string][]; barras: number[] };

export type DemoChat = {
  tipo: "chat";
  intro: string;
  negocio: string;        // nombre que aparece arriba del chat (rubro, nunca un cliente real)
  saludo: string;
  preguntas: { pregunta: string; respuesta: Mensaje[] }[];
  aviso?: string;         // nota fija bajo la demo (obligatoria en demos de salud)
};
// Conversación fija del documento (ATIENDE, AGENDA, COTIZA, INTERPRETA) en el teléfono oscuro.
export type DemoConversacion = { tipo: "conversacion" } & Conversacion;
export type DemoWeb = { tipo: "web"; titulo: string; intro: string; nota: string };
export type DemoPanel = { tipo: "panel"; titulo: string; intro: string };

// Cifra destacada con su fuente visible.
export type Dato = { cifra: string; texto: string; fuente: string };

export type Servicio = {
  slug: string;
  nombre: string;
  corto: string;            // nombre corto (nodo de la red de la portada)
  linea: string;            // una línea de descripción (portada y /servicios)
  subtitulo: string;        // debajo del título en la página del servicio
  icono: Icono;
  destacado?: boolean;      // servicio estrella
  seo: { titulo: string; descripcion: string };
  problema: string;
  pasos: [string, string, string];   // "Cómo funciona" (texto corto, plantilla antigua)
  incluye: string[];
  idealPara: string;
  dato?: Dato;              // sin dato, la sección no se muestra
  demo: DemoChat | DemoConversacion | DemoWeb | DemoPanel;
  faq: { pregunta: string; respuesta: string }[];
  relacionados: string[];   // slugs de servicios que se combinan bien con este ("Se combina con")
  casoVyR?: boolean;        // muestra el bloque "Caso en marcha" (VyR) en la página del servicio
  // --- Plantilla v3 (cabecera con demo al lado). Si el servicio define "comoFunciona",
  //     su página usa la plantilla v3; si no, usa la plantilla antigua. ---
  comoFunciona?: { titulo: string; detalle?: string }[];   // 3 o 4 pasos; "detalle" opcional
  antesConNoda?: { antes: string; con: string }[];          // pares "Antes / Con Noda"
  avisoSalud?: boolean;     // muestra el aviso médico visible (servicios de salud)
};

export { AVISO_SALUD } from "./conversaciones";

// Cifras de "El problema" en la portada (con su fuente visible).
export const CIFRAS_PROBLEMA: Dato[] = [
  { cifra: "7x", texto: "más probabilidad de concretar una oportunidad de venta si respondes en la primera hora.", fuente: "Harvard Business Review" },
  { cifra: "40 %+", texto: "de los trabajadores dedica al menos un cuarto de su semana a tareas repetitivas.", fuente: "Smartsheet" },
  { cifra: "6 h", texto: "por semana estima recuperar un trabajador si automatiza esas tareas.", fuente: "Smartsheet" },
  { cifra: "12,6 M", texto: "de personas usan WhatsApp cada semana en Ecuador. Tus clientes ya están ahí.", fuente: "Sensor Tower, 2025" },
];

const DATO_7X: Dato = { cifra: "7x", texto: "más probabilidad de concretar una oportunidad de venta si respondes en la primera hora.", fuente: "Harvard Business Review" };

export const SERVICIOS: Servicio[] = [
  // ------------------------------------------------------------------ 01 (servicio estrella)
  {
    slug: "atencion-y-ventas-whatsapp",
    nombre: "Atención y ventas 24/7 por WhatsApp",
    corto: "Atención 24/7",
    linea: "Responde al instante, a cualquier hora, y le pasa a tu equipo al cliente listo para comprar.",
    subtitulo: "Tu negocio responde al instante, a cualquier hora, y te pasa al cliente cuando está listo para comprar.",
    icono: "chat",
    destacado: true,
    seo: {
      titulo: "Atención y ventas 24/7 por WhatsApp",
      descripcion: "Un asistente con IA que atiende a tus clientes por WhatsApp a cualquier hora, responde sus preguntas y te avisa cuando están listos para comprar.",
    },
    problema: "Los clientes escriben de noche, en feriados o cuando tu equipo está ocupado. Si nadie responde rápido, compran en otro lado.",
    pasos: [
      "El cliente escribe a tu WhatsApp.",
      "La IA responde con la información de tu negocio: precios, horarios, productos y ubicación.",
      "Cuando hay intención de compra o un caso especial, pasa la conversación a tu equipo.",
    ],
    incluye: ["respuestas con tu información", "atención 24/7", "paso a una persona", "historial de conversaciones"],
    idealPara: "tiendas, ferreterías, restaurantes, clínicas y laboratorios.",
    dato: DATO_7X,
    demo: { tipo: "conversacion", ...CONVERSACIONES.atiende },
    faq: [
      { pregunta: "¿Puedo ver las conversaciones?", respuesta: "Sí, todas quedan registradas." },
      { pregunta: "¿Qué pasa si la IA no sabe algo?", respuesta: "Te pasa la conversación para que respondas tú." },
      { pregunta: "¿Funciona con mi número actual?", respuesta: "Trabajamos con WhatsApp Business oficial; en el diagnóstico revisamos tu caso." },
    ],
    relacionados: ["agendamiento-y-recordatorios", "cotizaciones-al-instante", "crm-y-seguimiento-de-leads"],
    casoVyR: true,
    // Cómo funciona del piloto: 3 pasos cortos (sin "detalle", se ve igual que en la Fase 0; usa íconos propios).
    comoFunciona: [
      { titulo: "El cliente escribe a tu WhatsApp." },
      { titulo: "La IA responde con la información de tu negocio: precios, horarios, productos y ubicación." },
      { titulo: "Cuando hay intención de compra o un caso especial, pasa la conversación a tu equipo." },
    ],
    antesConNoda: [
      { antes: "Un cliente escribe a las 11 de la noche y no hay nadie para responder.", con: "Recibe una respuesta al instante, de día, de noche o en feriado." },
      { antes: "Tu equipo frena lo que está haciendo para contestar lo mismo de siempre.", con: "La IA responde las preguntas repetidas y tu equipo se enfoca en vender." },
      { antes: "El mensaje del sábado se contesta el lunes… si alguien se acuerda.", con: "Los fines de semana también quedan atendidos y nada se pierde." },
      { antes: "La misma duda de precio, horario y stock, una y otra vez.", con: "Precios, horarios y disponibilidad respondidos al instante, con tu información." },
    ],
  },

  // ------------------------------------------------------------------ 02
  {
    slug: "agendamiento-y-recordatorios",
    nombre: "Agendamiento y recordatorios",
    corto: "Agendamiento",
    linea: "Tus clientes reservan solos y reciben un recordatorio para que no falten.",
    subtitulo: "Tus clientes reservan solos por WhatsApp y reciben un recordatorio para que no falten.",
    icono: "calendario",
    seo: {
      titulo: "Agendamiento de citas y recordatorios por WhatsApp",
      descripcion: "Tus clientes agendan, cambian y confirman sus citas por WhatsApp, a cualquier hora, y reciben recordatorios automáticos para no faltar.",
    },
    problema: "Agendar por llamadas y mensajes quita tiempo, y las citas olvidadas son horas perdidas.",
    pasos: [
      "El cliente pide una cita.",
      "Ve los horarios libres y elige.",
      "Recibe la confirmación y un recordatorio antes de la cita.",
    ],
    incluye: ["agenda conectada a tu calendario", "confirmación automática", "recordatorios", "cambios y cancelaciones"],
    idealPara: "clínicas, odontólogos, veterinarias, peluquerías y talleres.",
    dato: { cifra: "−25 %", texto: "los recordatorios reducen las inasistencias alrededor de un 25 %.", fuente: "BMJ Open, metaanálisis 2016" },
    demo: { tipo: "conversacion", ...CONVERSACIONES.agenda },
    faq: [
      { pregunta: "¿Funciona con mi calendario actual?", respuesta: "En el diagnóstico revisamos cuál usas y cómo conectarlo." },
      { pregunta: "¿El cliente puede cambiar su cita?", respuesta: "Sí, desde el mismo chat." },
    ],
    relacionados: ["atencion-y-ventas-whatsapp", "crm-y-seguimiento-de-leads", "reportes-y-dashboards"],
    comoFunciona: [
      { titulo: "Tu cliente pide una cita por WhatsApp.", detalle: "Escribe a cualquier hora, como lo haría con tu recepción." },
      { titulo: "Ve solo tus horarios libres.", detalle: "El asistente le muestra las horas que de verdad tienes disponibles." },
      { titulo: "Elige y queda agendado.", detalle: "La cita aparece en tu calendario al instante, sin cruces." },
      { titulo: "Le llega su recordatorio.", detalle: "Antes de la cita recibe un mensaje para confirmar, cambiar o cancelar." },
    ],
    antesConNoda: [
      { antes: "Agendas por chat, de ida y vuelta, hasta encontrar una hora.", con: "El cliente elige solo entre tus horas libres." },
      { antes: "Citas cruzadas o anotadas en papel.", con: "Todo en un solo calendario." },
      { antes: "Te enteras de que alguien no viene cuando ya no llegó.", con: "Puede confirmar o reprogramar con tiempo." },
      { antes: "Fuera de horario nadie agenda.", con: "Se agenda 24/7." },
    ],
  },

  // ------------------------------------------------------------------ 03
  {
    slug: "cotizaciones-al-instante",
    nombre: "Cotizaciones al instante",
    corto: "Cotizaciones",
    linea: "Precio en segundos, con tus tarifas y tu formato.",
    subtitulo: "Precio en segundos, con tus tarifas y tu formato, directo en WhatsApp.",
    icono: "calculadora",
    seo: {
      titulo: "Cotizaciones al instante por WhatsApp",
      descripcion: "Tus clientes piden precio por WhatsApp y reciben una cotización clara en segundos, con tus precios y tu formato. Sin hojas de cálculo.",
    },
    problema: "Armar cada cotización a mano tarda, y el cliente que espera se enfría.",
    pasos: [
      "El cliente pide un precio.",
      "El sistema le hace las preguntas necesarias.",
      "Le envía la cotización con tus precios y tu formato.",
    ],
    incluye: ["tus tarifas y reglas", "cotización en PDF o en mensaje", "aviso a tu equipo", "registro de cada cotización"],
    idealPara: "talleres, ferreterías, imprentas, constructoras y distribuidoras.",
    demo: { tipo: "conversacion", ...CONVERSACIONES.cotiza },
    faq: [
      { pregunta: "¿Y si mis precios cambian?", respuesta: "Se actualizan y el sistema usa siempre los vigentes." },
      { pregunta: "¿Puedo revisar antes de enviar?", respuesta: "Sí, se puede configurar para que tu equipo apruebe cada cotización." },
    ],
    relacionados: ["atencion-y-ventas-whatsapp", "crm-y-seguimiento-de-leads", "interpretacion-de-documentos"],
    comoFunciona: [
      { titulo: "El cliente pide lo que necesita.", detalle: "Por WhatsApp, con sus propias palabras." },
      { titulo: "El asistente arma la proforma.", detalle: "Usa tu lista de productos y precios, línea por línea." },
      { titulo: "Tú la apruebas.", detalle: "Revisas la proforma antes de que salga." },
      { titulo: "Le llega lista para aceptar.", detalle: "En PDF y con tu marca." },
    ],
    antesConNoda: [
      { antes: "Cotizas a mano en Word o Excel.", con: "La proforma se arma sola y tú solo la apruebas." },
      { antes: "Errores de precio o productos olvidados.", con: "Precios tomados de tu lista." },
      { antes: "El cliente espera horas y se va con otro.", con: "Recibe su cotización mientras sigue interesado." },
    ],
  },

  // ------------------------------------------------------------------ 04
  {
    slug: "interpretacion-de-documentos",
    nombre: "Interpretación de documentos con IA",
    corto: "Interpretación con IA",
    linea: "Lee resultados, facturas u órdenes y los explica en palabras simples.",
    subtitulo: "La IA lee resultados, facturas u órdenes y los explica en palabras simples.",
    icono: "documento",
    seo: {
      titulo: "Interpretación de documentos con IA",
      descripcion: "La IA lee resultados, informes, facturas u órdenes, extrae lo importante y lo explica en palabras simples a tus clientes o a tu equipo.",
    },
    problema: "Tus clientes reciben documentos que no entienden y tu equipo pierde tiempo explicándolos uno por uno.",
    pasos: [
      "Llega el documento.",
      "La IA extrae lo importante.",
      "Lo explica a tu cliente o a tu equipo en lenguaje claro.",
    ],
    incluye: ["lectura de PDF e imágenes", "explicación en lenguaje simple", "envío por WhatsApp", "avisos y límites claros"],
    idealPara: "laboratorios, clínicas, aseguradoras y contadores.",
    // Se mantiene la demo interactiva de 3 documentos (con la nota médica).
    demo: {
      tipo: "chat",
      intro: "Elige un documento de ejemplo —un resultado de laboratorio, una lista de pedido escrita a mano o una factura— y mira cómo la IA lo lee y lo explica.",
      negocio: "Asistente de documentos",
      saludo: "¡Hola! 📄 Envíame tu documento y te explico en palabras simples lo que dice.",
      preguntas: [
        {
          pregunta: "📎 Resultado de laboratorio",
          respuesta: [
            { tipo: "texto", texto: "Recibí tu resultado. Te explico lo principal en palabras simples:" },
            // Valores ficticios, solo para el ejemplo.
            { tipo: "ficha", titulo: "Resultado de laboratorio · Demo", filas: [["Glucosa", "92 mg/dL · Normal"], ["Hemoglobina", "14.2 g/dL · Normal"], ["Colesterol total", "215 mg/dL · Algo alto"]] },
            { tipo: "texto", texto: "Tu glucosa y tu hemoglobina están dentro de los valores esperados. El colesterol está un poco por encima del rango de referencia: es un punto para conversar en tu próxima consulta." },
            { tipo: "texto", texto: "Esta explicación es orientativa y no reemplaza la consulta con tu médico." },
          ],
        },
        {
          pregunta: "📎 Lista de pedido escrita a mano",
          respuesta: [
            { tipo: "texto", texto: "Leí tu lista escrita a mano ✍️. Así queda tu pedido ordenado:" },
            { tipo: "ficha", titulo: "Pedido · Ferretería · Demo", filas: [["Cemento 50 kg", "10 sacos"], ["Varilla 12 mm", "20 unidades"], ["Alambre de amarre", "5 kg"]] },
            { tipo: "texto", texto: "¿Te preparo la cotización?" },
          ],
        },
        {
          pregunta: "📎 Factura de proveedor",
          respuesta: [
            { tipo: "texto", texto: "Factura leída ✅. Estos son los datos, ya ordenados:" },
            { tipo: "ficha", titulo: "Factura de proveedor · Demo", filas: [["N.º de factura", "001-002-000123"], ["Subtotal", "$120,00"], ["IVA", "$18,00"], ["Total", "$138,00"]] },
            { tipo: "texto", texto: "La guardé en tu registro de compras." },
          ],
        },
      ],
      aviso: "Esta explicación es orientativa y no reemplaza la consulta con tu médico.",
    },
    faq: [
      { pregunta: "¿La IA reemplaza al profesional?", respuesta: "No. Explica en palabras simples y siempre recomienda consultar al especialista." },
      { pregunta: "¿Qué documentos puede leer?", respuesta: "PDF e imágenes; en el diagnóstico revisamos los tuyos." },
    ],
    relacionados: ["atencion-y-ventas-whatsapp", "cotizaciones-al-instante", "apps-y-sistemas-a-medida"],
    casoVyR: true,
    avisoSalud: true,
    comoFunciona: [
      { titulo: "Llega el resultado.", detalle: "El paciente lo recibe por WhatsApp." },
      { titulo: "La IA lo lee.", detalle: "Revisa cada valor junto con su rango de referencia." },
      { titulo: "Lo explica en palabras simples.", detalle: "Qué significa cada valor, sin tecnicismos." },
      { titulo: "Si hace falta, pasa a una persona.", detalle: "Ante dudas o valores fuera de rango, deriva a tu equipo o sugiere consultar al médico." },
    ],
    antesConNoda: [
      { antes: "El paciente recibe un documento lleno de términos que no entiende.", con: "Recibe una explicación clara de su resultado." },
      { antes: "Llama a preguntar y satura a la secretaria.", con: "La IA responde y deriva solo lo que hace falta." },
      { antes: "Busca en internet y se asusta.", con: "La explicación se basa en su propio resultado." },
    ],
  },

  // ------------------------------------------------------------------ 05
  {
    slug: "crm-y-seguimiento-de-leads",
    nombre: "CRM y seguimiento de leads",
    corto: "CRM y leads",
    linea: "Cada cliente registrado y con seguimiento, para que ninguno se enfríe.",
    subtitulo: "Cada persona que te escribe queda registrada y recibe seguimiento hasta que decide.",
    icono: "personas",
    seo: {
      titulo: "CRM y seguimiento de clientes potenciales",
      descripcion: "Registra automáticamente a cada persona interesada en tu negocio, organiza en qué etapa está y dale seguimiento sin depender de la memoria de tu equipo.",
    },
    problema: "Los interesados se pierden en el chat y nadie les vuelve a escribir.",
    pasos: [
      "Cada contacto se registra solo.",
      "Se clasifica según lo que busca.",
      "Recibe seguimiento automático y tu equipo ve en qué etapa está.",
    ],
    incluye: ["registro automático", "etiquetas por interés", "recordatorios de seguimiento para tu equipo", "vista de todos tus clientes"],
    idealPara: "inmobiliarias, concesionarios, academias y servicios profesionales.",
    dato: DATO_7X,
    demo: {
      tipo: "chat",
      intro: "Así registraría y daría seguimiento tu asistente a los interesados de una inmobiliaria. Toca un mensaje y mira qué pasa.",
      negocio: "Inmobiliaria · Asistente",
      saludo: "¡Hola! 🏠 Soy el asistente de la inmobiliaria. ¿Qué tipo de propiedad buscas?",
      preguntas: [
        {
          pregunta: "Busco departamento de 2 habitaciones en el norte",
          respuesta: [
            { tipo: "texto", texto: "¡Genial! Tengo varias opciones en esa zona. Te las envío por aquí. 📩" },
            { tipo: "ficha", titulo: "Nuevo contacto registrado", filas: [["Busca", "Departamento, 2 habitaciones"], ["Zona", "Norte"], ["Etapa", "Interesado"], ["Seguimiento", "En 2 días"]] },
          ],
        },
        {
          pregunta: "¿Puedo visitar uno el sábado?",
          respuesta: [
            { tipo: "texto", texto: "¡Claro! El sábado tengo disponible a las 10:00 am o a las 3:00 pm. ¿Cuál prefieres?" },
            { tipo: "texto", texto: "A las 10:00 am", de: "cliente" },
            { tipo: "texto", texto: "¡Listo! Te agendé la visita para el sábado a las 10:00 am. ✅" },
            { tipo: "ficha", titulo: "Contacto actualizado", filas: [["Etapa", "Visita agendada"], ["Visita", "Sábado · 10:00 am"], ["Asesor", "Avisado"], ["Recordatorio", "El viernes"]] },
          ],
        },
        {
          pregunta: "Por ahora solo estoy mirando",
          respuesta: [
            { tipo: "texto", texto: "¡Perfecto, sin apuro! 😊 Te escribo en unos días con nuevas opciones." },
            { tipo: "ficha", titulo: "Seguimiento programado", filas: [["Etapa", "Explorando"], ["Próximo mensaje", "En 5 días"], ["Motivo", "Nuevas opciones en su zona"]] },
          ],
        },
      ],
    },
    faq: [
      { pregunta: "¿Dónde veo a mis clientes?", respuesta: "En un panel o en una hoja ordenada, según lo que te sirva." },
      { pregunta: "¿El seguimiento es automático?", respuesta: "Sí, y tu equipo puede intervenir cuando quiera." },
    ],
    relacionados: ["atencion-y-ventas-whatsapp", "cotizaciones-al-instante", "reportes-y-dashboards"],
    comoFunciona: [
      { titulo: "Cada conversación crea un contacto.", detalle: "Nadie tiene que anotarlo." },
      { titulo: "Se etiqueta solo.", detalle: "Por ejemplo: interesado, cotizó, cliente." },
      { titulo: "Ves tu embudo.", detalle: "Las tarjetas avanzan por etapa." },
      { titulo: "Tienes el historial completo.", detalle: "Todo lo que habló cada contacto, en un solo lugar." },
    ],
    antesConNoda: [
      { antes: "Clientes dispersos en chats y libretas.", con: "Todos en un solo lugar." },
      { antes: "No sabes quién está por comprar.", con: "Ves en qué etapa está cada uno." },
      { antes: "Si cambia el vendedor, se pierde la historia.", con: "El historial queda en el sistema." },
    ],
  },

  // ------------------------------------------------------------------ 06
  {
    slug: "reportes-y-dashboards",
    nombre: "Reportes y dashboards",
    corto: "Reportes",
    linea: "Los números de tu negocio, claros, en tu correo o WhatsApp.",
    subtitulo: "Los números de tu negocio, claros, en tu correo o WhatsApp.",
    icono: "barras",
    seo: {
      titulo: "Reportes y dashboards automáticos",
      descripcion: "Convierte los datos de tu negocio en reportes claros y paneles fáciles de leer, que llegan a tu WhatsApp o correo para que decidas con información real.",
    },
    problema: "Los datos existen, pero armar el reporte toma horas y llega tarde.",
    pasos: [
      "Conectamos tus fuentes: ventas, citas y conversaciones.",
      "Los datos se ordenan solos.",
      "Recibes el resumen diario, semanal o mensual.",
    ],
    incluye: ["reportes automáticos", "panel visual", "alertas", "envío por correo o WhatsApp"],
    idealPara: "dueños y gerentes de cualquier negocio.",
    dato: { cifra: "6 h", texto: "por semana estima recuperar un trabajador si automatiza sus tareas repetitivas.", fuente: "Smartsheet" },
    demo: {
      tipo: "chat",
      intro: "Así le respondería tu asistente de reportes al dueño de un restaurante. Toca una pregunta y mira cómo responde.",
      negocio: "Restaurante · Reportes",
      saludo: "¡Hola! 📊 Soy tu asistente de reportes. Pregúntame cómo va el restaurante.",
      preguntas: [
        {
          pregunta: "¿Cómo nos fue esta semana?",
          respuesta: [
            { tipo: "texto", texto: "Aquí tienes el resumen de la semana:" },
            { tipo: "indicadores", titulo: "Resumen semanal", items: [["$4.820", "Ventas"], ["312", "Pedidos"]], barras: [40, 55, 48, 62, 70, 95, 80] },
            { tipo: "texto", texto: "El sábado fue tu mejor día. 📈" },
          ],
        },
        {
          pregunta: "¿Qué plato se vendió más?",
          respuesta: [
            { tipo: "texto", texto: "Estos fueron los más pedidos esta semana:" },
            { tipo: "ficha", titulo: "Más vendidos · Esta semana", filas: [["1. Menú del día", "148"], ["2. Hamburguesa clásica", "96"], ["3. Ensalada César", "71"]] },
          ],
        },
        {
          pregunta: "¿Cuántas reservas hay para el sábado?",
          respuesta: [
            { tipo: "texto", texto: "Tienes 14 reservas para el sábado:" },
            { tipo: "ficha", titulo: "Reservas · Sábado", filas: [["Almuerzo", "9 mesas"], ["Cena", "5 mesas"], ["Personas en total", "46"]] },
            { tipo: "texto", texto: "Te aviso si entra alguna nueva. 🔔" },
          ],
        },
      ],
    },
    faq: [
      { pregunta: "¿Qué datos puedo ver?", respuesta: "Los que tu negocio ya genera: ventas, citas, consultas y más." },
      { pregunta: "¿Cada cuánto llegan?", respuesta: "Tú eliges: diario, semanal o mensual." },
    ],
    relacionados: ["crm-y-seguimiento-de-leads", "agendamiento-y-recordatorios", "apps-y-sistemas-a-medida"],
  },

  // ------------------------------------------------------------------ 07
  {
    slug: "webs-con-ia",
    nombre: "Webs con IA integrada",
    corto: "Webs con IA",
    linea: "Una web que no solo se ve bien: responde y te trae clientes.",
    subtitulo: "Una web que no solo se ve bien: responde, capta clientes y se conecta con tu WhatsApp.",
    icono: "navegador",
    seo: {
      titulo: "Webs con IA integrada para tu negocio",
      descripcion: "Creamos webs modernas para tu negocio con WhatsApp integrado, formularios que guardan cada contacto y la opción de un asistente con IA que atiende por ti.",
    },
    problema: "Muchas webs son folletos que nadie mira y no generan contactos.",
    pasos: [
      "Diseñamos tu web.",
      "La conectamos con WhatsApp y tus formularios.",
      "Si quieres, sumamos un asistente con IA.",
    ],
    incluye: ["diseño a medida", "rápida en celular", "formularios conectados", "asistente con IA opcional"],
    idealPara: "negocios que quieren captar clientes desde internet.",
    dato: { cifra: "12,6 M", texto: "de personas usan WhatsApp cada semana en Ecuador.", fuente: "Sensor Tower, 2025" },
    demo: {
      tipo: "web",
      titulo: "Mira cómo se vería.",
      intro: "Tu web, con un botón de WhatsApp siempre a mano, un formulario que guarda cada contacto en tu registro de clientes y, si lo quieres, un asistente que responde por ti.",
      nota: "Este mismo sitio es un ejemplo de nuestro trabajo: se ve bien en el celular y en la computadora, carga rápido y cada botón te lleva directo a WhatsApp.",
    },
    faq: [
      { pregunta: "¿Incluye dominio y hosting?", respuesta: "Lo vemos en la propuesta según tu caso." },
      { pregunta: "¿Puedo actualizarla yo?", respuesta: "Sí, podemos dejarte una forma simple de editarla." },
    ],
    relacionados: ["atencion-y-ventas-whatsapp", "crm-y-seguimiento-de-leads", "apps-y-sistemas-a-medida"],
  },

  // ------------------------------------------------------------------ 08
  {
    slug: "apps-y-sistemas-a-medida",
    nombre: "Apps y sistemas a medida",
    corto: "Apps a medida",
    linea: "Herramientas que funcionan en el navegador, hechas para cómo trabaja tu negocio.",
    subtitulo: "Herramientas que funcionan desde el navegador, hechas para cómo trabaja tu negocio.",
    icono: "bloques",
    seo: {
      titulo: "Apps y sistemas a medida para tu negocio",
      descripcion: "Desarrollamos portales de clientes, paneles internos y herramientas a medida que funcionan desde el navegador, adaptadas a la forma en que trabaja tu negocio.",
    },
    problema: "Hojas de cálculo sueltas y procesos a mano que ya no dan abasto.",
    pasos: [
      "Entendemos tu proceso.",
      "Diseñamos la herramienta.",
      "La construimos y la ponemos a funcionar con tu equipo.",
    ],
    incluye: ["portales para clientes", "paneles internos", "conexión con tus sistemas", "sin instalar nada"],
    idealPara: "negocios con procesos propios que ningún programa estándar resuelve.",
    demo: {
      tipo: "panel",
      titulo: "Así se vería tu panel.",
      intro: "Un portal donde tus clientes ven el estado de sus pedidos y tu equipo lo maneja todo desde un solo lugar, en la computadora o en el celular.",
    },
    faq: [
      { pregunta: "¿Es una app de celular?", respuesta: "Es una app web: funciona en celular y computadora desde el navegador, sin descargar nada." },
      { pregunta: "¿Cuánto tarda?", respuesta: "Depende del alcance; lo definimos en la propuesta." },
    ],
    relacionados: ["webs-con-ia", "reportes-y-dashboards", "interpretacion-de-documentos"],
  },
];

// "¿Tu proceso no está aquí?" (portada y /servicios)
export const EXTRA_A_MEDIDA = {
  titulo: "¿Tu proceso no está aquí? Lo diseñamos contigo.",
  boton: "Cuéntanos por WhatsApp",
  mensaje: "Hola Noda, quiero automatizar un proceso de mi negocio",
};

export const numeroServicio = (i: number) => String(i + 1).padStart(2, "0");

export const mensajeInteres = (s: Servicio) => `Hola Noda, me interesa ${s.nombre}`;

// Filtros de /servicios (un servicio puede estar en varios grupos). "todos" no lleva lista.
export const FILTROS_SERVICIOS: { id: string; nombre: string; servicios?: string[] }[] = [
  { id: "todos", nombre: "Todos" },
  { id: "vender", nombre: "Vender más", servicios: ["atencion-y-ventas-whatsapp", "cotizaciones-al-instante", "crm-y-seguimiento-de-leads", "webs-con-ia"] },
  { id: "ahorrar", nombre: "Ahorrar tiempo", servicios: ["agendamiento-y-recordatorios", "interpretacion-de-documentos", "reportes-y-dashboards"] },
  { id: "ordenar", nombre: "Ordenar mi negocio", servicios: ["crm-y-seguimiento-de-leads", "reportes-y-dashboards", "apps-y-sistemas-a-medida"] },
];
