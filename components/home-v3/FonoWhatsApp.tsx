// Teléfono de WhatsApp hecho en HTML/CSS (nunca una imagen). Reutilizable en el
// hero y en el caso real. Muestra cabecera, burbujas cliente/bot, etiqueta "Demo"
// y, opcionalmente, un archivo adjunto y una nota debajo.
export type MsgFono =
  | { de: "cliente" | "bot"; texto: string }
  | { de: "bot"; archivo: { nombre: string; detalle: string } };

function inicial(nombre: string) {
  const palabras = nombre.replace(/·.*/, "").trim().split(/\s+/);
  return (palabras[0]?.[0] ?? "N").toUpperCase();
}

export default function FonoWhatsApp({
  nombre,
  estado = "en línea",
  mensajes,
  nota,
}: {
  nombre: string;
  estado?: string;
  mensajes: MsgFono[];
  nota?: string;
}) {
  return (
    <>
    <div className="v3-fono">
      <div className="v3-fono-pantalla">
        <div className="v3-fono-cab">
          <span className="v3-fono-flecha" aria-hidden="true">‹</span>
          <span className="v3-fono-av" aria-hidden="true">{inicial(nombre)}</span>
          <span className="v3-fono-id">
            <span className="v3-fono-nombre">{nombre}</span>
            <span className="v3-fono-estado">{estado}</span>
          </span>
          <span className="v3-fono-demo">Demo</span>
        </div>
        <div className="v3-fono-chat">
          {mensajes.map((m, i) =>
            "archivo" in m ? (
              <div key={i} className="v3-msg bot v3-msg-archivo">
                <span className="ico" aria-hidden="true">PDF</span>
                <span>
                  <span className="arch-n">{m.archivo.nombre}</span>
                  <br />
                  <span className="arch-s">{m.archivo.detalle}</span>
                </span>
              </div>
            ) : (
              <div key={i} className={`v3-msg ${m.de}`}>
                {m.texto}
              </div>
            )
          )}
        </div>
      </div>
    </div>
    {nota && <p className="v3-fono-nota">{nota}</p>}
    </>
  );
}
