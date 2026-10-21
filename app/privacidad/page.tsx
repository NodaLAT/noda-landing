import type { Metadata } from "next";
import { metadataPagina } from "@/lib/seo";
import Link from "next/link";
import PaginaLegal from "@/components/legal/PaginaLegal";
import { EMAIL } from "@/lib/site";

const descripcion = "Cómo trata Noda los datos personales que recibe por WhatsApp, correo y formularios, y cómo puedes ejercer tus derechos.";

export const metadata: Metadata = metadataPagina({ titulo: "Política de privacidad", descripcion, ruta: "/privacidad" });

// BORRADOR pendiente de revisión legal. Basado en la Ley Orgánica de
// Protección de Datos Personales del Ecuador (LOPDP).
export default function PrivacidadPage() {
  return (
    <PaginaLegal
      titulo="Política de privacidad"
      intro="Qué datos recibimos, para qué los usamos, con quién los compartimos y cómo puedes ejercer tus derechos."
      actualizado="21 de octubre de 2026"
    >
      <h2>1. Quiénes somos</h2>
      <p>
        Noda es una agencia de automatización con inteligencia artificial con sede en Quito, Ecuador. El responsable
        del tratamiento de tus datos es NODA S.A.S., con RUC 1793237077001.
        Puedes escribirnos a <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
      <p>
        Esta política sigue la Ley Orgánica de Protección de Datos Personales del Ecuador y te explica, en lenguaje
        claro, cómo cuidamos la información que nos compartes.
      </p>

      <h2>2. Qué datos recibimos</h2>
      <ul>
        <li><strong>Si nos escribes por WhatsApp:</strong> tu número de teléfono, tu nombre de perfil y el contenido de los mensajes que nos envías.</li>
        <li><strong>Si nos escribes por correo:</strong> tu dirección de correo, tu nombre y lo que nos cuentes en el mensaje.</li>
        <li><strong>Si completas un formulario:</strong> los datos que tú mismo escribes, como nombre, teléfono, correo, empresa y lo que necesitas.</li>
        <li><strong>Mientras navegas por el sitio:</strong> datos técnicos básicos, como el tipo de navegador o las páginas visitadas, que nuestro proveedor de alojamiento usa para que el sitio funcione y sea seguro.</li>
      </ul>
      <p>
        Este sitio no usa cookies de publicidad ni de seguimiento. Para saber cuántas personas nos visitan usamos una
        herramienta de medición que no usa cookies ni guarda datos que te identifiquen: solo cuenta las visitas de forma
        agregada (páginas vistas, país, tipo de dispositivo y de dónde llegaste al sitio).
      </p>
      <p>
        No te pedimos datos sensibles, como información de salud, a través de este sitio; si nos los compartes por tu
        cuenta, los usaremos solo para atender tu consulta.
      </p>

      <h2>3. Para qué usamos tus datos</h2>
      <ul>
        <li>Responder tus consultas y darte la información que nos pides.</li>
        <li>Preparar diagnósticos, propuestas y cotizaciones.</li>
        <li>Prestar los servicios que contrates y darte soporte.</li>
        <li>Cumplir nuestras obligaciones legales, contables y tributarias.</li>
      </ul>
      <p>
        Usamos tus datos porque nos los entregas para que te respondamos o te enviemos una propuesta, para cumplir un
        contrato contigo, para cumplir la ley o, cuando corresponde, porque nos diste tu consentimiento. No vendemos tus
        datos. Si alguna vez queremos enviarte novedades o promociones, te pediremos permiso antes y podrás darte de
        baja cuando quieras.
      </p>

      <h2>4. Con quién los compartimos</h2>
      <p>Para funcionar, trabajamos con proveedores que procesan datos por encargo nuestro:</p>
      <ul>
        <li><strong>Servicios de mensajería,</strong> como WhatsApp, para recibir y responder tus mensajes.</li>
        <li><strong>Servicios de inteligencia artificial,</strong> que nos ayudan a leer, ordenar y responder la información.</li>
        <li><strong>Servicios de correo, alojamiento web, almacenamiento en la nube y medición de visitas sin cookies.</strong></li>
      </ul>
      <p>
        Solo les compartimos lo necesario para cada tarea y les exigimos que protejan tus datos. Algunos de estos
        proveedores pueden procesar información fuera de Ecuador; en esos casos buscamos que ofrezcan un nivel de
        protección adecuado, como exige la ley. No compartimos tus datos con otras empresas para fines publicitarios, y
        solo los entregaríamos a una autoridad si la ley nos obliga.
      </p>

      <h2>5. Cuando trabajamos para otros negocios</h2>
      <p>
        Si eres cliente de un negocio que usa nuestras soluciones (por ejemplo, el asistente de WhatsApp de un
        laboratorio), ese negocio es el responsable de tus datos y nosotros los tratamos solo siguiendo sus
        instrucciones. Para ejercer tus derechos en ese caso, escríbele directamente a ese negocio; nosotros le
        ayudaremos a atender tu solicitud. Cuando se trata de datos sensibles, como resultados de salud, los usamos
        únicamente para el fin que ese negocio definió.
      </p>

      <h2>6. Cuánto tiempo guardamos tus datos</h2>
      <ul>
        <li><strong>Consultas que no se convierten en un servicio:</strong> hasta 2 años desde el último contacto.</li>
        <li><strong>Datos de clientes:</strong> mientras dure la relación y, después, durante el tiempo que exijan las obligaciones legales, contables y tributarias.</li>
      </ul>
      <p>Cuando ya no los necesitamos, los eliminamos o los anonimizamos.</p>

      <h2>7. Cómo los protegemos</h2>
      <p>
        Usamos medidas técnicas y organizativas razonables, como accesos restringidos y proveedores con estándares de
        seguridad reconocidos. Si ocurriera un incidente que afecte tus datos, te avisaremos y lo notificaremos a la
        autoridad, como indica la ley.
      </p>

      <h2>8. Tus derechos</h2>
      <p>Como titular de tus datos, puedes pedirnos en cualquier momento:</p>
      <ul>
        <li><strong>Acceso:</strong> saber qué datos tuyos tenemos y cómo los usamos.</li>
        <li><strong>Rectificación:</strong> corregir o actualizar datos incorrectos o incompletos.</li>
        <li><strong>Eliminación:</strong> que borremos tus datos cuando ya no sean necesarios o no exista razón legal para conservarlos.</li>
        <li><strong>Oposición:</strong> que dejemos de usar tus datos para un fin determinado.</li>
        <li><strong>Otros derechos de la ley:</strong> pedir la portabilidad de tus datos, la suspensión de su tratamiento y no ser objeto de decisiones tomadas solo por sistemas automatizados.</li>
      </ul>
      <p>
        Para ejercerlos, escríbenos a <a href={`mailto:${EMAIL}`}>{EMAIL}</a> contándonos qué derecho quieres ejercer.
        Es gratis. Podremos pedirte que confirmes tu identidad y te responderemos dentro del plazo que establece la ley.
        Si no estás conforme con nuestra respuesta, puedes presentar un reclamo ante la Superintendencia de Protección
        de Datos Personales.
      </p>

      <h2>9. Menores de edad</h2>
      <p>Nuestros servicios están dirigidos a negocios. No recopilamos a propósito datos de menores de edad.</p>

      <h2>10. Cambios a esta política</h2>
      <p>
        Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha de actualización.
        Consulta también nuestros <Link href="/terminos">Términos y condiciones</Link>.
      </p>

      <h2>11. Contacto</h2>
      <p>
        NODA S.A.S. · RUC 1793237077001 · Quito, Ecuador ·{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </PaginaLegal>
  );
}
