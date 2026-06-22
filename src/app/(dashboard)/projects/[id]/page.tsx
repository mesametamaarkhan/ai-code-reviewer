import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import { getProjectReviews } from "@/actions/reviews";
import { ArrowLeft, Plus, FileCode, Star, Calendar } from "lucide-react";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-slate-500">Project not found</p>
      </div>
    );
  }

  const reviews = await getProjectReviews(id);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Link
          href="/projects"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/70">
            Project
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white">{project.name}</h1>
        </div>
      </div>

      {project.description && (
        <p className="max-w-2xl text-sm text-slate-400">{project.description}</p>
      )}

      <Link
        href={`/reviews/new?projectId=${id}`}
        className="btn-primary inline-flex gap-2"
      >
        <Plus className="h-4 w-4" />
        New Review
      </Link>

      <div>
        <h2 className="text-sm font-semibold text-white mb-4">Reviews</h2>

        {reviews.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-[#0d121e]/40 text-slate-500">
            <FileCode className="h-8 w-8 text-slate-600" />
            <p className="mt-2 text-sm">No reviews yet for this project.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <Link key={review.id} href={`/reviews/${review.id}`}>
                <div className="card-panel-hover">
                  <div className="flex items-center justify-between">
                    <span className="badge-pill">{review.language}</span>
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                      <Star className="h-3 w-3" />
                      {review.score}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
