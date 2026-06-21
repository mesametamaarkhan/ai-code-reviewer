import Link from "next/link";

import { createClient }
  from "@/lib/supabase/server";

import {
  getProjectReviews,
} from "@/actions/reviews";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const supabase =
    await createClient();

  const { data: project } =
    await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

  if (!project) {
    return (
      <div className="p-10">
        Project not found
      </div>
    );
  }

  const reviews =
    await getProjectReviews(
      id
    );

  return (
    <div className="p-10 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          {project.name}
        </h1>

        <p className="mt-4">
          {
            project.description
          }
        </p>
      </div>

      <div>
        <Link
          href={`/reviews/new?projectId=${id}`}
          className="inline-flex rounded bg-black text-white px-4 py-2"
        >
          Create Review
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Reviews
        </h2>

        {reviews.length === 0 ? (
          <p>
            No reviews yet.
          </p>
        ) : (
          <div className="space-y-3">
            {reviews.map(
              (
                review
              ) => (
                <Link
                  key={
                    review.id
                  }
                  href={`/reviews/${review.id}`}
                >
                  <div className="border rounded p-4 hover:bg-muted/20">
                    <p className="font-medium">
                      Score:
                      {" "}
                      {
                        review.score
                      }
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {
                        review.language
                      }
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}