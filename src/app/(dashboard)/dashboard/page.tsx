import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getDashboardStats } from "@/actions/dashboard";
import DashboardCharts from "@/components/dashboard-charts";
import Link from "next/link";
import { FolderKanban, ClipboardList, TrendingUp, Trophy, Code as Code2, ArrowRight, Clock } from "lucide-react";

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
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/70">
            Overview
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#0d121e]/60 px-4 py-2 text-sm text-slate-400 backdrop-blur-sm">
          <Clock className="h-3.5 w-3.5 text-slate-500" />
          {user.email}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          label="Projects"
          value={stats.projectsCount}
          icon={<FolderKanban className="h-4 w-4" />}
        />
        <StatCard
          label="Reviews"
          value={stats.reviewsCount}
          icon={<ClipboardList className="h-4 w-4" />}
        />
        <StatCard
          label="Avg Score"
          value={stats.averageScore}
          icon={<TrendingUp className="h-4 w-4" />}
          suffix="/100"
        />
        <StatCard
          label="Highest"
          value={stats.highestScore}
          icon={<Trophy className="h-4 w-4" />}
          suffix="/100"
        />
        <StatCard
          label="Top Language"
          value={stats.mostUsedLanguage}
          icon={<Code2 className="h-4 w-4" />}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardCharts
            languageData={stats.languageChartData}
            projectData={stats.projectChartData}
            scoreData={stats.scoreChartData}
          />
        </div>

        <div className="space-y-4">
          <div className="surface">
            <h2 className="text-sm font-semibold text-white">Latest Review</h2>
            {stats.latestReview ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Project</span>
                  <span className="text-sm font-medium text-white">
                    {stats.latestReview.projects?.[0]?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Score</span>
                  <span className="badge-emerald">{stats.latestReview.score}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Language</span>
                  <span className="text-sm text-slate-300">{stats.latestReview.language}</span>
                </div>
                <Link
                  href={`/reviews/${stats.latestReview.id}`}
                  className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
                >
                  View details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No reviews yet.</p>
            )}
          </div>

          <div className="surface">
            <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
            {stats.recentReviews.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">No recent activity.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {stats.recentReviews.map((review) => (
                  <Link
                    key={review.id}
                    href={`/reviews/${review.id}`}
                    className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-2.5 transition hover:border-emerald-500/15 hover:bg-white/[0.04]"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {review.projects?.[0]?.name}
                      </p>
                      <p className="text-xs text-slate-500">{review.language}</p>
                    </div>
                    <span className="badge-emerald text-[11px]">{review.score}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  suffix,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  suffix?: string;
}) {
  return (
    <div className="card-panel-hover">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
          {icon}
        </div>
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-bold text-white">
        {value}
        {suffix && <span className="ml-1 text-sm font-normal text-slate-500">{suffix}</span>}
      </p>
    </div>
  );
}
