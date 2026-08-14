import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AnalysisData, CategoryRule } from "@/lib/gpa";

const RULES: { value: CategoryRule; label: string }[] = [
  { value: "all", label: "All (pooled marks)" },
  { value: "average", label: "Average of all" },
  { value: "top1", label: "Best 1" },
  { value: "top2", label: "Top 2" },
  { value: "top3", label: "Top 3" },
  { value: "top4", label: "Top 4" },
  { value: "top5", label: "Top 5" },
];

export function ReviewEditor({
  data,
  onChange,
}: {
  data: AnalysisData;
  onChange: (next: AnalysisData) => void;
}) {
  function setCategory(index: number, patch: Partial<AnalysisData["categories"][number]>) {
    const categories = data.categories.map((c, i) => (i === index ? { ...c, ...patch } : c));
    onChange({ ...data, categories });
  }

  function setItem(ci: number, ii: number, patch: Partial<{ label: string; obtained: number; total: number }>) {
    const cat = data.categories[ci];
    if (!cat) return;
    setCategory(ci, { items: cat.items.map((it, i) => (i === ii ? { ...it, ...patch } : it)) });
  }

  return (
    <div className="space-y-6">
      <div className="surface-card grid gap-5 p-6 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="student">Student name</Label>
          <Input
            id="student"
            value={data.studentName}
            onChange={(e) => onChange({ ...data, studentName: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="course">Course name</Label>
          <Input
            id="course"
            value={data.courseName}
            onChange={(e) => onChange({ ...data, courseName: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ctype">Course type</Label>
          <select
            id="ctype"
            value={data.courseType}
            onChange={(e) => onChange({ ...data, courseType: e.target.value as AnalysisData["courseType"] })}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="Theory">Theory</option>
            <option value="Lab">Lab</option>
          </select>
        </div>
      </div>

      {data.categories.map((cat, ci) => (
        <div key={ci} className="surface-card p-6">
          <div className="grid gap-4 sm:grid-cols-[1fr_130px_190px_44px] sm:items-end">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Input value={cat.name} onChange={(e) => setCategory(ci, { name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Weight (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={cat.weightPercent}
                onChange={(e) => setCategory(ci, { weightPercent: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Rule</Label>
              <select
                value={cat.rule}
                onChange={(e) => setCategory(ci, { rule: e.target.value as CategoryRule })}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {RULES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Remove category"
              onClick={() => onChange({ ...data, categories: data.categories.filter((_, i) => i !== ci) })}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="mt-5 space-y-3">
            {cat.items.map((item, ii) => (
              <div key={ii} className="grid gap-3 sm:grid-cols-[1fr_110px_110px_44px]">
                <Input
                  value={item.label}
                  placeholder="Assessment"
                  onChange={(e) => setItem(ci, ii, { label: e.target.value })}
                />
                <Input
                  type="number"
                  step={0.25}
                  value={item.obtained}
                  aria-label="Obtained"
                  onChange={(e) => setItem(ci, ii, { obtained: Number(e.target.value) })}
                />
                <Input
                  type="number"
                  step={0.25}
                  value={item.total}
                  aria-label="Total"
                  onChange={(e) => setItem(ci, ii, { total: Number(e.target.value) })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove assessment"
                  onClick={() => setCategory(ci, { items: cat.items.filter((_, i) => i !== ii) })}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCategory(ci, { items: [...cat.items, { label: "", obtained: 0, total: 10 }] })}
            >
              <Plus className="mr-2 h-4 w-4" /> Add assessment
            </Button>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={() =>
          onChange({
            ...data,
            categories: [...data.categories, { name: "New category", weightPercent: 10, rule: "all", items: [] }],
          })
        }
      >
        <Plus className="mr-2 h-4 w-4" /> Add category
      </Button>
    </div>
  );
}