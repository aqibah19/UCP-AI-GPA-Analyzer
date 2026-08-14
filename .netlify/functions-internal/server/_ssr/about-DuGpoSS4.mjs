import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DuGpoSS4.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-14 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold sm:text-4xl",
			children: "About this project"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "UCP AI GPA Analyzer is an independent academic utility built for students of the University of Central Punjab. Every course is graded differently — some drop the lowest quiz, some count the best three assignments, labs weigh viva and performance separately — so a single fixed formula rarely matches reality." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Instead of assuming, the analyzer reads your own course evaluation screenshot alongside your LMS marks screenshot. It matches each mark to its category, applies any Top 2 / Top 3 / Top 4 or average rule stated in the evaluation, and produces a weighted percentage, letter grade and grade point." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "pt-4 text-xl font-semibold text-foreground",
					children: "Privacy & accuracy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "list-disc space-y-2 pl-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Screenshots are sent for a single analysis request and are not stored on any server." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Your history is kept only in your own browser and can be cleared at any time." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No sample, demo or hardcoded student data is ever used — every analysis runs fresh." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "You always review and can correct the extracted values before the GPA is calculated." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "pt-4 text-xl font-semibold text-foreground",
					children: "Disclaimer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This is an independent academic utility for UCP students and is not an official University of Central Punjab website. Results are estimates; your official transcript is always the final authority." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "pt-4 text-xl font-semibold text-foreground",
					children: "Developer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Designed & Developed by Aqib Ahmed ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "font-medium text-accent hover:underline",
						href: "mailto:aqibah50@gmail.com",
						children: "aqibah50@gmail.com"
					})
				] })
			]
		})]
	});
}
//#endregion
export { AboutPage as component };
