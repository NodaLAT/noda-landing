"use client";

import { useEffect, useRef, useState } from "react";

// Cifra que cuenta desde 0 al entrar en pantalla (ej. "12,6 M", "40 %+", "7×").
// El HTML trae la cifra final: sin JS o con "reducir movimiento" se ve directo el valor real.
export default function Contador({ valor }: { valor: string }) {
  const m = valor.match(/^([^\d]*)(\d+(?:,\d+)?)(.*)$/);
  const [texto, setTexto] = useState(valor);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, antes, numero, despues] = m;
    const decimales = numero.includes(",") ? numero.split(",")[1].length : 0;
    const meta = parseFloat(numero.replace(",", "."));
    const formato = (n: number) => antes + n.toFixed(decimales).replace(".", ",") + despues;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const paso = (t: number) => {
        const u = Math.min(1, (t - t0) / dur), suave = 1 - Math.pow(1 - u, 3);
        setTexto(formato(meta * suave));
        if (u < 1) raf = requestAnimationFrame(paso);
      };
      setTexto(formato(0));
      raf = requestAnimationFrame(paso);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [valor]);

  // el lector de pantalla lee solo el valor final (oculto a la vista), no los números intermedios
  return <span ref={ref}><span className="p3-sr">{valor}</span><span aria-hidden="true">{texto}</span></span>;
}
