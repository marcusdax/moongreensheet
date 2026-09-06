import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as scoreLot, c as bandLabel, d as trustBand, i as scoreAccount, o as useLedger } from "./router-DxWtTkGe.mjs";
import { r as TrustBadge } from "./trust-C1cV9E_E.mjs";
import { n as MetricBar, r as Plate } from "./ui-DMwjh6z4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trust-PTN22NRP.js
var import_jsx_runtime = require_jsx_runtime();
function TrustPage() {
	const accounts = useLedger((s) => s.accounts);
	const lots = useLedger((s) => s.lots);
	const documents = useLedger((s) => s.documents);
	const ranked = accounts.map((a) => ({
		a,
		trust: scoreAccount(a, documents)
	})).sort((x, y) => y.trust - x.trust);
	const lotRanked = lots.map((l) => ({
		l,
		trust: scoreLot(l, accounts, documents),
		docs: documents.filter((d) => d.lotId === l.id && d.status === "accepted").length
	})).sort((x, y) => y.trust - x.trust);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-5xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "folio-meta",
				children: "Folio 06 — Trust"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "Honesty that stays with the file"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-ink-soft",
				children: "Trust Score ∈ [0, 100]. New counterparties start at 50. Evidence moves the number; commercial tiers do not. Model v1.2 — weights versioned with every snapshot."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 overflow-x-auto rounded-lg border border-hairline bg-raised",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-recessed text-xs uppercase tracking-widest text-ink-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Band"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Score"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Effect"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
						[
							"Sealed",
							"90–100",
							"Fast-path settlement. Preferred in Navigator ranking."
						],
						[
							"Verified",
							"75–89.9",
							"Standard flow. Badge on lots and profiles."
						],
						[
							"Established",
							"55–74.9",
							"Normal review. OCR still required for material claims."
						],
						[
							"Provisional",
							"35–54.9",
							"Extra document gates. Payment holds possible."
						],
						[
							"At Risk",
							"0–34.9",
							"Manual review. Limited public catalog visibility."
						]
					].map(([a, b, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-hairline",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-medium",
								children: a
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono tabular",
								children: b
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ink-soft",
								children: c
							})
						]
					}, a)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 md:grid-cols-5",
				children: [
					[
						"Documents",
						"35%",
						"Accepted OCR evidence"
					],
					[
						"Transactions",
						"25%",
						"Settlement hygiene"
					],
					[
						"Quality",
						"20%",
						"Cup vs claimed"
					],
					[
						"Identity",
						"12%",
						"Age, KYC, lots"
					],
					[
						"Network",
						"8%",
						"Peer-weighted"
					]
				].map(([t, w, s]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "overline-label",
							children: t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-2xl",
							children: w
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-ink-soft",
							children: s
						})
					]
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Counterparty scores"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-hairline border-y border-hairline",
					children: ranked.map(({ a, trust }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/crm/$accountId",
							params: { accountId: a.id },
							className: "font-medium hover:underline",
							children: a.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-ink-soft",
							children: [
								bandLabel(trustBand(trust)),
								" · ",
								a.kind.replace("_", " ")
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
							score: trust,
							size: "md"
						})]
					}, a.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Lot scores"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-4",
					children: lotRanked.map(({ l, trust, docs }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/ledger/$lotId",
								params: { lotId: l.id },
								className: "font-medium hover:underline",
								children: [
									l.farm,
									" · ",
									l.varietal
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-ink-soft",
								children: [
									docs,
									" accepted documents",
									docs === 0 ? " · add evidence" : ""
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, { score: trust })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Trust",
								value: trust,
								tone: trust >= 90 ? "brass" : trust >= 75 ? "sage" : trust < 35 ? "danger" : "oxblood"
							})
						})]
					}, l.id))
				})]
			})
		]
	});
}
//#endregion
export { TrustPage as component };
