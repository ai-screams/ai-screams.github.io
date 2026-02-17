const brandSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const accentSteps = [300, 400, 500];
const semanticColors = [
  { color: "var(--color-success)", label: "success" },
  { color: "var(--color-warning)", label: "warning" },
  { color: "var(--color-error)", label: "error" },
  { color: "var(--color-info)", label: "info" },
] as const;

export default function Colors() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Color Scheme Test
      </h1>
      <p className="mt-2 text-lg text-[var(--text-secondary)]">
        Navbar 오른쪽 도트를 클릭하여 스킴을 전환해보세요.
      </p>

      {/* Brand Colors */}
      <div className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Brand Scale</h2>
        <div className="mt-4 flex gap-2">
          {brandSteps.map((step) => (
            <div className="flex-1" key={step}>
              <div
                className="aspect-square rounded-lg"
                style={{ backgroundColor: `var(--color-brand-${step})` }}
              />
              <p className="mt-1 text-center text-xs text-[var(--text-tertiary)]">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Accent Colors */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Accent Scale</h2>
        <div className="mt-4 flex gap-2">
          {accentSteps.map((step) => (
            <div className="w-20" key={step}>
              <div
                className="aspect-square rounded-lg"
                style={{ backgroundColor: `var(--color-accent-${step})` }}
              />
              <p className="mt-1 text-center text-xs text-[var(--text-tertiary)]">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic Colors (scheme-independent) */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Semantic Status</h2>
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">
          스킴과 무관하게 고정된 상태 색상입니다.
        </p>
        <div className="mt-4 flex gap-3">
          {semanticColors.map(({ color, label }) => (
            <div className="flex-1" key={label}>
              <div
                className="aspect-[3/1] rounded-lg"
                style={{ backgroundColor: color }}
              />
              <p
                className="mt-2 text-center text-sm font-medium"
                style={{ color }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Text Styles */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Text Styles</h2>
        <div className="mt-4 space-y-2">
          <p className="text-[var(--text-primary)]">
            text-primary — 기본 텍스트
          </p>
          <p className="text-[var(--text-secondary)]">
            text-secondary — 보조 텍스트
          </p>
          <p className="text-[var(--text-tertiary)]">
            text-tertiary — 힌트 텍스트
          </p>
          <p className="text-[var(--text-brand)]">
            text-brand — 브랜드 강조 텍스트
          </p>
          <p className="text-[var(--text-accent)]">
            text-accent — 액센트 강조 텍스트
          </p>
        </div>
      </div>

      {/* Buttons & Interactive */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-semibold">
          Interactive Elements
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="rounded-full px-6 py-2.5 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: "var(--color-brand-500)" }}
            type="button"
          >
            Brand Button
          </button>
          <button
            className="rounded-full px-6 py-2.5 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: "var(--color-accent-500)" }}
            type="button"
          >
            Accent Button
          </button>
          <button
            className="rounded-full border px-6 py-2.5 text-sm font-medium transition-colors"
            style={{
              borderColor: "var(--color-brand-500)",
              color: "var(--color-brand-400)",
            }}
            type="button"
          >
            Outline Button
          </button>
          <button
            className="rounded-full bg-[var(--interactive-hover)] px-6 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--interactive-active)]"
            type="button"
          >
            Ghost Button
          </button>
        </div>
      </div>

      {/* Cards with Glass & Glow */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Cards & Effects</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {/* Glass Card */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-display text-lg font-semibold text-[var(--text-brand)]">
              Glass Card
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Glassmorphism 효과가 적용된 카드입니다.
            </p>
          </div>

          {/* Glow Card */}
          <div
            className="rounded-xl border border-[var(--border-brand)] bg-[var(--surface-elevated)] p-6"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <h3 className="font-display text-lg font-semibold text-[var(--text-brand)]">
              Glow Card
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              브랜드 glow 효과가 적용된 카드입니다.
            </p>
          </div>

          {/* Elevated Card */}
          <div className="rounded-xl bg-[var(--surface-elevated)] p-6">
            <h3 className="font-display text-lg font-semibold text-[var(--text-accent)]">
              Elevated Card
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Accent 텍스트가 적용된 카드입니다.
            </p>
          </div>
        </div>
      </div>

      {/* Borders */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Borders</h2>
        <div className="mt-4 flex gap-4">
          <div className="flex-1 rounded-lg border border-[var(--border-default)] p-4 text-center text-sm text-[var(--text-secondary)]">
            border-default
          </div>
          <div className="flex-1 rounded-lg border border-[var(--border-subtle)] p-4 text-center text-sm text-[var(--text-secondary)]">
            border-subtle
          </div>
          <div className="flex-1 rounded-lg border border-[var(--border-brand)] p-4 text-center text-sm text-[var(--text-secondary)]">
            border-brand
          </div>
        </div>
      </div>
    </section>
  );
}
