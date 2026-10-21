"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const dot = (i: number) => ({ "--i": i }) as CSSProperties;

// Teléfono animado del hero: 3 escenas de chat de WhatsApp que se repiten.
// La lógica es la del <script> original del index.html, con los mismos tiempos.
export default function HeroPhoneDemo() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const scenes = Array.from(root.querySelectorAll<HTMLElement>(".noda-hero-scene"));
    const statusText = root.querySelector(".noda-hero-status-text");
    const SCENE_MS = 5000, CYCLE = SCENE_MS * scenes.length;

    function show(n: HTMLElement | null) { if (!n) return; n.classList.remove("noda-hero-hidden"); void n.offsetWidth; n.classList.add("is-in"); }
    function setStatus(t: string) { if (statusText) statusText.textContent = t; }
    function resetScene(s: HTMLElement) {
      s.querySelectorAll(".noda-hero-anim").forEach((n) => { n.classList.remove("is-in"); n.classList.add("noda-hero-hidden"); });
    }
    function q(s: HTMLElement, sel: string) { return s.querySelector<HTMLElement>(sel); }

    function buildSteps() {
      const steps: [number, () => void][] = [];
      scenes.forEach((s, i) => {
        const B = i * SCENE_MS;
        steps.push([B + 0,    () => { resetScene(s); s.classList.add("is-active"); }]);
        steps.push([B + 160,  () => { show(q(s, ".noda-hero-chip")); }]);
        steps.push([B + 460,  () => { show(q(s, ".noda-hero-b-user")); }]);
        steps.push([B + 1080, () => { show(q(s, ".noda-hero-typing")); setStatus("escribiendo…"); }]);
        steps.push([B + 2150, () => { const t = q(s, ".noda-hero-typing"); if (t) { t.classList.remove("is-in"); t.classList.add("noda-hero-hidden"); } setStatus("en línea"); show(q(s, ".noda-hero-b-bot")); }]);
        steps.push([B + 2880, () => { show(q(s, ".noda-hero-extra")); }]);
        steps.push([B + 4560, () => { s.classList.remove("is-active"); }]);
      });
      return steps.sort((a, b) => a[0] - b[0]);
    }

    const steps = buildSteps();
    let start = 0, idx = 0, rafId = 0, running = false;

    function frame(now: number) {
      if (!start) start = now;
      let el = now - start;
      if (el >= CYCLE) { start += CYCLE; el -= CYCLE; idx = 0; }
      while (idx < steps.length && el >= steps[idx][0]) { steps[idx][1](); idx++; }
      rafId = requestAnimationFrame(frame);
    }
    function play() { if (running) return; running = true; start = 0; idx = 0; rafId = requestAnimationFrame(frame); }
    function pause() { running = false; if (rafId) cancelAnimationFrame(rafId); }

    // Estado inicial visible: el teléfono nunca se ve en blanco antes de que arranque el loop.
    const s0 = scenes[0]; s0.classList.add("is-active");
    [".noda-hero-chip", ".noda-hero-b-user", ".noda-hero-b-bot", ".noda-hero-extra"].forEach((sel) => { show(q(s0, sel)); });
    setStatus("en línea");

    // Solo anima cuando el teléfono está en pantalla.
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) play(); else pause(); });
      }, { threshold: .2 });
      io.observe(root);
    } else { play(); }

    return () => { pause(); io?.disconnect(); };
  }, []);

  return (
    <div ref={rootRef} className="noda-hero" role="img" aria-label="Demostración del asistente de WhatsApp de NODA: responde 24/7, agenda citas y cotiza al instante.">

      {/* Texto real para lectores de pantalla (la simulación visual va aria-hidden) */}
      <ul className="noda-hero-sr">
        <li>Atención automática 24/7 por WhatsApp.</li>
        <li>Agenda y confirma citas, con recordatorios.</li>
        <li>Cotizaciones al instante.</li>
      </ul>

      <div className="noda-hero-brand" aria-hidden="true">
        <img className="noda-hero-logo" alt="" src="/noda-hero-logo.webp" />
        <span className="noda-hero-tag">Asistente de WhatsApp con IA</span>
      </div>

      <div className="noda-hero-phone" aria-hidden="true">
        {/* Barra superior */}
        <div className="noda-hero-topbar">
          <span className="noda-hero-avatar"><img alt="" src="/isotipo-noda.png" /></span>
          <span className="noda-hero-id">
            <span className="noda-hero-name">NODA</span>
            <span className="noda-hero-status"><i className="noda-hero-dot"></i><span className="noda-hero-status-text">en línea</span></span>
          </span>
        </div>

        {/* Pantalla con las 3 escenas apiladas */}
        <div className="noda-hero-screen">

          {/* ESCENA 1 · Atención 24/7 */}
          <div className="noda-hero-scene" data-scene="0">
            <span className="noda-hero-chip noda-hero-anim noda-hero-hidden">Responde solo · 24/7</span>
            <div className="noda-hero-chat">
              <div className="noda-hero-row noda-hero-row-user noda-hero-b-user noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-bubble noda-hero-bubble-user">¿Tienen turno para hoy?</span>
              </div>
              <div className="noda-hero-row noda-hero-row-bot noda-hero-typing noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-bubble noda-hero-bubble-bot noda-hero-dots">
                  <i style={dot(0)}></i><i style={dot(1)}></i><i style={dot(2)}></i>
                </span>
              </div>
              <div className="noda-hero-row noda-hero-row-bot noda-hero-b-bot noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-bubble noda-hero-bubble-bot">¡Hola! 👋 Sí, tengo un espacio hoy a las 3:00 pm.</span>
              </div>
              <div className="noda-hero-row noda-hero-row-bot noda-hero-extra noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-bubble noda-hero-bubble-bot">¿Te lo reservo?</span>
              </div>
            </div>
          </div>

          {/* ESCENA 2 · Agenda y confirma */}
          <div className="noda-hero-scene" data-scene="1">
            <span className="noda-hero-chip noda-hero-anim noda-hero-hidden">Agenda y confirma citas</span>
            <div className="noda-hero-chat">
              <div className="noda-hero-row noda-hero-row-user noda-hero-b-user noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-bubble noda-hero-bubble-user">Quiero agendar para mañana 10am</span>
              </div>
              <div className="noda-hero-row noda-hero-row-bot noda-hero-typing noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-bubble noda-hero-bubble-bot noda-hero-dots">
                  <i style={dot(0)}></i><i style={dot(1)}></i><i style={dot(2)}></i>
                </span>
              </div>
              <div className="noda-hero-row noda-hero-row-bot noda-hero-b-bot noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-bubble noda-hero-bubble-bot">¡Listo! Tu cita quedó agendada ✅</span>
              </div>
              <div className="noda-hero-row noda-hero-row-bot noda-hero-extra noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-card">
                  <span className="noda-hero-card-ico">✓</span>
                  <span className="noda-hero-card-body">
                    <span className="noda-hero-card-title">Cita confirmada</span>
                    <span className="noda-hero-card-sub">Mañana · 10:00 am</span>
                    <span className="noda-hero-badge">Recordatorio enviado</span>
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* ESCENA 3 · Cotiza al instante */}
          <div className="noda-hero-scene" data-scene="2">
            <span className="noda-hero-chip noda-hero-anim noda-hero-hidden">Cotiza en segundos</span>
            <div className="noda-hero-chat">
              <div className="noda-hero-row noda-hero-row-user noda-hero-b-user noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-bubble noda-hero-bubble-user">¿Cuánto cuesta una limpieza dental?</span>
              </div>
              <div className="noda-hero-row noda-hero-row-bot noda-hero-typing noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-bubble noda-hero-bubble-bot noda-hero-dots">
                  <i style={dot(0)}></i><i style={dot(1)}></i><i style={dot(2)}></i>
                </span>
              </div>
              <div className="noda-hero-row noda-hero-row-bot noda-hero-b-bot noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-bubble noda-hero-bubble-bot">Te paso la cotización 👇</span>
              </div>
              <div className="noda-hero-row noda-hero-row-bot noda-hero-extra noda-hero-anim noda-hero-hidden">
                <span className="noda-hero-card noda-hero-quote">
                  <span className="noda-hero-quote-head">Cotización</span>
                  <span className="noda-hero-quote-row"><span>Limpieza dental</span><b>$35</b></span>
                  <span className="noda-hero-quote-row"><span>Evaluación</span><b>Incluida</b></span>
                  <span className="noda-hero-quote-total"><span>Total</span><b>$35</b></span>
                  <span className="noda-hero-quote-foot">Válido por 7 días</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Barra de entrada (decorativa) */}
        <div className="noda-hero-inputbar">
          <span className="noda-hero-input">Escribe un mensaje</span>
          <span className="noda-hero-send" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="#fff" d="M3 11l16-7-7 16-2.5-6.5z" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}
