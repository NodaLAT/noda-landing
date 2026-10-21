// Plantilla de las páginas legales (/privacidad y /terminos).
//
// Aviso de borrador: Vercel indica en VERCEL_ENV si la versión es "production"
// (noda.lat) o "preview" (vista previa). El aviso se muestra en todo lo que NO
// sea producción: vistas previas y tu computadora.
const ES_BORRADOR = process.env.VERCEL_ENV !== "production";

export default function PaginaLegal({ titulo, intro, actualizado, children }: {
  titulo: string;
  intro: string;
  actualizado: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="page-head legal-head">
        <div className="container">
          {ES_BORRADOR && (
            <div className="draft-banner" role="note">
              <span aria-hidden="true">⚠</span> Borrador pendiente de revisión legal
            </div>
          )}
          <span className="section-eyebrow">Legal</span>
          <h1>{titulo}</h1>
          <p className="hero-sub">{intro}</p>
          <p className="legal-date">Última actualización: {actualizado}</p>
        </div>
      </section>
      <section className="legal-section">
        <div className="container">
          <article className="legal">{children}</article>
        </div>
      </section>
    </>
  );
}

// Datos que faltan completar: se ven resaltados para no olvidarlos.
export const Pendiente = ({ children }: { children: React.ReactNode }) => (
  <span className="legal-pending">{children}</span>
);
