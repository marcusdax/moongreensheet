import { createFileRoute, Link } from "@tanstack/react-router";
import { AuctumSeal } from "@/components/auctum-mark";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/")({ component: Cover });

function Sheet({
  kicker,
  sheet,
  children,
}: {
  kicker: string;
  sheet: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto mb-8 max-w-3xl border border-hairline bg-raised px-5 py-8 shadow-e1 md:px-10 md:py-10">
      <div className="folio-rule mb-6 flex flex-wrap justify-between gap-2 pb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
        <span>Auctum Ledger · Offer Sheet No. 001</span>
        <span>{kicker}</span>
        <span>{sheet}</span>
      </div>
      {children}
      <div className="mt-8 flex flex-wrap justify-between gap-2 border-t border-hairline pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
        <span>Verified, from origin</span>
        <span>Auctum · MMXXVI</span>
      </div>
    </section>
  );
}

function Cover() {
  return (
    <main className="px-3 py-8 md:px-6 md:py-12">
      <Sheet kicker="Rev 2026.09" sheet="Sheet 1 of 5">
        <div className="flex flex-wrap items-start gap-6">
          <AuctumSeal size={88} />
          <div>
            <h1 className="font-display text-5xl leading-none tracking-tight text-ink md:text-7xl">
              Auctum Ledger
            </h1>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.24em] text-ink-soft">
              Verified green coffee distribution
            </p>
          </div>
        </div>
        <div className="double-rule my-8" />
        <p className="font-display text-3xl leading-snug tracking-tight text-ink md:text-4xl">
          Price is what a lot sells for.
        </p>
        <p className="mt-2 font-display text-3xl font-semibold leading-snug tracking-tight text-oxblood md:text-4xl">
          Value is everything that made it possible.
        </p>
        <p className="mt-5 max-w-xl font-display text-xl text-ink-soft">
          Auctum Ledger is the record that holds both — and can be checked.
        </p>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-ink-soft">
            Endorsed by
            <br />
            <span className="text-ink">Auctum</span>
            <br />
            Value is co-created, not extracted.
          </p>
          <span className="inline-block rotate-[-6deg] border-2 border-oxblood px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.28em] text-oxblood">
            Verified
          </span>
        </div>
      </Sheet>

      <Sheet kicker="Section 01 — Position" sheet="Sheet 2 of 5">
        <p className="folio-meta mb-3">Section 01 — Position</p>
        <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
          Sourcing green coffee has looked more like gambling than strategy.
        </h2>
        <p className="mt-4 max-w-prose font-display text-xl leading-snug">
          Paper ledgers, forked spreadsheets, and offers that live and die inside a messaging
          thread. Roasters commit capital against claims nobody can check.
        </p>
        <div className="mt-6 grid border border-hairline md:grid-cols-2">
          <div className="p-5">
            <p className="overline-label mb-3">Asserted</p>
            <p className="font-display text-lg italic text-ink-soft">
              “Exceptional micro-lot. Jasmine, stone fruit, silky body. Limited availability.”
            </p>
          </div>
          <div className="border-t border-hairline p-5 md:border-l md:border-t-0">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-oxblood">
              Verified
            </p>
            <ul className="space-y-1 font-mono text-sm">
              <li>
                <span className="text-ink-soft">cup score</span> 86.25 SCA
              </li>
              <li>
                <span className="text-ink-soft">moisture</span> 10.8%
              </li>
              <li>
                <span className="text-ink-soft">screen</span> 15/16
              </li>
              <li>
                <span className="text-ink-soft">process</span> washed, 36h ferment
              </li>
              <li>
                <span className="text-ink-soft">safra</span> 2026 · lot 340 × 69kg
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-6 max-w-prose">
          The offer sheet has been the trade's working instrument for a century. We did not
          replace it — we raised its standard of proof. Sensory detail, quality claims, and
          logistics become strict, comparable, checkable data points, held in one system of record.
        </p>
      </Sheet>

      <Sheet kicker="Section 02 — Positions" sheet="Sheet 3 of 5">
        <p className="folio-meta mb-3">Section 02 — Positions, entered as line items</p>
        <h2 className="mb-6 font-display text-3xl leading-tight tracking-tight md:text-4xl">
          Four claims we are willing to be held to.
        </h2>
        {(
          [
            [
              "POS-01",
              "Value is created before it is tasted.",
              "Farmers, workers, ecosystems, and institutions generate value along the entire chain — not the final palate at the end of it. A Robusta block in Vietnam with planned irrigation, disciplined pruning, and cared-for soil has already produced the conditions for specialty quality.",
              "Lot records carry the productive history — practice, input, and stewardship at origin — not only the outcome in the cup.",
            ],
            [
              "POS-02",
              "Price is a signal, not a verdict.",
              "The C-market and the specialty premium both routinely fail to describe what production actually cost or contributed. Treating price as the whole account is a habit, not a finding. It can be tested.",
              "Support for self-verification, true-cost accounting, and social value accounting — so a number can be read against the work that produced it.",
            ],
            [
              "POS-03",
              "Coffee is a system, not a commodity.",
              "Roads. Drying beds. Fermentation labs. Research stations. Cooperative structures. A cup is the visible tip of an iceberg whose mass is investment made by farmers, governments, and collectives.",
              "Infrastructure and institutional context are part of the lot record, because they are part of the lot.",
            ],
            [
              "POS-04",
              "Trade should reinvest, not extract.",
              "Conventional models move surplus away from the people who made it. The useful question is not what premium was paid — it is how much came back. Profit-sharing and origin reinvestment funds answer it in a way a premium never has to.",
              "Reinvestment is a reportable field, not a press release. What returns to origin is recorded and auditable.",
            ],
          ] as const
        ).map(([code, title, body, onsheet]) => (
          <div key={code} className="grid gap-4 border-t border-hairline py-5 md:grid-cols-[88px_1fr]">
            <p className="pt-1 font-mono text-xs tracking-widest text-oxblood">{code}</p>
            <div>
              <p className="overline-label mb-1">Position</p>
              <h3 className="font-display text-xl">{title}</h3>
              <p className="mt-2 max-w-prose">{body}</p>
              <div className="mt-3 border-l-2 border-oxblood pl-3">
                <p className="overline-label mb-1">On the sheet</p>
                <p className="text-sm">{onsheet}</p>
              </div>
            </div>
          </div>
        ))}
      </Sheet>

      <Sheet kicker="Section 03 — Method" sheet="Sheet 4 of 5">
        <p className="folio-meta mb-3">Section 03 — Method</p>
        <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
          From published lot to standing relationship.
        </h2>
        <ol className="mt-6">
          {(
            [
              ["01 · Publish", "The lot goes on record", "Importers and exporters publish lots with verified metrics instead of adjectives."],
              ["02 · Sample", "Sample kits ship on their own", "Qualified interest triggers fulfillment. No chasing, no spreadsheet of who received what."],
              ["03 · Cup", "Feedback arrives structured", "Guided evaluation four days after delivery. Comparable data, not a thumbs-up in a thread."],
              ["04 · Match", "The shortlist lands while the palate is warm", "Within two hours of feedback, lots matched to what they just described liking."],
              ["05 · Return", "Reorder rhythm and peer referral", "Reorder timing follows actual consumption. Roasters who are having a good year introduce the ones who should be."],
            ] as const
          ).map(([tag, title, body]) => (
            <li key={tag} className="grid gap-2 border-b border-hairline py-4 first:border-t md:grid-cols-[110px_1fr]">
              <p className="font-mono text-xs tracking-widest text-oxblood">{tag}</p>
              <div>
                <h3 className="font-display text-lg">{title}</h3>
                <p className="text-sm">{body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 border-l-[3px] border-oxblood bg-recessed/60 px-5 py-4">
          <p className="overline-label mb-2">The same ledger, pointed at origin</p>
          <p className="max-w-prose text-sm">
            Auctum Ledger keeps a tamper-evident, hash-chained log of every consequential action —
            price changes, data revisions, consent events. That machinery exists for audit
            readiness. It works just as well as proof that a reinvestment commitment was honored.
          </p>
        </div>
      </Sheet>

      <Sheet kicker="Section 04 — Access" sheet="Sheet 5 of 5">
        <p className="folio-meta mb-3">Section 04 — Access</p>
        <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
          Roasters aren't the ones who should pay to be found.
        </h2>
        <p className="mt-4 max-w-prose">
          Discovery is free on the demand side by design. Density of good roasters is what makes
          the supply side worth subscribing to — so we don't tax it.
        </p>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-lg">For roasters</h3>
            <ul className="mt-2">
              {[
                ["Cupper — browse verified lots, alerts, a quarterly kit at cost", "Free"],
                ["Roaster Pro — unlimited alerts, price locks, peer benchmarking", "$49/mo"],
                ["Roaster Business — multi-site, API read, exportable ESG audits", "$149/mo"],
              ].map(([a, b]) => (
                <li key={a} className="flex justify-between gap-3 border-b border-hairline py-2 text-sm">
                  <span>{a}</span>
                  <span className="shrink-0 font-mono text-ink-soft">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg">For importers & exporters</h3>
            <ul className="mt-2">
              {[
                ["Exporter — 40 active lots, nurture suite, sample routing", "$499/mo"],
                ["Import House — unlimited lots, lead scoring, retention alerts", "$1,499/mo"],
                ["Enterprise Trading Co. — pricing engines, API federation, CSM", "$4,000+/mo"],
              ].map(([a, b]) => (
                <li key={a} className="flex justify-between gap-3 border-b border-hairline py-2 text-sm">
                  <span>{a}</span>
                  <span className="shrink-0 font-mono text-ink-soft">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="max-w-md font-display text-2xl leading-snug">
            Bring the spreadsheets and the PDF price lists. We'll turn them into a record.
          </p>
          <Link to="/ledger">
            <Button size="lg">Open the ledger</Button>
          </Link>
        </div>
        <p className="mt-6 font-mono text-[11px] leading-relaxed text-ink-soft">
          Built for cross-border trade: GDPR, CCPA, PIPL, and LGPD. SOC 2 Type II controls and a
          tamper-evident audit ledger. True-price floor $3.00/lb. Trust scores travel with every
          profile.
        </p>
      </Sheet>
    </main>
  );
}
