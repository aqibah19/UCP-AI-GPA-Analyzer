import { createServerFn } from "@tanstack/react-start";
import { analyzeImages, analyzeInputSchema } from "./analyze.server";

export const analyzeScreenshots = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => analyzeInputSchema.parse(data))
  .handler(async ({ data }) => analyzeImages(data));