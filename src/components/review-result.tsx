import { ReviewResult } from "@/lib/ai/types";
import { Star, Bug, ShieldAlert, Zap, Wrench } from "lucide-react";

interface ReviewResultProps {
  review: ReviewResult;
}

export default function ReviewResultCard({ review }: ReviewResultProps) {
  return (
    <div className="space-y-6">
      <div className="surface">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Review Score</h2>
            <p className="mt-1 text-xs text-slate-500">AI generated overall quality score</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-5 py-3">
            <Star className="h-5 w-5 text-emerald-400" />
            <span className="text-2xl font-bold text-emerald-400">{review.score}</span>
            <span className="text-sm text-slate-500">/100</span>
          </div>
        </div>
      </div>

      <div className="surface">
        <h2 className="text-sm font-semibold text-white">Summary</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{review.summary}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ReviewSection icon={<Bug className="h-4 w-4" />} title="Bugs" items={review.bugs} color="rose" />
        <ReviewSection icon={<ShieldAlert className="h-4 w-4" />} title="Security" items={review.security} color="amber" />
        <ReviewSection icon={<Zap className="h-4 w-4" />} title="Performance" items={review.performance} color="sky" />
        <ReviewSection icon={<Wrench className="h-4 w-4" />} title="Refactoring" items={review.refactoring} color="emerald" />
      </div>
    </div>
  );
}

function ReviewSection({
  icon,
  title,
  items,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: "rose" | "amber" | "sky" | "emerald";
}) {
  const colorMap = {
    rose: "border-rose-500/10 bg-rose-500/[0.04] text-rose-400",
    amber: "border-amber-500/10 bg-amber-500/[0.04] text-amber-400",
    sky: "border-sky-500/10 bg-sky-500/[0.04] text-sky-400",
    emerald: "border-emerald-500/10 bg-emerald-500/[0.04] text-emerald-400",
  };

  return (
    <div className="surface">
      <div className="mb-4 flex items-center gap-2">
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${colorMap[color].split(" ").slice(1).join(" ")}`}>
          {icon}
        </div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <span className="badge-pill ml-auto">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-500">No issues found.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className={`rounded-xl border ${colorMap[color]} px-4 py-3 text-sm`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
