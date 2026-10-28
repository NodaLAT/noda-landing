import { WHATSAPP_URL } from "@/lib/site";

// 3.6 Cierre — bloque con el color "cierre" (crema en neutro, teal en teal).
export default function Cierre() {
  return (
    <section className="p3-cierre" id="contacto">
      <div className="p3-wrap">
        <h2 className="p3-cierre-t">¿Tu proceso no está aquí? Lo diseñamos contigo.</h2>
        <p className="p3-cierre-s">Diagnóstico de 30 minutos, gratis y sin compromiso.</p>
        <p className="p3-cierre-p">En 48 horas te damos una propuesta a medida.</p>
        <a href={WHATSAPP_URL} className="p3-btn p3-btn-cierre">
          Escríbenos por WhatsApp
          <svg className="p3-arr" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </section>
  );
}
