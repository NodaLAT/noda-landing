"use client";

import { useEffect, useRef, useState } from "react";
import type { Icono } from "@/lib/servicios";
import ChatMini from "./ChatMini";
import Vista from "./Vistas";

// =====================================================================
// PILOTO de la página "Atención y ventas 24/7 por WhatsApp"
// (/servicios/atencion-y-ventas-whatsapp). Solo se usa en ese servicio;
// las otras 7 páginas siguen con la plantilla compartida.
// Reutiliza el chat estilo WhatsApp (ChatMini) y las clases .bv-wa / .pa-*.
// Textos nuevos: ver docs/textos-nuevos-atencion.md.
// Todo es simulación: no hay IA real ni se envía ningún mensaje.
// =====================================================================

// Respeta "reducir movimiento" sin romper el render del servidor.
function usaReducirMovimiento() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const al = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", al);
    return () => mq.removeEventListener("change", al);
  }, []);
  return reduce;
}

// ---------------------------------------------------------------------
// 1) Chat grande y animado de la cabecera (reutiliza ChatMini, en marco de teléfono).
//    Decorativo: la demo interactiva de más abajo es la accesible con teclado.
// ---------------------------------------------------------------------
export function ChatCabecera() {
  return (
    <div className="pa-fono pa-fono--cab" aria-hidden="true">
      <ChatMini />
    </div>
  );
}

// ---------------------------------------------------------------------
// Demo animada de la cabecera (al lado del título; en celular, debajo).
// Atención usa el chat de WhatsApp (ChatCabecera). Los demás servicios usan
// su vista previa (components/servicios/Vistas.tsx) ampliada, que se anima sola
// cuando entra en pantalla y se repite. Decorativa (aria-hidden).
// La animación de las Vistas corre con la clase .is-activa en el .p3-bv; aquí
// la activamos/desactivamos según esté en pantalla. Con "reducir movimiento"
// queda activa (estado final quieto, como en las tarjetas).
// ---------------------------------------------------------------------
export function DemoCabecera({ icono }: { icono: Icono }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    const bv = host?.querySelector(".p3-bv");
    if (!bv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { bv.classList.add("is-activa"); return; }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => bv.classList.toggle("is-activa", e.isIntersecting)),
      { rootMargin: "60px" }
    );
    io.observe(bv);
    return () => io.disconnect();
  }, []);

  if (icono === "chat") return <ChatCabecera />;
  return <div className="pa-demo-cab" ref={ref}><Vista icono={icono} /></div>;
}

// ---------------------------------------------------------------------
// Mini ilustraciones de los 3 pasos (trazo, 24×24, como el resto de íconos).
// ---------------------------------------------------------------------
const trazo = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
// Íconos propios de los 3 pasos de Atención 24/7 (el piloto se ve igual). Otros servicios
// muestran el número del paso en el círculo (no pasan "iconos" a ComoFunciona).
export const ICONOS_ATENCION = [
  // llega el mensaje
  <g key="1" {...trazo}><path d="M21 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.4A8 8 0 1 1 21 11.5Z" /><path d="M8.5 11.5h7M8.5 14h4" /></g>,
  // la IA responde con tu información
  <g key="2" {...trazo}><rect x="4" y="7" width="16" height="12" rx="2.5" /><path d="M12 3v4M9 12h.01M15 12h.01M9.5 15.5h5" /><path d="M12 3 13 5l2 .3-1.4 1.4.3 2L12 7.8 10.1 8.7l.3-2L9 5.3 11 5Z" /></g>,
  // pasa a tu equipo
  <g key="3" {...trazo}><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 9h5M18.5 6.5 21 9l-2.5 2.5" /></g>,
];

// ---------------------------------------------------------------------
// 2) "Cómo funciona": 3 pasos unidos por una línea que se ilumina al bajar.
//    Cada paso se enciende cuando entra en pantalla. Con "reducir movimiento"
//    quedan los 3 encendidos y la línea completa, sin transiciones.
// ---------------------------------------------------------------------
export function ComoFunciona({ pasos, iconos }: { pasos: { titulo: string; detalle?: string }[]; iconos?: React.ReactNode[] }) {
  const reduce = usaReducirMovimiento();
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [activos, setActivos] = useState(0); // cuántos pasos encendidos (0..n)

  useEffect(() => {
    if (reduce) { setActivos(pasos.length); return; }
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((en) => {
          if (en.isIntersecting) {
            const i = refs.current.indexOf(en.target as HTMLLIElement);
            if (i >= 0) setActivos((a) => Math.max(a, i + 1));
          }
        });
      },
      { threshold: 0.6, rootMargin: "0px 0px -15% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [reduce, pasos.length]);

  // avance de la línea: de círculo a círculo (0 · … · 1)
  const avance = pasos.length > 1 ? (activos <= 1 ? 0 : (activos - 1) / (pasos.length - 1)) : 1;

  return (
    <ol className="pa-pasos" style={{ "--avance": avance, "--n": pasos.length } as React.CSSProperties}>
      <span className="pa-pasos-linea" aria-hidden="true"><i /></span>
      {pasos.map((p, k) => (
        <li
          key={p.titulo}
          ref={(el) => { refs.current[k] = el; }}
          className={`pa-paso${k < activos ? " is-on" : ""}`}
        >
          <span className="pa-paso-ico" aria-hidden="true">
            {iconos?.[k]
              ? <svg viewBox="0 0 24 24" width="30" height="30">{iconos[k]}</svg>
              : <span className="pa-paso-ncirc">{k + 1}</span>}
          </span>
          {iconos && <span className="pa-paso-num">{String(k + 1).padStart(2, "0")}</span>}
          <p className="pa-paso-txt">
            {p.detalle
              ? <><b className="pa-paso-tit">{p.titulo}</b><span className="pa-paso-det">{p.detalle}</span></>
              : p.titulo}
          </p>
        </li>
      ))}
    </ol>
  );
}

// ---------------------------------------------------------------------
// 3) Demo interactiva grande: teléfono WhatsApp con preguntas sugeridas.
//    La persona toca una pregunta y el asistente responde con "escribiendo…".
//    Una respuesta es la tarjeta de producto con el botón "Separar" (simulado).
// ---------------------------------------------------------------------
type Resp =
  | { tipo: "texto"; texto: string }
  | { tipo: "producto"; nombre: string; precio: string; nota: string };
type PreguntaWA = { pregunta: string; respuesta: Resp[] };

const NEGOCIO = "Ferretería El Tornillo";
const SALUDO = "¡Hola! 👋 Soy el asistente de Ferretería El Tornillo. Pregúntame lo que necesites.";
const PREGUNTAS_WA: PreguntaWA[] = [
  {
    pregunta: "¿Cuánto cuesta el taladro inalámbrico?",
    respuesta: [
      { tipo: "producto", nombre: "Taladro inalámbrico 20V", precio: "$89,90", nota: "Incluye cargador y 2 baterías" },
      { tipo: "texto", texto: "¿Te lo separo para que lo retires hoy?" },
    ],
  },
  {
    pregunta: "¿Qué horario tienen?",
    respuesta: [{ tipo: "texto", texto: "Atendemos de lunes a sábado de 8:00 a 19:00, y los domingos de 9:00 a 13:00." }],
  },
  {
    pregunta: "¿Dónde están ubicados?",
    respuesta: [{ tipo: "texto", texto: "Estamos en Av. de los Constructores 123, a una cuadra del parque. Te comparto la ubicación 📍" }],
  },
  {
    pregunta: "¿Tienen cemento en stock?",
    respuesta: [{ tipo: "texto", texto: "Sí, tenemos cemento de 50 kg disponible. ¿Cuántos sacos necesitas?" }],
  },
];

type Burbuja = { id: number; de: "cliente" | "bot"; resp: Resp };

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

export function DemoWhatsApp() {
  const inicial: Burbuja[] = [{ id: 0, de: "bot", resp: { tipo: "texto", texto: SALUDO } }];
  const [items, setItems] = useState<Burbuja[]>(inicial);
  const [escribiendo, setEscribiendo] = useState(false);  // respuesta en curso: botones bloqueados
  const [botEscribe, setBotEscribe] = useState(false);     // puntitos "escribiendo…"
  const [hechas, setHechas] = useState<number[]>([]);       // preguntas ya usadas
  const sigId = useRef(1);
  const timers = useRef<number[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    const c = chatRef.current;
    if (c) c.scrollTo({ top: c.scrollHeight, behavior: "smooth" });
  }, [items, botEscribe]);

  function agregar(de: Burbuja["de"], resp: Resp) {
    setItems((prev) => [...prev, { id: sigId.current++, de, resp }]);
  }

  function preguntar(indice: number) {
    if (escribiendo) return;
    const { pregunta, respuesta } = PREGUNTAS_WA[indice];
    setHechas((h) => (h.includes(indice) ? h : [...h, indice]));
    agregar("cliente", { tipo: "texto", texto: pregunta });
    setEscribiendo(true);
    setBotEscribe(true);
    let espera = 1000;
    respuesta.forEach((resp, i) => {
      const hayMas = i < respuesta.length - 1;
      timers.current.push(window.setTimeout(() => {
        agregar("bot", resp);
        setBotEscribe(hayMas);
        if (!hayMas) setEscribiendo(false);
      }, espera));
      espera += resp.tipo === "texto" ? 700 + Math.min(resp.texto.length * 11, 650) : 1100;
    });
  }

  function reiniciar() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setEscribiendo(false);
    setBotEscribe(false);
    setHechas([]);
    setItems(inicial);
  }

  return (
    <div className="pa-demo">
      <div className="pa-fono pa-fono--demo">
        <div className="bv-wa">
          <div className="bv-wa-cab">
            <span className="bv-wa-av">ET</span>
            <span className="bv-wa-quien">
              <b>{NEGOCIO}</b>
              <small className={botEscribe ? "is-escribiendo" : undefined}>{botEscribe ? "escribiendo…" : "en línea"}</small>
            </span>
            <span className="bv-demo bv-demo--wa">Demo</span>
          </div>
          <div className="bv-wa-chat" ref={chatRef} aria-live="polite">
            <span className="bv-wa-fecha">Hoy</span>
            {items.map((it) =>
              it.resp.tipo === "producto" ? (
                <div key={it.id} className="bv-wa-m bv-wa-m--bot bv-wa-prod">
                  <span className="bv-wa-prod-img"><Taladro /></span>
                  <span className="bv-wa-prod-t">{it.resp.nombre} · <b>{it.resp.precio}</b></span>
                  <span className="bv-wa-prod-nota">{it.resp.nota}</span>
                  <span className="bv-wa-prod-btn">Separar</span>
                </div>
              ) : (
                <p key={it.id} className={`bv-wa-m bv-wa-m--${it.de}`}>
                  {it.resp.texto}
                  <span className="bv-wa-hora">9:41</span>
                </p>
              )
            )}
            {botEscribe && <span className="bv-wa-m bv-wa-m--bot bv-wa-puntos" aria-label="El asistente está escribiendo"><i /><i /><i /></span>}
          </div>
        </div>
      </div>

      <div className="pa-opciones">
        <div className="pa-opciones-cab">
          <span>Toca una pregunta</span>
          {items.length > 1 && <button type="button" className="pa-reset" onClick={reiniciar}>Reiniciar</button>}
        </div>
        {PREGUNTAS_WA.map((p, i) => (
          <button
            key={p.pregunta}
            type="button"
            className="pa-opcion"
            disabled={escribiendo || hechas.includes(i)}
            onClick={() => preguntar(i)}
          >
            {p.pregunta}
          </button>
        ))}
        <p className="p3-demo-nota">Es una simulación: las respuestas son de ejemplo y no se envía ningún mensaje real.</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 5) "Qué incluye" con íconos y una entrada suave al entrar en pantalla.
// ---------------------------------------------------------------------
// Íconos propios de "Qué incluye" de Atención 24/7 (el piloto se ve igual).
export const ICONOS_INCLUYE_ATENCION = [
  // respuestas con tu información
  <g key="1" {...trazo}><path d="M21 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.4A8 8 0 1 1 21 11.5Z" /><path d="M8.5 11h7M8.5 14h4" /></g>,
  // atención 24/7
  <g key="2" {...trazo}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></g>,
  // paso a una persona
  <g key="3" {...trazo}><circle cx="12" cy="8.5" r="3.2" /><path d="M5.5 19a6.5 6.5 0 0 1 13 0" /></g>,
  // historial de conversaciones
  <g key="4" {...trazo}><path d="M4 12a8 8 0 1 1 2.3 5.6" /><path d="M4 12v4M4 16h4M12 8v4l3 2" /></g>,
];

// Ícono por defecto para "Qué incluye" (servicios que no traen íconos propios): un check.
const ICONO_CHECK = <g key="check" {...trazo}><path d="M20 6 9 17l-5-5" /></g>;

export function QueIncluye({ items, iconos }: { items: string[]; iconos?: React.ReactNode[] }) {
  const reduce = usaReducirMovimiento();
  const ref = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <ul ref={ref} className={`pa-incluye${visible ? " is-on" : ""}`}>
      {items.map((t, k) => (
        <li key={t} className="pa-incluye-item" style={{ "--d": `${k * 90}ms` } as React.CSSProperties}>
          <span className="pa-incluye-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24">{iconos ? iconos[k % iconos.length] : ICONO_CHECK}</svg>
          </span>
          <span className="pa-incluye-tx">{t}</span>
        </li>
      ))}
    </ul>
  );
}
