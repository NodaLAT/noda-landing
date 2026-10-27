// Dimensiones reales de los WebP 3D (para next/image: evita saltos de maqueta).
export const OBJ_DIMS: Record<string, { w: number; h: number; src: string }> = {
  burbuja:     { w: 1200, h: 1139, src: "/assets/v3/objetos/burbuja.webp" },
  calendario:  { w: 1200, h: 1139, src: "/assets/v3/objetos/calendario.webp" },
  calculadora: { w: 1126, h: 1200, src: "/assets/v3/objetos/calculadora.webp" },
  documento:   { w: 993,  h: 1200, src: "/assets/v3/objetos/documento.webp" },
  diente:      { w: 1161, h: 1200, src: "/assets/v3/objetos/diente.webp" },
  grafico:     { w: 1200, h: 1149, src: "/assets/v3/objetos/grafico.webp" },
  iman:        { w: 1162, h: 1200, src: "/assets/v3/objetos/iman.webp" },
  llanta:      { w: 1090, h: 1200, src: "/assets/v3/objetos/llanta.webp" },
  llave:       { w: 982,  h: 1200, src: "/assets/v3/objetos/llave.webp" },
  taladro:     { w: 1034, h: 1200, src: "/assets/v3/objetos/taladro.webp" },
  tubo:        { w: 793,  h: 1200, src: "/assets/v3/objetos/tubo.webp" },
  navegador:   { w: 1200, h: 1112, src: "/assets/v3/objetos/navegador.webp" },
  bloques:     { w: 854,  h: 1200, src: "/assets/v3/objetos/bloques.webp" },
  isotipo:     { w: 1200, h: 863,  src: "/assets/v3/isotipo-3d.webp" },
  "isotipo-crema": { w: 1200, h: 863, src: "/assets/v3/isotipo-3d-crema.webp" },
};

export type ObjName = keyof typeof OBJ_DIMS;
