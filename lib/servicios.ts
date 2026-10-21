// =====================================================================
// SERVICIOS DE NODA — fuente única de datos
// ---------------------------------------------------------------------
// La cartelera (/servicios) y cada página (/servicios/[slug]) se arman
// solas a partir de esta lista. Para agregar un servicio nuevo:
//   1. Copia una entrada de SERVICIOS y cambia sus textos.
//   2. Dale un "slug" único (será la dirección: /servicios/tu-slug).
// El número de cada servicio sale de su posición en la lista.
//
// PRECIOS: no están aprobados. Mientras "mostrarPrecio" sea false,
// la tarjeta y la página muestran "Cotiza a medida".
// =====================================================================

export type Precio = {
  setup: number | null;      // pago único de implementación (USD)
  mensual: number | null;    // pago mensual (USD)
  mostrarPrecio: boolean;
};

export type Icono =
  | "chat" | "calendario" | "cotizacion" | "documento" | "contactos"
  | "reportes" | "web" | "panel" | "a-medida";

// Mensajes que el asistente puede mostrar en un chat de ejemplo.
export type Mensaje =
  | { tipo: "texto"; texto: string }
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
};
export type DemoWeb = { tipo: "web"; titulo: string; intro: string; nota: string };
export type DemoPanel = { tipo: "panel"; titulo: string; intro: string };

export type CasoReal = {
  negocio: string;
  iniciales: string;
  sector: string;
  ciudad: string;
  descripcion: string;
  puntos: string[];
  etiquetas: string[];
  conversacion?: { de: "cliente" | "bot"; texto: string }[];
  videoProximamente?: boolean;
};

export type Servicio = {
  slug: string;
  nombre: string;
  promesa: string;          // la promesa en una frase (encabezado de la página)
  resumen: string;          // texto corto de la tarjeta en la cartelera
  icono: Icono;
  destacado?: boolean;      // servicio estrella: se resalta en la cartelera
  precio: Precio;
  seo: { titulo: string; descripcion: string };
  problema: { titulo: string; texto: string; puntos: string[] };
  demo: DemoChat | DemoWeb | DemoPanel;
  pasos: { titulo: string; texto: string }[];   // siempre 4
  caso?: CasoReal;
};

const SIN_PRECIO: Precio = { setup: null, mensual: null, mostrarPrecio: false };

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
      { titulo: "Conocemos tu negocio", texto: "Reunimos tus preguntas frecuentes, precios, horarios y la forma en que vendes." },
      { titulo: "Preparamos tu asistente", texto: "Aprende a responder con la información de tu negocio y con el tono de tu marca." },
      { titulo: "Lo activamos en tu WhatsApp", texto: "Empieza a atender en tu número de siempre, sin que tus clientes tengan que hacer nada distinto." },
      { titulo: "Tu equipo cierra la venta", texto: "Cuando un cliente quiere comprar o pide hablar con una persona, el asistente le pasa la conversación a tu equipo." },
    ],
    caso: {
      ...VYR,
      descripcion: "Atención al paciente automatizada por WhatsApp, agendamiento de exámenes y recordatorios antes de la toma de muestra. La recepción se libera para concentrarse en lo que de verdad requiere atención humana.",
      puntos: [
        "Recepción liberada de consultas repetitivas a lo largo del día",
        "Agendamiento disponible 24/7 desde WhatsApp",
        "Recordatorios automáticos 24 horas antes de la cita",
        "Reporte diario al equipo con las consultas y citas del día",
      ],
      etiquetas: ["Asistente de WhatsApp", "Agendamiento", "Recordatorios", "Reportes"],
      conversacion: [
        { de: "cliente", texto: "Hola, necesito agendar un perfil lipídico" },
        { de: "bot", texto: "¡Hola! Claro 🩸 ¿Para qué fecha lo necesitas?" },
        { de: "cliente", texto: "Mañana en la mañana" },
        { de: "bot", texto: "✅ Listo. Te agendé mañana 8:30 AM. Recuerda venir en ayunas (8h). Te enviaré recordatorio esta noche." },
      ],
    },
  },

  // ------------------------------------------------------------------ 2
  {
    slug: "agendamiento-y-recordatorios",
    nombre: "Agendamiento y recordatorios",
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
            { tipo: "texto", texto: "¡Claro! Mañana tengo libre a las 10:00 am y a las 4:30 pm." },
            { tipo: "texto", texto: "Te reservé la primera. Si prefieres la otra, me avisas. 👇" },
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
      { titulo: "Definimos tu agenda", texto: "Horarios, servicios, duración de cada cita y quién atiende cada una." },
      { titulo: "Conectamos tu calendario", texto: "Las citas quedan en el calendario que ya usas, sin cruces de horario." },
      { titulo: "Tus clientes reservan solos", texto: "Eligen fecha y hora desde WhatsApp, a cualquier hora del día." },
      { titulo: "Recordatorios automáticos", texto: "Cada cliente recibe su confirmación y un recordatorio antes de su cita." },
    ],
  },

  // ------------------------------------------------------------------ 3
  {
    slug: "cotizaciones-al-instante",
    nombre: "Cotizaciones al instante",
    promesa: "Tus clientes piden precio y reciben su cotización en segundos, con tu formato.",
    resumen: "Cotizaciones completas en segundos, con tus precios, tus márgenes y tu formato, directo en WhatsApp.",
    icono: "cotizacion",
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
      { titulo: "Ordenamos tus precios", texto: "Tomamos tu lista de productos o servicios, tus márgenes y tus reglas de descuento." },
      { titulo: "Diseñamos tu formato", texto: "La cotización sale con tu logo, tus datos y las condiciones que tú definas." },
      { titulo: "Cotiza en segundos", texto: "El cliente pide precio por WhatsApp y recibe su cotización completa al instante." },
      { titulo: "Tú das seguimiento", texto: "Cada cotización queda registrada para que tu equipo sepa a quién llamar." },
    ],
  },

  // ------------------------------------------------------------------ 4 (servicio estrella)
  {
    slug: "interpretacion-de-documentos",
    nombre: "Interpretación de documentos con IA",
    promesa: "Tus clientes envían la foto de un documento y tu negocio entiende al instante qué necesitan.",
    resumen: "La IA lee órdenes, facturas, listas o formularios —incluso escritos a mano— y convierte cada documento en información ordenada, lista para usar.",
    icono: "documento",
    destacado: true,
    precio: SIN_PRECIO,
    seo: {
      titulo: "Interpretación de documentos con IA",
      descripcion: "Tus clientes envían fotos de órdenes, facturas o listas por WhatsApp y la IA las lee, entiende qué necesitan y deja la información lista para tu equipo.",
    },
    problema: {
      titulo: "Tu equipo pasa horas leyendo y copiando documentos.",
      texto: "Órdenes, recetas, facturas, listas escritas a mano: cada documento hay que leerlo, entenderlo y pasarlo a mano a otro lado. Es lento, cansado, y basta un error de tipeo para que algo salga mal.",
      puntos: [
        "Documentos con letra difícil que alguien tiene que descifrar.",
        "Datos que se copian a mano, uno por uno.",
        "Clientes que esperan mientras alguien revisa lo que enviaron.",
      ],
    },
    demo: {
      tipo: "chat",
      titulo: "Pruébalo tú mismo.",
      intro: "Elige un documento de ejemplo —de un laboratorio, una ferretería o una oficina contable— y mira cómo la IA lo lee y lo ordena.",
      negocio: "Asistente de documentos",
      saludo: "¡Hola! 📄 Envíame la foto de tu documento y te digo al instante qué entendí.",
      preguntas: [
        {
          pregunta: "📎 Foto de una orden médica",
          respuesta: [
            { tipo: "texto", texto: "Recibí tu orden. Esto es lo que entendí:" },
            { tipo: "ficha", titulo: "Orden médica · Laboratorio", filas: [["Exámenes", "Hemograma, glucosa, perfil lipídico"], ["Preparación", "Ayuno de 8 horas"], ["Tipo de muestra", "Sangre"]] },
            { tipo: "texto", texto: "¿Te agendo para mañana a primera hora?" },
          ],
        },
        {
          pregunta: "📎 Foto de una lista escrita a mano",
          respuesta: [
            { tipo: "texto", texto: "Leí tu lista escrita a mano ✍️. Esto es lo que encontré:" },
            { tipo: "ficha", titulo: "Lista de materiales · Ferretería", filas: [["Cemento 50 kg", "10 sacos"], ["Varilla 12 mm", "20 unidades"], ["Alambre de amarre", "5 kg"]] },
            { tipo: "texto", texto: "¿Te preparo la cotización?" },
          ],
        },
        {
          pregunta: "📎 Foto de una factura de proveedor",
          respuesta: [
            { tipo: "texto", texto: "Factura leída ✅. Estos son los datos:" },
            { tipo: "ficha", titulo: "Factura de proveedor", filas: [["N.º de factura", "001-002-000123"], ["Subtotal", "$120.00"], ["IVA", "$18.00"], ["Total", "$138.00"]] },
            { tipo: "texto", texto: "La guardé en tu registro de compras." },
          ],
        },
      ],
    },
    pasos: [
      { titulo: "Identificamos tus documentos", texto: "Vemos qué documentos recibes y qué datos necesitas sacar de cada uno." },
      { titulo: "Preparamos la lectura", texto: "La IA aprende a reconocer tus formatos, incluso fotos poco claras o escritos a mano." },
      { titulo: "Tu cliente envía una foto", texto: "Llega por WhatsApp o por tu web, y se lee en segundos." },
      { titulo: "La información queda lista", texto: "Los datos llegan ordenados a tu equipo o a tu sistema, sin copiar nada a mano." },
    ],
    // REVISAR: confirmar con Noda los detalles exactos de este flujo en VyR antes de publicar.
    caso: {
      ...VYR,
      descripcion: "Los pacientes envían por WhatsApp la foto de su orden médica. La IA la lee, identifica los exámenes solicitados y deja la información lista para que la recepción atienda sin transcribir nada.",
      puntos: [
        "Órdenes médicas recibidas por WhatsApp, a cualquier hora",
        "Exámenes identificados automáticamente a partir de la foto",
        "Información lista para la recepción, sin copiar a mano",
      ],
      etiquetas: ["Interpretación de documentos", "Asistente de WhatsApp", "Agendamiento"],
      videoProximamente: true,
    },
  },

  // ------------------------------------------------------------------ 5
  {
    slug: "crm-y-seguimiento-de-leads",
    nombre: "CRM y seguimiento de leads",
    promesa: "Cada cliente interesado queda registrado y recibe seguimiento, sin que tengas que acordarte.",
    resumen: "Cada persona que te escribe queda registrada con lo que busca y recibe seguimiento automático hasta que decide.",
    icono: "contactos",
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
            { tipo: "texto", texto: "¡Claro! Te agendé la visita para el sábado a las 11:00 am. ✅" },
            { tipo: "ficha", titulo: "Contacto actualizado", filas: [["Etapa", "Visita agendada"], ["Asesor", "Avisado"], ["Recordatorio", "El viernes"]] },
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
      { titulo: "Ordenamos tu proceso de venta", texto: "Definimos las etapas por las que pasa un cliente, desde que pregunta hasta que compra." },
      { titulo: "Registro automático", texto: "Cada conversación de WhatsApp o de tu web crea o actualiza la ficha del cliente." },
      { titulo: "Seguimiento sin olvidos", texto: "Los mensajes de seguimiento salen solos, en el momento indicado." },
      { titulo: "Avisos a tu equipo", texto: "Cuando alguien quiere comprar, tu equipo recibe un aviso para cerrar la venta." },
    ],
  },

  // ------------------------------------------------------------------ 6
  {
    slug: "reportes-y-dashboards",
    nombre: "Reportes y dashboards",
    promesa: "Sabes cómo va tu negocio sin armar un solo reporte.",
    resumen: "Los datos que tu negocio ya genera se convierten en reportes claros que llegan a tu WhatsApp o a tu correo.",
    icono: "reportes",
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
    pasos: [
      { titulo: "Reunimos tus datos", texto: "Conectamos las fuentes que ya usas: ventas, citas, chats u hojas de cálculo." },
      { titulo: "Elegimos qué medir", texto: "Definimos contigo los números que de verdad importan para tu negocio." },
      { titulo: "Diseñamos tus reportes", texto: "Paneles claros y resúmenes fáciles de leer, sin tablas confusas." },
      { titulo: "Te llegan solos", texto: "Recibes tus reportes por WhatsApp o por correo, cada día o cada semana." },
    ],
  },

  // ------------------------------------------------------------------ 7
  {
    slug: "webs-con-ia",
    nombre: "Webs con IA integrada",
    promesa: "Una web que no solo se ve bien: atiende, registra a cada interesado y lo conecta con tu equipo.",
    resumen: "Webs modernas que vienen con WhatsApp, formularios conectados a tu registro de clientes y, si quieres, un asistente con IA.",
    icono: "web",
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
      { titulo: "Entendemos tu negocio", texto: "Definimos a quién le habla tu web y qué quieres que haga cada visitante." },
      { titulo: "Diseñamos y construimos", texto: "Una web a la medida de tu marca, rápida y pensada primero para el celular." },
      { titulo: "Conectamos todo", texto: "WhatsApp, formularios que guardan cada contacto y, si lo quieres, un asistente con IA." },
      { titulo: "Publicamos y acompañamos", texto: "Tu web queda en línea y seguimos contigo para ajustes y mejoras." },
    ],
  },

  // ------------------------------------------------------------------ 8
  {
    slug: "apps-y-sistemas-a-medida",
    nombre: "Apps y sistemas a medida",
    promesa: "Herramientas hechas para la forma en que trabaja tu negocio, no al revés.",
    resumen: "Portales para tus clientes, paneles internos y herramientas que funcionan desde el navegador, sin instalar nada.",
    icono: "panel",
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
      { titulo: "Mapeamos tu proceso", texto: "Entendemos cómo trabaja tu equipo hoy y dónde se pierde tiempo." },
      { titulo: "Diseñamos la herramienta", texto: "Te mostramos cómo se verá antes de construirla, para ajustarla contigo." },
      { titulo: "La construimos por etapas", texto: "Empezamos por lo más importante para que la uses lo antes posible." },
      { titulo: "Funciona desde el navegador", texto: "Tu equipo y tus clientes entran desde la computadora o el celular, sin instalar nada." },
    ],
  },
];

// Tarjeta final de la cartelera: no tiene página propia, abre WhatsApp.
export const SERVICIO_A_MEDIDA = {
  nombre: "¿Tu proceso no está aquí? Lo diseñamos contigo",
  resumen: "Si es repetitivo y le quita tiempo a tu equipo, hay forma de automatizarlo. Agenda un diagnóstico gratis y lo vemos juntos.",
  cta: "Agendar diagnóstico",
  mensajeWhatsApp: "Hola Noda, quiero agendar un diagnóstico para automatizar un proceso de mi negocio",
};

export const numeroServicio = (i: number) => String(i + 1).padStart(2, "0");

export function textoPrecio(p: Precio): string {
  if (!p.mostrarPrecio || (p.setup === null && p.mensual === null)) return "Cotiza a medida";
  const partes: string[] = [];
  if (p.setup !== null) partes.push(`$${p.setup} de implementación`);
  if (p.mensual !== null) partes.push(`$${p.mensual}/mes`);
  return "Desde " + partes.join(" + ");
}

export const mensajeInteres = (s: Servicio) => `Hola Noda, me interesa ${s.nombre}`;
