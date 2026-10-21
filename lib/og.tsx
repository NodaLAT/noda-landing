import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Imagen que aparece al compartir un enlace (WhatsApp, LinkedIn, Facebook, X).
// Paleta oficial de video de Noda: fondo #0A0A0A, teal #4FBDBD y #39A6A6.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const NEGRO = "#0A0A0A";
const TEAL = "#4FBDBD";
const TEAL_2 = "#39A6A6";

// Tipografías de la marca, descargadas de Google Fonts al construir el sitio.
// Si la descarga falla, la imagen se genera igual con la letra por defecto.
async function fuente(familia: string, peso: number, opsz?: number) {
  try {
    const ejes = opsz ? `opsz,wght@${opsz},${peso}` : `wght@${peso}`;
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${familia}:${ejes}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function imagenCompartir({ etiqueta, titulo, destacado = false }: {
  etiqueta: string;
  titulo: string;
  destacado?: boolean;
}) {
  const [logo, display, cuerpo] = await Promise.all([
    readFile(join(process.cwd(), "public/logo-noda.png")),
    fuente("Bricolage+Grotesque", 600, 96),   // 96 = versión "de titular", como en el sitio
    fuente("Manrope", 600),
  ]);
  const fonts = [
    ...(display ? [{ name: "Display", data: display, weight: 600 as const }] : []),
    ...(cuerpo ? [{ name: "Cuerpo", data: cuerpo, weight: 600 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
        backgroundColor: NEGRO, padding: "64px 76px", fontFamily: "Cuerpo", position: "relative" }}>
        {/* Halo de luz teal arriba a la derecha, como en el sitio (dibujado en SVG para que no se recorte) */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <radialGradient id="halo" cx="1060" cy="40" r="620" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={TEAL_2} stopOpacity="0.34" />
              <stop offset="0.45" stopColor={TEAL_2} stopOpacity="0.10" />
              <stop offset="1" stopColor={TEAL_2} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#halo)" />
        </svg>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={234} height={80} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ display: "flex", fontSize: 26, color: TEAL, border: `2px solid rgba(79,189,189,0.45)`, borderRadius: 999, padding: "8px 22px" }}>
              {etiqueta}
            </div>
            {destacado && (
              <div style={{ display: "flex", fontSize: 26, color: NEGRO, background: TEAL, borderRadius: 999, padding: "10px 22px" }}>
                Servicio estrella
              </div>
            )}
          </div>
          <div style={{ display: "flex", marginTop: 30, maxWidth: 1040, fontFamily: "Display", fontSize: titulo.length > 42 ? 62 : 76,
            lineHeight: 1.06, letterSpacing: -1.5, color: "#FFFFFF" }}>
            {titulo}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 26, color: TEAL }}>www.noda.lat</div>
          <div style={{ display: "flex", width: 240, height: 8, borderRadius: 8, background: `linear-gradient(90deg, ${TEAL_2}, ${TEAL})` }} />
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length ? fonts : undefined },
  );
}
