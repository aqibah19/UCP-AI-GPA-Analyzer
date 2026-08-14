import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, n as Slot } from "../_libs/@radix-ui/react-label+[...].mjs";
import { f as Menu, p as Mail, r as Sun, t as X, u as Moon } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { i as __exportAll } from "./server-hsQXeGuc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cv-_C-Q6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var styles_default = "/assets/styles-CVTO5fjO.css";
var KEY = "ucp-gpa-theme";
function applyStoredTheme() {
	if (typeof window === "undefined") return;
	const stored = window.localStorage.getItem(KEY);
	const dark = stored ? stored === "dark" : false;
	document.documentElement.classList.toggle("dark", dark);
}
function getTheme() {
	if (typeof window === "undefined") return "light";
	return window.localStorage.getItem(KEY) === "dark" ? "dark" : "light";
}
function setTheme(theme) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(KEY, theme);
	document.documentElement.classList.toggle("dark", theme === "dark");
}
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/analyze",
		label: "Analyze Marks"
	},
	{
		to: "/gpa-calculator",
		label: "GPA Calculator"
	},
	{
		to: "/cgpa-calculator",
		label: "CGPA Calculator"
	},
	{
		to: "/grade-scale",
		label: "Grade Scale"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDark(getTheme() === "dark");
	}, []);
	function toggleTheme() {
		setTheme(dark ? "light" : "dark");
		setDark(!dark);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "no-print sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-10 w-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground",
						children: "UCP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold tracking-tight",
							children: "UCP AI GPA Analyzer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted-foreground",
							children: "Independent student utility"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
						activeProps: { className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-secondary" },
						activeOptions: { exact: item.to === "/" },
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Toggle dark mode",
							onClick: toggleTheme,
							children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "hidden sm:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/analyze",
								children: "Analyze Marks"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							className: "lg:hidden",
							"aria-label": "Toggle navigation",
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "border-t border-border bg-background px-4 pb-4 lg:hidden",
			children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				onClick: () => setOpen(false),
				className: "block rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
				activeProps: { className: "block rounded-md px-3 py-3 text-sm font-semibold text-primary bg-secondary" },
				activeOptions: { exact: item.to === "/" },
				children: item.label
			}, item.to))
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "no-print mt-20 border-t border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-10 w-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground",
						children: "UCP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base font-semibold",
						children: "UCP AI GPA Analyzer"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-sm text-sm text-muted-foreground",
					children: "Upload your LMS marks and course evaluation screenshots, and get an accurate, evaluation-aware GPA estimate in seconds."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Quick links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/analyze",
							className: "hover:text-foreground",
							children: "Analyze Marks"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/gpa-calculator",
							className: "hover:text-foreground",
							children: "GPA Calculator"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cgpa-calculator",
							className: "hover:text-foreground",
							children: "CGPA Calculator"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/grade-scale",
							className: "hover:text-foreground",
							children: "Grade Scale"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "hover:text-foreground",
							children: "Contact"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: "Developer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: "Designed & Developed by Aqib Ahmed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "mailto:aqibah50@gmail.com",
						className: "mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), " aqibah50@gmail.com"]
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-6 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed text-muted-foreground",
					children: "Disclaimer: This is an independent academic utility for UCP students and is not an official University of Central Punjab website."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" UCP AI GPA Analyzer. All results are estimates — always confirm with your instructor."
					]
				})]
			})
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "UCP AI GPA Analyzer" },
			{
				name: "description",
				content: "AI-powered GPA analysis for UCP students: upload LMS marks and course evaluation screenshots to get an accurate grade estimate."
			},
			{
				name: "author",
				content: "Aqib Ahmed"
			},
			{
				property: "og:title",
				content: "UCP AI GPA Analyzer"
			},
			{
				property: "og:description",
				content: "Upload your marks and evaluation screenshots and get an evaluation-aware GPA estimate."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	(0, import_react.useEffect)(() => {
		applyStoredTheme();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})]
	});
}
var $$splitComponentImporter$6 = () => import("./routes-Bq9Cr7S6.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "UCP AI GPA Analyzer — Marks to GPA in Seconds" },
		{
			name: "description",
			content: "Upload your UCP LMS marks and course evaluation screenshots. The AI reads both, applies top-2/top-3 rules and returns your percentage, grade and GPA."
		},
		{
			property: "og:title",
			content: "UCP AI GPA Analyzer"
		},
		{
			property: "og:description",
			content: "AI-powered, evaluation-aware GPA estimates for UCP theory and lab courses."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./about-DuGpoSS4.mjs");
var Route$5 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About — UCP AI GPA Analyzer" },
		{
			name: "description",
			content: "Why the UCP AI GPA Analyzer exists, how screenshots are processed, and the privacy rules behind every analysis."
		},
		{
			property: "og:title",
			content: "About the UCP AI GPA Analyzer"
		},
		{
			property: "og:description",
			content: "An independent, evaluation-aware GPA tool built for UCP students."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./analyze-B6dKqSyF.mjs");
var Route$4 = createFileRoute("/analyze")({
	head: () => ({ meta: [
		{ title: "Analyze Marks — UCP AI GPA Analyzer" },
		{
			name: "description",
			content: "Upload your LMS marks screenshot and course evaluation screenshot. The AI matches both and calculates your course GPA."
		},
		{
			property: "og:title",
			content: "Analyze your UCP marks with AI"
		},
		{
			property: "og:description",
			content: "Two screenshots in, an evaluation-aware percentage, grade and GPA out."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./cgpa-calculator-CfKRa0_G.mjs");
var Route$3 = createFileRoute("/cgpa-calculator")({
	head: () => ({ meta: [
		{ title: "CGPA Calculator — UCP AI GPA Analyzer" },
		{
			name: "description",
			content: "Combine every semester's GPA and credit hours to get your cumulative CGPA, and see what you need next semester."
		},
		{
			property: "og:title",
			content: "CGPA Calculator for UCP students"
		},
		{
			property: "og:description",
			content: "Cumulative GPA across semesters, plus a target-CGPA planner."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./contact-BIDHSxlL.mjs");
var Route$2 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — UCP AI GPA Analyzer" },
		{
			name: "description",
			content: "Report an extraction issue, request a feature or send feedback about the UCP AI GPA Analyzer."
		},
		{
			property: "og:title",
			content: "Contact the UCP AI GPA Analyzer team"
		},
		{
			property: "og:description",
			content: "Feedback, bug reports and feature requests for UCP students."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./gpa-calculator-NV6I2FpV.mjs");
var Route$1 = createFileRoute("/gpa-calculator")({
	head: () => ({ meta: [
		{ title: "Semester GPA Calculator — UCP AI GPA Analyzer" },
		{
			name: "description",
			content: "Calculate your semester GPA on the 4.0 scale by entering each course, its credit hours and grade."
		},
		{
			property: "og:title",
			content: "Semester GPA Calculator for UCP students"
		},
		{
			property: "og:description",
			content: "Enter courses, credit hours and grades to get your semester GPA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./grade-scale-BNWt861B.mjs");
var Route = createFileRoute("/grade-scale")({
	head: () => ({ meta: [
		{ title: "UCP Grade Scale & Grade Points — GPA Analyzer" },
		{
			name: "description",
			content: "Percentage ranges, letter grades and grade points on the 4.0 scale used to estimate UCP course GPA."
		},
		{
			property: "og:title",
			content: "UCP Grade Scale & Grade Points"
		},
		{
			property: "og:description",
			content: "Letter grades, percentage ranges and grade points on the 4.0 scale."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AboutRoute: Route$5.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$7
	}),
	AnalyzeRoute: Route$4.update({
		id: "/analyze",
		path: "/analyze",
		getParentRoute: () => Route$7
	}),
	CgpaCalculatorRoute: Route$3.update({
		id: "/cgpa-calculator",
		path: "/cgpa-calculator",
		getParentRoute: () => Route$7
	}),
	ContactRoute: Route$2.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$7
	}),
	GpaCalculatorRoute: Route$1.update({
		id: "/gpa-calculator",
		path: "/gpa-calculator",
		getParentRoute: () => Route$7
	}),
	GradeScaleRoute: Route.update({
		id: "/grade-scale",
		path: "/grade-scale",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Button as n, cn as r, router_exports as t };
