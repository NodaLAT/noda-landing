import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import Marco from "@/components/portada/Marco";

// Plantilla de las páginas legales (/privacidad y /terminos), en el sistema oscuro y pensada para leer:
// texto a ~68 caracteres por línea e índice con anclas armado solo a partir de los <h2> del contenido
// (los textos no se tocan: a cada <h2> se le agrega un id).
//
// Aviso de borrador: Vercel indica en VERCEL_ENV si la versión es "production" (noda.lat) o "preview".
// El aviso se muestra en todo lo que NO sea producción: vistas previas y tu computadora.
const ES_BORRADOR = process.env.VERCEL_ENV !== "production";

const textoDe = (n: ReactNode): string =>
  typeof n === "string" || typeof n === "number" ? String(n)
    : Array.isArray(n) ? n.map(textoDe).join("")
    : isValidElement<{ children?: ReactNode }>(n) ? textoDe(n.props.children) : "";

const anclaDe = (t: string) =>
  t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function PaginaLegal({ titulo, intro, actualizado, children }: {
  titulo: string;
  intro: string;
  actualizado: string;
  children: ReactNode;
}) {
  const indice: { id: string; texto: string }[] = [];
  const contenido = Children.map(children, (hijo) => {
    if (!isValidElement(hijo) || hijo.type !== "h2") return hijo;
    const texto = textoDe((hijo as ReactElement<{ children?: ReactNode }>).props.children);
    const id = anclaDe(texto);
    indice.push({ id, texto });
    return cloneElement(hijo as ReactElement<{ id?: string }>, { id });
  });

  return (
    <Marco>
      <section className="p3-pag-head">
        <div className="p3-wrap">
          {ES_BORRADOR && (
            <div className="p3-borrador" role="note">
              <span aria-hidden="true">⚠</span> Borrador pendiente de revisión legal
            </div>
          )}
          <span className="p3-eyebrow">Legal</span>
          <h1 className="p3-pag-h1">{titulo}</h1>
          <p className="p3-pag-sub">{intro}</p>
          <p className="p3-legal-fecha">Última actualización: {actualizado}</p>
        </div>
      </section>

      <section className="p3-sec p3-sec-pegada">
        <div className="p3-wrap p3-legal">
          <nav className="p3-indice" aria-label="Índice">
            <p className="p3-indice-t">Índice</p>
            <ol>
              {indice.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.texto}</a></li>)}
            </ol>
          </nav>
          <article className="p3-legal-txt">{contenido}</article>
        </div>
      </section>
    </Marco>
  );
}
