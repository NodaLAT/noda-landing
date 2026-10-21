"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/site";

// Enlaces a otra página (ej. /servicios) usan <Link> para cargar al instante;
// los que van a una sección de la portada (/#casos) usan <a> normal.
function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return href.includes("#")
    ? <a href={href} onClick={onClick}>{label}</a>
    : <Link href={href} onClick={onClick}>{label}</Link>;
}

// Menú superior + menú de celular. Se usa en todas las páginas (vía app/layout.tsx).
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="nav" className={scrolled ? "scrolled" : undefined}>
        <div className="nav-inner">
          <a href="/#" className="logo"><img src="/logo-noda.webp" alt="Noda — IA Automation" width={439} height={150} /></a>
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
            <a href={WHATSAPP_URL} className="nav-cta">Hablar con Noda</a>
          </div>
          <button className="menu-toggle" id="menuToggle" aria-label="Menú" onClick={() => setMenuOpen((o) => !o)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      <div className={menuOpen ? "mobile-menu open" : "mobile-menu"} id="mobileMenu">
        {NAV_LINKS.map((l) => (
          <NavLink key={l.href} href={l.href} label={l.label} onClick={closeMenu} />
        ))}
        <a href={WHATSAPP_URL} onClick={closeMenu}>Hablar con Noda</a>
      </div>
    </>
  );
}
