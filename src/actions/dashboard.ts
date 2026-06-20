"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const { count: projectsCount } = await supabase
    .from("projects")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: reviewsCount } = await supabase
    .from("reviews")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { data: latestReview } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

  const { data: reviews } = await supabase
    .from("reviews")
    .select("score");

  const averageScore =
    reviews && reviews.length > 0
      ? Math.round(
          reviews.reduce(
            (sum, review) =>
              sum + (review.score ?? 0),
            0
          ) / reviews.length
        )
      : 0;

  return {
    projectsCount: projectsCount ?? 0,
    reviewsCount: reviewsCount ?? 0,
    averageScore,
    latestReview,
  };
}