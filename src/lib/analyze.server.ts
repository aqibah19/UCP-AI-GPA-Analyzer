import { z } from "zod";

const imageSchema = z
  .string()
  .min(50)
  .refine((value) => value.startsWith("data:image/"), "Each upload must be an image file");

export const analyzeInputSchema = z.object({
  marksImage: imageSchema,
  evaluationImage: imageSchema,
  userApiKey: z.string().optional(),
});

const outputSchema = z.object({
  studentName: z.string().catch("Not detected").default("Not detected"),
  courseName: z.string().catch("Not detected").default("Not detected"),
  courseType: z
    .string()
    .catch("Theory")
    .transform((val) => (val?.toLowerCase().includes("lab") ? "Lab" : "Theory"))
    .default("Theory"),
  categories: z
    .array(
      z.object({
        name: z.string().catch("Assessment Category"),
        weightPercent: z.coerce.number().catch(0).transform((v) => Math.min(100, Math.max(0, v))),
        rule: z
          .string()
          .catch("all")
          .transform((val) => {
            const v = val?.toLowerCase() || "";
            if (v.includes("avg") || v.includes("average")) return "average";
            if (v.includes("top 1") || v.includes("top1") || v.includes("best 1")) return "top1";
            if (v.includes("top 2") || v.includes("top2") || v.includes("best 2")) return "top2";
            if (v.includes("top 3") || v.includes("top3") || v.includes("best 3")) return "top3";
            if (v.includes("top 4") || v.includes("top4") || v.includes("best 4")) return "top4";
            if (v.includes("top 5") || v.includes("top5") || v.includes("best 5")) return "top5";
            return "all";
          })
          .default("all"),
        items: z
          .array(
            z.object({
              label: z.string().catch("Item"),
              obtained: z.coerce.number().catch(0),
              total: z.coerce
                .number()
                .catch(100)
                .transform((val) => (val > 0 ? val : 100)),
            })
          )
          .catch([]),
      })
    )
    .min(1),
  notes: z.string().catch("").default(""),
});

type AnalyzeInput = z.infer<typeof analyzeInputSchema>;

const TRANSCRIPTION_PROMPT = `Act as an OCR transcriber for UCP LMS screenshots.
Read these two screenshots carefully (even if low resolution, mobile, or slightly blurry).

First image: MARKS gradebook screenshot.
Second image: EVALUATION distribution screenshot.

INSTRUCTIONS:
- Transcribe all visible assessment items, obtained marks, total marks, category weightages, and evaluation rules.
- If a low-resolution image makes text slightly blurry, transcribe your best read of the characters.
- If total marks are missing or unreadable, default total to 100.
- Match rows to evaluation categories (Assignments, Quizzes, Midterm, Final, etc.).

Return ONLY a JSON object with this structure:
{
  "studentName": "detected name or Not detected",
  "courseName": "detected course or Not detected",
  "courseType": "Theory or Lab",
  "categories": [
    {
      "name": "Quizzes",
      "weightPercent": 15,
      "rule": "all",
      "items": [
        { "label": "Quiz 1", "obtained": 8, "total": 10 }
      ]
    }
  ],
  "notes": ""
}
Allowed rules: all, average, top1, top2, top3, top4, top5.`;

const AUDIT_PROMPT = `You are the final OCR auditor. The attached images are the source of truth.
Compare the draft JSON below against both screenshots. Return a corrected full JSON object only.

DRAFT JSON:
`;

const DEFAULT_KEY = atob("QVEuQWI4Uk42SnhvQi1GQTN2SkQ4Q3JJSDRrZmF5RjBVNFhrdlQ0Z3ZTdVJjZTVpS3dleUE=");

function parseDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
  if (match) {
    return { mime_type: match[1], data: match[2] };
  }
  const parts = dataUrl.split(",");
  return { mime_type: "image/png", data: parts[1] || parts[0] };
}

function parseJsonResponse(raw: string) {
  const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("Could not read the screenshots. Please upload clearer images.");

  try {
    return JSON.parse(cleaned.slice(start, end + 1)) as unknown;
  } catch {
    throw new Error("The OCR response could not be parsed. Please try again with clearer screenshots.");
  }
}

function normalizeRawOutput(raw: any) {
  if (!raw || typeof raw !== "object") return null;

  const studentName = String(raw.studentName || raw.student || "Not detected");
  const courseName = String(raw.courseName || raw.course || "Not detected");
  const courseType = String(raw.courseType || "").toLowerCase().includes("lab") ? "Lab" : "Theory";
  const notes = String(raw.notes || "");

  let categories = Array.isArray(raw.categories) ? raw.categories : [];
  if (categories.length === 0) {
    categories = [
      {
        name: "General Assessment",
        weightPercent: 100,
        rule: "all",
        items: Array.isArray(raw.items) ? raw.items : [],
      },
    ];
  }

  const cleanedCategories = categories.map((cat: any, i: number) => {
    const name = String(cat.name || `Category ${i + 1}`);
    const weightPercent = Math.min(100, Math.max(0, Number(cat.weightPercent) || 0));
    const rule = String(cat.rule || "all");
    const rawItems = Array.isArray(cat.items) ? cat.items : [];

    const items = rawItems.map((item: any, j: number) => {
      const label = String(item.label || item.name || `Item ${j + 1}`);
      const obtained = Number(item.obtained ?? item.marks) || 0;
      const totalRaw = Number(item.total ?? item.maxMarks) || 100;
      const total = totalRaw > 0 ? totalRaw : 100;
      return { label, obtained, total };
    });

    return { name, weightPercent, rule, items };
  });

  return {
    studentName,
    courseName,
    courseType,
    categories:
      cleanedCategories.length > 0
        ? cleanedCategories
        : [
            {
              name: "Assessments",
              weightPercent: 100,
              rule: "all",
              items: [{ label: "Marks", obtained: 0, total: 100 }],
            },
          ],
    notes,
  };
}

async function callGeminiVision(apiKey: string, prompt: string, data: AnalyzeInput) {
  const marksParsed = parseDataUrl(data.marksImage);
  const evalParsed = parseDataUrl(data.evaluationImage);

  const GEMINI_MODELS = [
    "gemini-3.6-flash",
    "gemini-flash-latest",
    "gemini-3.5-flash",
    "gemini-2.5-flash-lite",
  ];

  let lastError: Error | null = null;

  for (const model of GEMINI_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: prompt },
                    { text: "MARKS SCREENSHOT — transcribe this image:" },
                    { inline_data: { mime_type: marksParsed.mime_type, data: marksParsed.data } },
                    { text: "EVALUATION SCREENSHOT — transcribe this image:" },
                    { inline_data: { mime_type: evalParsed.mime_type, data: evalParsed.data } },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0,
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (response.status === 503 || response.status === 429) {
          lastError = new Error(`Gemini high demand (${response.status}). Retrying...`);
          await new Promise((resolve) => setTimeout(resolve, 1200));
          continue;
        }

        if (!response.ok) {
          const detail = await response.text();
          throw new Error(`Gemini analysis failed (${response.status}). ${detail.slice(0, 180)}`);
        }

        const body = (await response.json()) as {
          candidates?: { content?: { parts?: { text?: string }[] } }[];
        };
        const raw = body.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        return parseJsonResponse(raw);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
      }
    }
  }

  throw lastError || new Error("Gemini models are currently experiencing high demand. Please try again in a few seconds.");
}

async function callVision(apiKey: string, prompt: string, data: AnalyzeInput) {
  // Lovable Gateway Key (starts with sk_)
  if (apiKey.startsWith("sk_")) {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "text", text: "MARKS SCREENSHOT — transcribe this image:" },
              { type: "image_url", image_url: { url: data.marksImage } },
              { type: "text", text: "EVALUATION SCREENSHOT — transcribe this image:" },
              { type: "image_url", image_url: { url: data.evaluationImage } },
            ],
          },
        ],
      }),
    });

    if (response.status === 429) throw new Error("Too many requests right now. Please try again in a minute.");
    if (response.status === 402) throw new Error("AI credits exhausted. Please top up to continue analyzing.");
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`AI analysis failed (${response.status}). ${detail.slice(0, 180)}`);
    }

    const body = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const raw = body.choices?.[0]?.message?.content ?? "";
    return parseJsonResponse(raw);
  }

  // OpenAI Key (starts with sk-)
  if (apiKey.startsWith("sk-")) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "text", text: "MARKS SCREENSHOT — transcribe this image:" },
              { type: "image_url", image_url: { url: data.marksImage } },
              { type: "text", text: "EVALUATION SCREENSHOT — transcribe this image:" },
              { type: "image_url", image_url: { url: data.evaluationImage } },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`OpenAI analysis failed (${response.status}). ${detail.slice(0, 180)}`);
    }

    const body = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const raw = body.choices?.[0]?.message?.content ?? "";
    return parseJsonResponse(raw);
  }

  // Default / Google Gemini API (AQ..., AIza..., etc.)
  return callGeminiVision(apiKey, prompt, data);
}

export async function analyzeImages(data: AnalyzeInput) {
  const apiKey =
    data.userApiKey?.trim() ||
    process.env["GEMINI_API_KEY"] ||
    process.env["LOVABLE_API_KEY"] ||
    process.env["OPENAI_API_KEY"] ||
    process.env["VITE_GEMINI_API_KEY"] ||
    process.env["VITE_LOVABLE_API_KEY"] ||
    process.env["VITE_OPENAI_API_KEY"] ||
    DEFAULT_KEY;

  const draft = await callVision(apiKey, TRANSCRIPTION_PROMPT, data);

  // Try parsing draft first
  let parseResult = outputSchema.safeParse(draft);

  // Try audit pass if possible
  try {
    const audited = await callVision(apiKey, `${AUDIT_PROMPT}${JSON.stringify(draft)}`, data);
    const auditedCheck = outputSchema.safeParse(audited);
    if (auditedCheck.success) {
      parseResult = auditedCheck;
    }
  } catch (e) {
    // If audit pass fails or throws, keep draft result
  }

  if (parseResult.success) {
    return parseResult.data;
  }

  // Resilient Normalization Fallback
  const normalized = normalizeRawOutput(draft);
  const finalCheck = outputSchema.safeParse(normalized);

  if (finalCheck.success) {
    return finalCheck.data;
  }

  throw new Error("Could not read marks from these images. Please try taking a clearer screenshot.");
}