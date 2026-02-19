import { type ReactElement } from "react";
import { type JobNode, type JobStatusStyle } from "../types";

interface JobTreeCardProps {
  node: JobNode;
  styles: JobStatusStyle;
}

export function JobTreeCard({ node, styles }: JobTreeCardProps): ReactElement {
  return (
    <div
      className="flex min-w-[5rem] flex-col items-center gap-1 pixel-card px-2 py-2 sm:min-w-[6rem] sm:px-3"
      style={{
        borderColor: styles.border,
        opacity: styles.opacity,
      }}
    >
      <span
        className="font-pixel-body text-[10px] sm:text-xs"
        style={{ color: styles.color }}
      >
        {node.fantasy}
      </span>
      <span
        className="font-pixel text-[6px] sm:text-[8px]"
        style={{ color: "var(--text-tertiary)" }}
      >
        {node.real}
      </span>
      {node.status === "CURRENT" ? (
        <span
          className="font-pixel text-[6px]"
          style={{ color: "var(--color-brand-500)" }}
        >
          ▶ NOW
        </span>
      ) : null}
      {node.status === "LOCKED" ? (
        <span
          className="font-pixel text-[8px]"
          style={{ color: "var(--text-tertiary)" }}
        >
          🔒
        </span>
      ) : null}
    </div>
  );
}
