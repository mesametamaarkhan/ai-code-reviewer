"use server";

import { createClient } from "@/lib/supabase/server";

export async function createReview({
  projectId,
  language,
  code,
  score,
  aiReview,
}: {
  projectId: string;
  language: string;
  code: string;
  score: number;
  aiReview: unknown;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("reviews")
    .insert({
      project_id: projectId,
      language,
      code,
      score,
      ai_review: aiReview,
    });

  if (error) {
    throw error;
  }
}