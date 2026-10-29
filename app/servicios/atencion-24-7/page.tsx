import { permanentRedirect } from "next/navigation";

// /servicios/atencion-24-7 no tiene página propia: lleva a la del servicio.
export default function AtencionCorto() {
  permanentRedirect("/servicios/atencion-y-ventas-whatsapp");
}
