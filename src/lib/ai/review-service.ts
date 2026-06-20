import { buildReviewPrompt } from "./prompts";

import { queryModel } from "./huggingface";

import { parseReview } from "./parser";

export async function reviewCode(
  code: string,
  language: string
) {
  const prompt =
    buildReviewPrompt(
      code,
      language
    );

  const result =
    await queryModel(prompt);

  const generatedText =
    result?.[0]?.generated_text;

  if (!generatedText) {
    throw new Error(
      "Model returned empty response"
    );
  }

  return parseReview(
    generatedText
  );
}