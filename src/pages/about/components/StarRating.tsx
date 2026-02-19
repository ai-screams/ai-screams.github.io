import { type ReactElement } from "react";

const MAX_STARS = 5;
const MIN_STARS = 0;

interface StarRatingProps {
  label: string;
  stars: number;
}

export function StarRating({ label, stars }: StarRatingProps): ReactElement {
  const safeStars = normalizeStars(stars);
  const filled = "★".repeat(safeStars);
  const empty = "☆".repeat(MAX_STARS - safeStars);
  return (
    <span
      aria-label={`${label} 숙련도 ${safeStars}점 / ${MAX_STARS}점`}
      className="font-pixel text-[10px]"
    >
      <span style={{ color: "var(--color-brand-400)" }}>{filled}</span>
      <span style={{ color: "var(--text-tertiary)", opacity: 0.4 }}>
        {empty}
      </span>
    </span>
  );
}

function normalizeStars(stars: number): number {
  if (!Number.isFinite(stars)) {
    return MIN_STARS;
  }
  const roundedStars = Math.trunc(stars);
  return Math.min(MAX_STARS, Math.max(MIN_STARS, roundedStars));
}
