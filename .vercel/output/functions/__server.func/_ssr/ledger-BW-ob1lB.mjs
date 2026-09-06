import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as scoreLot, l as formatCents, o as useLedger, p as cn, u as formatLbs } from "./router-DxWtTkGe.mjs";
import { n as StatusChip, r as TrustBadge, t as CupScoreBadge } from "./trust-C1cV9E_E.mjs";
import { n as MetricBar, r as Plate, t as Button } from "./ui-DMwjh6z4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger-BW-ob1lB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LotCard({ lot, trust, rank, overBudget }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, {
		className: cn("flex flex-col gap-4 transition-shadow duration-200 hover:shadow-e3", overBudget && "border-2 border-warning"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-recessed font-mono text-sm font-bold text-ink-soft",
					children: rank
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-sans text-lg font-semibold text-ink",
								children: [lot.origin, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-ink-soft",
									children: [" · ", lot.varietal]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { children: lot.process }),
							overBudget ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
								tone: "warn",
								children: "Over budget"
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-ink-soft",
						children: [
							lot.farm,
							" · ",
							lot.producer,
							" · ",
							lot.elevationM,
							" m · safra ",
							lot.harvest
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono tabular text-ink",
						children: [formatCents(lot.pricePerLbCents), "/lb"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CupScoreBadge, { score: lot.cupScore }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono tabular",
						children: [
							"ESG ",
							lot.esg,
							"%"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono tabular",
						children: formatLbs(lot.availableLbs)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["ETA ", lot.eta] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, { score: trust })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: lot.flavor.slice(0, 5).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-6 rounded-full border border-hairline bg-raised px-2 text-xs text-ink-soft",
					children: f
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
						label: "Cost",
						value: Math.round((1 - lot.costPerLbCents / Math.max(lot.pricePerLbCents, 1)) * 100)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
						label: "Quality",
						value: lot.cupScore,
						tone: "sage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
						label: "ESG",
						value: lot.esg,
						tone: "sage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
						label: "Trust",
						value: trust,
						tone: trust >= 90 ? "brass" : trust >= 75 ? "sage" : trust < 35 ? "danger" : "oxblood"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-ink-soft",
					children: [
						"Sample ",
						lot.sampleId,
						lot.certifications.length ? ` · ${lot.certifications.join(" · ")}` : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ledger/$lotId",
					params: { lotId: lot.id },
					className: "inline-flex h-8 items-center rounded-md bg-oxblood px-3 text-sm font-semibold text-raised hover:bg-oxblood-deep",
					children: "Source this lot"
				})]
			})
		]
	});
}
function LedgerPage() {
	const lots = useLedger((s) => s.lots);
	const accounts = useLedger((s) => s.accounts);
	const documents = useLedger((s) => s.documents);
	const budget = useLedger((s) => s.budgetCents);
	const minCup = useLedger((s) => s.minCup);
	const setBudget = useLedger((s) => s.setBudget);
	const setMinCup = useLedger((s) => s.setMinCup);
	const [origin, setOrigin] = (0, import_react.useState)("all");
	const [process, setProcess] = (0, import_react.useState)("all");
	const [includeOver, setIncludeOver] = (0, import_react.useState)(true);
	const [q, setQ] = (0, import_react.useState)("");
	const origins = (0, import_react.useMemo)(() => ["all", ...Array.from(new Set(lots.map((l) => l.country)))], [lots]);
	const ranked = (0, import_react.useMemo)(() => {
		return lots.map((lot) => {
			return {
				lot,
				trust: scoreLot(lot, accounts, documents),
				over: lot.pricePerLbCents > budget
			};
		}).filter(({ lot, over }) => {
			if (lot.cupScore < minCup) return false;
			if (!includeOver && over) return false;
			if (origin !== "all" && lot.country !== origin) return false;
			if (process !== "all" && lot.process !== process) return false;
			if (q) {
				if (!`${lot.farm} ${lot.origin} ${lot.varietal} ${lot.producer}`.toLowerCase().includes(q.toLowerCase())) return false;
			}
			return true;
		}).sort((a, b) => {
			const aBoost = a.trust >= 75 && a.lot.cupScore >= 85 ? 4 : 0;
			const bBoost = b.trust >= 75 && b.lot.cupScore >= 85 ? 4 : 0;
			return b.lot.cupScore + b.trust * .08 + bBoost - (a.lot.cupScore + a.trust * .08 + aBoost);
		});
	}, [
		lots,
		accounts,
		documents,
		budget,
		minCup,
		includeOver,
		origin,
		process,
		q
	]);
	const needsVerify = lots.filter((l) => documents.filter((d) => d.lotId === l.id && d.status === "accepted").length === 0).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "folio-meta",
					children: "Folio 03 — The Ledger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl tracking-tight",
					children: "Navigator"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-xl text-ink-soft",
					children: [
						"Compare lots on like-for-like terms. Trust sits beside cup score.",
						" ",
						needsVerify,
						" lots still need verification documents."
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-sm text-ink-soft",
				children: [
					ranked.length,
					" positions · budget ",
					formatCents(budget),
					"/lb"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-[260px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-fit rounded-lg border border-hairline bg-raised p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label mb-4",
						children: "Filters"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "overline-label",
							children: "Search"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Farm, origin, varietal",
							className: "h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm focus:border-oxblood focus:outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "overline-label",
							children: [
								"Budget ceiling · ",
								formatCents(budget),
								"/lb"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 300,
							max: 2e3,
							step: 10,
							value: budget,
							onChange: (e) => setBudget(Number(e.target.value)),
							className: "w-full accent-oxblood"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "overline-label",
							children: ["Min cup score · ", minCup.toFixed(0)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 70,
							max: 92,
							step: .25,
							value: minCup,
							onChange: (e) => setMinCup(Number(e.target.value)),
							className: "w-full accent-oxblood"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "overline-label",
							children: "Origin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: origin,
							onChange: (e) => setOrigin(e.target.value),
							className: "h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm",
							children: origins.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: o,
								children: o === "all" ? "All origins" : o
							}, o))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "overline-label",
							children: "Process"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: process,
							onChange: (e) => setProcess(e.target.value),
							className: "h-10 w-full rounded-md border border-interactive bg-raised px-3 text-sm",
							children: [
								"all",
								"washed",
								"natural",
								"honey",
								"anaerobic",
								"carbonic"
							].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p,
								children: p
							}, p))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: includeOver,
							onChange: (e) => setIncludeOver(e.target.checked),
							className: "accent-oxblood"
						}), "Include over-budget lots"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "mt-3 px-0",
						onClick: () => {
							setBudget(1200);
							setMinCup(80);
							setOrigin("all");
							setProcess("all");
							setQ("");
							setIncludeOver(true);
						},
						children: "Clear filters"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: ranked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border border-hairline bg-raised p-8 text-ink-soft",
					children: "No lots match this filter. Loosen cup score or budget."
				}) : ranked.map(({ lot, trust, over }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotCard, {
					lot,
					trust,
					rank: i + 1,
					overBudget: over
				}, lot.id))
			})]
		})]
	});
}
//#endregion
export { LedgerPage as component };
