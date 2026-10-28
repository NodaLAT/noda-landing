import type { Metadata } from "next";
import Link from "next/link";
import { Flecha } from "@/components/portada/Iconos";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o cambió de dirección.",
  robots: { index: false },
};

// Página 404: se muestra cuando alguien entra a una dirección que no existe.
export default function NoEncontrada() {
  return (
    <section className="page-head not-found">
      <div className="container">
        <span className="section-eyebrow hero-anim hero-d1">Error 404</span>
        <h1 className="hero-anim hero-d2">Esta página <em>no existe</em>.</h1>
        <p className="hero-sub hero-anim hero-d3">
          Puede que el enlace esté mal escrito o que la página haya cambiado de dirección.
          Te ayudamos a volver al camino.
        </p>
        <div className="hero-actions hero-anim hero-d4">
          <Link href="/" className="btn btn-primary">Ir al inicio <Flecha /></Link>
          <Link href="/servicios" className="btn btn-ghost">Ver servicios</Link>
        </div>
      </div>
    </section>
  );
}
