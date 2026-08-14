import { createFileRoute } from "@tanstack/react-router";

import { GRADE_SCALE, SPECIAL_GRADES } from "@/lib/gpa";

export const Route = createFileRoute("/grade-scale")({
  head: () => ({
    meta: [
      { title: "UCP Grade Scale & Grade Points — GPA Analyzer" },
      {
        name: "description",
        content: "Official UCP percentage ranges, letter grades and grade points on the 4.0 scale.",
      },
      { property: "og:title", content: "UCP Grade Scale & Grade Points" },
      { property: "og:description", content: "Official UCP letter grades, percentage ranges and grade points on the 4.0 scale." },
    ],
  }),
  component: GradeScalePage,
});

function GradeScalePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">UCP Grade Scale</h1>
      <p className="mt-4 text-muted-foreground">
        The official grading policy and 4.0 grade point scale used by the University of Central Punjab.
      </p>

      {/* Main Grade Scale Table */}
      <div className="surface-card mt-8 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr>
              <th className="px-5 py-3 font-semibold">Letter Grade</th>
              <th className="px-5 py-3 font-semibold">Grade Points</th>
              <th className="px-5 py-3 font-semibold">Marks (%)</th>
            </tr>
          </thead>
          <tbody>
            {GRADE_SCALE.map((g) => (
              <tr key={g.grade} className="border-t border-border">
                <td className="px-5 py-3 font-bold text-foreground">{g.grade}</td>
                <td className="px-5 py-3 font-medium text-foreground">
                  {g.point.toFixed(2)}
                </td>
                <td className="px-5 py-3 text-muted-foreground">{g.rangeLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Special Non-GPA Grades Table */}
      <h2 className="mt-12 text-xl font-bold">Special Grades</h2>
      <div className="surface-card mt-4 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr>
              <th className="px-5 py-3 font-semibold">Letter Grade</th>
              <th className="px-5 py-3 font-semibold">Grade Points</th>
              <th className="px-5 py-3 font-semibold">Remarks / Meaning</th>
            </tr>
          </thead>
          <tbody>
            {SPECIAL_GRADES.map((s) => (
              <tr key={s.grade} className="border-t border-border">
                <td className="px-5 py-3 font-bold text-foreground">{s.grade}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.points}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}