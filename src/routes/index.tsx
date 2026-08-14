import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Calculator,
  FileImage,
  FileText,
  Gauge,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import heroImage from "@/assets/campus-hero.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UCP AI GPA Analyzer — Marks to GPA in Seconds" },
      {
        name: "description",
        content:
          "Upload your UCP LMS marks and course evaluation screenshots. The AI reads both, applies top-2/top-3 rules and returns your percentage, grade and GPA.",
      },
      { property: "og:title", content: "UCP AI GPA Analyzer" },
      {
        property: "og:description",
        content: "AI-powered, evaluation-aware GPA estimates for UCP theory and lab courses.",
      },
    ],
  }),
  component: Index,
});

const STEPS = [
  { icon: FileImage, title: "Upload marks screenshot", text: "Your LMS gradebook for a single course." },
  { icon: FileText, title: "Upload evaluation screenshot", text: "The course marks-distribution policy." },
  { icon: ScanLine, title: "AI extracts & matches", text: "Every mark is mapped to its weighted category." },
  { icon: Gauge, title: "Review & calculate", text: "Verify the data, then get grade, GPA and scenarios." },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "Evaluation-aware scoring",
    text: "Automatically applies Top 2, Top 3, Top 4 and average rules whenever your evaluation mentions them.",
  },
  {
    icon: Calculator,
    title: "Theory & Lab support",
    text: "Quizzes, assignments, labs, viva, project, mid term and final are each weighted separately.",
  },
  {
    icon: ShieldCheck,
    title: "Nothing is guessed",
    text: "Only what appears in your own screenshots is used. Every analysis runs fresh — no reused data.",
  },
];

function Index() {
  return (
    <div>
      <section className="hero-surface relative overflow-hidden">
        <img
          src={heroImage}
          alt="University campus building with students"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          loading="eager"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
              For University of Central Punjab students
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Turn your LMS marks into an accurate GPA.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Upload two screenshots — your marks and your course evaluation. The analyzer reads both, matches every
              assessment to its weightage and calculates your percentage, grade and grade point exactly the way your
              course is evaluated.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="destructive">
                <Link to="/analyze">
                  Analyze my marks <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 hover:bg-white/20">
                <Link to="/gpa-calculator">Manual GPA calculator</Link>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/20 pt-8">
              {[
                ["2", "Screenshots"],
                ["4.0", "Scale"],
                ["Theory + Lab", "Supported"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-semibold">{value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wide text-white/70">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Sample workflow</p>
              <ol className="mt-5 space-y-5">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/15 text-sm font-semibold">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{s.title}</span>
                      <span className="block text-sm text-white/70">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Built around how UCP actually grades</h2>
          <p className="mt-4 text-muted-foreground">
            Every course has its own marks distribution. Instead of assuming one formula, the analyzer reads your
            course evaluation and follows it.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="surface-card p-6 transition-shadow hover:shadow-lg">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="surface-card p-6">
                <div className="flex items-center justify-between">
                  <s.icon className="h-6 w-6 text-accent" />
                  <span className="font-display text-3xl font-bold text-border">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="surface-card flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Ready to see where you stand?</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              It takes under a minute. Your screenshots are analyzed for this session only and results stay on your
              device.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/analyze">
              Start analysis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
