import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="mx-auto w-full max-w-6xl rounded-[2rem] border border-white/10 bg-slate-950/85 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
              AI powered review hub
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Smarter code reviews for modern teams.
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-300">
              Build confidence with fast, actionable AI review insights, project tracking,
              and code quality analytics — all in a polished workspace.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/login" className="btn-primary">
                Sign in
              </Link>
              <Link href="/signup" className="btn-secondary">
                Create account
              </Link>
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-slate-900/90 p-8 ring-1 ring-white/10 shadow-xl shadow-slate-950/20">
            <div className="mb-6 flex items-center justify-between rounded-3xl bg-slate-950/90 p-4">
              <div>
                <p className="text-sm text-cyan-300/80">Total reviews</p>
                <p className="mt-2 text-3xl font-semibold text-white">4,382</p>
              </div>
              <div className="badge-pill">Live</div>
            </div>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <p className="font-semibold text-white">Language insights</p>
                <p className="mt-2 text-slate-400">TypeScript, Python, Java, and more.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <p className="font-semibold text-white">Project health</p>
                <p className="mt-2 text-slate-400">Metrics, score trends, and review velocity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
