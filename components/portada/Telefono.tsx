// Teléfono WhatsApp en código (proporciones reales ~300x616). Tema oscuro.
// Cabecera con avatar, nombre y "en línea" debajo, etiqueta DEMO, burbujas con hora
// y doble check (en los mensajes salientes), archivo PDF y barra de escribir.
// Los mensajes se leen con lector de pantalla; el marco del teléfono es decorativo.
import type { MsgTelefono as Msg } from "@/lib/conversaciones";

export default function Telefono({ nombre, mensajes }: { nombre: string; mensajes: Msg[] }) {
  return (
    <div className="p3-fono" role="group" aria-label={`Conversación de ejemplo (Demo) · ${nombre}`}>
      <div className="p3-fono-isla" aria-hidden="true" />
      <div className="p3-fono-cab" aria-hidden="true">
        <span className="p3-fono-atras">‹</span>
        <span className="p3-fono-av">{nombre[0]}</span>
        <span className="p3-fono-id">
          <span className="p3-fono-nombre">{nombre}</span>
          <span className="p3-fono-estado">en línea</span>
        </span>
        <span className="p3-fono-demo">DEMO</span>
      </div>
      <div className="p3-fono-chat">
        {mensajes.map((m, i) =>
          "archivo" in m ? (
            <div key={i} className="p3-msg bot p3-msg-arch">
              <span className="p3-arch-ico" aria-hidden="true">PDF</span>
              <span className="p3-arch-txt">
                <span className="p3-arch-n">{m.archivo.nombre}</span>
                <span className="p3-arch-d">{m.archivo.detalle}</span>
              </span>
              <span className="p3-msg-hora" aria-hidden="true">{m.hora}</span>
            </div>
          ) : (
            <div key={i} className={`p3-msg ${m.de}`}>
              <span className="p3-msg-tx">{m.texto}</span>
              <span className="p3-msg-meta" aria-hidden="true">
                {m.hora}
                {m.de === "cliente" && (
                  <svg className="p3-check" viewBox="0 0 18 12" width="16" height="11"><path d="M1 6.5 4.5 10 11 2.5M7 10l6.5-7.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </span>
            </div>
          )
        )}
      </div>
      <div className="p3-fono-barra" aria-hidden="true">
        <span className="p3-fono-input">Escribe un mensaje</span>
        <span className="p3-fono-send" aria-hidden="true">➤</span>
      </div>
    </div>
  );
}
