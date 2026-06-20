import { z } from "zod";

export const ReviewSchema = z.object({
  score: z.number(),
  summary: z.string(),

  bugs: z.array(z.string()),

  security: z.array(z.string()),

  performance: z.array(z.string()),

  refactoring: z.array(z.string()),
});

export function parseReview(
  raw: string
) {
  const jsonMatch =
    raw.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error(
      "No JSON found in AI response"
    );
  }

  const parsed = JSON.parse(
    jsonMatch[0]
  );

  return ReviewSchema.parse(parsed);
}