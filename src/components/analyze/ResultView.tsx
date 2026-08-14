import { Download, Printer, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { computeGpa, round, scenarioAnalysis, type AnalysisData, type CategoryRule } from "@/lib/gpa";
import { downloadResultPdf } from "@/lib/pdf";

function ruleLabel(rule: CategoryRule) {
  if (rule === "all") return "All assessments (aggregate)";
  if (rule === "average") return "Average of all assessments";
  return `Best ${rule.replace("top", "")} counted`;
}

function InfoGrid({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
      {rows.map(([k, v]) => (
        <div key={k} className="min-w-0">
          <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{k}</dt>
          <dd className="mt-1 truncate text-sm font-semibold">{v || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="soft-card overflow-hidden">
      <header className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">{title}</h2>
        {description ? <p className="mt-1 text-xs text-muted-foreground">{description}</p> : null}
      </header>
      {children}
    </section>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-5 text-center sm:px-6">
      <p className="text-[11px] font-medium uppercase tracking-wider text-white/60">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold tabular-nums sm:text-3xl">{value}</p>
    </div>
  );
}

export function ResultView({ data, onReset }: { data: AnalysisData; onReset: () => void }) {
  const result = computeGpa(data);
  const scenarios = scenarioAnalysis(data);

  return (
    <div className="space-y-6">
      <div className="soft-card overflow-hidden">
        <div className="flex flex-col gap-1 border-b border-border px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-accent">Academic Result Report</p>
            <h1 className="mt-1 font-display text-xl font-semibold sm:text-2xl">{data.courseName || "Course"}</h1>
          </div>
          <p className="text-xs text-muted-foreground">Generated {new Date().toLocaleString()}</p>
        </div>
        <div className="hero-surface grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
          <StatCell label="Percentage" value={`${round(result.percentage)}%`} />
          <StatCell label="Grade" value={result.grade} />
          <StatCell label="Grade Point" value={result.gradePoint.toFixed(2)} />
          <StatCell label="GPA (course)" value={result.gradePoint.toFixed(2)} />
        </div>
        <p className="border-t border-border px-5 py-3 text-xs text-muted-foreground sm:px-6">
          Based on {round(result.totalWeight)}% of the course evaluation entered so far.
        </p>
      </div>

      <div className="no-print flex flex-wrap gap-2 sm:gap-3">
        <Button className="flex-1 sm:flex-none" onClick={() => downloadResultPdf(data, result, scenarios)}>
          <Download className="mr-2 h-4 w-4" /> Download PDF report
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" /> Print
        </Button>
        <Button variant="ghost" className="flex-1 sm:flex-none" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" /> New analysis
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Student Information">
          <InfoGrid rows={[["Student Name", data.studentName]]} />
        </Section>
        <Section title="Course Information">
          <InfoGrid
            rows={[
              ["Course Name", data.courseName],
              ["Course Type", data.courseType],
              ["Weight covered", `${round(result.totalWeight)}%`],
            ]}
          />
        </Section>
      </div>

      <Section title="Evaluation Policy Used" description="Weightages and selection rules read from your evaluation.">
        <div className="max-h-[420px] overflow-auto">
          <table className="report-table min-w-[520px]">
            <thead className="sticky top-0 z-10 bg-secondary text-left">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider sm:px-6">Category</th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider sm:px-6">Selection rule</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider sm:px-6">Weight</th>
              </tr>
            </thead>
            <tbody>
              {result.categories.map((c, i) => (
                <tr key={c.name} className={`border-t border-border ${i % 2 ? "bg-surface" : ""}`}>
                  <td className="px-5 py-3 font-medium sm:px-6">{c.name}</td>
                  <td className="px-5 py-3 text-muted-foreground sm:px-6">{ruleLabel(c.rule)}</td>
                  <td className="px-5 py-3 text-right tabular-nums sm:px-6">{round(c.weightPercent)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Marks Breakdown">
        <div className="max-h-[520px] overflow-auto">
          <table className="report-table min-w-[680px]">
            <thead className="sticky top-0 z-10 bg-secondary text-left">
              <tr>
                {["Category", "Assessments", "Weight", "Score", "Weighted"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider sm:px-6 ${i > 1 ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.categories.map((c, i) => (
                <tr key={c.name} className={`border-t border-border align-top ${i % 2 ? "bg-surface" : ""}`}>
                  <td className="px-5 py-4 font-medium sm:px-6">{c.name}</td>
                  <td className="px-5 py-4 text-muted-foreground sm:px-6">
                    {c.usedItems.map((it) => (
                      <div key={it.label + it.obtained} className="tabular-nums">
                        {it.label}: {it.obtained}/{it.total}
                      </div>
                    ))}
                    {c.droppedItems.map((it) => (
                      <div key={"d" + it.label + it.obtained} className="tabular-nums line-through opacity-60">
                        {it.label}: {it.obtained}/{it.total} (dropped)
                      </div>
                    ))}
                  </td>
                  <td className="px-5 py-4 text-right tabular-nums sm:px-6">{round(c.weightPercent)}%</td>
                  <td className="px-5 py-4 text-right tabular-nums sm:px-6">{round(c.scorePercent)}%</td>
                  <td className="px-5 py-4 text-right font-semibold tabular-nums sm:px-6">{round(c.weightedScore)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        title="Scenario Analysis"
        description="How your final standing changes depending on the remaining evaluation weight."
      >
        <div className="max-h-[420px] overflow-auto">
          <table className="report-table min-w-[560px]">
            <thead className="sticky top-0 z-10 bg-secondary text-left">
              <tr>
                {["Scenario", "Percentage", "Grade", "Grade Point"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider sm:px-6 ${i > 0 ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s, i) => (
                <tr key={s.label} className={`border-t border-border ${i % 2 ? "bg-surface" : ""}`}>
                  <td className="px-5 py-3 sm:px-6">{s.label}</td>
                  <td className="px-5 py-3 text-right tabular-nums sm:px-6">{round(s.percentage)}%</td>
                  <td className="px-5 py-3 text-right font-semibold sm:px-6">{s.grade}</td>
                  <td className="px-5 py-3 text-right tabular-nums sm:px-6">{s.gradePoint.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {data.notes ? (
        <p className="soft-card p-5 text-sm text-muted-foreground sm:p-6">
          <span className="font-semibold text-foreground">AI notes: </span>
          {data.notes}
        </p>
      ) : null}
    </div>
  );
}
