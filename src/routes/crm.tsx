import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusChip, TrustBadge } from "@/components/trust";
import { Plate } from "@/components/ui";
import { scoreAccount, useLedger } from "@/lib/store";
import { formatCents, trustBand } from "@/lib/trust";
import type { Lifecycle } from "@/lib/types";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/crm")({ component: CrmPage });

const lifeTone: Record<Lifecycle, "sage" | "warn" | "danger" | "brass"> = {
  active: "sage",
  trial: "brass",
  dormant: "warn",
  churned: "danger",
};

function CrmPage() {
  const accounts = useLedger((s) => s.accounts);
  const documents = useLedger((s) => s.documents);
  const interventions = useLedger((s) => s.interventions);
  const [kind, setKind] = useState("all");
  const [life, setLife] = useState("all");

  const rows = useMemo(() => {
    return accounts
      .filter((a) => (kind === "all" ? true : a.kind === kind))
      .filter((a) => (life === "all" ? true : a.lifecycle === life))
      .map((a) => ({ a, trust: scoreAccount(a, documents) }))
      .sort((x, y) => y.a.churnRisk - x.a.churnRisk);
  }, [accounts, documents, kind, life]);

  const wtr = accounts.filter((a) => a.kind === "roaster" && a.daysSinceOrder <= 7).length;
  const highRisk = accounts.filter((a) => a.churnRisk >= 0.7).length;
  const pending = interventions.filter((i) => i.outcome === "pending").length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="folio-meta">Folio 04 — CRM</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Relationship ledger</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Roasters, exporters, and houses on one file. Hazard, LTV, kits, and Trust travel with the
        account. Weekly transacting roasters is the north star.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Plate>
          <p className="overline-label">WTR (7-day)</p>
          <p className="mt-2 font-mono text-3xl tabular">{wtr}</p>
        </Plate>
        <Plate>
          <p className="overline-label">Hazard ≥ 0.70</p>
          <p className="mt-2 font-mono text-3xl tabular text-danger">{highRisk}</p>
        </Plate>
        <Plate>
          <p className="overline-label">Open interventions</p>
          <p className="mt-2 font-mono text-3xl tabular">{pending}</p>
        </Plate>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className="h-11 rounded-md border border-interactive bg-raised px-3 text-sm"
        >
          <option value="all">All kinds</option>
          <option value="roaster">Roasters</option>
          <option value="exporter">Exporters</option>
          <option value="import_house">Import houses</option>
          <option value="trader">Traders</option>
        </select>
        <select
          value={life}
          onChange={(e) => setLife(e.target.value)}
          className="h-11 rounded-md border border-interactive bg-raised px-3 text-sm"
        >
          <option value="all">All lifecycle</option>
          <option value="trial">Trial</option>
          <option value="active">Active</option>
          <option value="dormant">Dormant</option>
          <option value="churned">Churned</option>
        </select>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-hairline bg-raised">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-recessed text-xs uppercase tracking-widest text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Account</th>
              <th className="px-4 py-3 font-medium">Kind</th>
              <th className="px-4 py-3 font-medium">Lifecycle</th>
              <th className="px-4 py-3 font-medium">Hazard</th>
              <th className="px-4 py-3 font-medium">Trust</th>
              <th className="px-4 py-3 font-medium">LTV</th>
              <th className="px-4 py-3 font-medium">Last order</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ a, trust }) => (
              <tr key={a.id} className="border-t border-hairline hover:bg-hover/60">
                <td className="px-4 py-3">
                  <Link
                    to="/crm/$accountId"
                    params={{ accountId: a.id }}
                    className="font-medium text-ink underline-offset-2 hover:underline"
                  >
                    {a.name}
                  </Link>
                  <p className="text-xs text-ink-soft">
                    {a.city}, {a.country} · {a.segment}
                  </p>
                </td>
                <td className="px-4 py-3 text-ink-soft">{a.kind.replace("_", " ")}</td>
                <td className="px-4 py-3">
                  <StatusChip tone={lifeTone[a.lifecycle]}>{a.lifecycle}</StatusChip>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      a.churnRisk >= 0.7
                        ? "font-mono tabular text-danger"
                        : "font-mono tabular"
                    }
                  >
                    {a.churnRisk.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <TrustBadge score={trust} />
                </td>
                <td className="px-4 py-3 font-mono tabular">{formatCents(a.ltvCents)}</td>
                <td className="px-4 py-3 font-mono text-ink-soft">
                  {a.daysSinceOrder >= 900 ? "—" : `${a.daysSinceOrder}d`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
