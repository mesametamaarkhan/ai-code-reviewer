"use client";

import { ReviewResult } from "@/lib/ai/types";
import { useState, useEffect, useMemo } from "react";
import Editor from "@monaco-editor/react";
import ReviewResultCard from "./review-result";
import { detectLanguage } from "@/lib/language-detection";
import { FileUp, Code as Code2, ChevronDown, Loader as Loader2, Play, FolderKanban } from "lucide-react";

interface Project {
  id: string;
  name: string;
}

interface ReviewFormProps {
  projects: Project[];
  initialProjectId?: string;
}

export default function ReviewForm({
  projects,
  initialProjectId,
}: ReviewFormProps) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [projectId, setProjectId] = useState(
    initialProjectId ?? projects[0]?.id ?? "",
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);

  const loadingMessages = useMemo(
    () => [
      "Analyzing code structure...",
      "Checking for bugs...",
      "Reviewing security issues...",
      "Inspecting performance...",
      "Generating suggestions...",
    ],
    [],
  );

  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    if (!loading) {
      return;
    }

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[index]);
    }, 1200);

    return () => clearInterval(interval);
  }, [loading, loadingMessages]);

  async function handleReview() {
    if (!projectId) {
      alert("Please select a project");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          projectId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      setResult(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const text = await file.text();
    setCode(text);

    const detectedLanguage = detectLanguage(file.name);
    setLanguage(detectedLanguage);
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/70">
            Analysis
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
            New Review
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Paste code or upload a file for AI-driven feedback.
          </p>
        </div>
      </section>

      <section className="surface">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Project
            </label>
            <div className="relative">
              <FolderKanban className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="input-field appearance-none !pl-10"
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>
          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Language
            </label>
            <div className="relative">
              <Code2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input-field appearance-none !pl-10"
              >
                <option>typescript</option>
                <option>javascript</option>
                <option>python</option>
                <option>java</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Upload File
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0a0f1a]/90 px-4 py-3 text-sm text-slate-400 transition hover:border-emerald-500/30 hover:text-slate-300">
              <FileUp className="h-4 w-4" />
              <span>Choose file...</span>
              <input
                type="file"
                accept=".ts,.tsx,.js,.jsx,.py,.java,.go,.rs,.cpp,.c"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d121e]/80 shadow-lg shadow-black/20">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          <span className="ml-2 text-[11px] text-slate-500">editor</span>
        </div>
        <Editor
          height="480px"
          language={language}
          value={code}
          onChange={(value) => setCode(value ?? "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            padding: { top: 16 },
          }}
        />
      </section>

      <div className="flex items-center gap-4">
        <button
          onClick={handleReview}
          disabled={loading || !code.trim()}
          className="btn-primary gap-2 disabled:opacity-40 disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {loadingMessage}
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Review Code
            </>
          )}
        </button>
      </div>

      {loading && (
        <div className="surface">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{loadingMessage}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {result && <ReviewResultCard review={result} />}
    </div>
  );
}
