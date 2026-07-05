const ITEMS = [
  "SELECTED WORK",
  "MAKE IT SCREAM",
  "기분 좋은 비명",
  "AI DEVELOPER COLLECTIVE",
];

export default function Marquee({
  reverse = false,
  tone = "paper",
}: {
  reverse?: boolean;
  tone?: "ink" | "paper";
}) {
  return (
    <div
      aria-hidden
      className={`marquee overflow-hidden py-2.5 whitespace-nowrap ${
        tone === "ink"
          ? "border-t border-paper/15 bg-ink text-paper/40"
          : "border-b border-ink"
      }`}
    >
      <div
        className={`marquee-track inline-block font-display text-[13px] font-semibold tracking-[0.18em] ${reverse ? "marquee-track-reverse" : ""}`}
      >
        {[0, 1].map((half) => (
          <span key={half}>
            {ITEMS.map((item) => (
              <span key={item}>
                {item}
                <span className="mx-4 text-scream">●</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
