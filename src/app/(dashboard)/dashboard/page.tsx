import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getDashboardStats } from "@/actions/dashboard";
import DashboardCharts from "@/components/dashboard-charts";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const stats = await getDashboardStats();

  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">Welcome back, {user.email}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <div className="rounded-lg border p-6">
          <h2 className="text-sm text-muted-foreground">Projects</h2>

          <p className="mt-3 text-4xl font-bold">{stats.projectsCount}</p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-sm text-muted-foreground">Reviews</h2>

          <p className="mt-3 text-4xl font-bold">{stats.reviewsCount}</p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-sm text-muted-foreground">Avg Score</h2>

          <p className="mt-3 text-4xl font-bold">{stats.averageScore}</p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-sm text-muted-foreground">Highest Score</h2>

          <p className="mt-3 text-4xl font-bold">{stats.highestScore}</p>
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="text-sm text-muted-foreground">Top Language</h2>

        <p className="mt-3 text-2xl font-bold">{stats.mostUsedLanguage}</p>
      </div>

      <div className="mt-10 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Latest Review</h2>

        {stats.latestReview ? (
          <div className="mt-4">
            <p>
              Project:{" "}
              <span className="font-semibold">
                {stats.latestReview.projects?.[0]?.name}
              </span>
            </p>

            <p className="mt-2">
              Score:{" "}
              <span className="font-bold">{stats.latestReview.score}</span>
            </p>

            <p className="mt-2">Language: {stats.latestReview.language}</p>

            <p className="text-sm text-muted-foreground">
              {new Date(stats.latestReview.created_at).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-muted-foreground">No reviews yet.</p>
        )}
      </div>

      <div className="mt-10">
        <DashboardCharts
          languageData={stats.languageChartData}
          projectData={stats.projectChartData}
          scoreData={stats.scoreChartData}
        />
      </div>

      <div className="mt-10 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>

        {stats.recentReviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet.</p>
        ) : (
          <div className="space-y-3">
            {stats.recentReviews.map((review) => (
              <div key={review.id} className="rounded border p-4">
                <p className="font-medium">{review.projects?.[0]?.name}</p>

                <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                  <span>Score: {review.score}</span>

                  <span>{review.language}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
