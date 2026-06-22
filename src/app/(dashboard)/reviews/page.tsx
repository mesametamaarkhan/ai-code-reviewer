import Link from "next/link";

import { getReviews } from "@/actions/reviews";
import { ClipboardList, Star, Code as Code2, Calendar, ArrowRight } from "lucide-react";

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/70">
            Analysis
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
            Reviews
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse and inspect AI-generated code reviews.
          </p>
        </div>
        <Link href="/reviews/new" className="btn-primary gap-2">
          <Code2 className="h-4 w-4" />
          New Review
        </Link>
      </section>

      {reviews.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-[#0d121e]/40 text-slate-500">
          <ClipboardList className="h-10 w-10 text-slate-600" />
          <p className="mt-3 text-sm">No reviews yet. Start your first analysis.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Link key={review.id} href={`/reviews/${review.id}`}>
              <div className="group card-panel-hover">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-white transition group-hover:text-emerald-400">
                      {review.projects?.name}
                    </h2>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="badge-pill">{review.language}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <span className="text-sm font-bold">{review.score}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-400 opacity-0 transition group-hover:opacity-100">
                  View details <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
