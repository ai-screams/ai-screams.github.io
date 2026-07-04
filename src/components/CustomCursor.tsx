import { useEffect, useRef } from "react";

/** Work 행 호버 시 마우스를 따라오는 "VIEW →" 커서. (pointer: fine) + 모션 허용 시에만. */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia("(pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("cursor-active");
    let targetX = -100;
    let targetY = -100;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };
    const loop = () => {
      x += (targetX - x) * 0.4;
      y += (targetY - y) * 0.4;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const show = () => el.classList.add("on");
    const hide = () => el.classList.remove("on");

    addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    const targets = document.querySelectorAll("[data-cursor='view']");
    targets.forEach((target) => {
      target.addEventListener("mouseenter", show);
      target.addEventListener("mouseleave", hide);
    });

    return () => {
      document.body.classList.remove("cursor-active");
      removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", show);
        target.removeEventListener("mouseleave", hide);
      });
    };
  }, []);

  return (
    <div aria-hidden className="cursor-view" ref={ref}>
      VIEW →
    </div>
  );
}
