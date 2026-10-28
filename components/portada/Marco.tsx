import HeaderPortada from "./HeaderPortada";
import FooterPortada from "./FooterPortada";

// Marco común de todas las páginas: cabecera y pie oscuros alrededor del contenido.
// La clase .p3 activa el sistema visual de la portada (y el fondo de luz del tema mixto).
export default function Marco({ children }: { children: React.ReactNode }) {
  return (
    <div className="p3">
      <HeaderPortada />
      {children}
      <FooterPortada />
    </div>
  );
}
