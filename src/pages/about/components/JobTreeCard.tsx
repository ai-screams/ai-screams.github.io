import { type ReactElement } from "react";
import { type JobNode, type JobStatusStyle } from "../types";

const JOB_STATUS_SCREEN_READER_LABELS: Readonly<
  Record<JobNode["status"], string>
> = {
  COMPLETED: "완료",
  CURRENT: "현재 진행 중",
  LOCKED: "잠김",
};

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
      <span className="sr-only">
        상태: {JOB_STATUS_SCREEN_READER_LABELS[node.status]}
      </span>
      {node.status === "CURRENT" ? (
        <span
          aria-hidden="true"
          className="font-pixel text-[6px]"
          style={{ color: "var(--color-brand-500)" }}
        >
          ▶ NOW
        </span>
      ) : null}
      {node.status === "LOCKED" ? (
        <span
          aria-hidden="true"
          className="font-pixel text-[8px]"
          style={{ color: "var(--text-tertiary)" }}
        >
          🔒
        </span>
      ) : null}
    </div>
  );
}
