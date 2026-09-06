import { createFileRoute, Link } from "@tanstack/react-router";
import { TrustBadge } from "@/components/trust";
import { MetricBar, Plate } from "@/components/ui";
import { scoreAccount, scoreLot, useLedger } from "@/lib/store";
import { bandLabel, trustBand } from "@/lib/trust";

export const Route = createFileRoute("/trust")({ component: TrustPage });

function TrustPage() {
  const accounts = useLedger((s) => s.accounts);
  const lots = useLedger((s) => s.lots);
  const documents = useLedger((s) => s.documents);

  const ranked = accounts
    .map((a) => ({ a, trust: scoreAccount(a, documents) }))
    .sort((x, y) => y.trust - x.trust);

  const lotRanked = lots
    .map((l) => ({
      l,
      trust: scoreLot(l, accounts, documents),
      docs: documents.filter((d) => d.lotId === l.id && d.status === "accepted").length,
    }))
    .sort((x, y) => y.trust - x.trust);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="folio-meta">Folio 06 — Trust</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Honesty that stays with the file</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Trust Score ∈ [0, 100]. New counterparties start at 50. Evidence moves the number;
        commercial tiers do not. Model v1.2 — weights versioned with every snapshot.
      </p>

      <div className="mt-8 overflow-x-auto rounded-lg border border-hairline bg-raised">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-recessed text-xs uppercase tracking-widest text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Band</th>
              <th className="px-4 py-3 font-medium">Score</th>
              <th className="px-4 py-3 font-medium">Effect</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Sealed", "90–100", "Fast-path settlement. Preferred in Navigator ranking."],
              ["Verified", "75–89.9", "Standard flow. Badge on lots and profiles."],
              ["Established", "55–74.9", "Normal review. OCR still required for material claims."],
              ["Provisional", "35–54.9", "Extra document gates. Payment holds possible."],
              ["At Risk", "0–34.9", "Manual review. Limited public catalog visibility."],
            ].map(([a, b, c]) => (
              <tr key={a} className="border-t border-hairline">
                <td className="px-4 py-3 font-medium">{a}</td>
                <td className="px-4 py-3 font-mono tabular">{b}</td>
                <td className="px-4 py-3 text-ink-soft">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        {[
          ["Documents", "35%", "Accepted OCR evidence"],
          ["Transactions", "25%", "Settlement hygiene"],
          ["Quality", "20%", "Cup vs claimed"],
          ["Identity", "12%", "Age, KYC, lots"],
          ["Network", "8%", "Peer-weighted"],
        ].map(([t, w, s]) => (
          <Plate key={t} className="p-4">
            <p className="overline-label">{t}</p>
            <p className="mt-2 font-mono text-2xl">{w}</p>
            <p className="mt-1 text-xs text-ink-soft">{s}</p>
          </Plate>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Counterparty scores</h2>
        <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
          {ranked.map(({ a, trust }) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <Link to="/crm/$accountId" params={{ accountId: a.id }} className="font-medium hover:underline">
                  {a.name}
                </Link>
                <p className="text-xs text-ink-soft">
                  {bandLabel(trustBand(trust))} · {a.kind.replace("_", " ")}
                </p>
              </div>
              <TrustBadge score={trust} size="md" />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Lot scores</h2>
        <div className="mt-4 space-y-4">
          {lotRanked.map(({ l, trust, docs }) => (
            <Plate key={l.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link to="/ledger/$lotId" params={{ lotId: l.id }} className="font-medium hover:underline">
                    {l.farm} · {l.varietal}
                  </Link>
                  <p className="text-xs text-ink-soft">
                    {docs} accepted documents
                    {docs === 0 ? " · add evidence" : ""}
                  </p>
                </div>
                <TrustBadge score={trust} />
              </div>
              <div className="mt-3">
                <MetricBar
                  label="Trust"
                  value={trust}
                  tone={trust >= 90 ? "brass" : trust >= 75 ? "sage" : trust < 35 ? "danger" : "oxblood"}
                />
              </div>
            </Plate>
          ))}
        </div>
      </section>
    </main>
  );
}
