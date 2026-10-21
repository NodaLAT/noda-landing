# Noda — sitio web (noda.lat)

Sitio de Noda hecho con **Next.js** (App Router + TypeScript).

## Ver el sitio en tu computadora

```bash
npm install
npm run dev
```

Luego abre <http://localhost:3000> en el navegador.

## Dónde está cada cosa

| Carpeta / archivo | Qué contiene |
|---|---|
| `app/layout.tsx` | Plantilla común a todas las páginas: fuentes, título, Header y Footer |
| `app/page.tsx` | La portada (une todas las secciones) |
| `components/Header.tsx` | Menú superior y menú de celular |
| `components/Footer.tsx` | Pie de página |
| `components/ScrollEffects.tsx` | Animaciones al hacer scroll y contadores |
| `components/sections/` | Un archivo por sección de la portada |
| `lib/site.ts` | WhatsApp, correo, redes y enlaces del menú (en un solo lugar) |
| `styles/design-system.css` | **Sistema de diseño**: colores, fuentes, tamaños, bordes y sombras |
| `styles/globals.css` | Estilos originales de la landing (sin cambios) |
| `styles/noda-hero.css` | Estilos originales del teléfono animado (sin cambios) |
| `public/` | Imágenes (logos) |
| `referencia/index-original.html` | La landing original de un solo archivo, como referencia |

## Reglas

- Claves, tokens y URLs de webhooks **nunca** van en el código: van en las variables de entorno de Vercel.
- La rama `main` es producción (noda.lat). El trabajo nuevo va en `sitio-v2`.
