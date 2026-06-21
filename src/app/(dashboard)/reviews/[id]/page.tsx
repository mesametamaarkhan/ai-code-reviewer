import {
  getReviewById,
} from "@/actions/reviews";

import CodeBlock
  from "@/components/code-block";

import DeleteReviewButton from "@/components/delete-review-button";

export default async function ReviewDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const review =
    await getReviewById(id);

  const aiReview =
    review.ai_review as {
      score: number;
      summary: string;
      bugs: string[];
      security: string[];
      performance: string[];
      refactoring: string[];
    };

  return (
    <div className="p-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold">
            Review Details
            </h1>

            <p className="mt-2 text-muted-foreground">
            {
                review.projects?.[0]
                ?.name
            }
            </p>
        </div>

        <DeleteReviewButton
            reviewId={review.id}
        />
        </div>

      <div className="border rounded p-6">
        <h2 className="font-semibold">
          Score
        </h2>

        <p className="text-5xl font-bold mt-3">
          {aiReview.score}
        </p>
      </div>

      <div className="border rounded p-6">
        <h2 className="font-semibold">
          Summary
        </h2>

        <p className="mt-3">
          {
            aiReview.summary
          }
        </p>
      </div>

      <Section
        title="Bugs"
        items={aiReview.bugs}
      />

      <Section
        title="Security"
        items={
          aiReview.security
        }
      />

      <Section
        title="Performance"
        items={
          aiReview.performance
        }
      />

      <Section
        title="Refactoring"
        items={
          aiReview.refactoring
        }
      />

        <div className="border rounded p-6">
            <h2 className="font-semibold mb-4">
                Original Code
            </h2>

            <CodeBlock
                code={review.code}
                language={review.language}
            />
        </div>
    </div>
  );
}

function Section({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="border rounded p-6">
      <h2 className="font-semibold">
        {title}
      </h2>

      <ul className="list-disc ml-6 mt-4 space-y-2">
        {items.map(
          (
            item,
            index
          ) => (
            <li
              key={index}
            >
              {item}
            </li>
          )
        )}
      </ul>
    </div>
  );
}