import { createFileRoute } from "@tanstack/react-router";
import { Button, Plate } from "@/components/ui";
import { StatusChip } from "@/components/trust";
import { DOC_LABEL } from "@/lib/data";
import { useLedger } from "@/lib/store";
import type { DocType, DocumentRecord } from "@/lib/types";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/scan")({ component: ScanPage });

const TYPES: DocType[] = [
  "sca_lab_report",
  "contract",
  "phytosanitary",
  "certificate_of_origin",
  "warehouse_receipt",
  "invoice",
  "cupping_form",
  "packing_list",
];

function sampleFields(type: DocType, lotLabel: string): DocumentRecord["fields"] {
  if (type === "sca_lab_report") {
    return {
      sampleId: { value: "VN-2026-0847", confidence: 0.96 },
      lotCode: { value: lotLabel, confidence: 0.91 },
      cupScore: { value: "86.5", confidence: 0.94 },
      moisturePercent: { value: "10.8", confidence: 0.88 },
      waterActivity: { value: "0.52", confidence: 0.72 },
      descriptors: { value: "jasmine, bergamot, brown sugar", confidence: 0.81 },
    };
  }
  if (type === "contract") {
    return {
      seller: { value: "Central Highlands Exporters", confidence: 0.9 },
      buyer: { value: "Atlas Roasting Co.", confidence: 0.86 },
      volume: { value: "20 bags / 1,320 lb", confidence: 0.84 },
      unitPrice: { value: "$8.00/lb", confidence: 0.79 },
      incoterms: { value: "FOB Cat Lai", confidence: 0.68 },
    };
  }
  return {
    reference: { value: "VN-PP-55210", confidence: 0.9 },
    origin: { value: "Vietnam · Lam Dong", confidence: 0.87 },
    quantity: { value: "20 bags", confidence: 0.74 },
  };
}

function ScanPage() {
  const lots = useLedger((s) => s.lots);
  const accounts = useLedger((s) => s.accounts);
  const addDocument = useLedger((s) => s.addDocument);
  const acceptDocument = useLedger((s) => s.acceptDocument);
  const rejectDocument = useLedger((s) => s.rejectDocument);

  const [docType, setDocType] = useState<DocType>("sca_lab_report");
  const [lotId, setLotId] = useState(lots[0]?.id ?? "");
  const [accountId, setAccountId] = useState(lots[0]?.supplierId ?? "");
  const [phase, setPhase] = useState<"idle" | "working" | "review">("idle");
  const [draft, setDraft] = useState<DocumentRecord | null>(null);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  const lot = lots.find((l) => l.id === lotId);

  const low = useMemo(() => {
    if (!draft) return [];
    return Object.entries(draft.fields).filter(([, v]) => v.confidence < 0.85);
  }, [draft]);

  function runExtract() {
    setPhase("working");
    setNotice("");
    window.setTimeout(() => {
      const id = `doc-${Date.now()}`;
      const fields = sampleFields(docType, lot?.sampleId ?? "UNLINKED");
      const conf =
        Object.values(fields).reduce((s, f) => s + f.confidence, 0) / Object.keys(fields).length;
      const rec: DocumentRecord = {
        id,
        type: docType,
        status: "review",
        lotId,
        accountId,
        filename: `scan-${docType}.jpg`,
        createdAt: new Date().toISOString().slice(0, 10),
        confidence: conf,
        fields,
      };
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(fields)) next[k] = v.value;
      setDraft(rec);
      setEdits(next);
      setPhase("review");
    }, 1400);
  }

  function accept() {
    if (!draft) return;
    const fields = { ...draft.fields };
    for (const [k, v] of Object.entries(edits)) {
      if (fields[k]) fields[k] = { ...fields[k], value: v };
    }
    const rec = { ...draft, fields, status: "accepted" as const };
    addDocument(rec);
    acceptDocument(rec.id);
    setNotice("Accepted and linked. Trust will recompute on the lot and supplier file.");
    setPhase("idle");
    setDraft(null);
  }

  function reject() {
    if (!draft) return;
    addDocument({ ...draft, status: "rejected" });
    rejectDocument(draft.id);
    setNotice("Rejected. Trust unchanged.");
    setPhase("idle");
    setDraft(null);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="folio-meta">Folio 05 — Document intake</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Scan</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Photograph or drop an SCA report, contract, or warehouse receipt. Fields return with
        confidence. Nothing posts to the ledger until you accept.
      </p>

      {notice ? (
        <p className="mt-4 border border-sage bg-sage-tint px-4 py-3 text-sm text-sage-deep">{notice}</p>
      ) : null}

      {phase !== "review" ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Plate>
            <p className="overline-label">Capture</p>
            <label className="mt-4 block space-y-1.5">
              <span className="overline-label">Document type</span>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as DocType)}
                className="h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {DOC_LABEL[t]}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-4 block space-y-1.5">
              <span className="overline-label">Link to lot</span>
              <select
                value={lotId}
                onChange={(e) => {
                  setLotId(e.target.value);
                  const l = lots.find((x) => x.id === e.target.value);
                  if (l) setAccountId(l.supplierId);
                }}
                className="h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm"
              >
                {lots.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.farm} · {l.sampleId}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-4 block space-y-1.5">
              <span className="overline-label">Counterparty</span>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm"
              >
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-5 rounded-md border border-dashed border-interactive bg-paper px-4 py-10 text-center">
              {phase === "working" ? (
                <p className="font-mono text-sm text-oxblood">OCR in progress…</p>
              ) : (
                <>
                  <p className="text-sm text-ink-soft">
                    Photograph or drop SCA report, contract, or warehouse receipt
                  </p>
                  <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                    <Button onClick={runExtract}>Use sample {DOC_LABEL[docType]}</Button>
                    <label className="inline-flex h-10 cursor-pointer items-center rounded-md border border-interactive px-4 text-sm">
                      Choose file
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={() => runExtract()}
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
          </Plate>
          <Plate className="flex flex-col justify-between">
            <div>
              <p className="overline-label">Review language</p>
              <h2 className="mt-3 font-display text-2xl">Side-by-side, then one accept.</h2>
              <p className="mt-3 max-w-prose text-sm text-ink-soft">
                Confidence ≥ 0.92 with no critical field below 0.85 suggests accept. 0.70–0.91
                requires review. Below 0.70, verify every field. Critical on lab reports: sample
                ID, lot code, cup score, moisture.
              </p>
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-brass-deep">
              Model v1.2 · human accept required
            </p>
          </Plate>
        </div>
      ) : draft ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Plate className="min-h-80">
            <p className="overline-label">Original</p>
            <div className="mt-4 flex min-h-64 items-center justify-center rounded-md border border-hairline bg-paper">
              <div className="max-w-xs p-6 text-center">
                <p className="font-display text-2xl">{DOC_LABEL[draft.type]}</p>
                <p className="mt-2 font-mono text-xs text-ink-soft">{draft.filename}</p>
                <p className="mt-6 text-left font-mono text-[11px] leading-relaxed text-ink-soft">
                  SAMPLE {lot?.sampleId}
                  <br />
                  CUP {lot?.cupScore.toFixed(1)}
                  <br />
                  MOIST {lot?.moisture.toFixed(1)}%
                  <br />
                  ORIGIN {lot?.origin}
                </p>
              </div>
            </div>
          </Plate>
          <Plate>
            <div className="flex items-center justify-between gap-2">
              <p className="overline-label">Extracted fields</p>
              <StatusChip tone={draft.confidence >= 0.85 ? "sage" : "warn"}>
                conf {(draft.confidence * 100).toFixed(0)}%
              </StatusChip>
            </div>
            {low.length ? (
              <p className="mt-3 bg-warning-tint px-3 py-2 text-xs text-warning">
                Low-confidence fields: {low.map(([k]) => k).join(", ")}
              </p>
            ) : null}
            <div className="mt-4 space-y-3">
              {Object.entries(draft.fields).map(([key, field]) => {
                const tone =
                  field.confidence >= 0.85
                    ? "sage"
                    : field.confidence >= 0.7
                      ? "warn"
                      : "danger";
                return (
                  <div key={key} className={field.confidence < 0.7 ? "rounded-md bg-warning-tint p-2" : ""}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="overline-label">{key}</span>
                      <StatusChip tone={tone}>{(field.confidence * 100).toFixed(0)}%</StatusChip>
                    </div>
                    <input
                      value={edits[key] ?? field.value}
                      onChange={(e) => setEdits((s) => ({ ...s, [key]: e.target.value }))}
                      className="h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm"
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button onClick={accept}>Accept & link to lot</Button>
              <Button variant="outline" onClick={reject}>
                Reject
              </Button>
              <Button variant="ghost" onClick={runExtract}>
                Reprocess
              </Button>
            </div>
          </Plate>
        </div>
      ) : null}
    </main>
  );
}
