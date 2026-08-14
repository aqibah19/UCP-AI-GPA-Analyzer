import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — UCP AI GPA Analyzer" },
      {
        name: "description",
        content:
          "Why the UCP AI GPA Analyzer exists, how screenshots are processed, and the privacy rules behind every analysis.",
      },
      { property: "og:title", content: "About the UCP AI GPA Analyzer" },
      { property: "og:description", content: "An independent, evaluation-aware GPA tool built for UCP students." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">About this project</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          UCP AI GPA Analyzer is an independent academic utility built for students of the University of Central
          Punjab. Every course is graded differently — some drop the lowest quiz, some count the best three
          assignments, labs weigh viva and performance separately — so a single fixed formula rarely matches reality.
        </p>
        <p>
          Instead of assuming, the analyzer reads your own course evaluation screenshot alongside your LMS marks
          screenshot. It matches each mark to its category, applies any Top 2 / Top 3 / Top 4 or average rule stated in
          the evaluation, and produces a weighted percentage, letter grade and grade point.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-foreground">Privacy &amp; accuracy</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Screenshots are sent for a single analysis request and are not stored on any server.</li>
          <li>Your history is kept only in your own browser and can be cleared at any time.</li>
          <li>No sample, demo or hardcoded student data is ever used — every analysis runs fresh.</li>
          <li>You always review and can correct the extracted values before the GPA is calculated.</li>
        </ul>
        <h2 className="pt-4 text-xl font-semibold text-foreground">Disclaimer</h2>
        <p>
          This is an independent academic utility for UCP students and is not an official University of Central Punjab
          website. Results are estimates; your official transcript is always the final authority.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-foreground">Developer</h2>
        <p>
          Designed &amp; Developed by Aqib Ahmed ·{" "}
          <a className="font-medium text-accent hover:underline" href="mailto:aqibah50@gmail.com">
            aqibah50@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}