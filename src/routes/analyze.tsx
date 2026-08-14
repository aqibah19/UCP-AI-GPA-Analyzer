import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, History as HistoryIcon, Loader2, Sparkles, Trash2 } from "lucide-react";
import { Suspense, lazy, useEffect, useState } from "react";
import { toast } from "sonner";

import { ReviewEditor } from "@/components/analyze/ReviewEditor";
import { UploadDropzone } from "@/components/analyze/UploadDropzone";
import { Button } from "@/components/ui/button";
import { analyzeScreenshots } from "@/lib/analyze.functions";
import { computeGpa, round, type AnalysisData } from "@/lib/gpa";
import { clearHistory, loadHistory, saveHistoryEntry, type HistoryEntry } from "@/lib/history";

const ResultView = lazy(() =>
  import("@/components/analyze/ResultView").then((m) => ({ default: m.ResultView })),
);

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Analyze Marks — UCP AI GPA Analyzer" },
      {
        name: "description",
        content:
          "Upload your LMS marks screenshot and course evaluation screenshot. The AI matches both and calculates your course GPA.",
      },
      { property: "og:title", content: "Analyze your UCP marks with AI" },
      {
        property: "og:description",
        content: "Two screenshots in, an evaluation-aware percentage, grade and GPA out.",
      },
    ],
  }),
  component: AnalyzePage,
});

type Stage = "upload" | "review" | "result";

function AnalyzePage() {
  const analyze = analyzeScreenshots;
  const [marks, setMarks] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("upload");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalysisData | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [userApiKey, setUserApiKey] = useState<string>("");
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);

  useEffect(() => {
    setHistory(loadHistory());
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("ucp_ai_key");
      if (savedKey) {
        setUserApiKey(savedKey);
      }
    }
  }, []);

  function handleKeyChange(val: string) {
    setUserApiKey(val);
    if (typeof window !== "undefined") {
      if (val.trim()) {
        localStorage.setItem("ucp_ai_key", val.trim());
      } else {
        localStorage.removeItem("ucp_ai_key");
      }
    }
  }

  async function runAnalysis() {
    if (!marks || !evaluation) {
      toast.error("Please upload both screenshots first.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await analyze({
        data: {
          marksImage: marks,
          evaluationImage: evaluation,
          userApiKey: userApiKey.trim() || undefined,
        },
      });
      setData(result as AnalysisData);
      setStage("review");
      toast.success("Data extracted — please review it before calculating.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong while analyzing.";
      setError(message);
      if (message.includes("AI service is not configured") || message.includes("API key")) {
        setShowKeyInput(true);
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  function calculate() {
    if (!data) return;
    if (data.categories.length === 0) {
      toast.error("Add at least one evaluation category.");
      return;
    }
    const result = computeGpa(data);
    saveHistoryEntry({
      id: Math.random().toString(36).slice(2),
      createdAt: new Date().toISOString(),
      data,
      percentage: result.percentage,
      grade: result.grade,
      gradePoint: result.gradePoint,
    });
    setHistory(loadHistory());
    setStage("result");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setMarks(null);
    setEvaluation(null);
    setData(null);
    setError(null);
    setStage("upload");
  }

  const steps: { key: Stage; label: string }[] = [
    { key: "upload", label: "Upload" },
    { key: "review", label: "Review" },
    { key: "result", label: "Result" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="no-print">
        <h1 className="text-3xl font-bold sm:text-4xl">Analyze Marks</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Upload the two screenshots for one course. Nothing is pre-filled and no previous analysis is reused — each
          run reads only the images you provide now.
        </p>

        <ol className="mt-8 flex flex-wrap gap-3">
          {steps.map((s, i) => {
            const active = stage === s.key;
            const done = steps.findIndex((x) => x.key === stage) > i;
            return (
              <li
                key={s.key}
                className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : done
                      ? "border-success/40 bg-success/10 text-success"
                      : "border-border text-muted-foreground"
                }`}
              >
                <span className="font-semibold">{i + 1}</span> {s.label}
              </li>
            );
          })}
        </ol>
      </div>

      {stage === "upload" && (
        <div className="no-print mt-10 animate-in fade-in duration-500">
          <div className="grid gap-6 lg:grid-cols-2">
            <UploadDropzone
              step={1}
              title="Marks Screenshot"
              description="Your LMS gradebook showing obtained marks for this course."
              value={marks}
              onChange={setMarks}
              onError={(m) => toast.error(m)}
            />
            <UploadDropzone
              step={2}
              title="Evaluation Screenshot"
              description="The course evaluation / marks distribution with weightages and rules."
              value={evaluation}
              onChange={setEvaluation}
              onError={(m) => toast.error(m)}
            />
          </div>

          {(error || showKeyInput || !userApiKey) && (
            <div className="mt-6 space-y-4 rounded-xl border border-primary/20 bg-muted/40 p-5 text-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>AI Service API Key Setup</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowKeyInput(!showKeyInput)}
                  className="text-xs text-muted-foreground underline hover:text-foreground"
                >
                  {showKeyInput ? "Hide Settings" : "Configure API Key"}
                </button>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="ai-api-key" className="block text-xs font-medium text-muted-foreground">
                  Enter your Google Gemini API Key, OpenAI Key, or Lovable Key:
                </label>
                <div className="flex gap-2">
                  <input
                    id="ai-api-key"
                    type="password"
                    placeholder="AIzaSy... (Gemini) or sk-... (OpenAI)"
                    value={userApiKey}
                    onChange={(e) => handleKeyChange(e.target.value)}
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  {userApiKey && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleKeyChange("")}
                      className="text-xs"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Your key is saved locally in your browser and used only to process your screenshots.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button size="lg" className="w-full sm:w-auto" onClick={runAnalysis} disabled={loading || !marks || !evaluation}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing screenshots…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Extract data with AI
                </>
              )}
            </Button>
            {loading && (
              <p className="text-sm text-muted-foreground">
                Reading your marks and matching them to the evaluation. This usually takes 10–20 seconds.
              </p>
            )}
          </div>

          {loading && (
            <div className="mt-8 space-y-3" aria-hidden>
              {[0, 1, 2].map((i) => (
                <div key={i} className="soft-card h-16 animate-pulse bg-muted/60" />
              ))}
            </div>
          )}
        </div>
      )}

      {stage === "review" && data && (
        <div className="no-print mt-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h2 className="text-xl font-semibold">Review extracted data</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Correct anything the AI misread before calculating. Weights and selection rules come from your evaluation
            screenshot.
          </p>
          <div className="mt-6">
            <ReviewEditor data={data} onChange={setData} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={calculate}>
              Calculate GPA
            </Button>
            <Button variant="outline" size="lg" onClick={() => setStage("upload")}>
              Back to upload
            </Button>
          </div>
        </div>
      )}

      {stage === "result" && data && (
        <div className="mt-10 animate-in fade-in duration-500">
          <Suspense fallback={<div className="soft-card h-64 animate-pulse bg-muted/60" />}>
            <ResultView data={data} onReset={reset} />
          </Suspense>
        </div>
      )}

      {history.length > 0 && (
        <section className="no-print mt-16">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <HistoryIcon className="h-5 w-5 text-accent" /> History
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearHistory();
                setHistory([]);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Saved on this device only.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((h) => (
              <button
                key={h.id}
                className="soft-card p-5 text-left hover:-translate-y-0.5 hover:shadow-lg"
                onClick={() => {
                  setData(h.data);
                  setStage("result");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <p className="text-sm font-semibold">{h.data.courseName}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {h.data.courseType} · {new Date(h.createdAt).toLocaleString()}
                </p>
                <p className="mt-3 text-sm">
                  <span className="font-semibold">{round(h.percentage)}%</span> · {h.grade} ·{" "}
                  {h.gradePoint.toFixed(2)} GP
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}