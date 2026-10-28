"use client";

import { useEffect, useRef } from "react";
import { ISOTIPO_PUNTOS } from "@/lib/isotipo-puntos";
import { montarLienzo, leerColores, reducirMovimiento, observarTema } from "./lienzo";

// Isotipo hecho de partículas (canvas). Decorativo (aria-hidden).
// Tamaño/posición calculados del espacio libre real entre la cabecera y la etiqueta del hero.
// Entrada escalonada con estelas, ciclo formado/disperso y dispersión por scroll.
const ENTRADA_FIN = 5.5;           // s: a los 5.5 s el isotipo está completo
const CICLO = 8.9;                 // formado 4 + transición 1.2 + disperso 2.5 + reforma 1.2

export default function IsotipoCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const reduce = reducirMovimiento();
    let col = leerColores();

    type P = {
      nx: number; ny: number; to: number;
      hx: number; hy: number;              // casa (isotipo formado)
      sx: number; sy: number;              // objetivo disperso (toda la pantalla)
      ex: number; ey: number;              // origen de entrada (aleatorio)
      edelay: number; edur: number;        // retraso y duración de entrada
      x: number; y: number; vx: number; vy: number; px: number; py: number; op: number;
    };
    const pts: P[] = ISOTIPO_PUNTOS.map(([nx, ny, to]) => ({
      nx, ny, to, hx: 0, hy: 0, sx: 0, sy: 0, ex: 0, ey: 0,
      edelay: ((nx + 1) / 2) * 3.7 + Math.random() * 0.25, edur: 1.25 + Math.random() * 0.25,
      x: 0, y: 0, vx: 0, vy: 0, px: 0, py: 0, op: reduce ? 1 : 0,
    }));
    const NPOLVO = 140;
    const polvo = Array.from({ length: NPOLVO }, () => ({ x: 0, y: 0, s: 0.6 + Math.random() * 1.1, v: 4 + Math.random() * 10, a: 0.04 + Math.random() * 0.1 }));

    let W = 0, H = 0, cx = 0, cy = 0, R = 1, iniciado = false, redibujar = true;
    let t0 = 0, entradaLista = reduce, cicloT0 = 0;
    let scrollS = 0;
    const mouse = { x: -9999, y: -9999, activo: false };

    const onResize = (w: number, h: number) => {
      W = w; H = h;
      // espacio libre real entre la cabecera y la etiqueta "Automatización con IA"
      const heroTop = canvas.getBoundingClientRect().top;
      const nav = document.querySelector(".p3-nav") as HTMLElement | null;
      const eb = document.querySelector(".p3-hero-eyebrow") as HTMLElement | null;
      const navH = nav ? nav.getBoundingClientRect().height : 72;
      const ebTop = eb ? eb.getBoundingClientRect().top - heroTop : h * 0.62;
      const mT = 26, mB = 22;
      let top = navH + mT, bottom = ebTop - mB;
      if (bottom - top < 60) { top = navH + mT; bottom = Math.max(top + 60, h * 0.55); }
      const bandH = bottom - top;
      cx = w / 2; cy = (top + bottom) / 2;
      const lado = Math.max(20, w * 0.04);
      // extensión vertical del isotipo = 2*0.767*R; horizontal = 2*R
      R = Math.max(28, Math.min(bandH / 1.54, (w - 2 * lado) / 2));
      for (const p of pts) { p.hx = cx + p.nx * R; p.hy = cy + p.ny * R; p.sx = Math.random() * w; p.sy = Math.random() * h; }
      if (!iniciado) {
        for (const p of pts) { p.ex = Math.random() * w; p.ey = Math.random() * h; if (reduce) { p.x = p.hx; p.y = p.hy; } else { p.x = p.ex; p.y = p.ey; } p.px = p.x; p.py = p.y; }
        for (const d of polvo) { d.x = Math.random() * w; d.y = Math.random() * h; }
        iniciado = true;
      }
      scrollS = reduce ? 0 : Math.min(1, Math.max(0, window.scrollY / Math.max(1, h)));
      redibujar = true;
    };

    const rgba = (rgb: string, a: number) => `rgba(${rgb},${a})`;
    const colTono = (to: number) => (to === 0 ? col.parPrincipal : to === 1 ? col.parCirculo : col.parCinta);
    const eOut = (u: number) => 1 - Math.pow(1 - u, 3);
    const smooth = (u: number) => { const x = Math.min(1, Math.max(0, u)); return x * x * (3 - 2 * x); };
    const cicloS = (tc: number) => (tc < 4 ? 0 : tc < 5.2 ? smooth((tc - 4) / 1.2) : tc < 7.7 ? 1 : 1 - smooth((tc - 7.7) / 1.2));

    const onFrame = (t: number) => {
      if (!t0) { t0 = t; cicloT0 = t + ENTRADA_FIN; }
      if (reduce && !redibujar) return;
      redibujar = false;
      const te = t - t0;
      const entrando = !entradaLista && te < ENTRADA_FIN && scrollS <= 0.02;
      if (!entradaLista && (te >= ENTRADA_FIN || scrollS > 0.02)) { entradaLista = true; cicloT0 = t; }

      ctx.clearRect(0, 0, W, H);

      // polvo
      for (const d of polvo) {
        if (!reduce) { d.y -= d.v * (1 / 60); if (d.y < -4) { d.y = H + 4; d.x = Math.random() * W; } }
        ctx.globalAlpha = d.a; ctx.fillStyle = rgba(col.parPolvo, 1); ctx.fillRect(d.x, d.y, d.s, d.s);
      }
      ctx.globalAlpha = 1;

      // dispersión fuera de la entrada: scroll (prioridad) o ciclo
      let s = 0;
      if (!reduce && entradaLista) s = scrollS > 0.01 ? scrollS : cicloS((t - cicloT0) % CICLO);

      // 1) actualizar posiciones (guardando la previa para la estela)
      for (const p of pts) {
        p.px = p.x; p.py = p.y;
        if (reduce) { p.x = p.hx; p.y = p.hy; p.op = 1; continue; }
        if (entrando) {
          const local = te - p.edelay;
          if (local <= 0) { p.x = p.ex; p.y = p.ey; p.op = 0; }
          else if (local < p.edur) { const e = eOut(local / p.edur); p.x = p.ex + (p.hx - p.ex) * e; p.y = p.ey + (p.hy - p.ey) * e; p.op = Math.min(1, (local / p.edur) * 2.2); }
          else { p.x = p.hx; p.y = p.hy; p.op = 1; }
        } else {
          let tx = p.hx + (p.sx - p.hx) * s, ty = p.hy + (p.sy - p.hy) * s;
          if (mouse.activo && s < 0.6) { const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy; if (d2 < 110 * 110) { const d = Math.sqrt(d2) || 1, f = (110 - d) / 110; tx += (dx / d) * f * 55; ty += (dy / d) * f * 55; } }
          const k = 70, damp = 12;
          p.vx += (tx - p.x) * k * (1 / 60) - p.vx * damp * (1 / 60);
          p.vy += (ty - p.y) * k * (1 / 60) - p.vy * damp * (1 / 60);
          p.x += p.vx * (1 / 60); p.y += p.vy * (1 / 60); p.op = 1;
        }
      }

      // 2) estelas: UNA sola pasada por cuadro (línea rápida que se desvanece)
      if (!reduce) {
        ctx.strokeStyle = col.destacado; ctx.lineWidth = 1.2; ctx.lineCap = "round"; ctx.globalAlpha = 0.5;
        ctx.beginPath();
        for (const p of pts) {
          if (p.op < 0.05) continue;
          const dx = p.x - p.px, dy = p.y - p.py;
          if (dx * dx + dy * dy < 4) continue;              // casi quieto: sin estela
          ctx.moveTo(p.x - dx * 2.2, p.y - dy * 2.2); ctx.lineTo(p.x, p.y);
        }
        ctx.stroke(); ctx.globalAlpha = 1;
      }

      // 3) puntos (+ destello al llegar)
      for (const p of pts) {
        if (p.op < 0.02) continue;
        let a = (p.to === 0 ? 0.95 : p.to === 1 ? 0.85 : 0.7) * p.op * (1 - s * 0.3);
        ctx.globalAlpha = Math.min(1, a);
        ctx.fillStyle = rgba(colTono(p.to), 1);
        ctx.fillRect(p.x - 1.1, p.y - 1.1, 2.2, 2.2);
        if (entrando) { const local = te - p.edelay; if (local > p.edur && local < p.edur + 0.14) { ctx.globalAlpha = (1 - (local - p.edur) / 0.14) * 0.9; ctx.fillStyle = col.destacado; ctx.beginPath(); ctx.arc(p.x, p.y, 3.4, 0, Math.PI * 2); ctx.fill(); } }
      }
      ctx.globalAlpha = 1;
    };

    const ctrl = montarLienzo(canvas, onResize, onFrame);
    const quitarTema = observarTema(() => { col = leerColores(); redibujar = true; });
    const onScroll = () => { if (!reduce) { scrollS = Math.min(1, Math.max(0, window.scrollY / Math.max(1, H))); redibujar = true; } };
    if (!reduce) window.addEventListener("scroll", onScroll, { passive: true });

    const mv = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.activo = true; };
    const ml = () => { mouse.activo = false; mouse.x = -9999; mouse.y = -9999; };
    if (!reduce) { canvas.addEventListener("pointermove", mv); canvas.addEventListener("pointerleave", ml); }

    return () => {
      ctrl.destruir(); quitarTema();
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("pointermove", mv); canvas.removeEventListener("pointerleave", ml);
    };
  }, []);

  return <canvas ref={ref} className="p3-hero-canvas" aria-hidden="true" />;
}
