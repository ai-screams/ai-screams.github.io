import type { JSX, ReactNode } from "react";

interface SparkDividerProps {
  center?: ReactNode;
  className?: string;
}

const defaultCenterStyle = { color: "var(--color-brand-300)" };

export default function SparkDivider({
  center,
  className,
}: SparkDividerProps): JSX.Element {
  const centerContent = center ?? "✦";
  const rootClassName = ["flex items-center gap-3", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName}>
      <hr className="flex-1 pixel-divider" />
      <span
        aria-hidden={center === undefined ? "true" : undefined}
        className="font-pixel text-xs"
        style={defaultCenterStyle}
      >
        {centerContent}
      </span>
      <hr className="flex-1 pixel-divider" />
    </div>
  );
}
