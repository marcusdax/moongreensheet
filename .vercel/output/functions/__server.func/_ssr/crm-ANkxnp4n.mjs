import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as scoreAccount, l as formatCents, o as useLedger } from "./router-DxWtTkGe.mjs";
import { n as StatusChip, r as TrustBadge } from "./trust-C1cV9E_E.mjs";
import { r as Plate } from "./ui-DMwjh6z4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm-ANkxnp4n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lifeTone = {
	active: "sage",
	trial: "brass",
	dormant: "warn",
	churned: "danger"
};
function CrmPage() {
	const accounts = useLedger((s) => s.accounts);
	const documents = useLedger((s) => s.documents);
	const interventions = useLedger((s) => s.interventions);
	const [kind, setKind] = (0, import_react.useState)("all");
	const [life, setLife] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => {
		return accounts.filter((a) => kind === "all" ? true : a.kind === kind).filter((a) => life === "all" ? true : a.lifecycle === life).map((a) => ({
			a,
			trust: scoreAccount(a, documents)
		})).sort((x, y) => y.a.churnRisk - x.a.churnRisk);
	}, [
		accounts,
		documents,
		kind,
		life
	]);
	const wtr = accounts.filter((a) => a.kind === "roaster" && a.daysSinceOrder <= 7).length;
	const highRisk = accounts.filter((a) => a.churnRisk >= .7).length;
	const pending = interventions.filter((i) => i.outcome === "pending").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "folio-meta",
				children: "Folio 04 — CRM"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "Relationship ledger"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-ink-soft",
				children: "Roasters, exporters, and houses on one file. Hazard, LTV, kits, and Trust travel with the account. Weekly transacting roasters is the north star."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "WTR (7-day)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-3xl tabular",
						children: wtr
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "Hazard ≥ 0.70"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-3xl tabular text-danger",
						children: highRisk
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "Open interventions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-3xl tabular",
						children: pending
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: kind,
					onChange: (e) => setKind(e.target.value),
					className: "h-11 rounded-md border border-interactive bg-raised px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All kinds"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "roaster",
							children: "Roasters"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "exporter",
							children: "Exporters"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "import_house",
							children: "Import houses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "trader",
							children: "Traders"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: life,
					onChange: (e) => setLife(e.target.value),
					className: "h-11 rounded-md border border-interactive bg-raised px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All lifecycle"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "trial",
							children: "Trial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "active",
							children: "Active"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "dormant",
							children: "Dormant"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "churned",
							children: "Churned"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto rounded-lg border border-hairline bg-raised",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[760px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-recessed text-xs uppercase tracking-widest text-ink-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Kind"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Lifecycle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Hazard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Trust"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "LTV"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Last order"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map(({ a, trust }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-hairline hover:bg-hover/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/crm/$accountId",
									params: { accountId: a.id },
									className: "font-medium text-ink underline-offset-2 hover:underline",
									children: a.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-ink-soft",
									children: [
										a.city,
										", ",
										a.country,
										" · ",
										a.segment
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ink-soft",
								children: a.kind.replace("_", " ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
									tone: lifeTone[a.lifecycle],
									children: a.lifecycle
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: a.churnRisk >= .7 ? "font-mono tabular text-danger" : "font-mono tabular",
									children: a.churnRisk.toFixed(2)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, { score: trust })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono tabular",
								children: formatCents(a.ltvCents)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono text-ink-soft",
								children: a.daysSinceOrder >= 900 ? "—" : `${a.daysSinceOrder}d`
							})
						]
					}, a.id)) })]
				})
			})
		]
	});
}
//#endregion
export { CrmPage as component };
