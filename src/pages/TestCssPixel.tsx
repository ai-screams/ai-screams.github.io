import { useEffect, useRef, useState } from "react";

const PIXEL_FONT = "'Press Start 2P', 'NeoDunggeunmo', monospace";
const BODY_FONT = "'NeoDunggeunmo', monospace";

/* ── light theme tokens ── */
const T = {
  bg: "#fafaf9",
  bgElevated: "#ffffff",
  border: "#d4d4d4",
  borderStrong: "#404040",
  shadow: "rgba(0,0,0,0.12)",
  shadowStrong: "rgba(0,0,0,0.25)",
  textMuted: "#737373",
  textPrimary: "#1c1917",
  textSecondary: "#57534e",
};

/* ── 8-bit color palette (scheme-aware) ── */
const paletteColors = [
  "var(--color-brand-300)",
  "var(--color-brand-500)",
  "var(--color-brand-700)",
  "var(--color-accent-300)",
  "var(--color-accent-500)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-error)",
];

/* ── Simple Canvas Dot Hero ── */
function DotHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<
    { baseX: number; baseY: number; color: string; x: number; y: number }[]
  >([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Draw text to extract pixels (dark text on transparent)
    const fontSize = Math.min(width / 8, 48);
    ctx.fillStyle = "#1c1917";
    ctx.font = `bold ${fontSize}px ${PIXEL_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("AI SCREAM", width / 2, height / 2);

    // Extract pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const particles: typeof particlesRef.current = [];
    const gap = 4;

    for (let y = 0; y < canvas.height; y += gap * dpr) {
      for (let x = 0; x < canvas.width; x += gap * dpr) {
        const i = (y * canvas.width + x) * 4;
        if (imageData.data[i + 3] > 128) {
          const px = x / dpr;
          const py = y / dpr;
          particles.push({
            baseX: px,
            baseY: py,
            color: `oklch(0.55 0.2 ${(px / width) * 360})`,
            x: px,
            y: py,
          });
        }
      }
    }
    particlesRef.current = particles;

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const radius = 80;

      for (const p of particlesRef.current) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const force = (radius - dist) / radius;
          p.x -= dx * force * 0.3;
          p.y -= dy * force * 0.3;
        } else {
          p.x += (p.baseX - p.x) * 0.08;
          p.y += (p.baseY - p.y) * 0.08;
        }

        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), 3, 3);
      }

      animRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handleMouseLeave() {
    mouseRef.current = { x: -9999, y: -9999 };
  }

  return (
    <canvas
      className="h-48 w-full cursor-crosshair"
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={canvasRef}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

/* ── Main Test Page ── */
export default function TestCssPixel() {
  const [hoverBtn, setHoverBtn] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [typingText, setTypingText] = useState("");
  const fullText =
    "안녕하세요! AI Scream의 픽셀 세계에 오신 것을 환영합니다. ★";

  useEffect(() => {
    if (!dialogOpen) {
      setTypingText("");
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypingText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [dialogOpen]);

  return (
    <div style={{ background: T.bg, minHeight: "100vh" }}>
      <section
        className="mx-auto max-w-5xl px-6 py-24"
        style={{ color: T.textPrimary, fontFamily: PIXEL_FONT }}
      >
        {/* ── Header ── */}
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--color-brand-600, #7c3aed)" }}
        >
          CSS Pixel Design Test
        </h1>
        <p
          className="mt-2 leading-relaxed"
          style={{
            color: T.textSecondary,
            fontFamily: BODY_FONT,
            fontSize: "16px",
          }}
        >
          전체 사이트 dot/pixel 디자인 컨셉 테스트 페이지입니다.
        </p>

        {/* ── Canvas Dot Hero ── */}
        <div className="mt-10">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--color-accent-500, #14b8a6)" }}
          >
            ▶ Canvas Dot Hero
          </h2>
          <div
            className="mt-3"
            style={{
              background: T.bgElevated,
              border: `4px solid var(--color-brand-500, #8b5cf6)`,
              boxShadow: `8px 8px 0 0 ${T.shadow}`,
            }}
          >
            <DotHero />
          </div>
          <p
            className="mt-2 text-center"
            style={{
              color: T.textMuted,
              fontFamily: BODY_FONT,
              fontSize: "14px",
            }}
          >
            마우스를 올려보세요 — 도트 파티클이 반응합니다
          </p>
        </div>

        {/* ── 8-Bit Buttons ── */}
        <div className="mt-12">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--color-accent-500, #14b8a6)" }}
          >
            ▶ 8-Bit Buttons
          </h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {[
              {
                bg: "var(--color-brand-500, #8b5cf6)",
                label: "공격",
                shadow: "#4c1d95",
              },
              {
                bg: "var(--color-accent-500, #14b8a6)",
                label: "마법",
                shadow: "#0f766e",
              },
              { bg: "#22c55e", label: "회복", shadow: "#166534" },
              { bg: "#ef4444", label: "도망", shadow: "#991b1b" },
            ].map(({ bg, label, shadow }) => (
              <button
                className="relative px-6 py-3 text-xs font-bold text-white active:translate-x-1 active:translate-y-1"
                key={label}
                onMouseEnter={() => setHoverBtn(label)}
                onMouseLeave={() => setHoverBtn(null)}
                style={{
                  background: bg,
                  boxShadow:
                    hoverBtn === label
                      ? `2px 2px 0 0 ${shadow}`
                      : `4px 4px 0 0 ${shadow}`,
                  transform:
                    hoverBtn === label
                      ? "translate(2px, 2px)"
                      : "translate(0, 0)",
                  transition: "all 0.1s steps(2)",
                }}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── RPG Dialog Box ── */}
        <div className="mt-12">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--color-accent-500, #14b8a6)" }}
          >
            ▶ RPG Dialog Box
          </h2>
          <div
            className="mt-4 p-6"
            style={{
              background: T.bgElevated,
              border: `4px solid ${T.borderStrong}`,
              boxShadow: `inset -4px -4px 0 0 ${T.shadow}, inset 4px 4px 0 0 rgba(255,255,255,0.6), 6px 6px 0 0 ${T.shadow}`,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-8 w-8 text-center text-lg leading-8"
                style={{
                  background: "var(--color-brand-500, #8b5cf6)",
                  color: "white",
                }}
              >
                ♦
              </span>
              <span
                className="text-xs font-bold"
                style={{ color: "var(--color-brand-600, #7c3aed)" }}
              >
                AI Scream
              </span>
            </div>
            <div
              className="mt-3 min-h-[60px]"
              style={{
                color: T.textPrimary,
                fontFamily: BODY_FONT,
                fontSize: "16px",
                lineHeight: "1.8",
              }}
            >
              {dialogOpen ? (
                <>
                  {typingText}
                  <span className="animate-pulse">▌</span>
                </>
              ) : (
                <span style={{ color: T.textMuted }}>
                  대화를 시작하려면 아래 버튼을 누르세요...
                </span>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 text-xs font-bold text-white"
                onClick={() => setDialogOpen(!dialogOpen)}
                style={{
                  background: dialogOpen
                    ? "#ef4444"
                    : "var(--color-brand-500, #8b5cf6)",
                  boxShadow: `3px 3px 0 0 ${T.shadowStrong}`,
                  transition: "all 0.1s steps(2)",
                }}
                type="button"
              >
                {dialogOpen ? "닫기 ✕" : "대화 시작 ▶"}
              </button>
            </div>
          </div>
        </div>

        {/* ── Pixel Color Palette ── */}
        <div className="mt-12">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--color-accent-500, #14b8a6)" }}
          >
            ▶ Pixel Palette (Scheme-Aware)
          </h2>
          <div className="mt-4 flex gap-1">
            {paletteColors.map((color, i) => (
              <div
                className="aspect-square flex-1"
                key={i}
                style={{
                  background: color,
                  boxShadow: `inset -2px -2px 0 0 ${T.shadow}`,
                }}
              />
            ))}
          </div>
          <p
            className="mt-2 text-center"
            style={{
              color: T.textMuted,
              fontFamily: BODY_FONT,
              fontSize: "14px",
            }}
          >
            Navbar 도트로 스킴을 전환하면 팔레트가 바뀝니다
          </p>
        </div>

        {/* ── Pixel Cards ── */}
        <div className="mt-12">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--color-accent-500, #14b8a6)" }}
          >
            ▶ 8-Bit Cards
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[
              {
                desc: "포트폴리오와 프로젝트를 소개합니다",
                emoji: "⚔️",
                title: "프로젝트",
              },
              {
                desc: "전 세계 여행 기록을 픽셀 지도로",
                emoji: "🗺️",
                title: "여행 지도",
              },
              { desc: "개발자 소개와 기술 스택", emoji: "🧙", title: "소개" },
            ].map(({ desc, emoji, title }) => (
              <div
                className="group cursor-pointer p-5"
                key={title}
                style={{
                  background: T.bgElevated,
                  border: `3px solid ${T.border}`,
                  boxShadow: `4px 4px 0 0 ${T.shadow}`,
                  transition: "all 0.15s steps(3)",
                }}
              >
                <div className="text-3xl">{emoji}</div>
                <h3
                  className="mt-3 text-xs font-bold"
                  style={{ color: "var(--color-brand-600, #7c3aed)" }}
                >
                  {title}
                </h3>
                <p
                  className="mt-2"
                  style={{
                    color: T.textSecondary,
                    fontFamily: BODY_FONT,
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pixel Progress / Stats ── */}
        <div className="mt-12">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--color-accent-500, #14b8a6)" }}
          >
            ▶ Pixel Stats Bar
          </h2>
          <div
            className="mt-4 space-y-4 p-5"
            style={{
              background: T.bgElevated,
              border: `3px solid ${T.border}`,
            }}
          >
            {[
              {
                color: "var(--color-brand-500, #8b5cf6)",
                label: "HP",
                value: 85,
              },
              {
                color: "var(--color-accent-500, #14b8a6)",
                label: "MP",
                value: 60,
              },
              { color: "#22c55e", label: "EXP", value: 42 },
            ].map(({ color, label, value }) => (
              <div className="flex items-center gap-3" key={label}>
                <span
                  className="w-10 text-right text-xs font-bold"
                  style={{ color }}
                >
                  {label}
                </span>
                <div
                  className="h-4 flex-1"
                  style={{
                    background: "#f5f5f4",
                    border: `2px solid ${T.border}`,
                  }}
                >
                  <div
                    className="h-full"
                    style={{
                      background: color,
                      boxShadow: `inset 0 -2px 0 0 ${T.shadow}`,
                      transition: "width 0.5s steps(10)",
                      width: `${value}%`,
                    }}
                  />
                </div>
                <span
                  className="w-12 text-right text-xs"
                  style={{ color: T.textSecondary }}
                >
                  {value}/100
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Typography Scale ── */}
        <div className="mt-12">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--color-accent-500, #14b8a6)" }}
          >
            ▶ Pixel Typography
          </h2>
          <div
            className="mt-4 space-y-3 p-5"
            style={{
              background: T.bgElevated,
              border: `3px solid ${T.border}`,
            }}
          >
            <p style={{ color: T.textPrimary, fontSize: "32px" }}>
              32px — Title
            </p>
            <p style={{ color: T.textPrimary, fontSize: "24px" }}>
              24px — Heading
            </p>
            <p style={{ color: T.textPrimary, fontSize: "16px" }}>
              16px — Body Text
            </p>
            <p style={{ color: T.textSecondary, fontSize: "8px" }}>
              8px — Caption
            </p>
            <div
              className="mt-4 pt-3"
              style={{ borderTop: `2px solid ${T.border}` }}
            >
              <p
                style={{
                  color: T.textPrimary,
                  fontFamily: BODY_FONT,
                  fontSize: "16px",
                  lineHeight: "1.8",
                }}
              >
                둥근모꼴 본문 테스트: 한글 픽셀 폰트의 가독성을 확인합니다.
                가나다라마바사아자차카타파하. ABCDEFG 0123456789
              </p>
            </div>
          </div>
        </div>

        {/* ── Dot Grid Background Demo ── */}
        <div className="mt-12">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--color-accent-500, #14b8a6)" }}
          >
            ▶ Dot Grid Background
          </h2>
          <div
            className="mt-4 flex h-40 items-center justify-center"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-brand-400, #a78bfa) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
              border: `3px solid ${T.border}`,
            }}
          >
            <span
              className="text-sm"
              style={{
                background: T.bgElevated,
                border: `2px solid ${T.border}`,
                boxShadow: `4px 4px 0 0 ${T.shadow}`,
                color: T.textPrimary,
                padding: "12px 24px",
              }}
            >
              도트 격자 배경 위의 텍스트
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
