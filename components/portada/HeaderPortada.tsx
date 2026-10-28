"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";

// Cabecera de la portada oscura: logo blanco, menú central de 4 pastillas, botón WhatsApp.
// En celular: hamburguesa -> menú a pantalla completa con fondo desenfocado.
const LINKS = [
  { label: "Servicios", href: "/servicios" },
  { label: "Cómo funciona", href: "/#nodos" },
  { label: "Casos", href: "/#casos" },
  { label: "Preguntas", href: "/#preguntas" },
];

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return href.includes("#")
    ? <a href={href} className="p3-pill" onClick={onClick}>{label}</a>
    : <Link href={href} className="p3-pill" onClick={onClick}>{label}</Link>;
}

export default function HeaderPortada() {
  const [scrolled, setScrolled] = useState(false);
  const [abierto, setAbierto] = useState(false);

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

  return (
    <header className={`p3-nav${scrolled ? " scrolled" : ""}`}>
      <div className="p3-nav-in">
        <a href="/#" className="p3-logo" aria-label="Noda — inicio">
          <img src="/logo-noda.webp" alt="Noda" width={439} height={150} />
        </a>
        <nav className="p3-pills" aria-label="Principal">
          {LINKS.map((l) => <NavLink key={l.href} {...l} />)}
        </nav>
        <a href={WHATSAPP_URL} className="p3-btn p3-btn-acento p3-nav-cta">Cotiza por WhatsApp</a>
        <button className="p3-burger" aria-label="Abrir menú" aria-expanded={abierto} onClick={() => setAbierto((o) => !o)}>
          <span /><span /><span />
        </button>
      </div>

      <div className={`p3-movil${abierto ? " abierto" : ""}`} hidden={!abierto}>
        <button className="p3-movil-x" aria-label="Cerrar menú" onClick={() => setAbierto(false)}>✕</button>
        <nav className="p3-movil-nav" aria-label="Menú de celular">
          {LINKS.map((l) => <NavLink key={l.href} {...l} onClick={() => setAbierto(false)} />)}
          <a href={WHATSAPP_URL} className="p3-btn p3-btn-acento" onClick={() => setAbierto(false)}>Cotiza por WhatsApp</a>
        </nav>
      </div>
    </header>
  );
}
