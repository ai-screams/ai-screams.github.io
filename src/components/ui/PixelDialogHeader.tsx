import { type ReactElement, type ReactNode } from "react";

interface PixelDialogHeaderProps {
  label: string;
  className?: string;
  icon?: ReactNode;
  iconColor?: string;
}

export default function PixelDialogHeader({
  className,
  icon = "♦",
  iconColor = "var(--surface)",
  label,
}: PixelDialogHeaderProps): ReactElement {
  const rootClassName = ["flex items-center gap-2", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName}>
      <span
        aria-hidden="true"
        className="inline-flex h-6 w-6 items-center justify-center font-pixel text-[10px]"
        style={{
          backgroundColor: "var(--color-brand-500)",
          borderRadius: "var(--pixel-border-radius)",
          color: iconColor,
        }}
      >
        {icon}
      </span>
      <span
        className="font-pixel text-xs"
        style={{ color: "var(--text-brand)" }}
      >
        {label}
      </span>
    </div>
  );
}
