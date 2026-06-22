"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Shield, Zap, ChartBar as BarChart3, Code as Code2 } from "lucide-react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroRef.current.style.setProperty("--mouse-x", `${x}%`);
      heroRef.current.style.setProperty("--mouse-y", `${y}%`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16,185,129,0.08), transparent 40%)",
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 lg:px-16">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
            <Code2 className="h-4.5 w-4.5 text-emerald-400" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">CodeReview AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-400 transition hover:text-white">
            Sign in
          </Link>
          <Link href="/signup" className="btn-primary text-xs">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center px-6 py-20 lg:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Code Analysis
          </div>

          <h1 className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Smarter code reviews,
            <br />
            <span className="text-gradient">powered by AI.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Get instant, actionable feedback on your code. Detect bugs, security issues, and performance bottlenecks before they reach production.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup" className="btn-primary gap-2 px-7 py-3.5 text-base">
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/login" className="btn-secondary px-7 py-3.5 text-base">
              Sign in
            </Link>
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Shield className="h-5 w-5" />}
            title="Security First"
            description="Detect vulnerabilities, SQL injection risks, and unsafe patterns automatically."
          />
          <FeatureCard
            icon={<Zap className="h-5 w-5" />}
            title="Performance"
            description="Identify bottlenecks, memory leaks, and inefficient algorithms in real-time."
          />
          <FeatureCard
            icon={<BarChart3 className="h-5 w-5" />}
            title="Track Quality"
            description="Monitor code health trends across projects with detailed analytics dashboards."
          />
        </div>

        <div className="mt-24 w-full max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d121e]/80 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
              <div className="h-3 w-3 rounded-full bg-rose-500/60" />
              <div className="h-3 w-3 rounded-full bg-amber-500/60" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
              <span className="ml-3 text-xs text-slate-500">review.ts</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="flex gap-4">
                <div className="text-right text-slate-600 select-none">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="text-slate-300">
                  <div><span className="text-emerald-400">function</span> <span className="text-sky-400">analyzeCode</span>(code: <span className="text-amber-400">string</span>) {'{'}</div>
                  <div className="pl-4"><span className="text-emerald-400">const</span> issues = [];</div>
                  <div className="pl-4"><span className="text-slate-500">AI-powered analysis</span></div>
                  <div className="pl-4"><span className="text-emerald-400">return</span> {'{'}</div>
                  <div className="pl-8">score: <span className="text-amber-400">94</span>,</div>
                  <div className="pl-8">bugs: <span className="text-amber-400">0</span>,</div>
                  <div className="pl-8">security: <span className="text-emerald-400">&quot;clean&quot;</span>,</div>
                  <div className="pl-4">{'}'};</div>
                  <div>{'}'}</div>
                  <div className="mt-2 text-emerald-400/80">{`// Review complete: Excellent code quality`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group rounded-2xl border border-white/[0.06] bg-[#0d121e]/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20 hover:bg-[#0d121e]/80 hover:-translate-y-1">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:bg-emerald-500/20">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
