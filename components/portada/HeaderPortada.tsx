"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";
import { SERVICIOS } from "@/lib/servicios";
import { RUTA_COTIZADOR, dolares, precioDe, tieneOferta } from "@/lib/precios";
import { SLUG_ATENCION } from "@/lib/cotizador";
import BarraOferta from "@/components/precios/BarraOferta";
import { RUTA_PLAN } from "@/lib/plan";
import { usePlan } from "@/components/plan/PlanProvider";
import { IconoServicio } from "./Iconos";

// Cabecera oscura (todas las páginas): logo blanco, menú central (Servicios · Casos · Proceso) y botón WhatsApp.
// "Servicios" es un enlace a /servicios; al pasar el mouse abre un panel ancho. La flecha de al lado
// (aria-expanded) abre o cierra el panel con teclado o pantalla táctil; Esc y el clic afuera lo cierran.
// En celular: hamburguesa -> menú a pantalla completa; "Servicios" lleva a /servicios y su flecha abre el acordeón.
const LINKS = [
  { label: "Casos", href: "/#casos" },
  { label: "Proceso", href: "/#proceso" },
];
const TITULO_PANEL = "Todo lo que tu negocio repite, lo automatizamos.";
const ATENCION = precioDe(SLUG_ATENCION)!.implementacion;

function Etiquetas({ destacado, oferta }: { destacado?: boolean; oferta: boolean }) {
  return (
    <>
      {destacado && <span className="p3-menu-tag p3-menu-tag--estrella">Estrella</span>}
      {oferta && <span className="p3-menu-tag p3-con-oferta">Oferta</span>}
    </>
  );
}

function Flechita({ size }: { size: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function HeaderPortada({ vigente }: { vigente: boolean }) {
  const { items } = usePlan();
  const enPlan = items.length;
  const [scrolled, setScrolled] = useState(false);
  const [montado, setMontado] = useState(false);          // para el portal (evita render en el servidor)
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

  useEffect(() => { setMontado(true); }, []);

  // El menú de celular se renderiza en <body> (portal) para que no quede atrapado dentro del
  // encabezado: la cabecera usa backdrop-filter, y eso convierte a .p3-nav en el bloque contenedor
  // de los elementos position:fixed, lo que recortaba el panel al alto del encabezado.
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [abierto]);

  // El menú de celular se cierra con la tecla Escape.
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setAbierto(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [abierto]);

  // Panel: Esc lo cierra (y devuelve el foco a la flecha); clic o toque afuera lo cierra.
  useEffect(() => {
    if (!panel) return;
    if (enfocarPanel.current) { panelRef.current?.querySelector<HTMLElement>("a")?.focus(); enfocarPanel.current = false; }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setPanel(false); botonRef.current?.focus(); } };
    const onClic = (e: PointerEvent) => { if (!zonaRef.current?.contains(e.target as Node)) setPanel(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClic);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onClic); };
  }, [panel]);

  // Hover (solo mouse): abre el panel y, al salir, lo cierra si se abrió así. Un clic en la flecha lo "fija" abierto;
  // si se abrió con la flecha (clic, toque o teclado), la flecha lo alterna y se cierra con Esc o clic afuera.
  const porHover = useRef(false);
  const abrirHover = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(cierreRef.current);
    if (!panel) porHover.current = true;
    setPanel(true);
  };
  const cerrarHover = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !porHover.current) return;
    cierreRef.current = window.setTimeout(() => { porHover.current = false; setPanel(false); }, 180);
  };
  const alternar = (e: React.MouseEvent) => {
    if (porHover.current) { porHover.current = false; setPanel(true); return; }
    enfocarPanel.current = !panel && e.detail === 0;      // detail 0 = activado con teclado: el foco entra al panel
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
          <div className="p3-menu-zona" ref={zonaRef} onPointerEnter={abrirHover} onPointerLeave={cerrarHover} onBlur={onBlurZona}>
            <span className={`p3-pill p3-menu-par${panel ? " is-abierto" : ""}`}>
              <Link href="/servicios" className="p3-menu-link" onClick={cerrarTodo}>Servicios</Link>
              <button
                ref={botonRef}
                type="button"
                className="p3-menu-flecha"
                aria-expanded={panel}
                aria-controls="p3-panel-servicios"
                aria-label="Mostrar los servicios"
                onClick={alternar}
              >
                <Flechita size={14} />
              </button>
            </span>
            <div id="p3-panel-servicios" ref={panelRef} className="p3-menu-panel" hidden={!panel}>
              <div className="p3-menu-intro">
                <div className="p3-menu-intro-top">
                  <p className="p3-menu-intro-t">{TITULO_PANEL}</p>
                  <ul className="p3-menu-datos">
                    {vigente && <li className="p3-con-oferta">Precios de lanzamiento hasta el 31 de diciembre</li>}
                    <li>
                      Atención 24/7 desde{" "}
                      {vigente && ATENCION.oferta !== undefined
                        ? <><b className="p3-con-oferta">{dolares(ATENCION.oferta)}</b><b className="p3-sin-oferta">{dolares(ATENCION.normal)}</b></>
                        : <b>{dolares(ATENCION.normal)}</b>}
                    </li>
                  </ul>
                </div>
                <div className="p3-menu-acc">
                  <Link href={RUTA_COTIZADOR} className="p3-btn p3-btn-acento p3-btn-sm" onClick={cerrarTodo}>Cotiza tu bot de WhatsApp</Link>
                  <Link href="/servicios" className="p3-btn p3-btn-outline p3-btn-sm" onClick={cerrarTodo}>Ver todos</Link>
                  <a href={WHATSAPP_URL} className="p3-menu-enlace" onClick={cerrarTodo}>¿Dudas? Escríbenos</a>
                </div>
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
        {enPlan > 0 && (
          <Link href={RUTA_PLAN} className="p3-plan-acceso" onClick={cerrarTodo}>
            Mi plan <span className="p3-plan-cuenta" aria-hidden="true">{enPlan}</span>
            <span className="p3-sr">({enPlan} {enPlan === 1 ? "servicio" : "servicios"})</span>
          </Link>
        )}
        <a href={WHATSAPP_URL} className="p3-btn p3-btn-acento p3-nav-cta">Cotiza por WhatsApp</a>
        <button className="p3-burger" aria-label="Abrir menú" aria-expanded={abierto} onClick={() => setAbierto((o) => !o)}>
          <span /><span /><span />
        </button>
      </div>

      {montado && createPortal(
        <div className={`p3-movil${abierto ? " abierto" : ""}`} hidden={!abierto}>
        <button className="p3-movil-x" aria-label="Cerrar menú" onClick={() => setAbierto(false)}>✕</button>
        <nav className="p3-movil-nav" aria-label="Menú de celular">
          <span className="p3-movil-fila">
            <Link href="/servicios" className="p3-pill" onClick={cerrarTodo}>Servicios</Link>
            <button type="button" className="p3-pill p3-movil-flecha" aria-expanded={acordeon} aria-controls="p3-movil-servicios"
              aria-label="Mostrar los servicios" onClick={() => setAcordeon((a) => !a)}>
              <Flechita size={18} />
            </button>
          </span>
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
            <li><Link href={RUTA_COTIZADOR} className="p3-movil-item p3-movil-item--fuerte" onClick={cerrarTodo}>Cotiza tu bot de WhatsApp →</Link></li>
          </ul>
          {LINKS.map((l) => <a key={l.href} href={l.href} className="p3-pill" onClick={() => setAbierto(false)}>{l.label}</a>)}
          {enPlan > 0 && (
            <Link href={RUTA_PLAN} className="p3-pill p3-movil-plan" onClick={cerrarTodo}>
              Mi plan <span className="p3-plan-cuenta" aria-hidden="true">{enPlan}</span>
            </Link>
          )}
          <a href={WHATSAPP_URL} className="p3-btn p3-btn-acento" onClick={() => setAbierto(false)}>Cotiza por WhatsApp</a>
        </nav>
        </div>,
        document.body
      )}
    </header>
  );
}
