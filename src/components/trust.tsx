import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { bandLabel, trustBand } from "@/lib/trust";
import type { TrustBand } from "@/lib/types";

const bandClass: Record<TrustBand, string> = {
  sealed: "bg-brass-tint text-ink",
  verified: "bg-sage text-raised",
  established: "bg-oxblood-tint text-oxblood border border-oxblood/30",
  provisional: "bg-ink-soft text-raised",
  "at-risk": "bg-danger-tint text-danger",
};

export function TrustBadge({
  score,
  size = "sm",
  sealed,
}: {
  score: number;
  size?: "sm" | "md";
  sealed?: boolean;
}) {
  const band = trustBand(score);
  return (
    <span
      title={`Trust Score ${score.toFixed(1)} — ${bandLabel(band)}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-mono font-bold tabular",
        size === "md" ? "h-7 px-3 text-sm" : "h-6 px-2.5 text-xs",
        bandClass[band],
      )}
    >
      {band === "sealed" || sealed ? (
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
      ) : null}
      {score.toFixed(1)}
    </span>
  );
}

export function CupScoreBadge({ score, size = "sm" }: { score: number; size?: "sm" | "md" }) {
  const cls =
    score >= 90
      ? "bg-brass-tint text-ink"
      : score >= 85
        ? "bg-oxblood text-raised"
        : score >= 80
          ? "bg-sage text-raised"
          : "bg-ink-soft text-raised";
  return (
    <span
      title={`Cup score ${score.toFixed(1)}`}
      className={cn(
        "inline-flex items-center rounded-full font-mono font-bold tabular",
        size === "md" ? "h-7 px-3 text-sm" : "h-6 px-2.5 text-xs",
        cls,
      )}
    >
      {score >= 90 ? <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-ink" /> : null}
      {score.toFixed(1)}
    </span>
  );
}

export function StatusChip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "sage" | "warn" | "danger" | "brass";
}) {
  const map = {
    neutral: "bg-recessed text-ink-soft",
    sage: "bg-sage-tint text-sage-deep",
    warn: "bg-warning-tint text-warning",
    danger: "bg-danger-tint text-danger",
    brass: "bg-brass-tint text-brass-deep",
  };
  return (
    <span className={cn("inline-flex h-6 items-center rounded-full px-2.5 text-xs", map[tone])}>
      {children}
    </span>
  );
}
