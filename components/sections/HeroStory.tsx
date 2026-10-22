"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Flecha } from "@/components/servicios/Iconos";

// Las 4 escenas del teléfono, con su texto al lado.
// Los títulos son los mismos chips que muestra el teléfono.
const ESCENAS = [
  {
    titulo: "Responde solo · 24/7",
    texto: "Tu asistente contesta en WhatsApp al instante, de día o de noche, y le pasa la conversación a tu equipo cuando hace falta.",
    href: "/servicios/atencion-y-ventas-whatsapp",
  },
  {
    titulo: "Agenda y confirma citas",
    texto: "Tus clientes reservan solos, reciben la confirmación y un recordatorio antes de su cita.",
    href: "/servicios/agendamiento-y-recordatorios",
  },
  {
    titulo: "Cotiza en segundos",
    texto: "Piden precio y reciben su cotización completa en segundos, con tus precios y tu formato.",
    href: "/servicios/cotizaciones-al-instante",
  },
  {
    titulo: "Interpreta documentos y resultados con IA",
    texto: "La IA lee resultados y documentos y los explica en palabras simples, al instante.",
    href: "/servicios/interpretacion-de-documentos",
  },
];

// En computadora: la escena cuyo texto cruza el centro de la pantalla es la que muestra el teléfono
// (se avisa a HeroPhoneDemo con el evento "noda:escena"). En celular es una lista vertical simple.
export default function HeroStory() {
  const raizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return;
    const pasos = Array.from(raiz.querySelectorAll<HTMLElement>(".story-step"));
    const escritorio = matchMedia("(min-width: 981px)");
    let activa: number | null = null;

    const avisar = (i: number | null) => {
      if (i === activa) return;
      activa = i;
      pasos.forEach((p, k) => p.classList.toggle("is-active", k === i));
      window.dispatchEvent(new CustomEvent("noda:escena", { detail: i }));
    };

    // Se calcula en cada scroll (4 medidas, una vez por cuadro) para que funcione también
    // con saltos grandes, como volver arriba de golpe.
    let raf = 0;
    const calcular = () => {
      raf = 0;
      if (!escritorio.matches) return avisar(null);
      const centro = innerHeight / 2;
      const i = pasos.findIndex((p) => { const r = p.getBoundingClientRect(); return r.top <= centro && r.bottom > centro; });
      if (i >= 0) return avisar(i);
      // Antes de la primera escena: el teléfono retoma su animación automática.
      // Después de la última: se queda en la escena 4 mientras la página sigue.
      avisar(pasos[0].getBoundingClientRect().top > centro ? null : pasos.length - 1);
    };
    const alMover = () => { if (!raf) raf = requestAnimationFrame(calcular); };
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover, { passive: true });
    escritorio.addEventListener("change", alMover);
    calcular();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
      escritorio.removeEventListener("change", alMover);
    };
  }, []);

  return (
    <div className="story" ref={raizRef}>
      {ESCENAS.map((e, i) => (
        <article className="story-step" key={e.href}>
          <div className="story-num">{String(i + 1).padStart(2, "0")} / {String(ESCENAS.length).padStart(2, "0")}</div>
          <h2>{e.titulo}</h2>
          <p className="story-text">{e.texto}</p>
          <Link href={e.href} className="svc-link">Ver servicio <Flecha size={15} /></Link>
        </article>
      ))}
    </div>
  );
}
