import type { Metadata } from "next";
import Link from "next/link";
import Marco from "@/components/portada/Marco";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o cambió de dirección.",
  robots: { index: false },
};

// Página 404: se muestra cuando alguien entra a una dirección que no existe.
export default function NoEncontrada() {
  return (
    <Marco>
      <section className="p3-404">
        <div className="p3-wrap">
          <img src="/isotipo-noda.png" alt="" width={160} height={160} className="p3-404-iso" />
          <span className="p3-eyebrow">Error 404</span>
          <h1 className="p3-pag-h1">Esta página no existe.</h1>
          <p className="p3-pag-sub">
            Puede que el enlace esté mal escrito o que la página haya cambiado de dirección.
            Te ayudamos a volver al camino.
          </p>
          <div className="p3-pag-acc">
            <Link href="/" className="p3-btn p3-btn-acento">Volver al inicio</Link>
            <a href={WHATSAPP_URL} className="p3-btn p3-btn-outline">Escríbenos por WhatsApp</a>
          </div>
        </div>
      </section>
    </Marco>
  );
}
