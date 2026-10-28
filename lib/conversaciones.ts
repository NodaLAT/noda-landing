// Conversaciones de ejemplo de docs/contenido-web-v3.md (todas se muestran con la etiqueta "Demo").
// Se dibujan en el teléfono oscuro (components/portada/Telefono.tsx). Las horas son solo de ambientación.

export type MsgTelefono =
  | { de: "cliente" | "bot"; texto: string; hora: string }
  | { de: "bot"; archivo: { nombre: string; detalle: string }; hora: string };

export type Conversacion = { negocio: string; mensajes: MsgTelefono[]; aviso?: string };

export const AVISO_SALUD = "Esta explicación es orientativa y no reemplaza la consulta con tu médico.";

export const CONVERSACIONES = {
  atiende: {
    negocio: "Ferretería",
    mensajes: [
      { de: "cliente", texto: "Hola, ¿tienen taladro inalámbrico?", hora: "18:12" },
      { de: "bot", texto: "¡Sí! Tenemos 3 modelos disponibles. ¿Te envío fotos y precios?", hora: "18:12" },
      { de: "cliente", texto: "Sí, por favor.", hora: "18:13" },
      { de: "bot", texto: "Aquí tienes. ¿Te lo separo para que lo retires hoy?", hora: "18:13" },
    ],
  },
  agenda: {
    negocio: "Clínica dental",
    mensajes: [
      { de: "cliente", texto: "Quiero una limpieza esta semana.", hora: "9:20" },
      { de: "bot", texto: "Tengo jueves 10:00 o viernes 16:00. ¿Cuál prefieres?", hora: "9:20" },
      { de: "cliente", texto: "Jueves.", hora: "9:21" },
      { de: "bot", texto: "Listo, te espero el jueves a las 10:00. Te escribo un día antes para recordártelo.", hora: "9:21" },
    ],
  },
  cotiza: {
    negocio: "Taller automotriz",
    mensajes: [
      { de: "cliente", texto: "¿Cuánto me sale cambiar las pastillas de freno de un Chevrolet Sail?", hora: "11:05" },
      { de: "bot", texto: "Te armo la cotización con repuestos y mano de obra…", hora: "11:05" },
      { de: "bot", texto: "Aquí la tienes. ¿Quieres agendar el ingreso al taller?", hora: "11:06" },
    ],
  },
  interpreta: {
    negocio: "Laboratorio",
    mensajes: [
      { de: "cliente", texto: "¿Ya están mis resultados?", hora: "9:41" },
      { de: "bot", texto: "Sí, aquí los tienes.", hora: "9:41" },
      { de: "bot", archivo: { nombre: "Resultados.pdf", detalle: "1 página · 212 KB" }, hora: "9:41" },
      { de: "cliente", texto: "¿Me explicas qué significan?", hora: "9:42" },
      { de: "bot", texto: "Claro. Tus valores están dentro del rango esperado. Te explico cada uno en palabras simples.", hora: "9:42" },
    ],
    aviso: AVISO_SALUD,
  },
} satisfies Record<string, Conversacion>;
