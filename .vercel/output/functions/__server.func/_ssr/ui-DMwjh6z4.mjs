import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as cn } from "./router-DxWtTkGe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-DMwjh6z4.js
var import_jsx_runtime = require_jsx_runtime();
function Button({ variant = "primary", size = "md", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-45", {
			primary: "bg-oxblood text-raised hover:bg-oxblood-deep shadow-e1",
			secondary: "bg-ink text-raised hover:bg-ink-soft shadow-e1",
			outline: "border border-interactive text-ink hover:bg-recessed",
			ghost: "text-oxblood hover:bg-recessed underline-offset-4 hover:underline",
			brass: "bg-brass-tint text-ink hover:bg-brass shadow-e1",
			danger: "bg-danger text-raised hover:bg-oxblood-deep"
		}[variant], {
			sm: "h-8 px-3 text-sm",
			md: "h-10 px-4 text-sm",
			lg: "h-12 px-6 text-base"
		}[size], className),
		...props
	});
}
function Plate({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-lg border border-hairline bg-raised p-5 shadow-e1", className),
		children
	});
}
function MetricBar({ label, value, tone = "oxblood" }) {
	const fill = {
		oxblood: "bg-oxblood",
		sage: "bg-sage",
		brass: "bg-brass",
		danger: "bg-danger"
	}[tone];
	const width = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-ink-soft",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-xs tabular text-ink",
			children: Math.round(value)
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 overflow-hidden rounded-full bg-recessed",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-[width] duration-500", fill),
			style: { width: `${width}%` }
		})
	})] });
}
//#endregion
export { MetricBar as n, Plate as r, Button as t };
