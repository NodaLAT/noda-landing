"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// El Header y Footer "clásicos" (claros) se usan en /servicios, legales y 404.
// En la portada (/) NO se muestran: esa página trae su propio header/footer oscuros.
export default function ChromeGlobal({ slot }: { slot: "header" | "footer" }) {
  const p = usePathname();
  if (p === "/") return null;
  return slot === "header" ? <Header /> : <Footer />;
}
