//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-f3Fb-CtW.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/crm",
			"/ecosystem",
			"/ledger",
			"/scan",
			"/the-craft",
			"/trust"
		],
		preloads: [
			"/assets/index-CtwbLVi4.js",
			"/assets/cn-DPOkVml8.js",
			"/assets/react-uuv_Ab9B.js",
			"/assets/link-g5KIHeAP.js",
			"/assets/preload-helper-CfOVM9k2.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-CtwbLVi4.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-DhgB5Agr.js", "/assets/ui-Bu3tsX7E.js"]
	},
	"/crm": {
		filePath: "/workspace/src/routes/crm.tsx",
		children: ["/crm/$accountId"],
		preloads: [
			"/assets/crm-yNohv_bU.js",
			"/assets/trust-UhOmnpis.js",
			"/assets/ui-Bu3tsX7E.js"
		]
	},
	"/ecosystem": {
		filePath: "/workspace/src/routes/ecosystem.tsx",
		children: void 0,
		preloads: ["/assets/ecosystem-CLD43O0F.js", "/assets/ui-Bu3tsX7E.js"]
	},
	"/ledger": {
		filePath: "/workspace/src/routes/ledger.tsx",
		children: ["/ledger/$lotId"],
		preloads: [
			"/assets/ledger-DbBdxuQW.js",
			"/assets/trust-UhOmnpis.js",
			"/assets/ui-Bu3tsX7E.js"
		]
	},
	"/scan": {
		filePath: "/workspace/src/routes/scan.tsx",
		children: void 0,
		preloads: [
			"/assets/scan-CoEn7goo.js",
			"/assets/trust-UhOmnpis.js",
			"/assets/ui-Bu3tsX7E.js"
		]
	},
	"/the-craft": {
		filePath: "/workspace/src/routes/the-craft.tsx",
		children: void 0,
		preloads: ["/assets/the-craft-BrIgErLb.js", "/assets/ui-Bu3tsX7E.js"]
	},
	"/trust": {
		filePath: "/workspace/src/routes/trust.tsx",
		children: void 0,
		preloads: [
			"/assets/trust-9qSxRydN.js",
			"/assets/trust-UhOmnpis.js",
			"/assets/ui-Bu3tsX7E.js"
		]
	},
	"/crm/$accountId": {
		filePath: "/workspace/src/routes/crm.$accountId.tsx",
		children: void 0,
		preloads: ["/assets/crm._accountId-CpoQ0D4d.js"]
	},
	"/ledger/$lotId": {
		filePath: "/workspace/src/routes/ledger.$lotId.tsx",
		children: void 0,
		preloads: ["/assets/ledger._lotId-B8krC9Sk.js"]
	}
} });
//#endregion
export { tsrStartManifest };
