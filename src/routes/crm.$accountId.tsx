import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusChip, TrustBadge } from "@/components/trust";
import { Button, MetricBar, Plate } from "@/components/ui";
import { DOC_LABEL } from "@/lib/data";
import { scoreAccount, useLedger } from "@/lib/store";
import { accountComponents, formatCents, bandLabel, trustBand } from "@/lib/trust";

export const Route = createFileRoute("/crm/$accountId")({ component: AccountFile });

function AccountFile() {
  const { accountId } = Route.useParams();
  const accounts = useLedger((s) => s.accounts);
  const lots = useLedger((s) => s.lots);
  const documents = useLedger((s) => s.documents);
  const campaigns = useLedger((s) => s.campaigns);
  const interventions = useLedger((s) => s.interventions);
  const startIntervention = useLedger((s) => s.startIntervention);
  const resolveIntervention = useLedger((s) => s.resolveIntervention);

  const account = accounts.find((a) => a.id === accountId);
  if (!account) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        Account not found.{" "}
        <Link to="/crm" className="text-oxblood underline">
          CRM
        </Link>
      </main>
    );
  }

  const trust = scoreAccount(account, documents);
  const comps = accountComponents(account, documents);
  const relatedLots = lots.filter((l) => l.supplierId === account.id);
  const docs = documents.filter((d) => d.accountId === account.id);
  const touches = campaigns.filter((c) => c.accountId === account.id);
  const ints = interventions.filter((i) => i.accountId === account.id);
  const band = trustBand(trust);
  const ltvCac = account.cacCents ? account.ltvCents / account.cacCents : 0;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="folio-meta">
        Account file · {account.kind.replace("_", " ")} · {account.segment}
      </p>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-tight">{account.name}</h1>
          <p className="mt-2 text-ink-soft">
            {account.contact} · {account.city}, {account.country} · {account.size}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip
            tone={
              account.lifecycle === "active"
                ? "sage"
                : account.lifecycle === "dormant"
                  ? "warn"
                  : account.lifecycle === "churned"
                    ? "danger"
                    : "brass"
            }
          >
            {account.lifecycle}
          </StatusChip>
          <TrustBadge score={trust} size="md" />
        </div>
      </div>

      {account.churnRisk >= 0.7 ? (
        <p className="mt-4 border border-danger/30 bg-danger-tint px-4 py-3 text-sm text-danger">
          Churn hazard {account.churnRisk.toFixed(2)} crossed the 0.70 threshold. Start an
          intervention before the next cadence review.
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Plate>
          <p className="overline-label">LTV</p>
          <p className="mt-2 font-mono text-2xl tabular">{formatCents(account.ltvCents)}</p>
        </Plate>
        <Plate>
          <p className="overline-label">LTV : CAC</p>
          <p className="mt-2 font-mono text-2xl tabular">{ltvCac.toFixed(1)}×</p>
        </Plate>
        <Plate>
          <p className="overline-label">Kits / orders</p>
          <p className="mt-2 font-mono text-2xl tabular">
            {account.kits} / {account.orders}
          </p>
        </Plate>
        <Plate>
          <p className="overline-label">Engagements 6mo</p>
          <p className="mt-2 font-mono text-2xl tabular">{account.engagements6mo}</p>
        </Plate>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Plate>
          <p className="overline-label">Trust · {bandLabel(band)}</p>
          <p className="mt-2 font-mono text-5xl tabular">{trust.toFixed(1)}</p>
          <div className="mt-5 space-y-3">
            <MetricBar label="Document verification 35%" value={comps.documents} />
            <MetricBar label="Transaction integrity 25%" value={comps.transactions} />
            <MetricBar label="Quality consistency 20%" value={comps.quality} tone="sage" />
            <MetricBar label="Identity & longevity 12%" value={comps.identity} />
            <MetricBar label="Network reputation 8%" value={comps.network} tone="brass" />
          </div>
        </Plate>
        <Plate>
          <p className="overline-label">COF sequence</p>
          <ul className="mt-3 space-y-2">
            {(["COF-001", "COF-002", "COF-003", "COF-004", "COF-005"] as const).map((code) => {
              const t = touches.find((c) => c.code === code);
              return (
                <li
                  key={code}
                  className="flex items-center justify-between border-b border-hairline py-2 text-sm"
                >
                  <span className="font-mono">{code}</span>
                  <span className="text-ink-soft">{t ? `${t.status} · ${t.at}` : "idle"}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs text-ink-soft">
            Trigger: sample_kit.delivered → COF-001. Feedback gates COF-002+.
          </p>
        </Plate>
      </div>

      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl">Interventions</h2>
          <div className="flex flex-wrap gap-2">
            {(["email_campaign", "sales_call", "discount_offer", "survey"] as const).map((t) => (
              <Button key={t} size="sm" variant="outline" onClick={() => startIntervention(account.id, t)}>
                {t.replace("_", " ")}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-3 divide-y divide-hairline border-y border-hairline">
          {ints.length === 0 ? (
            <p className="py-4 text-ink-soft">No interventions on file.</p>
          ) : (
            ints.map((i) => (
              <div key={i.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <p>
                  {i.type.replace("_", " ")} · {i.started}
                </p>
                <div className="flex items-center gap-2">
                  <StatusChip tone={i.outcome === "pending" ? "warn" : i.outcome === "retained" ? "sage" : "danger"}>
                    {i.outcome}
                  </StatusChip>
                  {i.outcome === "pending" ? (
                    <>
                      <Button size="sm" variant="ghost" onClick={() => resolveIntervention(i.id, "retained")}>
                        Retain
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => resolveIntervention(i.id, "churned")}>
                        Churned
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {relatedLots.length ? (
        <section className="mt-8">
          <h2 className="font-display text-2xl">Lots on this file</h2>
          <ul className="mt-3">
            {relatedLots.map((l) => (
              <li key={l.id} className="border-b border-hairline py-2">
                <Link to="/ledger/$lotId" params={{ lotId: l.id }} className="text-oxblood underline">
                  {l.farm} · {l.varietal} · {l.cupScore.toFixed(1)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Documents</h2>
          <Link to="/scan">
            <Button size="sm">Upload verification</Button>
          </Link>
        </div>
        <ul className="mt-3 divide-y divide-hairline border-y border-hairline">
          {docs.length === 0 ? (
            <li className="py-4 text-ink-soft">No documents.</li>
          ) : (
            docs.map((d) => (
              <li key={d.id} className="flex justify-between py-3 text-sm">
                <span>
                  {DOC_LABEL[d.type]} · {d.filename}
                </span>
                <span className="font-mono text-ink-soft">{d.status}</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}
