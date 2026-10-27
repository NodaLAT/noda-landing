import Image from "next/image";
import type { CSSProperties } from "react";
import { OBJ_DIMS } from "./assets";

// Objeto 3D (WebP transparente) con next/image. Decorativo por defecto (alt="").
// `ancho` es el tamaño en pantalla; la altura se ajusta sola para conservar la forma.
export default function Obj3D({
  name,
  ancho,
  className,
  style,
  priority = false,
  alt = "",
}: {
  name: string;
  ancho: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  alt?: string;
}) {
  const d = OBJ_DIMS[name];
  if (!d) return null;
  return (
    <Image
      src={d.src}
      alt={alt}
      width={d.w}
      height={d.h}
      sizes={`${Math.round(ancho * 1.6)}px`}
      priority={priority}
      aria-hidden={alt === "" ? true : undefined}
      className={className}
      style={{ width: ancho, height: "auto", ...style }}
    />
  );
}
