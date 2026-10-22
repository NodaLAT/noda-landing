"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Animaciones al hacer scroll (mismo código que el <script> final del index.html):
//  - .reveal        → aparece suavemente al entrar en pantalla
//  - [data-count]   → el número cuenta desde 0 (ej. 85%, 7d, +30h)
// Vive en el layout, así funciona en cualquier página que use esas clases.
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    function runCounter(el: HTMLElement) {
      const target = parseFloat(el.dataset.count!), pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
      const dur = 1300, t0 = performance.now();
      function step(t: number) {
        const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + Math.round(e * target) + suf; if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCounter(e.target as HTMLElement); cObs.unobserve(e.target); } });
    }, { threshold: .6 });
    // Con "reducir movimiento" los números se muestran directamente en su valor final.
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => cObs.observe(el));
    }

    return () => { obs.disconnect(); cObs.disconnect(); };
  }, [pathname]);

  return null;
}
