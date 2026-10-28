// Utilidades de canvas para la portada. Centraliza el rendimiento:
//  - DPR limitado a 2
//  - tamaño con ResizeObserver (no solo resize)
//  - bucle que arranca tras la primera pintura
//  - se pausa cuando el canvas no está en pantalla (IntersectionObserver)
//    o la pestaña está oculta (visibilitychange)

export type Lienzo = { destruir: () => void };

export function montarLienzo(
  canvas: HTMLCanvasElement,
  onResize: (w: number, h: number) => void,
  onFrame: (t: number, dt: number) => void,
): Lienzo {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { destruir: () => {} };
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0;

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    w = Math.max(1, Math.round(r.width));
    h = Math.max(1, Math.round(r.height));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    onResize(w, h);
  };

  let raf = 0, prev = 0, enVista = true, visible = !document.hidden, corriendo = false, destruido = false;
  const loop = (t: number) => {
    raf = requestAnimationFrame(loop);
    const dt = prev ? Math.min(0.05, (t - prev) / 1000) : 0.016;
    prev = t;
    onFrame(t / 1000, dt);
  };
  const actualizar = () => {
    const debe = enVista && visible && !destruido;   // el arranque diferido no debe revivir un lienzo ya destruido
    if (debe && !corriendo) { corriendo = true; prev = 0; raf = requestAnimationFrame(loop); }
    else if (!debe && corriendo) { corriendo = false; cancelAnimationFrame(raf); }
  };

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas);
  const io = new IntersectionObserver((e) => { enVista = e[0].isIntersecting; actualizar(); }, { threshold: 0 });
  io.observe(canvas);
  const onVis = () => { visible = !document.hidden; actualizar(); };
  document.addEventListener("visibilitychange", onVis);

  // arranca tras la primera pintura
  resize();
  requestAnimationFrame(() => { requestAnimationFrame(() => actualizar()); });

  return {
    destruir() {
      destruido = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    },
  };
}

// Lee colores del tema desde las variables CSS. Se vuelve a llamar al cambiar data-tema.
export function leerColores() {
  const cs = getComputedStyle(document.documentElement);
  const v = (n: string, f: string) => (cs.getPropertyValue(n).trim() || f);
  return {
    fondo: v("--fondo", "#000"),
    acento: v("--acento", "#eee6d5"),
    destacado: v("--destacado", "#eee6d5"),
    nodoActivo: v("--nodo-activo", "#eee6d5"),
    nodoRecorrido: v("--nodo-recorrido", "#b0b0b0"),
    texto: v("--texto", "#fff"),
    texto3: v("--texto-3", "#a3a3a3"),
    borde: v("--borde", "#262626"),
    parPrincipal: v("--par-principal", "242,238,230"),
    parCirculo: v("--par-circulo", "176,176,176"),
    parCinta: v("--par-cinta", "105,105,105"),
    parPolvo: v("--par-polvo", "242,238,230"),
  };
}

export function reducirMovimiento() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Observa cambios de tema (data-tema en <html>) y ejecuta el callback.
export function observarTema(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-tema"] });
  return () => mo.disconnect();
}
