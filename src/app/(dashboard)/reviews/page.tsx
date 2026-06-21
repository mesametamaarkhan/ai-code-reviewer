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

                  <div className="mt-2 flex gap-6 text-sm text-muted-foreground">
                    <span>
                      Score:
                      {" "}
                      {
                        review.score
                      }
                    </span>

                    <span>
                      {
                        review.language
                      }
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