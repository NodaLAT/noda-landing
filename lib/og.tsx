import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Imagen que aparece al compartir un enlace (WhatsApp, LinkedIn, Facebook, X). 1200×630.
// Usa el fondo del tema mixto del sitio: base #0b0b0d con luz crema arriba a la derecha,
// luz cálida abajo a la izquierda y un toque teal; Poppins como en la web.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BASE = "#0b0b0d";
const CREMA = "#eee6d5";
const TEAL = "#2cb6af";
const TEAL_CLARO = "#8fd6d0";

// Poppins, descargada de Google Fonts al construir el sitio.
// Si la descarga falla, la imagen se genera igual con la letra por defecto.
async function fuente(familia: string, peso: number) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${familia}:wght@${peso}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function imagenCompartir({ etiqueta, titulo, segunda = "", destacado = "" }: {
  etiqueta: string;
  titulo: string;
  segunda?: string;       // segunda línea del título, en blanco (ej. "para que")
  destacado?: string;     // final de la segunda línea, en crema (ej. "vendas más.")
}) {
  const [logo, negrita, media] = await Promise.all([
    readFile(join(process.cwd(), "public/logo-noda.png")),
    fuente("Poppins", 700),
    fuente("Poppins", 600),
  ]);
  const fonts = [
    ...(negrita ? [{ name: "Poppins", data: negrita, weight: 700 as const }] : []),
    ...(media ? [{ name: "Poppins", data: media, weight: 600 as const }] : []),
  ];
  const largo = Math.max(titulo.length, (segunda + destacado).length);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
        backgroundColor: BASE, padding: "64px 76px", fontFamily: "Poppins", position: "relative" }}>
        {/* Fondo de "luz desenfocada" (mismas luces que el sitio, en SVG para que no se recorten) */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <radialGradient id="crema" cx="1030" cy="70" r="640" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={CREMA} stopOpacity="0.30" />
              <stop offset="1" stopColor={CREMA} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="calida" cx="120" cy="600" r="520" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f2f0ec" stopOpacity="0.14" />
              <stop offset="1" stopColor="#f2f0ec" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="teal" cx="820" cy="330" r="420" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={TEAL} stopOpacity="0.12" />
              <stop offset="1" stopColor={TEAL} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#crema)" />
          <rect width="1200" height="630" fill="url(#calida)" />
          <rect width="1200" height="630" fill="url(#teal)" />
        </svg>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={234} height={80} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: TEAL_CLARO }}>
            {etiqueta}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 26, maxWidth: 1040, fontSize: largo > 30 ? 60 : 72, fontWeight: 700,
            lineHeight: 1.05, letterSpacing: -2, color: "#FFFFFF" }}>
            <div style={{ display: "flex" }}>{titulo}</div>
            {(segunda || destacado) && (
              <div style={{ display: "flex", gap: 22 }}>
                {segunda && <span>{segunda}</span>}
                {destacado && <span style={{ color: CREMA }}>{destacado}</span>}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: CREMA }}>www.noda.lat</div>
          <div style={{ display: "flex", width: 240, height: 6, borderRadius: 6, background: `linear-gradient(90deg, ${TEAL}, ${CREMA})` }} />
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length ? fonts : undefined },
  );
}
