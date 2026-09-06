import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as bandLabel, d as trustBand, p as cn } from "./router-DxWtTkGe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trust-C1cV9E_E.js
var import_jsx_runtime = require_jsx_runtime();
var bandClass = {
	sealed: "bg-brass-tint text-ink",
	verified: "bg-sage text-raised",
	established: "bg-oxblood-tint text-oxblood border border-oxblood/30",
	provisional: "bg-ink-soft text-raised",
	"at-risk": "bg-danger-tint text-danger"
};
function TrustBadge({ score, size = "sm", sealed }) {
	const band = trustBand(score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		title: `Trust Score ${score.toFixed(1)} — ${bandLabel(band)}`,
		className: cn("inline-flex items-center gap-1 rounded-full font-mono font-bold tabular", size === "md" ? "h-7 px-3 text-sm" : "h-6 px-2.5 text-xs", bandClass[band]),
		children: [band === "sealed" || sealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "inline-block h-1.5 w-1.5 rounded-full bg-ink"
		}) : null, score.toFixed(1)]
	});
}
function CupScoreBadge({ score, size = "sm" }) {
	const cls = score >= 90 ? "bg-brass-tint text-ink" : score >= 85 ? "bg-oxblood text-raised" : score >= 80 ? "bg-sage text-raised" : "bg-ink-soft text-raised";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		title: `Cup score ${score.toFixed(1)}`,
		className: cn("inline-flex items-center rounded-full font-mono font-bold tabular", size === "md" ? "h-7 px-3 text-sm" : "h-6 px-2.5 text-xs", cls),
		children: [score >= 90 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-1 inline-block h-1.5 w-1.5 rounded-full bg-ink" }) : null, score.toFixed(1)]
	});
}
function StatusChip({ children, tone = "neutral" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-6 items-center rounded-full px-2.5 text-xs", {
			neutral: "bg-recessed text-ink-soft",
			sage: "bg-sage-tint text-sage-deep",
			warn: "bg-warning-tint text-warning",
			danger: "bg-danger-tint text-danger",
			brass: "bg-brass-tint text-brass-deep"
		}[tone]),
		children
	});
}
//#endregion
export { StatusChip as n, TrustBadge as r, CupScoreBadge as t };
