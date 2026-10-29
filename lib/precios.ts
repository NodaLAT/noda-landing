// =====================================================================
// PRECIOS DE NODA — todos los precios en un solo lugar (USD, sin IVA)
// ---------------------------------------------------------------------
// "normal" es el precio de lista; "oferta" es el precio de lanzamiento. En las mensualidades,
// la oferta aplica solo los primeros 3 meses (MESES_OFERTA); desde el mes 4 rige la normal.
// Hasta FIN_OFERTA el sitio muestra el normal tachado y la oferta; después,
// muestra solo el normal y oculta todo lo de la oferta (también en el navegador,
// sin volver a publicar: ver el script de app/layout.tsx).
// Servicios sin entrada aquí muestran "Cotiza a medida".
// =====================================================================

// Fin de la oferta de lanzamiento: 31 de diciembre de 2026, 23:59, hora de Ecuador (UTC−5).
export const FIN_OFERTA = "2026-12-31T23:59:59-05:00";
export const FIN_OFERTA_MS = Date.parse(FIN_OFERTA);
export const VIGENCIA = "Válido para contratos hasta el 31 de diciembre de 2026.";
export const NOTA_REFERENCIAL = "Precio referencial. Lo confirmamos en el diagnóstico gratuito.";
export const NOTA_PAGO_UNICO = "Implementación en un pago único.";
export const BARRA_OFERTA = "Precios de lanzamiento · hasta 100 USD menos en tu implementación y 3 meses de mensualidad rebajada · hasta el 31 de diciembre";
export const BARRA_OFERTA_CORTA = "Precios de lanzamiento hasta el 31/12 →";   // celular (menos de 640 px)
// La mensualidad de oferta solo rige los primeros MESES_OFERTA meses; desde el siguiente, la normal.
export const MESES_OFERTA = 3;
export const TEXTO_MESES = `primeros ${MESES_OFERTA} meses`;
export const TEXTO_DESDE_MES = `Desde el mes ${MESES_OFERTA + 1}`;

export const ofertaVigente = (ahora: number = Date.now()) => ahora <= FIN_OFERTA_MS;

export type Monto = { normal: number; oferta?: number };          // sin "oferta" = no tiene descuento
export type Modulo = { id: string; nombre: string; precio: number | null };   // null = se cotiza aparte
export type Tramo = { id: string; nombre: string; mensual: Monto | null };    // null = a cotizar

export type PrecioServicio = {
  implementacion: Monto;
  mensual?: Monto;                // mensualidad "desde" (la más baja)
  mensualNombre?: string;         // etiqueta de la segunda fila (por defecto "Mensualidad")
  incluye?: string;               // qué trae la implementación base
  modulos?: Modulo[];
  tramos?: Tramo[];
  combo?: { porcentaje: number; con: string[] };   // descuento al contratar junto con otros servicios (no vence; sobre el precio vigente)
};

// Las claves son los slugs de lib/servicios.ts.
export const PRECIOS: Record<string, PrecioServicio> = {
  "atencion-y-ventas-whatsapp": {
    implementacion: { normal: 350, oferta: 250 },
    mensual: { normal: 89, oferta: 70 },
    incluye: "Incluye respuestas con tu información, atención 24/7, paso a una persona e historial.",
    modulos: [
      { id: "catalogo", nombre: "Catálogo o lista de precios", precio: 50 },
      { id: "documentos", nombre: "Envío automático de documentos", precio: 200 },
      { id: "interpretacion", nombre: "Interpretación con IA", precio: 300 },
      { id: "registro", nombre: "Registro y etiquetas de clientes", precio: 150 },
      { id: "sistema", nombre: "Conectar con tu sistema", precio: null },
    ],
    tramos: [
      { id: "1000", nombre: "Hasta 1.000 conversaciones al mes", mensual: { normal: 89, oferta: 70 } },
      { id: "3000", nombre: "Hasta 3.000 conversaciones al mes", mensual: { normal: 149, oferta: 130 } },
      { id: "mas", nombre: "Más de 3.000 conversaciones al mes", mensual: null },
    ],
  },
  "agendamiento-y-recordatorios": {
    implementacion: { normal: 300, oferta: 200 },
    mensual: { normal: 89, oferta: 70 },
  },
  "cotizaciones-al-instante": {
    implementacion: { normal: 350, oferta: 250 },
    mensual: { normal: 89, oferta: 70 },
  },
  "webs-con-ia": {
    implementacion: { normal: 250, oferta: 200 },
    mensual: { normal: 15 },
    mensualNombre: "Hosting desde",
    combo: { porcentaje: 50, con: ["atencion-y-ventas-whatsapp", "agendamiento-y-recordatorios", "cotizaciones-al-instante"] },
  },
};

export const precioDe = (slug: string): PrecioServicio | undefined => PRECIOS[slug];
export const tieneOferta = (slug: string) => PRECIOS[slug]?.implementacion.oferta !== undefined;

// Formato de montos de todo el sitio: punto para miles y coma para decimales; sin decimales si es entero.
// $1.000 · $250 · $89,90
export const dolares = (n: number) => {
  const [entero, dec] = (Number.isInteger(n) ? String(n) : n.toFixed(2)).split(".");
  return "$" + entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? "," + dec : "");
};

// Monto a cobrar según la fecha.
export const vigenteDe = (m: Monto, conOferta: boolean) => (conOferta && m.oferta !== undefined ? m.oferta : m.normal);

// Cotizador de Atención 24/7 (fase 2).
export const RUTA_COTIZADOR = "/servicios/atencion-24-7/cotizar";

// Clave de localStorage para recordar que la persona cerró la barra de oferta.
export const CLAVE_BARRA = "noda-barra-oferta";
