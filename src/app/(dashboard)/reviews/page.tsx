import Link from "next/link";

import {
  getReviews,
} from "@/actions/reviews";

export default async function ReviewsPage() {
  const reviews =
    await getReviews();

  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Reviews
        </h1>
      </div>

      {reviews.length === 0 ? (
        <p>
          No reviews yet.
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map(
            (review) => (
              <Link
                key={review.id}
                href={`/reviews/${review.id}`}
              >
                <div className="border rounded p-4 hover:bg-muted/20">
                  <h2 className="font-semibold">
                    {
                      review.projects
                        ?.name
                    }
                  </h2>

                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium border ${
                        (review.score ?? 0) >= 80
                          ? "bg-green-100 text-green-700 border-green-200"
                          : (review.score ?? 0) >= 60
                          ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      Score {review.score}
                    </span>

                    <span className="rounded-full border px-3 py-1 text-sm font-medium">
                      {review.language}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {new Date(
                        review.created_at
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}