import Link from "next/link";
import { EMAIL, INSTAGRAM_URL, INSTAGRAM_USUARIO, LINKEDIN_URL, TIKTOK_URL, WHATSAPP_NUMERO, WHATSAPP_URL } from "@/lib/site";
import { SERVICIOS } from "@/lib/servicios";

// 3.7 Pie de página oscuro (el mismo en todas las páginas, vía Marco).
// LinkedIn: mientras LINKEDIN_URL esté vacío en lib/site.ts se muestra un marcador [PENDIENTE].
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
            <a href={WHATSAPP_URL} target="_blank" rel="noopener">WhatsApp {WHATSAPP_NUMERO}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram {INSTAGRAM_USUARIO}</a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener">TikTok</a>
            {LINKEDIN_URL
              ? <a href={LINKEDIN_URL} target="_blank" rel="noopener">LinkedIn</a>
              : <span className="p3-footer-pendiente">LinkedIn [PENDIENTE: URL]</span>}
          </div>
        </div>
        <div className="p3-footer-bottom">© 2026 NODA S.A.S. · Quito, Ecuador</div>
      </div>
    </footer>
  );
}
