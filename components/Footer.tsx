import Link from "next/link";
import { EMAIL, INSTAGRAM_URL, TIKTOK_URL, WHATSAPP_URL, whatsappLink } from "@/lib/site";
import { SERVICIOS, SERVICIO_A_MEDIDA } from "@/lib/servicios";

// Pie de página. Se usa en todas las páginas (vía app/layout.tsx).
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/#" className="logo"><img src="/logo-noda.png" alt="Noda — IA Automation" /></a>
            <p>Automatización con inteligencia artificial para negocios que quieren crecer sin sumar más personal.</p>
          </div>
          <div className="footer-col">
            <h4>Servicios</h4>
            {SERVICIOS.map((s) => (
              <Link key={s.slug} href={`/servicios/${s.slug}`}>{s.nombre}</Link>
            ))}
            <a href={whatsappLink(SERVICIO_A_MEDIDA.mensajeWhatsApp)}>Diagnóstico gratis</a>
          </div>
          <div className="footer-col">
            <h4>Empresa</h4>
            <a href="/#por-que">Quiénes somos</a><a href="/#casos">Casos</a><a href="/#proceso">Cómo trabajamos</a>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={WHATSAPP_URL} target="_blank">WhatsApp</a>
            <a href={INSTAGRAM_URL} target="_blank">Instagram</a>
            <a href={TIKTOK_URL} target="_blank">TikTok</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Noda — Quito, Ecuador. Atendemos clientes globalmente.</span>
          <span className="footer-legal">
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/terminos">Términos</Link>
            <span className="mono">noda.lat</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
