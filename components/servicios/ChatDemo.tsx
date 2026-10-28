"use client";

import { useEffect, useRef, useState } from "react";
import type { DemoChat, Mensaje } from "@/lib/servicios";

type Item = { id: number; de: "cliente" | "bot"; mensaje: Mensaje };

// Chat simulado en el teléfono oscuro de la portada (.p3-fono). Las respuestas están escritas
// en lib/servicios.ts: no hay IA real ni llamadas a ningún servicio externo.
export default function ChatDemo({ demo }: { demo: DemoChat }) {
  const inicial: Item[] = [{ id: 0, de: "bot", mensaje: { tipo: "texto", texto: demo.saludo } }];
  const [items, setItems] = useState<Item[]>(inicial);
  const [escribiendo, setEscribiendo] = useState(false);   // hay una respuesta en curso (botones bloqueados)
  const [botEscribe, setBotEscribe] = useState(false);     // el próximo mensaje es del bot: se ven los puntitos
  const siguienteId = useRef(1);
  const timers = useRef<number[]>([]);
  const cajaRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Baja el chat (solo dentro del teléfono, sin mover la página) cuando llega un mensaje.
  useEffect(() => {
    const caja = cajaRef.current;
    if (caja) caja.scrollTo({ top: caja.scrollHeight, behavior: "smooth" });
  }, [items, botEscribe]);

  function agregar(de: Item["de"], mensaje: Mensaje) {
    setItems((prev) => [...prev, { id: siguienteId.current++, de, mensaje }]);
  }

  function preguntar(indice: number) {
    if (escribiendo) return;
    const { pregunta, respuesta } = demo.preguntas[indice];
    agregar("cliente", { tipo: "texto", texto: pregunta });
    setEscribiendo(true);
    const esCliente = (m: Mensaje) => m.tipo === "texto" && m.de === "cliente";
    setBotEscribe(!esCliente(respuesta[0]));
    let espera = esCliente(respuesta[0]) ? 1400 : 900;
    respuesta.forEach((mensaje, i) => {
      const siguiente = respuesta[i + 1];
      timers.current.push(window.setTimeout(() => {
        agregar(esCliente(mensaje) ? "cliente" : "bot", mensaje);
        setBotEscribe(!!siguiente && !esCliente(siguiente));
        if (!siguiente) setEscribiendo(false);
      }, espera));
      // Pausa antes del próximo mensaje: más larga si el "cliente" está eligiendo una opción.
      espera += siguiente && esCliente(siguiente) ? 1600
        : mensaje.tipo === "texto" ? 650 + Math.min(mensaje.texto.length * 12, 700) : 1100;
    });
  }

  function reiniciar() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setEscribiendo(false);
    setBotEscribe(false);
    setItems(inicial);
  }

  return (
    <div className="p3-demo-fono">
      <div className="p3-fono p3-fono--demo">
        <div className="p3-fono-isla" aria-hidden="true" />
        <div className="p3-fono-cab">
          <span className="p3-fono-atras" aria-hidden="true">‹</span>
          <span className="p3-fono-av" aria-hidden="true">{demo.negocio.charAt(0)}</span>
          <span className="p3-fono-id">
            <span className="p3-fono-nombre">{demo.negocio}</span>
            <span className="p3-fono-estado">{botEscribe ? "escribiendo…" : "en línea"}</span>
          </span>
          <span className="p3-fono-demo">DEMO</span>
        </div>
        <div className="p3-fono-chat" ref={cajaRef} aria-live="polite">
          {items.map((it) => <Burbuja key={it.id} item={it} />)}
          {botEscribe && <div className="p3-escribe p3-msg-in" aria-label="El asistente está escribiendo"><i /><i /><i /></div>}
        </div>
        <div className="p3-fono-barra" aria-hidden="true">
          <span className="p3-fono-input">Escribe un mensaje</span>
          <span className="p3-fono-send">➤</span>
        </div>
      </div>

      <div className="p3-opciones">
        <div className="p3-opciones-cab">
          <span>Toca una pregunta</span>
          {items.length > 1 && <button type="button" className="p3-opciones-reset" onClick={reiniciar}>Reiniciar</button>}
        </div>
        {demo.preguntas.map((p, i) => (
          <button key={p.pregunta} type="button" className="p3-opcion" disabled={escribiendo} onClick={() => preguntar(i)}>
            {p.pregunta}
          </button>
        ))}
      </div>
    </div>
  );
}

function Burbuja({ item }: { item: Item }) {
  const m = item.mensaje;
  const lado = item.de === "cliente" ? "cliente" : "bot";
  if (m.tipo === "texto") {
    return <div className={`p3-msg ${lado} p3-msg-in`}><span className="p3-msg-tx">{m.texto}</span></div>;
  }
  if (m.tipo === "confirmacion") {
    return (
      <div className="p3-msg bot p3-msg-ficha p3-msg-in">
        <span className="p3-ficha-ok">
          <span className="p3-ficha-ok-ico" aria-hidden="true">✓</span>
          <span><strong>{m.titulo}</strong><br />{m.detalle}<br /><span className="p3-ficha-chip">{m.etiqueta}</span></span>
        </span>
      </div>
    );
  }
  if (m.tipo === "indicadores") {
    const max = Math.max(...m.barras);
    return (
      <div className="p3-msg bot p3-msg-ficha p3-msg-in">
        <span className="p3-ficha-t">{m.titulo}</span>
        <div className="p3-kpis">
          {m.items.map(([valor, etiqueta]) => <div className="p3-kpi" key={etiqueta}><b>{valor}</b><span>{etiqueta}</span></div>)}
        </div>
        <div className="p3-barras" aria-hidden="true">
          {m.barras.map((b, i) => <i key={i} className={b === max ? "pk" : undefined} style={{ height: `${b}%` }} />)}
        </div>
      </div>
    );
  }
  // "ficha" y "cotizacion": filas con valor a la derecha
  return (
    <div className="p3-msg bot p3-msg-ficha p3-msg-in">
      <span className="p3-ficha-t">{m.titulo}</span>
      {m.filas.map(([a, b]) => <div className="p3-ficha-fila" key={a}><span>{a}</span><b>{b}</b></div>)}
      {m.tipo === "cotizacion" && <div className="p3-ficha-total"><span>Total</span><b>{m.total}</b></div>}
      {m.tipo === "cotizacion" && m.nota && <span className="p3-ficha-nota">{m.nota}</span>}
    </div>
  );
}
