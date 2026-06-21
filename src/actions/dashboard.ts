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
    .select(`
      *,
      projects (
        id,
        name
      )
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

  const { data: reviews } = await supabase
    .from("reviews")
    .select(`
      id,
      score,
      language,
      created_at,
      projects (
        id,
        name
      )
    `);

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

  const highestScore =
    reviews && reviews.length > 0
      ? Math.max(
          ...reviews.map(
            (review) =>
              review.score ?? 0
          )
        )
      : 0;

  const languageCounts: Record<
    string,
    number
  > = {};

  reviews?.forEach((review) => {
    const language =
      review.language ?? "unknown";

    languageCounts[language] =
      (languageCounts[
        language
      ] ?? 0) + 1;
  });

  const mostUsedLanguage =
    Object.entries(
      languageCounts
    ).sort(
      (a, b) =>
        b[1] - a[1]
    )[0]?.[0] ?? "N/A";

  const recentReviews =
    reviews
      ?.sort(
        (a, b) =>
          new Date(
            b.created_at
          ).getTime() -
          new Date(
            a.created_at
          ).getTime()
      )
      .slice(0, 5) ?? [];

  return {
    projectsCount:
      projectsCount ?? 0,

    reviewsCount:
      reviewsCount ?? 0,

    averageScore,

    highestScore,

    mostUsedLanguage,

    latestReview,

    recentReviews,
  };
}