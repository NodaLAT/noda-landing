import Link from "next/link";
import {
  NOTA_PAGO_UNICO, NOTA_REFERENCIAL, RUTA_COTIZADOR, TEXTO_MESES, VIGENCIA, dolares, ofertaVigente, precioDe,
  type Monto, type PrecioServicio,
} from "@/lib/precios";
import { SERVICIOS } from "@/lib/servicios";

// Cómo se muestran los precios (lib/precios.ts).
// Con oferta vigente se dibujan DOS versiones: la de lanzamiento (.p3-con-oferta) y la normal
// (.p3-sin-oferta, oculta). Si la fecha de fin pasa sin volver a publicar el sitio, el script de
// app/layout.tsx marca <html data-oferta="fin"> y el CSS cambia de versión solo.

// Monto: con oferta, el normal tachado (gris) y el de oferta (crema); sin oferta, solo el normal.
// "meses": es una mensualidad y la oferta dura solo los primeros meses ("~~$89~~ $70/mes los primeros 3 meses").
export function Par({ m, conOferta, sufijo = "", meses = false }: { m: Monto; conOferta: boolean; sufijo?: string; meses?: boolean }) {
  if (!conOferta || m.oferta === undefined) return <span className="p3-monto">{dolares(m.normal)}{sufijo}</span>;
  return (
    <>
      <s className="p3-tachado"><span className="p3-sr">Antes </span>{dolares(m.normal)}</s>{" "}
      <span className="p3-monto"><span className="p3-sr">ahora </span>{dolares(m.oferta)}{sufijo}</span>
      {meses && <>{" "}<span className="p3-meses">{TEXTO_MESES}</span></>}
    </>
  );
}

function Linea({ p, conOferta }: { p: PrecioServicio; conOferta: boolean }) {
  return (
    <span className="p3-precio-linea">
      Desde <Par m={p.implementacion} conOferta={conOferta} />
      {p.mensual && <> + <Par m={p.mensual} conOferta={conOferta} sufijo="/mes" meses /></>}
      {p.extra && <> + {p.extra}</>}
      <span className="p3-iva"> + IVA</span>
    </span>
  );
}

// Dos versiones (oferta / normal) que el CSS alterna según la fecha.
function Versiones({ conOferta, children }: { conOferta: boolean; children: (o: boolean) => React.ReactNode }) {
  if (!conOferta) return <>{children(false)}</>;
  return (
    <>
      <span className="p3-con-oferta">{children(true)}</span>
      <span className="p3-sin-oferta">{children(false)}</span>
    </>
  );
}

// Una línea de precio (tarjetas de /servicios, panel de la portada, encabezado del servicio).
// "vigente" lo decide el servidor; los componentes de cliente lo reciben como prop para no desincronizarse.
export function LineaPrecio({ slug, etiqueta = true, vigente = ofertaVigente() }: { slug: string; etiqueta?: boolean; vigente?: boolean }) {
  const p = precioDe(slug);
  if (!p) return <span className="p3-precio-medida">Cotiza a medida</span>;
  const conOferta = vigente && p.implementacion.oferta !== undefined;
  return (
    <span className="p3-precio">
      {etiqueta && conOferta && <span className="p3-precio-etq p3-con-oferta">Precio de lanzamiento</span>}
      <Versiones conOferta={conOferta}>{(o) => <Linea p={p} conOferta={o} />}</Versiones>
    </span>
  );
}

// Bloque de precio de la página de servicio, junto al CTA.
export function BloquePrecio({ slug, whatsapp }: { slug: string; whatsapp: string }) {
  const p = precioDe(slug)!;
  const conOferta = ofertaVigente() && p.implementacion.oferta !== undefined;
  const corto = (s: string) => SERVICIOS.find((x) => x.slug === s)?.corto ?? s;
  return (
    <section className="p3-sec p3-sec-c" id="precio">
      <div className="p3-wrap">
        <div className="p3-precio-bloque">
          <div className="p3-precio-principal">
            <h2 className="p3-eyebrow">Precio</h2>
            {conOferta && <span className="p3-precio-etq p3-con-oferta">Precio de lanzamiento</span>}
            <p className="p3-precio-grande">
              <Versiones conOferta={conOferta}>{(o) => <Linea p={p} conOferta={o} />}</Versiones>
            </p>
            {p.incluye && <p className="p3-precio-incluye">{p.incluye}</p>}
            <ul className="p3-precio-notas">
              <li>{NOTA_REFERENCIAL}</li>
              <li>{NOTA_PAGO_UNICO}</li>
              {conOferta && <li className="p3-con-oferta">{VIGENCIA}</li>}
            </ul>
            <div className="p3-pag-acc">
              <a href={whatsapp} className="p3-btn p3-btn-acento p3-shine">Cotiza por WhatsApp</a>
              {p.modulos && <Link href={RUTA_COTIZADOR} className="p3-btn p3-btn-outline">Cotiza el tuyo</Link>}
            </div>
          </div>

          {(p.modulos || p.tramos || p.combo) && (
            <div className="p3-precio-detalle">
              {p.modulos && (
                <>
                  <h3 className="p3-caja-t">Módulos opcionales</h3>
                  <ul className="p3-precio-tabla">
                    {p.modulos.map((m) => (
                      <li key={m.id}><span>{m.nombre}</span><b>{m.precio === null ? "Se cotiza aparte" : `+${dolares(m.precio)}`}</b></li>
                    ))}
                  </ul>
                </>
              )}
              {p.tramos && (
                <>
                  <h3 className="p3-caja-t">Mensualidad</h3>
                  <ul className="p3-precio-tabla">
                    {p.tramos.map((t) => (
                      <li key={t.id}>
                        <span>{t.nombre}</span>
                        <b>{t.mensual
                          ? <Versiones conOferta={conOferta}>{(o) => <Par m={t.mensual!} conOferta={o} sufijo="/mes" meses />}</Versiones>
                          : "A cotizar"}</b>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {p.combo && (
                <>
                  <h3 className="p3-caja-t">Si la combinas</h3>
                  <p className="p3-precio-incluye">
                    <Versiones conOferta={conOferta}>
                      {(o) => <>{p.combo!.porcentaje} % menos ({dolares((o ? p.implementacion.oferta! : p.implementacion.normal) * (1 - p.combo!.porcentaje / 100))}) si se contrata con {p.combo!.con.map(corto).join(", ").replace(/, ([^,]*)$/, " o $1")}.</>}
                    </Versiones>
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
