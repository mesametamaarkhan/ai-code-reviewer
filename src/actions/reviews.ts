"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

  const { error } = await supabase.from("reviews").insert({
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

export async function getReviews() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      projects (
        id,
        name
      )
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function getReviewById(reviewId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      projects (
        id,
        name
      )
    `,
    )
    .eq("id", reviewId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getProjectReviews(projectId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteReview(reviewId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("reviews").delete().eq("id", reviewId);

  if (error) {
    throw error;
  }

  revalidatePath("/reviews");
  revalidatePath("/dashboard");
}
