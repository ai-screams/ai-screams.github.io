export default function SectionLabel({
  note,
  title,
}: {
  note: string;
  title: string;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-ink px-6 py-3.5">
      <h2 className="font-display text-[13px] font-bold tracking-[0.22em]">
        {title}
      </h2>
      <span className="text-xs text-mist">{note}</span>
    </div>
  );
}
