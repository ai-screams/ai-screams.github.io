const ITEMS = [
  "SELECTED WORK",
  "MAKE IT SCREAM",
  "기분 좋은 비명",
  "AI DEVELOPER COLLECTIVE",
];

export default function Marquee() {
  return (
    <div
      aria-hidden
      className="marquee overflow-hidden border-b border-ink py-2.5 whitespace-nowrap"
    >
      <div className="marquee-track inline-block font-display text-[13px] font-semibold tracking-[0.18em]">
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
