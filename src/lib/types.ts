export type ProcessMethod =
  | "washed"
  | "natural"
  | "honey"
  | "anaerobic"
  | "carbonic";

export type TrustBand =
  | "sealed"
  | "verified"
  | "established"
  | "provisional"
  | "at-risk";

export type Lifecycle = "trial" | "active" | "dormant" | "churned";

export type AccountKind = "roaster" | "exporter" | "import_house" | "trader";

export type Segment = "micro" | "boutique" | "commercial" | "supply";

export type DocType =
  | "sca_lab_report"
  | "contract"
  | "phytosanitary"
  | "certificate_of_origin"
  | "warehouse_receipt"
  | "invoice"
  | "cupping_form"
  | "packing_list";

export type DocStatus =
  | "pending"
  | "review"
  | "accepted"
  | "rejected";

export type TrustComponents = {
  documents: number;
  transactions: number;
  quality: number;
  identity: number;
  network: number;
};

export type Lot = {
  id: string;
  farm: string;
  producer: string;
  origin: string;
  region: string;
  country: string;
  varietal: string;
  species: string;
  process: ProcessMethod;
  elevationM: number;
  cupScore: number;
  moisture: number;
  waterActivity: number;
  pricePerLbCents: number;
  costPerLbCents: number;
  availableLbs: number;
  bags: number;
  harvest: string;
  eta: string;
  flavor: string[];
  esg: number;
  logistics: number;
  certifications: string[];
  supplierId: string;
  sampleId: string;
  claimedScore?: number;
};

export type Account = {
  id: string;
  name: string;
  kind: AccountKind;
  segment: Segment;
  size: string;
  city: string;
  country: string;
  contact: string;
  email: string;
  lifecycle: Lifecycle;
  churnRisk: number;
  ltvCents: number;
  cacCents: number;
  lastActivity: string;
  kits: number;
  orders: number;
  engagements6mo: number;
  daysSinceOrder: number;
  paybackMonths: number;
};

export type DocumentRecord = {
  id: string;
  type: DocType;
  status: DocStatus;
  lotId?: string;
  accountId?: string;
  filename: string;
  createdAt: string;
  confidence: number;
  fields: Record<string, { value: string; confidence: number }>;
};

export type Intervention = {
  id: string;
  accountId: string;
  type: "email_campaign" | "sales_call" | "discount_offer" | "survey";
  started: string;
  outcome: "pending" | "retained" | "churned";
};

export type CampaignTouch = {
  id: string;
  accountId: string;
  code: "COF-001" | "COF-002" | "COF-003" | "COF-004" | "COF-005";
  status: "queued" | "sent" | "opened" | "clicked" | "converted";
  at: string;
};
