// =====================================================================
// SERVICIOS DE NODA — fuente única de datos
// ---------------------------------------------------------------------
// La red de la portada, la cartelera (/servicios) y cada página
// (/servicios/[slug]) se arman solas a partir de esta lista.
// Para agregar un servicio nuevo:
//   1. Copia una entrada de SERVICIOS y cambia sus textos.
//   2. Dale un "slug" único (será la dirección: /servicios/tu-slug).
//
// PENDIENTES: las listas vacías (incluye, idealPara, faq) se muestran en la
// página como "[PENDIENTE: …]" hasta que tengan contenido aprobado.
//
// PRECIOS: no están aprobados. Mientras "mostrarPrecio" sea false,
// la página muestra "Cotiza a medida".
// =====================================================================

export type Precio = {
  setup: number | null;      // pago único de implementación (USD)
  mensual: number | null;    // pago mensual (USD)
  mostrarPrecio: boolean;
};

// Íconos de línea (components/portada/Iconos.tsx), los mismos de la red de la portada.
export type Icono = "chat" | "calendario" | "calculadora" | "documento" | "personas" | "barras" | "navegador" | "bloques";

// Mensajes que el asistente puede mostrar en un chat de ejemplo.
export type Mensaje =
  | { tipo: "texto"; texto: string; de?: "cliente" }   // de: "cliente" = respuesta simulada del visitante
  | { tipo: "confirmacion"; titulo: string; detalle: string; etiqueta: string }
  | { tipo: "cotizacion"; titulo: string; filas: [string, string][]; total: string; nota?: string }
  | { tipo: "ficha"; titulo: string; filas: [string, string][] }
  | { tipo: "indicadores"; titulo: string; items: [string, string][]; barras: number[] };

export type DemoChat = {
  tipo: "chat";
  titulo: string;
  intro: string;
  negocio: string;        // nombre que aparece arriba del chat (rubro, nunca un cliente real)
  saludo: string;
  preguntas: { pregunta: string; respuesta: Mensaje[] }[];
  aviso?: string;         // nota fija bajo la demo (obligatoria en demos de salud)
};
export type DemoWeb = { tipo: "web"; titulo: string; intro: string; nota: string };
export type DemoPanel = { tipo: "panel"; titulo: string; intro: string };

export type CasoReal = {
  negocio: string;
  iniciales: string;
  sector: string;
  ciudad: string;
  descripcion: string;
  puntos?: string[];
  etiquetas?: string[];
  conversacion?: { de: "cliente" | "bot"; texto: string }[];
  // Video del flujo real: dirección de YouTube o archivo en /public (ej. "/videos/vyr.mp4").
  // Mientras esté vacío, el bloque de video no se muestra.
  video?: string;
};

// Cifra destacada con su fuente. Solo cifras con fuente aprobada (ver CIFRAS más abajo).
export type Dato = { cifra: string; texto: string; fuente: string };

export type Servicio = {
  slug: string;
  nombre: string;
  corto: string;            // nombre corto (nodo de la red de la portada)
  linea: string;            // una línea de descripción (red de la portada y tarjeta de /servicios)
  promesa: string;          // la promesa en una frase (encabezado de la página)
  resumen: string;          // descripción más larga
  icono: Icono;
  destacado?: boolean;      // servicio estrella
  precio: Precio;
  seo: { titulo: string; descripcion: string };
  problema: { titulo: string; texto: string; puntos: string[] };
  pasos: { titulo: string; texto: string }[];   // "Cómo funciona": siempre 3
  incluye: string[];        // "Qué incluye" (vacío = PENDIENTE)
  idealPara: string[];      // "Ideal para" (vacío = PENDIENTE)
  dato: Dato;
  demo: DemoChat | DemoWeb | DemoPanel;
  faq: { pregunta: string; respuesta: string }[];   // vacío = PENDIENTE
  relacionados: string[];   // slugs de servicios que se combinan bien con este
  caso?: CasoReal;          // guardado para usarlo después; la plantilla actual no lo muestra
};

const SIN_PRECIO: Precio = { setup: null, mensual: null, mostrarPrecio: false };

// Cifras aprobadas, cada una con su fuente (textos tomados del sitio anterior).
const CIFRAS = {
  whatsapp: { cifra: "12,6 M", texto: "de personas usan WhatsApp cada semana en Ecuador.", fuente: "Sensor Tower, 2025" },
  respuesta: { cifra: "7×", texto: "más probabilidad de concretar una venta si respondes en la primera hora.", fuente: "Harvard Business Review" },
  repetitivas: { cifra: "40 %+", texto: "de los trabajadores dedica al menos un cuarto de su semana a tareas repetitivas.", fuente: "Smartsheet, Automation in the Workplace" },
  horas: { cifra: "6 h", texto: "por semana que un trabajador estima recuperar automatizando tareas repetitivas.", fuente: "Smartsheet, Automation in the Workplace" },
  inasistencias: { cifra: "−25 %", texto: "de inasistencias cuando tus clientes reciben recordatorios.", fuente: "BMJ Open, 2016" },
} satisfies Record<string, Dato>;

const VYR = {
  negocio: "Laboratorios VyR San Rafael",
  iniciales: "VR",
  sector: "Salud · Laboratorios clínicos",
  ciudad: "Quito",
};

export const SERVICIOS: Servicio[] = [
  // ------------------------------------------------------------------ 1
  {
    slug: "atencion-y-ventas-whatsapp",
    nombre: "Atención y ventas 24/7 por WhatsApp",
    corto: "Atención 24/7",
    linea: "Responde al instante, a cualquier hora, y le pasa a tu equipo al cliente listo para comprar.",
    promesa: "Tu negocio responde al instante, a cualquier hora, y no deja escapar ninguna venta.",
    resumen: "Un asistente que contesta en WhatsApp, resuelve dudas y le pasa la conversación a tu equipo cuando el cliente está listo para comprar.",
    icono: "chat",
    precio: SIN_PRECIO,
    seo: {
      titulo: "Atención y ventas 24/7 por WhatsApp",
      descripcion: "Un asistente con IA que atiende a tus clientes por WhatsApp a cualquier hora, responde sus preguntas y te avisa cuando están listos para comprar.",
    },
    problema: {
      titulo: "Cada mensaje sin respuesta es un cliente que se va.",
      texto: "Tus clientes escriben cuando pueden: de noche, en feriado o mientras tu equipo está ocupado. Si la respuesta tarda, buscan a otro. Y responder las mismas preguntas una y otra vez le quita horas a tu equipo.",
      puntos: [
        "Mensajes que llegan fuera de horario y se contestan al día siguiente.",
        "Las mismas preguntas de precios, horarios y ubicación, todos los días.",
        "Clientes interesados que se enfrían mientras esperan una respuesta.",
      ],
    },
    demo: {
      tipo: "chat",
      titulo: "Pruébalo tú mismo.",
      intro: "Así atendería tu asistente a los clientes de una ferretería. Toca una de las preguntas y mira cómo responde.",
      negocio: "Ferretería · Asistente",
      saludo: "¡Hola! 👋 Soy el asistente de la ferretería. ¿En qué te ayudo?",
      preguntas: [
        {
          pregunta: "¿Hasta qué hora atienden hoy?",
          respuesta: [
            { tipo: "texto", texto: "Hoy atendemos hasta las 7:00 pm. 🕖" },
            { tipo: "texto", texto: "Si quieres, te separo lo que necesitas para que solo pases a retirarlo." },
          ],
        },
        {
          pregunta: "¿Tienen taladro percutor?",
          respuesta: [
            { tipo: "texto", texto: "¡Sí! Tenemos estos modelos disponibles hoy:" },
            { tipo: "ficha", titulo: "Disponible en tienda", filas: [["Taladro percutor 600 W", "$54.90"], ["Taladro percutor 800 W", "$79.00"]] },
            { tipo: "texto", texto: "¿Quieres que te separe uno?" },
          ],
        },
        {
          pregunta: "Quiero comprar, ¿cómo pago?",
          respuesta: [
            { tipo: "texto", texto: "¡Perfecto! Puedes pagar con transferencia, tarjeta o en efectivo en la tienda." },
            { tipo: "texto", texto: "Te paso con una persona del equipo para confirmar tu pedido. 🙌" },
            { tipo: "confirmacion", titulo: "Asesor avisado", detalle: "Continúa la conversación contigo", etiqueta: "Listo para comprar" },
          ],
        },
      ],
    },
    pasos: [
      { titulo: "Preparamos tu asistente", texto: "Aprende a responder con la información de tu negocio y con el tono de tu marca." },
      { titulo: "Lo activamos en tu WhatsApp", texto: "Empieza a atender en tu número de siempre, sin que tus clientes tengan que hacer nada distinto." },
      { titulo: "Tu equipo cierra la venta", texto: "Cuando un cliente quiere comprar o pide hablar con una persona, el asistente le pasa la conversación a tu equipo." },
    ],
    incluye: [],
    idealPara: [],
    dato: CIFRAS.whatsapp,
    faq: [],
    relacionados: ["agendamiento-y-recordatorios", "cotizaciones-al-instante", "crm-y-seguimiento-de-leads"],
    caso: {
      ...VYR,
      descripcion: "En Laboratorios VyR San Rafael, el asistente atiende a los pacientes las 24 horas por WhatsApp: precios, horarios, servicios y estado de sus resultados. Cuando el resultado está listo, se lo envía automáticamente, y si el paciente necesita hablar con una persona, la secretaria toma la conversación.",
      puntos: [
        "Atención 24/7 por WhatsApp",
        "Entrega automática de resultados",
        "Paso a la secretaria cuando hace falta",
      ],
    },
  },

  // ------------------------------------------------------------------ 2
  {
    slug: "agendamiento-y-recordatorios",
    nombre: "Agendamiento y recordatorios",
    corto: "Agendamiento",
    linea: "Tus clientes reservan solos y reciben un recordatorio para que no falten.",
    promesa: "Tus clientes reservan solos, a cualquier hora, y llegan a su cita.",
    resumen: "Citas que se reservan desde WhatsApp, confirmaciones automáticas y recordatorios para que nadie se olvide.",
    icono: "calendario",
    precio: SIN_PRECIO,
    seo: {
      titulo: "Agendamiento de citas y recordatorios por WhatsApp",
      descripcion: "Tus clientes agendan, cambian y confirman sus citas por WhatsApp, a cualquier hora, y reciben recordatorios automáticos para no faltar.",
    },
    problema: {
      titulo: "Agendar a mano te quita tiempo y te hace perder citas.",
      texto: "Anotar citas en un cuaderno o en varios chats a la vez termina en horarios cruzados, olvidos y clientes que no llegan. Cada cita perdida es un espacio que nadie más pudo usar.",
      puntos: [
        "Citas duplicadas o anotadas en el horario equivocado.",
        "Clientes que olvidan su cita y no avisan.",
        "Tu equipo pasa el día confirmando y reprogramando por teléfono.",
      ],
    },
    demo: {
      tipo: "chat",
      titulo: "Pruébalo tú mismo.",
      intro: "Así agendaría tu asistente las citas de una veterinaria. Toca una de las preguntas y mira cómo responde.",
      negocio: "Veterinaria · Asistente",
      saludo: "¡Hola! 🐾 Soy el asistente de la veterinaria. ¿Quieres agendar una cita?",
      preguntas: [
        {
          pregunta: "Quiero vacunar a mi perro mañana",
          respuesta: [
            { tipo: "texto", texto: "¡Claro! Mañana tengo libre a las 10:00 am y a las 4:30 pm. ¿Cuál prefieres?" },
            { tipo: "texto", texto: "A las 10:00 am, por favor", de: "cliente" },
            { tipo: "texto", texto: "¡Listo! Te reservé a las 10:00 am. ✅" },
            { tipo: "confirmacion", titulo: "Cita confirmada", detalle: "Mañana · 10:00 am · Vacunación", etiqueta: "Recordatorio programado" },
          ],
        },
        {
          pregunta: "Necesito cambiar mi cita",
          respuesta: [
            { tipo: "texto", texto: "Sin problema. Tu cita actual es el jueves a las 3:00 pm." },
            { tipo: "texto", texto: "La moví al viernes a las 11:00 am, que es el primer espacio libre. ✅" },
            { tipo: "confirmacion", titulo: "Cita reprogramada", detalle: "Viernes · 11:00 am", etiqueta: "Horario anterior liberado" },
          ],
        },
        {
          pregunta: "¿Me recuerdan antes de la cita?",
          respuesta: [
            { tipo: "texto", texto: "¡Sí! Te escribo un día antes y otra vez unas horas antes. 🔔" },
            { tipo: "ficha", titulo: "Tus recordatorios", filas: [["1 día antes", "Fecha y hora"], ["2 horas antes", "Recordatorio y ubicación"]] },
            { tipo: "texto", texto: "Si no puedes venir, me respondes y te ayudo a cambiarla." },
          ],
        },
      ],
    },
    pasos: [
      { titulo: "Conectamos tu calendario", texto: "Las citas quedan en el calendario que ya usas, sin cruces de horario." },
      { titulo: "Tus clientes reservan solos", texto: "Eligen fecha y hora desde WhatsApp, a cualquier hora del día." },
      { titulo: "Recordatorios automáticos", texto: "Cada cliente recibe su confirmación y un recordatorio antes de su cita." },
    ],
    incluye: [],
    idealPara: [],
    dato: CIFRAS.inasistencias,
    faq: [],
    relacionados: ["atencion-y-ventas-whatsapp", "crm-y-seguimiento-de-leads", "reportes-y-dashboards"],
  },

  // ------------------------------------------------------------------ 3
  {
    slug: "cotizaciones-al-instante",
    nombre: "Cotizaciones al instante",
    corto: "Cotizaciones",
    linea: "Precio en segundos, con tus tarifas y tu formato.",
    promesa: "Tus clientes piden precio y reciben su cotización en segundos, con tu formato.",
    resumen: "Cotizaciones completas en segundos, con tus precios, tus márgenes y tu formato, directo en WhatsApp.",
    icono: "calculadora",
    precio: SIN_PRECIO,
    seo: {
      titulo: "Cotizaciones al instante por WhatsApp",
      descripcion: "Tus clientes piden precio por WhatsApp y reciben una cotización clara en segundos, con tus precios y tu formato. Sin hojas de cálculo.",
    },
    problema: {
      titulo: "Mientras armas la cotización, tu cliente compra en otro lado.",
      texto: "Preparar cada cotización a mano toma tiempo: buscar precios, sumar, darle formato y enviarla. Cuando por fin llega, muchas veces el cliente ya decidió.",
      puntos: [
        "Cotizaciones que tardan horas o días en salir.",
        "Errores de precio o de suma que te cuestan dinero.",
        "Tu equipo pasa más tiempo cotizando que vendiendo.",
      ],
    },
    demo: {
      tipo: "chat",
      titulo: "Pruébalo tú mismo.",
      intro: "Así cotizaría tu asistente en un taller automotriz. Toca una de las preguntas y mira cómo responde.",
      negocio: "Taller automotriz · Asistente",
      saludo: "¡Hola! 🔧 Soy el asistente del taller. Dime qué necesita tu vehículo y te cotizo al instante.",
      preguntas: [
        {
          pregunta: "¿Cuánto cuesta un cambio de aceite?",
          respuesta: [
            { tipo: "texto", texto: "Te paso la cotización 👇" },
            { tipo: "cotizacion", titulo: "Cotización · Cambio de aceite", filas: [["Aceite sintético 4 L", "$38.00"], ["Filtro de aceite", "$9.50"], ["Mano de obra", "$10.00"]], total: "$57.50", nota: "Válida por 7 días" },
            { tipo: "texto", texto: "¿Quieres que te agende para esta semana?" },
          ],
        },
        {
          pregunta: "Cotízame las pastillas de freno delanteras",
          respuesta: [
            { tipo: "texto", texto: "¡Claro! Esto es lo que incluye:" },
            { tipo: "cotizacion", titulo: "Cotización · Frenos delanteros", filas: [["Pastillas delanteras", "$42.00"], ["Revisión de discos", "Incluida"], ["Mano de obra", "$20.00"]], total: "$62.00", nota: "Válida por 7 días" },
            { tipo: "texto", texto: "El trabajo toma alrededor de una hora." },
          ],
        },
        {
          pregunta: "¿Cuánto cuesta el mantenimiento de 10.000 km?",
          respuesta: [
            { tipo: "texto", texto: "El mantenimiento de 10.000 km incluye:" },
            { tipo: "cotizacion", titulo: "Cotización · Mantenimiento 10.000 km", filas: [["Aceite y filtro", "$47.50"], ["Revisión de frenos", "$15.00"], ["Revisión de suspensión", "$15.00"], ["Diagnóstico general", "$20.00"]], total: "$97.50" },
            { tipo: "texto", texto: "El precio final puede variar según el modelo de tu vehículo." },
          ],
        },
      ],
    },
    pasos: [
      { titulo: "Diseñamos tu formato", texto: "La cotización sale con tu logo, tus datos y las condiciones que tú definas." },
      { titulo: "Cotiza en segundos", texto: "El cliente pide precio por WhatsApp y recibe su cotización completa al instante." },
      { titulo: "Tú das seguimiento", texto: "Cada cotización queda registrada para que tu equipo sepa a quién llamar." },
    ],
    incluye: [],
    idealPara: [],
    dato: CIFRAS.respuesta,
    faq: [],
    relacionados: ["atencion-y-ventas-whatsapp", "crm-y-seguimiento-de-leads", "interpretacion-de-documentos"],
  },

  // ------------------------------------------------------------------ 4 (servicio estrella)
  {
    slug: "interpretacion-de-documentos",
    nombre: "Interpretación de documentos con IA",
    corto: "Interpretación con IA",
    linea: "Lee resultados, facturas u órdenes y los explica en palabras simples.",
    promesa: "La IA lee tus documentos y los explica en palabras simples, al instante.",
    resumen: "Resultados, informes, facturas u órdenes: la IA los lee, extrae lo importante y se lo explica a tu cliente o a tu equipo en lenguaje claro.",
    icono: "documento",
    destacado: true,
    precio: SIN_PRECIO,
    seo: {
      titulo: "Interpretación de documentos con IA",
      descripcion: "La IA lee resultados, informes, facturas u órdenes, extrae lo importante y lo explica en palabras simples a tus clientes o a tu equipo.",
    },
    problema: {
      titulo: "Tus clientes reciben documentos que no entienden, y tu equipo pasa horas explicándolos o copiándolos a mano.",
      texto: "Resultados, informes, facturas, órdenes: están llenos de términos y datos que no todos entienden. Tus clientes escriben para preguntar qué significan, y tu equipo repite la misma explicación o pasa los datos a mano, uno por uno.",
      puntos: [
        "Clientes que no entienden los documentos que reciben.",
        "Tu equipo explica lo mismo una y otra vez.",
        "Datos que se copian a mano, con riesgo de errores.",
      ],
    },
    demo: {
      tipo: "chat",
      titulo: "Pruébalo tú mismo.",
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
            { tipo: "ficha", titulo: "Factura de proveedor · Demo", filas: [["N.º de factura", "001-002-000123"], ["Subtotal", "$120.00"], ["IVA", "$18.00"], ["Total", "$138.00"]] },
            { tipo: "texto", texto: "La guardé en tu registro de compras." },
          ],
        },
      ],
      aviso: "Esta explicación es orientativa y no reemplaza la consulta con tu médico.",
    },
    pasos: [
      { titulo: "Preparamos la lectura con tus formatos", texto: "La IA aprende a reconocer tus documentos, incluso fotos o documentos escritos a mano." },
      { titulo: "Llega el documento", texto: "Por WhatsApp, por tu web o desde tu propio sistema, y se lee en segundos." },
      { titulo: "Tu cliente o tu equipo recibe la explicación", texto: "En palabras simples y con lo importante ordenado, sin copiar nada a mano." },
    ],
    incluye: [],
    idealPara: [],
    dato: CIFRAS.repetitivas,
    faq: [],
    relacionados: ["atencion-y-ventas-whatsapp", "cotizaciones-al-instante", "apps-y-sistemas-a-medida"],
    caso: {
      ...VYR,
      descripcion: "Cuando un resultado está listo, el paciente lo recibe por WhatsApp junto con una explicación clara, generada por IA, de lo que significan sus valores, siempre con la recomendación de revisarlo con su médico. En funcionamiento desde julio de 2026.",
      video: "",   // pega aquí el enlace del video cuando esté listo
    },
  },

  // ------------------------------------------------------------------ 5
  {
    slug: "crm-y-seguimiento-de-leads",
    nombre: "CRM y seguimiento de leads",
    corto: "CRM y leads",
    linea: "Cada cliente registrado y con seguimiento, para que ninguno se enfríe.",
    promesa: "Cada cliente interesado queda registrado y recibe seguimiento, sin que tengas que acordarte.",
    resumen: "Cada persona que te escribe queda registrada con lo que busca y recibe seguimiento automático hasta que decide.",
    icono: "personas",
    precio: SIN_PRECIO,
    seo: {
      titulo: "CRM y seguimiento de clientes potenciales",
      descripcion: "Registra automáticamente a cada persona interesada en tu negocio, organiza en qué etapa está y dale seguimiento sin depender de la memoria de tu equipo.",
    },
    problema: {
      titulo: "Los clientes interesados se pierden entre chats y libretas.",
      texto: "Alguien pregunta, se le responde y luego nadie vuelve a escribirle. Sin un registro ordenado no sabes quién está interesado, en qué quedó cada conversación ni a quién llamar hoy.",
      puntos: [
        "Contactos repartidos en varios teléfonos y conversaciones.",
        "Interesados que nunca reciben un segundo mensaje.",
        "No sabes cuántas oportunidades tienes ni en qué etapa están.",
      ],
    },
    demo: {
      tipo: "chat",
      titulo: "Pruébalo tú mismo.",
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
    pasos: [
      { titulo: "Registro automático", texto: "Cada conversación de WhatsApp o de tu web crea o actualiza la ficha del cliente." },
      { titulo: "Seguimiento sin olvidos", texto: "Los mensajes de seguimiento salen solos, en el momento indicado." },
      { titulo: "Avisos a tu equipo", texto: "Cuando alguien quiere comprar, tu equipo recibe un aviso para cerrar la venta." },
    ],
    incluye: [],
    idealPara: [],
    dato: CIFRAS.respuesta,
    faq: [],
    relacionados: ["atencion-y-ventas-whatsapp", "cotizaciones-al-instante", "reportes-y-dashboards"],
  },

  // ------------------------------------------------------------------ 6
  {
    slug: "reportes-y-dashboards",
    nombre: "Reportes y dashboards",
    corto: "Reportes",
    linea: "Los números de tu negocio, claros, en tu correo o WhatsApp.",
    promesa: "Sabes cómo va tu negocio sin armar un solo reporte.",
    resumen: "Los datos que tu negocio ya genera se convierten en reportes claros que llegan a tu WhatsApp o a tu correo.",
    icono: "barras",
    precio: SIN_PRECIO,
    seo: {
      titulo: "Reportes y dashboards automáticos",
      descripcion: "Convierte los datos de tu negocio en reportes claros y paneles fáciles de leer, que llegan a tu WhatsApp o correo para que decidas con información real.",
    },
    problema: {
      titulo: "Decidir sin datos es decidir a ciegas.",
      texto: "La información de tu negocio está repartida en ventas, chats, hojas de cálculo y cuadernos. Juntarla toma horas, así que casi nunca se hace, y las decisiones se toman por intuición.",
      puntos: [
        "Reportes que alguien arma a mano, cuando tiene tiempo.",
        "Números que no coinciden de una fuente a otra.",
        "No sabes qué se vende más ni qué días hay más movimiento.",
      ],
    },
    demo: {
      tipo: "chat",
      titulo: "Pruébalo tú mismo.",
      intro: "Así le respondería tu asistente de reportes al dueño de un restaurante. Toca una pregunta y mira cómo responde.",
      negocio: "Restaurante · Reportes",
      saludo: "¡Hola! 📊 Soy tu asistente de reportes. Pregúntame cómo va el restaurante.",
      preguntas: [
        {
          pregunta: "¿Cómo nos fue esta semana?",
          respuesta: [
            { tipo: "texto", texto: "Aquí tienes el resumen de la semana:" },
            { tipo: "indicadores", titulo: "Resumen semanal", items: [["$4,820", "Ventas"], ["312", "Pedidos"]], barras: [40, 55, 48, 62, 70, 95, 80] },
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
    pasos: [
      { titulo: "Elegimos qué medir", texto: "Definimos contigo los números que de verdad importan para tu negocio." },
      { titulo: "Diseñamos tus reportes", texto: "Paneles claros y resúmenes fáciles de leer, sin tablas confusas." },
      { titulo: "Te llegan solos", texto: "Recibes tus reportes por WhatsApp o por correo, cada día o cada semana." },
    ],
    incluye: [],
    idealPara: [],
    dato: CIFRAS.repetitivas,
    faq: [],
    relacionados: ["crm-y-seguimiento-de-leads", "agendamiento-y-recordatorios", "apps-y-sistemas-a-medida"],
  },

  // ------------------------------------------------------------------ 7
  {
    slug: "webs-con-ia",
    nombre: "Webs con IA integrada",
    corto: "Webs con IA",
    linea: "Una web que no solo se ve bien: responde y te trae clientes.",
    promesa: "Una web que no solo se ve bien: atiende, registra a cada interesado y lo conecta con tu equipo.",
    resumen: "Webs modernas que vienen con WhatsApp, formularios conectados a tu registro de clientes y, si quieres, un asistente con IA.",
    icono: "navegador",
    precio: SIN_PRECIO,
    seo: {
      titulo: "Webs con IA integrada para tu negocio",
      descripcion: "Creamos webs modernas para tu negocio con WhatsApp integrado, formularios que guardan cada contacto y la opción de un asistente con IA que atiende por ti.",
    },
    problema: {
      titulo: "Una web que solo muestra información no vende.",
      texto: "Muchas webs son folletos digitales: se ven, pero no responden, no registran a nadie y no avisan cuando alguien está interesado. Los visitantes se van sin dejar rastro.",
      puntos: [
        "Visitantes que entran, miran y se van sin contactarte.",
        "Formularios que llegan a un correo que nadie revisa.",
        "Una web lenta o que se ve mal en el celular.",
      ],
    },
    demo: {
      tipo: "web",
      titulo: "Mira cómo se vería.",
      intro: "Tu web, con un botón de WhatsApp siempre a mano, un formulario que guarda cada contacto en tu registro de clientes y, si lo quieres, un asistente que responde por ti.",
      nota: "Este mismo sitio es un ejemplo de nuestro trabajo: se ve bien en el celular y en la computadora, carga rápido y cada botón te lleva directo a WhatsApp.",
    },
    pasos: [
      { titulo: "Diseñamos y construimos", texto: "Una web a la medida de tu marca, rápida y pensada primero para el celular." },
      { titulo: "Conectamos todo", texto: "WhatsApp, formularios que guardan cada contacto y, si lo quieres, un asistente con IA." },
      { titulo: "Publicamos y acompañamos", texto: "Tu web queda en línea y seguimos contigo para ajustes y mejoras." },
    ],
    incluye: [],
    idealPara: [],
    dato: CIFRAS.whatsapp,
    faq: [],
    relacionados: ["atencion-y-ventas-whatsapp", "crm-y-seguimiento-de-leads", "apps-y-sistemas-a-medida"],
  },

  // ------------------------------------------------------------------ 8
  {
    slug: "apps-y-sistemas-a-medida",
    nombre: "Apps y sistemas a medida",
    corto: "Apps a medida",
    linea: "Herramientas que funcionan en el navegador, hechas para cómo trabaja tu negocio.",
    promesa: "Herramientas hechas para la forma en que trabaja tu negocio, no al revés.",
    resumen: "Portales para tus clientes, paneles internos y herramientas que funcionan desde el navegador, sin instalar nada.",
    icono: "bloques",
    precio: SIN_PRECIO,
    seo: {
      titulo: "Apps y sistemas a medida para tu negocio",
      descripcion: "Desarrollamos portales de clientes, paneles internos y herramientas a medida que funcionan desde el navegador, adaptadas a la forma en que trabaja tu negocio.",
    },
    problema: {
      titulo: "Las herramientas genéricas no se adaptan a tu negocio.",
      texto: "Terminas usando tres programas, varias hojas de cálculo y mucho WhatsApp para algo que debería estar en un solo lugar. Tu equipo se adapta al programa, cuando debería ser al revés.",
      puntos: [
        "Información repartida entre hojas de cálculo y chats.",
        "Clientes que te escriben solo para preguntar cómo va su pedido.",
        "Procesos que dependen de que una sola persona se acuerde.",
      ],
    },
    demo: {
      tipo: "panel",
      titulo: "Así se vería tu panel.",
      intro: "Un portal donde tus clientes ven el estado de sus pedidos y tu equipo lo maneja todo desde un solo lugar, en la computadora o en el celular.",
    },
    pasos: [
      { titulo: "Diseñamos la herramienta", texto: "Te mostramos cómo se verá antes de construirla, para ajustarla contigo." },
      { titulo: "La construimos por etapas", texto: "Empezamos por lo más importante para que la uses lo antes posible." },
      { titulo: "Funciona desde el navegador", texto: "Tu equipo y tus clientes entran desde la computadora o el celular, sin instalar nada." },
    ],
    incluye: [],
    idealPara: [],
    dato: CIFRAS.horas,
    faq: [],
    relacionados: ["webs-con-ia", "reportes-y-dashboards", "interpretacion-de-documentos"],
  },
];

export const numeroServicio = (i: number) => String(i + 1).padStart(2, "0");

// Dólares con coma para miles y punto para decimales: 1500 → "$1,500"; 49.9 → "$49.90".
const dolares = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });

export function textoPrecio(p: Precio): string {
  if (!p.mostrarPrecio || (p.setup === null && p.mensual === null)) return "Cotiza a medida";
  const partes: string[] = [];
  if (p.setup !== null) partes.push(`${dolares(p.setup)} de implementación`);
  if (p.mensual !== null) partes.push(`${dolares(p.mensual)}/mes`);
  return "Desde " + partes.join(" + ");
}

export const mensajeInteres = (s: Servicio) => `Hola Noda, me interesa ${s.nombre}`;
