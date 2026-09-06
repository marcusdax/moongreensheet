import type { Account, DocumentRecord, Lot, TrustBand, TrustComponents } from "./types";

export function trustBand(score: number): TrustBand {
  if (score >= 90) return "sealed";
  if (score >= 75) return "verified";
  if (score >= 55) return "established";
  if (score >= 35) return "provisional";
  return "at-risk";
}

export function bandLabel(band: TrustBand) {
  switch (band) {
    case "sealed":
      return "Sealed";
    case "verified":
      return "Verified";
    case "established":
      return "Established";
    case "provisional":
      return "Provisional";
    case "at-risk":
      return "At Risk";
  }
}

export function clampScore(n: number) {
  return Math.max(0, Math.min(100, Math.round(n * 10) / 10));
}

export function composeScore(c: TrustComponents) {
  return clampScore(
    c.documents * 0.35 +
      c.transactions * 0.25 +
      c.quality * 0.2 +
      c.identity * 0.12 +
      c.network * 0.08,
  );
}

const DOC_WEIGHT: Record<string, number> = {
  sca_lab_report: 18,
  contract: 16,
  phytosanitary: 12,
  certificate_of_origin: 12,
  warehouse_receipt: 10,
  invoice: 8,
  cupping_form: 10,
  packing_list: 6,
};

export function accountComponents(
  account: Account,
  documents: DocumentRecord[],
): TrustComponents {
  const accepted = documents.filter(
    (d) => d.accountId === account.id && d.status === "accepted",
  );
  const docPts = Math.min(
    100,
    accepted.reduce((s, d) => s + (DOC_WEIGHT[d.type] ?? 8), 0),
  );
  const txn =
    account.orders === 0
      ? 48
      : clampScore(52 + account.orders * 4 - Math.min(account.daysSinceOrder, 180) * 0.12);
  const quality = clampScore(88 - account.churnRisk * 40);
  const identity = clampScore(
    40 +
      (account.kind === "import_house" || account.kind === "trader" ? 18 : 10) +
      Math.min(account.kits, 8) * 3,
  );
  const network = clampScore(45 + account.engagements6mo * 3.2);
  return {
    documents: clampScore(docPts === 0 ? 42 : 48 + docPts * 0.5),
    transactions: txn,
    quality,
    identity,
    network,
  };
}

export function lotComponents(
  lot: Lot,
  supplier: Account | undefined,
  documents: DocumentRecord[],
  supplierScore: number,
): TrustComponents {
  const accepted = documents.filter(
    (d) => d.lotId === lot.id && d.status === "accepted",
  );
  const density = Math.min(100, accepted.length * 22);
  const claimedDelta =
    lot.claimedScore != null ? Math.abs(lot.claimedScore - lot.cupScore) : 0;
  const quality = clampScore(92 - claimedDelta * 8 - (lot.moisture > 12.5 ? 10 : 0));
  const identity = clampScore(
    50 + (supplier ? Math.min(supplier.orders, 12) * 2 : 0),
  );
  return {
    documents: clampScore(38 + density * 0.55),
    transactions: clampScore(supplierScore * 0.92),
    quality,
    identity,
    network: clampScore(50 + lot.esg * 0.35),
  };
}

export function formatCents(cents: number, currency: "USD" | "VND" = "USD") {
  if (currency === "VND") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(cents);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export function formatLbs(n: number) {
  return `${n.toLocaleString()} lb`;
}
