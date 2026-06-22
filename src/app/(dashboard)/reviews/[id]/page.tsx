import { getReviewById } from "@/actions/reviews";

import CodeBlock from "@/components/code-block";

import DeleteReviewButton from "@/components/delete-review-button";
import Link from "next/link";
import {
  ArrowLeft,
  Bug,
  ShieldAlert,
  Zap,
  Wrench,
  Star,
  FileCode,
  Trash2,
} from "lucide-react";

export default async function ReviewDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const review = await getReviewById(id);

  const aiReview = review.ai_review as {
    score: number;
    summary: string;
    bugs: string[];
    security: string[];
    performance: string[];
    refactoring: string[];
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Link
          href="/reviews"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/70">
            Review
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {review.projects?.[0]?.name}
          </h1>
        </div>
        <div className="ml-auto">
          <DeleteReviewButton reviewId={review.id} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          icon={<Star className="h-4 w-4" />}
          label="Score"
          value={`${aiReview.score}/100`}
          accent
        />
        <StatTile
          icon={<Bug className="h-4 w-4" />}
          label="Bugs"
          value={aiReview.bugs.length}
        />
        <StatTile
          icon={<ShieldAlert className="h-4 w-4" />}
          label="Security"
          value={aiReview.security.length}
        />
        <StatTile
          icon={<Zap className="h-4 w-4" />}
          label="Performance"
          value={aiReview.performance.length}
        />
      </div>

      <div className="surface">
        <h2 className="text-sm font-semibold text-white">Summary</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          {aiReview.summary}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReviewSection
          icon={<Bug className="h-4 w-4" />}
          title="Bugs"
          items={aiReview.bugs}
          color="rose"
        />
        <ReviewSection
          icon={<ShieldAlert className="h-4 w-4" />}
          title="Security"
          items={aiReview.security}
          color="amber"
        />
        <ReviewSection
          icon={<Zap className="h-4 w-4" />}
          title="Performance"
          items={aiReview.performance}
          color="sky"
        />
        <ReviewSection
          icon={<Wrench className="h-4 w-4" />}
          title="Refactoring"
          items={aiReview.refactoring}
          color="emerald"
        />
      </div>

      <div className="surface">
        <div className="mb-4 flex items-center gap-2">
          <FileCode className="h-4 w-4 text-slate-500" />
          <h2 className="text-sm font-semibold text-white">Original Code</h2>
          <span className="badge-pill ml-2">{review.language}</span>
        </div>
        <CodeBlock code={review.code} language={review.language} />
      </div>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="card-panel-hover flex items-center gap-4">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          accent
            ? "bg-emerald-500/15 text-emerald-400"
            : "bg-white/[0.04] text-slate-400"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
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
