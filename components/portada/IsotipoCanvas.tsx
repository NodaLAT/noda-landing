"use client";

import { useEffect, useRef } from "react";
import { ISOTIPO_PUNTOS } from "@/lib/isotipo-puntos";
import { montarLienzo, leerColores, reducirMovimiento, observarTema } from "./lienzo";

// Isotipo hecho de partículas (canvas). Decorativo (aria-hidden).
export default function IsotipoCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const reduce = reducirMovimiento();
    let col = leerColores();

    // partículas del isotipo
    type P = { nx: number; ny: number; to: number; hx: number; hy: number; x: number; y: number; vx: number; vy: number; dir: number; };
    const pts: P[] = ISOTIPO_PUNTOS.map(([nx, ny, to]) => ({
      nx, ny, to, hx: 0, hy: 0, x: 0, y: 0, vx: 0, vy: 0, dir: Math.random() * Math.PI * 2,
    }));
    // polvo de fondo
    const NPOLVO = 140;
    const polvo = Array.from({ length: NPOLVO }, () => ({ x: 0, y: 0, s: 0.6 + Math.random() * 1.1, v: 4 + Math.random() * 10, a: 0.04 + Math.random() * 0.1 }));

    let W = 0, H = 0, cx = 0, cy = 0, R = 1, iniciado = false, redibujar = true;
    const mouse = { x: -9999, y: -9999, activo: false };

    const onResize = (w: number, h: number) => {
      W = w; H = h; cx = w / 2; cy = h * 0.4;
      R = Math.min(w * 0.33, h * 0.46, 360);
      for (const p of pts) { p.hx = cx + p.nx * R; p.hy = cy + p.ny * R; }
      if (!iniciado) {
        for (const p of pts) { p.x = Math.random() * w; p.y = Math.random() * h; }
        for (const d of polvo) { d.x = Math.random() * w; d.y = Math.random() * h; }
        iniciado = true;
      }
      redibujar = true;
    };

    const rgba = (rgb: string, a: number) => `rgba(${rgb},${a})`;
    const colTono = (to: number) => (to === 0 ? col.parPrincipal : to === 1 ? col.parCirculo : col.parCinta);

    const onFrame = (t: number) => {
      const dt = 1 / 60;
      if (reduce && !redibujar) return;
      redibujar = false;

      // envolvente del ciclo de 12 s: 0 (formado 7s) -> 1 (ola) -> 0 (reforma)
      let s = 0;
      if (!reduce) {
        const tc = t % 12;
        const ss = (a: number, b: number, x: number) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u); };
        s = ss(7, 8.8, tc) - ss(9.8, 12, tc);
      }

      ctx.clearRect(0, 0, W, H);

      // polvo (sube lento)
      ctx.save();
      for (const d of polvo) {
        if (!reduce) { d.y -= d.v * dt; if (d.y < -4) { d.y = H + 4; d.x = Math.random() * W; } }
        ctx.globalAlpha = d.a;
        ctx.fillStyle = rgba(col.parPolvo, 1);
        ctx.fillRect(d.x, d.y, d.s, d.s);
      }
      ctx.restore();

      // isotipo
      for (const p of pts) {
        // objetivo: casa, o línea horizontal ondulante cuando s>0
        let tx = p.hx, ty = p.hy;
        if (s > 0.001) {
          const wy = cy + Math.sin(p.nx * 3.2 + t * 2.2) * R * 0.5 + (p.dir > Math.PI ? 1 : -1) * R * 0.1 * s;
          tx = p.hx + Math.cos(p.dir) * R * 0.25 * s;
          ty = p.hy * (1 - s) + wy * s;
        }
        // repulsión del mouse
        if (mouse.activo) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110) { const d = Math.sqrt(d2) || 1, f = (110 - d) / 110; tx += (dx / d) * f * 60; ty += (dy / d) * f * 60; }
        }
        if (reduce) { p.x = tx; p.y = ty; }
        else {
          const k = 90, damp = 13;
          p.vx += (tx - p.x) * k * dt - p.vx * damp * dt;
          p.vy += (ty - p.y) * k * dt - p.vy * damp * dt;
          p.x += p.vx * dt; p.y += p.vy * dt;
        }
        ctx.globalAlpha = (p.to === 0 ? 0.95 : p.to === 1 ? 0.85 : 0.7) * (1 - s * 0.35);
        ctx.fillStyle = rgba(colTono(p.to), 1);
        ctx.fillRect(p.x - 1.1, p.y - 1.1, 2.2, 2.2);
      }
      ctx.globalAlpha = 1;
    };

    const ctrl = montarLienzo(canvas, onResize, onFrame);
    const quitarTema = observarTema(() => { col = leerColores(); redibujar = true; });

    const mv = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.activo = true; };
    const ml = () => { mouse.activo = false; mouse.x = -9999; mouse.y = -9999; };
    if (!reduce) { canvas.addEventListener("pointermove", mv); canvas.addEventListener("pointerleave", ml); }

    return () => {
      ctrl.destruir(); quitarTema();
      canvas.removeEventListener("pointermove", mv); canvas.removeEventListener("pointerleave", ml);
    };
  }, []);

  return <canvas ref={ref} className="p3-hero-canvas" aria-hidden="true" />;
}
