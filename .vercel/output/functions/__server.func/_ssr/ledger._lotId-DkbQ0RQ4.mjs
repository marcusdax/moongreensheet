import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as scoreLot, c as bandLabel, d as trustBand, f as DOC_LABEL, i as scoreAccount, l as formatCents, n as Route, o as useLedger, s as accountComponents, u as formatLbs } from "./router-DxWtTkGe.mjs";
import { n as StatusChip, r as TrustBadge, t as CupScoreBadge } from "./trust-C1cV9E_E.mjs";
import { n as MetricBar, r as Plate, t as Button } from "./ui-DMwjh6z4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger._lotId-DkbQ0RQ4.js
var import_jsx_runtime = require_jsx_runtime();
function LotDetail() {
	const { lotId } = Route.useParams();
	const lots = useLedger((s) => s.lots);
	const accounts = useLedger((s) => s.accounts);
	const documents = useLedger((s) => s.documents);
	const lot = lots.find((l) => l.id === lotId);
	if (!lot) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lot not found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/ledger",
			className: "text-oxblood underline",
			children: "Return to navigator"
		})]
	});
	const supplier = accounts.find((a) => a.id === lot.supplierId);
	const trust = scoreLot(lot, accounts, documents);
	const supplierTrust = supplier ? scoreAccount(supplier, documents) : 50;
	const comps = supplier ? accountComponents(supplier, documents) : {
		documents: 50,
		transactions: 50,
		quality: 50,
		identity: 50,
		network: 50
	};
	const lotDocs = documents.filter((d) => d.lotId === lot.id);
	const band = trustBand(trust);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-5xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "folio-meta",
				children: ["Lot record · ", lot.sampleId]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: [lot.farm, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-ink-soft",
						children: [" · ", lot.varietal]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-ink-soft",
					children: [
						lot.origin,
						" · ",
						lot.species,
						" · ",
						lot.elevationM,
						" m · ",
						lot.process,
						" · safra ",
						lot.harvest
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CupScoreBadge, {
						score: lot.cupScore,
						size: "md"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
						score: trust,
						size: "md"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "overline-label",
							children: "Price"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-mono text-2xl tabular",
							children: [formatCents(lot.pricePerLbCents), "/lb"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-ink-soft",
							children: ["Floor ", formatCents(lot.costPerLbCents)]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "overline-label",
							children: "Position"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-2xl tabular",
							children: formatLbs(lot.availableLbs)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-ink-soft",
							children: [
								lot.bags,
								" bags · ETA ",
								lot.eta
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "overline-label",
							children: "Moisture"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-mono text-2xl tabular",
							children: [lot.moisture.toFixed(1), "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-ink-soft",
							children: ["aw ", lot.waterActivity.toFixed(2)]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "overline-label",
							children: "Trust band"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-2xl",
							children: bandLabel(band)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-ink-soft",
							children: ["Supplier ", supplier?.name]
						})
					] })
				]
			}),
			lot.claimedScore != null && Math.abs(lot.claimedScore - lot.cupScore) >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 border border-warning bg-warning-tint px-4 py-3 text-sm text-warning",
				children: [
					"Claimed cup ",
					lot.claimedScore.toFixed(1),
					" versus recorded ",
					lot.cupScore.toFixed(1),
					". Quality consistency is reduced until a lab report is accepted."
				]
			}) : null,
			band === "provisional" || band === "at-risk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 border border-danger/30 bg-danger-tint px-4 py-3 text-sm text-danger",
				children: [
					"Trust ",
					trust.toFixed(1),
					" — ",
					bandLabel(band),
					": additional verified documents recommended before large settlement."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "Sensory"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: lot.flavor.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-hairline px-3 py-1 text-sm",
							children: f
						}, f))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "ESG",
								value: lot.esg,
								tone: "sage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Logistics",
								value: lot.logistics
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Document density",
								value: comps.documents
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Quality consistency",
								value: comps.quality,
								tone: "sage"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: lot.certifications.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							tone: "sage",
							children: c
						}, c))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "Supplier trust"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-4xl tabular",
						children: supplierTrust.toFixed(1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink-soft",
						children: supplier?.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Documents",
								value: comps.documents
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Transactions",
								value: comps.transactions
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Quality",
								value: comps.quality,
								tone: "sage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Network",
								value: comps.network,
								tone: "brass"
							})
						]
					}),
					supplier ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/crm/$accountId",
						params: { accountId: supplier.id },
						className: "mt-4 inline-block text-sm text-oxblood underline",
						children: "Open supplier file"
					}) : null
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Evidence"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/scan",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							children: "Attach evidence"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 divide-y divide-hairline border-y border-hairline",
					children: lotDocs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "py-6 text-ink-soft",
						children: [
							"No documents on this lot.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/scan",
								className: "text-oxblood underline",
								children: "Add evidence"
							})
						]
					}) : lotDocs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: DOC_LABEL[d.type]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-ink-soft",
							children: [
								d.filename,
								" · ",
								d.createdAt,
								" · conf ",
								(d.confidence * 100).toFixed(0),
								"%"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							tone: d.status === "accepted" ? "sage" : d.status === "rejected" ? "danger" : "warn",
							children: d.status
						})]
					}, d.id))
				})]
			})
		]
	});
}
//#endregion
export { LotDetail as component };
