# Textos nuevos del piloto — "Atención y ventas 24/7 por WhatsApp"

Estos textos **no estaban** en `docs/contenido-web-v3.md`. Los escribí para el piloto y
necesito tu aprobación. Todos usan español neutro con tuteo, negocio ficticio
(Ferretería El Tornillo) y la etiqueta "Demo". Si cambias alguno, dime y lo ajusto.

> Nota: los montos y el nombre del producto ($89,90, "Taladro inalámbrico 20V") ya existían
> en la tarjeta de /servicios; aquí se reutilizan, no son inventados nuevos.

---

## 1. Etiquetas de sección nuevas
- **"Pruébalo tú mismo"** (título corto de la demo interactiva).
- **"Antes y con Noda"** (título corto de la sección de comparación).

## 2. Demo interactiva (teléfono WhatsApp)
**Texto de introducción (bajo el título):**
> Toca una pregunta, como lo haría un cliente, y mira cómo responde el asistente de una ferretería de ejemplo.

**Saludo del asistente:**
> ¡Hola! 👋 Soy el asistente de Ferretería El Tornillo. Pregúntame lo que necesites.

**Preguntas sugeridas y respuestas simuladas:**

| Pregunta (toca el cliente) | Respuesta del asistente |
|---|---|
| ¿Cuánto cuesta el taladro inalámbrico? | *(tarjeta de producto)* Taladro inalámbrico 20V · $89,90 — "Incluye cargador y 2 baterías" · botón **Separar**. Luego: "¿Te lo separo para que lo retires hoy?" |
| ¿Qué horario tienen? | Atendemos de lunes a sábado de 8:00 a 19:00, y los domingos de 9:00 a 13:00. |
| ¿Dónde están ubicados? | Estamos en Av. de los Constructores 123, a una cuadra del parque. Te comparto la ubicación 📍 |
| ¿Tienen cemento en stock? | Sí, tenemos cemento de 50 kg disponible. ¿Cuántos sacos necesitas? |

**Nota fija bajo la demo:**
> Es una simulación: las respuestas son de ejemplo y no se envía ningún mensaje real.

*(El botón "Separar" es solo visual, no realiza ninguna acción.)*

## 3. Sección "Antes y con Noda"
Pares de frases del día a día, sin cifras inventadas.

| Antes | Con Noda |
|---|---|
| Un cliente escribe a las 11 de la noche y no hay nadie para responder. | Recibe una respuesta al instante, de día, de noche o en feriado. |
| Tu equipo frena lo que está haciendo para contestar lo mismo de siempre. | La IA responde las preguntas repetidas y tu equipo se enfoca en vender. |
| El mensaje del sábado se contesta el lunes… si alguien se acuerda. | Los fines de semana también quedan atendidos y nada se pierde. |
| La misma duda de precio, horario y stock, una y otra vez. | Precios, horarios y disponibilidad respondidos al toque, con tu información. |

---

**Dónde viven estos textos en el código:**
- Demo interactiva: `components/servicios/Atencion.tsx` (constantes `SALUDO` y `PREGUNTAS_WA`).
- Intro y etiquetas de sección: `app/servicios/[slug]/page.tsx` (rama del piloto).
- "Antes y con Noda": `app/servicios/[slug]/page.tsx` (constante `ANTES_CON_NODA`).
