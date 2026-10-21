import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Oculta el botón flotante de Next.js en modo desarrollo,
  // para que la vista local se vea igual que el sitio real.
  devIndicators: false,
  // La landing original era un único index.html: los enlaces viejos a esa dirección
  // llevan a la portada en vez de dar error 404.
  async redirects() {
    return [{ source: "/index.html", destination: "/", permanent: true }];
  },
};

export default nextConfig;
