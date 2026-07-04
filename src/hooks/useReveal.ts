import { type RefObject, useEffect, useRef } from "react";

/** 뷰포트 진입 시 대상에 "in" 클래스를 부여하는 스크롤 리빌 훅 (SSR-safe) */
export function useReveal<T extends HTMLElement>(options?: {
  immediate?: boolean;
}): RefObject<T | null> {
  const ref = useRef<T>(null);
  const immediate = options?.immediate ?? false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    if (immediate) {
      let raf = 0;
      void document.fonts.ready.then(() => {
        raf = requestAnimationFrame(() => el.classList.add("in"));
      });
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return ref;
}
