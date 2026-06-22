import Link from "next/link";

import { getReviews } from "@/actions/reviews";

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="space-y-8">
      <section className="surface">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Reviews</h1>
            <p className="mt-2 text-slate-400">Browse recent code reviews and inspect AI feedback at a glance.</p>
          </div>
        </div>
      </section>

      {reviews.length === 0 ? (
        <div className="card-panel text-slate-300">No reviews yet.</div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {reviews.map((review) => (
            <Link key={review.id} href={`/reviews/${review.id}`}>
              <div className="group rounded-[1.75rem] border border-white/10 bg-slate-950/85 p-6 transition hover:border-cyan-400/30 hover:bg-slate-900/90">
                <h2 className="text-2xl font-semibold text-white group-hover:text-cyan-300">{review.projects?.name}</h2>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span className="badge-pill bg-cyan-500/15 text-cyan-300">Score {review.score}</span>
                  <span className="badge-pill bg-slate-800/80">{review.language}</span>
                  <span>{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
