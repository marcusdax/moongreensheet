import { i as __toESM } from "../_runtime.mjs";
import { _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DxWtTkGe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function AuctumSeal({ size = 86, numeral }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 100 100",
		role: "img",
		"aria-label": "Auctum seal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "50",
				r: "47",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.2",
				className: "text-ink",
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "50",
				r: "38",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "0.6",
				className: "text-ink",
				opacity: "0.45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "50",
				cy: "50",
				rx: "16",
				ry: "23",
				fill: "none",
				stroke: "currentColor",
				className: "text-oxblood",
				strokeWidth: "2.2",
				transform: "rotate(-18 50 50)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M50 28 C42 38 58 46 50 50 C42 54 58 62 50 72",
				fill: "none",
				stroke: "currentColor",
				className: "text-oxblood",
				strokeWidth: "2.2",
				strokeLinecap: "round"
			}),
			numeral ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "50",
				y: "92",
				textAnchor: "middle",
				fill: "currentColor",
				className: "text-ink",
				fontFamily: "Georgia, serif",
				fontSize: "7",
				children: numeral
			}) : null
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var LOTS = [
	{
		id: "vn-future-farm-082",
		farm: "Future Farm",
		producer: "Toi Nguyen",
		origin: "Dak Lak, Vietnam",
		region: "Central Highlands",
		country: "Vietnam",
		varietal: "Fine Robusta",
		species: "Coffea canephora",
		process: "washed",
		elevationM: 720,
		cupScore: 82.75,
		moisture: 11.4,
		waterActivity: .54,
		pricePerLbCents: 570,
		costPerLbCents: 300,
		availableLbs: 2640,
		bags: 40,
		harvest: "2026",
		eta: "12 Oct 2026",
		flavor: [
			"cocoa",
			"cedar",
			"brown sugar",
			"black pepper"
		],
		esg: 81,
		logistics: 74,
		certifications: ["4C", "EUDR file"],
		supplierId: "acc-chex",
		sampleId: "VN-2026-0827"
	},
	{
		id: "vn-vuong-java-086",
		farm: "Vuong Family Farms",
		producer: "Vuong family",
		origin: "Lac Duong, Vietnam",
		region: "Lam Dong",
		country: "Vietnam",
		varietal: "Java",
		species: "Coffea arabica var. Java",
		process: "washed",
		elevationM: 1480,
		cupScore: 86,
		moisture: 10.9,
		waterActivity: .52,
		pricePerLbCents: 800,
		costPerLbCents: 410,
		availableLbs: 1320,
		bags: 20,
		harvest: "2026",
		eta: "04 Nov 2026",
		flavor: [
			"jasmine",
			"bergamot",
			"cane sugar",
			"stone fruit"
		],
		esg: 88,
		logistics: 69,
		certifications: ["Organic", "EUDR file"],
		supplierId: "acc-chex",
		sampleId: "VN-2026-0860"
	},
	{
		id: "vn-kho-honey-084",
		farm: "K'Ho Cooperative",
		producer: "K'Ho Co-op",
		origin: "Lac Duong, Vietnam",
		region: "Lam Dong",
		country: "Vietnam",
		varietal: "Catimor",
		species: "Coffea arabica",
		process: "honey",
		elevationM: 1550,
		cupScore: 84.5,
		moisture: 11.1,
		waterActivity: .53,
		pricePerLbCents: 640,
		costPerLbCents: 335,
		availableLbs: 1980,
		bags: 30,
		harvest: "2026",
		eta: "18 Oct 2026",
		flavor: [
			"guava",
			"honey",
			"cacao nib",
			"floral"
		],
		esg: 91,
		logistics: 62,
		certifications: ["Fair Trade", "Bird-Friendly"],
		supplierId: "acc-kho",
		sampleId: "VN-2026-0845"
	},
	{
		id: "vn-caudat-gesha-090",
		farm: "Cau Dat Station",
		producer: "Da Lat Research Plot",
		origin: "Cau Dat, Vietnam",
		region: "Lam Dong",
		country: "Vietnam",
		varietal: "Gesha",
		species: "Coffea arabica",
		process: "washed",
		elevationM: 1650,
		cupScore: 90.5,
		moisture: 10.6,
		waterActivity: .51,
		pricePerLbCents: 1840,
		costPerLbCents: 920,
		availableLbs: 396,
		bags: 6,
		harvest: "2026",
		eta: "22 Nov 2026",
		flavor: [
			"jasmine",
			"bergamot",
			"white peach",
			"honey"
		],
		esg: 86,
		logistics: 58,
		certifications: ["Organic"],
		supplierId: "acc-sih",
		sampleId: "VN-2026-0905"
	},
	{
		id: "vn-eahleo-rob-081",
		farm: "Ea H'leo Block",
		producer: "Collector network",
		origin: "Ea H'leo, Vietnam",
		region: "Dak Lak",
		country: "Vietnam",
		varietal: "Robusta",
		species: "Coffea canephora",
		process: "washed",
		elevationM: 580,
		cupScore: 81.25,
		moisture: 11.8,
		waterActivity: .55,
		pricePerLbCents: 420,
		costPerLbCents: 300,
		availableLbs: 5280,
		bags: 80,
		harvest: "2026",
		eta: "02 Oct 2026",
		flavor: [
			"dark chocolate",
			"walnut",
			"earth"
		],
		esg: 72,
		logistics: 81,
		certifications: ["4C"],
		supplierId: "acc-chex",
		sampleId: "VN-2026-0812",
		claimedScore: 84
	},
	{
		id: "vn-dalat-ana-085",
		farm: "Da Lat Anaerobic Cellar",
		producer: "Nguyen sisters",
		origin: "Da Lat, Vietnam",
		region: "Lam Dong",
		country: "Vietnam",
		varietal: "Bourbon",
		species: "Coffea arabica",
		process: "anaerobic",
		elevationM: 1500,
		cupScore: 85.5,
		moisture: 11,
		waterActivity: .52,
		pricePerLbCents: 920,
		costPerLbCents: 480,
		availableLbs: 792,
		bags: 12,
		harvest: "2026",
		eta: "09 Nov 2026",
		flavor: [
			"tropical",
			"winey",
			"cocoa",
			"clove"
		],
		esg: 79,
		logistics: 64,
		certifications: ["EUDR file"],
		supplierId: "acc-sih",
		sampleId: "VN-2026-0855"
	},
	{
		id: "et-sidama-nat-087",
		farm: "Bensa smallholders",
		producer: "Bensa union",
		origin: "Sidama, Ethiopia",
		region: "Sidama",
		country: "Ethiopia",
		varietal: "Heirloom",
		species: "Coffea arabica",
		process: "natural",
		elevationM: 1950,
		cupScore: 87.75,
		moisture: 10.8,
		waterActivity: .52,
		pricePerLbCents: 760,
		costPerLbCents: 390,
		availableLbs: 1848,
		bags: 28,
		harvest: "2025/26",
		eta: "28 Sep 2026",
		flavor: [
			"blueberry",
			"jasmine",
			"bergamot",
			"cocoa"
		],
		esg: 84,
		logistics: 71,
		certifications: ["Organic", "Rainforest Alliance"],
		supplierId: "acc-sih",
		sampleId: "ET-2026-0877"
	},
	{
		id: "co-huila-wash-086",
		farm: "Finca La Palma",
		producer: "Restrepo family",
		origin: "Huila, Colombia",
		region: "Huila",
		country: "Colombia",
		varietal: "Caturra",
		species: "Coffea arabica",
		process: "washed",
		elevationM: 1750,
		cupScore: 86.25,
		moisture: 11.2,
		waterActivity: .53,
		pricePerLbCents: 520,
		costPerLbCents: 280,
		availableLbs: 2376,
		bags: 36,
		harvest: "2026",
		eta: "15 Oct 2026",
		flavor: [
			"panela",
			"red apple",
			"cocoa",
			"floral"
		],
		esg: 83,
		logistics: 77,
		certifications: ["Rainforest Alliance"],
		supplierId: "acc-sih",
		sampleId: "CO-24-A01"
	},
	{
		id: "vn-gialai-nat-080",
		farm: "Gia Lai Natural Yard",
		producer: "Unlinked lots",
		origin: "Gia Lai, Vietnam",
		region: "Gia Lai",
		country: "Vietnam",
		varietal: "Robusta",
		species: "Coffea canephora",
		process: "natural",
		elevationM: 620,
		cupScore: 80.5,
		moisture: 12.4,
		waterActivity: .58,
		pricePerLbCents: 380,
		costPerLbCents: 300,
		availableLbs: 3960,
		bags: 60,
		harvest: "2026",
		eta: "08 Oct 2026",
		flavor: [
			"dried fruit",
			"wood",
			"cocoa"
		],
		esg: 61,
		logistics: 70,
		certifications: [],
		supplierId: "acc-newco",
		sampleId: "VN-2026-0805",
		claimedScore: 86
	},
	{
		id: "vn-lamdong-carb-088",
		farm: "Lang Biang Cell",
		producer: "Lam Dong station",
		origin: "Lac Duong, Vietnam",
		region: "Lam Dong",
		country: "Vietnam",
		varietal: "Typica",
		species: "Coffea arabica",
		process: "carbonic",
		elevationM: 1580,
		cupScore: 88.25,
		moisture: 10.7,
		waterActivity: .51,
		pricePerLbCents: 1280,
		costPerLbCents: 640,
		availableLbs: 528,
		bags: 8,
		harvest: "2026",
		eta: "01 Dec 2026",
		flavor: [
			"lychee",
			"rose",
			"cocoa",
			"lime"
		],
		esg: 85,
		logistics: 60,
		certifications: ["Organic", "EUDR file"],
		supplierId: "acc-kho",
		sampleId: "VN-2026-0882"
	}
];
var ACCOUNTS = [
	{
		id: "acc-atlas",
		name: "Atlas Roasting Co.",
		kind: "roaster",
		segment: "boutique",
		size: "9 staff · 1,400 lb/mo",
		city: "Portland",
		country: "USA",
		contact: "Mira Chen",
		email: "mira@atlasroast.example",
		lifecycle: "active",
		churnRisk: .18,
		ltvCents: 214e4,
		cacCents: 37800,
		lastActivity: "2026-08-29",
		kits: 6,
		orders: 11,
		engagements6mo: 14,
		daysSinceOrder: 18,
		paybackMonths: 4
	},
	{
		id: "acc-harbor",
		name: "Harbor Microroaster",
		kind: "roaster",
		segment: "micro",
		size: "3 staff · 280 lb/mo",
		city: "Halifax",
		country: "Canada",
		contact: "Eli Park",
		email: "eli@harbor.example",
		lifecycle: "trial",
		churnRisk: .41,
		ltvCents: 42e4,
		cacCents: 25e3,
		lastActivity: "2026-08-21",
		kits: 1,
		orders: 0,
		engagements6mo: 4,
		daysSinceOrder: 999,
		paybackMonths: 9
	},
	{
		id: "acc-northline",
		name: "Northline Coffee",
		kind: "roaster",
		segment: "commercial",
		size: "4 sites · 6,200 lb/mo",
		city: "Chicago",
		country: "USA",
		contact: "Dana Ruiz",
		email: "dana@northline.example",
		lifecycle: "dormant",
		churnRisk: .76,
		ltvCents: 91e5,
		cacCents: 25e4,
		lastActivity: "2026-05-12",
		kits: 8,
		orders: 19,
		engagements6mo: 2,
		daysSinceOrder: 108,
		paybackMonths: 7
	},
	{
		id: "acc-saigon",
		name: "Saigon Cup Lab",
		kind: "roaster",
		segment: "boutique",
		size: "7 staff · 900 lb/mo",
		city: "Ho Chi Minh City",
		country: "Vietnam",
		contact: "Linh Tran",
		email: "linh@saigoncup.example",
		lifecycle: "active",
		churnRisk: .22,
		ltvCents: 168e4,
		cacCents: 31e3,
		lastActivity: "2026-08-30",
		kits: 4,
		orders: 7,
		engagements6mo: 11,
		daysSinceOrder: 9,
		paybackMonths: 3
	},
	{
		id: "acc-chex",
		name: "Central Highlands Exporters",
		kind: "exporter",
		segment: "supply",
		size: "28 containers/yr",
		city: "Buon Ma Thuot",
		country: "Vietnam",
		contact: "Pham Duc",
		email: "duc@chex.example",
		lifecycle: "active",
		churnRisk: .11,
		ltvCents: 186e5,
		cacCents: 3e5,
		lastActivity: "2026-08-31",
		kits: 22,
		orders: 41,
		engagements6mo: 18,
		daysSinceOrder: 4,
		paybackMonths: 5
	},
	{
		id: "acc-sih",
		name: "Saigon Import House",
		kind: "import_house",
		segment: "supply",
		size: "44 lots · 3 reps",
		city: "Ho Chi Minh City",
		country: "Vietnam",
		contact: "Hanh Vo",
		email: "hanh@sih.example",
		lifecycle: "active",
		churnRisk: .09,
		ltvCents: 42e6,
		cacCents: 43e4,
		lastActivity: "2026-08-31",
		kits: 31,
		orders: 64,
		engagements6mo: 21,
		daysSinceOrder: 2,
		paybackMonths: 6
	},
	{
		id: "acc-kho",
		name: "K'Ho Highland Co-op",
		kind: "exporter",
		segment: "supply",
		size: "12 containers/yr",
		city: "Lac Duong",
		country: "Vietnam",
		contact: "Y K'Brieng",
		email: "kbrieng@kho.example",
		lifecycle: "active",
		churnRisk: .15,
		ltvCents: 64e5,
		cacCents: 18e4,
		lastActivity: "2026-08-28",
		kits: 9,
		orders: 14,
		engagements6mo: 10,
		daysSinceOrder: 12,
		paybackMonths: 5
	},
	{
		id: "acc-newco",
		name: "Newco Yard Brokers",
		kind: "trader",
		segment: "supply",
		size: "Unverified desk",
		city: "Gia Lai",
		country: "Vietnam",
		contact: "Desk unassigned",
		email: "desk@newco.example",
		lifecycle: "trial",
		churnRisk: .62,
		ltvCents: 21e4,
		cacCents: 9e4,
		lastActivity: "2026-07-02",
		kits: 0,
		orders: 1,
		engagements6mo: 1,
		daysSinceOrder: 64,
		paybackMonths: 14
	}
];
var DOCUMENTS = [
	{
		id: "doc-001",
		type: "sca_lab_report",
		status: "accepted",
		lotId: "vn-vuong-java-086",
		accountId: "acc-chex",
		filename: "SCA-Vuong-Java-086.pdf",
		createdAt: "2026-08-12",
		confidence: .94,
		fields: {
			sampleId: {
				value: "VN-2026-0860",
				confidence: .97
			},
			cupScore: {
				value: "86.0",
				confidence: .96
			},
			moisture: {
				value: "10.9",
				confidence: .91
			}
		}
	},
	{
		id: "doc-002",
		type: "certificate_of_origin",
		status: "accepted",
		lotId: "vn-vuong-java-086",
		accountId: "acc-chex",
		filename: "CoO-LamDong-086.pdf",
		createdAt: "2026-08-14",
		confidence: .91,
		fields: {
			origin: {
				value: "Vietnam · Lam Dong",
				confidence: .93
			},
			quantity: {
				value: "20 bags",
				confidence: .88
			}
		}
	},
	{
		id: "doc-003",
		type: "sca_lab_report",
		status: "accepted",
		lotId: "vn-future-farm-082",
		accountId: "acc-chex",
		filename: "CQI-FutureFarm-082.pdf",
		createdAt: "2026-08-08",
		confidence: .89,
		fields: {
			sampleId: {
				value: "VN-2026-0827",
				confidence: .92
			},
			cupScore: {
				value: "82.75",
				confidence: .9
			}
		}
	},
	{
		id: "doc-004",
		type: "contract",
		status: "accepted",
		lotId: "co-huila-wash-086",
		accountId: "acc-sih",
		filename: "Contract-LaPalma-A01.pdf",
		createdAt: "2026-08-20",
		confidence: .87,
		fields: {
			volume: {
				value: "36 bags",
				confidence: .86
			},
			unitPrice: {
				value: "$5.20/lb",
				confidence: .84
			}
		}
	},
	{
		id: "doc-005",
		type: "phytosanitary",
		status: "accepted",
		lotId: "vn-kho-honey-084",
		accountId: "acc-kho",
		filename: "Phyto-KHo-084.pdf",
		createdAt: "2026-08-18",
		confidence: .9,
		fields: { certNo: {
			value: "VN-PP-44119",
			confidence: .93
		} }
	},
	{
		id: "doc-006",
		type: "warehouse_receipt",
		status: "review",
		lotId: "vn-gialai-nat-080",
		accountId: "acc-newco",
		filename: "WH-GiaLai-080.jpg",
		createdAt: "2026-08-30",
		confidence: .61,
		fields: {
			bags: {
				value: "60",
				confidence: .55
			},
			weight: {
				value: "unclear",
				confidence: .41
			}
		}
	}
];
var INTERVENTIONS = [{
	id: "int-1",
	accountId: "acc-northline",
	type: "sales_call",
	started: "2026-08-04",
	outcome: "pending"
}, {
	id: "int-2",
	accountId: "acc-harbor",
	type: "email_campaign",
	started: "2026-08-22",
	outcome: "pending"
}];
var CAMPAIGNS = [
	{
		id: "c1",
		accountId: "acc-harbor",
		code: "COF-001",
		status: "opened",
		at: "2026-08-22"
	},
	{
		id: "c2",
		accountId: "acc-harbor",
		code: "COF-002",
		status: "queued",
		at: "2026-09-02"
	},
	{
		id: "c3",
		accountId: "acc-atlas",
		code: "COF-005",
		status: "converted",
		at: "2026-07-11"
	},
	{
		id: "c4",
		accountId: "acc-northline",
		code: "COF-004",
		status: "sent",
		at: "2026-08-05"
	},
	{
		id: "c5",
		accountId: "acc-saigon",
		code: "COF-003",
		status: "clicked",
		at: "2026-08-19"
	}
];
var DOC_LABEL = {
	sca_lab_report: "SCA / Q lab report",
	contract: "Contract of sale",
	phytosanitary: "Phytosanitary certificate",
	certificate_of_origin: "Certificate of origin",
	warehouse_receipt: "Warehouse receipt",
	invoice: "Commercial invoice",
	cupping_form: "Cupping form",
	packing_list: "Packing list"
};
function trustBand(score) {
	if (score >= 90) return "sealed";
	if (score >= 75) return "verified";
	if (score >= 55) return "established";
	if (score >= 35) return "provisional";
	return "at-risk";
}
function bandLabel(band) {
	switch (band) {
		case "sealed": return "Sealed";
		case "verified": return "Verified";
		case "established": return "Established";
		case "provisional": return "Provisional";
		case "at-risk": return "At Risk";
	}
}
function clampScore(n) {
	return Math.max(0, Math.min(100, Math.round(n * 10) / 10));
}
function composeScore(c) {
	return clampScore(c.documents * .35 + c.transactions * .25 + c.quality * .2 + c.identity * .12 + c.network * .08);
}
var DOC_WEIGHT = {
	sca_lab_report: 18,
	contract: 16,
	phytosanitary: 12,
	certificate_of_origin: 12,
	warehouse_receipt: 10,
	invoice: 8,
	cupping_form: 10,
	packing_list: 6
};
function accountComponents(account, documents) {
	const accepted = documents.filter((d) => d.accountId === account.id && d.status === "accepted");
	const docPts = Math.min(100, accepted.reduce((s, d) => s + (DOC_WEIGHT[d.type] ?? 8), 0));
	const txn = account.orders === 0 ? 48 : clampScore(52 + account.orders * 4 - Math.min(account.daysSinceOrder, 180) * .12);
	const quality = clampScore(88 - account.churnRisk * 40);
	const identity = clampScore(40 + (account.kind === "import_house" || account.kind === "trader" ? 18 : 10) + Math.min(account.kits, 8) * 3);
	const network = clampScore(45 + account.engagements6mo * 3.2);
	return {
		documents: clampScore(docPts === 0 ? 42 : 48 + docPts * .5),
		transactions: txn,
		quality,
		identity,
		network
	};
}
function lotComponents(lot, supplier, documents, supplierScore) {
	const accepted = documents.filter((d) => d.lotId === lot.id && d.status === "accepted");
	const density = Math.min(100, accepted.length * 22);
	const quality = clampScore(92 - (lot.claimedScore != null ? Math.abs(lot.claimedScore - lot.cupScore) : 0) * 8 - (lot.moisture > 12.5 ? 10 : 0));
	const identity = clampScore(50 + (supplier ? Math.min(supplier.orders, 12) * 2 : 0));
	return {
		documents: clampScore(38 + density * .55),
		transactions: clampScore(supplierScore * .92),
		quality,
		identity,
		network: clampScore(50 + lot.esg * .35)
	};
}
function formatCents(cents, currency = "USD") {
	if (currency === "VND") return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
		maximumFractionDigits: 0
	}).format(cents);
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2
	}).format(cents / 100);
}
function formatLbs(n) {
	return `${n.toLocaleString()} lb`;
}
function scoreAccount(account, documents) {
	return composeScore(accountComponents(account, documents));
}
function scoreLot(lot, accounts, documents) {
	const supplier = accounts.find((a) => a.id === lot.supplierId);
	return composeScore(lotComponents(lot, supplier, documents, supplier ? scoreAccount(supplier, documents) : 50));
}
var useLedger = create()(persist((set, get) => ({
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
	acceptDocument: (id) => set({ documents: get().documents.map((d) => d.id === id ? {
		...d,
		status: "accepted"
	} : d) }),
	rejectDocument: (id) => set({ documents: get().documents.map((d) => d.id === id ? {
		...d,
		status: "rejected"
	} : d) }),
	addDocument: (doc) => {
		if (get().documents.some((d) => d.id === doc.id)) {
			set({ documents: get().documents.map((d) => d.id === doc.id ? doc : d) });
			return;
		}
		set({ documents: [doc, ...get().documents] });
	},
	startIntervention: (accountId, type) => set({ interventions: [{
		id: `int-${Date.now()}`,
		accountId,
		type,
		started: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		outcome: "pending"
	}, ...get().interventions] }),
	resolveIntervention: (id, outcome) => set({ interventions: get().interventions.map((i) => i.id === id ? {
		...i,
		outcome
	} : i) })
}), {
	name: "auctum-ledger-v1",
	skipHydration: true
}));
var NAV = [
	{
		to: "/",
		label: "Cover"
	},
	{
		to: "/the-craft",
		label: "The Craft"
	},
	{
		to: "/ledger",
		label: "The Ledger"
	},
	{
		to: "/crm",
		label: "CRM"
	},
	{
		to: "/scan",
		label: "Scan"
	},
	{
		to: "/trust",
		label: "Trust"
	},
	{
		to: "/ecosystem",
		label: "Ecosystem"
	}
];
function FolioShell() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const markReady = useLedger((s) => s.markReady);
	(0, import_react.useEffect)(() => {
		useLedger.persist.rehydrate();
		markReady();
	}, [markReady]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-raised focus:px-3 focus:py-2",
				children: "Skip to record"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-hairline bg-ink text-raised",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-3 text-raised",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-raised",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuctumSeal, { size: 36 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-lg leading-none tracking-tight",
								children: "Auctum Ledger"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-brass",
								children: "by Auctum"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 lg:flex",
							children: NAV.map((item) => {
								const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									className: cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", active ? "bg-oxblood text-raised" : "text-raised/80 hover:bg-raised/10 hover:text-raised"),
									children: item.label
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex h-11 w-11 items-center justify-center rounded-md border border-raised/20 lg:hidden",
							"aria-expanded": open,
							"aria-label": "Open navigation",
							onClick: () => setOpen((v) => !v),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex flex-col gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-5 bg-raised" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-5 bg-raised" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-5 bg-raised" })
								]
							})
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-raised/15 px-4 py-3 lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: "py-3 text-sm text-raised",
							onClick: () => setOpen(false),
							children: item.label
						}, item.to))
					})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "main",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-hairline bg-raised",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-ink-soft md:flex-row md:items-end md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-base text-ink",
						children: "Auctum Ledger"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "A product of Auctum. Value is co-created, not extracted."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.14em]",
						children: "Folio 2026 · en-US · es-MX · pt-BR · zh-CN"
					})]
				})
			})
		]
	});
}
var styles_default = "/assets/styles-XuDaRmVA.css";
var APP_NAME = "Auctum Ledger";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Auctum Ledger — verified B2B distribution for specialty green coffee. Trust scores, lot records, CRM, and document evidence. Verified, from origin."
			},
			{
				name: "theme-color",
				content: "#221E1B"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolioShell, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$8 = () => import("./routes-BEaNiWrQ.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./crm-ANkxnp4n.mjs");
var Route$7 = createFileRoute("/crm")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./ecosystem-DgMBaEN2.mjs");
var Route$6 = createFileRoute("/ecosystem")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./ledger-BW-ob1lB.mjs");
var Route$5 = createFileRoute("/ledger")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./scan-DaSIPCen.mjs");
var Route$4 = createFileRoute("/scan")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./the-craft-8oUcVXuW.mjs");
var Route$3 = createFileRoute("/the-craft")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./trust-PTN22NRP.mjs");
var Route$2 = createFileRoute("/trust")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./crm._accountId-CJ2qCL55.mjs");
var Route$1 = createFileRoute("/crm/$accountId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./ledger._lotId-DkbQ0RQ4.mjs");
var Route = createFileRoute("/ledger/$lotId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var CrmRoute = Route$7.update({
	id: "/crm",
	path: "/crm",
	getParentRoute: () => Route$9
});
var EcosystemRoute = Route$6.update({
	id: "/ecosystem",
	path: "/ecosystem",
	getParentRoute: () => Route$9
});
var LedgerRoute = Route$5.update({
	id: "/ledger",
	path: "/ledger",
	getParentRoute: () => Route$9
});
var ScanRoute = Route$4.update({
	id: "/scan",
	path: "/scan",
	getParentRoute: () => Route$9
});
var TheCraftRoute = Route$3.update({
	id: "/the-craft",
	path: "/the-craft",
	getParentRoute: () => Route$9
});
var TrustRoute = Route$2.update({
	id: "/trust",
	path: "/trust",
	getParentRoute: () => Route$9
});
var CrmAccountIdRoute = Route$1.update({
	id: "/$accountId",
	path: "/$accountId",
	getParentRoute: () => CrmRoute
});
var LedgerLotIdRoute = Route.update({
	id: "/$lotId",
	path: "/$lotId",
	getParentRoute: () => LedgerRoute
});
var CrmRouteChildren = { CrmAccountIdRoute };
var CrmRouteWithChildren = CrmRoute._addFileChildren(CrmRouteChildren);
var LedgerRouteChildren = { LedgerLotIdRoute };
var rootRouteChildren = {
	IndexRoute,
	CrmRoute: CrmRouteWithChildren,
	EcosystemRoute,
	LedgerRoute: LedgerRoute._addFileChildren(LedgerRouteChildren),
	ScanRoute,
	TheCraftRoute,
	TrustRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { scoreLot as a, bandLabel as c, trustBand as d, DOC_LABEL as f, scoreAccount as i, formatCents as l, AuctumSeal as m, Route as n, useLedger as o, cn as p, Route$1 as r, accountComponents as s, router_exports as t, formatLbs as u };
