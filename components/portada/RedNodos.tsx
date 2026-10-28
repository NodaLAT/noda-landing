"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/site";
import { NODOS } from "./datos";
import { montarLienzo, leerColores, reducirMovimiento, observarTema } from "./lienzo";

const DWELL = 0.7, MOVE = 0.9, HOLD = 1.2;
const perBlock = DWELL + MOVE;
const CICLO = 7 * perBlock + DWELL + HOLD;            // ~21 s
const tInicioNodo = (i: number) => (i < 7 ? i * perBlock : 7 * perBlock);

function catmull(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

export default function RedNodos() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [activo, setActivo] = useState(0);
  const inicioRef = useRef(0);            // base de tiempo (s)
  const saltarRef = useRef<number | null>(null);
  const reduceRef = useRef(false);

  // salta la luz a un nodo (clic en botón)
  const irA = (i: number) => { saltarRef.current = i; setActivo(i); };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const reduce = reducirMovimiento();
    reduceRef.current = reduce;
    let col = leerColores();
    let W = 0, H = 0, movil = false;
    let nodos: { x: number; y: number }[] = [];
    let poly: { x: number; y: number }[] = [];
    let nodeIdx: number[] = [];
    let actualActivo = 0;

    const onResize = (w: number, h: number) => {
      W = w; H = h; movil = w < 760;
      const padX = w * 0.06, padY = 46;
      nodos = NODOS.map((n, i) => {
        if (movil) {
          const t = NODOS.length > 1 ? i / (NODOS.length - 1) : 0;
          const lado = i % 2 === 0 ? 0.26 : 0.74;
          return { x: padX + lado * (w - 2 * padX), y: padY + t * (h - 2 * padY) };
        }
        return { x: padX + n.pos[0] * (w - 2 * padX), y: padY + n.pos[1] * (h - 2 * padY) };
      });
      // spline Catmull-Rom -> polilínea
      poly = []; nodeIdx = [];
      const SEG = 28;
      for (let i = 0; i < nodos.length - 1; i++) {
        const p0 = nodos[i - 1] || nodos[i], p1 = nodos[i], p2 = nodos[i + 1], p3 = nodos[i + 2] || nodos[i + 1];
        nodeIdx[i] = poly.length;
        for (let s = 0; s < SEG; s++) poly.push({ x: catmull(p0.x, p1.x, p2.x, p3.x, s / SEG), y: catmull(p0.y, p1.y, p2.y, p3.y, s / SEG) });
      }
      nodeIdx[nodos.length - 1] = poly.length;
      poly.push({ x: nodos[nodos.length - 1].x, y: nodos[nodos.length - 1].y });
    };

    const polyAt = (idx: number) => {
      const i = Math.max(0, Math.min(poly.length - 1, Math.floor(idx)));
      const j = Math.min(poly.length - 1, i + 1), f = idx - i;
      return { x: poly[i].x + (poly[j].x - poly[i].x) * f, y: poly[i].y + (poly[j].y - poly[i].y) * f };
    };
    const ease = (u: number) => u * u * (3 - 2 * u);

    const onFrame = (t: number) => {
      if (saltarRef.current != null) { inicioRef.current = t - tInicioNodo(saltarRef.current); saltarRef.current = null; }
      if (!inicioRef.current) inicioRef.current = t;

      // fase del ciclo -> nodo activo (i) y posición de la luz (índice en poly)
      let i = 0, luzIdx = 0;
      if (reduce) { i = actualActivo; luzIdx = nodeIdx[i]; }
      else {
        const tc = (t - inicioRef.current) % CICLO;
        if (tc < 7 * perBlock) {
          i = Math.floor(tc / perBlock);
          const local = tc - i * perBlock;
          if (local < DWELL) luzIdx = nodeIdx[i];
          else luzIdx = nodeIdx[i] + (nodeIdx[i + 1] - nodeIdx[i]) * ease((local - DWELL) / MOVE);
        } else { i = 7; luzIdx = nodeIdx[7]; }
      }
      if (i !== actualActivo) { actualActivo = i; setActivo(i); }

      ctx.clearRect(0, 0, W, H);

      // camino completo punteado y tenue
      ctx.save();
      ctx.setLineDash([2, 7]); ctx.lineWidth = 1.5; ctx.strokeStyle = col.borde;
      ctx.beginPath(); ctx.moveTo(poly[0].x, poly[0].y);
      for (const p of poly) ctx.lineTo(p.x, p.y);
      ctx.stroke(); ctx.restore();

      // tramo recorrido (acento) hasta la luz
      ctx.save();
      ctx.lineWidth = 2.5; ctx.strokeStyle = col.acento; ctx.lineCap = "round";
      ctx.shadowColor = col.acento; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.moveTo(poly[0].x, poly[0].y);
      const lim = Math.floor(luzIdx);
      for (let k = 1; k <= lim && k < poly.length; k++) ctx.lineTo(poly[k].x, poly[k].y);
      const lp = polyAt(luzIdx); ctx.lineTo(lp.x, lp.y);
      ctx.stroke(); ctx.restore();

      // la luz que recorre + su estela (color "destacado")
      ctx.save();
      ctx.lineCap = "round"; ctx.strokeStyle = col.destacado; ctx.lineWidth = 3;
      ctx.shadowColor = col.destacado; ctx.shadowBlur = 14; ctx.globalAlpha = 0.9;
      const ini = Math.max(0, lim - 24);
      ctx.beginPath(); ctx.moveTo(poly[ini].x, poly[ini].y);
      for (let k = ini + 1; k <= lim && k < poly.length; k++) ctx.lineTo(poly[k].x, poly[k].y);
      ctx.lineTo(lp.x, lp.y); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.arc(lp.x, lp.y, 5, 0, Math.PI * 2); ctx.fillStyle = col.destacado; ctx.fill();
      ctx.restore();

      // nodos
      nodos.forEach((nd, k) => {
        const recorrido = k < i || (k === i);
        const esActivo = k === i;
        ctx.save();
        if (esActivo) {
          const pulso = reduce ? 0 : (Math.sin(t * 4) * 0.5 + 0.5);
          ctx.beginPath(); ctx.arc(nd.x, nd.y, 10 + pulso * 7, 0, Math.PI * 2);
          ctx.strokeStyle = col.acento; ctx.globalAlpha = 0.5 - pulso * 0.35; ctx.lineWidth = 2; ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.beginPath(); ctx.arc(nd.x, nd.y, 8, 0, Math.PI * 2); ctx.fillStyle = col.nodoActivo;
          ctx.shadowColor = col.acento; ctx.shadowBlur = 16; ctx.fill();
        } else if (recorrido) {
          ctx.beginPath(); ctx.arc(nd.x, nd.y, 6, 0, Math.PI * 2); ctx.fillStyle = col.nodoRecorrido; ctx.fill();
        } else {
          ctx.beginPath(); ctx.arc(nd.x, nd.y, 6, 0, Math.PI * 2); ctx.strokeStyle = col.texto3; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.fillStyle = col.fondo; ctx.fill();
        }
        ctx.restore();
        // número + nombre corto
        ctx.save();
        ctx.fillStyle = esActivo ? col.texto : col.texto3;
        ctx.textAlign = "center";
        ctx.font = "600 12px Poppins, system-ui, sans-serif";
        const abajo = nd.y < H / 2;
        const ty = abajo ? nd.y + 30 : nd.y - 22;
        ctx.fillText(NODOS[k].n, nd.x, ty);
        ctx.font = "400 11px Poppins, system-ui, sans-serif";
        ctx.fillText(NODOS[k].corto, nd.x, ty + 14);
        ctx.restore();
      });
      ctx.globalAlpha = 1;
    };

    const ctrl = montarLienzo(canvas, onResize, onFrame);
    const quitarTema = observarTema(() => { col = leerColores(); });
    // el recorrido empieza desde el nodo 01 cada vez que la sección entra en pantalla
    let ioReset: IntersectionObserver | null = null;
    if (!reduce) {
      ioReset = new IntersectionObserver((e) => { if (e[0].isIntersecting) saltarRef.current = 0; }, { threshold: 0.2 });
      ioReset.observe(canvas);
    }
    return () => { ctrl.destruir(); quitarTema(); ioReset?.disconnect(); };
  }, []);

  const n = NODOS[activo];
  return (
    <section className="p3-sec" id="nodos">
      <div className="p3-wrap">
        <span className="p3-eyebrow">Servicios</span>
        <h2 className="p3-h2">Cada nodo, un proceso que ya no tienes que hacer <em className="p3-acento">tú.</em></h2>
        <p className="p3-sub">Una red de automatizaciones conectadas.</p>
        <p className="p3-p">Empieza por uno y suma los que necesites. Cada uno funcionando de verdad.</p>
      </div>
      <div className="p3-red">
        <canvas ref={ref} className="p3-red-canvas" aria-hidden="true" />
      </div>
      <div className="p3-wrap">
        <div className="p3-nodo-panel" aria-live="polite">
          <span className="p3-nodo-n">Nodo {n.n}</span>
          <h3 className="p3-nodo-nombre">{n.nombre}</h3>
          <p className="p3-nodo-desc">{n.desc}</p>
          <div className="p3-nodo-acc">
            <a href={whatsappLink(`Hola Noda, me interesa ${n.nombre}`)} className="p3-btn p3-btn-acento p3-btn-sm">Cotiza a medida</a>
            <Link href={`/servicios/${n.slug}`} className="p3-nodo-link">Ver servicio →</Link>
          </div>
        </div>
        <ul className="p3-nodo-botones">
          {NODOS.map((nd, i) => (
            <li key={nd.slug}>
              <button className={`p3-nodo-btn${i === activo ? " activo" : ""}`} aria-pressed={i === activo} onClick={() => irA(i)}>
                <span className="p3-nodo-btn-n">{nd.n}</span>
                <span className="p3-nodo-btn-c">{nd.corto}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
