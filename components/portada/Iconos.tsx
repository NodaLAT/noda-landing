import type { Icono } from "@/lib/servicios";

// Íconos de línea de los 8 servicios (24×24, trazo). Los usan la red de la portada,
// /servicios y cada página de servicio, para que el mismo servicio tenga siempre el mismo ícono.
export const ICONOS: Record<Icono, React.ReactNode> = {
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />,
  calendario: <g><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></g>,
  calculadora: <g><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 14.5h.01M12 14.5h.01M16 14.5h.01M8 18h.01M12 18h.01M16 18h.01" /></g>,
  documento: <g><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></g>,
  personas: <g><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" /></g>,
  barras: <path d="M4 20h16M7 16v-5M12 16V6M17 16V9" />,
  navegador: <g><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M6.5 6.5h.01M9 6.5h.01" /></g>,
  bloques: <g><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></g>,
};

export function IconoServicio({ icono, size = 26 }: { icono: Icono; size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">{ICONOS[icono]}</svg>;
}

// Flecha diagonal de los botones (la misma del cierre de la portada).
export function Flecha({ size = 18 }: { size?: number }) {
  return (
    <svg className="p3-arr" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
