const KEY = "ucp-gpa-theme";

export function applyStoredTheme() {
  if (typeof window === "undefined") return;
  const stored = window.localStorage.getItem(KEY);
  const dark = stored ? stored === "dark" : false;
  document.documentElement.classList.toggle("dark", dark);
}

export function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem(KEY) === "dark" ? "dark" : "light";
}

export function setTheme(theme: "light" | "dark") {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}