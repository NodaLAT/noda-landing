"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/site";
import { NODOS, type Icono } from "./datos";
import { montarLienzo, leerColores, reducirMovimiento, observarTema } from "./lienzo";

// Red con centro: el isotipo al medio y los 8 servicios alrededor (opciones que se combinan, no pasos).
// Los nodos son botones HTML; el canvas solo dibuja las líneas y los pulsos de luz.
// Cada ~1.8 s sale un pulso del centro a un servicio al azar (1 de cada 3 veces, a dos que se combinan).
const INTERVALO = 1.8;      // s entre pulsos automáticos
const VIAJE = 0.75;         // s que tarda el pulso en llegar
const PAUSA = 6;            // s de pausa tras pasar el mouse o tocar un nodo

const ICONOS: Record<Icono, React.ReactNode> = {
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />,
  calendario: <g><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></g>,
  calculadora: <g><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 14.5h.01M12 14.5h.01M16 14.5h.01M8 18h.01M12 18h.01M16 18h.01" /></g>,
  documento: <g><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></g>,
  personas: <g><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" /></g>,
  barras: <path d="M4 20h16M7 16v-5M12 16V6M17 16V9" />,
  navegador: <g><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M6.5 6.5h.01M9 6.5h.01" /></g>,
  bloques: <g><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></g>,
};

// posición en el óvalo (computadora): girado 22.5° para que ningún nodo quede justo arriba o abajo del centro
const posicion = (i: number) => {
  const a = ((-67.5 + i * 45) * Math.PI) / 180;
  return { "--x": `${50 + 42 * Math.cos(a)}%`, "--y": `${50 + 40 * Math.sin(a)}%` } as React.CSSProperties;
};

export default function RedNodos() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [activo, setActivo] = useState(0);                 // servicio del panel
  const [encendidos, setEncendidos] = useState<number[]>([0]);
  const [porUsuario, setPorUsuario] = useState(false);     // el panel solo se anuncia si lo eligió la persona
  const elegirRef = useRef<(i: number) => void>(() => {});

  const elegir = (i: number) => elegirRef.current(i);

  useEffect(() => {
    const canvas = ref.current;
    const red = canvas?.parentElement;
    if (!canvas || !red) return;
    const ctx = canvas.getContext("2d")!;
    const reduce = reducirMovimiento();
    let col = leerColores();
    let W = 0, H = 0;
    let centro = { x: 0, y: 0 };
    let nodos: { x: number; y: number }[] = [];

    let lit: number[] = [0], par = false;
    let pulsos: number[] = [], pulsoT0 = 0, pulsoPar = false;
    let proximo = performance.now() / 1000 + 0.8, pausaHasta = 0, ultimo = 0;

    // centros reales de los círculos (sirve para el óvalo y para la cuadrícula del celular)
    const medir = () => {
      const base = canvas.getBoundingClientRect();
      const c = (el: Element) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2 - base.left, y: r.top + r.height / 2 - base.top }; };
      const cen = red.querySelector(".p3-red-centro");
      if (cen) centro = c(cen);
      nodos = Array.from(red.querySelectorAll(".p3-srv-circ")).map(c);
    };
    const onResize = (w: number, h: number) => { W = w; H = h; medir(); };

    const encender = (idx: number[], esPar: boolean, usuario = false) => {
      lit = idx; par = esPar;
      setEncendidos(idx); setActivo(idx[0]); setPorUsuario(usuario);
    };
    elegirRef.current = (i: number) => {
      pulsos = [];
      encender([i], false, true);
      pausaHasta = performance.now() / 1000 + PAUSA;
    };

    const azar = (excepto: number[]) => {
      let k = 0;
      do k = Math.floor(Math.random() * NODOS.length); while (excepto.includes(k));
      return k;
    };
    const lanzar = (t: number) => {
      const a = azar([ultimo, ...lit]);     // nunca repite el anterior ni uno que ya está encendido
      ultimo = a;
      pulsoPar = Math.random() < 1 / 3;
      // el segundo servicio: vecino a 1–3 posiciones (nunca el opuesto, así la línea entre ellos no cruza el centro)
      const b = (a + (1 + Math.floor(Math.random() * 3)) * (Math.random() < 0.5 ? 1 : -1) + NODOS.length) % NODOS.length;
      pulsos = pulsoPar ? [a, b] : [a];
      pulsoT0 = t;
    };

    const linea = (x1: number, y1: number, x2: number, y2: number) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
    const ease = (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);

    const onFrame = (t: number) => {
      if (!nodos.length) return;
      if (!reduce && t >= pausaHasta && t >= proximo && !pulsos.length) { lanzar(t); proximo = t + INTERVALO; }
      if (pulsos.length && t - pulsoT0 >= VIAJE) { encender(pulsos, pulsoPar); pulsos = []; }

      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";

      // líneas tenues centro → cada servicio
      ctx.strokeStyle = col.borde; ctx.lineWidth = 1;
      for (const n of nodos) linea(centro.x, centro.y, n.x, n.y);

      // líneas encendidas (y la que une dos servicios que se combinan)
      ctx.save();
      ctx.strokeStyle = col.acento; ctx.lineWidth = 1.6; ctx.shadowColor = col.acento; ctx.shadowBlur = 8; ctx.globalAlpha = 0.9;
      for (const i of lit) linea(centro.x, centro.y, nodos[i].x, nodos[i].y);
      if (par && lit.length === 2) { ctx.setLineDash([3, 6]); linea(nodos[lit[0]].x, nodos[lit[0]].y, nodos[lit[1]].x, nodos[lit[1]].y); }
      ctx.restore();

      // pulsos de luz con estela corta
      if (pulsos.length) {
        const u = (t - pulsoT0) / VIAJE, cab = ease(Math.min(1, u)), cola = ease(Math.max(0, u - 0.22));
        ctx.save();
        ctx.strokeStyle = col.destacado; ctx.fillStyle = col.destacado; ctx.shadowColor = col.destacado; ctx.shadowBlur = 12;
        for (const i of pulsos) {
          const n = nodos[i], dx = n.x - centro.x, dy = n.y - centro.y;
          ctx.globalAlpha = 0.85; ctx.lineWidth = 2.5;
          linea(centro.x + dx * cola, centro.y + dy * cola, centro.x + dx * cab, centro.y + dy * cab);
          ctx.globalAlpha = 1;
          ctx.beginPath(); ctx.arc(centro.x + dx * cab, centro.y + dy * cab, 3.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
    };

    const ctrl = montarLienzo(canvas, onResize, onFrame);
    const quitarTema = observarTema(() => { col = leerColores(); });
    document.fonts?.ready.then(medir);
    return () => { ctrl.destruir(); quitarTema(); elegirRef.current = () => {}; };
  }, []);

  const n = NODOS[activo];
  return (
    <section className="p3-sec" id="nodos">
      <div className="p3-wrap">
        <span className="p3-eyebrow">Servicios</span>
        <h2 className="p3-h2">Cada nodo, un proceso que ya no tienes que hacer <em className="p3-acento">tú.</em></h2>
        <p className="p3-sub">Una red de automatizaciones conectadas.</p>
        <p className="p3-p">Empieza por uno y suma los que necesites. Cada uno funcionando de verdad.</p>

        <div className="p3-red">
          <canvas ref={ref} className="p3-red-canvas" aria-hidden="true" />
          <div className="p3-red-centro">
            <img src="/isotipo-noda.png" alt="Noda" width={160} height={160} />
          </div>
          {NODOS.map((nd, i) => (
            <button
              key={nd.slug}
              type="button"
              className={`p3-srv${encendidos.includes(i) ? " on" : ""}`}
              style={posicion(i)}
              aria-pressed={i === activo}
              aria-controls="p3-srv-panel"
              onPointerEnter={(e) => { if (e.pointerType === "mouse") elegir(i); }}
              onFocus={() => elegir(i)}
              onClick={() => elegir(i)}
            >
              <span className="p3-srv-circ">
                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">{ICONOS[nd.icono]}</svg>
              </span>
              <span className="p3-srv-nombre">{nd.corto}</span>
            </button>
          ))}
        </div>

        <div className="p3-nodo-panel" id="p3-srv-panel" aria-live={porUsuario ? "polite" : "off"}>
          <span className="p3-nodo-n">Servicio</span>
          <h3 className="p3-nodo-nombre">{n.nombre}</h3>
          <p className="p3-nodo-desc">{n.desc}</p>
          <div className="p3-nodo-acc">
            <a href={whatsappLink(`Hola Noda, me interesa ${n.nombre}`)} className="p3-btn p3-btn-acento p3-btn-sm">Cotiza a medida</a>
            <Link href={`/servicios/${n.slug}`} className="p3-nodo-link">Ver servicio →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
