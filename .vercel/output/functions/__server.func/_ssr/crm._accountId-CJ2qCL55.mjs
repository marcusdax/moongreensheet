import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as bandLabel, d as trustBand, f as DOC_LABEL, i as scoreAccount, l as formatCents, o as useLedger, r as Route$1, s as accountComponents } from "./router-DxWtTkGe.mjs";
import { n as StatusChip, r as TrustBadge } from "./trust-C1cV9E_E.mjs";
import { n as MetricBar, r as Plate, t as Button } from "./ui-DMwjh6z4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm._accountId-CJ2qCL55.js
var import_jsx_runtime = require_jsx_runtime();
function AccountFile() {
	const { accountId } = Route$1.useParams();
	const accounts = useLedger((s) => s.accounts);
	const lots = useLedger((s) => s.lots);
	const documents = useLedger((s) => s.documents);
	const campaigns = useLedger((s) => s.campaigns);
	const interventions = useLedger((s) => s.interventions);
	const startIntervention = useLedger((s) => s.startIntervention);
	const resolveIntervention = useLedger((s) => s.resolveIntervention);
	const account = accounts.find((a) => a.id === accountId);
	if (!account) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [
			"Account not found.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/crm",
				className: "text-oxblood underline",
				children: "CRM"
			})
		]
	});
	const trust = scoreAccount(account, documents);
	const comps = accountComponents(account, documents);
	const relatedLots = lots.filter((l) => l.supplierId === account.id);
	const docs = documents.filter((d) => d.accountId === account.id);
	const touches = campaigns.filter((c) => c.accountId === account.id);
	const ints = interventions.filter((i) => i.accountId === account.id);
	const band = trustBand(trust);
	const ltvCac = account.cacCents ? account.ltvCents / account.cacCents : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-5xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "folio-meta",
				children: [
					"Account file · ",
					account.kind.replace("_", " "),
					" · ",
					account.segment
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: account.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-ink-soft",
					children: [
						account.contact,
						" · ",
						account.city,
						", ",
						account.country,
						" · ",
						account.size
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
						tone: account.lifecycle === "active" ? "sage" : account.lifecycle === "dormant" ? "warn" : account.lifecycle === "churned" ? "danger" : "brass",
						children: account.lifecycle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
						score: trust,
						size: "md"
					})]
				})]
			}),
			account.churnRisk >= .7 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 border border-danger/30 bg-danger-tint px-4 py-3 text-sm text-danger",
				children: [
					"Churn hazard ",
					account.churnRisk.toFixed(2),
					" crossed the 0.70 threshold. Start an intervention before the next cadence review."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "LTV"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-2xl tabular",
						children: formatCents(account.ltvCents)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "LTV : CAC"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-2xl tabular",
						children: [ltvCac.toFixed(1), "×"]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "Kits / orders"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-2xl tabular",
						children: [
							account.kits,
							" / ",
							account.orders
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "Engagements 6mo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-2xl tabular",
						children: account.engagements6mo
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "overline-label",
						children: ["Trust · ", bandLabel(band)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-5xl tabular",
						children: trust.toFixed(1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Document verification 35%",
								value: comps.documents
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Transaction integrity 25%",
								value: comps.transactions
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Quality consistency 20%",
								value: comps.quality,
								tone: "sage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Identity & longevity 12%",
								value: comps.identity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricBar, {
								label: "Network reputation 8%",
								value: comps.network,
								tone: "brass"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overline-label",
						children: "COF sequence"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: [
							"COF-001",
							"COF-002",
							"COF-003",
							"COF-004",
							"COF-005"
						].map((code) => {
							const t = touches.find((c) => c.code === code);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between border-b border-hairline py-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: code
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-ink-soft",
									children: t ? `${t.status} · ${t.at}` : "idle"
								})]
							}, code);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-ink-soft",
						children: "Trigger: sample_kit.delivered → COF-001. Feedback gates COF-002+."
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Interventions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"email_campaign",
							"sales_call",
							"discount_offer",
							"survey"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => startIntervention(account.id, t),
							children: t.replace("_", " ")
						}, t))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 divide-y divide-hairline border-y border-hairline",
					children: ints.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-4 text-ink-soft",
						children: "No interventions on file."
					}) : ints.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							i.type.replace("_", " "),
							" · ",
							i.started
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
								tone: i.outcome === "pending" ? "warn" : i.outcome === "retained" ? "sage" : "danger",
								children: i.outcome
							}), i.outcome === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => resolveIntervention(i.id, "retained"),
								children: "Retain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => resolveIntervention(i.id, "churned"),
								children: "Churned"
							})] }) : null]
						})]
					}, i.id))
				})]
			}),
			relatedLots.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Lots on this file"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3",
					children: relatedLots.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-hairline py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/ledger/$lotId",
							params: { lotId: l.id },
							className: "text-oxblood underline",
							children: [
								l.farm,
								" · ",
								l.varietal,
								" · ",
								l.cupScore.toFixed(1)
							]
						})
					}, l.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Documents"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/scan",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							children: "Upload verification"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-hairline border-y border-hairline",
					children: docs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-4 text-ink-soft",
						children: "No documents."
					}) : docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							DOC_LABEL[d.type],
							" · ",
							d.filename
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-ink-soft",
							children: d.status
						})]
					}, d.id))
				})]
			})
		]
	});
}
//#endregion
export { AccountFile as component };
