"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

// Scroll suave en todo el sitio (librería Lenis).
// Solo en computadora con mouse: en celular el scroll nativo ya es suave y más fluido.
// Con "reducir movimiento" activado no se carga.
export default function SmoothScroll() {
  useEffect(() => {
    const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conMouse = matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reducir || !conMouse) return;

    let lenis: Lenis | null = null;
    let activo = true;

    // Enlaces a una sección de la misma página (/#casos, #ejemplo, /#): desplazamiento suave.
    const alHacerClic = (e: MouseEvent) => {
      if (!lenis || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a");
      const href = a?.getAttribute("href");
      if (!a || !href || !href.includes("#") || a.target) return;
      const url = new URL(a.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      const destino = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
      if (url.hash && !destino) return;
      e.preventDefault();
      lenis.scrollTo(destino ?? 0);
      history.pushState(null, "", url.hash || url.pathname);
    };

    import("lenis").then(({ default: LenisClase }) => {
      if (!activo) return;
      lenis = new LenisClase({
        autoRaf: true,
        lerp: 0.1,
        // Las cajas con scroll propio (como los chats de ejemplo) siguen funcionando normal.
        prevent: (nodo) => !!nodo.closest?.("[data-lenis-prevent]"),
      });
      document.addEventListener("click", alHacerClic);
    });

    return () => {
      activo = false;
      document.removeEventListener("click", alHacerClic);
      lenis?.destroy();
    };
  }, []);

  return null;
}
