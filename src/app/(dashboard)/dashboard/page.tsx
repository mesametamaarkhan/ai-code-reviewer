import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getDashboardStats } from "@/actions/dashboard";
import LogoutButton from "@/components/logout-button";

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
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back, {user.email}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h2 className="text-sm text-muted-foreground">
            Projects
          </h2>

          <p className="mt-3 text-4xl font-bold">
            {stats.projectsCount}
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-sm text-muted-foreground">
            Reviews
          </h2>

          <p className="mt-3 text-4xl font-bold">
            {stats.reviewsCount}
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-sm text-muted-foreground">
            Avg Score
          </h2>

          <p className="mt-3 text-4xl font-bold">
            {stats.averageScore}
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">
          Latest Review
        </h2>

        {stats.latestReview ? (
          <div className="mt-4">
            <p>
              Score:{" "}
              <span className="font-bold">
                {stats.latestReview.score}
              </span>
            </p>

            <p className="text-sm text-muted-foreground">
              {new Date(
                stats.latestReview.created_at
              ).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-muted-foreground">
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  );
}