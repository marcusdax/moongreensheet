import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Plate } from "@/components/ui";

export const Route = createFileRoute("/the-craft")({ component: TheCraft });

function TheCraft() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <p className="folio-meta">Folio 02 — The Craft</p>
      <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight md:text-5xl">
        The craft is verification, practiced as a trade skill.
      </h1>
      <p className="mt-5 max-w-prose font-display text-xl leading-snug text-ink-soft">
        Auctum Ledger does not decorate a lot with adjectives. It records the work that made the
        lot possible, then asks the operator to confirm what the camera and the lab already
        claimed.
      </p>

      <div className="double-rule my-10" />

      <section className="space-y-8">
        <article>
          <h2 className="font-display text-2xl">Human in the loop is not a fallback</h2>
          <p className="mt-3 max-w-prose">
            Document intake photographs an SCA report, a contract, a phytosanitary certificate, or
            a warehouse receipt. A vision model returns structured fields with per-field
            confidence. Nothing writes to the ledger until an authenticated operator accepts.
            Trust moves only on accepted evidence. A blurry upload does not punish the counterparty.
          </p>
        </article>
        <article>
          <h2 className="font-display text-2xl">Honesty that travels</h2>
          <p className="mt-3 max-w-prose">
            Trust Score is a continuous 0–100 signal attached to every roaster, exporter, and
            derived lot. It is never reset by a subscription upgrade. Document verification
            carries 35% of the weight; transaction integrity, quality consistency, identity, and
            network reputation complete the model. Bands — Sealed, Verified, Established,
            Provisional, At Risk — govern friction, not vanity.
          </p>
        </article>
        <article>
          <h2 className="font-display text-2xl">The cup as a check, not a brand story</h2>
          <p className="mt-3 max-w-prose">
            Cup scores are unrounded, Agtron 55–60, three-cupper panels. Moisture sits in the
            11.0–12.5% acceptance band. When a claimed 88 meets an accepted lab of 81.5, quality
            consistency falls. The lot still exists. The record simply tells the truth.
          </p>
        </article>
        <article>
          <h2 className="font-display text-2xl">True-price floor</h2>
          <p className="mt-3 max-w-prose">
            Household subsistence, farm operating costs, resilience, infrastructure, and debt
            service compose a $3.00/lb floor. When the market falls, the floor does not. Payments
            settle in 3 / 5 / 7 business days and are never clawed back. Quality upside — Fine
            Robusta at $5.70, Java Arabica at $8.00 — sits on top of survival, not in place of it.
          </p>
        </article>
      </section>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Plate>
          <p className="overline-label">Evidence types</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>SCA / Q lab report</li>
            <li>Contract of sale</li>
            <li>Phytosanitary certificate</li>
            <li>Certificate of origin</li>
            <li>Warehouse receipt · packing list · invoice</li>
          </ul>
        </Plate>
        <Plate>
          <p className="overline-label">Operator rule</p>
          <p className="mt-3 font-display text-2xl leading-snug">
            No financial or quality record is created without an explicit accept.
          </p>
          <Link to="/scan" className="mt-4 inline-block">
            <Button>Open the scanner</Button>
          </Link>
        </Plate>
      </div>
    </main>
  );
}
