import type { AnalysisData } from "./gpa";

export interface HistoryEntry {
  id: string;
  createdAt: string;
  data: AnalysisData;
  percentage: number;
  grade: string;
  gradePoint: number;
}

const KEY = "ucp-gpa-history";

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveHistoryEntry(entry: HistoryEntry) {
  if (typeof window === "undefined") return;
  const next = [entry, ...loadHistory()].slice(0, 25);
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}