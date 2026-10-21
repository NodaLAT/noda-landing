import { EMAIL, WHATSAPP_DEMO_URL, WHATSAPP_DIAGNOSTICO_URL } from "@/lib/site";

const Arrow = () => (
  <svg className="arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
);

export default function Contacto() {
  return (
    <section id="contacto" className="band-dark">
      <div className="container reveal">
        <div className="close-head">
          <span className="section-eyebrow">Hablemos</span>
          <h2>Hablemos de tu negocio.</h2>
          <p className="section-sub">
            Te mostramos un sistema funcional en vivo y conversamos qué procesos de tu negocio
            podemos automatizar primero. Sin compromiso, sin venta agresiva.
          </p>
          <p className="price-note">
            El precio depende de qué automatizas. Agenda un diagnóstico gratis y en 48h te damos una propuesta a medida.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg></div>
            <h3>Escríbenos por WhatsApp</h3>
            <p>La forma más rápida. Te respondemos el mismo día.</p>
            <a className="contact-link" href={WHATSAPP_DEMO_URL}>Abrir WhatsApp <Arrow /></a>
          </div>
          <div className="contact-card">
            <div className="contact-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg></div>
            <h3>Agenda tu diagnóstico</h3>
            <p>30 minutos, gratis y sin compromiso, para ver tu caso.</p>
            <a className="contact-link" href={WHATSAPP_DIAGNOSTICO_URL}>Reservar 30 min <Arrow /></a>
          </div>
          <div className="contact-card">
            <div className="contact-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg></div>
            <h3>Por correo</h3>
            <p>Cuéntanos tu idea con calma y te respondemos.</p>
            <a className="contact-link" href={`mailto:${EMAIL}?subject=Quiero%20una%20demo`}>{EMAIL} <Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
