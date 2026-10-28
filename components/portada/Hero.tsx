import { WHATSAPP_URL } from "@/lib/site";
import IsotipoCanvas from "./IsotipoCanvas";

const ico = {
  rayo: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  reloj: <g><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
  check: <g><path d="M20 6 9 17l-5-5" /></g>,
};

export default function Hero() {
  return (
    <section className="p3-hero">
      <IsotipoCanvas />
      <div className="p3-hero-content">
        <span className="p3-hero-eyebrow p3-anim" style={{ "--d": ".25s" } as React.CSSProperties}>
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" className="p3-eb-star">{ico.rayo}</svg>
          Automatización con IA · Quito, Ecuador
        </span>
        <h1 className="p3-hero-h1">
          <span className="p3-mask"><span className="p3-mask-in p3-anim" style={{ "--d": ".35s" } as React.CSSProperties}>Automatizamos tu negocio</span></span>
          <span className="p3-mask"><span className="p3-mask-in p3-anim" style={{ "--d": ".5s" } as React.CSSProperties}>para que <em className="p3-acento">vendas más.</em></span></span>
        </h1>
        <div className="p3-hero-pie">
          <p className="p3-hero-sub p3-anim" style={{ "--d": ".65s" } as React.CSSProperties}>
            Respondemos, agendamos y cotizamos por ti en WhatsApp, las 24 horas, con IA.
          </p>
          <div className="p3-hero-acc p3-anim" style={{ "--d": ".8s" } as React.CSSProperties}>
            <a href={WHATSAPP_URL} className="p3-btn p3-btn-acento p3-shine">Cotiza por WhatsApp</a>
            <a href="#nodos" className="p3-btn p3-btn-outline">Ver cómo funciona</a>
          </div>
        </div>
      </div>
      <ul className="p3-hero-datos p3-anim" style={{ "--d": ".95s" } as React.CSSProperties}>
        {[
          { k: "rayo", c: "24/7", r: "atención por WhatsApp" },
          { k: "reloj", c: "<3 s", r: "de respuesta" },
          { k: "check", c: "7 días", r: "de implementación" },
        ].map((d) => (
          <li key={d.c}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className="p3-dato-ico">{ico[d.k as keyof typeof ico]}</svg>
            <span><strong>{d.c}</strong> {d.r}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
