"use client";

import Link from "next/link";
import { BARRA_OFERTA, CLAVE_BARRA } from "@/lib/precios";

// Barra delgada sobre el menú con los precios de lanzamiento. Se oculta:
//  - al cerrarla (se recuerda en localStorage; el script de app/layout.tsx la oculta antes de pintar), o
//  - cuando pasa la fecha de fin de la oferta (<html data-oferta="fin">).
export default function BarraOferta() {
  const cerrar = () => {
    try { localStorage.setItem(CLAVE_BARRA, "cerrada"); } catch { /* sin almacenamiento: se cierra solo por ahora */ }
    document.documentElement.setAttribute("data-barra", "cerrada");
  };
  return (
    <div className="p3-barra" role="region" aria-label="Precios de lanzamiento">
      <div className="p3-barra-in">
        <Link href="/servicios" className="p3-barra-txt">{BARRA_OFERTA}</Link>
        <button type="button" className="p3-barra-x" aria-label="Cerrar el aviso de precios de lanzamiento" onClick={cerrar}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      </div>
    </div>
  );
}
