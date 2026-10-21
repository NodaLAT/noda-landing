"use client";

import { useEffect, useRef, useState } from "react";
import type { DemoChat, Mensaje } from "@/lib/servicios";

type Item = { id: number; de: "cliente" | "bot"; mensaje: Mensaje };

// Chat simulado tipo WhatsApp. Las respuestas están escritas en lib/servicios.ts:
// no hay IA real ni llamadas a ningún servicio externo.
export default function ChatDemo({ demo }: { demo: DemoChat }) {
  const inicial: Item[] = [{ id: 0, de: "bot", mensaje: { tipo: "texto", texto: demo.saludo } }];
  const [items, setItems] = useState<Item[]>(inicial);
  const [escribiendo, setEscribiendo] = useState(false);
  const siguienteId = useRef(1);
  const timers = useRef<number[]>([]);
  const cajaRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Baja el chat (solo dentro de la caja, sin mover la página) cuando llega un mensaje.
  useEffect(() => {
    const caja = cajaRef.current;
    if (caja) caja.scrollTo({ top: caja.scrollHeight, behavior: "smooth" });
  }, [items, escribiendo]);

  function agregar(de: Item["de"], mensaje: Mensaje) {
    setItems((prev) => [...prev, { id: siguienteId.current++, de, mensaje }]);
  }

  function preguntar(indice: number) {
    if (escribiendo) return;
    const { pregunta, respuesta } = demo.preguntas[indice];
    agregar("cliente", { tipo: "texto", texto: pregunta });
    setEscribiendo(true);
    let espera = 900;
    respuesta.forEach((mensaje, i) => {
      timers.current.push(window.setTimeout(() => {
        agregar("bot", mensaje);
        if (i === respuesta.length - 1) setEscribiendo(false);
      }, espera));
      espera += mensaje.tipo === "texto" ? 650 + Math.min(mensaje.texto.length * 12, 700) : 1100;
    });
  }

  function reiniciar() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setEscribiendo(false);
    setItems(inicial);
  }

  return (
    <div className="chat-mockup chat-demo">
      <div className="chat-header">
        <div className="chat-avatar" aria-hidden="true">{demo.negocio.charAt(0)}</div>
        <div>
          <div className="chat-name">{demo.negocio}</div>
          <div className="chat-status">{escribiendo ? "escribiendo…" : "en línea"}</div>
        </div>
        <span className="demo-tag">Demo</span>
      </div>

      <div className="messages" ref={cajaRef} aria-live="polite">
        {items.map((it) => <Burbuja key={it.id} item={it} />)}
        {escribiendo && (
          <div className="typing msg-in" aria-label="El asistente está escribiendo"><i /><i /><i /></div>
        )}
      </div>

      <div className="chat-replies">
        <div className="chat-replies-head">
          <span className="chat-replies-label">Toca una pregunta</span>
          {items.length > 1 && <button type="button" className="chat-reset" onClick={reiniciar}>Reiniciar</button>}
        </div>
        {demo.preguntas.map((p, i) => (
          <button key={p.pregunta} type="button" className="chat-reply" disabled={escribiendo} onClick={() => preguntar(i)}>
            {p.pregunta}
          </button>
        ))}
      </div>
    </div>
  );
}

function Burbuja({ item }: { item: Item }) {
  const m = item.mensaje;
  if (m.tipo === "texto") {
    return <div className={`msg ${item.de === "cliente" ? "msg-user" : "msg-bot"} msg-in`}>{m.texto}</div>;
  }
  if (m.tipo === "confirmacion") {
    return (
      <div className="msg-card confirm msg-in">
        <span className="confirm-ico">✓</span>
        <span>
          <span className="confirm-t">{m.titulo}</span><br />
          <span className="confirm-s">{m.detalle}</span><br />
          <span className="confirm-badge">{m.etiqueta}</span>
        </span>
      </div>
    );
  }
  if (m.tipo === "indicadores") {
    const max = Math.max(...m.barras);
    return (
      <div className="msg-card msg-in">
        <div className="pf-head">{m.titulo}</div>
        <div className="dk-row">
          {m.items.map(([valor, etiqueta]) => (
            <div className="dk-kpi" key={etiqueta}><div className="dk-num">{valor}</div><div className="dk-label">{etiqueta}</div></div>
          ))}
        </div>
        <div className="dk-bars">
          {m.barras.map((b, i) => (
            <div key={i} className={b === max ? "dk-bar pk" : "dk-bar"} style={{ height: `${b}%` }} />
          ))}
        </div>
      </div>
    );
  }
  // "ficha" y "cotizacion" usan el mismo formato de proforma de la portada (.pf)
  return (
    <div className="msg-card msg-in">
      <div className="pf">
        <div className="pf-head">{m.titulo}</div>
        {m.filas.map(([a, b]) => (
          <div className="pf-row" key={a}><span>{a}</span><b>{b}</b></div>
        ))}
        {m.tipo === "cotizacion" && <div className="pf-total"><span>Total</span><b>{m.total}</b></div>}
        {m.tipo === "cotizacion" && m.nota && <div className="pf-note">{m.nota}</div>}
      </div>
    </div>
  );
}
