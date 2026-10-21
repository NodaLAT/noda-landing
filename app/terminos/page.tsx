import type { Metadata } from "next";
import { metadataPagina } from "@/lib/seo";
import Link from "next/link";
import PaginaLegal from "@/components/legal/PaginaLegal";
import { EMAIL } from "@/lib/site";

const descripcion = "Condiciones de uso del sitio web de Noda: información de servicios, ejemplos, explicaciones generadas con IA y responsabilidad.";

export const metadata: Metadata = metadataPagina({ titulo: "Términos y condiciones", descripcion, ruta: "/terminos" });

// BORRADOR pendiente de revisión legal. Leyes de la República del Ecuador.
export default function TerminosPage() {
  return (
    <PaginaLegal
      titulo="Términos y condiciones"
      intro="Las reglas para usar este sitio web, explicadas de forma simple."
      actualizado="21 de octubre de 2026"
    >
      <h2>1. Quiénes somos</h2>
      <p>
        Este sitio pertenece a NODA S.A.S., con RUC 1793237077001 y domicilio
        en Quito, Ecuador (en adelante, &quot;Noda&quot;). Al usar noda.lat aceptas estos términos. Si no estás de
        acuerdo con ellos, te pedimos no usar el sitio.
      </p>

      <h2>2. Para qué sirve este sitio</h2>
      <p>
        noda.lat es un sitio informativo: te contamos qué servicios ofrecemos y cómo contactarnos. Usarlo es gratis y
        no te obliga a contratar nada.
      </p>

      <h2>3. Servicios, plazos y precios</h2>
      <p>
        La información de los servicios es referencial. Cada servicio se diseña según tu negocio, así que el alcance,
        los plazos y el precio se definen en una propuesta por escrito. Esa propuesta, una vez aceptada, es la que rige
        la relación entre tú y Noda. Los plazos que mencionamos en el sitio son estimados y pueden variar según cada
        proyecto.
      </p>

      <h2>4. Ejemplos y demostraciones</h2>
      <p>
        Los ejemplos marcados como &quot;Demo&quot; son simulaciones: muestran cómo podría funcionar un servicio, pero
        no usan inteligencia artificial real ni datos reales, y sus cifras son solo ilustrativas.
      </p>

      <h2>5. Explicaciones generadas con IA</h2>
      <p>
        Cuando nuestras soluciones explican documentos o resultados con inteligencia artificial, esa explicación es
        orientativa. En particular, la explicación de resultados de salud no reemplaza la consulta con un médico ni
        con otro profesional. Las decisiones importantes deben tomarse con la revisión de una persona calificada.
      </p>

      <h2>6. Uso adecuado del sitio</h2>
      <p>
        Te comprometes a usar el sitio de forma lícita: no intentar dañarlo, no acceder sin permiso a sus sistemas y no
        usar sus contenidos para engañar a otras personas.
      </p>

      <h2>7. Propiedad intelectual</h2>
      <p>
        Los textos, diseños, logotipos y demás contenidos del sitio son de Noda o se usan con autorización. No puedes
        copiarlos ni usarlos con fines comerciales sin nuestro permiso por escrito.
      </p>

      <h2>8. Enlaces a otros servicios</h2>
      <p>
        El sitio tiene enlaces a servicios de terceros, como WhatsApp, Instagram o TikTok. Esos servicios tienen sus
        propias condiciones y políticas de privacidad, y no somos responsables de ellos.
      </p>

      <h2>9. Responsabilidad</h2>
      <p>
        Hacemos lo posible para que la información del sitio sea correcta y esté disponible, pero puede tener errores o
        interrupciones. En la medida en que la ley lo permite, Noda no responde por daños derivados del uso del sitio
        o de decisiones tomadas solo con base en su contenido.
      </p>

      <h2>10. Datos personales</h2>
      <p>
        Cómo tratamos tus datos se explica en nuestra <Link href="/privacidad">Política de privacidad</Link>.
      </p>

      <h2>11. Cambios a estos términos</h2>
      <p>Podemos actualizar estos términos. La versión vigente es siempre la publicada en esta página.</p>

      <h2>12. Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la República del Ecuador. Cualquier controversia se resolverá ante los
        jueces competentes de la ciudad de Quito.
      </p>

      <h2>13. Contacto</h2>
      <p>
        Si tienes preguntas sobre estos términos, escríbenos a <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </PaginaLegal>
  );
}
