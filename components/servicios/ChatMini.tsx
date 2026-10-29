"use client";

import { useEffect, useRef, useState } from "react";
import { CONVERSACIONES } from "@/lib/conversaciones";

// Chat de la tarjeta de Atención 24/7 (/servicios), con el estilo de WhatsApp en modo oscuro.
// Conversación ATIENDE de docs/contenido-web-v3.md en una ferretería ficticia ("Ferretería El Tornillo").
// Desde el teléfono del cliente: lo que escribe el cliente va a la derecha (verde) y el asistente, a la izquierda.
// Se dibuja desde el servidor con los 2 primeros mensajes; luego la conversación sigue ("escribiendo…",
// tarjeta del taladro y la última respuesta) en bucle, solo con el chat en pantalla y la pestaña visible.
// Con "reducir movimiento" queda la conversación completa y quieta. Decorativo (la tarjeta lo marca aria-hidden).
const M = CONVERSACIONES.atiende.mensajes.map((m) => ({ de: m.de, hora: m.hora, texto: "texto" in m ? m.texto : "" }));
// Orden en pantalla: los 3 primeros mensajes, la tarjeta del producto y la última respuesta.
const PIEZAS = [M[0], M[1], M[2], { de: "producto" as const, hora: M[3].hora, texto: "" }, M[3]];
const INICIAL = 2;

// Doble check (dibujo, no texto): gris claro = entregado; azul #53bdeb = leído.
export function Check2({ clase = "" }: { clase?: string }) {
  return (
    <svg className={`bv-check2 ${clase}`} viewBox="0 0 18 12" width="15" height="10" aria-hidden="true">
      <path d="M1 6.5 4.5 10 11 2.5M7 10l6.5-7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Estado = { n: number; escribiendo: boolean; leido: boolean; saliendo: boolean };

function Taladro() {
  return (
    <svg viewBox="0 0 120 78" width="120" height="78" aria-hidden="true">
      <rect x="18" y="12" width="64" height="24" rx="9" fill="#14807a" />
      <path d="M26 18h20M26 24h20M26 30h20" stroke="#0e5f5a" strokeWidth="2" strokeLinecap="round" />
      <rect x="82" y="17" width="12" height="14" rx="2" fill="#37474f" />
      <path d="M94 22.5h16l4 1.5-4 1.5H94z" fill="#90a4ae" />
      <path d="M40 36h16l-4 26H36z" fill="#263238" />
      <rect x="55" y="38" width="5" height="9" rx="2" fill="#37474f" />
      <rect x="28" y="60" width="36" height="12" rx="3" fill="#14807a" />
      <rect x="32" y="64" width="12" height="3" rx="1.5" fill="#8fd6d0" />
    </svg>
  );
}

export default function ChatMini() {
  const ref = useRef<HTMLDivElement>(null);
  const [e, setE] = useState<Estado>({ n: INICIAL, escribiendo: false, leido: true, saliendo: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setE({ n: PIEZAS.length, escribiendo: false, leido: true, saliendo: false }); return; }
    let activo = false, vivo = true;
    const io = new IntersectionObserver((x) => { activo = x[0].isIntersecting; }, { threshold: 0.2 });
    io.observe(el);
    // espera que solo descuenta tiempo mientras el chat se ve
    const espera = (ms: number) => new Promise<void>((fin) => {
      let resta = ms, antes = performance.now();
      const tic = () => {
        if (!vivo) return;
        const ahora = performance.now();
        if (activo && !document.hidden) resta -= ahora - antes;
        antes = ahora;
        if (resta <= 0) fin(); else setTimeout(tic, Math.min(Math.max(resta, 16), 120));
      };
      setTimeout(tic, Math.min(ms, 120));
    });
    const poner = (p: Partial<Estado>) => { if (vivo) setE((s) => ({ ...s, ...p })); };
    (async () => {
      while (vivo) {
        await espera(1800);
        poner({ n: 3, leido: false });                 // el cliente responde
        await espera(700);
        poner({ leido: true, escribiendo: true });     // lo lee el asistente y escribe
        await espera(1500);
        poner({ n: 4, escribiendo: false });           // tarjeta del taladro
        await espera(800);
        poner({ escribiendo: true });
        await espera(1200);
        poner({ n: 5, escribiendo: false });           // "¿Te lo separo…?"
        await espera(4200);
        poner({ saliendo: true });
        await espera(400);
        poner({ n: INICIAL, saliendo: false });
      }
    })();
    return () => { vivo = false; io.disconnect(); };
  }, []);

  return (
    <div className={`bv-wa${e.saliendo ? " is-saliendo" : ""}`} ref={ref}>
      <div className="bv-wa-cab">
        <span className="bv-wa-av">ET</span>
        <span className="bv-wa-quien">
          <b>Ferretería El Tornillo</b>
          <small className={e.escribiendo ? "is-escribiendo" : undefined}>{e.escribiendo ? "escribiendo…" : "en línea"}</small>
        </span>
        <span className="bv-demo bv-demo--wa">Demo</span>
      </div>
      <div className="bv-wa-chat">
        <span className="bv-wa-fecha">Hoy</span>
        {PIEZAS.slice(0, e.n).map((m, k) => m.de === "producto" ? (
          <div key={k} className="bv-wa-m bv-wa-m--bot bv-wa-prod">
            <span className="bv-wa-prod-img"><Taladro /></span>
            <span className="bv-wa-prod-t">Taladro inalámbrico 20V · <b>$89,90</b></span>
            <span className="bv-wa-prod-btn">Separar</span>
          </div>
        ) : (
          <p key={k} className={`bv-wa-m bv-wa-m--${m.de}`}>
            {m.texto}
            <span className="bv-wa-hora">
              {m.hora}
              {m.de === "cliente" && <Check2 clase={e.leido || k < e.n - 1 ? "is-leido" : ""} />}
            </span>
          </p>
        ))}
        {e.escribiendo && <span className="bv-wa-m bv-wa-m--bot bv-wa-puntos"><i /><i /><i /></span>}
      </div>
    </div>
  );
}
