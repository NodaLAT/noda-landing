"use client";

import { useEffect, useRef, useState } from "react";
import { CONVERSACIONES } from "@/lib/conversaciones";

// Mini chat de la tarjeta de Atención 24/7 (/servicios): los 3 primeros mensajes de la conversación
// ATIENDE (docs/contenido-web-v3.md) se escriben solos, en bucle. Decorativo (la tarjeta lo marca aria-hidden).
// Se dibuja completo desde el servidor; el bucle avanza solo con el chat en pantalla y la pestaña visible.
// Con "reducir movimiento" queda la conversación completa y quieta.
const CONV = CONVERSACIONES.atiende;
const MSGS = CONV.mensajes.slice(0, 3).map((m) => ({ de: m.de, texto: "texto" in m ? m.texto : "" }));

type Estado = { i: number; chars: number; puntos: boolean; saliendo: boolean };   // i = mensajes completos

export default function ChatMini() {
  const ref = useRef<HTMLDivElement>(null);
  const [e, setE] = useState<Estado>({ i: MSGS.length, chars: 0, puntos: false, saliendo: false });

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    (async () => {
      await espera(1600);
      while (vivo) {
        setE((s) => ({ ...s, saliendo: true }));
        await espera(350);
        for (let i = 0; i < MSGS.length && vivo; i++) {
          const m = MSGS[i];
          setE({ i, chars: 0, puntos: m.de === "bot", saliendo: false });
          await espera(m.de === "bot" ? 900 : 350);
          for (let c = 1; c <= m.texto.length && vivo; c++) {
            setE({ i, chars: c, puntos: false, saliendo: false });
            await espera(m.de === "bot" ? 22 : 38);
          }
          setE({ i: i + 1, chars: 0, puntos: false, saliendo: false });
          await espera(650);
        }
        await espera(2600);
      }
    })();
    return () => { vivo = false; io.disconnect(); };
  }, []);

  return (
    <div className={`bv-chat${e.saliendo ? " is-saliendo" : ""}`} ref={ref}>
      <div className="bv-chat-cab">
        <span className="bv-chat-av" />
        <b>{CONV.negocio}</b>
        <span className="bv-chat-demo">Demo</span>
      </div>
      <div className="bv-chat-msgs">
        {MSGS.slice(0, e.i).map((m, k) => <p key={k} className={`bv-chat-m bv-chat-m--${m.de}`}>{m.texto}</p>)}
        {e.i < MSGS.length && e.chars > 0 && (
          <p className={`bv-chat-m bv-chat-m--${MSGS[e.i].de}`}>{MSGS[e.i].texto.slice(0, e.chars)}<span className="bv-chat-cursor" /></p>
        )}
        {e.puntos && <span className="bv-chat-puntos"><i /><i /><i /></span>}
      </div>
    </div>
  );
}
