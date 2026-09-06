import { Link } from "@tanstack/react-router";
import { Plate, MetricBar } from "./ui";
import { CupScoreBadge, TrustBadge, StatusChip } from "./trust";
import { formatCents, formatLbs } from "@/lib/trust";
import type { Lot } from "@/lib/types";
import { cn } from "@/lib/cn";

export function LotCard({
  lot,
  trust,
  rank,
  overBudget,
}: {
  lot: Lot;
  trust: number;
  rank: number;
  overBudget?: boolean;
}) {
  return (
    <Plate
      className={cn(
        "flex flex-col gap-4 transition-shadow duration-200 hover:shadow-e3",
        overBudget && "border-2 border-warning",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-recessed font-mono text-sm font-bold text-ink-soft">
          {rank}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-sans text-lg font-semibold text-ink">
              {lot.origin}
              <span className="text-ink-soft"> · {lot.varietal}</span>
            </h3>
            <StatusChip>{lot.process}</StatusChip>
            {overBudget ? <StatusChip tone="warn">Over budget</StatusChip> : null}
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            {lot.farm} · {lot.producer} · {lot.elevationM} m · safra {lot.harvest}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
        <span className="font-mono tabular text-ink">{formatCents(lot.pricePerLbCents)}/lb</span>
        <CupScoreBadge score={lot.cupScore} />
        <span className="font-mono tabular">ESG {lot.esg}%</span>
        <span className="font-mono tabular">{formatLbs(lot.availableLbs)}</span>
        <span>ETA {lot.eta}</span>
        <TrustBadge score={trust} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {lot.flavor.slice(0, 5).map((f) => (
          <span
            key={f}
            className="h-6 rounded-full border border-hairline bg-raised px-2 text-xs text-ink-soft"
          >
            {f}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricBar
          label="Cost"
          value={Math.round((1 - lot.costPerLbCents / Math.max(lot.pricePerLbCents, 1)) * 100)}
        />
        <MetricBar label="Quality" value={lot.cupScore} tone="sage" />
        <MetricBar label="ESG" value={lot.esg} tone="sage" />
        <MetricBar
          label="Trust"
          value={trust}
          tone={trust >= 90 ? "brass" : trust >= 75 ? "sage" : trust < 35 ? "danger" : "oxblood"}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-ink-soft">
          Sample {lot.sampleId}
          {lot.certifications.length ? ` · ${lot.certifications.join(" · ")}` : ""}
        </p>
        <Link
          to="/ledger/$lotId"
          params={{ lotId: lot.id }}
          className="inline-flex h-8 items-center rounded-md bg-oxblood px-3 text-sm font-semibold text-raised hover:bg-oxblood-deep"
        >
          Source this lot
        </Link>
      </div>
    </Plate>
  );
}
