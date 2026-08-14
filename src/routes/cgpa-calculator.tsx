import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { round } from "@/lib/gpa";

export const Route = createFileRoute("/cgpa-calculator")({
  head: () => ({
    meta: [
      { title: "CGPA Calculator — UCP AI GPA Analyzer" },
      {
        name: "description",
        content:
          "Combine every semester's GPA and credit hours to get your cumulative CGPA, and see what you need next semester.",
      },
      { property: "og:title", content: "CGPA Calculator for UCP students" },
      { property: "og:description", content: "Cumulative GPA across semesters, plus a target-CGPA planner." },
    ],
  }),
  component: CgpaCalculatorPage,
});

interface Sem {
  id: string;
  label: string;
  gpa: string;
  credits: string;
}

function newSem(n: number): Sem {
  return { id: Math.random().toString(36).slice(2), label: `Semester ${n}`, gpa: "", credits: "" };
}

function CgpaCalculatorPage() {
  const [sems, setSems] = useState<Sem[]>(() => [newSem(1), newSem(2)]);
  const [targetCgpa, setTargetCgpa] = useState("3.50");
  const [nextCredits, setNextCredits] = useState("15");

  const totals = useMemo(() => {
    let points = 0;
    let credits = 0;
    for (const s of sems) {
      const g = Number(s.gpa);
      const c = Number(s.credits);
      if (!Number.isFinite(g) || !Number.isFinite(c) || c <= 0 || g < 0 || g > 4) continue;
      points += g * c;
      credits += c;
    }
    return { cgpa: credits > 0 ? points / credits : 0, credits, points };
  }, [sems]);

  const required = useMemo(() => {
    const t = Number(targetCgpa);
    const nc = Number(nextCredits);
    if (!Number.isFinite(t) || !Number.isFinite(nc) || nc <= 0) return null;
    return (t * (totals.credits + nc) - totals.points) / nc;
  }, [targetCgpa, nextCredits, totals]);

  function update(id: string, patch: Partial<Sem>) {
    setSems((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">CGPA Calculator</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Enter the GPA and credit hours of each completed semester to get your cumulative CGPA, then plan the GPA you
        need next semester.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="surface-card p-5 sm:p-7">
          <div className="space-y-4">
            {sems.map((s, i) => (
              <div key={s.id} className="grid gap-3 sm:grid-cols-[1fr_120px_120px_44px] sm:items-end">
                <div className="space-y-1.5">
                  <Label htmlFor={`l-${s.id}`} className={i === 0 ? "" : "sr-only"}>
                    Semester
                  </Label>
                  <Input id={`l-${s.id}`} value={s.label} onChange={(e) => update(s.id, { label: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`gp-${s.id}`} className={i === 0 ? "" : "sr-only"}>
                    GPA
                  </Label>
                  <Input
                    id={`gp-${s.id}`}
                    type="number"
                    min={0}
                    max={4}
                    step={0.01}
                    placeholder="3.40"
                    value={s.gpa}
                    onChange={(e) => update(s.id, { gpa: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`cr-${s.id}`} className={i === 0 ? "" : "sr-only"}>
                    Credits
                  </Label>
                  <Input
                    id={`cr-${s.id}`}
                    type="number"
                    min={0}
                    step={0.5}
                    placeholder="15"
                    value={s.credits}
                    onChange={(e) => update(s.id, { credits: e.target.value })}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove semester"
                  onClick={() => setSems((prev) => (prev.length > 1 ? prev.filter((x) => x.id !== s.id) : prev))}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-6" onClick={() => setSems((p) => [...p, newSem(p.length + 1)])}>
            <Plus className="mr-2 h-4 w-4" /> Add semester
          </Button>
        </div>

        <aside className="space-y-4">
          <div className="surface-card p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Cumulative CGPA</p>
            <p className="mt-3 font-display text-5xl font-bold text-primary">{totals.cgpa.toFixed(2)}</p>
            <p className="mt-3 text-sm text-muted-foreground">{round(totals.credits, 1)} total credit hours</p>
          </div>

          <div className="surface-card space-y-4 p-6">
            <h2 className="text-sm font-semibold">Target planner</h2>
            <div className="space-y-1.5">
              <Label htmlFor="target">Target CGPA</Label>
              <Input
                id="target"
                type="number"
                step={0.01}
                min={0}
                max={4}
                value={targetCgpa}
                onChange={(e) => setTargetCgpa(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ncredits">Next semester credits</Label>
              <Input
                id="ncredits"
                type="number"
                step={0.5}
                min={0}
                value={nextCredits}
                onChange={(e) => setNextCredits(e.target.value)}
              />
            </div>
            {required !== null && (
              <p className="rounded-md bg-secondary px-3 py-3 text-sm">
                {required > 4 ? (
                  <>Not reachable next semester — a GPA of {required.toFixed(2)} would be required.</>
                ) : required <= 0 ? (
                  <>You are already above this target.</>
                ) : (
                  <>
                    You need a GPA of <span className="font-semibold">{required.toFixed(2)}</span> next semester.
                  </>
                )}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}