import { o as __toESM } from "../_runtime.mjs";
import { i as round } from "./gpa-f9nDyudN.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { l as Plus, n as Trash2 } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-Cv-_C-Q6.mjs";
import { n as Label, t as Input } from "./label-B4tEvPJJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cgpa-calculator-CfKRa0_G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function newSem(n) {
	return {
		id: Math.random().toString(36).slice(2),
		label: `Semester ${n}`,
		gpa: "",
		credits: ""
	};
}
function CgpaCalculatorPage() {
	const [sems, setSems] = (0, import_react.useState)(() => [newSem(1), newSem(2)]);
	const [targetCgpa, setTargetCgpa] = (0, import_react.useState)("3.50");
	const [nextCredits, setNextCredits] = (0, import_react.useState)("15");
	const totals = (0, import_react.useMemo)(() => {
		let points = 0;
		let credits = 0;
		for (const s of sems) {
			const g = Number(s.gpa);
			const c = Number(s.credits);
			if (!Number.isFinite(g) || !Number.isFinite(c) || c <= 0 || g < 0 || g > 4) continue;
			points += g * c;
			credits += c;
		}
		return {
			cgpa: credits > 0 ? points / credits : 0,
			credits,
			points
		};
	}, [sems]);
	const required = (0, import_react.useMemo)(() => {
		const t = Number(targetCgpa);
		const nc = Number(nextCredits);
		if (!Number.isFinite(t) || !Number.isFinite(nc) || nc <= 0) return null;
		return (t * (totals.credits + nc) - totals.points) / nc;
	}, [
		targetCgpa,
		nextCredits,
		totals
	]);
	function update(id, patch) {
		setSems((prev) => prev.map((s) => s.id === id ? {
			...s,
			...patch
		} : s));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-14 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold sm:text-4xl",
				children: "CGPA Calculator"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted-foreground",
				children: "Enter the GPA and credit hours of each completed semester to get your cumulative CGPA, then plan the GPA you need next semester."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-5 sm:p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: sems.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-[1fr_120px_120px_44px] sm:items-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: `l-${s.id}`,
										className: i === 0 ? "" : "sr-only",
										children: "Semester"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: `l-${s.id}`,
										value: s.label,
										onChange: (e) => update(s.id, { label: e.target.value })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: `gp-${s.id}`,
										className: i === 0 ? "" : "sr-only",
										children: "GPA"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: `gp-${s.id}`,
										type: "number",
										min: 0,
										max: 4,
										step: .01,
										placeholder: "3.40",
										value: s.gpa,
										onChange: (e) => update(s.id, { gpa: e.target.value })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: `cr-${s.id}`,
										className: i === 0 ? "" : "sr-only",
										children: "Credits"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: `cr-${s.id}`,
										type: "number",
										min: 0,
										step: .5,
										placeholder: "15",
										value: s.credits,
										onChange: (e) => update(s.id, { credits: e.target.value })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Remove semester",
									onClick: () => setSems((prev) => prev.length > 1 ? prev.filter((x) => x.id !== s.id) : prev),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
								})
							]
						}, s.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "mt-6",
						onClick: () => setSems((p) => [...p, newSem(p.length + 1)]),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add semester"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Cumulative CGPA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-5xl font-bold text-primary",
								children: totals.cgpa.toFixed(2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: [round(totals.credits, 1), " total credit hours"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card space-y-4 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "Target planner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "target",
									children: "Target CGPA"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "target",
									type: "number",
									step: .01,
									min: 0,
									max: 4,
									value: targetCgpa,
									onChange: (e) => setTargetCgpa(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ncredits",
									children: "Next semester credits"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ncredits",
									type: "number",
									step: .5,
									min: 0,
									value: nextCredits,
									onChange: (e) => setNextCredits(e.target.value)
								})]
							}),
							required !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-md bg-secondary px-3 py-3 text-sm",
								children: required > 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Not reachable next semester — a GPA of ",
									required.toFixed(2),
									" would be required."
								] }) : required <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "You are already above this target." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"You need a GPA of ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: required.toFixed(2)
									}),
									" next semester."
								] })
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { CgpaCalculatorPage as component };
