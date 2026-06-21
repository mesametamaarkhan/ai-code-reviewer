import { ReviewResult } from "@/lib/ai/types";

interface ReviewResultProps {
  review: ReviewResult;
}

export default function ReviewResultCard({ review }: ReviewResultProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <h2 className="text-sm text-muted-foreground">Score</h2>

        <p className="mt-2 text-5xl font-bold">{review.score}/100</p>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Summary</h2>

        <p className="mt-4">{review.summary}</p>
      </div>

      <ReviewSection title="Bugs" items={review.bugs} />

      <ReviewSection title="Security" items={review.security} />

      <ReviewSection title="Performance" items={review.performance} />

      <ReviewSection title="Refactoring" items={review.refactoring} />
    </div>
  );
}

function ReviewSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      {items.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No issues found.</p>
      ) : (
        <ul className="mt-4 ml-6 list-disc space-y-2">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
