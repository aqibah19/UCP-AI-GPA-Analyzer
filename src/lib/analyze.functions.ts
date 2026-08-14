import { analyzeImages, analyzeInputSchema } from "./analyze.server";

export async function analyzeScreenshots(data: {
  marksImage: string;
  evaluationImage: string;
  userApiKey?: string;
}) {
  const validated = analyzeInputSchema.parse(data);
  return analyzeImages(validated);
}