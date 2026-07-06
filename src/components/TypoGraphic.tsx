import { typoLines } from "@/utils/typoLines";

export default function TypoGraphic({
  lines,
  name,
}: {
  lines?: string[];
  name: string;
}) {
  const rendered = lines ?? typoLines(name);
  return (
    <div
      aria-hidden
      className="text-center font-display text-[clamp(64px,10vw,160px)] leading-[0.9] font-bold tracking-[-0.03em] text-transparent uppercase transition-colors duration-300 select-none text-stroke-ink group-hover:text-scream group-hover:text-stroke-scream"
    >
      {rendered.map((line) => (
        <span className="block" key={line}>
          {line}
        </span>
      ))}
    </div>
  );
}
