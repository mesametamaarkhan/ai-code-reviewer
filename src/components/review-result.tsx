import { ReviewResult } from "@/lib/ai/types";

interface ReviewResultProps {
  review: ReviewResult;
}

export default function ReviewResultCard({ review }: ReviewResultProps) {
  return (
    <div className="space-y-6">
      <div className="card-panel">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Review Score</h2>
            <p className="mt-2 text-sm text-slate-400">AI generated overall quality score</p>
          </div>
          <div className="rounded-full bg-cyan-500/10 px-5 py-3 text-3xl font-semibold text-cyan-200">
            {review.score}/100
          </div>
        </div>
      </div>

      <div className="card-panel">
        <h2 className="text-xl font-semibold text-white">Summary</h2>
        <p className="mt-4 text-slate-300">{review.summary}</p>
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
    <div className="card-panel">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-4 text-slate-400">No issues found.</p>
      ) : (
        <ul className="mt-4 grid gap-3 text-slate-200">
          {items.map((item, index) => (
            <li key={index} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
