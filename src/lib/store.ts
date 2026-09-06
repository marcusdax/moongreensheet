import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ACCOUNTS, CAMPAIGNS, DOCUMENTS, INTERVENTIONS, LOTS } from "./data";
import type {
  Account,
  CampaignTouch,
  DocumentRecord,
  Intervention,
  Lot,
} from "./types";
import { accountComponents, composeScore, lotComponents } from "./trust";

type LedgerState = {
  lots: Lot[];
  accounts: Account[];
  documents: DocumentRecord[];
  interventions: Intervention[];
  campaigns: CampaignTouch[];
  budgetCents: number;
  minCup: number;
  ready: boolean;
  markReady: () => void;
  setBudget: (n: number) => void;
  setMinCup: (n: number) => void;
  acceptDocument: (id: string) => void;
  rejectDocument: (id: string) => void;
  addDocument: (doc: DocumentRecord) => void;
  startIntervention: (accountId: string, type: Intervention["type"]) => void;
  resolveIntervention: (id: string, outcome: Intervention["outcome"]) => void;
};

export function scoreAccount(account: Account, documents: DocumentRecord[]) {
  return composeScore(accountComponents(account, documents));
}

export function scoreLot(
  lot: Lot,
  accounts: Account[],
  documents: DocumentRecord[],
) {
  const supplier = accounts.find((a) => a.id === lot.supplierId);
  const supplierScore = supplier ? scoreAccount(supplier, documents) : 50;
  return composeScore(lotComponents(lot, supplier, documents, supplierScore));
}

export const useLedger = create<LedgerState>()(
  persist(
    (set, get) => ({
      lots: LOTS,
      accounts: ACCOUNTS,
      documents: DOCUMENTS,
      interventions: INTERVENTIONS,
      campaigns: CAMPAIGNS,
      budgetCents: 1200,
      minCup: 80,
      ready: false,
      markReady: () => set({ ready: true }),
      setBudget: (n) => set({ budgetCents: n }),
      setMinCup: (n) => set({ minCup: n }),
      acceptDocument: (id) =>
        set({
          documents: get().documents.map((d) =>
            d.id === id ? { ...d, status: "accepted" as const } : d,
          ),
        }),
      rejectDocument: (id) =>
        set({
          documents: get().documents.map((d) =>
            d.id === id ? { ...d, status: "rejected" as const } : d,
          ),
        }),
      addDocument: (doc) => {
        const exists = get().documents.some((d) => d.id === doc.id);
        if (exists) {
          set({
            documents: get().documents.map((d) => (d.id === doc.id ? doc : d)),
          });
          return;
        }
        set({ documents: [doc, ...get().documents] });
      },
      startIntervention: (accountId, type) =>
        set({
          interventions: [
            {
              id: `int-${Date.now()}`,
              accountId,
              type,
              started: new Date().toISOString().slice(0, 10),
              outcome: "pending",
            },
            ...get().interventions,
          ],
        }),
      resolveIntervention: (id, outcome) =>
        set({
          interventions: get().interventions.map((i) =>
            i.id === id ? { ...i, outcome } : i,
          ),
        }),
    }),
    { name: "auctum-ledger-v1", skipHydration: true },
  ),
);
