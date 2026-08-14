import { createFileRoute } from "@tanstack/react-router";

import { GRADE_SCALE } from "@/lib/gpa";

export const Route = createFileRoute("/grade-scale")({
  head: () => ({
    meta: [
      { title: "UCP Grade Scale & Grade Points — GPA Analyzer" },
      {
        name: "description",
        content: "Percentage ranges, letter grades and grade points on the 4.0 scale used to estimate UCP course GPA.",
      },
      { property: "og:title", content: "UCP Grade Scale & Grade Points" },
      { property: "og:description", content: "Letter grades, percentage ranges and grade points on the 4.0 scale." },
    ],
  }),
  component: GradeScalePage,
});

function GradeScalePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Grade Scale</h1>
      <p className="mt-4 text-muted-foreground">
        The analyzer converts your weighted percentage into a letter grade and grade point using the 4.0 scale below.
        Some departments apply relative grading, so treat these values as an estimate.
      </p>

      <div className="surface-card mt-10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr>
              <th className="px-5 py-3 font-semibold">Percentage</th>
              <th className="px-5 py-3 font-semibold">Grade</th>
              <th className="px-5 py-3 font-semibold">Grade Point</th>
            </tr>
          </thead>
          <tbody>
            {GRADE_SCALE.map((g) => (
              <tr key={g.grade} className="border-t border-border">
                <td className="px-5 py-3">
                  {g.grade === "F" ? "Below 50" : `${g.min} – ${Math.round(g.max)}`}
                </td>
                <td className="px-5 py-3 font-semibold">{g.grade}</td>
                <td className="px-5 py-3">{g.point.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}