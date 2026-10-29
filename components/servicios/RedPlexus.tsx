"use client";

import { useEffect, useRef } from "react";
import { montarLienzo, leerColores, reducirMovimiento } from "@/components/portada/lienzo";

// Red de nodos ("plexus") detrás del encabezado y la grilla de /servicios. Decorativa (aria-hidden).
// - El lienzo es "sticky" y mide lo que la pantalla (ver .p3-plexus-zona): solo dibuja lo visible.
// - Profundidad z (0 = lejos, 1 = cerca): tamaño, brillo, desenfoque y paralaje al hacer scroll.
//   El desenfoque sale de sprites pre-renderizados (sin filter en cada cuadro).
// - Vecinos con grilla espacial (celda = distancia de enlace).
// - Entrada: los nodos llegan dispersos y se conectan en ~2 s; luego deriva lenta.
// - Mouse: atrae suavemente los nodos cercanos e ilumina sus líneas.
// - Hover o foco en un [data-pulso]: 2–3 pulsos teal viajan por las líneas hasta esa tarjeta.
// - Los nodos detrás de [data-plexus-calma] (el título) se atenúan para que el texto se lea.
// - Con "reducir movimiento": un cuadro fijo de la red.
// La pausa fuera de pantalla o con la pestaña oculta la hace montarLienzo (igual que el hero).

const ENTRADA = 2;            // s hasta que la red queda conectada
const VEL_PULSO = 300;        // px/s
const SPR = 64;               // lado de cada sprite pre-renderizado (px)

type Nodo = {
  bx: number; by: number;     // posición base (deriva)
  vx: number; vy: number;     // deriva (px/s)
  ox: number; oy: number;     // desplazamiento por el mouse
  ex: number; ey: number;     // desplazamiento inicial de la entrada
  z: number; s: number; a: number; spr: number;
  x: number; y: number; calma: boolean;
};
type Pulso = { a: number; b: number; u: number; ax: number; ay: number; card: Element; espera: number; px: number; py: number; pasos: number; visto: Set<number> };
type Destello = { x: number; y: number; t: number };

const rgbDe = (hex: string, f: [number, number, number]): [number, number, number] => {
  const m = hex.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return f;
  const h = m[1].length === 3 ? m[1].split("").map((c) => c + c).join("") : m[1];
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};

// Sprite redondo: nivel 0 = nítido (núcleo duro + halo), 1 = algo desenfocado, 2 = muy desenfocado.
function sprite(rgb: [number, number, number], nivel: number) {
  const c = document.createElement("canvas");
  c.width = c.height = SPR;
  const g = c.getContext("2d")!;
  const r = SPR / 2, col = (a: number) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
  const gr = g.createRadialGradient(r, r, 0, r, r, r);
  const paradas: [number, number][][] = [
    [[0, 1], [0.26, 1], [0.34, 0.32], [0.6, 0.06], [1, 0]],
    [[0, 0.95], [0.22, 0.8], [0.55, 0.22], [1, 0]],
    [[0, 0.6], [0.35, 0.36], [0.7, 0.1], [1, 0]],
  ];
  for (const [o, a] of paradas[nivel]) gr.addColorStop(o, col(a));
  g.fillStyle = gr;
  g.fillRect(0, 0, SPR, SPR);
  return c;
}

export default function RedPlexus() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const zona = canvas?.parentElement;
    if (!canvas || !zona) return;
    const ctx = canvas.getContext("2d")!;
    const reduce = reducirMovimiento();
    const movil = window.matchMedia("(max-width: 639px), (pointer: coarse)").matches;
    const N = movil ? 50 : 120;
    const D = movil ? 115 : 165;               // distancia máxima de enlace
    const desenfoque = !movil;                  // en celular, solo sprites nítidos (más barato)
    const RM = movil ? 0 : 190;                 // radio de influencia del mouse

    const teal = rgbDe(leerColores().acento, [44, 182, 175]);
    const colores: [number, number, number][] = [[255, 255, 255], [165, 168, 170], teal];
    // sprites[color * 3 + nivel]
    const sprites = colores.flatMap((c) => [0, 1, 2].map((n) => sprite(c, n)));
    const brillo = sprite(teal, 1);

    let W = 0, H = 0, iniciado = false, redibujar = true, t0 = 0;
    const nodos: Nodo[] = [];
    const pulsos: Pulso[] = [];
    const destellos: Destello[] = [];
    const mouse = { x: 0, y: 0, activo: false };

    // grilla espacial (lista enlazada en arreglos)
    let cols = 1, filas = 1, cabeza = new Int32Array(1);
    const sig = new Int32Array(N);

    const crear = () => {
      // muestreo estratificado: la red cubre la pantalla de forma pareja
      const c = Math.ceil(Math.sqrt((N * W) / H)), f = Math.ceil(N / c);
      for (let i = 0; i < N; i++) {
        const z = Math.pow(Math.random(), 0.8);                 // algo más de nodos cercanos que lejanos
        const nivel = !desenfoque ? 0 : z > 0.62 ? 0 : z > 0.3 ? 1 : 2;
        const r = Math.random();
        const color = r < (0.06 + z * 0.12) ? 2 : r < 0.42 ? 1 : 0;   // teal en algunos nodos (más en los cercanos)
        const ang = Math.random() * Math.PI * 2, dist = 90 + Math.random() * 220, vel = 4 + Math.random() * 9;
        const dir = Math.random() * Math.PI * 2;
        nodos.push({
          bx: ((i % c) + Math.random()) * (W / c), by: (Math.floor(i / c) + Math.random()) * (H / f),
          vx: Math.cos(dir) * vel * (0.4 + z * 0.6), vy: Math.sin(dir) * vel * (0.4 + z * 0.6),
          ox: 0, oy: 0, ex: Math.cos(ang) * dist, ey: Math.sin(ang) * dist,
          z, s: nivel === 0 ? 6 + z * 7 : nivel === 1 ? 9 + z * 7 : 10 + z * 9,
          a: 0.22 + 0.78 * Math.pow(z, 1.3), spr: color * 3 + nivel,
          x: 0, y: 0, calma: false,
        });
      }
    };

    const onResize = (w: number, h: number) => {
      if (iniciado && W && H) for (const n of nodos) { n.bx *= w / W; n.by *= h / H; }
      W = w; H = h;
      if (!iniciado) { crear(); iniciado = true; }
      cols = Math.max(1, Math.ceil(W / D)); filas = Math.max(1, Math.ceil(H / D));
      cabeza = new Int32Array(cols * filas);
      redibujar = true;
    };

    const celda = (x: number, y: number) => {
      const cx = Math.min(cols - 1, Math.max(0, Math.floor(x / D))), cy = Math.min(filas - 1, Math.max(0, Math.floor(y / D)));
      return [cx, cy];
    };
    // recorre los vecinos de (x, y) dentro de D
    const vecinos = (x: number, y: number, cb: (j: number, d: number) => void) => {
      const [cx, cy] = celda(x, y);
      for (let gy = cy - 1; gy <= cy + 1; gy++) {
        if (gy < 0 || gy >= filas) continue;
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          if (gx < 0 || gx >= cols) continue;
          for (let j = cabeza[gy * cols + gx]; j !== -1; j = sig[j]) {
            const dx = nodos[j].x - x, dy = nodos[j].y - y, d = Math.sqrt(dx * dx + dy * dy);
            if (d < D) cb(j, d);
          }
        }
      }
    };

    // punto del rectángulo de la tarjeta más cercano a (x, y), en coordenadas del lienzo
    const rectDe = (el: Element) => {
      const r = el.getBoundingClientRect(), c = canvas.getBoundingClientRect();
      return { l: r.left - c.left, t: r.top - c.top, r: r.right - c.left, b: r.bottom - c.top };
    };
    const cercano = (q: { l: number; t: number; r: number; b: number }, x: number, y: number) =>
      [Math.min(q.r, Math.max(q.l, x)), Math.min(q.b, Math.max(q.t, y))] as const;

    const lanzarPulsos = (card: Element) => {
      if (reduce || !W) return;
      const q = rectDe(card);
      if (q.b < 0 || q.t > H) return;
      // nodos de salida: visibles, fuera de la tarjeta y a una distancia media de ella
      const opciones: number[] = [];
      nodos.forEach((n, i) => {
        if (n.x < 0 || n.x > W || n.y < 0 || n.y > H) return;
        const [px, py] = cercano(q, n.x, n.y), d = Math.hypot(n.x - px, n.y - py);
        if (d > D * 1.4 && d < D * 4.5) opciones.push(i);
      });
      const cuantos = movil ? 2 : 3;
      for (let k = 0; k < cuantos && opciones.length; k++) {
        const i = opciones.splice(Math.floor(Math.random() * opciones.length), 1)[0];
        pulsos.push({ a: i, b: i, u: 1, ax: nodos[i].x, ay: nodos[i].y, card, espera: k * 0.14, px: nodos[i].x, py: nodos[i].y, pasos: 0, visto: new Set([i]) });
      }
      if (pulsos.length > 12) pulsos.splice(0, pulsos.length - 12);
    };

    // al llegar a un nodo, elige el vecino que más acerca a la tarjeta (o va directo si ya está cerca)
    const siguiente = (p: Pulso) => {
      const n = nodos[p.a], q = rectDe(p.card), [tx, ty] = cercano(q, n.x, n.y);
      const dActual = Math.hypot(n.x - tx, n.y - ty);
      p.ax = n.x; p.ay = n.y; p.u = 0; p.pasos++;
      if (dActual < D * 0.85 || p.pasos > 14) { p.b = -1; return; }
      let mejor = -1, mejorD = dActual - 12;
      vecinos(n.x, n.y, (j) => {
        if (p.visto.has(j)) return;
        const [jx, jy] = cercano(q, nodos[j].x, nodos[j].y), dj = Math.hypot(nodos[j].x - jx, nodos[j].y - jy);
        if (dj < mejorD) { mejorD = dj; mejor = j; }
      });
      p.b = mejor;
      if (mejor !== -1) p.visto.add(mejor);
    };

    // cubetas de líneas por opacidad (pocas llamadas a stroke por cuadro)
    const NB = 7;
    const cubetas: number[][] = Array.from({ length: NB * 2 }, () => []);
    const [tr, tg, tb] = teal;

    const onFrame = (t: number, dt: number) => {
      if (!t0) t0 = t;
      if (reduce && !redibujar) return;
      redibujar = false;
      const te = reduce ? ENTRADA + 1 : t - t0;
      const e = 1 - Math.pow(1 - Math.min(1, te / ENTRADA), 3);           // llegada de los nodos
      const aparicion = Math.min(1, te / 0.5);
      const lineas = Math.max(0, Math.min(1, (te - 0.35) / (ENTRADA - 0.35)));
      const enlace = lineas * lineas * (3 - 2 * lineas);
      const scroll = reduce ? 0 : window.scrollY;
      const m = 40, AW = W + 2 * m, AH = H + 2 * m;

      const calmaEl = zona.querySelector("[data-plexus-calma]");
      const calma = calmaEl ? rectDe(calmaEl) : null;

      // 1) mover nodos y armar la grilla
      cabeza.fill(-1);
      const k = Math.min(1, dt * 3.5);
      for (let i = 0; i < N; i++) {
        const n = nodos[i];
        if (!reduce) { n.bx += n.vx * dt; n.by += n.vy * dt; }
        // paralaje: los cercanos se desplazan más con el scroll
        let x = n.bx, y = n.by - scroll * (0.05 + n.z * 0.18);
        x = (((x + m) % AW) + AW) % AW - m; y = (((y + m) % AH) + AH) % AH - m;
        // el mouse atrae suavemente
        let tx = 0, ty = 0;
        if (mouse.activo && RM) {
          const dx = mouse.x - x, dy = mouse.y - y, d2 = dx * dx + dy * dy;
          if (d2 < RM * RM) { const f = 1 - Math.sqrt(d2) / RM; tx = dx * f * f * 0.32; ty = dy * f * f * 0.32; }
        }
        n.ox += (tx - n.ox) * k; n.oy += (ty - n.oy) * k;
        n.x = x + n.ox + n.ex * (1 - e); n.y = y + n.oy + n.ey * (1 - e);
        n.calma = !!calma && n.x > calma.l - 24 && n.x < calma.r + 24 && n.y > calma.t - 24 && n.y < calma.b + 24;
        const [cx, cy] = celda(n.x, n.y), c = cy * cols + cx;
        sig[i] = cabeza[c]; cabeza[c] = i;
      }

      ctx.clearRect(0, 0, W, H);

      // 2) líneas (cada par una sola vez: j > i)
      for (const b of cubetas) b.length = 0;
      if (enlace > 0) {
        for (let i = 0; i < N; i++) {
          const a = nodos[i];
          vecinos(a.x, a.y, (j, d) => {
            if (j <= i) return;
            const b = nodos[j];
            const zmin = Math.min(a.z, b.z);
            let al = Math.pow(1 - d / D, 1.3) * (0.14 + 0.42 * zmin) * enlace;
            if (a.calma || b.calma) al *= 0.3;
            let luz = 0;
            if (mouse.activo && RM) {
              const mx = (a.x + b.x) / 2 - mouse.x, my = (a.y + b.y) / 2 - mouse.y, dm = Math.sqrt(mx * mx + my * my);
              if (dm < RM) luz = 1 - dm / RM;
            }
            if (luz > 0.05) al = Math.min(0.85, al + luz * 0.5);
            if (al < 0.012) return;
            const cub = (luz > 0.05 ? NB : 0) + Math.min(NB - 1, Math.floor((al / 0.6) * NB));
            cubetas[cub].push(a.x, a.y, b.x, b.y);
          });
        }
        ctx.lineCap = "round";
        for (let c = 0; c < NB * 2; c++) {
          const seg = cubetas[c];
          if (!seg.length) continue;
          const nivel = ((c % NB) + 0.5) / NB * 0.6;
          ctx.strokeStyle = c < NB ? `rgba(225,230,232,${nivel})` : `rgba(${(tr + 255) >> 1},${(tg + 255) >> 1},${(tb + 255) >> 1},${nivel})`;
          ctx.lineWidth = c < NB ? 0.7 : 0.9;
          ctx.beginPath();
          for (let s = 0; s < seg.length; s += 4) { ctx.moveTo(seg[s], seg[s + 1]); ctx.lineTo(seg[s + 2], seg[s + 3]); }
          ctx.stroke();
        }
      }

      // 3) nodos (sprites)
      for (const n of nodos) {
        if (n.x < -20 || n.x > W + 20 || n.y < -20 || n.y > H + 20) continue;
        ctx.globalAlpha = n.a * aparicion * (n.calma ? 0.35 : 1);
        ctx.drawImage(sprites[n.spr], n.x - n.s / 2, n.y - n.s / 2, n.s, n.s);
      }

      // 4) pulsos teal hacia la tarjeta activa
      if (!reduce) {
        for (let i = pulsos.length - 1; i >= 0; i--) {
          const p = pulsos[i];
          if (p.espera > 0) { p.espera -= dt; continue; }
          if (p.u >= 1) {
            if (p.b === -1) {
              destellos.push({ x: p.px, y: p.py, t: 0 });
              pulsos.splice(i, 1);
              continue;
            }
            p.a = p.b; siguiente(p);
          }
          let bx: number, by: number;
          if (p.b === -1) { const q = rectDe(p.card); [bx, by] = cercano(q, p.ax, p.ay); }
          else { bx = nodos[p.b].x; by = nodos[p.b].y; }
          const largo = Math.max(1, Math.hypot(bx - p.ax, by - p.ay));
          p.u = Math.min(1, p.u + (dt * VEL_PULSO) / largo);
          p.px = p.ax + (bx - p.ax) * p.u; p.py = p.ay + (by - p.ay) * p.u;
          // tramo encendido detrás del pulso
          const cola = Math.max(0, p.u - 70 / largo);
          ctx.globalAlpha = 1;
          const gr = ctx.createLinearGradient(p.ax + (bx - p.ax) * cola, p.ay + (by - p.ay) * cola, p.px, p.py);
          gr.addColorStop(0, `rgba(${tr},${tg},${tb},0)`);
          gr.addColorStop(1, `rgba(${tr},${tg},${tb},0.95)`);
          ctx.strokeStyle = gr; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(p.ax + (bx - p.ax) * cola, p.ay + (by - p.ay) * cola); ctx.lineTo(p.px, p.py); ctx.stroke();
          ctx.drawImage(brillo, p.px - 15, p.py - 15, 30, 30);
          ctx.drawImage(sprites[0], p.px - 4, p.py - 4, 8, 8);
        }
        for (let i = destellos.length - 1; i >= 0; i--) {
          const d = destellos[i];
          d.t += dt;
          const u = d.t / 0.55;
          if (u >= 1) { destellos.splice(i, 1); continue; }
          const s = 24 + u * 46;
          ctx.globalAlpha = 1 - u;
          ctx.drawImage(brillo, d.x - s / 2, d.y - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;
    };

    const ctrl = montarLienzo(canvas, onResize, onFrame);

    // mouse (se escucha en la zona: el lienzo no recibe eventos para no tapar las tarjetas)
    const mover = (ev: PointerEvent) => {
      if (ev.pointerType === "touch") return;
      const r = canvas.getBoundingClientRect();
      mouse.x = ev.clientX - r.left; mouse.y = ev.clientY - r.top; mouse.activo = true;
    };
    const salir = () => { mouse.activo = false; };
    // pulsos al entrar el cursor o el foco de teclado a una tarjeta
    let actual: Element | null = null;
    const entrar = (ev: Event) => {
      const card = (ev.target as Element | null)?.closest?.("[data-pulso]") ?? null;
      if (card && card !== actual) lanzarPulsos(card);
      actual = card;
    };
    const fuera = (ev: Event) => {
      const rel = (ev as PointerEvent).relatedTarget as Element | null;
      if (!rel || !actual?.contains(rel)) actual = null;
    };
    if (!reduce) {
      zona.addEventListener("pointermove", mover, { passive: true });
      zona.addEventListener("pointerleave", salir);
      zona.addEventListener("pointerover", entrar);
      zona.addEventListener("pointerout", fuera);
      zona.addEventListener("focusin", entrar);
    }

    return () => {
      ctrl.destruir();
      zona.removeEventListener("pointermove", mover);
      zona.removeEventListener("pointerleave", salir);
      zona.removeEventListener("pointerover", entrar);
      zona.removeEventListener("pointerout", fuera);
      zona.removeEventListener("focusin", entrar);
    };
  }, []);

  return <canvas ref={ref} className="p3-plexus" aria-hidden="true" />;
}
