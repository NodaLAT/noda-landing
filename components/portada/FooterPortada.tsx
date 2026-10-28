import Link from "next/link";
import { EMAIL, INSTAGRAM_URL, TIKTOK_URL, WHATSAPP_URL } from "@/lib/site";
import { SERVICIOS } from "@/lib/servicios";

// 3.7 Pie de página de la portada oscura.
// Nota: lib/site.ts no tiene URL de LinkedIn, así que no se incluye (ver resumen).
export default function FooterPortada() {
  return (
    <footer className="p3-footer">
      <div className="p3-wrap">
        <div className="p3-footer-top">
          <div className="p3-footer-marca">
            <a href="/#" className="p3-logo" aria-label="Noda — inicio">
              <img src="/logo-noda.webp" alt="Noda" width={439} height={150} />
            </a>
            <p>Automatizamos tu negocio para que vendas más.</p>
          </div>
          <div className="p3-footer-col">
            <h3>Servicios</h3>
            {SERVICIOS.map((s) => (
              <Link key={s.slug} href={`/servicios/${s.slug}`}>{s.nombre}</Link>
            ))}
          </div>
          <div className="p3-footer-col">
            <h3>Noda</h3>
            <a href="/#casos">Casos</a>
            <a href="/#proceso">Cómo trabajamos</a>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/terminos">Términos</Link>
          </div>
          <div className="p3-footer-col">
            <h3>Contacto</h3>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener">WhatsApp</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram</a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener">TikTok</a>
          </div>
        </div>
        <div className="p3-footer-bottom">© 2026 NODA S.A.S. · Quito, Ecuador</div>
      </div>
    </footer>
  );
}
