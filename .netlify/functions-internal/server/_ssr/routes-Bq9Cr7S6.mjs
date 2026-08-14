import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { C as Calculator, _ as Gauge, a as ShieldCheck, i as Sparkles, o as ScanLine, v as FileText, w as ArrowRight, y as FileImage } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-Cv-_C-Q6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bq9Cr7S6.js
var import_jsx_runtime = require_jsx_runtime();
var campus_hero_default = "/assets/campus-hero-C-22vnKF.jpg";
var STEPS = [
	{
		icon: FileImage,
		title: "Upload marks screenshot",
		text: "Your LMS gradebook for a single course."
	},
	{
		icon: FileText,
		title: "Upload evaluation screenshot",
		text: "The course marks-distribution policy."
	},
	{
		icon: ScanLine,
		title: "AI extracts & matches",
		text: "Every mark is mapped to its weighted category."
	},
	{
		icon: Gauge,
		title: "Review & calculate",
		text: "Verify the data, then get grade, GPA and scenarios."
	}
];
var FEATURES = [
	{
		icon: Sparkles,
		title: "Evaluation-aware scoring",
		text: "Automatically applies Top 2, Top 3, Top 4 and average rules whenever your evaluation mentions them."
	},
	{
		icon: Calculator,
		title: "Theory & Lab support",
		text: "Quizzes, assignments, labs, viva, project, mid term and final are each weighted separately."
	},
	{
		icon: ShieldCheck,
		title: "Nothing is guessed",
		text: "Only what appears in your own screenshots is used. Every analysis runs fresh — no reused data."
	}
];
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero-surface relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: campus_hero_default,
				alt: "University campus building with students",
				className: "absolute inset-0 h-full w-full object-cover opacity-20",
				loading: "eager"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-in fade-in slide-in-from-bottom-4 duration-700",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide",
							children: "For University of Central Punjab students"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl",
							children: "Turn your LMS marks into an accurate GPA."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg",
							children: "Upload two screenshots — your marks and your course evaluation. The analyzer reads both, matches every assessment to its weightage and calculates your percentage, grade and grade point exactly the way your course is evaluated."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/analyze",
									children: ["Analyze my marks ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "border-white/40 bg-white/10 hover:bg-white/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/gpa-calculator",
									children: "Manual GPA calculator"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/20 pt-8",
							children: [
								["2", "Screenshots"],
								["4.0", "Scale"],
								["Theory + Lab", "Supported"]
							].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-2xl font-semibold",
								children: value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-xs uppercase tracking-wide text-white/70",
								children: label
							})] }, label))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wide text-white/70",
							children: "Sample workflow"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-5 space-y-5",
							children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/15 text-sm font-semibold",
									children: i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-semibold",
									children: s.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm text-white/70",
									children: s.text
								})] })]
							}, s.title))
						})]
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold sm:text-4xl",
					children: "Built around how UCP actually grades"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Every course has its own marks distribution. Instead of assuming one formula, the analyzer reads your course evaluation and follows it."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-3",
				children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "surface-card p-6 transition-shadow hover:shadow-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 text-lg font-semibold",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: f.text
						})
					]
				}, f.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold sm:text-4xl",
					children: "How it works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-6 w-6 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-3xl font-bold text-border",
									children: ["0", i + 1]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-base font-semibold",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: s.text
							})
						]
					}, s.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold sm:text-3xl",
					children: "Ready to see where you stand?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm text-muted-foreground",
					children: "It takes under a minute. Your screenshots are analyzed for this session only and results stay on your device."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/analyze",
						children: ["Start analysis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
					})
				})]
			})
		})
	] });
}
//#endregion
export { Index as component };
