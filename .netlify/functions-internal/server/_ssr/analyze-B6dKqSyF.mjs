import { o as __toESM } from "../_runtime.mjs";
import { i as round, n as computeGpa } from "./gpa-f9nDyudN.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { E as isRedirect, g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { S as CircleAlert, g as History, h as ImageUp, i as Sparkles, l as Plus, m as LoaderCircle, n as Trash2, t as X, x as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./router-Cv-_C-Q6.mjs";
import { i as getServerFnById, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-hsQXeGuc2.mjs";
import { n as analyzeInputSchema } from "./analyze.server-ClZi6SVD.mjs";
import { n as Label, t as Input } from "./label-B4tEvPJJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyze-B6dKqSyF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var RULES = [
	{
		value: "all",
		label: "All (pooled marks)"
	},
	{
		value: "average",
		label: "Average of all"
	},
	{
		value: "top1",
		label: "Best 1"
	},
	{
		value: "top2",
		label: "Top 2"
	},
	{
		value: "top3",
		label: "Top 3"
	},
	{
		value: "top4",
		label: "Top 4"
	},
	{
		value: "top5",
		label: "Top 5"
	}
];
function ReviewEditor({ data, onChange }) {
	function setCategory(index, patch) {
		const categories = data.categories.map((c, i) => i === index ? {
			...c,
			...patch
		} : c);
		onChange({
			...data,
			categories
		});
	}
	function setItem(ci, ii, patch) {
		const cat = data.categories[ci];
		if (!cat) return;
		setCategory(ci, { items: cat.items.map((it, i) => i === ii ? {
			...it,
			...patch
		} : it) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card grid gap-5 p-6 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "student",
							children: "Student name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "student",
							value: data.studentName,
							onChange: (e) => onChange({
								...data,
								studentName: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "course",
							children: "Course name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "course",
							value: data.courseName,
							onChange: (e) => onChange({
								...data,
								courseName: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "ctype",
							children: "Course type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "ctype",
							value: data.courseType,
							onChange: (e) => onChange({
								...data,
								courseType: e.target.value
							}),
							className: "h-9 w-full rounded-md border border-input bg-background px-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Theory",
								children: "Theory"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Lab",
								children: "Lab"
							})]
						})]
					})
				]
			}),
			data.categories.map((cat, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-[1fr_130px_190px_44px] sm:items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: cat.name,
								onChange: (e) => setCategory(ci, { name: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Weight (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								max: 100,
								step: .5,
								value: cat.weightPercent,
								onChange: (e) => setCategory(ci, { weightPercent: Number(e.target.value) })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Rule" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: cat.rule,
								onChange: (e) => setCategory(ci, { rule: e.target.value }),
								className: "h-9 w-full rounded-md border border-input bg-background px-3 text-sm",
								children: RULES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: r.value,
									children: r.label
								}, r.value))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Remove category",
							onClick: () => onChange({
								...data,
								categories: data.categories.filter((_, i) => i !== ci)
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-3",
					children: [cat.items.map((item, ii) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-[1fr_110px_110px_44px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: item.label,
								placeholder: "Assessment",
								onChange: (e) => setItem(ci, ii, { label: e.target.value })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: .25,
								value: item.obtained,
								"aria-label": "Obtained",
								onChange: (e) => setItem(ci, ii, { obtained: Number(e.target.value) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: .25,
								value: item.total,
								"aria-label": "Total",
								onChange: (e) => setItem(ci, ii, { total: Number(e.target.value) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Remove assessment",
								onClick: () => setCategory(ci, { items: cat.items.filter((_, i) => i !== ii) }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-muted-foreground" })
							})
						]
					}, ii)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setCategory(ci, { items: [...cat.items, {
							label: "",
							obtained: 0,
							total: 10
						}] }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add assessment"]
					})]
				})]
			}, ci)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => onChange({
					...data,
					categories: [...data.categories, {
						name: "New category",
						weightPercent: 10,
						rule: "all",
						items: []
					}]
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add category"]
			})
		]
	});
}
var MAX_BYTES = 8388608;
function UploadDropzone({ title, description, step, value, onChange, onError }) {
	const inputRef = (0, import_react.useRef)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(null);
	function handleFile(file) {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			onError("Please upload an image file (PNG, JPG or WebP).");
			return;
		}
		if (file.size > MAX_BYTES) {
			onError("That image is larger than 8MB. Please upload a smaller screenshot.");
			return;
		}
		const reader = new FileReader();
		setProgress(0);
		reader.onprogress = (e) => {
			if (e.lengthComputable) setProgress(Math.round(e.loaded / e.total * 100));
		};
		reader.onerror = () => {
			setProgress(null);
			onError("Could not read that file. Please try again.");
		};
		reader.onload = () => {
			setProgress(100);
			onChange(String(reader.result));
			window.setTimeout(() => setProgress(null), 400);
		};
		reader.readAsDataURL(file);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "soft-card flex h-full flex-col p-5 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] font-semibold uppercase tracking-wider text-accent",
						children: ["Step ", step]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-base font-semibold sm:text-lg",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: description
					})
				]
			}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-1 h-5 w-5 shrink-0 text-success" }) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `mt-5 flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center transition-all duration-200 sm:p-6 ${dragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-surface hover:border-primary/50"}`,
			onDragOver: (e) => {
				e.preventDefault();
				setDragging(true);
			},
			onDragLeave: () => setDragging(false),
			onDrop: (e) => {
				e.preventDefault();
				setDragging(false);
				handleFile(e.dataTransfer.files?.[0]);
			},
			children: [value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: `${title} preview`,
					loading: "lazy",
					decoding: "async",
					className: "mx-auto max-h-56 w-auto rounded-lg border border-border object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => inputRef.current?.click(),
						children: "Replace"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onChange(null),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mr-1 h-4 w-4" }), " Remove"]
					})]
				})]
			}) : progress !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 w-full overflow-hidden rounded-full bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-primary transition-all duration-200",
						style: { width: `${progress}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						"Uploading… ",
						progress,
						"%"
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-12 w-12 items-center justify-center rounded-full bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUp, { className: "h-6 w-6 text-primary" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm font-medium",
					children: "Drag & drop your screenshot"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "PNG, JPG or WebP · up to 8MB"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					variant: "outline",
					size: "sm",
					onClick: () => inputRef.current?.click(),
					children: "Choose file"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: (e) => handleFile(e.target.files?.[0])
			})]
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var analyzeScreenshots = createServerFn({ method: "POST" }).inputValidator((data) => analyzeInputSchema.parse(data)).handler(createSsrRpc("a2df76a8f617d5cff8bd0e8da556d7935175bca9d869e91076cd5dcfa3900579"));
var KEY = "ucp-gpa-history";
function loadHistory() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function saveHistoryEntry(entry) {
	if (typeof window === "undefined") return;
	const next = [entry, ...loadHistory()].slice(0, 25);
	window.localStorage.setItem(KEY, JSON.stringify(next));
}
function clearHistory() {
	if (typeof window === "undefined") return;
	window.localStorage.removeItem(KEY);
}
var ResultView = (0, import_react.lazy)(() => import("./ResultView-BXghYS7S.mjs").then((m) => ({ default: m.ResultView })));
function AnalyzePage() {
	const analyze = useServerFn(analyzeScreenshots);
	const [marks, setMarks] = (0, import_react.useState)(null);
	const [evaluation, setEvaluation] = (0, import_react.useState)(null);
	const [stage, setStage] = (0, import_react.useState)("upload");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [data, setData] = (0, import_react.useState)(null);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [userApiKey, setUserApiKey] = (0, import_react.useState)("");
	const [showKeyInput, setShowKeyInput] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHistory(loadHistory());
		if (typeof window !== "undefined") {
			const savedKey = localStorage.getItem("ucp_ai_key");
			if (savedKey) setUserApiKey(savedKey);
		}
	}, []);
	function handleKeyChange(val) {
		setUserApiKey(val);
		if (typeof window !== "undefined") {
			if (val.trim()) localStorage.setItem("ucp_ai_key", val.trim());
			else localStorage.removeItem("ucp_ai_key");
		}
	}
	async function runAnalysis() {
		if (!marks || !evaluation) {
			toast.error("Please upload both screenshots first.");
			return;
		}
		setLoading(true);
		setError(null);
		setData(null);
		try {
			const result = await analyze({ data: {
				marksImage: marks,
				evaluationImage: evaluation,
				userApiKey: userApiKey.trim() || void 0
			} });
			setData(result);
			setStage("review");
			toast.success("Data extracted — please review it before calculating.");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Something went wrong while analyzing.";
			setError(message);
			if (message.includes("AI service is not configured") || message.includes("API key")) setShowKeyInput(true);
			toast.error(message);
		} finally {
			setLoading(false);
		}
	}
	function calculate() {
		if (!data) return;
		if (data.categories.length === 0) {
			toast.error("Add at least one evaluation category.");
			return;
		}
		const result = computeGpa(data);
		saveHistoryEntry({
			id: Math.random().toString(36).slice(2),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			data,
			percentage: result.percentage,
			grade: result.grade,
			gradePoint: result.gradePoint
		});
		setHistory(loadHistory());
		setStage("result");
		if (typeof window !== "undefined") window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function reset() {
		setMarks(null);
		setEvaluation(null);
		setData(null);
		setError(null);
		setStage("upload");
	}
	const steps = [
		{
			key: "upload",
			label: "Upload"
		},
		{
			key: "review",
			label: "Review"
		},
		{
			key: "result",
			label: "Result"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold sm:text-4xl",
						children: "Analyze Marks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-muted-foreground",
						children: "Upload the two screenshots for one course. Nothing is pre-filled and no previous analysis is reused — each run reads only the images you provide now."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 flex flex-wrap gap-3",
						children: steps.map((s, i) => {
							const active = stage === s.key;
							const done = steps.findIndex((x) => x.key === stage) > i;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: `flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm ${active ? "border-primary bg-primary text-primary-foreground" : done ? "border-success/40 bg-success/10 text-success" : "border-border text-muted-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: i + 1
									}),
									" ",
									s.label
								]
							}, s.key);
						})
					})
				]
			}),
			stage === "upload" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print mt-10 animate-in fade-in duration-500",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadDropzone, {
							step: 1,
							title: "Marks Screenshot",
							description: "Your LMS gradebook showing obtained marks for this course.",
							value: marks,
							onChange: setMarks,
							onError: (m) => toast.error(m)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadDropzone, {
							step: 2,
							title: "Evaluation Screenshot",
							description: "The course evaluation / marks distribution with weightages and rules.",
							value: evaluation,
							onChange: setEvaluation,
							onError: (m) => toast.error(m)
						})]
					}),
					(error || showKeyInput || !userApiKey) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4 rounded-xl border border-primary/20 bg-muted/40 p-5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 font-medium text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI Service API Key Setup" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowKeyInput(!showKeyInput),
									className: "text-xs text-muted-foreground underline hover:text-foreground",
									children: showKeyInput ? "Hide Settings" : "Configure API Key"
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "ai-api-key",
										className: "block text-xs font-medium text-muted-foreground",
										children: "Enter your Google Gemini API Key, OpenAI Key, or Lovable Key:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "ai-api-key",
											type: "password",
											placeholder: "AIzaSy... (Gemini) or sk-... (OpenAI)",
											value: userApiKey,
											onChange: (e) => handleKeyChange(e.target.value),
											className: "flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
										}), userApiKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											onClick: () => handleKeyChange(""),
											className: "text-xs",
											children: "Clear"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "Your key is saved locally in your browser and used only to process your screenshots."
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							className: "w-full sm:w-auto",
							onClick: runAnalysis,
							disabled: loading || !marks || !evaluation,
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Analyzing screenshots…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-2 h-4 w-4" }), " Extract data with AI"] })
						}), loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Reading your marks and matching them to the evaluation. This usually takes 10–20 seconds."
						})]
					}),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 space-y-3",
						"aria-hidden": true,
						children: [
							0,
							1,
							2
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "soft-card h-16 animate-pulse bg-muted/60" }, i))
					})
				]
			}),
			stage === "review" && data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print mt-10 animate-in fade-in slide-in-from-bottom-2 duration-500",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Review extracted data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted-foreground",
						children: "Correct anything the AI misread before calculating. Weights and selection rules come from your evaluation screenshot."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewEditor, {
							data,
							onChange: setData
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							onClick: calculate,
							children: "Calculate GPA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "lg",
							onClick: () => setStage("upload"),
							children: "Back to upload"
						})]
					})
				]
			}),
			stage === "result" && data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 animate-in fade-in duration-500",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "soft-card h-64 animate-pulse bg-muted/60" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultView, {
						data,
						onReset: reset
					})
				})
			}),
			history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "no-print mt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-xl font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-5 w-5 text-accent" }), " History"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => {
								clearHistory();
								setHistory([]);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), " Clear"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Saved on this device only."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: history.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "soft-card p-5 text-left hover:-translate-y-0.5 hover:shadow-lg",
							onClick: () => {
								setData(h.data);
								setStage("result");
								window.scrollTo({
									top: 0,
									behavior: "smooth"
								});
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: h.data.courseName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										h.data.courseType,
										" · ",
										new Date(h.createdAt).toLocaleString()
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [round(h.percentage), "%"]
										}),
										" · ",
										h.grade,
										" ·",
										" ",
										h.gradePoint.toFixed(2),
										" GP"
									]
								})
							]
						}, h.id))
					})
				]
			})
		]
	});
}
//#endregion
export { AnalyzePage as component };
