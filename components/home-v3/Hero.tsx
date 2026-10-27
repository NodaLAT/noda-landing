"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";
import Obj3D from "./Obj3D";
import FonoWhatsApp, { type MsgFono } from "./FonoWhatsApp";

type ObjItem = { name: string; ancho: number; pos: CSSProperties; d: string; delay: string; extra?: boolean };
type Escena = {
  id: "atiende" | "agenda" | "cotiza" | "interpreta";
  verbo: string;
  sector: string;
  fono: { nombre: string; mensajes: MsgFono[]; nota?: string };
  objetos: ObjItem[];
  isotipoCrema?: boolean;
};

const ESCENAS: Escena[] = [
  {
    id: "atiende",
    verbo: "ATIENDE",
    sector: "Ferretería",
    isotipoCrema: true,
    fono: {
      nombre: "Ferretería",
      mensajes: [
        { de: "cliente", texto: "Hola, ¿tienen taladro inalámbrico?" },
        { de: "bot", texto: "¡Sí! Tenemos 3 modelos disponibles. ¿Te envío fotos y precios?" },
        { de: "cliente", texto: "Sí, porfa" },
        { de: "bot", texto: "Aquí tienes. ¿Te lo separo para que lo retires hoy?" },
      ],
    },
    objetos: [
      { name: "taladro", ancho: 150, pos: { left: -118, top: 18 }, d: "6s", delay: "0s" },
      { name: "burbuja", ancho: 118, pos: { right: -86, bottom: 44 }, d: "7.6s", delay: ".6s" },
    ],
  },
  {
    id: "agenda",
    verbo: "AGENDA",
    sector: "Clínica dental",
    fono: {
      nombre: "Clínica dental",
      mensajes: [
        { de: "cliente", texto: "Quiero una limpieza esta semana" },
        { de: "bot", texto: "Tengo jueves 10:00 o viernes 16:00. ¿Cuál prefieres?" },
        { de: "cliente", texto: "Jueves" },
        { de: "bot", texto: "Listo, te espero el jueves a las 10:00. Te escribo un día antes para recordártelo." },
      ],
    },
    objetos: [
      { name: "diente", ancho: 120, pos: { left: -96, top: 40 }, d: "6.5s", delay: ".2s" },
      { name: "calendario", ancho: 146, pos: { right: -104, bottom: 30 }, d: "7.8s", delay: ".5s" },
    ],
  },
  {
    id: "cotiza",
    verbo: "COTIZA",
    sector: "Taller automotriz",
    fono: {
      nombre: "Taller automotriz",
      mensajes: [
        { de: "cliente", texto: "¿Cuánto me sale cambiar las pastillas de freno de un Chevrolet Sail?" },
        { de: "bot", texto: "Te armo la cotización con repuestos y mano de obra…" },
        { de: "bot", texto: "Aquí la tienes. ¿Quieres agendar el ingreso al taller?" },
      ],
    },
    objetos: [
      { name: "llave", ancho: 140, pos: { left: -112, top: 8 }, d: "6.2s", delay: "0s" },
      { name: "llanta", ancho: 132, pos: { right: -78, top: 58 }, d: "7.4s", delay: ".4s" },
      { name: "calculadora", ancho: 116, pos: { right: -46, bottom: 14 }, d: "8s", delay: ".8s", extra: true },
    ],
  },
  {
    id: "interpreta",
    verbo: "INTERPRETA",
    sector: "Laboratorio",
    fono: {
      nombre: "Laboratorio",
      mensajes: [
        { de: "cliente", texto: "¿Ya están mis resultados?" },
        { de: "bot", texto: "Sí, aquí los tienes." },
        { de: "bot", archivo: { nombre: "Resultados.pdf", detalle: "Documento · 1 página" } },
        { de: "cliente", texto: "¿Me explicas qué significan?" },
        { de: "bot", texto: "Claro. Tus valores están dentro del rango esperado. Te explico cada uno en palabras simples." },
      ],
      nota: "Esta explicación es orientativa y no reemplaza la consulta con tu médico.",
    },
    objetos: [
      { name: "tubo", ancho: 92, pos: { left: -92, top: 40 }, d: "6.6s", delay: ".1s" },
      { name: "documento", ancho: 132, pos: { right: -96, bottom: 56 }, d: "7.7s", delay: ".5s" },
    ],
  },
];

export default function Hero() {
  const [activa, setActiva] = useState(0);
  const pausa = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // sin carrusel automático
    const t = setInterval(() => {
      if (!pausa.current) setActiva((i) => (i + 1) % ESCENAS.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // Publica el color de la escena actual para que el separador hero→cinta lo siga.
  const COLOR: Record<Escena["id"], string> = {
    atiende: "#1FA098", agenda: "#1BB8C9", cotiza: "#FF6F59", interpreta: "#0F2E2D",
  };
  useEffect(() => {
    document.documentElement.style.setProperty("--escena", COLOR[ESCENAS[activa].id]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activa]);

  const e = ESCENAS[activa];

  return (
    <section
      className="v3-hero"
      data-escena={e.id}
      onMouseEnter={() => (pausa.current = true)}
      onMouseLeave={() => (pausa.current = false)}
    >
      <span className="v3-hero-word" aria-hidden="true">{e.verbo}</span>

      <div className="container">
        <div className="v3-hero-grid">
          {/* texto fijo */}
          <div className="v3-hero-text">
            <div className="v3-hero-tabs" role="tablist" aria-label="Sectores">
              {ESCENAS.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={i === activa}
                  className="v3-hero-tab"
                  onClick={() => setActiva(i)}
                >
                  {s.verbo}
                </button>
              ))}
            </div>

            <span className="v3-hero-label">{e.sector} · Demo</span>
            <h1>Automatizamos tu negocio para que vendas más.</h1>
            <p className="v3-hero-sub">
              Respondemos, agendamos y cotizamos por ti en WhatsApp, las 24 horas, con IA.
            </p>
            <div className="v3-hero-actions">
              <a href={WHATSAPP_URL} className="v3-btn v3-btn--primario">
                Cotiza por WhatsApp <span className="flecha" aria-hidden="true">→</span>
              </a>
              <Link href="/servicios" className="v3-btn v3-btn--fantasma">
                Ver servicios
              </Link>
            </div>
          </div>

          {/* escenario: teléfono + objetos + isotipo */}
          <div className="v3-stage">
            <div className="v3-stage-inner">
              <Obj3D
                name={e.isotipoCrema ? "isotipo-crema" : "isotipo"}
                ancho={140}
                className="v3-stage-isotipo"
                priority={activa === 0}
              />
              {e.objetos.map((o) => (
                <Obj3D
                  key={o.name}
                  name={o.name}
                  ancho={o.ancho}
                  priority={activa === 0}
                  className={`v3-obj${o.extra ? " v3-obj--extra" : ""}`}
                  style={{ ...o.pos, ["--d" as string]: o.d, ["--delay" as string]: o.delay }}
                />
              ))}
              <FonoWhatsApp nombre={e.fono.nombre} mensajes={e.fono.mensajes} nota={e.fono.nota} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
