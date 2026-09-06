import { createFileRoute } from "@tanstack/react-router";
import { Plate, MetricBar } from "@/components/ui";

export const Route = createFileRoute("/ecosystem")({ component: Ecosystem });

function Ecosystem() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <p className="folio-meta">Folio 07 — Ecosystem</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight tracking-tight md:text-5xl">
        From verification to programmable flavor.
      </h1>
      <p className="mt-4 max-w-prose text-ink-soft">
        The physical bean is the evidence object — material proof that validates the ledger. Auctum
        does not compete on compressed retail margins. It competes on the mathematics of the
        supply chain.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["The Sticker", "Marketing claims. Floating C-market. Promises."],
          ["The Ledger", "Cryptographic evidence. Binding procedures. Ground-up true-cost floor."],
          ["The Stack", "Evidence-grade, or it does not ship."],
        ].map(([t, b]) => (
          <Plate key={t}>
            <p className="overline-label">{t}</p>
            <p className="mt-3 font-display text-xl leading-snug">{b}</p>
          </Plate>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="font-display text-3xl">Institutionalizing the floor</h2>
        <p className="mt-2 font-mono text-3xl tabular text-oxblood">$3.00/lb</p>
        <div className="mt-6 space-y-3">
          <MetricBar label="Household subsistence $1.20" value={40} tone="sage" />
          <MetricBar label="Farm operating costs $0.80" value={27} />
          <MetricBar label="Resilience & reinvestment $0.50" value={17} tone="brass" />
          <MetricBar label="Infrastructure & access $0.30" value={10} />
          <MetricBar label="Debt servicing $0.20" value={7} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">The verification stack</h2>
        <div className="mt-5 divide-y divide-hairline border-y border-hairline">
          {[
            ["Audit trail", "Hash-chained ledger — immutable, append-only record of every event."],
            ["Evidence chain", "60-kg retained samples, sealed unopened, tamper-evident, 3-year retention."],
            ["Warehouse runbooks", "±1.5% weight-variance trigger; photographed seals; evidence box retention."],
            ["Cupping SOP", "SCA protocol, Agtron 55–60, unrounded scores, mandatory 3+ cupper panels."],
            ["Quality limits", "Moisture strictly bound to 11.0–12.5% acceptance band."],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-2 py-4 md:grid-cols-[200px_1fr]">
              <p className="font-semibold">{k}</p>
              <p className="text-ink-soft">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">Bounded contexts</h2>
        <p className="mt-2 max-w-prose text-sm text-ink-soft">
          The system map: six core contexts, supporting CRM / samples / orders, generic identity
          and billing. Events travel as CloudEvents on an outbox. Money is integer cents.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Catalog", "Lots, cup scores, ESG, inventory. Source of truth: coffee_lots."],
            ["CRM", "Roasters, segments, lifecycle, churn hazard, LTV."],
            ["Campaigns", "COF-001–005, templates, sample_kit.delivered."],
            ["Samples", "Kit assembly and fulfilment."],
            ["Orders", "Reservation, payment, shipment."],
            ["Trust", "Evidence, scores, bands, document density."],
            ["Doc intake", "Vision OCR, confidence, human accept."],
            ["Analytics", "WTR, reorder, hazard, ranking."],
            ["Billing", "VietQR / Casso / PayOS, integer cents, idempotency."],
          ].map(([t, b]) => (
            <Plate key={t} className="p-4">
              <p className="font-mono text-xs uppercase tracking-widest text-oxblood">{t}</p>
              <p className="mt-2 text-sm">{b}</p>
            </Plate>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">Collector as agent</h2>
        <p className="mt-3 max-w-prose">
          In Vietnam, more than 95% of farmers sell through middlemen. Auctum does not bypass
          them; it co-opts them. Collectors use SMS / USSD and offline-first PWAs as data-entry
          nodes, so even plots under 2 ha are ledgered and EUDR-ready.
        </p>
      </section>
    </main>
  );
}
