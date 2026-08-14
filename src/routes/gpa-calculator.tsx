import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GRADE_SCALE, gradeFor, round } from "@/lib/gpa";

export const Route = createFileRoute("/gpa-calculator")({
  head: () => ({
    meta: [
      { title: "Semester GPA Calculator — UCP AI GPA Analyzer" },
      {
        name: "description",
        content: "Calculate your semester GPA on the 4.0 scale by entering each course, its credit hours and grade.",
      },
      { property: "og:title", content: "Semester GPA Calculator for UCP students" },
      { property: "og:description", content: "Enter courses, credit hours and grades to get your semester GPA." },
    ],
  }),
  component: GpaCalculatorPage,
});

interface Row {
  id: string;
  name: string;
  credits: string;
  grade: string;
}

function newRow(): Row {
  return { id: Math.random().toString(36).slice(2), name: "", credits: "3", grade: "A" };
}

function GpaCalculatorPage() {
  const [rows, setRows] = useState<Row[]>(() => [newRow(), newRow(), newRow()]);

  const result = useMemo(() => {
    let points = 0;
    let credits = 0;
    for (const r of rows) {
      const c = Number(r.credits);
      const g = GRADE_SCALE.find((x) => x.grade === r.grade);
      if (!Number.isFinite(c) || c <= 0 || !g) continue;
      points += c * g.point;
      credits += c;
    }
    return { gpa: credits > 0 ? points / credits : 0, credits, points };
  }, [rows]);

  function update(id: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Semester GPA Calculator</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Add each course with its credit hours and the grade you expect. GPA is credit-weighted on the 4.0 scale.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="surface-card p-5 sm:p-7">
          <div className="space-y-4">
            {rows.map((r, i) => (
              <div key={r.id} className="grid gap-3 sm:grid-cols-[1fr_110px_120px_44px] sm:items-end">
                <div className="space-y-1.5">
                  <Label htmlFor={`n-${r.id}`} className={i === 0 ? "" : "sr-only sm:not-sr-only sm:sr-only"}>
                    Course
                  </Label>
                  <Input
                    id={`n-${r.id}`}
                    value={r.name}
                    onChange={(e) => update(r.id, { name: e.target.value })}
                    placeholder={`Course ${i + 1}`}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`c-${r.id}`} className={i === 0 ? "" : "sr-only"}>
                    Credits
                  </Label>
                  <Input
                    id={`c-${r.id}`}
                    type="number"
                    min={0}
                    step={0.5}
                    value={r.credits}
                    onChange={(e) => update(r.id, { credits: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`g-${r.id}`} className={i === 0 ? "" : "sr-only"}>
                    Grade
                  </Label>
                  <select
                    id={`g-${r.id}`}
                    value={r.grade}
                    onChange={(e) => update(r.id, { grade: e.target.value })}
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {GRADE_SCALE.map((g) => (
                      <option key={g.grade} value={g.grade}>
                        {g.grade} ({g.point.toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove course"
                  onClick={() => setRows((prev) => (prev.length > 1 ? prev.filter((x) => x.id !== r.id) : prev))}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-6" onClick={() => setRows((p) => [...p, newRow()])}>
            <Plus className="mr-2 h-4 w-4" /> Add course
          </Button>
        </div>

        <aside className="surface-card h-fit p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Semester GPA</p>
          <p className="mt-3 font-display text-5xl font-bold text-primary">{result.gpa.toFixed(2)}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {round(result.credits, 1)} credit hours · {round(result.points, 2)} grade points
          </p>
          <p className="mt-4 rounded-md bg-secondary px-3 py-2 text-sm">
            Approx. letter standing:{" "}
            <span className="font-semibold">{gradeFor((result.gpa / 4) * 100).grade}</span>
          </p>
        </aside>
      </div>
    </div>
  );
}