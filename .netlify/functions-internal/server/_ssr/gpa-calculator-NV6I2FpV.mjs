import { o as __toESM } from "../_runtime.mjs";
import { i as round, r as gradeFor, t as GRADE_SCALE } from "./gpa-f9nDyudN.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { l as Plus, n as Trash2 } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-Cv-_C-Q6.mjs";
import { n as Label, t as Input } from "./label-B4tEvPJJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gpa-calculator-NV6I2FpV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function newRow() {
	return {
		id: Math.random().toString(36).slice(2),
		name: "",
		credits: "3",
		grade: "A"
	};
}
function GpaCalculatorPage() {
	const [rows, setRows] = (0, import_react.useState)(() => [
		newRow(),
		newRow(),
		newRow()
	]);
	const result = (0, import_react.useMemo)(() => {
		let points = 0;
		let credits = 0;
		for (const r of rows) {
			const c = Number(r.credits);
			const g = GRADE_SCALE.find((x) => x.grade === r.grade);
			if (!Number.isFinite(c) || c <= 0 || !g) continue;
			points += c * g.point;
			credits += c;
		}
		return {
			gpa: credits > 0 ? points / credits : 0,
			credits,
			points
		};
	}, [rows]);
	function update(id, patch) {
		setRows((prev) => prev.map((r) => r.id === id ? {
			...r,
			...patch
		} : r));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-14 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold sm:text-4xl",
				children: "Semester GPA Calculator"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted-foreground",
				children: "Add each course with its credit hours and the grade you expect. GPA is credit-weighted on the 4.0 scale."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-5 sm:p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-[1fr_110px_120px_44px] sm:items-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: `n-${r.id}`,
										className: i === 0 ? "" : "sr-only sm:not-sr-only sm:sr-only",
										children: "Course"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: `n-${r.id}`,
										value: r.name,
										onChange: (e) => update(r.id, { name: e.target.value }),
										placeholder: `Course ${i + 1}`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: `c-${r.id}`,
										className: i === 0 ? "" : "sr-only",
										children: "Credits"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: `c-${r.id}`,
										type: "number",
										min: 0,
										step: .5,
										value: r.credits,
										onChange: (e) => update(r.id, { credits: e.target.value })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: `g-${r.id}`,
										className: i === 0 ? "" : "sr-only",
										children: "Grade"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: `g-${r.id}`,
										value: r.grade,
										onChange: (e) => update(r.id, { grade: e.target.value }),
										className: "h-9 w-full rounded-md border border-input bg-background px-3 text-sm",
										children: GRADE_SCALE.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: g.grade,
											children: [
												g.grade,
												" (",
												g.point.toFixed(1),
												")"
											]
										}, g.grade))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Remove course",
									onClick: () => setRows((prev) => prev.length > 1 ? prev.filter((x) => x.id !== r.id) : prev),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
								})
							]
						}, r.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "mt-6",
						onClick: () => setRows((p) => [...p, newRow()]),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add course"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "surface-card h-fit p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
							children: "Semester GPA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-5xl font-bold text-primary",
							children: result.gpa.toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: [
								round(result.credits, 1),
								" credit hours · ",
								round(result.points, 2),
								" grade points"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 rounded-md bg-secondary px-3 py-2 text-sm",
							children: [
								"Approx. letter standing:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: gradeFor(result.gpa / 4 * 100).grade
								})
							]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { GpaCalculatorPage as component };
