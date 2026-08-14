export type CourseType = "Theory" | "Lab";
export type CategoryRule = "all" | "average" | "top1" | "top2" | "top3" | "top4" | "top5";

export interface MarkItem {
  label: string;
  obtained: number;
  total: number;
}

export interface EvaluationCategory {
  name: string;
  weightPercent: number;
  rule: CategoryRule;
  items: MarkItem[];
}

export interface AnalysisData {
  studentName: string;
  courseName: string;
  courseType: CourseType;
  categories: EvaluationCategory[];
  notes?: string;
}

export interface CategoryResult {
  name: string;
  weightPercent: number;
  rule: CategoryRule;
  usedItems: MarkItem[];
  droppedItems: MarkItem[];
  scorePercent: number;
  weightedScore: number;
}

export interface GpaResult {
  percentage: number;
  grade: string;
  gradePoint: number;
  totalWeight: number;
  categories: CategoryResult[];
}

export const GRADE_SCALE: { grade: string; min: number; max: number; point: number; rangeLabel: string }[] = [
  { grade: "A", min: 86, max: 100, point: 4.0, rangeLabel: "86 - 100%" },
  { grade: "A-", min: 82, max: 85.99, point: 3.67, rangeLabel: "82 - 85%" },
  { grade: "B+", min: 78, max: 81.99, point: 3.33, rangeLabel: "78 - 81%" },
  { grade: "B", min: 74, max: 77.99, point: 3.0, rangeLabel: "74 - 77%" },
  { grade: "B-", min: 70, max: 73.99, point: 2.67, rangeLabel: "70 - 73%" },
  { grade: "C+", min: 66, max: 69.99, point: 2.33, rangeLabel: "66 - 69%" },
  { grade: "C", min: 62, max: 65.99, point: 2.0, rangeLabel: "62 - 65%" },
  { grade: "C-", min: 58, max: 61.99, point: 1.67, rangeLabel: "58 - 61%" },
  { grade: "D+", min: 54, max: 57.99, point: 1.33, rangeLabel: "54 - 57%" },
  { grade: "D", min: 50, max: 53.99, point: 1.0, rangeLabel: "50 - 53%" },
  { grade: "F", min: 0, max: 49.99, point: 0.0, rangeLabel: "Below 50%" },
];

export const SPECIAL_GRADES: { grade: string; points: string; remark: string }[] = [
  { grade: "W", points: "---", remark: "Withdrawal" },
  { grade: "I", points: "---", remark: "Incomplete" },
  { grade: "N", points: "---", remark: "Continued" },
  { grade: "S", points: "---", remark: "Satisfactory" },
  { grade: "US", points: "---", remark: "Unsatisfactory" },
  { grade: "P/F", points: "Pass/Fail", remark: "---" },
];

export function gradeFor(percentage: number): { grade: string; min: number; max: number; point: number } {
  const p = Math.max(0, Math.min(100, percentage));
  const found = GRADE_SCALE.find((g) => p >= g.min);
  return found ?? { grade: "F", min: 0, max: 49.99, point: 0 };
}

export function ruleCount(rule: CategoryRule): number | null {
  if (rule.startsWith("top")) return Number(rule.replace("top", ""));
  return null;
}

function pct(item: MarkItem) {
  if (!item.total || item.total <= 0) return 0;
  return (item.obtained / item.total) * 100;
}

export function computeCategory(category: EvaluationCategory): CategoryResult {
  const items = category.items.filter((i) => Number.isFinite(i.obtained) && Number.isFinite(i.total));
  const n = ruleCount(category.rule);
  let used = items;
  let dropped: MarkItem[] = [];

  if (n && items.length > n) {
    const sorted = [...items].sort((a, b) => pct(b) - pct(a));
    used = sorted.slice(0, n);
    dropped = sorted.slice(n);
  }

  let scorePercent = 0;
  if (used.length > 0) {
    if (category.rule === "all") {
      const obtained = used.reduce((s, i) => s + i.obtained, 0);
      const total = used.reduce((s, i) => s + i.total, 0);
      scorePercent = total > 0 ? (obtained / total) * 100 : 0;
    } else {
      scorePercent = used.reduce((s, i) => s + pct(i), 0) / used.length;
    }
  }

  scorePercent = Math.max(0, Math.min(100, scorePercent));

  return {
    name: category.name,
    weightPercent: category.weightPercent,
    rule: category.rule,
    usedItems: used,
    droppedItems: dropped,
    scorePercent,
    weightedScore: (scorePercent * category.weightPercent) / 100,
  };
}

export function computeGpa(data: AnalysisData): GpaResult {
  const categories = data.categories.map(computeCategory);
  const totalWeight = categories.reduce((s, c) => s + c.weightPercent, 0);
  const weighted = categories.reduce((s, c) => s + c.weightedScore, 0);
  // Normalise on the weight actually evaluated so far.
  const percentage = totalWeight > 0 ? (weighted / totalWeight) * 100 : 0;
  const g = gradeFor(percentage);
  return {
    percentage,
    grade: g.grade,
    gradePoint: g.point,
    totalWeight,
    categories,
  };
}

export interface Scenario {
  label: string;
  percentage: number;
  grade: string;
  gradePoint: number;
}

/** What-if analysis on the remaining (un-entered) weight of the course. */
export function scenarioAnalysis(data: AnalysisData): Scenario[] {
  const result = computeGpa(data);
  const earned = result.categories.reduce((s, c) => s + c.weightedScore, 0);
  const remaining = Math.max(0, 100 - result.totalWeight);

  const rows: Scenario[] = [];
  const options: { label: string; perf: number }[] = [
    { label: "Remaining assessments at 100%", perf: 100 },
    { label: "Remaining assessments at 90%", perf: 90 },
    { label: "Remaining assessments at 80%", perf: 80 },
    { label: "Remaining assessments at 70%", perf: 70 },
    { label: "Remaining assessments at 50%", perf: 50 },
  ];

  if (remaining <= 0.5) {
    const g = gradeFor(result.percentage);
    return [
      {
        label: "Full evaluation covered — final standing",
        percentage: result.percentage,
        grade: g.grade,
        gradePoint: g.point,
      },
    ];
  }

  for (const o of options) {
    const total = earned + (remaining * o.perf) / 100;
    const g = gradeFor(total);
    rows.push({ label: o.label, percentage: total, grade: g.grade, gradePoint: g.point });
  }
  return rows;
}

export function round(n: number, d = 2) {
  return Math.round(n * 10 ** d) / 10 ** d;
}