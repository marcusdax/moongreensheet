import { createFileRoute } from "@tanstack/react-router";
import { LotCard } from "@/components/lot-card";
import { Button } from "@/components/ui";
import { scoreLot, useLedger } from "@/lib/store";
import { formatCents } from "@/lib/trust";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/ledger")({ component: LedgerPage });

function LedgerPage() {
  const lots = useLedger((s) => s.lots);
  const accounts = useLedger((s) => s.accounts);
  const documents = useLedger((s) => s.documents);
  const budget = useLedger((s) => s.budgetCents);
  const minCup = useLedger((s) => s.minCup);
  const setBudget = useLedger((s) => s.setBudget);
  const setMinCup = useLedger((s) => s.setMinCup);
  const [origin, setOrigin] = useState("all");
  const [process, setProcess] = useState("all");
  const [includeOver, setIncludeOver] = useState(true);
  const [q, setQ] = useState("");

  const origins = useMemo(
    () => ["all", ...Array.from(new Set(lots.map((l) => l.country)))],
    [lots],
  );

  const ranked = useMemo(() => {
    return lots
      .map((lot) => {
        const trust = scoreLot(lot, accounts, documents);
        const over = lot.pricePerLbCents > budget;
        return { lot, trust, over };
      })
      .filter(({ lot, over }) => {
        if (lot.cupScore < minCup) return false;
        if (!includeOver && over) return false;
        if (origin !== "all" && lot.country !== origin) return false;
        if (process !== "all" && lot.process !== process) return false;
        if (q) {
          const hay = `${lot.farm} ${lot.origin} ${lot.varietal} ${lot.producer}`.toLowerCase();
          if (!hay.includes(q.toLowerCase())) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const aBoost = a.trust >= 75 && a.lot.cupScore >= 85 ? 4 : 0;
        const bBoost = b.trust >= 75 && b.lot.cupScore >= 85 ? 4 : 0;
        return b.lot.cupScore + b.trust * 0.08 + bBoost - (a.lot.cupScore + a.trust * 0.08 + aBoost);
      });
  }, [lots, accounts, documents, budget, minCup, includeOver, origin, process, q]);

  const needsVerify = lots.filter(
    (l) => documents.filter((d) => d.lotId === l.id && d.status === "accepted").length === 0,
  ).length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="folio-meta">Folio 03 — The Ledger</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">Navigator</h1>
          <p className="mt-2 max-w-xl text-ink-soft">
            Compare lots on like-for-like terms. Trust sits beside cup score.{" "}
            {needsVerify} lots still need verification documents.
          </p>
        </div>
        <p className="font-mono text-sm text-ink-soft">
          {ranked.length} positions · budget {formatCents(budget)}/lb
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-lg border border-hairline bg-raised p-4">
          <p className="overline-label mb-4">Filters</p>
          <label className="block space-y-1.5">
            <span className="overline-label">Search</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Farm, origin, varietal"
              className="h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm focus:border-oxblood focus:outline-none"
            />
          </label>
          <label className="mt-4 block space-y-1.5">
            <span className="overline-label">
              Budget ceiling · {formatCents(budget)}/lb
            </span>
            <input
              type="range"
              min={300}
              max={2000}
              step={10}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-oxblood"
            />
          </label>
          <label className="mt-4 block space-y-1.5">
            <span className="overline-label">Min cup score · {minCup.toFixed(0)}</span>
            <input
              type="range"
              min={70}
              max={92}
              step={0.25}
              value={minCup}
              onChange={(e) => setMinCup(Number(e.target.value))}
              className="w-full accent-oxblood"
            />
          </label>
          <label className="mt-4 block space-y-1.5">
            <span className="overline-label">Origin</span>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm"
            >
              {origins.map((o) => (
                <option key={o} value={o}>
                  {o === "all" ? "All origins" : o}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block space-y-1.5">
            <span className="overline-label">Process</span>
            <select
              value={process}
              onChange={(e) => setProcess(e.target.value)}
              className="h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm"
            >
              {["all", "washed", "natural", "honey", "anaerobic", "carbonic"].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 flex min-h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeOver}
              onChange={(e) => setIncludeOver(e.target.checked)}
              className="accent-oxblood"
            />
            Include over-budget lots
          </label>
          <Button
            variant="ghost"
            className="mt-3 px-0"
            onClick={() => {
              setBudget(1200);
              setMinCup(80);
              setOrigin("all");
              setProcess("all");
              setQ("");
              setIncludeOver(true);
            }}
          >
            Clear filters
          </Button>
        </aside>

        <div className="space-y-4">
          {ranked.length === 0 ? (
            <p className="border border-hairline bg-raised p-8 text-ink-soft">
              No lots match this filter. Loosen cup score or budget.
            </p>
          ) : (
            ranked.map(({ lot, trust, over }, i) => (
              <LotCard key={lot.id} lot={lot} trust={trust} rank={i + 1} overBudget={over} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
