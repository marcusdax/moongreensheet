import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as DOC_LABEL, o as useLedger } from "./router-DxWtTkGe.mjs";
import { n as StatusChip } from "./trust-C1cV9E_E.mjs";
import { r as Plate, t as Button } from "./ui-DMwjh6z4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scan-DaSIPCen.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPES = [
	"sca_lab_report",
	"contract",
	"phytosanitary",
	"certificate_of_origin",
	"warehouse_receipt",
	"invoice",
	"cupping_form",
	"packing_list"
];
function sampleFields(type, lotLabel) {
	if (type === "sca_lab_report") return {
		sampleId: {
			value: "VN-2026-0847",
			confidence: .96
		},
		lotCode: {
			value: lotLabel,
			confidence: .91
		},
		cupScore: {
			value: "86.5",
			confidence: .94
		},
		moisturePercent: {
			value: "10.8",
			confidence: .88
		},
		waterActivity: {
			value: "0.52",
			confidence: .72
		},
		descriptors: {
			value: "jasmine, bergamot, brown sugar",
			confidence: .81
		}
	};
	if (type === "contract") return {
		seller: {
			value: "Central Highlands Exporters",
			confidence: .9
		},
		buyer: {
			value: "Atlas Roasting Co.",
			confidence: .86
		},
		volume: {
			value: "20 bags / 1,320 lb",
			confidence: .84
		},
		unitPrice: {
			value: "$8.00/lb",
			confidence: .79
		},
		incoterms: {
			value: "FOB Cat Lai",
			confidence: .68
		}
	};
	return {
		reference: {
			value: "VN-PP-55210",
			confidence: .9
		},
		origin: {
			value: "Vietnam · Lam Dong",
			confidence: .87
		},
		quantity: {
			value: "20 bags",
			confidence: .74
		}
	};
}
function ScanPage() {
	const lots = useLedger((s) => s.lots);
	const accounts = useLedger((s) => s.accounts);
	const addDocument = useLedger((s) => s.addDocument);
	const acceptDocument = useLedger((s) => s.acceptDocument);
	const rejectDocument = useLedger((s) => s.rejectDocument);
	const [docType, setDocType] = (0, import_react.useState)("sca_lab_report");
	const [lotId, setLotId] = (0, import_react.useState)(lots[0]?.id ?? "");
	const [accountId, setAccountId] = (0, import_react.useState)(lots[0]?.supplierId ?? "");
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [edits, setEdits] = (0, import_react.useState)({});
	const [notice, setNotice] = (0, import_react.useState)("");
	const lot = lots.find((l) => l.id === lotId);
	const low = (0, import_react.useMemo)(() => {
		if (!draft) return [];
		return Object.entries(draft.fields).filter(([, v]) => v.confidence < .85);
	}, [draft]);
	function runExtract() {
		setPhase("working");
		setNotice("");
		window.setTimeout(() => {
			const id = `doc-${Date.now()}`;
			const fields = sampleFields(docType, lot?.sampleId ?? "UNLINKED");
			const conf = Object.values(fields).reduce((s, f) => s + f.confidence, 0) / Object.keys(fields).length;
			const rec = {
				id,
				type: docType,
				status: "review",
				lotId,
				accountId,
				filename: `scan-${docType}.jpg`,
				createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				confidence: conf,
				fields
			};
			const next = {};
			for (const [k, v] of Object.entries(fields)) next[k] = v.value;
			setDraft(rec);
			setEdits(next);
			setPhase("review");
		}, 1400);
	}
	function accept() {
		if (!draft) return;
		const fields = { ...draft.fields };
		for (const [k, v] of Object.entries(edits)) if (fields[k]) fields[k] = {
			...fields[k],
			value: v
		};
		const rec = {
			...draft,
			fields,
			status: "accepted"
		};
		addDocument(rec);
		acceptDocument(rec.id);
		setNotice("Accepted and linked. Trust will recompute on the lot and supplier file.");
		setPhase("idle");
		setDraft(null);
	}
	function reject() {
		if (!draft) return;
		addDocument({
			...draft,
			status: "rejected"
		});
		rejectDocument(draft.id);
		setNotice("Rejected. Trust unchanged.");
		setPhase("idle");
		setDraft(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-5xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "folio-meta",
				children: "Folio 05 — Document intake"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "Scan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-ink-soft",
				children: "Photograph or drop an SCA report, contract, or warehouse receipt. Fields return with confidence. Nothing posts to the ledger until you accept."
			}),
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 border border-sage bg-sage-tint px-4 py-3 text-sm text-sage-deep",
				children: notice
			}) : null,
			phase !== "review" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "Capture"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "overline-label",
							children: "Document type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: docType,
							onChange: (e) => setDocType(e.target.value),
							className: "h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm",
							children: TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t,
								children: DOC_LABEL[t]
							}, t))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "overline-label",
							children: "Link to lot"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: lotId,
							onChange: (e) => {
								setLotId(e.target.value);
								const l = lots.find((x) => x.id === e.target.value);
								if (l) setAccountId(l.supplierId);
							},
							className: "h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm",
							children: lots.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: l.id,
								children: [
									l.farm,
									" · ",
									l.sampleId
								]
							}, l.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "overline-label",
							children: "Counterparty"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: accountId,
							onChange: (e) => setAccountId(e.target.value),
							className: "h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm",
							children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: a.id,
								children: a.name
							}, a.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 rounded-md border border-dashed border-interactive bg-paper px-4 py-10 text-center",
						children: phase === "working" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm text-oxblood",
							children: "OCR in progress…"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ink-soft",
							children: "Photograph or drop SCA report, contract, or warehouse receipt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: runExtract,
								children: ["Use sample ", DOC_LABEL[docType]]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex h-10 cursor-pointer items-center rounded-md border border-interactive px-4 text-sm",
								children: ["Choose file", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/*,.pdf",
									className: "hidden",
									onChange: () => runExtract()
								})]
							})]
						})] })
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, {
					className: "flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "overline-label",
							children: "Review language"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl",
							children: "Side-by-side, then one accept."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-prose text-sm text-ink-soft",
							children: "Confidence ≥ 0.92 with no critical field below 0.85 suggests accept. 0.70–0.91 requires review. Below 0.70, verify every field. Critical on lab reports: sample ID, lot code, cup score, moisture."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-mono text-xs uppercase tracking-widest text-brass-deep",
						children: "Model v1.2 · human accept required"
					})]
				})]
			}) : draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, {
					className: "min-h-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "Original"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex min-h-64 items-center justify-center rounded-md border border-hairline bg-paper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-xs p-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl",
									children: DOC_LABEL[draft.type]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-mono text-xs text-ink-soft",
									children: draft.filename
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-6 text-left font-mono text-[11px] leading-relaxed text-ink-soft",
									children: [
										"SAMPLE ",
										lot?.sampleId,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"CUP ",
										lot?.cupScore.toFixed(1),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"MOIST ",
										lot?.moisture.toFixed(1),
										"%",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"ORIGIN ",
										lot?.origin
									]
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "overline-label",
							children: "Extracted fields"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusChip, {
							tone: draft.confidence >= .85 ? "sage" : "warn",
							children: [
								"conf ",
								(draft.confidence * 100).toFixed(0),
								"%"
							]
						})]
					}),
					low.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 bg-warning-tint px-3 py-2 text-xs text-warning",
						children: ["Low-confidence fields: ", low.map(([k]) => k).join(", ")]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-3",
						children: Object.entries(draft.fields).map(([key, field]) => {
							const tone = field.confidence >= .85 ? "sage" : field.confidence >= .7 ? "warn" : "danger";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: field.confidence < .7 ? "rounded-md bg-warning-tint p-2" : "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "overline-label",
										children: key
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusChip, {
										tone,
										children: [(field.confidence * 100).toFixed(0), "%"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: edits[key] ?? field.value,
									onChange: (e) => setEdits((s) => ({
										...s,
										[key]: e.target.value
									})),
									className: "h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm"
								})]
							}, key);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: accept,
								children: "Accept & link to lot"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: reject,
								children: "Reject"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: runExtract,
								children: "Reprocess"
							})
						]
					})
				] })]
			}) : null
		]
	});
}
//#endregion
export { ScanPage as component };
