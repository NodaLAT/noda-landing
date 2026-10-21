import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Oculta el botón flotante de Next.js en modo desarrollo,
  // para que la vista local se vea igual que el sitio real.
  devIndicators: false,
};

export default nextConfig;
