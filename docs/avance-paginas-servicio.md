# Avance — Páginas de servicio v3 (rama sitio-v3)

Plantilla reutilizable del piloto "Atención 24/7" aplicada a los 8 servicios.
Si la sesión se corta, retomar desde la primera fase sin marcar.

## Fases

- [x] **Fase 0 — Ajustes del piloto (Atención 24/7)**
  - [x] Chat de la cabecera: teléfono más bajo (460px) y chat alineado arriba (`pa-fono--cab`).
  - [x] Demo "Pruébalo tú mismo": flex centrado, gap 41px, título visible.
  - [x] "Con Noda": último punto → "…respondidos al instante, con tu información."
  - [x] "Cómo funciona": texto de pasos a 16.5px y color `--texto` (blanco).
- [x] **Fase 1 — Plantilla reutilizable** (componentes compartidos + datos en lib/servicios.ts)
  - Plantilla v3 (cabecera con demo al lado) activa si el servicio define `comoFunciona`; si no, cae a la plantilla antigua.
  - `ComoFunciona` acepta 3-4 pasos con `{titulo, detalle?}`; `QueIncluye` acepta íconos opcionales.
  - `DemoCabecera`: Atención usa el chat; los demás, su vista previa (Vistas.tsx) ampliada, animada al entrar y en bucle.
- [x] **Fase 2 — Agendamiento** (demo: calendario + cita + recordatorio WhatsApp)
- [x] **Fase 3 — Cotizaciones** (demo: proforma Taller AutoPro, botón Aprobar → Aprobada · PDF)
- [x] **Fase 4 — Interpretación con IA** (demo: escaneo + explicación + aviso médico; aviso visible accesible)
- [x] **Fase 5 — CRM** (demo: tablero Interesado → Cotizó → Cliente, tarjeta que avanza)
- [x] **Fase 6 — Reportes** (demo: indicadores + gráfico; SIN resumen por WhatsApp)
- [x] **Fase 7 — Webs con IA** (demo: Café La Ronda + resultado en buscador genérico)
- [x] **Fase 8 — Apps a medida** (demo: pedido Recibido → En preparación → Listo + aviso al cliente)
- [x] **Fase 9 — Revisión final**
  - Build y `tsc --noEmit` sin errores (no hay linter configurado en el repo).
  - Sin scroll lateral en 360 px (las 8 páginas) ni en 1440 px.
  - Demos: la interactiva (Atención) funciona con teclado; las de cabecera son decorativas (aria-hidden) y respetan prefers-reduced-motion (verificado con Playwright: estados finales quietos, sin solapes).
  - Lighthouse móvil en Agendamiento (build de producción): Rendimiento 98 · Accesibilidad 100 · Buenas prácticas 96 · SEO 69. El SEO baja solo por el "no indexar" de la vista previa (robots disallow fuera de producción); en noda.lat la página es indexable y ese audit pasa.
  - Se quitó la plantilla antigua (quedó muerta: los 8 servicios usan la v3) y los imports sin uso.

## Decisiones

- **Plantilla v3 por servicio**: se activa cuando el servicio tiene `comoFunciona` en `lib/servicios.ts`. Así cada fase (2-8) migra un servicio sin romper el build de los demás.
- **Íconos**: Atención conserva sus íconos propios (se ve igual). Los otros 7 muestran el número del paso dentro del círculo y un check en "Qué incluye".
- **Demo de cabecera de los 7 servicios**: reutiliza su vista previa de `/servicios` (`Vistas.tsx`) ampliada; se anima sola al entrar en pantalla y se repite; decorativa (aria-hidden), con etiqueta "Demo".
- **Botones de cabecera**: con precio → "Ver precio" + ("Cotiza el tuyo" si tiene cotizador, si no "Ver cómo funciona"). Sin precio → "Cotiza por WhatsApp" + "Ver cómo funciona".
- **Reutilización de demos**: las demos de cabecera de los 7 servicios son sus vistas previas de `/servicios` (`Vistas.tsx`) ampliadas, con los negocios ficticios que ya existían (Ferretería El Tornillo, Taller AutoPro, Laboratorio Demo, Clínica dental, Café La Ronda, Inmobiliaria, Restaurante, y contactos de ejemplo Lucía/Luis/Ana/Jorge). **No se inventaron nombres ficticios nuevos.**
- **Cambios de requisito en las demos compartidas** (afectan también la tarjeta de `/servicios`): Reportes ya no muestra el aviso "Resumen por WhatsApp"; CRM renombra columnas a Interesado/Cotizó/Cliente; Cotizaciones cambia "Enviada por WhatsApp" por botón "Aprobar" → "Aprobada · PDF con tu marca"; Apps añade el pedido que avanza de estado y el aviso al cliente.
- **Alcance de las demos**: son decorativas y en bucle (requisito: "se anima sola al entrar y se repite"). No se añadió interactividad por toque en Agendamiento, ni "abrir historial" en CRM, ni conteo dígito a dígito en Reportes; se priorizó fidelidad visual + autoplay, según el prompt de ahorro de tokens.

## Commits (rama sitio-v3)

- Fase 0 — `323544f` Ajustes del piloto Atención 24/7
- Fase 1 — `26db854` Plantilla v3 reutilizable (cabecera con demo al lado)
- Fase 2 — Agendamiento con plantilla v3
- Fase 3 — Cotizaciones con plantilla v3
- Fase 4 — Interpretación con IA con plantilla v3
- Fase 5 — CRM con plantilla v3
- Fase 6 — Reportes con plantilla v3
- Fase 7 — Webs con IA con plantilla v3
- Fase 8 — Apps a medida con plantilla v3
- Fase 9 — Revisión final y limpieza
