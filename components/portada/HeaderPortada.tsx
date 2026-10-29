"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";
import { SERVICIOS } from "@/lib/servicios";
import { RUTA_COTIZADOR, tieneOferta } from "@/lib/precios";
import BarraOferta from "@/components/precios/BarraOferta";
import { IconoServicio } from "./Iconos";

// Cabecera oscura (todas las páginas): logo blanco, menú central (Servicios · Casos · Proceso) y botón WhatsApp.
// "Servicios" abre un panel ancho (hover o clic; se cierra con Esc o al hacer clic afuera).
// En celular: hamburguesa -> menú a pantalla completa; Servicios es un acordeón.
const LINKS = [
  { label: "Casos", href: "/#casos" },
  { label: "Proceso", href: "/#proceso" },
];
const TITULO_PANEL = "Todo lo que tu negocio repite, lo automatizamos.";

function Etiquetas({ destacado, oferta }: { destacado?: boolean; oferta: boolean }) {
  return (
    <>
      {destacado && <span className="p3-menu-tag p3-menu-tag--estrella">Estrella</span>}
      {oferta && <span className="p3-menu-tag p3-con-oferta">Oferta</span>}
    </>
  );
}

export default function HeaderPortada({ vigente }: { vigente: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [abierto, setAbierto] = useState(false);          // menú de celular
  const [panel, setPanel] = useState(false);              // panel de Servicios (computadora)
  const [acordeon, setAcordeon] = useState(false);        // Servicios en el menú de celular
  const zonaRef = useRef<HTMLDivElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cierreRef = useRef<number | undefined>(undefined);
  const enfocarPanel = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [abierto]);

  // Panel: Esc lo cierra (y devuelve el foco al botón); clic afuera lo cierra.
  useEffect(() => {
    if (!panel) return;
    if (enfocarPanel.current) { panelRef.current?.querySelector<HTMLElement>("a")?.focus(); enfocarPanel.current = false; }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setPanel(false); botonRef.current?.focus(); } };
    const onClic = (e: MouseEvent) => { if (!zonaRef.current?.contains(e.target as Node)) setPanel(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClic);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClic); };
  }, [panel]);

  // Abierto con el mouse: un clic lo "fija" abierto en vez de cerrarlo; si se abrió con clic o teclado, el clic lo alterna.
  const porHover = useRef(false);
  const abrirHover = () => { window.clearTimeout(cierreRef.current); if (!panel) porHover.current = true; setPanel(true); };
  const cerrarHover = () => { cierreRef.current = window.setTimeout(() => { porHover.current = false; setPanel(false); }, 180); };
  const alternar = () => {
    if (porHover.current) { porHover.current = false; setPanel(true); return; }
    porHover.current = false;
    enfocarPanel.current = !panel;
    setPanel((p) => !p);
  };
  // Si el foco sale de la zona (Tab), el panel se cierra.
  const onBlurZona = (e: React.FocusEvent) => { if (!zonaRef.current?.contains(e.relatedTarget as Node)) setPanel(false); };
  const cerrarTodo = () => { setPanel(false); setAbierto(false); };

  return (
    <header className={`p3-nav${scrolled ? " scrolled" : ""}`}>
      {vigente && <BarraOferta />}
      <div className="p3-nav-in">
        <a href="/#" className="p3-logo" aria-label="Noda — inicio">
          <img src="/logo-noda.webp" alt="Noda" width={439} height={150} />
        </a>
        <nav className="p3-pills" aria-label="Principal">
          <div className="p3-menu-zona" ref={zonaRef} onMouseEnter={abrirHover} onMouseLeave={cerrarHover} onBlur={onBlurZona}>
            <button
              ref={botonRef}
              type="button"
              className={`p3-pill p3-menu-boton${panel ? " is-abierto" : ""}`}
              aria-expanded={panel}
              aria-controls="p3-panel-servicios"
              onClick={alternar}
            >
              Servicios
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div id="p3-panel-servicios" ref={panelRef} className="p3-menu-panel" hidden={!panel}>
              <div className="p3-menu-intro">
                <p className="p3-menu-intro-t">{TITULO_PANEL}</p>
                <Link href="/servicios" className="p3-btn p3-btn-acento p3-btn-sm" onClick={cerrarTodo}>Ver todos</Link>
                <Link href={RUTA_COTIZADOR} className="p3-menu-enlace" onClick={cerrarTodo}>Cotiza tu bot de WhatsApp →</Link>
                <a href={WHATSAPP_URL} className="p3-menu-enlace" onClick={cerrarTodo}>¿Dudas? Escríbenos</a>
              </div>
              <ul className="p3-menu-lista">
                {SERVICIOS.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/servicios/${s.slug}`} className="p3-menu-item" onClick={cerrarTodo}>
                      <span className="p3-menu-ico"><IconoServicio icono={s.icono} size={20} /></span>
                      <span className="p3-menu-txt">
                        <span className="p3-menu-nombre">{s.nombre}<Etiquetas destacado={s.destacado} oferta={vigente && tieneOferta(s.slug)} /></span>
                        <span className="p3-menu-linea">{s.linea}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {LINKS.map((l) => <a key={l.href} href={l.href} className="p3-pill">{l.label}</a>)}
        </nav>
        <a href={WHATSAPP_URL} className="p3-btn p3-btn-acento p3-nav-cta">Cotiza por WhatsApp</a>
        <button className="p3-burger" aria-label="Abrir menú" aria-expanded={abierto} onClick={() => setAbierto((o) => !o)}>
          <span /><span /><span />
        </button>
      </div>

      <div className={`p3-movil${abierto ? " abierto" : ""}`} hidden={!abierto}>
        <button className="p3-movil-x" aria-label="Cerrar menú" onClick={() => setAbierto(false)}>✕</button>
        <nav className="p3-movil-nav" aria-label="Menú de celular">
          <button type="button" className="p3-pill p3-movil-acordeon" aria-expanded={acordeon} aria-controls="p3-movil-servicios" onClick={() => setAcordeon((a) => !a)}>
            Servicios
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <ul id="p3-movil-servicios" className="p3-movil-lista" hidden={!acordeon}>
            {SERVICIOS.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className="p3-movil-item" onClick={cerrarTodo}>
                  <span className="p3-menu-ico"><IconoServicio icono={s.icono} size={18} /></span>
                  <span>{s.corto}</span>
                  <Etiquetas destacado={s.destacado} oferta={vigente && tieneOferta(s.slug)} />
                </Link>
              </li>
            ))}
            <li><Link href="/servicios" className="p3-movil-item p3-movil-item--fuerte" onClick={cerrarTodo}>Ver todos los servicios</Link></li>
            <li><Link href={RUTA_COTIZADOR} className="p3-movil-item p3-movil-item--fuerte" onClick={cerrarTodo}>Cotiza tu bot de WhatsApp →</Link></li>
          </ul>
          {LINKS.map((l) => <a key={l.href} href={l.href} className="p3-pill" onClick={() => setAbierto(false)}>{l.label}</a>)}
          <a href={WHATSAPP_URL} className="p3-btn p3-btn-acento" onClick={() => setAbierto(false)}>Cotiza por WhatsApp</a>
        </nav>
      </div>
    </header>
  );
}
