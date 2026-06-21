import { buildReviewPrompt } from "./prompts";
import { queryModel } from "./huggingface";
import { parseReview } from "./parser";

export async function reviewCode(code: string, language: string) {
  const prompt = buildReviewPrompt(code, language);

  const result = await queryModel(prompt);

  const generatedText = result?.choices?.[0]?.message?.content;

  if (!generatedText) {
    console.error("Model Response:", JSON.stringify(result, null, 2));

    throw new Error("Model returned empty response");
  }

  return parseReview(generatedText);
}
