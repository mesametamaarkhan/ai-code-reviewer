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
    <div className="space-y-10">
      <section className="surface">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">Welcome back</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Dashboard</h1>
            <p className="mt-2 max-w-2xl text-slate-300">
              Review performance, monitor trends, and manage your projects from a clean analytics workspace.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900/85 px-6 py-4 text-slate-100 shadow-lg shadow-slate-950/20">
            Signed in as <span className="font-semibold">{user.email}</span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <div className="card-panel">
          <p className="text-sm text-slate-400">Projects</p>
          <p className="mt-4 text-4xl font-semibold text-white">{stats.projectsCount}</p>
        </div>
        <div className="card-panel">
          <p className="text-sm text-slate-400">Reviews</p>
          <p className="mt-4 text-4xl font-semibold text-white">{stats.reviewsCount}</p>
        </div>
        <div className="card-panel">
          <p className="text-sm text-slate-400">Avg Score</p>
          <p className="mt-4 text-4xl font-semibold text-white">{stats.averageScore}</p>
        </div>
        <div className="card-panel">
          <p className="text-sm text-slate-400">Highest Score</p>
          <p className="mt-4 text-4xl font-semibold text-white">{stats.highestScore}</p>
        </div>
        <div className="card-panel">
          <p className="text-sm text-slate-400">Top Language</p>
          <p className="mt-4 text-4xl font-semibold text-white">{stats.mostUsedLanguage}</p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="card-panel">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/75">Latest review</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">New insights</h2>
            </div>
            <div className="rounded-full bg-slate-900/90 px-4 py-2 text-sm text-slate-200">
              {stats.latestReview ? "Updated now" : "No reviews"}
            </div>
          </div>

          {stats.latestReview ? (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm text-slate-400">Project</p>
                <p className="mt-2 text-lg font-semibold text-white">{stats.latestReview.projects?.[0]?.name}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm text-slate-400">Score</p>
                <p className="mt-2 text-lg font-semibold text-white">{stats.latestReview.score}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm text-slate-400">Language</p>
                <p className="mt-2 text-lg font-semibold text-white">{stats.latestReview.language}</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-slate-400">No review data available yet.</p>
          )}
        </div>

        <div className="surface">
          <DashboardCharts
            languageData={stats.languageChartData}
            projectData={stats.projectChartData}
            scoreData={stats.scoreChartData}
          />
        </div>

        <div className="card-panel">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold text-white">Recent Reviews</h2>
            <span className="badge-pill">Latest</span>
          </div>

          {stats.recentReviews.length === 0 ? (
            <p className="mt-4 text-slate-400">No reviews yet.</p>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {stats.recentReviews.map((review) => (
                <div key={review.id} className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5 transition hover:border-cyan-400/30 hover:bg-slate-900/85">
                  <p className="text-lg font-semibold text-white">{review.projects?.[0]?.name}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                    <span className="badge-pill bg-cyan-500/15 text-cyan-300">Score {review.score}</span>
                    <span className="badge-pill bg-slate-800/80">{review.language}</span>
                    <span>{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
