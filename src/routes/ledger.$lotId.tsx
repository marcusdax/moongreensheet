import { createFileRoute, Link } from "@tanstack/react-router";
import { CupScoreBadge, StatusChip, TrustBadge } from "@/components/trust";
import { Button, MetricBar, Plate } from "@/components/ui";
import { DOC_LABEL } from "@/lib/data";
import { scoreAccount, scoreLot, useLedger } from "@/lib/store";
import { accountComponents, formatCents, formatLbs, trustBand, bandLabel } from "@/lib/trust";

export const Route = createFileRoute("/ledger/$lotId")({ component: LotDetail });

function LotDetail() {
  const { lotId } = Route.useParams();
  const lots = useLedger((s) => s.lots);
  const accounts = useLedger((s) => s.accounts);
  const documents = useLedger((s) => s.documents);
  const lot = lots.find((l) => l.id === lotId);
  if (!lot) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p>Lot not found.</p>
        <Link to="/ledger" className="text-oxblood underline">
          Return to navigator
        </Link>
      </main>
    );
  }
  const supplier = accounts.find((a) => a.id === lot.supplierId);
  const trust = scoreLot(lot, accounts, documents);
  const supplierTrust = supplier ? scoreAccount(supplier, documents) : 50;
  const comps = supplier
    ? accountComponents(supplier, documents)
    : { documents: 50, transactions: 50, quality: 50, identity: 50, network: 50 };
  const lotDocs = documents.filter((d) => d.lotId === lot.id);
  const band = trustBand(trust);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="folio-meta">Lot record · {lot.sampleId}</p>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-tight">
            {lot.farm}
            <span className="text-ink-soft"> · {lot.varietal}</span>
          </h1>
          <p className="mt-2 text-ink-soft">
            {lot.origin} · {lot.species} · {lot.elevationM} m · {lot.process} · safra {lot.harvest}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CupScoreBadge score={lot.cupScore} size="md" />
          <TrustBadge score={trust} size="md" />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <Plate>
          <p className="overline-label">Price</p>
          <p className="mt-2 font-mono text-2xl tabular">{formatCents(lot.pricePerLbCents)}/lb</p>
          <p className="text-xs text-ink-soft">Floor {formatCents(lot.costPerLbCents)}</p>
        </Plate>
        <Plate>
          <p className="overline-label">Position</p>
          <p className="mt-2 font-mono text-2xl tabular">{formatLbs(lot.availableLbs)}</p>
          <p className="text-xs text-ink-soft">{lot.bags} bags · ETA {lot.eta}</p>
        </Plate>
        <Plate>
          <p className="overline-label">Moisture</p>
          <p className="mt-2 font-mono text-2xl tabular">{lot.moisture.toFixed(1)}%</p>
          <p className="text-xs text-ink-soft">aw {lot.waterActivity.toFixed(2)}</p>
        </Plate>
        <Plate>
          <p className="overline-label">Trust band</p>
          <p className="mt-2 font-display text-2xl">{bandLabel(band)}</p>
          <p className="text-xs text-ink-soft">Supplier {supplier?.name}</p>
        </Plate>
      </div>

      {lot.claimedScore != null && Math.abs(lot.claimedScore - lot.cupScore) >= 2 ? (
        <p className="mt-4 border border-warning bg-warning-tint px-4 py-3 text-sm text-warning">
          Claimed cup {lot.claimedScore.toFixed(1)} versus recorded {lot.cupScore.toFixed(1)}. Quality
          consistency is reduced until a lab report is accepted.
        </p>
      ) : null}

      {band === "provisional" || band === "at-risk" ? (
        <p className="mt-4 border border-danger/30 bg-danger-tint px-4 py-3 text-sm text-danger">
          Trust {trust.toFixed(1)} — {bandLabel(band)}: additional verified documents recommended
          before large settlement.
        </p>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Plate>
          <p className="overline-label">Sensory</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {lot.flavor.map((f) => (
              <span key={f} className="rounded-full border border-hairline px-3 py-1 text-sm">
                {f}
              </span>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <MetricBar label="ESG" value={lot.esg} tone="sage" />
            <MetricBar label="Logistics" value={lot.logistics} />
            <MetricBar label="Document density" value={comps.documents} />
            <MetricBar label="Quality consistency" value={comps.quality} tone="sage" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {lot.certifications.map((c) => (
              <StatusChip key={c} tone="sage">
                {c}
              </StatusChip>
            ))}
          </div>
        </Plate>
        <Plate>
          <p className="overline-label">Supplier trust</p>
          <p className="mt-2 font-mono text-4xl tabular">{supplierTrust.toFixed(1)}</p>
          <p className="text-sm text-ink-soft">{supplier?.name}</p>
          <div className="mt-4 space-y-3">
            <MetricBar label="Documents" value={comps.documents} />
            <MetricBar label="Transactions" value={comps.transactions} />
            <MetricBar label="Quality" value={comps.quality} tone="sage" />
            <MetricBar label="Network" value={comps.network} tone="brass" />
          </div>
          {supplier ? (
            <Link
              to="/crm/$accountId"
              params={{ accountId: supplier.id }}
              className="mt-4 inline-block text-sm text-oxblood underline"
            >
              Open supplier file
            </Link>
          ) : null}
        </Plate>
      </div>

      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl">Evidence</h2>
          <Link to="/scan">
            <Button size="sm">Attach evidence</Button>
          </Link>
        </div>
        <div className="mt-4 divide-y divide-hairline border-y border-hairline">
          {lotDocs.length === 0 ? (
            <p className="py-6 text-ink-soft">
              No documents on this lot.{" "}
              <Link to="/scan" className="text-oxblood underline">
                Add evidence
              </Link>
            </p>
          ) : (
            lotDocs.map((d) => (
              <div key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-medium">{DOC_LABEL[d.type]}</p>
                  <p className="font-mono text-xs text-ink-soft">
                    {d.filename} · {d.createdAt} · conf {(d.confidence * 100).toFixed(0)}%
                  </p>
                </div>
                <StatusChip
                  tone={
                    d.status === "accepted" ? "sage" : d.status === "rejected" ? "danger" : "warn"
                  }
                >
                  {d.status}
                </StatusChip>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
