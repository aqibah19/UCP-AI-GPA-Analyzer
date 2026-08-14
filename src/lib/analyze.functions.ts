import { analyzeImages, analyzeInputSchema } from "./analyze.server";

export async function analyzeScreenshots(input: any) {
  const data = input?.data ?? input;
  const validated = analyzeInputSchema.parse(data);
  return analyzeImages(validated);
}