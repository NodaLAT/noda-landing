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
- [ ] **Fase 2 — Agendamiento**
- [ ] **Fase 3 — Cotizaciones**
- [ ] **Fase 4 — Interpretación con IA**
- [ ] **Fase 5 — CRM**
- [ ] **Fase 6 — Reportes**
- [ ] **Fase 7 — Webs con IA**
- [ ] **Fase 8 — Apps a medida**
- [ ] **Fase 9 — Revisión final** (build, linter, sin scroll lateral 360/1440, teclado, reduced-motion, Lighthouse móvil en Agendamiento)

## Decisiones

- **Plantilla v3 por servicio**: se activa cuando el servicio tiene `comoFunciona` en `lib/servicios.ts`. Así cada fase (2-8) migra un servicio sin romper el build de los demás.
- **Íconos**: Atención conserva sus íconos propios (se ve igual). Los otros 7 muestran el número del paso dentro del círculo y un check en "Qué incluye".
- **Demo de cabecera de los 7 servicios**: reutiliza su vista previa de `/servicios` (`Vistas.tsx`) ampliada; se anima sola al entrar en pantalla y se repite; decorativa (aria-hidden), con etiqueta "Demo".
- **Botones de cabecera**: con precio → "Ver precio" + ("Cotiza el tuyo" si tiene cotizador, si no "Ver cómo funciona"). Sin precio → "Cotiza por WhatsApp" + "Ver cómo funciona".

## Commits

(Uno por fase; solo push a sitio-v3.)
